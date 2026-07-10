import { createSpriteFromLibrary } from './spriteLibrary.js';
import {
    getDynamicMonitorPresentation,
    isDynamicMonitorId,
    parseDynamicMonitorId,
    readDynamicMonitorValue,
} from './dynamicMonitors.js';
import { normalizeBackdropEntry } from './backdropAssets.js';
import { normalizeCostumeEntry } from './costumeAssets.js';
import { SoundEngine } from './soundEngine.js';
import {
    MONITOR_BY_ID,
    STAGE_MONITORS,
    defaultMonitorLayout,
    normalizeMonitorState,
} from './stageMonitors.js';

const DEFAULT_STAGE = {
    width: 480,
    height: 360,
    background: '#dbeafe',
    backdrops: [
        { id: 'backdrop-1', name: 'blue sky', color: '#dbeafe' },
        { id: 'backdrop-2', name: 'grass', color: '#bbf7d0' },
        { id: 'backdrop-3', name: 'sunset', color: '#fed7aa' },
        { id: 'backdrop-4', name: 'night', color: '#1e293b' },
    ],
    backdropIndex: 0,
};

const DEFAULT_SPRITE = {
    id: 'sprite-1',
    name: 'Sprite1',
    x: 0,
    y: 0,
    direction: 90,
    visible: true,
    size: 100,
    emoji: '🐱',
    costumes: [{ type: 'emoji', emoji: '🐱', name: '🐱' }],
    costumeIndex: 0,
    rotationStyle: 'all around',
    layer: 0,
    effects: {
        color: 0,
        fisheye: 0,
        whirl: 0,
        pixelate: 0,
        mosaic: 0,
        brightness: 0,
        ghost: 0,
    },
    say: null,
    think: null,
    isClone: false,
    cloneOf: null,
    dragMode: 'draggable',
};

export class StageRuntime {
    constructor(config = {}, onUpdate = null) {
        this.onUpdate = onUpdate;
        this.maxRunMs = config.runtime?.max_run_ms ?? 10000;
        this.maxLoopIterations = config.runtime?.max_loop_iterations ?? 10000;
        this.initialStage = this.normalizeStage(config.stage);
        this.initialSprites = this.normalizeSprites(config.stage?.sprites);
        this.activeSpriteId = config.active_sprite_id ?? this.initialSprites[0]?.id ?? 'sprite-1';
        this.greenFlagHandlers = [];
        this.keyHandlers = new Map();
        this.broadcastHandlers = new Map();
        this.spriteClickHandlers = new Map();
        this.backdropSwitchHandlers = new Map();
        this.greaterThanHandlers = [];
        this.cloneStartHandlers = [];
        this.stopRequested = false;
        this.activeScriptContext = null;
        this.loopCount = 0;
        this.state = 'idle';
        this.error = null;
        this.boundKeyDown = null;
        this.boundKeyUp = null;
        this.keysHeld = new Set();
        this.pointer = { x: 0, y: 0, down: false };
        this.runStartedAt = null;
        this.timerOffsetMs = 0;
        this.inputListenersAttached = false;
        this.greaterThanPollId = null;
        this.soundEngine = new SoundEngine();
        this.soundLibrary = config.sound_library ?? {};
        this.soundEffects = { pitch: 100, pan: 0 };
        this.answer = '';
        this.asking = null;
        this.askResolve = null;
        this.username = config.username ?? 'learner';
        this.cloneCounter = 0;
        this.monitors = this.normalizeMonitors(config.monitors);
        this.colorSampler = null;
        this.variableValues = new Map();
        this.variableNames = new Map();
        this.boundWorkspace = null;
        this.stage = structuredClone(this.initialStage);
        this.sprites = structuredClone(this.initialSprites);
        this.ensureSpriteLayers();
        this.monitorPollId = null;
        this.startMonitorPolling();
    }

    normalizeStage(stage = {}) {
        const normalized = {
            ...structuredClone(DEFAULT_STAGE),
            ...stage,
        };

        if (!Array.isArray(normalized.backdrops) || normalized.backdrops.length === 0) {
            normalized.backdrops = structuredClone(DEFAULT_STAGE.backdrops);
        } else {
            normalized.backdrops = normalized.backdrops.map((backdrop, index) =>
                normalizeBackdropEntry(backdrop, index),
            );
        }

        normalized.backdropIndex = Math.min(
            Math.max(0, normalized.backdropIndex ?? 0),
            normalized.backdrops.length - 1,
        );

        this.applyBackdropVisual(normalized);

        return normalized;
    }

    applyBackdropVisual(stage = this.stage) {
        const current = stage.backdrops?.[stage.backdropIndex] ?? stage.backdrops?.[0];

        if (!current) {
            stage.background = DEFAULT_STAGE.background;
            stage.backdropAssetUuid = null;
            stage.backdropLibraryId = null;
            stage.backdropProceduralSeed = null;

            return;
        }

        stage.background = current.color ?? DEFAULT_STAGE.background;
        stage.backdropAssetUuid =
            current.type === 'asset' || current.type === 'ai' ? current.asset_uuid : null;
        stage.backdropLibraryId = current.type === 'library' ? current.library_id : null;
        stage.backdropProceduralSeed = current.type === 'procedural' ? current.seed : null;
    }

    addBackdrop(backdrop) {
        this.stage.backdrops = this.stage.backdrops ?? [];
        this.stage.backdrops.push(normalizeBackdropEntry(backdrop, this.stage.backdrops.length));
        this.stage.backdropIndex = this.stage.backdrops.length - 1;
        this.applyBackdropVisual();
        this.syncInitialStage();
        this.emitChange();
        this.fireBackdropSwitchHandlers(this.stage.backdrops[this.stage.backdropIndex]?.name);
    }

