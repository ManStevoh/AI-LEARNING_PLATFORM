import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BlockStage from './BlockStage';
import BlockWorkspace from './BlockWorkspace';
import ScratchBackdropsPane from './ScratchBackdropsPane';
import ScratchCostumesPane from './ScratchCostumesPane';
import ScratchSoundsPane from './ScratchSoundsPane';
import ScratchSpritePane from './ScratchSpritePane';
import { runWorkspaceProgram } from './blocklySetup';
import {
    extractActiveSpriteId,
    extractInitialMonitors,
    extractInitialSounds,
    extractInitialSprites,
    extractInitialStage,
} from './projectEnvelope';
import {
    applyMonitorVisibilityToWorkspace,
    createMonitorChangeListener,
} from './monitorCheckbox.js';
import { listLessonSounds } from './soundAssets.js';
import { buildSoundLibraryMap, setProjectSounds as syncSoundLibrary } from './soundLibrary.js';
import { StageRuntime } from './stageRuntime';
import { resolveStageRenderer } from './stageRenderers/stageRendererConfig.js';

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

function mergeSoundLists(envelopeSounds, serverSounds) {
    const merged = new Map();

    for (const sound of serverSounds) {
        merged.set(sound.uuid, {
            id: sound.uuid,
            name: sound.name,
            asset_uuid: sound.uuid,
            size_bytes: sound.size_bytes,
        });
    }

    for (const sound of envelopeSounds) {
        const existing = merged.get(sound.asset_uuid);

        merged.set(sound.asset_uuid, {
            id: sound.id ?? sound.asset_uuid,
            name: sound.name,
            asset_uuid: sound.asset_uuid,
            size_bytes: existing?.size_bytes,
        });
    }

    return Array.from(merged.values());
}

