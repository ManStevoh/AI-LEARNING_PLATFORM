import { normalizeHexColor } from './stageColorSampler.js';

export const DEFAULT_ROBOT_SENSORS = ['distance', 'light', 'touch'];

export function normalizeRobotSensor(name) {
    const normalized = String(name ?? '').trim().toLowerCase();

    if (DEFAULT_ROBOT_SENSORS.includes(normalized)) {
        return normalized;
    }

    return 'distance';
}

function spriteRadius(sprite) {
    return 24 * ((sprite?.size ?? 100) / 100);
}

function isSpriteTouchingEdge(sprite, stage) {
    if (!sprite || !stage) {
        return false;
    }

    const halfWidth = stage.width / 2;
    const halfHeight = stage.height / 2;
    const radius = spriteRadius(sprite);

    return (
        sprite.x + radius >= halfWidth ||
        sprite.x - radius <= -halfWidth ||
        sprite.y + radius >= halfHeight ||
        sprite.y - radius <= -halfHeight
    );
}

function distanceToStageCenter(sprite) {
    return Math.round(Math.sqrt(sprite.x * sprite.x + sprite.y * sprite.y));
}

function distanceToNearestEdge(sprite, stage) {
    const halfWidth = stage.width / 2;
    const halfHeight = stage.height / 2;
    const radius = spriteRadius(sprite);

    const distances = [
        halfWidth - sprite.x - radius,
        sprite.x + halfWidth - radius,
        halfHeight - sprite.y - radius,
        sprite.y + halfHeight - radius,
    ];

    return Math.round(Math.max(0, Math.min(...distances)));
}

function clampSensorValue(value, min = 0, max = 200) {
    return Math.max(min, Math.min(max, value));
}

function resolveBackdropColor(stage) {
    const current = stage?.backdrops?.[stage?.backdropIndex ?? 0];

    return current?.color ?? stage?.background ?? '#dbeafe';
}

function brightnessFromHex(hex) {
    const { r, g, b } = normalizeHexColor(hex);
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return Math.round(Math.max(0, Math.min(100, brightness * 100)));
}

export function computeRobotSensorReading(sensor, runtimeContext = {}) {
    const normalized = normalizeRobotSensor(sensor);
    const sprite = runtimeContext.sprite;
    const stage = runtimeContext.stage ?? { width: 480, height: 360 };

    if (!sprite) {
        return normalized === 'touch' ? 0 : 0;
    }

    switch (normalized) {
        case 'distance': {
            const toCenter = distanceToStageCenter(sprite);
            const toEdge = distanceToNearestEdge(sprite, stage);

            return clampSensorValue(Math.min(toCenter, toEdge), 0, 200);
        }
        case 'light':
            return brightnessFromHex(resolveBackdropColor(stage));
        case 'touch':
            return isSpriteTouchingEdge(sprite, stage) ? 1 : 0;
        default:
            return 0;
    }
}
