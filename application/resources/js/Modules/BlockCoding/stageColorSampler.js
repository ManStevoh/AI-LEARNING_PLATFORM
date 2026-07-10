import { normalizeBackdropEntry, resolveBackdropImageUrl } from './backdropAssets.js';
import { costumeImageUrl } from './costumeAssets.js';

export const DEFAULT_COLOR_TOLERANCE = 10;

const SPRITE_FACE_PX = 48;

export function normalizeHexColor(color = '#000000') {
    const value = String(color ?? '#000000').trim().toLowerCase();

    if (!value.startsWith('#')) {
        return { r: 0, g: 0, b: 0 };
    }

    const hex = value.slice(1);

    if (hex.length === 3) {
        return {
            r: Number.parseInt(hex[0] + hex[0], 16),
            g: Number.parseInt(hex[1] + hex[1], 16),
            b: Number.parseInt(hex[2] + hex[2], 16),
        };
    }

    if (hex.length >= 6) {
        return {
            r: Number.parseInt(hex.slice(0, 2), 16),
            g: Number.parseInt(hex.slice(2, 4), 16),
            b: Number.parseInt(hex.slice(4, 6), 16),
        };
    }

    return { r: 0, g: 0, b: 0 };
}

export function colorsMatch(rgbA, rgbB, tolerance = DEFAULT_COLOR_TOLERANCE) {
    return (
        Math.abs(rgbA.r - rgbB.r) <= tolerance &&
        Math.abs(rgbA.g - rgbB.g) <= tolerance &&
        Math.abs(rgbA.b - rgbB.b) <= tolerance
    );
}

function scratchToCanvas(x, y, width, height) {
    return {
        cx: width / 2 + x,
        cy: height / 2 - y,
    };
}

function spriteRadius(sprite) {
    return 24 * ((sprite.size ?? 100) / 100);
}

function readPixel(imageData, width, x, y) {
    const index = (y * width + x) * 4;

    return {
        r: imageData.data[index],
        g: imageData.data[index + 1],
        b: imageData.data[index + 2],
        a: imageData.data[index + 3],
    };
}

function spriteMaskPoints(sprite, width, height) {
    const { cx, cy } = scratchToCanvas(sprite.x, sprite.y, width, height);
    const radius = spriteRadius(sprite);
    const points = [];
    const step = 4;

    for (let dx = -radius; dx <= radius; dx += step) {
        for (let dy = -radius; dy <= radius; dy += step) {
            if (dx * dx + dy * dy > radius * radius) {
                continue;
            }

            points.push({
                x: Math.round(cx + dx),
                y: Math.round(cy + dy),
            });
        }
    }

    return points;
}

function resolveCostumeUrl(sprite, lessonSlug) {
    if (!sprite?.costumeAssetUuid || !lessonSlug) {
        return null;
    }

    return costumeImageUrl(lessonSlug, sprite.costumeAssetUuid);
}

function collectImageUrls(snapshot, lessonSlug) {
    const urls = new Set();
    const stage = snapshot?.stage ?? {};
    const backdrop = stage.backdrops?.[stage.backdropIndex ?? 0];

    if (backdrop) {
        const backdropUrl = resolveBackdropImageUrl(normalizeBackdropEntry(backdrop), lessonSlug);

        if (backdropUrl) {
            urls.add(backdropUrl);
        }
    }

    for (const sprite of snapshot?.sprites ?? []) {
        const costumeUrl = resolveCostumeUrl(sprite, lessonSlug);

        if (costumeUrl) {
            urls.add(costumeUrl);
        }
    }

    return Array.from(urls);
}

export class StageColorSampler {
    constructor(width = 480, height = 360) {
        this.width = width;
        this.height = height;
        this.imageCache = new Map();
        this.canvas = null;
        this.ctx = null;
        this.spriteCanvas = null;
        this.spriteCtx = null;

        if (typeof document !== 'undefined') {
            this.canvas = document.createElement('canvas');
            this.canvas.width = width;
            this.canvas.height = height;
            this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

            this.spriteCanvas = document.createElement('canvas');
            this.spriteCanvas.width = width;
            this.spriteCanvas.height = height;
            this.spriteCtx = this.spriteCanvas.getContext('2d', { willReadFrequently: true });
        }
    }

    async preloadImages(urls = []) {
        if (typeof Image === 'undefined') {
            return;
        }

        await Promise.all(
            urls.map(
                (url) =>
                    new Promise((resolve) => {
                        if (!url || this.imageCache.has(url)) {
                            resolve();
                            return;
                        }

                        const image = new Image();
                        image.crossOrigin = 'anonymous';
                        image.decoding = 'async';
                        image.onload = () => {
                            this.imageCache.set(url, image);
                            resolve();
                        };
                        image.onerror = () => resolve();
                        image.src = url;
                    }),
            ),
        );
    }

