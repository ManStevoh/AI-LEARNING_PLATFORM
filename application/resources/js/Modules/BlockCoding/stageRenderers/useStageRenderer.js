import { useEffect, useRef } from 'react';
import { buildStageRenderSnapshot } from './buildStageRenderSnapshot.js';
import { createStageRenderer } from './createStageRenderer.js';
import { STAGE_RENDERER_PIXI } from './stageRendererConfig.js';

export function useStageRenderer({
    mode,
    surfaceRef,
    snapshot,
    lessonSlug,
    interactive,
    onSpriteClick,
}) {
    const rendererRef = useRef(null);
    const renderSnapshot = buildStageRenderSnapshot(snapshot, lessonSlug);

    useEffect(() => {
        if (mode !== STAGE_RENDERER_PIXI || !surfaceRef.current) {
            return undefined;
        }

        let cancelled = false;
        const container = surfaceRef.current;

        void (async () => {
            const renderer = await createStageRenderer(mode);

            if (cancelled || !surfaceRef.current) {
                renderer.destroy();
                return;
            }

            await renderer.mount(container, {
                width: renderSnapshot.width,
                height: renderSnapshot.height,
            });

            if (cancelled) {
                renderer.destroy();
                return;
            }

            rendererRef.current = renderer;
            await renderer.render(snapshot, lessonSlug, {
                interactive,
                onSpriteClick,
                activeSpriteId: snapshot.activeSpriteId,
            });
        })();

        return () => {
            cancelled = true;
            rendererRef.current?.destroy();
            rendererRef.current = null;
        };
    }, [mode, lessonSlug, renderSnapshot.width, renderSnapshot.height, surfaceRef]);

    useEffect(() => {
        if (mode !== STAGE_RENDERER_PIXI || !rendererRef.current) {
            return;
        }

        void rendererRef.current.render(snapshot, lessonSlug, {
            interactive,
            onSpriteClick,
            activeSpriteId: snapshot.activeSpriteId,
        });
    }, [mode, snapshot, lessonSlug, interactive, onSpriteClick]);

    useEffect(() => {
        if (mode !== STAGE_RENDERER_PIXI || !rendererRef.current || !surfaceRef.current) {
            return;
        }

        rendererRef.current.resize(renderSnapshot.width, renderSnapshot.height);
    }, [mode, renderSnapshot.width, renderSnapshot.height, surfaceRef]);
}
