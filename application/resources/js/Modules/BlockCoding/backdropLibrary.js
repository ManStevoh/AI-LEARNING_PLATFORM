export const BACKDROP_LIBRARY_BASE = '/block-coding/backdrops';

export const BACKDROP_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'outdoors', label: 'Outdoors' },
    { id: 'indoors', label: 'Indoors' },
    { id: 'space', label: 'Space' },
    { id: 'underwater', label: 'Underwater' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'sports', label: 'Sports' },
    { id: 'patterns', label: 'Patterns' },
    { id: 'music', label: 'Music' },
];

/** @type {Array<{ id: string, name: string, categories: string[], color: string, tags?: string[] }>} */
export const BACKDROP_LIBRARY = [
    { id: 'blue-sky-hills', name: 'Blue Sky Hills', categories: ['outdoors'], color: '#7ec8ff', tags: ['sky', 'hills', 'day'] },
    { id: 'grass-field', name: 'Grass Field', categories: ['outdoors'], color: '#87ceeb', tags: ['grass', 'field'] },
    { id: 'desert-dunes', name: 'Desert Dunes', categories: ['outdoors'], color: '#f6c56b', tags: ['desert', 'sand', 'sun'] },
    { id: 'beach-palm', name: 'Beach Palm', categories: ['outdoors'], color: '#4fc3f7', tags: ['beach', 'ocean', 'palm'] },
    { id: 'forest-path', name: 'Forest Path', categories: ['outdoors'], color: '#b3e5fc', tags: ['forest', 'trees'] },
    { id: 'snowy-peaks', name: 'Snowy Peaks', categories: ['outdoors'], color: '#bbdefb', tags: ['snow', 'mountain', 'winter'] },
    { id: 'savanna-sunset', name: 'Savanna Sunset', categories: ['outdoors'], color: '#ff8a65', tags: ['savanna', 'sunset'] },
    { id: 'canyon-red', name: 'Red Canyon', categories: ['outdoors'], color: '#ffccbc', tags: ['canyon', 'rocks'] },
    { id: 'neon-city', name: 'Neon City', categories: ['outdoors'], color: '#1a237e', tags: ['city', 'night', 'urban'] },
    { id: 'bedroom-cozy', name: 'Cozy Bedroom', categories: ['indoors'], color: '#ffe0b2', tags: ['room', 'bed'] },
    { id: 'classroom-chalk', name: 'Classroom', categories: ['indoors'], color: '#cfd8dc', tags: ['school', 'chalkboard'] },
    { id: 'kitchen-bright', name: 'Bright Kitchen', categories: ['indoors'], color: '#fff9c4', tags: ['kitchen', 'home'] },
    { id: 'starfield', name: 'Starfield', categories: ['space'], color: '#0d1b2a', tags: ['stars', 'night'] },
    { id: 'purple-nebula', name: 'Purple Nebula', categories: ['space'], color: '#1a1033', tags: ['nebula', 'galaxy'] },
    { id: 'space-station', name: 'Space Station', categories: ['space'], color: '#102027', tags: ['station', 'sci-fi'] },
    { id: 'coral-reef', name: 'Coral Reef', categories: ['underwater'], color: '#0277bd', tags: ['coral', 'fish'] },
    { id: 'deep-ocean', name: 'Deep Ocean', categories: ['underwater'], color: '#01579b', tags: ['ocean', 'deep'] },
    { id: 'castle-gate', name: 'Castle Gate', categories: ['fantasy'], color: '#b3e5fc', tags: ['castle', 'medieval'] },
    { id: 'enchanted-woods', name: 'Enchanted Woods', categories: ['fantasy'], color: '#311b92', tags: ['magic', 'forest'] },
    { id: 'soccer-pitch', name: 'Soccer Pitch', categories: ['sports'], color: '#66bb6a', tags: ['soccer', 'football'] },
    { id: 'basketball-court', name: 'Basketball Court', categories: ['sports'], color: '#ff8f00', tags: ['basketball'] },
    { id: 'stripe-zigzag', name: 'Zigzag Stripes', categories: ['patterns'], color: '#ffffff', tags: ['stripes'] },
    { id: 'dot-grid', name: 'Dot Grid', categories: ['patterns'], color: '#fafafa', tags: ['dots'] },
    { id: 'xy-grid', name: 'XY Grid', categories: ['patterns'], color: '#ffffff', tags: ['grid', 'coordinates'] },
    { id: 'concert-lights', name: 'Concert Lights', categories: ['music'], color: '#212121', tags: ['stage', 'lights'] },
];

export const BACKDROP_LIBRARY_BY_ID = Object.fromEntries(BACKDROP_LIBRARY.map((item) => [item.id, item]));

export function libraryBackdropUrl(libraryId) {
    return `${BACKDROP_LIBRARY_BASE}/${libraryId}.svg`;
}

export function getLibraryBackdrop(libraryId) {
    return BACKDROP_LIBRARY_BY_ID[libraryId] ?? null;
}

export function filterLibraryBackdrops(query = '', category = 'all') {
    const normalizedQuery = query.trim().toLowerCase();

    return BACKDROP_LIBRARY.filter((item) => {
        const matchesCategory = category === 'all' || item.categories.includes(category);
        const haystack = [item.name, item.id, ...(item.tags ?? []), ...(item.categories ?? [])]
            .join(' ')
            .toLowerCase();

        const matchesQuery = normalizedQuery === '' || haystack.includes(normalizedQuery);

        return matchesCategory && matchesQuery;
    });
}

export function createLibraryBackdropEntry(libraryId) {
    const item = getLibraryBackdrop(libraryId);

    if (!item) {
        return null;
    }

    return {
        type: 'library',
        id: `backdrop-lib-${libraryId}`,
        library_id: libraryId,
        name: item.name,
        color: item.color,
    };
}
