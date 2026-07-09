import { SOUND_PRESET_OPTIONS } from './soundEngine.js';

let projectSounds = [];
const listeners = new Set();

export function setProjectSounds(sounds) {
    projectSounds = Array.isArray(sounds) ? sounds : [];
    listeners.forEach((listener) => listener(projectSounds));
}

export function getProjectSounds() {
    return projectSounds;
}

export function getSoundDropdownOptions() {
    const custom = projectSounds.map((sound) => [`asset:${sound.asset_uuid}`, sound.name]);

    return [...SOUND_PRESET_OPTIONS, ...custom];
}

export function subscribeSoundLibrary(listener) {
    listeners.add(listener);

    return () => listeners.delete(listener);
}

export function buildSoundLibraryMap(lessonSlug, sounds = projectSounds) {
    return Object.fromEntries(
        sounds.map((sound) => [
            sound.asset_uuid,
            `/learner/learn/${lessonSlug}/sounds/${sound.asset_uuid}/audio`,
        ]),
    );
}
