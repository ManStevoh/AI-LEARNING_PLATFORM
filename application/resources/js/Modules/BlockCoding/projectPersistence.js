import * as Blockly from 'blockly/core';
import { extractBlocklyState } from './projectEnvelope.js';

export { buildProjectEnvelope, extractBlocklyState, extractInitialSounds, isProjectEnvelope } from './projectEnvelope.js';

export function serializeWorkspace(workspace) {
    return Blockly.serialization.workspaces.save(workspace);
}

export function loadWorkspaceState(workspace, state) {
    const blocklyState = extractBlocklyState(state);

    if (!blocklyState || typeof blocklyState !== 'object') {
        return;
    }

    Blockly.serialization.workspaces.load(blocklyState, workspace, { recordUndo: false });
}

function readCsrfToken() {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    return match ? decodeURIComponent(match[1]) : '';
}

export async function saveLessonProject(lessonSlug, payload) {
    const response = await fetch(`/learner/learn/${lessonSlug}/project`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': readCsrfToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Unable to save project.');
    }

    return response.json();
}
