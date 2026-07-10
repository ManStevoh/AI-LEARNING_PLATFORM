import { buildStageRenderSnapshot } from './buildStageRenderSnapshot.js';

const SPRITE_FACE_PX = 48;

async function loadTextureFromUrl(url, cache, Texture) {
    if (!url) {
        return null;
    }

    if (cache.has(url)) {
        return cache.get(url);
    }

    try {
        const response = await fetch(url, { credentials: 'same-origin' });

        if (!response.ok) {
            return null;
        }

        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);
        const texture = Texture.from(bitmap);
        cache.set(url, texture);

        return texture;
    } catch {
        return null;
    }
}

function applySpriteEffects(displayObject, effects, ColorMatrixFilter) {
    const ghost = effects?.ghost ?? 0;
    const brightness = effects?.brightness ?? 0;
    const hue = (effects?.color ?? 0) * 1.8;

    displayObject.alpha = 1 - ghost / 100;

    if (brightness !== 0 || hue !== 0) {
        const filter = new ColorMatrixFilter();
        filter.hue(hue, false);
        filter.brightness(1 + brightness / 100, false);
        displayObject.filters = [filter];
    } else {
        displayObject.filters = null;
    }
}

export class PixiStageRenderer {
    constructor() {
        this.textureCache = new Map();
        this.spriteNodes = new Map();
        this.mounted = false;
        this.options = {};
    }

    async mount(container, options = {}) {
        this.container = container;
        this.options = options;

        const pixi = await import('pixi.js');
        this.pixi = pixi;

        const width = options.width ?? 480;
        const height = options.height ?? 360;

        this.app = new pixi.Application();
        await this.app.init({
            width,
            height,
            backgroundAlpha: 0,
            antialias: true,
            resolution: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
            autoDensity: true,
        });

        this.app.canvas.style.display = 'block';
        this.app.canvas.style.width = '100%';
        this.app.canvas.style.height = '100%';
        this.app.canvas.className = 'block-stage-canvas';
        container.appendChild(this.app.canvas);

        this.backdropLayer = new pixi.Graphics();
        this.spriteLayer = new pixi.Container();
        this.app.stage.sortableChildren = true;
        this.app.stage.addChild(this.backdropLayer);
        this.app.stage.addChild(this.spriteLayer);
        this.mounted = true;
    }

    async render(snapshot, lessonSlug = null, runtimeOptions = {}) {
        if (!this.mounted) {
            return;
        }

        const renderSnapshot = buildStageRenderSnapshot(snapshot, lessonSlug);
        const interactive = runtimeOptions.interactive ?? false;
        const onSpriteClick = runtimeOptions.onSpriteClick ?? null;
        const activeSpriteId = runtimeOptions.activeSpriteId ?? renderSnapshot.activeSpriteId;

        await this.drawBackdrop(renderSnapshot);
        await this.drawSprites(renderSnapshot, { interactive, onSpriteClick, activeSpriteId });
    }

    async drawBackdrop(renderSnapshot) {
        const { Sprite } = this.pixi;
        const { width, height, background, backdropImageUrl } = renderSnapshot;

        if (this.backdropSprite) {
            this.backdropLayer.removeChild(this.backdropSprite);
            this.backdropSprite.destroy();
            this.backdropSprite = null;
        }

        this.backdropLayer.clear();

        const texture = await loadTextureFromUrl(backdropImageUrl, this.textureCache, this.pixi.Texture);

        if (texture) {
            this.backdropSprite = new Sprite(texture);
            this.backdropSprite.width = width;
            this.backdropSprite.height = height;
            this.backdropLayer.addChild(this.backdropSprite);

            return;
        }

        this.backdropLayer.rect(0, 0, width, height);
        this.backdropLayer.fill(background ?? '#dbeafe');
    }

    async drawSprites(renderSnapshot, runtimeOptions) {
        const { Container, Sprite, Text } = this.pixi;
        const seen = new Set();

        for (const sprite of renderSnapshot.sprites) {
            seen.add(sprite.id);

            let node = this.spriteNodes.get(sprite.id);

            if (!node) {
                node = new Container();
                node.eventMode = 'static';
                node.cursor = 'pointer';
                this.spriteLayer.addChild(node);
                this.spriteNodes.set(sprite.id, node);
            }

            node.visible = sprite.visible;
            node.zIndex = sprite.layer;
            node.x = sprite.x;
            node.y = sprite.y;
            node.rotation = (sprite.rotation * Math.PI) / 180;
            node.scale.set(sprite.scale * sprite.scaleX, sprite.scale);

            node.removeChildren();

            const texture = await loadTextureFromUrl(sprite.imageUrl, this.textureCache, this.pixi.Texture);
            let displayObject;

            if (texture) {
                displayObject = new Sprite(texture);
                const size = SPRITE_FACE_PX * sprite.scale;
                displayObject.anchor.set(0.5);
                displayObject.width = size;
                displayObject.height = size;
            } else {
                displayObject = new Text({
                    text: sprite.emoji,
                    style: {
                        fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", sans-serif',
                        fontSize: Math.round(32 * sprite.scale),
                        align: 'center',
                    },
                });
                displayObject.anchor.set(0.5);
            }

            applySpriteEffects(displayObject, sprite.effects, this.pixi.ColorMatrixFilter);
            node.addChild(displayObject);

            node.off('pointertap');

            if (runtimeOptions.interactive && runtimeOptions.onSpriteClick) {
                node.on('pointertap', () => runtimeOptions.onSpriteClick(sprite.id));
            }
        }

        for (const [spriteId, node] of this.spriteNodes.entries()) {
            if (!seen.has(spriteId)) {
                this.spriteLayer.removeChild(node);
                node.destroy({ children: true });
                this.spriteNodes.delete(spriteId);
            }
        }

        this.spriteLayer.sortChildren();
    }

    resize(width, height) {
        if (!this.app || !this.mounted) {
            return;
        }

        this.app.renderer.resize(width, height);
    }

    destroy() {
        for (const node of this.spriteNodes.values()) {
            node.destroy({ children: true });
        }

        this.spriteNodes.clear();

        for (const texture of this.textureCache.values()) {
            texture.destroy(true);
        }

        this.textureCache.clear();
        this.app?.destroy(true, { children: true, texture: true });
        this.app = null;
        this.mounted = false;

        if (this.container) {
            this.container.replaceChildren();
        }
    }
}