    selectBackdrop(index) {
        if (!this.stage.backdrops || index < 0 || index >= this.stage.backdrops.length) {
            return;
        }

        this.stage.backdropIndex = index;
        this.applyBackdropVisual();
        this.syncInitialStage();
        this.emitChange();
        this.fireBackdropSwitchHandlers(this.stage.backdrops[index]?.name);
    }

    removeBackdrop(index) {
        if (!this.stage.backdrops || this.stage.backdrops.length <= 1 || index < 0 || index >= this.stage.backdrops.length) {
            return;
        }

        this.stage.backdrops.splice(index, 1);

        if (this.stage.backdropIndex >= this.stage.backdrops.length) {
            this.stage.backdropIndex = this.stage.backdrops.length - 1;
        } else if (this.stage.backdropIndex > index) {
            this.stage.backdropIndex -= 1;
        }

        this.applyBackdropVisual();
        this.syncInitialStage();
        this.emitChange();
    }

    syncInitialStage() {
        this.initialStage.backdrops = structuredClone(this.stage.backdrops);
        this.initialStage.backdropIndex = this.stage.backdropIndex;
        this.initialStage.background = this.stage.background;
        this.initialStage.backdropAssetUuid = this.stage.backdropAssetUuid;
        this.initialStage.backdropLibraryId = this.stage.backdropLibraryId;
        this.initialStage.backdropProceduralSeed = this.stage.backdropProceduralSeed;
    }

    ensureSpriteLayers() {
        this.sprites.forEach((sprite, index) => {
            if (typeof sprite.layer !== 'number') {
                sprite.layer = index;
            }
        });
    }

    normalizeSprites(sprites) {
        if (!Array.isArray(sprites) || sprites.length === 0) {
            return [structuredClone(DEFAULT_SPRITE)];
        }

        return sprites.map((sprite, index) => {
            const normalized = {
                ...structuredClone(DEFAULT_SPRITE),
                ...sprite,
                id: sprite.id ?? `sprite-${index + 1}`,
                name: sprite.name ?? `Sprite${index + 1}`,
            };

            if (!Array.isArray(normalized.costumes) || normalized.costumes.length === 0) {
                normalized.costumes = [normalizeCostumeEntry(normalized.emoji ?? DEFAULT_SPRITE.emoji)];
            } else {
                normalized.costumes = normalized.costumes.map((costume) => normalizeCostumeEntry(costume));
            }

            normalized.costumeIndex = Math.min(
                Math.max(0, normalized.costumeIndex ?? 0),
                normalized.costumes.length - 1,
            );
            this.applyCostumeVisual(normalized);
            normalized.size = Number(normalized.size) || DEFAULT_SPRITE.size;
            normalized.rotationStyle = normalized.rotationStyle ?? DEFAULT_SPRITE.rotationStyle;
            normalized.layer = typeof normalized.layer === 'number' ? normalized.layer : index;
            normalized.effects = {
                ...structuredClone(DEFAULT_SPRITE.effects),
                ...(normalized.effects ?? {}),
            };

            return normalized;
        });
    }

    applyCostumeVisual(sprite) {
        const costume = sprite.costumes[sprite.costumeIndex] ?? sprite.costumes[0];

        if (!costume) {
            sprite.emoji = DEFAULT_SPRITE.emoji;
            sprite.costumeAssetUuid = null;

            return;
        }

        if (costume.type === 'asset') {
            sprite.emoji = costume.emoji ?? '🖼️';
            sprite.costumeAssetUuid = costume.asset_uuid;
            sprite.costumeLibraryId = null;
        } else if (costume.type === 'library') {
            sprite.emoji = costume.emoji ?? '🎨';
            sprite.costumeAssetUuid = null;
            sprite.costumeLibraryId = costume.library_id;
        } else {
            sprite.emoji = costume.emoji ?? DEFAULT_SPRITE.emoji;
            sprite.costumeAssetUuid = null;
            sprite.costumeLibraryId = null;
        }
    }

    addCostumeToSprite(spriteId, costume) {
        const sprite = this.sprites.find((item) => item.id === spriteId);

        if (!sprite) {
            return;
        }

        sprite.costumes.push(normalizeCostumeEntry(costume));
        sprite.costumeIndex = sprite.costumes.length - 1;
        this.applyCostumeVisual(sprite);
        this.syncInitialSprite(sprite);
        this.emitChange();
    }

    addSpriteFromLibrary(libraryId) {
        const sprite = createSpriteFromLibrary(libraryId, this.sprites.length);

        if (!sprite) {
            return null;
        }

        const normalized = this.normalizeSprites([sprite])[0];
        this.sprites.push(normalized);
        this.initialSprites.push(structuredClone(normalized));
        this.activeSpriteId = normalized.id;
        this.ensureSpriteLayers();
        this.emitChange();

        return normalized;
    }

    selectCostume(spriteId, index) {
        const sprite = this.sprites.find((item) => item.id === spriteId);

        if (!sprite || index < 0 || index >= sprite.costumes.length) {
            return;
        }

        sprite.costumeIndex = index;
        this.applyCostumeVisual(sprite);
        this.syncInitialSprite(sprite);
        this.emitChange();
    }

    removeCostume(spriteId, index) {
        const sprite = this.sprites.find((item) => item.id === spriteId);

        if (!sprite || sprite.costumes.length <= 1 || index < 0 || index >= sprite.costumes.length) {
            return;
        }

        sprite.costumes.splice(index, 1);

        if (sprite.costumeIndex >= sprite.costumes.length) {
            sprite.costumeIndex = sprite.costumes.length - 1;
        } else if (sprite.costumeIndex > index) {
            sprite.costumeIndex -= 1;
        }

        this.applyCostumeVisual(sprite);
        this.syncInitialSprite(sprite);
        this.emitChange();
    }

    syncInitialSprite(sprite) {
        const initial = this.initialSprites.find((item) => item.id === sprite.id);

        if (!initial) {
            return;
        }

        initial.costumes = structuredClone(sprite.costumes);
        initial.costumeIndex = sprite.costumeIndex;
        initial.emoji = sprite.emoji;
        initial.costumeAssetUuid = sprite.costumeAssetUuid;
        initial.costumeLibraryId = sprite.costumeLibraryId ?? null;
    }