    drawBackdrop(ctx, stage, lessonSlug) {
        const backdrop = stage.backdrops?.[stage.backdropIndex ?? 0];
        const imageUrl = backdrop
            ? resolveBackdropImageUrl(normalizeBackdropEntry(backdrop), lessonSlug)
            : null;
        const cached = imageUrl ? this.imageCache.get(imageUrl) : null;

        if (cached) {
            ctx.drawImage(cached, 0, 0, this.width, this.height);
            return;
        }

        ctx.fillStyle = stage.background ?? '#dbeafe';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    drawSprite(ctx, sprite, lessonSlug) {
        const { cx, cy } = scratchToCanvas(sprite.x, sprite.y, this.width, this.height);
        const scale = (sprite.size ?? 100) / 100;
        const costumeUrl = resolveCostumeUrl(sprite, lessonSlug);
        const cached = costumeUrl ? this.imageCache.get(costumeUrl) : null;

        if (cached) {
            const size = SPRITE_FACE_PX * scale;
            ctx.drawImage(cached, cx - size / 2, cy - size / 2, size, size);
            return;
        }

        ctx.font = `${Math.round(32 * scale)}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sprite.emoji ?? '🐱', cx, cy);
    }

    renderStageWithoutSprite(snapshot, excludeSpriteId, lessonSlug) {
        const ctx = this.ctx;
        const stage = snapshot.stage ?? {};
        const sprites = (snapshot.sprites ?? [])
            .filter((sprite) => sprite.visible !== false && sprite.id !== excludeSpriteId)
            .sort((left, right) => (left.layer ?? 0) - (right.layer ?? 0));

        ctx.clearRect(0, 0, this.width, this.height);
        this.drawBackdrop(ctx, stage, lessonSlug);

        for (const sprite of sprites) {
            this.drawSprite(ctx, sprite, lessonSlug);
        }

        return ctx.getImageData(0, 0, this.width, this.height);
    }

    renderSpriteLayer(sprite, lessonSlug) {
        const ctx = this.spriteCtx;

        ctx.clearRect(0, 0, this.width, this.height);
        this.drawSprite(ctx, sprite, lessonSlug);

        return ctx.getImageData(0, 0, this.width, this.height);
    }

    isSpriteTouchingColor(sprite, targetColor, snapshot, lessonSlug = null) {
        if (!this.ctx || !sprite) {
            return false;
        }

        const target = normalizeHexColor(targetColor);
        const stageData = this.renderStageWithoutSprite(snapshot, sprite.id, lessonSlug);
        const points = spriteMaskPoints(sprite, this.width, this.height);

        for (const point of points) {
            if (point.x < 0 || point.y < 0 || point.x >= this.width || point.y >= this.height) {
                continue;
            }

            const pixel = readPixel(stageData, this.width, point.x, point.y);

            if (pixel.a < 10) {
                continue;
            }

            if (colorsMatch(pixel, target)) {
                return true;
            }
        }

        return false;
    }

    isColorTouchingColor(sprite, colorA, colorB, snapshot, lessonSlug = null) {
        if (!this.ctx || !sprite) {
            return false;
        }

        const targetA = normalizeHexColor(colorA);
        const targetB = normalizeHexColor(colorB);
        const stageData = this.renderStageWithoutSprite(snapshot, sprite.id, lessonSlug);
        const spriteData = this.renderSpriteLayer(sprite, lessonSlug);
        const points = spriteMaskPoints(sprite, this.width, this.height);

        for (const point of points) {
            if (point.x < 0 || point.y < 0 || point.x >= this.width || point.y >= this.height) {
                continue;
            }

            const spritePixel = readPixel(spriteData, this.width, point.x, point.y);

            if (spritePixel.a < 64) {
                continue;
            }

            if (!colorsMatch(spritePixel, targetA)) {
                continue;
            }

            const stagePixel = readPixel(stageData, this.width, point.x, point.y);

            if (colorsMatch(stagePixel, targetB)) {
                return true;
            }
        }

        return false;
    }
}

export function createStageColorSamplerAdapter(snapshot, lessonSlug = null) {
    const stage = snapshot?.stage ?? {};
    const sampler = new StageColorSampler(stage.width ?? 480, stage.height ?? 360);

    const adapter = {
        async prepare() {
            await sampler.preloadImages(collectImageUrls(snapshot, lessonSlug));
        },
        isSpriteTouchingColor(sprite, color) {
            return sampler.isSpriteTouchingColor(sprite, color, snapshot, lessonSlug);
        },
        isColorTouchingColor(sprite, colorA, colorB) {
            return sampler.isColorTouchingColor(sprite, colorA, colorB, snapshot, lessonSlug);
        },
        dispose() {
            sampler.imageCache.clear();
        },
    };

    return adapter;
}
