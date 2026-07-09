import * as Blockly from 'blockly/core';
import { blocks, loops, logic, math, texts, variables, variablesDynamic } from 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import * as En from 'blockly/msg/en';
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

export function resizeBlockWorkspace(workspace) {
    if (workspace) {
        Blockly.svgResize(workspace);
    }
}
