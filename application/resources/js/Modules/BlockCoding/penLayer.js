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
