import { STAGE_RENDERER_DOM, STAGE_RENDERER_PIXI } from './stageRendererConfig.js';

export async function createStageRenderer(mode) {
    if (mode === STAGE_RENDERER_PIXI) {
        const { PixiStageRenderer } = await import('./pixiStageRenderer.js');

        return new PixiStageRenderer();
    }

    const { DomStageRenderer } = await import('./domStageRenderer.js');

    return new DomStageRenderer();
}

export function isAsyncStageRenderer(mode) {
    return mode === STAGE_RENDERER_PIXI;
}