export default function BlockLessonWorkspace({ workspaceConfig, savedProject, starterProject }) {
    const runtimeRef = useRef(null);
    const workspaceRef = useRef(null);
    const [snapshot, setSnapshot] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [saveStatus, setSaveStatus] = useState(savedProject ? 'saved' : starterProject ? 'starter' : 'idle');
    const [activeTab, setActiveTab] = useState('code');
    const [projectSounds, setProjectSounds] = useState([]);
    const [assetSaveRevision, setAssetSaveRevision] = useState(0);

    const lessonSlug = workspaceConfig.lesson_slug;
    const stageRenderer = useMemo(() => resolveStageRenderer(workspaceConfig), [workspaceConfig]);

    const applySoundLibrary = useCallback(
        (sounds) => {
            syncSoundLibrary(sounds);
            runtimeRef.current?.setSoundLibrary(buildSoundLibraryMap(lessonSlug, sounds));
        },
        [lessonSlug],
    );

    useEffect(() => {
        const projectState = resolveProjectState(savedProject, starterProject);
        const sprites = extractInitialSprites(projectState, workspaceConfig.stage?.sprites);
        const stageExtras = extractInitialStage(projectState);
        const monitors = extractInitialMonitors(projectState);
        const activeSpriteId = extractActiveSpriteId(projectState);
        const envelopeSounds = extractInitialSounds(projectState);

        runtimeRef.current = new StageRuntime(
            {
                ...workspaceConfig,
                stage: {
                    ...workspaceConfig.stage,
                    ...(stageExtras ?? {}),
                    ...(sprites ? { sprites } : {}),
                },
                active_sprite_id: activeSpriteId,
                monitors,
                sound_library: buildSoundLibraryMap(lessonSlug, envelopeSounds),
            },
            setSnapshot,
        );
        setSnapshot(runtimeRef.current.getSnapshot());
        setProjectSounds(envelopeSounds);
        syncSoundLibrary(envelopeSounds);

        let cancelled = false;

        void listLessonSounds(lessonSlug)
            .then((serverSounds) => {
                if (cancelled) {
                    return;
                }

                const merged = mergeSoundLists(envelopeSounds, serverSounds);
                setProjectSounds(merged);
                applySoundLibrary(merged);
            })
            .catch(() => {
                if (!cancelled) {
                    applySoundLibrary(envelopeSounds);
                }
            });

        return () => {
            cancelled = true;
            runtimeRef.current?.dispose?.() ?? runtimeRef.current?.stop();
        };
    }, [workspaceConfig, savedProject, starterProject, lessonSlug, applySoundLibrary]);

    const handleWorkspaceReady = useCallback((workspace) => {
        workspaceRef.current = workspace;

        const runtime = runtimeRef.current;

        if (!runtime) {
            return;
        }

        applyMonitorVisibilityToWorkspace(workspace, runtime.getMonitors());

        if (workspace.__aceMonitorListener) {
            workspace.removeChangeListener(workspace.__aceMonitorListener);
        }

        const listener = createMonitorChangeListener(workspace, runtime, () => {
            setAssetSaveRevision((revision) => revision + 1);
        });
        workspace.__aceMonitorListener = listener;
        workspace.addChangeListener(listener);
    }, []);

    const getProjectExtras = useCallback(() => {
        const runtimeSnapshot = runtimeRef.current?.getSnapshot();

        if (!runtimeSnapshot) {
            return { sounds: projectSounds };
        }

        return {
            sprites: runtimeSnapshot.sprites,
            active_sprite_id: runtimeSnapshot.activeSpriteId,
            sounds: projectSounds,
            stage: {
                backdrops: runtimeSnapshot.stage?.backdrops ?? [],
                backdropIndex: runtimeSnapshot.stage?.backdropIndex ?? 0,
            },
            monitors: runtimeRef.current?.getMonitors() ?? [],
        };
    }, [projectSounds]);

    const handleSoundsChange = useCallback(
        (sounds) => {
            setProjectSounds(sounds);
            applySoundLibrary(sounds);
        },
        [applySoundLibrary],
    );

    const handleAssetSaveRequest = useCallback(() => {
        setAssetSaveRevision((revision) => revision + 1);
    }, []);

    const handleAddCostume = useCallback((spriteId, costume) => {
        runtimeRef.current?.addCostumeToSprite(spriteId, costume);
    }, []);

    const handleSelectCostume = useCallback((spriteId, index) => {
        runtimeRef.current?.selectCostume(spriteId, index);
    }, []);

    const handleDeleteCostume = useCallback((spriteId, index) => {
        runtimeRef.current?.removeCostume(spriteId, index);
    }, []);

    const handleAddBackdrop = useCallback((backdrop) => {
        runtimeRef.current?.addBackdrop(backdrop);
    }, []);

    const handleSelectBackdrop = useCallback((index) => {
        runtimeRef.current?.selectBackdrop(index);
    }, []);

    const handleDeleteBackdrop = useCallback((index) => {
        runtimeRef.current?.removeBackdrop(index);
    }, []);

    const handleSelectSprite = useCallback((spriteId) => {
        runtimeRef.current?.setActiveSprite(spriteId);
    }, []);

    const handleAddSpriteFromLibrary = useCallback((libraryId) => {
        runtimeRef.current?.addSpriteFromLibrary(libraryId);
        setAssetSaveRevision((revision) => revision + 1);
    }, []);

    const handleSpriteStageClick = useCallback((spriteId) => {
        void runtimeRef.current?.handleSpriteClick(spriteId);
    }, []);

    const handleStagePointerMove = useCallback((clientX, clientY, rect) => {
        runtimeRef.current?.updatePointer(clientX, clientY, rect);
    }, []);

    const handleStagePointerDown = useCallback(() => {
        runtimeRef.current?.setPointerDown(true);
    }, []);

    const handleStagePointerUp = useCallback(() => {
        runtimeRef.current?.setPointerDown(false);
    }, []);

    const handleMoveMonitor = useCallback((id, position) => {
        runtimeRef.current?.moveMonitor(id, position);
    }, []);

    const handleMoveMonitorEnd = useCallback(() => {
        setAssetSaveRevision((revision) => revision + 1);
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

    const handleColorSamplerReady = useCallback((sampler) => {
        runtimeRef.current?.setColorSampler(sampler);
    }, []);

    if (!snapshot) {
        return null;
    }

    const saveLabel = saveStatusLabel(saveStatus);

    return (
        <section className="scratch-studio rounded-lg border border-[#d9d9d9] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#d9d9d9] bg-[#fafafa] px-3 py-2">
                <div className="flex items-center gap-1">
                    {[
                        ['code', 'Code'],
                        ['costumes', 'Costumes'],
                        ['backdrops', 'Backdrops'],
                        ['sounds', 'Sounds'],
                    ].map(([tab, label]) => (
                        <button
                            className={`rounded-t-md px-4 py-1.5 text-sm ${
                                activeTab === tab
                                    ? 'border border-b-0 border-[#d9d9d9] bg-white font-semibold text-[#855cd6]'
                                    : 'text-[#999] hover:text-[#575e75]'
                            }`}
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            type="button"
                        >
                            {label}
                        </button>
                    ))}
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

            {activeTab === 'code' ? (
                <div className="grid min-h-[min(720px,calc(100vh-11rem))] lg:grid-cols-[minmax(0,1fr)_420px]">
                    <div className="min-w-0 border-b border-[#d9d9d9] lg:border-b-0 lg:border-r">
                        <BlockWorkspace
                            externalSaveTrigger={assetSaveRevision}
                            getProjectExtras={getProjectExtras}
                            lessonSlug={lessonSlug}
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
                            lessonSlug={lessonSlug}
                            onColorSamplerReady={handleColorSamplerReady}
                            onMoveMonitor={handleMoveMonitor}
                            onMoveMonitorEnd={handleMoveMonitorEnd}
                            onPointerDown={handleStagePointerDown}
                            onPointerMove={handleStagePointerMove}
                            onPointerUp={handleStagePointerUp}
                            onSpriteClick={handleSpriteStageClick}
                            snapshot={snapshot}
                            stageRenderer={stageRenderer}
                            variant="scratch"
                        />

                        <ScratchSpritePane
                            activeSpriteId={snapshot.activeSpriteId}
                            lessonSlug={lessonSlug}
                            onAddSpriteFromLibrary={handleAddSpriteFromLibrary}
                            onSelectSprite={handleSelectSprite}
                            snapshot={snapshot}
                        />
                    </div>
                </div>
            ) : null}

            {activeTab === 'costumes' ? (
                <ScratchCostumesPane
                    activeSprite={
                        snapshot.sprites.find((sprite) => sprite.id === snapshot.activeSpriteId) ??
                        snapshot.sprites[0]
                    }
                    lessonSlug={lessonSlug}
                    onAddCostume={handleAddCostume}
                    onDeleteCostume={handleDeleteCostume}
                    onSaveRequest={handleAssetSaveRequest}
                    onSelectCostume={handleSelectCostume}
                />
            ) : null}

            {activeTab === 'backdrops' ? (
                <ScratchBackdropsPane
                    lessonSlug={lessonSlug}
                    onAddBackdrop={handleAddBackdrop}
                    onDeleteBackdrop={handleDeleteBackdrop}
                    onSaveRequest={handleAssetSaveRequest}
                    onSelectBackdrop={handleSelectBackdrop}
                    stage={snapshot.stage}
                />
            ) : null}

            {activeTab === 'sounds' ? (
                <ScratchSoundsPane
                    lessonSlug={lessonSlug}
                    onSaveRequest={handleAssetSaveRequest}
                    onSoundsChange={handleSoundsChange}
                    sounds={projectSounds}
                />
            ) : null}
        </section>
    );
}
