/** Scratch 3.0–aligned Blockly inject options (Zelos renderer at 75% grid unit). */
export const SCRATCH_RENDERER_OVERRIDES = {
    GRID_UNIT: 3,
};

export const SCRATCH_ZOOM_OPTIONS = {
    controls: true,
    wheel: true,
    startScale: 1,
    maxScale: 1.5,
    minScale: 0.5,
    scaleSpeed: 1.1,
};

/** Dot-style grid ticks (length 1) on a 40px pitch, matching Scratch workspace spacing. */
export const SCRATCH_GRID_OPTIONS = {
    spacing: 40,
    length: 1,
    colour: '#d6d6d6',
    snap: false,
};
