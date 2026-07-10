/**
 * Node smoke verification for videoLayer helpers and MediaSensingEngine.
 * Run: node resources/js/Modules/BlockCoding/mediaSensingEngine.smoke.mjs
 */
import {
    DEFAULT_VIDEO,
    isVideoFlipped,
    isVideoVisible,
    normalizeVideoState,
    serializeVideoState,
    VIDEO_STATES,
} from './videoLayer.js';
import { MediaSensingEngine } from './mediaSensingEngine.js';

const checks = [];

function assert(name, condition) {
    checks.push({ name, ok: Boolean(condition) });

    if (!condition) {
        console.error(`FAIL: ${name}`);
    }
}

assert('normalizeVideoState default', normalizeVideoState({}).state === DEFAULT_VIDEO.state);
assert(
    'normalizeVideoState clamps transparency',
    normalizeVideoState({ state: 'on-flipped', transparency: 150 }).transparency === 100,
);
assert('normalizeVideoState rejects invalid state', normalizeVideoState({ state: 'invalid' }).state === 'off');
assert(
    'serializeVideoState round trip',
    serializeVideoState({ state: 'on-flipped', transparency: 25 }).transparency === 25,
);
assert('isVideoVisible on', isVideoVisible('on') === true);
assert('isVideoVisible off', isVideoVisible('off') === false);
assert('isVideoFlipped on-flipped', isVideoFlipped('on-flipped') === true);
assert('isVideoFlipped on', isVideoFlipped('on') === false);
assert('VIDEO_STATES includes on-flipped', VIDEO_STATES.includes('on-flipped'));

function createFakeMediaAdapter() {
    let frame = 0;

    const canvas = {
        width: 80,
        height: 60,
        getContext: () => ({
            drawImage: () => {},
            getImageData: () => {
                const data = new Uint8ClampedArray(80 * 60 * 4);
                const fill = frame === 0 ? 0 : 200;

                for (let index = 0; index < data.length; index += 4) {
                    data[index] = fill;
                    data[index + 1] = fill;
                    data[index + 2] = fill;
                    data[index + 3] = 255;
                }

                frame += 1;

                return { data };
            },
        }),
    };

    const video = {
        muted: true,
        playsInline: true,
        autoplay: true,
        readyState: 4,
        srcObject: null,
        play: async () => {},
    };

    return {
        getUserMedia: async () => ({
            getTracks: () => [{ stop: () => {} }],
        }),
        requestAnimationFrame: (callback) => setTimeout(() => callback(Date.now()), 0),
        cancelAnimationFrame: (id) => clearTimeout(id),
        createElement: (tag) => (tag === 'canvas' ? canvas : tag === 'video' ? video : null),
        createAudioContext: () => null,
    };
}

const engine = new MediaSensingEngine({ adapter: createFakeMediaAdapter() });
await engine.ensureVideo();
engine.sampleMotion();
engine.sampleMotion();
const motion = engine.getVideoMotion();
assert('motion calculation returns 0-100 range', motion >= 0 && motion <= 100);
assert('motion calculation detects change', motion > 0);

await engine.setVideoState('on-flipped');
assert('setVideoState on-flipped', engine.isVideoOn() === true);
engine.setVideoTransparency(25);
assert('setVideoTransparency', engine.getVideoState().transparency === 25);
engine.dispose();

const failed = checks.filter((check) => !check.ok);
console.log(`MediaSensingEngine smoke: ${checks.length - failed.length}/${checks.length} passed`);

if (failed.length) {
    process.exit(1);
}
