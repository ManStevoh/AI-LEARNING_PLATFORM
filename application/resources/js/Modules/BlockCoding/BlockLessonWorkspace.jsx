import { useCallback, useEffect, useRef, useState } from 'react';
import BlockStage from './BlockStage';
import BlockWorkspace from './BlockWorkspace';
import ScratchSpritePane from './ScratchSpritePane';
import { runWorkspaceProgram } from './blocklySetup';
import {
    extractActiveSpriteId,
    extractInitialSprites,
} from './projectEnvelope';
import { StageRuntime } from './stageRuntime';

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
        case 'pending':
            return 'Unsaved';
        default:
            return '';
    }
}

function resolveProjectState(savedProject, starterProject) {
    return savedProject?.workspace ?? starterProject?.workspace ?? null;
}

export default function BlockLessonWorkspace({ workspaceConfig, savedProject, starterProject }) {
    const runtimeRef = useRef(null);
    const workspaceRef = useRef(null);
    const [snapshot, setSnapshot] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [saveStatus, setSaveStatus] = useState(savedProject ? 'saved' : starterProject ? 'starter' : 'idle');

    useEffect(() => {
        const projectState = resolveProjectState(savedProject, starterProject);
        const sprites = extractInitialSprites(projectState, workspaceConfig.stage?.sprites);
        const activeSpriteId = extractActiveSpriteId(projectState);

        runtimeRef.current = new StageRuntime(
            {
                ...workspaceConfig,
                stage: {
                    ...workspaceConfig.stage,
                    ...(sprites ? { sprites } : {}),
                },
                active_sprite_id: activeSpriteId,
            },
            setSnapshot,
        );
        setSnapshot(runtimeRef.current.getSnapshot());

        return () => {
            runtimeRef.current?.stop();
        };
    }, [workspaceConfig, savedProject, starterProject]);

    const handleWorkspaceReady = useCallback((workspace) => {
        workspaceRef.current = workspace;
    }, []);

    const getProjectExtras = useCallback(() => {
        const runtimeSnapshot = runtimeRef.current?.getSnapshot();

        if (!runtimeSnapshot) {
            return {};
        }

        return {
            sprites: runtimeSnapshot.sprites,
            active_sprite_id: runtimeSnapshot.activeSpriteId,
        };
    }, []);

    const handleSelectSprite = useCallback((spriteId) => {
        runtimeRef.current?.setActiveSprite(spriteId);
    }, []);

    const handleSpriteStageClick = useCallback((spriteId) => {
        void runtimeRef.current?.handleSpriteClick(spriteId);
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

    const saveLabel = saveStatusLabel(saveStatus);

    return (
        <section className="scratch-studio rounded-lg border border-[#d9d9d9] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] bg-[#fafafa] px-3 py-2">
                <div className="flex items-center gap-1">
                    <span className="rounded-t-md border border-b-0 border-[#d9d9d9] bg-white px-4 py-1.5 text-sm font-semibold text-[#855cd6]">
                        Code
                    </span>
                    <span className="rounded-t-md px-4 py-1.5 text-sm text-[#999]">Costumes</span>
                    <span className="rounded-t-md px-4 py-1.5 text-sm text-[#999]">Sounds</span>
                </div>
                {saveLabel ? (
                    <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            saveStatus === 'error'
                                ? 'bg-rose-100 text-rose-700'
                                : saveStatus === 'saved'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                        {saveLabel}
                    </span>
                ) : null}
            </div>

            <div className="grid min-h-[min(720px,calc(100vh-11rem))] lg:grid-cols-[minmax(0,1fr)_420px]">
                <div className="min-w-0 border-b border-[#d9d9d9] lg:border-b-0 lg:border-r">
                    <BlockWorkspace
                        getProjectExtras={getProjectExtras}
                        lessonSlug={workspaceConfig.lesson_slug}
                        onReady={handleWorkspaceReady}
                        onSaveStatusChange={setSaveStatus}
                        preset={workspaceConfig.preset}
                        savedProject={savedProject}
                        starterProject={starterProject}
                        variant="scratch"
                    />
                </div>

                <div className="flex min-h-[320px] flex-col bg-[#fafafa]">
                    <div className="flex items-center gap-2 border-b border-[#d9d9d9] px-3 py-2">
                        <button
                            aria-label="Run program"
                            className="scratch-control-flag"
                            disabled={isRunning}
                            onClick={handleGreenFlag}
                            type="button"
                        />
                        <button
                            aria-label="Stop program"
                            className="scratch-control-stop"
                            disabled={!isRunning && snapshot.state !== 'running'}
                            onClick={handleStop}
                            type="button"
                        />
                    </div>

                    <BlockStage
                        isRunning={isRunning || snapshot.state === 'running'}
                        onSpriteClick={handleSpriteStageClick}
                        snapshot={snapshot}
                        variant="scratch"
                    />

                    <ScratchSpritePane
                        activeSpriteId={snapshot.activeSpriteId}
                        onSelectSprite={handleSelectSprite}
                        snapshot={snapshot}
                    />
                </div>
            </div>
        </section>
    );
}
