export const PROJECT_FORMAT = 'ace_project';
export const PROJECT_VERSION = '1.1';

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
            emoji: sprite.emoji,
            costumes: Array.isArray(sprite.costumes) ? sprite.costumes : [sprite.emoji],
            costumeIndex: sprite.costumeIndex ?? 0,
        }));
    }

    if (typeof extras.active_sprite_id === 'string') {
        envelope.active_sprite_id = extras.active_sprite_id;
    }

    return envelope;
}
