import { useEffect, useRef, useState } from 'react';
import {
    createBlockWorkspace,
    resizeBlockWorkspace,
    workspaceToJavaScript,
} from './blocklySetup';

export default function BlockWorkspace({ preset, lessonSlug }) {
    const containerRef = useRef(null);
    const workspaceRef = useRef(null);
    const [generatedCode, setGeneratedCode] = useState('// Drag blocks into the workspace to generate code.');

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return undefined;
        }

        const workspace = createBlockWorkspace(container, preset);
        workspaceRef.current = workspace;

        const updateCode = () => {
            const code = workspaceToJavaScript(workspace).trim();
            setGeneratedCode(code === '' ? '// Drag blocks into the workspace to generate code.' : code);
        };

        const onResize = () => resizeBlockWorkspace(workspace);

        workspace.addChangeListener(updateCode);
        updateCode();
        window.addEventListener('resize', onResize);

        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        return () => {
            workspace.removeChangeListener(updateCode);
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
            workspace.dispose();
            workspaceRef.current = null;
        };
    }, [preset, lessonSlug]);

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
                <div className="border-b border-[var(--color-border-subtle)] px-4 py-3">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">Block workspace</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Level 1 toolbox · Blockly foundation</p>
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
