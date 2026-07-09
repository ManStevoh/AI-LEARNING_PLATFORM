import { useCallback, useEffect, useRef, useState } from 'react';
import BlockStage from './BlockStage';
import BlockWorkspace from './BlockWorkspace';
import ScratchSoundsPane from './ScratchSoundsPane';
import ScratchSpritePane from './ScratchSpritePane';
import { runWorkspaceProgram } from './blocklySetup';
import {
    extractActiveSpriteId,
    extractInitialSounds,
    extractInitialSprites,
} from './projectEnvelope';
import { listLessonSounds } from './soundAssets.js';
import { buildSoundLibraryMap, setProjectSounds as syncSoundLibrary } from './soundLibrary.js';
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
    const [soundSaveRevision, setSoundSaveRevision] = useState(0);

    const lessonSlug = workspaceConfig.lesson_slug;

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
        const activeSpriteId = extractActiveSpriteId(projectState);
        const envelopeSounds = extractInitialSounds(projectState);

        runtimeRef.current = new StageRuntime(
            {
                ...workspaceConfig,
                stage: {
                    ...workspaceConfig.stage,
                    ...(sprites ? { sprites } : {}),
                },
                active_sprite_id: activeSpriteId,
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
            runtimeRef.current?.stop();
        };
    }, [workspaceConfig, savedProject, starterProject, lessonSlug, applySoundLibrary]);

    const handleWorkspaceReady = useCallback((workspace) => {
        workspaceRef.current = workspace;
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
        };
    }, [projectSounds]);

    const handleSoundsChange = useCallback(
        (sounds) => {
            setProjectSounds(sounds);
            applySoundLibrary(sounds);
        },
        [applySoundLibrary],
    );

    const handleSoundSaveRequest = useCallback(() => {
        setSoundSaveRevision((revision) => revision + 1);
    }, []);

    const handleSelectSprite = useCallback((spriteId) => {
        runtimeRef.current?.setActiveSprite(spriteId);
    }, []);

    const handleSpriteStageClick = useCallback((spriteId) => {
        void runtimeRef.current?.handleSpriteClick(spriteId);
    }, []);

    const handleStagePointerMove = useCallback((clientX, clientY, rect) => {
        runtimeRef.current?.updatePointer(clientX, clientY, rect);
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
                    {[
                        ['code', 'Code'],
                        ['costumes', 'Costumes'],
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
                            externalSaveTrigger={soundSaveRevision}
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
                            onPointerMove={handleStagePointerMove}
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
            ) : null}

            {activeTab === 'costumes' ? (
                <div className="flex min-h-[320px] items-center justify-center bg-[#fafafa] p-8 text-sm text-[#999]">
                    Costume editor is coming in a later slice.
                </div>
            ) : null}

            {activeTab === 'sounds' ? (
                <ScratchSoundsPane
                    lessonSlug={lessonSlug}
                    onSaveRequest={handleSoundSaveRequest}
                    onSoundsChange={handleSoundsChange}
                    sounds={projectSounds}
                />
            ) : null}
        </section>
    );
}
