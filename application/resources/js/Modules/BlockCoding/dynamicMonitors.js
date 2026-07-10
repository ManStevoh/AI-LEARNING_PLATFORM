export const VARIABLE_MONITOR_PREFIX = 'var:';
export const LIST_LENGTH_MONITOR_PREFIX = 'list:length:';
export const LIST_EMPTY_MONITOR_PREFIX = 'list:empty:';

export const DYNAMIC_MONITOR_BLOCK_TYPES = {
    variables_get: {
        prefix: VARIABLE_MONITOR_PREFIX,
        color: '#ff8c1a',
        defaultLabel: 'variable',
    },
    lists_length: {
        prefix: LIST_LENGTH_MONITOR_PREFIX,
        color: '#cf63cf',
        defaultLabel: 'list length',
    },
    lists_isEmpty: {
        prefix: LIST_EMPTY_MONITOR_PREFIX,
        color: '#cf63cf',
        defaultLabel: 'list empty?',
    },
};

export function isDynamicMonitorId(id) {
    return (
        typeof id === 'string' &&
        (id.startsWith(VARIABLE_MONITOR_PREFIX) ||
            id.startsWith(LIST_LENGTH_MONITOR_PREFIX) ||
            id.startsWith(LIST_EMPTY_MONITOR_PREFIX))
    );
}

export function parseDynamicMonitorId(id) {
    if (typeof id !== 'string') {
        return null;
    }

    if (id.startsWith(VARIABLE_MONITOR_PREFIX)) {
        return { kind: 'variable', variableId: id.slice(VARIABLE_MONITOR_PREFIX.length) };
    }

    if (id.startsWith(LIST_LENGTH_MONITOR_PREFIX)) {
        return { kind: 'list_length', variableId: id.slice(LIST_LENGTH_MONITOR_PREFIX.length) };
    }

    if (id.startsWith(LIST_EMPTY_MONITOR_PREFIX)) {
        return { kind: 'list_empty', variableId: id.slice(LIST_EMPTY_MONITOR_PREFIX.length) };
    }

    return null;
}

export function buildDynamicMonitorId(blockType, variableId) {
    const config = DYNAMIC_MONITOR_BLOCK_TYPES[blockType];

    if (!config || !variableId) {
        return null;
    }

    return `${config.prefix}${variableId}`;
}

export function getVariableIdFromBlock(block) {
    if (!block) {
        return null;
    }

    if (block.type === 'variables_get') {
        return block.getField('VAR')?.getVariable()?.getId() ?? null;
    }

    if (block.type === 'lists_length' || block.type === 'lists_isEmpty') {
        const target = block.getInputTargetBlock('VALUE');

        if (target?.type === 'variables_get') {
            return target.getField('VAR')?.getVariable()?.getId() ?? null;
        }
    }

    return null;
}

export function getDynamicMonitorLabel(block, variableName = 'variable') {
    if (!block) {
        return 'variable';
    }

    if (block.type === 'variables_get') {
        return variableName;
    }

    if (block.type === 'lists_length') {
        return `length of ${variableName}`;
    }

    if (block.type === 'lists_isEmpty') {
        return `${variableName} empty?`;
    }

    return variableName;
}

export function getDynamicMonitorPresentation(parsed, monitor, runtime) {
    const name = runtime?.getVariableNameById?.(parsed.variableId) ?? monitor?.label ?? 'variable';

    if (parsed.kind === 'variable') {
        return {
            label: monitor?.label ?? name,
            color: '#ff8c1a',
        };
    }

    if (parsed.kind === 'list_length') {
        return {
            label: monitor?.label ?? `length of ${name}`,
            color: '#cf63cf',
        };
    }

    return {
        label: monitor?.label ?? `${name} empty?`,
        color: '#cf63cf',
    };
}

export function readDynamicMonitorValue(parsed, runtime) {
    if (!parsed || !runtime) {
        return null;
    }

    const value = runtime.getVariableById(parsed.variableId);

    if (parsed.kind === 'variable') {
        return value;
    }

    if (parsed.kind === 'list_length') {
        return Array.isArray(value) ? value.length : 0;
    }

    return Array.isArray(value) ? value.length === 0 : true;
}
