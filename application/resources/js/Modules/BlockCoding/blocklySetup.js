import * as Blockly from 'blockly/core';
import {
    blocks,
    loops,
    logic,
    math,
    texts,
    lists,
    variables,
    variablesDynamic,
    procedures,
} from 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import './aceBlocks.js';
import { attachVariableMonitorCheckboxes, installRuntimeVariableGenerators } from './blocklyRuntimeVariables.js';
import { attachReporterMonitorCheckboxes } from './monitorCheckbox.js';
import { aceTheme } from './aceTheme.js';
import { getLevelOneToolbox } from './levelOneToolbox';
import {
    SCRATCH_GRID_OPTIONS,
    SCRATCH_RENDERER_OVERRIDES,
    SCRATCH_ZOOM_OPTIONS,
} from './scratchBlocklyOptions.js';

void blocks;
void loops;
void logic;
void math;
void texts;
void lists;
void variables;
void variablesDynamic;
void procedures;

Blockly.setLocale(En);
installRuntimeVariableGenerators();
attachReporterMonitorCheckboxes();
attachVariableMonitorCheckboxes();

if (typeof document !== 'undefined' && !Blockly.common.getParentContainer()) {
    Blockly.common.setParentContainer(document.body);
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

const BLOCKLY_MEDIA_URL = 'https://unpkg.com/blockly@13.1.1/media/';

export function createBlockWorkspace(container, preset = 'level_1_default', options = {}) {
    const scratch = options.scratch ?? false;

    return Blockly.inject(container, {
        toolbox: getLevelOneToolbox(preset, { enabledBlockPacks: options.enabledBlockPacks }),
        theme: aceTheme,
        renderer: 'zelos',
        media: BLOCKLY_MEDIA_URL,
        trashcan: true,
        sounds: false,
        scrollbars: true,
        rendererOverrides: scratch ? SCRATCH_RENDERER_OVERRIDES : undefined,
        zoom: scratch ? SCRATCH_ZOOM_OPTIONS : {
            controls: true,
            wheel: true,
            startScale: 0.9,
        },
        grid: scratch ? SCRATCH_GRID_OPTIONS : {
            spacing: 20,
            length: 1,
            colour: '#d9d9d9',
            snap: false,
        },
        move: {
            scrollbars: true,
            drag: true,
            wheel: true,
        },
    });
}

export function workspaceToJavaScript(workspace) {
    return javascriptGenerator.workspaceToCode(workspace);
}

export async function runWorkspaceProgram(workspace, runtime) {
    runtime.resetForRun(workspace);

    const code = workspaceToJavaScript(workspace).trim();

    if (code === '') {
        runtime.setError('Add blocks to your workspace before running.');
        return { ok: false, reason: 'empty' };
    }

    const hasEventHat =
        code.includes('runtime.onGreenFlag') ||
        code.includes('runtime.onKeyPressed') ||
        code.includes('runtime.onBroadcastReceived') ||
        code.includes('runtime.onSpriteClicked') ||
        code.includes('runtime.onBackdropSwitched') ||
        code.includes('runtime.onGreaterThan') ||
        code.includes('runtime.onCloneStart');

    if (!hasEventHat) {
        runtime.setError(
            'Add an event block (green flag, key, sprite, backdrop, clone, greater than, or broadcast) before running.',
        );
        return { ok: false, reason: 'missing_hat' };
    }

    try {
        const runner = new AsyncFunction(
            'runtime',
            `${code}\nreturn runtime.start();`,
        );

        await Promise.race([runner(runtime), runtime.runTimeout()]);

        return { ok: runtime.state !== 'error', state: runtime.state };
    } catch (error) {
        runtime.setError(error instanceof Error ? error.message : 'Program stopped unexpectedly.');
        return { ok: false, state: 'error', error: runtime.error };
    }
}

export function resizeBlockWorkspace(workspace) {
    if (workspace) {
        Blockly.svgResize(workspace);
    }
}

export { serializeWorkspace, loadWorkspaceState } from './projectPersistence.js';
