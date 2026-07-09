export const STAGE_MONITORS = [
    {
        id: 'x_position',
        label: 'x position',
        blockType: 'ace_motion_x_position',
        category: 'motion',
        color: '#4c97ff',
        read: (runtime) => Math.round(runtime.getXPosition()),
    },
    {
        id: 'y_position',
        label: 'y position',
        blockType: 'ace_motion_y_position',
        category: 'motion',
        color: '#4c97ff',
        read: (runtime) => Math.round(runtime.getYPosition()),
    },
    {
        id: 'direction',
        label: 'direction',
        blockType: 'ace_motion_direction',
        category: 'motion',
        color: '#4c97ff',
        read: (runtime) => Math.round(runtime.getDirection()),
    },
    {
        id: 'size',
        label: 'size',
        blockType: 'ace_looks_size',
        category: 'looks',
        color: '#9966ff',
        read: (runtime) => Math.round(runtime.getSize()),
    },
    {
        id: 'costume_number',
        label: 'costume #',
        blockType: 'ace_looks_costume',
        category: 'looks',
        color: '#9966ff',
        read: (runtime) => runtime.getCostume('number'),
    },
    {
        id: 'backdrop_number',
        label: 'backdrop #',
        blockType: 'ace_looks_backdrop',
        category: 'looks',
        color: '#9966ff',
        read: (runtime) => runtime.getBackdrop('number'),
    },
    {
        id: 'volume',
        label: 'volume',
        blockType: 'ace_sound_volume',
        category: 'sound',
        color: '#cf63cf',
        read: (runtime) => Math.round(runtime.getVolume()),
    },
    {
        id: 'mouse_x',
        label: 'mouse x',
        blockType: 'ace_sensing_mouse_x',
        category: 'sensing',
        color: '#5cb1d6',
        read: (runtime) => Math.round(runtime.getMouseX()),
    },
    {
        id: 'mouse_y',
        label: 'mouse y',
        blockType: 'ace_sensing_mouse_y',
        category: 'sensing',
        color: '#5cb1d6',
        read: (runtime) => Math.round(runtime.getMouseY()),
    },
    {
        id: 'timer',
        label: 'timer',
        blockType: 'ace_sensing_timer',
        category: 'sensing',
        color: '#5cb1d6',
        read: (runtime) => Number(runtime.getTimer().toFixed(2)),
    },
    {
        id: 'loudness',
        label: 'loudness',
        blockType: 'ace_sensing_loudness',
        category: 'sensing',
        color: '#5cb1d6',
        read: (runtime) => Math.round(runtime.getLoudness()),
    },
    {
        id: 'answer',
        label: 'answer',
        blockType: 'ace_sensing_answer',
        category: 'sensing',
        color: '#5cb1d6',
        read: (runtime) => runtime.getAnswer(),
    },
];

export const MONITOR_BY_ID = Object.fromEntries(STAGE_MONITORS.map((monitor) => [monitor.id, monitor]));
export const MONITOR_BY_BLOCK_TYPE = Object.fromEntries(
    STAGE_MONITORS.map((monitor) => [monitor.blockType, monitor]),
);

export function defaultMonitorLayout(index) {
    return {
        x: 8,
        y: 8 + index * 34,
    };
}

export function normalizeMonitorState(value, index = 0) {
    if (typeof value === 'string' && MONITOR_BY_ID[value]) {
        return {
            id: value,
            visible: true,
            ...defaultMonitorLayout(index),
        };
    }

    if (value !== null && typeof value === 'object' && typeof value.id === 'string' && MONITOR_BY_ID[value.id]) {
        const layout = defaultMonitorLayout(index);

        return {
            id: value.id,
            visible: value.visible !== false,
            x: Number.isFinite(value.x) ? value.x : layout.x,
            y: Number.isFinite(value.y) ? value.y : layout.y,
        };
    }

    return null;
}

export function serializeMonitors(monitors) {
    if (!Array.isArray(monitors)) {
        return [];
    }

    return monitors
        .map((monitor, index) => normalizeMonitorState(monitor, index))
        .filter((monitor) => monitor && monitor.visible)
        .map((monitor) => ({
            id: monitor.id,
            visible: true,
            x: monitor.x,
            y: monitor.y,
        }));
}
