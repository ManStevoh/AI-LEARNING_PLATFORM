function readCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export async function listLessonBackdrops(lessonSlug) {
    const response = await fetch(`/learner/learn/${lessonSlug}/backdrops`, {
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Unable to load backdrops.');
    }

    const payload = await response.json();

    return payload.backdrops ?? [];
}

export async function uploadLessonBackdrop(lessonSlug, file, name = null) {
    const formData = new FormData();
    formData.append('file', file);

    if (name) {
        formData.append('name', name);
    }

    const response = await fetch(`/learner/learn/${lessonSlug}/backdrops`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Unable to upload backdrop.');
    }

    const payload = await response.json();

    return payload.backdrop;
}

export async function deleteLessonBackdrop(lessonSlug, assetUuid) {
    const response = await fetch(`/learner/learn/${lessonSlug}/backdrops/${assetUuid}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
    });

    if (!response.ok) {
        throw new Error('Unable to delete backdrop.');
    }
}

export function backdropImageUrl(lessonSlug, assetUuid) {
    return `/learner/learn/${lessonSlug}/backdrops/${assetUuid}/image`;
}

export function normalizeBackdropEntry(value, index = 0) {
    if (value !== null && typeof value === 'object' && typeof value.asset_uuid === 'string') {
        return {
            type: 'asset',
            id: value.id ?? `backdrop-asset-${value.asset_uuid}`,
            asset_uuid: value.asset_uuid,
            name: value.name ?? 'Backdrop',
            color: value.color ?? '#e5e7eb',
        };
    }

    if (value !== null && typeof value === 'object') {
        return {
            type: 'color',
            id: value.id ?? `backdrop-${index + 1}`,
            name: value.name ?? value.color ?? `Backdrop ${index + 1}`,
            color: value.color ?? '#dbeafe',
        };
    }

    if (typeof value === 'string' && value.startsWith('#')) {
        return {
            type: 'color',
            id: `backdrop-${index + 1}`,
            name: value,
            color: value,
        };
    }

    return {
        type: 'color',
        id: `backdrop-${index + 1}`,
        name: typeof value === 'string' ? value : `Backdrop ${index + 1}`,
        color: '#dbeafe',
    };
}

export function serializeBackdropEntry(backdrop) {
    const entry = normalizeBackdropEntry(backdrop);

    if (entry.type === 'asset') {
        return {
            type: 'asset',
            id: entry.id,
            asset_uuid: entry.asset_uuid,
            name: entry.name,
            color: entry.color,
        };
    }

    return {
        id: entry.id,
        name: entry.name,
        color: entry.color,
    };
}
