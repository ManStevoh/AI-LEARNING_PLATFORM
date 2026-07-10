/**
 * Node smoke verification for stage renderer adapter helpers.
 * Run: node resources/js/Modules/BlockCoding/stageRenderer.smoke.mjs
 */
import { buildStageRenderSnapshot, scratchToStagePixels } from './stageRenderers/buildStageRenderSnapshot.js';
import { createStageRenderer } from './stageRenderers/createStageRenderer.js';
import {
    resolveStageRenderer,
    STAGE_RENDERER_DOM,
    STAGE_RENDERER_PIXI,
} from './stageRenderers/stageRendererConfig.js';

const checks = [];

function assert(label, condition) {
    checks.push({ label, ok: Boolean(condition) });

    if (!condition) {
        console.error(`FAIL: ${label}`);
    }
}

assert('resolveStageRenderer defaults to dom', resolveStageRenderer({ stage: {} }) === STAGE_RENDERER_DOM);
assert(
    'resolveStageRenderer reads workspace config',
    resolveStageRenderer({ stage: { renderer: STAGE_RENDERER_PIXI } }) === STAGE_RENDERER_PIXI,
);
assert(
    'resolveStageRenderer honors query override',
    resolveStageRenderer({ stage: { renderer: STAGE_RENDERER_DOM } }, new URLSearchParams('renderer=pixi')) ===
        STAGE_RENDERER_PIXI,
);

const snapshot = {
    activeSpriteId: 'sprite-1',
    stage: {
        width: 480,
        height: 360,
        background: '#dbeafe',
        backdrops: [{ id: 'backdrop-1', name: 'blue sky', color: '#dbeafe' }],
        backdropIndex: 0,
    },
    sprites: [
        {
            id: 'sprite-1',
            name: 'Sprite1',
            x: 100,
            y: -40,
            direction: 90,
            visible: true,
            emoji: '🐱',
            size: 100,
            layer: 2,
        },
    ],
};

const renderSnapshot = buildStageRenderSnapshot(snapshot);
assert('buildStageRenderSnapshot width', renderSnapshot.width === 480);
assert('buildStageRenderSnapshot sprite count', renderSnapshot.sprites.length === 1);
assert('buildStageRenderSnapshot sprite layer', renderSnapshot.sprites[0].layer === 2);
assert('buildStageRenderSnapshot advanced effects', renderSnapshot.sprites[0].effects.fisheye === 0);

const withPen = {
    ...snapshot,
    stage: {
        ...snapshot.stage,
        penTrails: [{ x1: 0, y1: 0, x2: 50, y2: 50, color: '#ff0000', size: 2 }],
    },
};
assert('pen trails in render snapshot', buildStageRenderSnapshot(withPen).penTrails.length === 1);

const withStamps = {
    ...snapshot,
    stage: {
        ...snapshot.stage,
        stamps: [
            {
                spriteId: 'sprite-1',
                x: 100,
                y: -40,
                direction: 90,
                size: 100,
                costume: '🐱',
                layer: 1,
            },
        ],
    },
};
const stampSnapshot = buildStageRenderSnapshot(withStamps);
assert('stamps in render snapshot', stampSnapshot.stamps.length === 1);
assert('stamp render position', stampSnapshot.stamps[0].x === 340 && stampSnapshot.stamps[0].y === 220);

const pixels = scratchToStagePixels(snapshot.sprites[0], snapshot.stage);
assert('scratchToStagePixels x', pixels.x === 340);
assert('scratchToStagePixels y', pixels.y === 220);

const domRenderer = await createStageRenderer(STAGE_RENDERER_DOM);
assert('createStageRenderer dom', domRenderer && typeof domRenderer.mount === 'function');
domRenderer.destroy();

const failed = checks.filter((check) => !check.ok);
console.log(`Stage renderer smoke: ${checks.length - failed.length}/${checks.length} passed`);

if (failed.length) {
    process.exit(1);
}
