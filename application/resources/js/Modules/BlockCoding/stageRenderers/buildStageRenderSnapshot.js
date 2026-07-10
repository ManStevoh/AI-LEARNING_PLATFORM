import { normalizeBackdropEntry, resolveBackdropImageUrl } from '../backdropAssets.js';
import { resolveCostumeImageUrl } from '../costumeAssets.js';
import { normalizePenTrails, normalizeStamps } from '../penLayer.js';

export function scratchToStagePixels(sprite, stage) {
    const width = stage.width ?? 480;
    const height = stage.height ?? 360;

    return {
        x: width / 2 + sprite.x,
        y: height / 2 - sprite.y,
    };
}

export function spriteRotationDegrees(sprite) {
    const rotationStyle = sprite.rotationStyle ?? 'all around';

    if (rotationStyle === "don't rotate") {
        return 0;
    }

    return sprite.direction - 90;
}

export function spriteScaleX(sprite) {
    const rotationStyle = sprite.rotationStyle ?? 'all around';

    if (rotationStyle !== 'left-right') {
        return 1;
    }

    const normalized = ((sprite.direction % 360) + 360) % 360;

    return normalized > 180 ? -1 : 1;
}

function buildSpriteRenderModel(sprite, stage, lessonSlug) {
    const costume = sprite.costumes?.[sprite.costumeIndex ?? 0];
    const position = scratchToStagePixels(sprite, stage);

    return {
        id: sprite.id,
        name: sprite.name,
        visible: sprite.visible !== false,
        x: position.x,
        y: position.y,
        rotation: spriteRotationDegrees(sprite),
        scaleX: spriteScaleX(sprite),
        scale: (sprite.size ?? 100) / 100,
        layer: sprite.layer ?? 0,
        emoji: sprite.emoji ?? '🐱',
        imageUrl: resolveCostumeImageUrl(costume, lessonSlug),
        effects: {
            ghost: Math.max(0, Math.min(100, sprite.effects?.ghost ?? 0)),
            brightness: Math.max(-100, Math.min(100, sprite.effects?.brightness ?? 0)),
            color: (sprite.effects?.color ?? 0) % 200,
            fisheye: Math.max(0, sprite.effects?.fisheye ?? 0),
            whirl: Math.max(0, sprite.effects?.whirl ?? 0),
            pixelate: Math.max(0, sprite.effects?.pixelate ?? 0),
            mosaic: Math.max(0, sprite.effects?.mosaic ?? 0),
        },
        say: sprite.say ?? null,
        think: sprite.think ?? null,
    };
}

function buildStampRenderModel(stamp, stage, lessonSlug) {
    const position = scratchToStagePixels({ x: stamp.x, y: stamp.y }, stage);
    const costume = stamp.costume;

    return {
        spriteId: stamp.spriteId,
        x: position.x,
        y: position.y,
        rotation: stamp.direction - 90,
        scale: (stamp.size ?? 100) / 100,
        layer: stamp.layer ?? 0,
        emoji:
            costume?.emoji ??
            (typeof costume === 'string' ? costume : '🐱'),
        imageUrl: resolveCostumeImageUrl(costume, lessonSlug),
    };
}

export function buildStageRenderSnapshot(snapshot, lessonSlug = null) {
    const stage = snapshot?.stage ?? {};
    const backdrop = stage.backdrops?.[stage.backdropIndex ?? 0];
    const normalizedBackdrop = backdrop ? normalizeBackdropEntry(backdrop) : null;

    return {
        width: stage.width ?? 480,
        height: stage.height ?? 360,
        background: stage.background ?? '#dbeafe',
        backdropImageUrl: normalizedBackdrop
            ? resolveBackdropImageUrl(normalizedBackdrop, lessonSlug)
            : null,
        penTrails: normalizePenTrails(stage.penTrails),
        stamps: normalizeStamps(stage.stamps)
            .map((stamp) => buildStampRenderModel(stamp, stage, lessonSlug))
            .sort((left, right) => left.layer - right.layer),
        sprites: (snapshot?.sprites ?? [])
            .map((sprite) => buildSpriteRenderModel(sprite, stage, lessonSlug))
            .sort((left, right) => left.layer - right.layer),
        activeSpriteId: snapshot?.activeSpriteId ?? null,
    };
}
