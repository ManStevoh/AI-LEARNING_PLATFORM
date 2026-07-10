/**
 * Node smoke verification for StageRuntime Scratch-parity methods.
 * Run: node resources/js/Modules/BlockCoding/stageRuntime.smoke.mjs
 */
import { StageRuntime } from './stageRuntime.js';
import { createProceduralBackdropEntry } from './proceduralBackdrop.js';
import { colorsMatch, normalizeHexColor } from './stageColorSampler.js';
import { normalizeBackdropEntry, serializeBackdropEntry } from './backdropAssets.js';
import { createAiBackdropEntry } from './aiBackdrop.js';

globalThis.window = globalThis;
globalThis.window.setInterval = () => 1;
globalThis.window.clearInterval = () => {};

const runtime = new StageRuntime({
    stage: {
        width: 480,
        height: 360,
        sprites: [{ id: 'sprite-1', name: 'Sprite1', x: 0, y: 0, direction: 90, emoji: '🐱' }],
    },
});

runtime.setState('running');
runtime.runStartedAt = Date.now();

const checks = [];

function assert(name, condition) {
    checks.push({ name, ok: Boolean(condition) });
    if (!condition) {
        console.error(`FAIL: ${name}`);
    }
}

await runtime.moveSteps(10);
assert('moveSteps changes x', runtime.getXPosition() !== 0 || runtime.getYPosition() !== 0);

await runtime.goToXY(50, -20);
assert('goToXY', runtime.getXPosition() === 50 && runtime.getYPosition() === -20);

await runtime.changeXBy(10);
assert('changeXBy', runtime.getXPosition() === 60);

await runtime.setYTo(5);
assert('setYTo', runtime.getYPosition() === 5);

await runtime.pointInDirection(180);
assert('pointInDirection', runtime.getDirection() === 180);

await runtime.turnLeftDegrees(90);
assert('turnLeftDegrees', runtime.getDirection() === 90);

runtime.setRotationStyle('left-right');
assert('setRotationStyle', runtime.getActiveSprite().rotationStyle === 'left-right');

await runtime.createCloneOf('myself');
assert('createCloneOf', runtime.sprites.some((s) => s.isClone));

runtime.activeSpriteId = runtime.sprites.find((s) => s.isClone).id;
runtime.deleteThisClone();
assert('deleteThisClone', !runtime.sprites.some((s) => s.isClone));

assert('distanceTo', runtime.distanceTo('mouse-pointer') >= 0);
assert('getCurrent year', runtime.getCurrent('year') >= 2020);
assert('isOnline', runtime.isOnline() === true || runtime.isOnline() === false);
runtime.resetTimer();
assert('resetTimer', runtime.getTimer() >= 0);

runtime.pointer = { x: 12, y: 34 };
await runtime.pointTowards('mouse-pointer');
assert('pointTowards', Number.isFinite(runtime.getDirection()));

await runtime.say('hi');
assert('say until', runtime.getActiveSprite().say === 'hi');

runtime.changeSizeBy(25);
assert('changeSizeBy', runtime.getSize() === 125);

runtime.changeEffectBy('ghost', 40);
assert('changeEffectBy', runtime.getActiveSprite().effects.ghost === 40);

runtime.clearGraphicEffects();
assert('clearGraphicEffects', runtime.getActiveSprite().effects.ghost === 0);

runtime.nextCostume();
assert('nextCostume', runtime.getCostume('number') >= 1);

runtime.nextBackdrop();
assert('nextBackdrop', runtime.getBackdrop('number') >= 1);

runtime.addBackdrop({
    type: 'library',
    library_id: 'desert-dunes',
    name: 'Desert Dunes',
    color: '#f6c56b',
});
assert('addBackdrop library', runtime.stage.backdropLibraryId === 'desert-dunes');

runtime.addBackdrop(createProceduralBackdropEntry(424242));
assert('addBackdrop procedural', runtime.sprites && runtime.stage.backdrops.some((b) => b.type === 'procedural'));

