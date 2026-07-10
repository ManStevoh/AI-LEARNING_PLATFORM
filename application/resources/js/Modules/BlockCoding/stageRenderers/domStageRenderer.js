/**
 * DOM renderer adapter — BlockStage paints sprites/backdrops with React.
 * This class exists so the renderer contract stays consistent with Pixi.
 */
export class DomStageRenderer {
    mount() {
        return Promise.resolve();
    }

    render() {}

    resize() {}

    destroy() {}
}
