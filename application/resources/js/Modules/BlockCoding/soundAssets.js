function readCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export async function listLessonSounds(lessonSlug) {
    const response = await fetch(`/learner/learn/${lessonSlug}/sounds`, {
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Unable to load sounds.');
    }

    const payload = await response.json();

    return payload.sounds ?? [];
}

export async function uploadLessonSound(lessonSlug, file, name = null) {
    const formData = new FormData();
    formData.append('file', file);

    if (name) {
        formData.append('name', name);
    }

    const response = await fetch(`/learner/learn/${lessonSlug}/sounds`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Unable to upload sound.');
    }

    const payload = await response.json();

    return payload.sound;
}

export async function deleteLessonSound(lessonSlug, assetUuid) {
    const response = await fetch(`/learner/learn/${lessonSlug}/sounds/${assetUuid}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Unable to delete sound.');
    }
}

export function soundAudioUrl(lessonSlug, assetUuid) {
    return `/learner/learn/${lessonSlug}/sounds/${assetUuid}/audio`;
}

export async function previewSound(lessonSlug, assetUuid) {
    const audio = new Audio(soundAudioUrl(lessonSlug, assetUuid));
    audio.crossOrigin = 'use-credentials';

    await audio.play();
}