const aiEntry = createAiBackdropEntry({
    theme: 'ocean',
    request_id: 'req-smoke-1',
    color: '#4fc3f7',
    backdrop: { uuid: 'ai-uuid-smoke', name: 'AI Ocean' },
});
const normalizedAi = normalizeBackdropEntry(aiEntry);
assert('ai backdrop normalize', normalizedAi.type === 'ai' && normalizedAi.asset_uuid === 'ai-uuid-smoke');
const serializedAi = serializeBackdropEntry(normalizedAi);
assert('ai backdrop serialize', serializedAi.type === 'ai' && serializedAi.theme === 'ocean');
runtime.addBackdrop(aiEntry);
assert('addBackdrop ai asset uuid', runtime.stage.backdropAssetUuid === 'ai-uuid-smoke');

const addedSprite = runtime.addSpriteFromLibrary('ace-owl');
assert('addSpriteFromLibrary', addedSprite?.name === 'Owl' && runtime.sprites.length >= 2);
assert('library costume persisted', runtime.sprites.some((s) => s.costumes?.[0]?.type === 'library'));

runtime.selectBackdrop(0);
assert('selectBackdrop', runtime.stage.backdropIndex === 0);

runtime.setMonitorVisible('x_position', true);
assert('setMonitorVisible', runtime.getMonitors().some((m) => m.id === 'x_position' && m.visible));
runtime.moveMonitor('x_position', { x: 40, y: 50 });
assert('moveMonitor', runtime.getMonitors().find((m) => m.id === 'x_position')?.x === 40);
assert(
    'monitor snapshot value',
    runtime.getMonitorSnapshot().find((m) => m.id === 'x_position')?.value === Math.round(runtime.getXPosition()),
);
runtime.setMonitorVisible('x_position', false);
assert('hide monitor', runtime.getMonitorSnapshot().every((m) => m.id !== 'x_position'));

runtime.goToLayer('front');
assert('goToLayer', typeof runtime.getActiveSprite().layer === 'number');

runtime.changeVolumeBy(-10);
assert('changeVolumeBy', runtime.getVolume() === 90);

runtime.clearSoundEffects();
assert('clearSoundEffects', runtime.soundEffects.pitch === 100);

let broadcastHit = false;
runtime.onBroadcastReceived('ping', async () => {
    broadcastHit = true;
});
await runtime.broadcastAndWait('ping');
assert('broadcastAndWait', broadcastHit);

assert('normalizeHexColor', normalizeHexColor('#ff0000').r === 255);
assert('colorsMatch exact', colorsMatch({ r: 255, g: 0, b: 0 }, normalizeHexColor('#ff0000')));
assert('colorsMatch tolerance', colorsMatch({ r: 248, g: 4, b: 4 }, normalizeHexColor('#ff0000')));

runtime.setColorSampler({
    isSpriteTouchingColor(sprite, color) {
        return color === '#ff0000' && sprite.x === 100;
    },
    isColorTouchingColor(sprite, colorA, colorB) {
        return colorA === '#ff0000' && colorB === '#00ff00' && sprite.y === 0;
    },
});
assert('isTouchingColor without sampler match', runtime.isTouchingColor('#ff0000') === false);
await runtime.goToXY(100, 0);
assert('isTouchingColor delegated', runtime.isTouchingColor('#ff0000') === true);
assert('isColorTouchingColor delegated', runtime.isColorTouchingColor('#ff0000', '#00ff00') === true);
runtime.setColorSampler(null);
assert('isTouchingColor without sampler', runtime.isTouchingColor('#ff0000') === false);

runtime.setVariableById('score-var', 7);
runtime.setMonitorVisible('var:score-var', true, { label: 'score' });
assert('variable monitor value', runtime.getMonitorSnapshot().some((m) => m.id === 'var:score-var' && m.value === 7));
runtime.changeVariableById('score-var', 3);
assert('variable monitor updates', runtime.getMonitorSnapshot().find((m) => m.id === 'var:score-var')?.value === 10);
runtime.setVariableById('items-var', ['a', 'b']);
runtime.setMonitorVisible('list:length:items-var', true, { label: 'length of items' });
assert('list length monitor', runtime.getMonitorSnapshot().find((m) => m.id === 'list:length:items-var')?.value === 2);

let backdropHit = false;
runtime.onBackdropSwitched('grass', async () => {
    backdropHit = true;
});
runtime.setBackdrop('grass');
await new Promise((r) => setTimeout(r, 20));
assert('backdrop switch event', backdropHit);

const failed = checks.filter((c) => !c.ok);
console.log(`StageRuntime smoke: ${checks.length - failed.length}/${checks.length} passed`);
if (failed.length) {
    process.exit(1);
}