    getSnapshot() {
        return {
            state: this.state,
            error: this.error,
            stage: structuredClone(this.stage),
            sprites: structuredClone(this.sprites).sort((a, b) => (a.layer ?? 0) - (b.layer ?? 0)),
            activeSpriteId: this.activeSpriteId,
            soundVolume: Math.round((this.soundEngine.volume ?? 1) * 100),
            answer: this.answer,
            asking: this.asking,
            monitors: this.getMonitorSnapshot(),
        };
    }

    normalizeMonitors(monitors) {
        if (!Array.isArray(monitors)) {
            return [];
        }

        const seen = new Set();
        const normalized = [];

        for (const [index, entry] of monitors.entries()) {
            const monitor = normalizeMonitorState(entry, index);

            if (!monitor || seen.has(monitor.id)) {
                continue;
            }

            seen.add(monitor.id);
            normalized.push(monitor);
        }

        return normalized;
    }

    getMonitors() {
        return structuredClone(this.monitors);
    }

    getMonitorSnapshot() {
        return this.monitors
            .filter((monitor) => monitor.visible !== false)
            .map((monitor) => {
                const meta = MONITOR_BY_ID[monitor.id];

                if (meta) {
                    return {
                        ...monitor,
                        label: meta.label,
                        color: meta.color,
                        value: meta.read(this),
                    };
                }

                const parsed = parseDynamicMonitorId(monitor.id);

                if (!parsed) {
                    return null;
                }

                const presentation = getDynamicMonitorPresentation(parsed, monitor, this);

                return {
                    ...monitor,
                    label: presentation.label,
                    color: presentation.color,
                    value: readDynamicMonitorValue(parsed, this),
                };
            })
            .filter(Boolean);
    }

    setMonitors(monitors) {
        this.monitors = this.normalizeMonitors(monitors);
        this.emitChange();
    }

    setMonitorVisible(id, visible, meta = {}) {
        if (!MONITOR_BY_ID[id] && !isDynamicMonitorId(id)) {
            return;
        }

        const existing = this.monitors.find((monitor) => monitor.id === id);

        if (visible) {
            if (existing) {
                existing.visible = true;

                if (meta.label) {
                    existing.label = meta.label;
                }
            } else {
                this.monitors.push({
                    id,
                    label: meta.label,
                    visible: true,
                    dynamic: isDynamicMonitorId(id),
                    ...defaultMonitorLayout(this.monitors.length),
                });
            }
        } else if (existing) {
            existing.visible = false;
        }

        this.emitChange();
    }

    moveMonitor(id, position = {}) {
        const monitor = this.monitors.find((item) => item.id === id);

        if (!monitor) {
            return;
        }

        if (Number.isFinite(position.x)) {
            monitor.x = Math.max(0, position.x);
        }

        if (Number.isFinite(position.y)) {
            monitor.y = Math.max(0, position.y);
        }

        this.emitChange();
    }

    startMonitorPolling() {
        if (typeof window === 'undefined' || this.monitorPollId !== null) {
            return;
        }

        this.monitorPollId = window.setInterval(() => {
            if (this.monitors.some((monitor) => monitor.visible !== false)) {
                this.emitChange();
            }
        }, 200);
    }

    stopMonitorPolling() {
        if (this.monitorPollId === null || typeof window === 'undefined') {
            return;
        }

        window.clearInterval(this.monitorPollId);
        this.monitorPollId = null;
    }

    emitChange() {
        this.onUpdate?.(this.getSnapshot());
    }

    setState(state) {
        this.state = state;
        this.emitChange();
    }

    setError(message) {
        this.error = message;
        this.setState('error');
    }

    getActiveSprite() {
        return this.sprites.find((sprite) => sprite.id === this.activeSpriteId) ?? this.sprites[0];
    }

    getActiveSpriteId() {
        return this.activeSpriteId;
    }

    setActiveSprite(spriteId) {
        if (!this.sprites.some((sprite) => sprite.id === spriteId)) {
            return;
        }

        this.activeSpriteId = spriteId;
        this.emitChange();
    }

    resetForRun(workspace = null) {
        if (workspace) {
            this.boundWorkspace = workspace;
        }

        this.greenFlagHandlers = [];
        this.keyHandlers = new Map();
        this.broadcastHandlers = new Map();
        this.spriteClickHandlers = new Map();
        this.backdropSwitchHandlers = new Map();
        this.greaterThanHandlers = [];
        this.cloneStartHandlers = [];
        this.stopRequested = false;
        this.activeScriptContext = null;
        this.stopResolve = null;
        this.loopCount = 0;
        this.error = null;
        this.stage = structuredClone(this.initialStage);
        this.sprites = structuredClone(this.initialSprites);
        this.ensureSpriteLayers();
        this.keysHeld.clear();
        this.pointer = { x: 0, y: 0, down: false };
        this.runStartedAt = null;
        this.timerOffsetMs = 0;
        this.soundEffects = { pitch: 100, pan: 0 };
        this.answer = '';
        this.asking = null;
        if (this.askResolve) {
            this.askResolve('');
            this.askResolve = null;
        }
        this.cloneCounter = 0;
        this.resetVariableStore(this.boundWorkspace);
        this.soundEngine.stopAll();
        this.finishEventLoop();
        this.setState('idle');
    }

    resetVariableStore(workspace = this.boundWorkspace) {
        this.variableValues = new Map();
        this.variableNames = new Map();

        const variableMap = workspace?.getVariableMap?.();

        if (!variableMap) {
            return;
        }

        for (const variable of variableMap.getAllVariables()) {
            const id = variable.getId();
            const name = variable.getName();
            const type = String(variable.getType?.() ?? '').toLowerCase();

            this.variableNames.set(id, name);
            this.variableValues.set(id, type === 'list' ? [] : 0);
        }
    }

