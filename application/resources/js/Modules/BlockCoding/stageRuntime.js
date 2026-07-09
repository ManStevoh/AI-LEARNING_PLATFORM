const DEFAULT_STAGE = {
    width: 480,
    height: 360,
    background: '#dbeafe',
};

const DEFAULT_SPRITE = {
    id: 'sprite-1',
    name: 'Sprite',
    x: 0,
    y: 0,
    direction: 90,
    visible: true,
    emoji: '🐱',
    say: null,
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
        this.handlers = [];
        this.stopRequested = false;
        this.loopCount = 0;
        this.state = 'idle';
        this.error = null;
        this.stage = structuredClone(this.initialStage);
        this.sprites = structuredClone(this.initialSprites);
    }

    normalizeSprites(sprites) {
        if (!Array.isArray(sprites) || sprites.length === 0) {
            return [structuredClone(DEFAULT_SPRITE)];
        }

        return sprites.map((sprite, index) => ({
            ...structuredClone(DEFAULT_SPRITE),
            ...sprite,
            id: sprite.id ?? `sprite-${index + 1}`,
        }));
    }

    getSnapshot() {
        return {
            state: this.state,
            error: this.error,
            stage: structuredClone(this.stage),
            sprites: structuredClone(this.sprites),
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

    getPrimarySprite() {
        return this.sprites[0];
    }

    resetForRun() {
        this.handlers = [];
        this.stopRequested = false;
        this.loopCount = 0;
        this.error = null;
        this.stage = structuredClone(this.initialStage);
        this.sprites = structuredClone(this.initialSprites);
        this.setState('idle');
    }

    onGreenFlag(handler) {
        this.handlers.push(handler);
    }

    stop() {
        this.stopRequested = true;
        this.setState('stopped');
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

    async start() {
        if (this.handlers.length === 0) {
            return;
        }

        this.setState('running');

        for (const handler of this.handlers) {
            if (this.stopRequested) {
                break;
            }

            await handler();
        }

        if (!this.stopRequested && this.state === 'running') {
            this.setState('idle');
        }
    }

    async wait(milliseconds = 0) {
        if (this.stopRequested) {
            return;
        }

        await new Promise((resolve) => {
            setTimeout(resolve, Math.max(0, Number(milliseconds) || 0));
        });
    }

    checkLoop() {
        this.loopCount += 1;

        if (this.loopCount > this.maxLoopIterations) {
            throw new Error('Program stopped: loop limit reached.');
        }

        if (this.stopRequested) {
            throw new Error('Program stopped.');
        }
    }

    async moveSteps(steps = 0) {
        if (this.stopRequested) {
            return;
        }

        const sprite = this.getPrimarySprite();
        const distance = Number(steps) || 0;
        const radians = (sprite.direction * Math.PI) / 180;

        sprite.x += distance * Math.sin(radians);
        sprite.y += distance * Math.cos(radians);
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(250);
    }

    async turnDegrees(degrees = 0) {
        if (this.stopRequested) {
            return;
        }

        const sprite = this.getPrimarySprite();
        sprite.direction = this.normalizeDirection(sprite.direction + (Number(degrees) || 0));
        this.emitChange();
        await this.wait(150);
    }

    async goToXY(x = 0, y = 0) {
        if (this.stopRequested) {
            return;
        }

        const sprite = this.getPrimarySprite();
        sprite.x = Number(x) || 0;
        sprite.y = Number(y) || 0;
        this.clampSprite(sprite);
        this.emitChange();
        await this.wait(250);
    }

    async say(message = '', seconds = 2) {
        if (this.stopRequested) {
            return;
        }

        const sprite = this.getPrimarySprite();
        sprite.say = String(message);
        this.emitChange();
        await this.wait((Number(seconds) || 2) * 1000);
        sprite.say = null;
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
