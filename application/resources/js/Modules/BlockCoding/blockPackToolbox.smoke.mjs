/**
 * Node smoke verification for institution-specific block pack filtering.
 * Run: node resources/js/Modules/BlockCoding/blockPackToolbox.smoke.mjs
 */
import {
    BLOCK_PACK_AI,
    BLOCK_PACK_CURRICULUM,
    BLOCK_PACK_ROBOTICS,
    BLOCK_PACK_CATEGORY_MAP,
    OPTIONAL_BLOCK_PACK_IDS,
    filterToolboxByEnabledPacks,
    getEnabledBlockPackIds,
    getLevelOneToolbox,
} from './levelOneToolbox.js';

const checks = [];

function assert(label, condition) {
    checks.push({ label, ok: Boolean(condition) });

    if (!condition) {
        console.error(`FAIL: ${label}`);
    }
}

function categoryNames(toolbox) {
    return (toolbox.contents ?? []).map((entry) => entry.name);
}

const CORE_CATEGORIES = ['Events', 'Motion', 'Looks', 'Control', 'Operators', 'Variables', 'My Blocks'];

function hasAllCoreCategories(toolbox) {
    const names = categoryNames(toolbox);

    return CORE_CATEGORIES.every((name) => names.includes(name));
}

// getEnabledBlockPackIds backward-compatibility.
assert(
    'undefined enables all optional packs',
    getEnabledBlockPackIds(undefined).length === OPTIONAL_BLOCK_PACK_IDS.length,
);
assert('null enables all optional packs', getEnabledBlockPackIds(null).length === OPTIONAL_BLOCK_PACK_IDS.length);
assert('empty array enables none', getEnabledBlockPackIds([]).length === 0);
assert(
    'subset resolves to intersection',
    getEnabledBlockPackIds([BLOCK_PACK_AI]).length === 1 &&
        getEnabledBlockPackIds([BLOCK_PACK_AI])[0] === BLOCK_PACK_AI,
);
assert('unknown ids are ignored', getEnabledBlockPackIds(['not_a_pack']).length === 0);
assert(
    'category map gates the three optional packs',
    BLOCK_PACK_CATEGORY_MAP.AI === BLOCK_PACK_AI &&
        BLOCK_PACK_CATEGORY_MAP.Curriculum === BLOCK_PACK_CURRICULUM &&
        BLOCK_PACK_CATEGORY_MAP.Robotics === BLOCK_PACK_ROBOTICS,
);

// Default (no options) shows AI, Curriculum, Robotics.
const defaultToolbox = getLevelOneToolbox('level_1_default');
const defaultNames = categoryNames(defaultToolbox);
assert('default shows AI', defaultNames.includes('AI'));
assert('default shows Curriculum', defaultNames.includes('Curriculum'));
assert('default shows Robotics', defaultNames.includes('Robotics'));
assert('default keeps core categories', hasAllCoreCategories(defaultToolbox));

// Explicit subset shows only selected optional packs.
const subsetToolbox = getLevelOneToolbox('level_1_default', {
    enabledBlockPacks: [BLOCK_PACK_AI, BLOCK_PACK_ROBOTICS],
});
const subsetNames = categoryNames(subsetToolbox);
assert('subset shows AI', subsetNames.includes('AI'));
assert('subset shows Robotics', subsetNames.includes('Robotics'));
assert('subset hides Curriculum', !subsetNames.includes('Curriculum'));
assert('subset keeps core categories', hasAllCoreCategories(subsetToolbox));

// Explicit empty array hides all optional packs.
const emptyToolbox = getLevelOneToolbox('level_1_default', { enabledBlockPacks: [] });
const emptyNames = categoryNames(emptyToolbox);
assert('empty hides AI', !emptyNames.includes('AI'));
assert('empty hides Curriculum', !emptyNames.includes('Curriculum'));
assert('empty hides Robotics', !emptyNames.includes('Robotics'));
assert('empty keeps core categories', hasAllCoreCategories(emptyToolbox));

// Pure filter helper does not mutate the source toolbox.
const source = getLevelOneToolbox('level_1_default');
const sourceLength = source.contents.length;
filterToolboxByEnabledPacks(source, []);
assert('filter helper is non-mutating', source.contents.length === sourceLength);

const failed = checks.filter((check) => !check.ok);
console.log(`Block pack toolbox smoke: ${checks.length - failed.length}/${checks.length} passed`);

if (failed.length) {
    process.exit(1);
}