    getVariableNameById(variableId) {
        return this.variableNames.get(variableId) ?? null;
    }

    getVariableById(variableId) {
        if (!this.variableValues.has(variableId)) {
            this.variableValues.set(variableId, 0);
        }

        return this.variableValues.get(variableId);
    }

    setVariableById(variableId, value) {
        this.variableValues.set(variableId, value);
        this.emitChange();
    }

    changeVariableById(variableId, delta) {
        const current = Number(this.getVariableById(variableId)) || 0;
        this.setVariableById(variableId, current + Number(delta));
    }

    onGreenFlag(handler) {
        this.greenFlagHandlers.push(handler);
    }

    onKeyPressed(key, handler) {
        const normalizedKey = this.normalizeKey(key);

        if (!this.keyHandlers.has(normalizedKey)) {
            this.keyHandlers.set(normalizedKey, []);
        }

        this.keyHandlers.get(normalizedKey).push(handler);
    }

    onBroadcastReceived(message, handler) {
        const normalizedMessage = String(message ?? '');

        if (!this.broadcastHandlers.has(normalizedMessage)) {
            this.broadcastHandlers.set(normalizedMessage, []);
        }

        this.broadcastHandlers.get(normalizedMessage).push(handler);
    }

    onSpriteClicked(spriteId, handler) {
        const normalizedSpriteId = String(spriteId ?? '');

        if (!this.spriteClickHandlers.has(normalizedSpriteId)) {
            this.spriteClickHandlers.set(normalizedSpriteId, []);
        }

        this.spriteClickHandlers.get(normalizedSpriteId).push(handler);
    }

    onBackdropSwitched(backdropName, handler) {
        if (typeof handler !== 'function') {
            return;
        }

        const key = String(backdropName ?? '');
        const handlers = this.backdropSwitchHandlers.get(key) ?? [];
        handlers.push(handler);
        this.backdropSwitchHandlers.set(key, handlers);
    }

    onGreaterThan(sensor, threshold, handler) {
        if (typeof handler !== 'function') {
            return;
        }

        this.greaterThanHandlers.push({
            sensor: String(sensor ?? 'timer'),
            threshold: Number(threshold) || 0,
            handler,
            fired: false,
        });
    }

    onCloneStart(handler) {
        if (typeof handler === 'function') {
            this.cloneStartHandlers.push(handler);
        }
    }

    async handleSpriteClick(spriteId) {
        if (this.state !== 'running' || this.shouldStop()) {
            return;
        }

        const handlers = this.spriteClickHandlers.get(String(spriteId ?? '')) ?? [];

        if (handlers.length === 0) {
            return;
        }

        const previousActiveSpriteId = this.activeSpriteId;
        this.activeSpriteId = spriteId;
        this.emitChange();

        try {
            for (const handler of handlers) {
                await this.runScript(handler);
            }
        } finally {
            this.activeSpriteId = previousActiveSpriteId;
            this.emitChange();
        }
    }

    hasEventHandlers() {
        return (
            this.keyHandlers.size > 0 ||
            this.broadcastHandlers.size > 0 ||
            this.spriteClickHandlers.size > 0 ||
            this.backdropSwitchHandlers.size > 0 ||
            this.greaterThanHandlers.length > 0 ||
            this.cloneStartHandlers.length > 0
        );
    }

    normalizeKey(key) {
        if (key === 'space') {
            return ' ';
        }

        return String(key ?? '');
    }

    stop() {
        this.stopAll();
    }

    stopAll() {
        this.stopRequested = true;
        this.soundEngine.stopAll();
        this.finishEventLoop();

        if (this.state === 'running') {
            this.setState('stopped');
        }
    }

    dispose() {
        this.stopMonitorPolling();
        this.stopAll();
        this.setColorSampler(null);
    }

    setColorSampler(sampler) {
        this.colorSampler?.dispose?.();
        this.colorSampler = sampler;
    }

    stopThisScript() {
        if (this.activeScriptContext) {
            this.activeScriptContext.stopped = true;
        }
    }

    shouldStop() {
        return this.stopRequested || this.activeScriptContext?.stopped === true;
    }

    attachInputListeners() {
        if (this.inputListenersAttached) {
            return;
        }

        this.boundKeyDown = (event) => {
            this.keysHeld.add(event.key);
            this.keysHeld.add(event.code);

            if (this.state !== 'running' || this.shouldStop()) {
                return;
            }

            const handlers = [
                ...(this.keyHandlers.get(event.key) ?? []),
                ...(this.keyHandlers.get(event.code) ?? []),
            ];

            if (handlers.length === 0) {
                return;
            }

            event.preventDefault();

            for (const handler of handlers) {
                void this.runScript(handler);
            }
        };

        this.boundKeyUp = (event) => {
            this.keysHeld.delete(event.key);
            this.keysHeld.delete(event.code);
        };

        window.addEventListener('keydown', this.boundKeyDown);
        window.addEventListener('keyup', this.boundKeyUp);
        this.inputListenersAttached = true;
    }

    detachInputListeners() {
        if (this.boundKeyDown) {
            window.removeEventListener('keydown', this.boundKeyDown);
            this.boundKeyDown = null;
        }

        if (this.boundKeyUp) {
            window.removeEventListener('keyup', this.boundKeyUp);
            this.boundKeyUp = null;
        }

        this.keysHeld.clear();
        this.inputListenersAttached = false;
    }

    runTimeout() {
        return new Promise((_, reject) => {
            setTimeout(() => {
                if (this.state === 'running') {
                    reject(new Error('Program stopped: maximum run time reached.'));
                }
            }, this.maxRunMs);
        });
    }

