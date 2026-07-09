import { normalizeCostumeEntry } from './costumeAssets.js';
import { SoundEngine } from './soundEngine.js';

const DEFAULT_STAGE = {
    width: 480,
    height: 360,
    background: '#dbeafe',
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
    say: null,
    think: null,
};

export class StageRuntime {
    constructor(config = {}, onUpdate = null) {
        this.onUpdate = onUpdate;
        this.maxRunMs = config.runtime?.max_run_ms ?? 10000;
        this.maxLoopIterations = config.runtime?.max_loop_iterations ?? 10000;
        this.initialStage = {
            ...DEFAULT_STAGE,
            ...config.stage,
        };
        this.initialSprites = this.normalizeSprites(config.stage?.sprites);
        this.activeSpriteId = config.active_sprite_id ?? this.initialSprites[0]?.id ?? 'sprite-1';
        this.greenFlagHandlers = [];
        this.keyHandlers = new Map();
        this.broadcastHandlers = new Map();
        this.spriteClickHandlers = new Map();
        this.stopRequested = false;
        this.activeScriptContext = null;
        this.loopCount = 0;
        this.state = 'idle';
        this.error = null;
        this.boundKeyDown = null;
        this.boundKeyUp = null;
        this.keysHeld = new Set();
        this.pointer = { x: 0, y: 0 };
        this.runStartedAt = null;
        this.inputListenersAttached = false;
        this.soundEngine = new SoundEngine();
        this.soundLibrary = config.sound_library ?? {};
        this.stage = structuredClone(this.initialStage);
        this.sprites = structuredClone(this.initialSprites);
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
        } else {
            sprite.emoji = costume.emoji ?? DEFAULT_SPRITE.emoji;
            sprite.costumeAssetUuid = null;
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
    }

    getSnapshot() {
        return {
            state: this.state,
            error: this.error,
            stage: structuredClone(this.stage),
            sprites: structuredClone(this.sprites),
            activeSpriteId: this.activeSpriteId,
        };
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

    resetForRun() {
        this.greenFlagHandlers = [];
        this.keyHandlers = new Map();
        this.broadcastHandlers = new Map();
        this.spriteClickHandlers = new Map();
        this.stopRequested = false;
        this.activeScriptContext = null;
        this.stopResolve = null;
        this.loopCount = 0;
        this.error = null;
        this.stage = structuredClone(this.initialStage);
        this.sprites = structuredClone(this.initialSprites);
        this.keysHeld.clear();
        this.pointer = { x: 0, y: 0 };
        this.runStartedAt = null;
        this.soundEngine.stopAll();
        this.finishEventLoop();
        this.setState('idle');
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
            this.spriteClickHandlers.size > 0
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

        this.detachInputListeners();
    }

    waitUntilStopped() {
        return new Promise((resolve) => {
            this.stopResolve = resolve;
        });
    }

    finishEventLoop() {
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

    async pointInDirection(degrees = 90) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.direction = this.normalizeDirection(Number(degrees) || 0);
        this.emitChange();
        await this.wait(100);
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

    async say(message = '', seconds = 2) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.think = null;
        sprite.say = String(message);
        this.emitChange();
        await this.wait((Number(seconds) || 2) * 1000);
        sprite.say = null;
        this.emitChange();
    }

    async think(message = '', seconds = 2) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.say = null;
        sprite.think = String(message);
        this.emitChange();
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

    setSize(percent = 100) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        sprite.size = Math.max(10, Math.min(400, Number(percent) || 100));
        this.emitChange();
    }

    switchCostume(index = 1) {
        if (this.shouldStop()) {
            return;
        }

        const sprite = this.getActiveSprite();
        const costumeIndex = Math.max(0, (Number(index) || 1) - 1);

        if (costumeIndex >= sprite.costumes.length) {
            return;
        }

        sprite.costumeIndex = costumeIndex;
        this.applyCostumeVisual(sprite);
        this.emitChange();
    }

    setBackdrop(color = '#dbeafe') {
        if (this.shouldStop()) {
            return;
        }

        this.stage.background = String(color);
        this.emitChange();
    }

    setSoundLibrary(library) {
        this.soundLibrary = library ?? {};
    }

    async playSound(name = 'pop') {
        if (this.shouldStop()) {
            return;
        }

        const soundKey = String(name);

        if (soundKey.startsWith('asset:')) {
            const assetUuid = soundKey.slice(6);
            const url = this.soundLibrary[assetUuid];

            if (url) {
                await this.soundEngine.playUrl(url);
            }

            return;
        }

        await this.soundEngine.playPreset(soundKey);
    }

    stopAllSounds() {
        this.soundEngine.stopAll();
    }

    setSoundVolume(percent = 100) {
        this.soundEngine.setVolume(percent);
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

        return (Date.now() - this.runStartedAt) / 1000;
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
