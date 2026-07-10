export const AI_BACKDROP_THEMES = [
    { id: 'ocean', label: 'Ocean', color: '#4fc3f7' },
    { id: 'space', label: 'Space', color: '#1a1033' },
    { id: 'forest', label: 'Forest', color: '#7ccd5b' },
    { id: 'desert', label: 'Desert', color: '#f6c56b' },
    { id: 'candy', label: 'Candy Land', color: '#fce7f3' },
    { id: 'city', label: 'City', color: '#cfd8dc' },
    { id: 'sports', label: 'Sports', color: '#66bb6a' },
    { id: 'fantasy', label: 'Fantasy', color: '#b39ddb' },
];

export function getAiBackdropTheme(themeId) {
    return AI_BACKDROP_THEMES.find((theme) => theme.id === themeId) ?? null;
}

export function createAiBackdropEntry(payload) {
    const theme = getAiBackdropTheme(payload.theme);

    return {
        type: 'ai',
        id: `backdrop-ai-${payload.backdrop.uuid}`,
        asset_uuid: payload.backdrop.uuid,
        theme: payload.theme,
        request_id: payload.request_id,
        name: payload.backdrop.name ?? theme?.label ?? 'AI Backdrop',
        color: payload.color ?? theme?.color ?? '#dbeafe',
    };
}