    async runScript(handler) {
        const context = { stopped: false };
        this.activeScriptContext = context;

        try {
            await handler();
        } catch (error) {
            if (!this.shouldStop()) {
                throw error;
            }
        } finally {
            if (this.activeScriptContext === context) {
                this.activeScriptContext = null;
            }
        }
    }

    async start() {
        this.runStartedAt = Date.now();
        this.attachInputListeners();
        this.startGreaterThanPolling();
        this.setState('running');

        if (this.greenFlagHandlers.length > 0) {
            await Promise.all(this.greenFlagHandlers.map((handler) => this.runScript(handler)));
        }

        if (this.hasEventHandlers()) {
            await this.waitUntilStopped();
            return;
        }

        if (!this.shouldStop() && this.state === 'running') {
            this.setState('idle');
        }

        this.stopGreaterThanPolling();
        this.detachInputListeners();
    }

    startGreaterThanPolling() {
        this.stopGreaterThanPolling();

        if (this.greaterThanHandlers.length === 0) {
            return;
        }

        this.greaterThanPollId = window.setInterval(() => {
            if (this.shouldStop()) {
                return;
            }

            for (const entry of this.greaterThanHandlers) {
                if (entry.fired) {
                    continue;
                }

                const value = entry.sensor === 'loudness' ? this.getLoudness() : this.getTimer();

                if (value > entry.threshold) {
                    entry.fired = true;
                    void this.runScript(entry.handler);
                }
            }
        }, 100);
    }

    stopGreaterThanPolling() {
        if (this.greaterThanPollId !== null) {
            window.clearInterval(this.greaterThanPollId);
            this.greaterThanPollId = null;
        }
    }

    waitUntilStopped() {
        return new Promise((resolve) => {
            this.stopResolve = resolve;
        });
    }

    finishEventLoop() {
        this.stopGreaterThanPolling();
        this.detachInputListeners();

        if (this.stopResolve) {
            this.stopResolve();
            this.stopResolve = null;
        }
    }

    async broadcast(message) {
        if (this.shouldStop()) {
            return;
        }

        const handlers = this.broadcastHandlers.get(String(message ?? '')) ?? [];

        if (handlers.length === 0) {
            return;
        }

        await Promise.all(handlers.map((handler) => this.runScript(handler)));
    }

    async broadcastAndWait(message) {
        await this.broadcast(message);
    }

    async wait(milliseconds = 0) {
        if (this.shouldStop()) {
            return;
        }

        await new Promise((resolve) => {
            setTimeout(resolve, Math.max(0, Number(milliseconds) || 0));
        });
    }

    async waitSeconds(seconds = 0) {
        await this.wait((Number(seconds) || 0) * 1000);
    }

    async waitUntil(conditionFn) {
        while (!this.shouldStop()) {
            try {
                if (typeof conditionFn === 'function' ? Boolean(await conditionFn()) : Boolean(conditionFn)) {
                    return;
                }
            } catch {
                return;
            }

            await this.wait(50);
            this.checkLoop();
        }
    }

    checkLoop() {
        this.loopCount += 1;

        if (this.loopCount > this.maxLoopIterations) {
            throw new Error('Program stopped: loop limit reached.');
        }

        if (this.shouldStop()) {
            throw new Error('Program stopped.');
        }
    }

    async moveSteps(steps = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const distance = Number(steps) || 0;
        const radians = (sprite.direction * Math.PI) / 180;

        sprite.x += distance * Math.sin(radians);
        sprite.y += distance * Math.cos(radians);
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(250);
    }

    async turnDegrees(degrees = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.direction = this.normalizeDirection(sprite.direction + (Number(degrees) || 0));
        this.emitChange();
        await this.wait(150);
    }

    async turnLeftDegrees(degrees = 0) {
        await this.turnDegrees(-(Number(degrees) || 0));
    }

    async goToXY(x = 0, y = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.x = Number(x) || 0;
        sprite.y = Number(y) || 0;
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(250);
    }

    async goToTarget(target = 'random position') {
        if (this.shouldStop()) {
            return;
        }

        if (target === 'mouse-pointer') {
            await this.goToXY(this.pointer.x, this.pointer.y);
            return;
        }

        const halfWidth = this.stage.width / 2;
        const halfHeight = this.stage.height / 2;
        const x = Math.round((Math.random() * 2 - 1) * halfWidth);
        const y = Math.round((Math.random() * 2 - 1) * halfHeight);
        await this.goToXY(x, y);
    }

    async glideToXY(x = 0, y = 0, seconds = 1) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const targetX = Number(x) || 0;
        const targetY = Number(y) || 0;
        const durationSeconds = Math.max(0.1, Number(seconds) || 1);
        const startX = sprite.x;
        const startY = sprite.y;
        const frames = Math.max(1, Math.round(durationSeconds * 30));
        const frameDelayMs = (durationSeconds * 1000) / frames;

