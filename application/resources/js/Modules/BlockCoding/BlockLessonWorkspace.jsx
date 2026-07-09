import { useCallback, useEffect, useRef, useState } from 'react';
import BlockStage from './BlockStage';
import BlockWorkspace from './BlockWorkspace';
import { runWorkspaceProgram } from './blocklySetup';
import { StageRuntime } from './stageRuntime';

export default function BlockLessonWorkspace({ workspaceConfig }) {
    const runtimeRef = useRef(null);
    const workspaceRef = useRef(null);
    const [snapshot, setSnapshot] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        runtimeRef.current = new StageRuntime(workspaceConfig, setSnapshot);
        setSnapshot(runtimeRef.current.getSnapshot());

        return () => {
            runtimeRef.current?.stop();
        };
    }, [workspaceConfig]);

    const handleWorkspaceReady = useCallback((workspace) => {
        workspaceRef.current = workspace;
    }, []);

    const handleGreenFlag = useCallback(async () => {
        const runtime = runtimeRef.current;
        const workspace = workspaceRef.current;

        if (!runtime || !workspace) {
            return;
        }

        setIsRunning(true);

        try {
            await runWorkspaceProgram(workspace, runtime);
        } finally {
            setIsRunning(false);
        }
    }, []);

    const handleStop = useCallback(() => {
        runtimeRef.current?.stop();
        setIsRunning(false);
    }, []);

    if (!snapshot) {
        return null;
    }

    return (
        <div className="grid gap-6 xl:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
            <BlockStage
                isRunning={isRunning || snapshot.state === 'running'}
                onGreenFlag={handleGreenFlag}
                onStop={handleStop}
                snapshot={snapshot}
            />
            <BlockWorkspace
                lessonSlug={workspaceConfig.lesson_slug}
                onReady={handleWorkspaceReady}
                preset={workspaceConfig.preset}
            />
        </div>
    );
}
