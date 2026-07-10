export const STAGE_RENDERER_DOM = 'dom';
export const STAGE_RENDERER_PIXI = 'pixi';

export function isValidStageRenderer(value) {
    return value === STAGE_RENDERER_DOM || value === STAGE_RENDERER_PIXI;
}

export function resolveStageRenderer(workspaceConfig, searchParams = null) {
    const params =
        searchParams ??
        (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null);
    const override = params?.get('renderer');

    if (isValidStageRenderer(override)) {
        return override;
    }

    const configured = workspaceConfig?.stage?.renderer;

    if (isValidStageRenderer(configured)) {
        return configured;
    }

    return STAGE_RENDERER_DOM;
}
