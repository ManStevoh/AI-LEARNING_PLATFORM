function readCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export async function listLessonCostumes(lessonSlug) {
    const response = await fetch(`/learner/learn/${lessonSlug}/costumes`, {
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Unable to load costumes.');
    }

    const payload = await response.json();

    return payload.costumes ?? [];
}

export async function uploadLessonCostume(lessonSlug, file, name = null) {
    const formData = new FormData();
    formData.append('file', file);

    if (name) {
        formData.append('name', name);
    }

    const response = await fetch(`/learner/learn/${lessonSlug}/costumes`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Unable to upload costume.');
    }

    const payload = await response.json();

    return payload.costume;
}

export async function deleteLessonCostume(lessonSlug, assetUuid) {
    const response = await fetch(`/learner/learn/${lessonSlug}/costumes/${assetUuid}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Unable to delete costume.');
    }
}

export function costumeImageUrl(lessonSlug, assetUuid) {
    return `/learner/learn/${lessonSlug}/costumes/${assetUuid}/image`;
}

export function isEmojiCostume(value) {
    return typeof value === 'string' && !value.startsWith('asset:');
}

export function isAssetCostume(value) {
    if (typeof value === 'string') {
        return value.startsWith('asset:');
    }

    return value !== null && typeof value === 'object' && typeof value.asset_uuid === 'string';
}

export function costumeAssetUuid(value) {
    if (typeof value === 'string' && value.startsWith('asset:')) {
        return value.slice(6);
    }

    if (value !== null && typeof value === 'object' && typeof value.asset_uuid === 'string') {
        return value.asset_uuid;
    }

    return null;
}

export function costumeDisplayLabel(value) {
    if (value !== null && typeof value === 'object' && typeof value.name === 'string') {
        return value.name;
    }

    if (typeof value === 'string' && value.startsWith('asset:')) {
        return 'Uploaded costume';
    }

    return typeof value === 'string' ? value : 'Costume';
}

export function normalizeCostumeEntry(value) {
    if (value !== null && typeof value === 'object' && typeof value.asset_uuid === 'string') {
        return {
            type: 'asset',
            asset_uuid: value.asset_uuid,
            name: value.name ?? 'Costume',
            emoji: value.emoji ?? '🖼️',
        };
    }

    if (typeof value === 'string' && value.startsWith('asset:')) {
        return {
            type: 'asset',
            asset_uuid: value.slice(6),
            name: 'Costume',
            emoji: '🖼️',
        };
    }

    return {
        type: 'emoji',
        emoji: typeof value === 'string' && value !== '' ? value : '🐱',
        name: typeof value === 'string' ? value : 'Costume',
    };
}
