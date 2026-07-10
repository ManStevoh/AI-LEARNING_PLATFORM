import { buildStageRenderSnapshot } from './buildStageRenderSnapshot.js';
import { scratchSegmentToStagePixels } from '../penLayer.js';
import { buildPixiSpriteFilters } from './pixiSpriteFilters.js';

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

function applySpritePresentation(node, displayObject, effects, pixi) {
    const presentation = buildPixiSpriteFilters(effects, pixi);

    displayObject.alpha = presentation.alpha;
    node.filters = presentation.filters;

    if (presentation.quantize > 0) {
        const step = presentation.quantize;
        node.x = Math.round(node.x / step) * step;
        node.y = Math.round(node.y / step) * step;
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
        this.penLayer = new pixi.Graphics();
        this.penStampLayer = new pixi.Container();
        this.spriteLayer = new pixi.Container();
        this.app.stage.sortableChildren = true;
        this.backdropLayer.zIndex = 0;
        this.penLayer.zIndex = 5;
        this.penStampLayer.zIndex = 6;
        this.spriteLayer.zIndex = 10;
        this.app.stage.addChild(this.backdropLayer);
        this.app.stage.addChild(this.penLayer);
        this.app.stage.addChild(this.penStampLayer);
        this.app.stage.addChild(this.spriteLayer);
        this.stampNodes = new Map();
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
        this.drawPen(renderSnapshot);
        await this.drawStamps(renderSnapshot);
        await this.drawSprites(renderSnapshot, { interactive, onSpriteClick, activeSpriteId });
    }

    drawPen(renderSnapshot) {
        const stage = { width: renderSnapshot.width, height: renderSnapshot.height };
        this.penLayer.clear();

        for (const segment of renderSnapshot.penTrails ?? []) {
            const line = scratchSegmentToStagePixels(segment, stage);
            this.penLayer.moveTo(line.x1, line.y1);
            this.penLayer.lineTo(line.x2, line.y2);
            this.penLayer.stroke({
                width: segment.size,
                color: segment.color,
                cap: 'round',
            });
        }
    }

    async drawStamps(renderSnapshot) {
        const { Container, Sprite, Text } = this.pixi;
        const seen = new Set();

        for (const stamp of renderSnapshot.stamps ?? []) {
            const stampKey = `${stamp.spriteId}-${stamp.x}-${stamp.y}-${stamp.rotation}`;
            seen.add(stampKey);

            let node = this.stampNodes.get(stampKey);

            if (!node) {
                node = new Container();
                this.penStampLayer.addChild(node);
                this.stampNodes.set(stampKey, node);
            }

            node.zIndex = stamp.layer ?? 0;
            node.x = stamp.x;
            node.y = stamp.y;
            node.rotation = (stamp.rotation * Math.PI) / 180;
            node.scale.set(stamp.scale ?? 1);
            node.removeChildren();

            const texture = await loadTextureFromUrl(stamp.imageUrl, this.textureCache, this.pixi.Texture);
            let displayObject;

            if (texture) {
                displayObject = new Sprite(texture);
                const size = SPRITE_FACE_PX * (stamp.scale ?? 1);
                displayObject.anchor.set(0.5);
                displayObject.width = size;
                displayObject.height = size;
            } else {
                displayObject = new Text({
                    text: stamp.emoji ?? '🐱',
                    style: {
                        fontFamily: '"Segoe UI Emoji", "Apple Color Emoji", sans-serif',
                        fontSize: Math.round(32 * (stamp.scale ?? 1)),
                        align: 'center',
                    },
                });
                displayObject.anchor.set(0.5);
            }

            node.addChild(displayObject);
        }

        for (const [stampKey, node] of this.stampNodes.entries()) {
            if (!seen.has(stampKey)) {
                this.penStampLayer.removeChild(node);
                node.destroy({ children: true });
                this.stampNodes.delete(stampKey);
            }
        }

        this.penStampLayer.sortChildren();
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
            node.zIndex = 10 + sprite.layer;
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

            applySpritePresentation(node, displayObject, sprite.effects, this.pixi);
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

        for (const node of this.stampNodes?.values() ?? []) {
            node.destroy({ children: true });
        }

        this.stampNodes?.clear();

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
