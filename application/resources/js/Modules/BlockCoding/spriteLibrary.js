export const SPRITE_LIBRARY_BASE = '/block-coding/sprites';

export const SPRITE_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'animals', label: 'Animals' },
    { id: 'people', label: 'People' },
    { id: 'fantasy', label: 'Fantasy' },
    { id: 'dance', label: 'Dance' },
    { id: 'music', label: 'Music' },
    { id: 'sports', label: 'Sports' },
    { id: 'food', label: 'Food' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'letters', label: 'Letters' },
];

/** @type {Array<{ id: string, name: string, categories: string[], emoji: string, tags?: string[] }>} */
export const SPRITE_LIBRARY = [
    { id: 'ace-cat', name: 'Ace Cat', categories: ['animals'], emoji: '🐱', tags: ['pet', 'feline'] },
    { id: 'ace-dog', name: 'Ace Dog', categories: ['animals'], emoji: '🐶', tags: ['pet', 'puppy'] },
    { id: 'ace-bunny', name: 'Bunny', categories: ['animals'], emoji: '🐰', tags: ['rabbit'] },
    { id: 'ace-owl', name: 'Owl', categories: ['animals'], emoji: '🦉', tags: ['bird', 'night'] },
    { id: 'ace-penguin', name: 'Penguin', categories: ['animals'], emoji: '🐧', tags: ['bird', 'ice'] },
    { id: 'ace-frog', name: 'Frog', categories: ['animals'], emoji: '🐸', tags: ['amphibian'] },
    { id: 'ace-bee', name: 'Bee', categories: ['animals'], emoji: '🐝', tags: ['insect'] },
    { id: 'ace-butterfly', name: 'Butterfly', categories: ['animals'], emoji: '🦋', tags: ['insect'] },
    { id: 'ace-dolphin', name: 'Dolphin', categories: ['animals'], emoji: '🐬', tags: ['ocean'] },
    { id: 'ace-unicorn', name: 'Unicorn', categories: ['animals', 'fantasy'], emoji: '🦄', tags: ['magic'] },
    { id: 'ace-dragon', name: 'Dragon', categories: ['fantasy'], emoji: '🐉', tags: ['fire'] },
    { id: 'ace-robot', name: 'Retro Robot', categories: ['fantasy'], emoji: '🤖', tags: ['sci-fi'] },
    { id: 'ace-alien', name: 'Alien', categories: ['fantasy'], emoji: '👽', tags: ['space'] },
    { id: 'ace-wizard', name: 'Wizard', categories: ['fantasy', 'people'], emoji: '🧙', tags: ['magic'] },
    { id: 'ace-witch', name: 'Witch', categories: ['fantasy', 'people'], emoji: '🧙‍♀️', tags: ['magic'] },
    { id: 'ace-knight', name: 'Knight', categories: ['fantasy', 'people'], emoji: '🛡️', tags: ['armor'] },
    { id: 'ace-ghost', name: 'Ghost', categories: ['fantasy'], emoji: '👻', tags: ['spooky'] },
    { id: 'ace-fairy', name: 'Fairy', categories: ['fantasy'], emoji: '🧚', tags: ['wings'] },
    { id: 'ace-rocket', name: 'Rocketship', categories: ['fantasy'], emoji: '🚀', tags: ['space'] },
    { id: 'ace-astronaut', name: 'Astronaut', categories: ['people', 'fantasy'], emoji: '🧑‍🚀', tags: ['space'] },
    { id: 'ace-child', name: 'Learner', categories: ['people'], emoji: '🧒', tags: ['kid'] },
    { id: 'ace-teacher', name: 'Teacher', categories: ['people'], emoji: '🧑‍🏫', tags: ['school'] },
    { id: 'ace-dancer', name: 'Dancer', categories: ['dance', 'people'], emoji: '💃', tags: ['move'] },
    { id: 'ace-ballerina', name: 'Ballerina', categories: ['dance', 'people'], emoji: '🩰', tags: ['ballet'] },
    { id: 'ace-drum', name: 'Drum Kit', categories: ['music'], emoji: '🥁', tags: ['percussion'] },
    { id: 'ace-guitar', name: 'Guitar', categories: ['music'], emoji: '🎸', tags: ['strings'] },
    { id: 'ace-piano', name: 'Piano', categories: ['music'], emoji: '🎹', tags: ['keys'] },
    { id: 'ace-trumpet', name: 'Trumpet', categories: ['music'], emoji: '🎺', tags: ['brass'] },
    { id: 'ace-microphone', name: 'Microphone', categories: ['music'], emoji: '🎤', tags: ['sing'] },
    { id: 'ace-soccer', name: 'Soccer Ball', categories: ['sports'], emoji: '⚽', tags: ['football'] },
    { id: 'ace-basketball', name: 'Basketball', categories: ['sports'], emoji: '🏀', tags: ['hoops'] },
    { id: 'ace-tennis', name: 'Tennis Ball', categories: ['sports'], emoji: '🎾', tags: ['racket'] },
    { id: 'ace-trophy', name: 'Trophy', categories: ['sports'], emoji: '🏆', tags: ['winner'] },
    { id: 'ace-pizza', name: 'Pizza', categories: ['food'], emoji: '🍕', tags: ['slice'] },
    { id: 'ace-donut', name: 'Donut', categories: ['food'], emoji: '🍩', tags: ['sweet'] },
    { id: 'ace-apple', name: 'Apple', categories: ['food'], emoji: '🍎', tags: ['fruit'] },
    { id: 'ace-strawberry', name: 'Strawberry', categories: ['food'], emoji: '🍓', tags: ['fruit'] },
    { id: 'ace-cupcake', name: 'Cupcake', categories: ['food'], emoji: '🧁', tags: ['sweet'] },
    { id: 'ace-sunglasses', name: 'Sunglasses', categories: ['fashion'], emoji: '🕶️', tags: ['cool'] },
    { id: 'ace-crown', name: 'Crown', categories: ['fashion', 'fantasy'], emoji: '👑', tags: ['royal'] },
    { id: 'ace-hat', name: 'Top Hat', categories: ['fashion'], emoji: '🎩', tags: ['fancy'] },
    { id: 'ace-sneaker', name: 'Sneaker', categories: ['fashion', 'sports'], emoji: '👟', tags: ['shoes'] },
    { id: 'ace-letter-a', name: 'Glow A', categories: ['letters'], emoji: '🅰️', tags: ['alphabet'] },
    { id: 'ace-letter-c', name: 'Glow C', categories: ['letters'], emoji: '©️', tags: ['alphabet', 'code'] },
    { id: 'ace-letter-e', name: 'Glow E', categories: ['letters'], emoji: '📧', tags: ['alphabet'] },
    { id: 'ace-letter-s', name: 'Glow S', categories: ['letters'], emoji: '💲', tags: ['alphabet', 'scratch'] },
    { id: 'ace-star', name: 'Star', categories: ['letters', 'fantasy'], emoji: '⭐', tags: ['shine'] },
    { id: 'ace-heart', name: 'Heart', categories: ['letters'], emoji: '💖', tags: ['love'] },
];

