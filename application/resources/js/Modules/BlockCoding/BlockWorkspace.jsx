import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly/core';
import { useShellLayout } from '../../Layouts/ShellLayoutContext';
import {
    createBlockWorkspace,
    loadWorkspaceState,
    resizeBlockWorkspace,
    serializeWorkspace,
    workspaceToJavaScript,
} from './blocklySetup';
import { saveLessonProject } from './projectPersistence.js';
import { buildProjectEnvelope } from './projectEnvelope.js';

function saveStatusLabel(status) {
    switch (status) {
        case 'saving':
            return 'Saving…';
        case 'saved':
            return 'Saved';
        case 'starter':
            return 'Starter loaded';
        case 'error':
            return 'Save failed';
        default:
            return 'Unsaved changes';
    }
}

export default function BlockWorkspace({
    preset,
    lessonSlug,
    onReady,
    savedProject,
    starterProject,
    onSaveStatusChange,
    getProjectExtras,
    externalSaveTrigger = 0,
    variant = 'default',
}) {
    const containerRef = useRef(null);
    const workspaceRef = useRef(null);
    const saveTimeoutRef = useRef(null);
    const hasLoadedProjectRef = useRef(false);
    const allowAutoSaveRef = useRef(false);
    const queueSaveRef = useRef(null);
    const [generatedCode, setGeneratedCode] = useState('// Drag blocks into the workspace to generate code.');
    const [saveStatus, setSaveStatus] = useState(
        savedProject ? 'saved' : starterProject ? 'starter' : 'idle',
    );
    const embedded = variant === 'embedded';
    const scratch = variant === 'scratch';
    const studio = embedded || scratch;
    const { sidebarCollapsed, codingFocus } = useShellLayout();

    useEffect(() => {
        if (workspaceRef.current) {
            window.setTimeout(() => resizeBlockWorkspace(workspaceRef.current), 200);
        }
    }, [sidebarCollapsed, codingFocus]);

    const updateSaveStatus = (status) => {
        setSaveStatus(status);
        onSaveStatusChange?.(status);
    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        const workspace = createBlockWorkspace(container, preset, { scratch });
        workspaceRef.current = workspace;

        if (!hasLoadedProjectRef.current) {
            if (savedProject?.workspace) {
                loadWorkspaceState(workspace, savedProject.workspace);
            } else if (starterProject?.workspace) {
                loadWorkspaceState(workspace, starterProject.workspace);
            }

            hasLoadedProjectRef.current = true;
        }

        onReady?.(workspace);

        const queueSave = () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            updateSaveStatus('pending');

            saveTimeoutRef.current = setTimeout(async () => {
                updateSaveStatus('saving');

                try {
                    const extras = getProjectExtras?.() ?? {};
                    await saveLessonProject(lessonSlug, {
                        workspace: buildProjectEnvelope(serializeWorkspace(workspace), extras),
                        generated_code: workspaceToJavaScript(workspace),
                    });
                    updateSaveStatus('saved');
                } catch {
                    updateSaveStatus('error');
                }
            }, 1500);
        };

        queueSaveRef.current = queueSave;

        const updateCode = () => {
            const code = workspaceToJavaScript(workspace).trim();
            setGeneratedCode(code === '' ? '// Drag blocks into the workspace to generate code.' : code);

            if (allowAutoSaveRef.current) {
                queueSave();
            }
        };

        const onResize = () => resizeBlockWorkspace(workspace);

        const onBlocklyEvent = (event) => {
            if (event.type === Blockly.Events.TOOLBOX_ITEM_SELECT) {
                window.setTimeout(() => resizeBlockWorkspace(workspace), 50);
            }
        };

        workspace.addChangeListener(updateCode);
        workspace.addChangeListener(onBlocklyEvent);
        updateCode();
        window.setTimeout(() => {
            allowAutoSaveRef.current = true;
            resizeBlockWorkspace(workspace);
        }, 0);
        window.addEventListener('resize', onResize);

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            workspace.removeChangeListener(updateCode);
            workspace.removeChangeListener(onBlocklyEvent);
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
            workspace.dispose();
            workspaceRef.current = null;
            hasLoadedProjectRef.current = false;
            allowAutoSaveRef.current = false;
        };
    }, [preset, lessonSlug, onReady, savedProject, starterProject, onSaveStatusChange, getProjectExtras, scratch]);

    useEffect(() => {
        if (!allowAutoSaveRef.current || !queueSaveRef.current) {
            return;
        }

        queueSaveRef.current();
    }, [externalSaveTrigger]);

    const workspacePanel = (
        <>
            {!studio ? (
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-white px-4 py-3">
                    <div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">Block workspace</p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {starterProject && !savedProject
                                ? `Starter: ${starterProject.title}`
                                : 'Drag blocks from the toolbox · auto-saves'}
                        </p>
                    </div>
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            saveStatus === 'error'
                                ? 'bg-rose-100 text-rose-700'
                                : saveStatus === 'saved'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : saveStatus === 'starter'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                        {saveStatusLabel(saveStatus)}
                    </span>
                </div>
            ) : null}
            <div
                className={`blockly-root ${
                    scratch ? 'scratch-blockly-root' : 'bg-[#f9fafb]'
                } ${scratch ? 'h-full min-h-[480px]' : embedded ? (sidebarCollapsed ? 'h-[min(820px,calc(100vh-9rem))] min-h-[560px]' : 'h-[min(720px,calc(100vh-14rem))] min-h-[520px]') : 'h-[480px] min-h-[420px]'}`}
                ref={containerRef}
            />
        </>
    );

    const codePanel = scratch ? null : (
        <details className={embedded ? 'border-t border-[var(--color-border-subtle)] bg-slate-950' : 'rounded-2xl border border-[var(--color-border-subtle)] bg-slate-950 p-4'}>
            <summary className={`cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 ${embedded ? 'px-4 py-3' : ''}`}>
                Generated JavaScript
            </summary>
            <pre className={`overflow-x-auto text-sm leading-6 text-slate-100 ${embedded ? 'max-h-48 px-4 pb-4' : 'mt-3'}`}>
                <code>{generatedCode}</code>
            </pre>
        </details>
    );

    if (studio) {
        return (
            <div className="flex h-full flex-col">
                {workspacePanel}
                {codePanel}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
                {workspacePanel}
            </div>
            {codePanel}
        </div>
    );
}
