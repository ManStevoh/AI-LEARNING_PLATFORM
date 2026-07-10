import { normalizeCostumeEntry, serializeCostumeEntry } from './costumeAssets.js';

export const DEFAULT_PEN = {
    down: false,
    color: '#000000',
    size: 1,
};

export function normalizePenColor(color = '#000000') {
    const value = String(color ?? '#000000').trim();

    if (value.startsWith('#')) {
        return value.length === 4
            ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
            : value;
    }

    return '#000000';
}

export function normalizePenSize(size = 1) {
    return Math.max(1, Math.min(100, Math.round(Number(size) || 1)));
}

export function normalizePenState(pen = {}) {
    return {
        down: Boolean(pen.down),
        color: normalizePenColor(pen.color),
        size: normalizePenSize(pen.size),
    };
}

export function normalizePenTrailSegment(segment = {}) {
    return {
        x1: Number(segment.x1) || 0,
        y1: Number(segment.y1) || 0,
        x2: Number(segment.x2) || 0,
        y2: Number(segment.y2) || 0,
        color: normalizePenColor(segment.color),
        size: normalizePenSize(segment.size),
        spriteId: typeof segment.spriteId === 'string' ? segment.spriteId : null,
    };
}

export function normalizePenTrails(trails = []) {
    if (!Array.isArray(trails)) {
        return [];
    }

    return trails.map((segment) => normalizePenTrailSegment(segment));
}

export function normalizeStampEntry(stamp = {}) {
    return {
        spriteId: typeof stamp.spriteId === 'string' ? stamp.spriteId : null,
        x: Number(stamp.x) || 0,
        y: Number(stamp.y) || 0,
        direction: Number(stamp.direction) || 90,
        size: Math.max(1, Math.min(500, Math.round(Number(stamp.size) || 100))),
        costume: normalizeCostumeEntry(stamp.costume),
        layer: Number(stamp.layer) || 0,
    };
}

export function normalizeStamps(stamps = []) {
    if (!Array.isArray(stamps)) {
        return [];
    }

    return stamps.map((stamp) => normalizeStampEntry(stamp));
}

export function serializeStampEntry(stamp = {}) {
    const normalized = normalizeStampEntry(stamp);

    return {
        spriteId: normalized.spriteId,
        x: normalized.x,
        y: normalized.y,
        direction: normalized.direction,
        size: normalized.size,
        costume: serializeCostumeEntry(normalized.costume),
        layer: normalized.layer,
    };
}

export function serializeStamps(stamps = []) {
    if (!Array.isArray(stamps)) {
        return [];
    }

    return stamps.map((stamp) => serializeStampEntry(stamp));
}

export function scratchSegmentToStagePixels(segment, stage) {
    const width = stage.width ?? 480;
    const height = stage.height ?? 360;

    return {
        x1: width / 2 + segment.x1,
        y1: height / 2 - segment.y1,
        x2: width / 2 + segment.x2,
        y2: height / 2 - segment.y2,
    };
}