export const SPRITE_LIBRARY_BY_ID = Object.fromEntries(SPRITE_LIBRARY.map((item) => [item.id, item]));

export function librarySpriteUrl(libraryId) {
    return `${SPRITE_LIBRARY_BASE}/${libraryId}.svg`;
}

export function getLibrarySprite(libraryId) {
    return SPRITE_LIBRARY_BY_ID[libraryId] ?? null;
}

export function filterLibrarySprites(query = '', category = 'all') {
    const normalizedQuery = query.trim().toLowerCase();

    return SPRITE_LIBRARY.filter((item) => {
        const matchesCategory = category === 'all' || item.categories.includes(category);
        const haystack = [item.name, item.id, ...(item.tags ?? []), ...(item.categories ?? [])]
            .join(' ')
            .toLowerCase();

        return matchesCategory && (normalizedQuery === '' || haystack.includes(normalizedQuery));
    });
}

export function createLibrarySpriteEntry(libraryId) {
    const item = getLibrarySprite(libraryId);

    if (!item) {
        return null;
    }

    return {
        type: 'library',
        library_id: libraryId,
        name: item.name,
        emoji: item.emoji,
    };
}

export function createLibraryCostumeEntry(libraryId) {
    return createLibrarySpriteEntry(libraryId);
}

export function createSpriteFromLibrary(libraryId, index = 1) {
    const item = getLibrarySprite(libraryId);

    if (!item) {
        return null;
    }

    const costume = createLibraryCostumeEntry(libraryId);

    return {
        id: `sprite-${libraryId}-${Date.now()}`,
        name: item.name,
        x: (index % 3) * 40 - 40,
        y: (index % 2) * 30 - 15,
        direction: 90,
        visible: true,
        size: 100,
        emoji: item.emoji,
        costumes: [costume],
        costumeIndex: 0,
        rotationStyle: 'all around',
        layer: index,
    };
}
