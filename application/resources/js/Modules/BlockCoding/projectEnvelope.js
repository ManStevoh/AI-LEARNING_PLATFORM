import { normalizeCostumeEntry, serializeCostumeEntry } from './costumeAssets.js';
import { normalizeBackdropEntry, serializeBackdropEntry } from './backdropAssets.js';
import { normalizeMonitorState, serializeMonitors } from './stageMonitors.js';

export const PROJECT_FORMAT = 'ace_project';
export const PROJECT_VERSION = '1.9';

export function isProjectEnvelope(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        value.format === PROJECT_FORMAT &&
        typeof value.blockly === 'object'
    );
}

export function extractBlocklyState(projectState) {
    if (isProjectEnvelope(projectState)) {
        return projectState.blockly;
    }

    return projectState;
}

export function extractInitialSprites(projectState, fallbackSprites = null) {
    if (isProjectEnvelope(projectState) && Array.isArray(projectState.sprites)) {
        return projectState.sprites;
    }

    if (Array.isArray(fallbackSprites) && fallbackSprites.length > 0) {
        return fallbackSprites;
    }

    return null;
}

export function extractInitialSounds(projectState) {
    if (!isProjectEnvelope(projectState) || !Array.isArray(projectState.sounds)) {
        return [];
    }

    return projectState.sounds
        .filter((sound) => typeof sound?.asset_uuid === 'string' && typeof sound?.name === 'string')
        .map((sound) => ({
            id: sound.id ?? sound.asset_uuid,
            name: sound.name,
            asset_uuid: sound.asset_uuid,
        }));
}

export function extractInitialStage(projectState) {
    if (!isProjectEnvelope(projectState) || !projectState.stage || typeof projectState.stage !== 'object') {
        return null;
    }

    const stage = projectState.stage;
    const backdrops = Array.isArray(stage.backdrops)
        ? stage.backdrops.map((backdrop, index) => normalizeBackdropEntry(backdrop, index))
        : null;

    if (!backdrops || backdrops.length === 0) {
        return null;
    }

    return {
        backdrops,
        backdropIndex: Math.min(Math.max(0, stage.backdropIndex ?? 0), backdrops.length - 1),
    };
}

export function extractInitialMonitors(projectState) {
    if (!isProjectEnvelope(projectState) || !Array.isArray(projectState.monitors)) {
        return [];
    }

    return projectState.monitors
        .map((monitor, index) => normalizeMonitorState(monitor, index))
        .filter(Boolean);
}

export function extractActiveSpriteId(projectState, fallbackId = null) {
    if (isProjectEnvelope(projectState) && typeof projectState.active_sprite_id === 'string') {
        return projectState.active_sprite_id;
    }

    return fallbackId;
}

export function buildProjectEnvelope(blocklyState, extras = {}) {
    const envelope = {
        format: PROJECT_FORMAT,
        version: PROJECT_VERSION,
        blockly: blocklyState,
    };

    if (Array.isArray(extras.sprites) && extras.sprites.length > 0) {
        envelope.sprites = extras.sprites.map((sprite) => ({
            id: sprite.id,
            name: sprite.name,
            x: sprite.x,
            y: sprite.y,
            direction: sprite.direction,
            visible: sprite.visible,
            size: sprite.size ?? 100,
            emoji: typeof sprite.emoji === 'string' ? sprite.emoji : '🐱',
            costumes: (Array.isArray(sprite.costumes) ? sprite.costumes : [sprite.emoji]).map((costume) =>
                serializeCostumeEntry(costume),
            ),
            costumeIndex: sprite.costumeIndex ?? 0,
        }));
    }

    if (typeof extras.active_sprite_id === 'string') {
        envelope.active_sprite_id = extras.active_sprite_id;
    }

    if (Array.isArray(extras.sounds) && extras.sounds.length > 0) {
        envelope.sounds = extras.sounds.map((sound) => ({
            id: sound.id ?? sound.asset_uuid,
            name: sound.name,
            asset_uuid: sound.asset_uuid,
        }));
    }

    if (extras.stage && Array.isArray(extras.stage.backdrops) && extras.stage.backdrops.length > 0) {
        envelope.stage = {
            backdrops: extras.stage.backdrops.map((backdrop, index) => serializeBackdropEntry(backdrop, index)),
            backdropIndex: extras.stage.backdropIndex ?? 0,
        };
    }

    const monitors = serializeMonitors(extras.monitors);

    if (monitors.length > 0) {
        envelope.monitors = monitors;
    }

    return envelope;
}