        for (let frame = 1; frame <= frames; frame += 1) {
            if (this.shouldStop()) {
                return;
            }

            const progress = frame / frames;
            sprite.x = startX + (targetX - startX) * progress;
            sprite.y = startY + (targetY - startY) * progress;
            this.clampSprite(sprite);
            this.emitChange();
            await this.wait(frameDelayMs);
        }
    }

    async glideToTarget(seconds = 1, target = 'random position') {
        if (target === 'mouse-pointer') {
            await this.glideToXY(this.pointer.x, this.pointer.y, seconds);
            return;
        }

        const halfWidth = this.stage.width / 2;
        const halfHeight = this.stage.height / 2;
        await this.glideToXY(
            Math.round((Math.random() * 2 - 1) * halfWidth),
            Math.round((Math.random() * 2 - 1) * halfHeight),
            seconds,
        );
    }

    async pointInDirection(degrees = 90) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.direction = this.normalizeDirection(Number(degrees) || 0);
        this.emitChange();
        await this.wait(100);
    }

    async pointTowards(target = 'mouse-pointer') {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        let targetX = this.pointer.x;
        let targetY = this.pointer.y;

        if (target !== 'mouse-pointer') {
            const other = this.sprites.find((item) => item.id === target || item.name === target);
            if (other) {
                targetX = other.x;
                targetY = other.y;
            }
        }

        const dx = targetX - sprite.x;
        const dy = targetY - sprite.y;
        sprite.direction = this.normalizeDirection((Math.atan2(dx, dy) * 180) / Math.PI);
        this.emitChange();
        await this.wait(100);
    }

    async changeXBy(amount = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.x += Number(amount) || 0;
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(100);
    }

    async setXTo(value = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.x = Number(value) || 0;
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(100);
    }

    async changeYBy(amount = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.y += Number(amount) || 0;
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(100);
    }

    async setYTo(value = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.y = Number(value) || 0;
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(100);
    }

    setRotationStyle(style = 'all around') {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const allowed = ['left-right', "don't rotate", 'all around'];
        sprite.rotationStyle = allowed.includes(style) ? style : 'all around';
        this.emitChange();
    }

    getXPosition() {
        return this.getActiveSprite().x;
    }

    getYPosition() {
        return this.getActiveSprite().y;
    }

    getDirection() {
        return this.getActiveSprite().direction;
    }

    bounceIfOnEdge() {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const halfWidth = this.stage.width / 2;
        const halfHeight = this.stage.height / 2;
        const radius = this.spriteRadius(sprite);
        let bounced = false;

        if (sprite.x + radius >= halfWidth) {
            sprite.x = halfWidth - radius;
            sprite.direction = this.normalizeDirection(180 - sprite.direction);
            bounced = true;
        } else if (sprite.x - radius <= -halfWidth) {
            sprite.x = -halfWidth + radius;
            sprite.direction = this.normalizeDirection(180 - sprite.direction);
            bounced = true;
        }

        if (sprite.y + radius >= halfHeight) {
            sprite.y = halfHeight - radius;
            sprite.direction = this.normalizeDirection(-sprite.direction);
            bounced = true;
        } else if (sprite.y - radius <= -halfHeight) {
            sprite.y = -halfHeight + radius;
            sprite.direction = this.normalizeDirection(-sprite.direction);
            bounced = true;
        }

        if (bounced) {
            this.emitChange();
        }
    }

    async say(message = '', seconds = null) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.think = null;
        sprite.say = String(message);
        this.emitChange();

        if (seconds === null || seconds === undefined) {
            return;
        }

        await this.wait((Number(seconds) || 2) * 1000);
        sprite.say = null;
        this.emitChange();
    }

    async think(message = '', seconds = null) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.say = null;
        sprite.think = String(message);
        this.emitChange();

        if (seconds === null || seconds === undefined) {
            return;
        }

        await this.wait((Number(seconds) || 2) * 1000);
        sprite.think = null;
        this.emitChange();
    }

    show() {
        if (this.shouldStop()) {
            return;
        }

        this.getActiveSprite().visible = true;
        this.emitChange();
    }

    hide() {
        if (this.shouldStop()) {
            return;
        }

        this.getActiveSprite().visible = false;
        this.emitChange();
    }

    changeSizeBy(amount = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.size = Math.max(10, Math.min(400, (Number(sprite.size) || 100) + (Number(amount) || 0)));
        this.emitChange();
    }

    setSize(percent = 100) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.size = Math.max(10, Math.min(400, Number(percent) || 100));
        this.emitChange();
    }

    getSize() {
        return this.getActiveSprite().size ?? 100;
    }

    changeEffectBy(effect = 'color', amount = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const key = String(effect || 'color');
        sprite.effects = sprite.effects ?? structuredClone(DEFAULT_SPRITE.effects);
        sprite.effects[key] = (Number(sprite.effects[key]) || 0) + (Number(amount) || 0);
        this.emitChange();
    }

    setEffectTo(effect = 'color', value = 0) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const key = String(effect || 'color');
        sprite.effects = sprite.effects ?? structuredClone(DEFAULT_SPRITE.effects);
        sprite.effects[key] = Number(value) || 0;
        this.emitChange();
    }

    clearGraphicEffects() {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.effects = structuredClone(DEFAULT_SPRITE.effects);
        this.emitChange();
    }

    goToLayer(edge = 'front') {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const layers = this.sprites.map((item) => item.layer ?? 0);
        const min = Math.min(...layers);
        const max = Math.max(...layers);
        sprite.layer = edge === 'back' ? min - 1 : max + 1;
        this.emitChange();
    }

    goLayers(direction = 'forward', count = 1) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const delta = (Number(count) || 1) * (direction === 'backward' ? -1 : 1);
        sprite.layer = (sprite.layer ?? 0) + delta;
        this.emitChange();
    }

    switchCostume(indexOrName = 1) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        let costumeIndex = 0;

        if (typeof indexOrName === 'string' && Number.isNaN(Number(indexOrName))) {
            const found = sprite.costumes.findIndex((costume) => {
                const entry = typeof costume === 'object' ? costume : { name: costume, emoji: costume };
                return entry.name === indexOrName || entry.emoji === indexOrName;
            });
            costumeIndex = found >= 0 ? found : 0;
        } else {
            costumeIndex = Math.max(0, (Number(indexOrName) || 1) - 1);
        }

        if (costumeIndex >= sprite.costumes.length) {
            return;
        }

        sprite.costumeIndex = costumeIndex;
        this.applyCostumeVisual(sprite);
        this.emitChange();
    }

    nextCostume() {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        if (sprite.costumes.length === 0) {
            return;
        }

        sprite.costumeIndex = (sprite.costumeIndex + 1) % sprite.costumes.length;
        this.applyCostumeVisual(sprite);
        this.emitChange();
    }

    getCostume(property = 'number') {
        const sprite = this.getActiveSprite();
        if (property === 'name') {
            const costume = sprite.costumes[sprite.costumeIndex];
            if (costume && typeof costume === 'object') {
                return costume.name ?? costume.emoji ?? `costume ${sprite.costumeIndex + 1}`;
            }
            return String(costume ?? `costume ${sprite.costumeIndex + 1}`);
        }

        return (sprite.costumeIndex ?? 0) + 1;
    }

    setBackdrop(nameOrColor = '#dbeafe') {
        if (this.shouldStop()) {
            return;
        }

        const value = String(nameOrColor);
        const byName = this.stage.backdrops?.findIndex(
            (backdrop) =>
                backdrop.name === value ||
                backdrop.color === value ||
                backdrop.asset_uuid === value ||
                backdrop.library_id === value,
        );
        const byIndex = Number(value);

        if (byName >= 0) {
            this.stage.backdropIndex = byName;
        } else if (!Number.isNaN(byIndex) && byIndex >= 1 && byIndex <= (this.stage.backdrops?.length ?? 0)) {
            this.stage.backdropIndex = byIndex - 1;
        } else {
            const existing = this.stage.backdrops?.findIndex((backdrop) => backdrop.color === value);
            if (existing >= 0) {
                this.stage.backdropIndex = existing;
            } else {
                this.stage.backdrops = this.stage.backdrops ?? [];
                this.stage.backdrops.push(
                    normalizeBackdropEntry(
                        { id: `backdrop-${this.stage.backdrops.length + 1}`, name: value, color: value },
                        this.stage.backdrops.length,
                    ),
                );
                this.stage.backdropIndex = this.stage.backdrops.length - 1;
            }
        }

        const current = this.stage.backdrops[this.stage.backdropIndex];
        this.applyBackdropVisual();
        this.emitChange();
        this.fireBackdropSwitchHandlers(current?.name ?? value);
    }

    nextBackdrop() {
        if (this.shouldStop()) {
            return;
        }

        if (!this.stage.backdrops?.length) {
            return;
        }

        this.stage.backdropIndex = (this.stage.backdropIndex + 1) % this.stage.backdrops.length;
        const current = this.stage.backdrops[this.stage.backdropIndex];
        this.applyBackdropVisual();
        this.emitChange();
        this.fireBackdropSwitchHandlers(current.name);
    }

    fireBackdropSwitchHandlers(name) {
        const handlers = this.backdropSwitchHandlers.get(String(name ?? '')) ?? [];
        for (const handler of handlers) {
            void this.runScript(handler);
        }
    }

    getBackdrop(property = 'number') {
        if (property === 'name') {
            return this.stage.backdrops?.[this.stage.backdropIndex]?.name ?? 'backdrop';
        }

        return (this.stage.backdropIndex ?? 0) + 1;
    }

    setSoundLibrary(library) {
        this.soundLibrary = library ?? {};
    }

    async playSound(name = 'pop', untilDone = true) {
        if (this.shouldStop()) {
            return;
        }

        const soundKey = String(name);

        if (soundKey.startsWith('asset:')) {
            const assetUuid = soundKey.slice(6);
            const url = this.soundLibrary[assetUuid];

            if (url) {
                const play = this.soundEngine.playUrl(url);
                if (untilDone) {
                    await play;
                }
            }

            return;
        }

        const play = this.soundEngine.playPreset(soundKey);
        if (untilDone) {
            await play;
        }
    }

    async startSound(name = 'pop') {
        await this.playSound(name, false);
    }

    stopAllSounds() {
        this.soundEngine.stopAll();
    }

    changeSoundEffectBy(effect = 'pitch', amount = 0) {
        const key = effect === 'pan left/right' ? 'pan' : 'pitch';
        this.soundEffects[key] = (Number(this.soundEffects[key]) || 0) + (Number(amount) || 0);
        this.soundEngine.setPitch?.(this.soundEffects.pitch);
    }

    setSoundEffectTo(effect = 'pitch', value = 100) {
        const key = effect === 'pan left/right' ? 'pan' : 'pitch';
        this.soundEffects[key] = Number(value) || 0;
        this.soundEngine.setPitch?.(this.soundEffects.pitch);
    }

    clearSoundEffects() {
        this.soundEffects = { pitch: 100, pan: 0 };
        this.soundEngine.setPitch?.(100);
    }

    changeVolumeBy(amount = 0) {
        const next = Math.round((this.soundEngine.volume ?? 1) * 100) + (Number(amount) || 0);
        this.setSoundVolume(next);
    }

    setSoundVolume(percent = 100) {
        this.soundEngine.setVolume(percent);
        this.emitChange();
    }

    getVolume() {
        return Math.round((this.soundEngine.volume ?? 1) * 100);
    }

    getLoudness() {
        return Math.round((this.soundEngine.volume ?? 1) * 100);
    }

    async createCloneOf(target = 'myself') {
        if (this.shouldStop()) {
            return;
        }

        const source =
            target === 'myself'
                ? this.getActiveSprite()
                : this.sprites.find((sprite) => sprite.id === target || sprite.name === target) ?? this.getActiveSprite();

        this.cloneCounter += 1;
        const clone = structuredClone(source);
        clone.id = `${source.cloneOf ?? source.id}-clone-${this.cloneCounter}`;
        clone.name = `${source.name} clone`;
        clone.isClone = true;
        clone.cloneOf = source.cloneOf ?? source.id;
        clone.layer = (source.layer ?? 0) + 1;
        clone.say = null;
        clone.think = null;
        this.sprites.push(clone);
        this.emitChange();

        const previousActive = this.activeSpriteId;
        this.activeSpriteId = clone.id;

        try {
            for (const handler of this.cloneStartHandlers) {
                await this.runScript(handler);
            }
        } finally {
            if (this.sprites.some((sprite) => sprite.id === previousActive)) {
                this.activeSpriteId = previousActive;
            }
            this.emitChange();
        }
    }

    deleteThisClone() {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();

        if (!sprite?.isClone) {
            return;
        }

        const index = this.sprites.findIndex((item) => item.id === sprite.id);

        if (index < 0) {
            return;
        }

        this.sprites.splice(index, 1);
        this.activeSpriteId = sprite.cloneOf ?? this.sprites[0]?.id ?? this.activeSpriteId;
        this.emitChange();
    }

    isTouchingColor(color = '#000000') {
        const sprite = this.getActiveSprite();

        if (!sprite || !this.colorSampler) {
            return false;
        }

        return Boolean(this.colorSampler.isSpriteTouchingColor(sprite, color));
    }

    isColorTouchingColor(colorA = '#000000', colorB = '#000000') {
        const sprite = this.getActiveSprite();

        if (!sprite || !this.colorSampler) {
            return false;
        }

        return Boolean(this.colorSampler.isColorTouchingColor(sprite, colorA, colorB));
    }

    distanceTo(target = 'mouse-pointer') {
        const sprite = this.getActiveSprite();
        let targetX = this.pointer.x;
        let targetY = this.pointer.y;

        if (target !== 'mouse-pointer') {
            const other = this.sprites.find((item) => item.id === target || item.name === target);
            if (other) {
                targetX = other.x;
                targetY = other.y;
            }
        }

        const dx = targetX - sprite.x;
        const dy = targetY - sprite.y;

        return Math.round(Math.sqrt(dx * dx + dy * dy));
    }

    async askAndWait(prompt = "What's your name?") {
        if (this.shouldStop()) {
            return;
        }

        this.asking = String(prompt ?? '');
        this.emitChange();

        const answer = await new Promise((resolve) => {
            this.askResolve = resolve;

            if (typeof window !== 'undefined' && typeof window.prompt === 'function') {
                const value = window.prompt(this.asking, this.answer || '');
                resolve(value ?? '');
            }
        });

        this.answer = String(answer ?? '');
        this.asking = null;
        this.askResolve = null;
        this.emitChange();
    }

    submitAskAnswer(value = '') {
        if (!this.askResolve) {
            return;
        }

        const resolve = this.askResolve;
        this.askResolve = null;
        this.answer = String(value ?? '');
        this.asking = null;
        this.emitChange();
        resolve(this.answer);
    }

    getAnswer() {
        return this.answer;
    }

    isMouseDown() {
        return Boolean(this.pointer.down);
    }

    setDragMode(mode = 'draggable') {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.dragMode = mode === 'not draggable' ? 'not draggable' : 'draggable';
        this.emitChange();
    }

    resetTimer() {
        this.timerOffsetMs = Date.now() - (this.runStartedAt ?? Date.now());
    }

    getCurrent(property = 'year') {
        const now = new Date();

        switch (String(property)) {
            case 'year':
                return now.getFullYear();
            case 'month':
                return now.getMonth() + 1;
            case 'date':
                return now.getDate();
            case 'day of week':
                return now.getDay() + 1;
            case 'hour':
                return now.getHours();
            case 'minute':
                return now.getMinutes();
            case 'second':
                return now.getSeconds();
            default:
                return now.getFullYear();
        }
    }

    getUsername() {
        return this.username;
    }

    isOnline() {
        if (typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean') {
            return navigator.onLine;
        }

        return true;
    }

    setPointerDown(isDown) {
        this.pointer.down = Boolean(isDown);
    }

    updatePointer(clientX, clientY, rect) {
        if (!rect || rect.width <= 0 || rect.height <= 0) {
            return;
        }

        const relX = (clientX - rect.left) / rect.width;
        const relY = (clientY - rect.top) / rect.height;

        this.pointer.x = Math.round((relX - 0.5) * this.stage.width);
        this.pointer.y = Math.round((0.5 - relY) * this.stage.height);
    }

    spriteRadius(sprite) {
        return 24 * ((sprite.size ?? 100) / 100);
    }

    isTouchingEdge() {
        const sprite = this.getActiveSprite();
        const halfWidth = this.stage.width / 2;
        const halfHeight = this.stage.height / 2;
        const radius = this.spriteRadius(sprite);

        return (
            sprite.x + radius >= halfWidth ||
            sprite.x - radius <= -halfWidth ||
            sprite.y + radius >= halfHeight ||
            sprite.y - radius <= -halfHeight
        );
    }

    isTouchingMouse() {
        const sprite = this.getActiveSprite();
        const deltaX = sprite.x - this.pointer.x;
        const deltaY = sprite.y - this.pointer.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        return distance <= this.spriteRadius(sprite);
    }

    getMouseX() {
        return this.pointer.x;
    }

    getMouseY() {
        return this.pointer.y;
    }

    isKeyPressed(key) {
        const normalized = this.normalizeKey(key);

        return this.keysHeld.has(normalized) || this.keysHeld.has(String(key ?? ''));
    }

    getTimer() {
        if (!this.runStartedAt) {
            return 0;
        }

        return (Date.now() - this.runStartedAt - this.timerOffsetMs) / 1000;
    }

    applyPersistedSprites(sprites, activeSpriteId = null) {
        if (!Array.isArray(sprites) || sprites.length === 0) {
            return;
        }

        this.initialSprites = this.normalizeSprites(sprites);
        this.sprites = structuredClone(this.initialSprites);

        if (activeSpriteId && this.initialSprites.some((sprite) => sprite.id === activeSpriteId)) {
            this.activeSpriteId = activeSpriteId;
        } else {
            this.activeSpriteId = this.initialSprites[0].id;
        }

        this.emitChange();
    }

    clampSprite(sprite) {
        const halfWidth = this.stage.width / 2;
        const halfHeight = this.stage.height / 2;

        sprite.x = Math.max(-halfWidth, Math.min(halfWidth, sprite.x));
        sprite.y = Math.max(-halfHeight, Math.min(halfHeight, sprite.y));
    }

    normalizeDirection(direction) {
        const normalized = direction % 360;

        return normalized < 0 ? normalized + 360 : normalized;
    }
}
