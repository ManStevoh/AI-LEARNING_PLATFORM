/**
 * Node smoke verification for StageRuntime Scratch-parity methods.
 * Run: node resources/js/Modules/BlockCoding/stageRuntime.smoke.mjs
 */
import { StageRuntime } from './stageRuntime.js';

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
    type: 'asset',
    asset_uuid: '00000000-0000-4000-8000-000000000099',
    name: 'Uploaded Park',
    color: '#e5e7eb',
});
assert('addBackdrop asset', runtime.stage.backdropAssetUuid === '00000000-0000-4000-8000-000000000099');
runtime.selectBackdrop(0);
assert('selectBackdrop', runtime.stage.backdropIndex === 0);

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
