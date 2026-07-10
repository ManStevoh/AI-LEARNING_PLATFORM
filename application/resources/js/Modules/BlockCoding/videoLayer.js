export const VIDEO_STATES = ['on', 'off', 'on-flipped', 'off-flipped'];

export const DEFAULT_VIDEO = {
    state: 'off',
    transparency: 50,
};

export function normalizeVideoState(video = {}) {
    const state = VIDEO_STATES.includes(video.state) ? video.state : DEFAULT_VIDEO.state;
    const transparency = Math.max(
        0,
        Math.min(100, Math.round(Number(video.transparency ?? DEFAULT_VIDEO.transparency))),
    );

    return {
        state,
        transparency,
    };
}

export function serializeVideoState(video = {}) {
    const normalized = normalizeVideoState(video);

    return {
        state: normalized.state,
        transparency: normalized.transparency,
    };
}

export function isVideoVisible(state) {
    return state === 'on' || state === 'on-flipped';
}

export function isVideoFlipped(state) {
    return state === 'on-flipped' || state === 'off-flipped';
}
