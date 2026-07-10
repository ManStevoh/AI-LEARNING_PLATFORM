import * as Blockly from 'blockly/core';
import {
    buildDynamicMonitorId,
    getDynamicMonitorLabel,
    getVariableIdFromBlock,
} from './dynamicMonitors.js';
import { MONITOR_BY_BLOCK_TYPE, MONITOR_BY_ID, STAGE_MONITORS } from './stageMonitors.js';

function resolveMonitorFromBlock(block) {
    if (!block) {
        return null;
    }

    const staticMonitor = MONITOR_BY_BLOCK_TYPE[block.type];

    if (staticMonitor) {
        return { id: staticMonitor.id, label: staticMonitor.label };
    }

    const variableId = getVariableIdFromBlock(block);
    const monitorId = buildDynamicMonitorId(block.type, variableId);

    if (!monitorId) {
        return null;
    }

    const variableName = block.getField('VAR')?.getVariable()?.getName() ?? 'variable';

    return {
        id: monitorId,
        label: getDynamicMonitorLabel(block, variableName),
        dynamic: true,
    };
}

function applyMonitorField(block, visibleIds) {
    const field = block.getField('MONITOR');

    if (!field) {
        return;
    }

    const monitor = resolveMonitorFromBlock(block);

    if (!monitor) {
        return;
    }

    const next = visibleIds.has(monitor.id) ? 'TRUE' : 'FALSE';

    if (field.getValue() !== next) {
        field.setValue(next);
    }
}

export function attachReporterMonitorCheckboxes() {
    for (const monitor of STAGE_MONITORS) {
        const definition = Blockly.Blocks[monitor.blockType];

        if (!definition || definition.__aceMonitorAttached) {
            continue;
        }

        const originalInit = definition.init;

        definition.init = function initWithMonitorCheckbox() {
            originalInit.call(this);

            const firstInput = this.inputList[0];

            if (firstInput && !this.getField('MONITOR')) {
                firstInput.insertFieldAt(0, new Blockly.FieldCheckbox('FALSE'), 'MONITOR');
            }
        };

        definition.__aceMonitorAttached = true;
    }
}

export function applyMonitorVisibilityToWorkspace(workspace, monitors) {
    if (!workspace) {
        return;
    }

    const visibleIds = new Set(
        (Array.isArray(monitors) ? monitors : [])
            .filter((monitor) => monitor?.visible !== false)
            .map((monitor) => monitor.id),
    );

    const apply = (ws) => {
        if (!ws) {
            return;
        }

        for (const block of ws.getAllBlocks(false)) {
            applyMonitorField(block, visibleIds);
        }
    };

    apply(workspace);
    apply(workspace.getFlyout()?.getWorkspace?.());
}

export function createMonitorChangeListener(workspace, runtime, onPersist) {
    return (event) => {
        if (!event) {
            return;
        }

        if (
            event.type === Blockly.Events.BLOCK_CHANGE &&
            event.element === 'field' &&
            event.name === 'MONITOR'
        ) {
            const block =
                workspace.getBlockById(event.blockId) ??
                workspace.getFlyout()?.getWorkspace?.()?.getBlockById(event.blockId);
            const monitor = block ? resolveMonitorFromBlock(block) : null;

            if (!monitor) {
                return;
            }

            if (!monitor.dynamic && !MONITOR_BY_ID[monitor.id]) {
                return;
            }

            const visible = event.newValue === 'TRUE';
            runtime.setMonitorVisible(monitor.id, visible, monitor);
            applyMonitorVisibilityToWorkspace(workspace, runtime.getMonitors());
            onPersist?.();

            return;
        }

        if (
            event.type === Blockly.Events.BLOCK_CREATE ||
            event.type === Blockly.Events.FINISHED_LOADING
        ) {
            applyMonitorVisibilityToWorkspace(workspace, runtime.getMonitors());
        }
    };
}
