import * as Blockly from 'blockly/core';
import { blocks, loops, logic, math, texts, variables, variablesDynamic } from 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';
import './aceBlocks.js';
import { getLevelOneToolbox } from './levelOneToolbox';

void blocks;
void loops;
void logic;
void math;
void texts;
void variables;
void variablesDynamic;

Blockly.setLocale(En);

const BLOCKLY_MEDIA_URL = 'https://unpkg.com/blockly@13.1.1/media/';

export function createBlockWorkspace(container, preset = 'level_1_default') {
    return Blockly.inject(container, {
        toolbox: getLevelOneToolbox(preset),
        media: BLOCKLY_MEDIA_URL,
        trashcan: true,
        sounds: false,
        scrollbars: true,
        zoom: {
            controls: true,
            wheel: true,
            startScale: 1,
        },
    });
}

export function workspaceToJavaScript(workspace) {
    return javascriptGenerator.workspaceToCode(workspace);
}

export async function runWorkspaceProgram(workspace, runtime) {
    runtime.resetForRun();

    const code = workspaceToJavaScript(workspace).trim();

    if (code === '') {
        runtime.setError('Add blocks to your workspace before running.');
        return { ok: false, reason: 'empty' };
    }

    if (!code.includes('runtime.onGreenFlag')) {
        runtime.setError('Add a "when green flag clicked" block to run your program.');
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
