import { useEffect, useRef, useState } from 'react';
import {
    createBlockWorkspace,
    loadWorkspaceState,
    resizeBlockWorkspace,
    serializeWorkspace,
    workspaceToJavaScript,
} from './blocklySetup';
import { saveLessonProject } from './projectPersistence.js';

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
}) {
    const containerRef = useRef(null);
    const workspaceRef = useRef(null);
    const saveTimeoutRef = useRef(null);
    const hasLoadedProjectRef = useRef(false);
    const allowAutoSaveRef = useRef(false);
    const [generatedCode, setGeneratedCode] = useState('// Drag blocks into the workspace to generate code.');
    const [saveStatus, setSaveStatus] = useState(
        savedProject ? 'saved' : starterProject ? 'starter' : 'idle',
    );

    const updateSaveStatus = (status) => {
        setSaveStatus(status);
        onSaveStatusChange?.(status);
    };

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        const workspace = createBlockWorkspace(container, preset);
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
                    await saveLessonProject(lessonSlug, {
                        workspace: serializeWorkspace(workspace),
                        generated_code: workspaceToJavaScript(workspace),
                    });
                    updateSaveStatus('saved');
                } catch {
                    updateSaveStatus('error');
                }
            }, 1500);
        };

        const updateCode = () => {
            const code = workspaceToJavaScript(workspace).trim();
            setGeneratedCode(code === '' ? '// Drag blocks into the workspace to generate code.' : code);

            if (allowAutoSaveRef.current) {
                queueSave();
            }
        };

        const onResize = () => resizeBlockWorkspace(workspace);

        workspace.addChangeListener(updateCode);
        updateCode();
        window.setTimeout(() => {
            allowAutoSaveRef.current = true;
        }, 0);
        window.addEventListener('resize', onResize);

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }

            workspace.removeChangeListener(updateCode);
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
            workspace.dispose();
            workspaceRef.current = null;
            hasLoadedProjectRef.current = false;
            allowAutoSaveRef.current = false;
        };
    }, [preset, lessonSlug, onReady, savedProject, starterProject, onSaveStatusChange]);

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-4 py-3">
                    <div>
                        <p className="text-sm font-semibold text-[var(--color-text-primary)]">Block workspace</p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                            {starterProject && !savedProject
                                ? `Starter: ${starterProject.title}`
                                : 'Level 1 toolbox · auto-saves your project'}
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
                <div className="min-h-[420px] bg-slate-50" ref={containerRef} />
            </div>

            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-slate-950 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Generated JavaScript</p>
                <pre className="mt-3 overflow-x-auto text-sm leading-6 text-slate-100">
                    <code>{generatedCode}</code>
                </pre>
            </div>
        </div>
    );
}
