import { useRef } from 'react';
import { backdropImageUrl } from './backdropAssets.js';
import { costumeImageUrl } from './costumeAssets.js';
import StageMonitorOverlay from './StageMonitorOverlay';

function spritePositionStyle(sprite, stage) {
    const halfWidth = stage.width / 2;
    const halfHeight = stage.height / 2;
    const rotationStyle = sprite.rotationStyle ?? 'all around';
    let rotation = sprite.direction - 90;
    let scaleX = 1;

    if (rotationStyle === "don't rotate") {
        rotation = 0;
    } else if (rotationStyle === 'left-right') {
        rotation = 0;
        const normalized = ((sprite.direction % 360) + 360) % 360;
        scaleX = normalized > 180 ? -1 : 1;
    }

    const ghost = Math.max(0, Math.min(100, sprite.effects?.ghost ?? 0));
    const brightness = Math.max(-100, Math.min(100, sprite.effects?.brightness ?? 0));
    const hue = ((sprite.effects?.color ?? 0) % 200) * 1.8;

    return {
        left: `${50 + (sprite.x / halfWidth) * 50}%`,
        top: `${50 - (sprite.y / halfHeight) * 50}%`,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scaleX(${scaleX})`,
        opacity: 1 - ghost / 100,
        filter: `hue-rotate(${hue}deg) brightness(${1 + brightness / 100})`,
        zIndex: sprite.layer ?? 0,
    };
}

function CostumeFace({ sprite, lessonSlug, className, scale }) {
    if (sprite.costumeAssetUuid && lessonSlug) {
        return (
            <img
                alt={sprite.name}
                className={`${className} object-contain`}
                src={costumeImageUrl(lessonSlug, sprite.costumeAssetUuid)}
                style={{ transform: `scale(${scale})` }}
            />
        );
    }

    return (
        <div className={className} style={{ transform: `scale(${scale})` }}>
            {sprite.emoji}
        </div>
    );
}

function SpriteVisual({ sprite, stage, activeSpriteId, interactive, onSpriteClick, lessonSlug }) {
    const isActive = sprite.id === activeSpriteId;
    const canClick = interactive && onSpriteClick;
    const scale = (sprite.size ?? 100) / 100;
    const faceClass = `flex h-12 w-12 items-center justify-center rounded-lg border bg-white/95 text-2xl shadow-sm ${
        isActive ? 'border-[#855cd6] ring-2 ring-[#855cd6]/30' : 'border-white/80'
    } ${canClick ? 'cursor-pointer hover:scale-105' : ''}`;

    const body = (
        <>
            {sprite.say ? (
                <div className="absolute bottom-full left-1/2 mb-2 w-max max-w-[160px] -translate-x-1/2 rounded-xl bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-md">
                    {sprite.say}
                </div>
            ) : null}
            {sprite.think ? (
                <div className="absolute bottom-full left-1/2 mb-2 w-max max-w-[160px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs italic text-slate-700 shadow-md">
                    {sprite.think}
                </div>
            ) : null}
            <CostumeFace className={faceClass} lessonSlug={lessonSlug} scale={scale} sprite={sprite} />
        </>
    );

    return (
        <div className="absolute" style={spritePositionStyle(sprite, stage)}>
            <div className="relative">
                {canClick ? (
                    <button
                        aria-label={`Click ${sprite.name}`}
                        className="relative border-0 bg-transparent p-0"
                        onClick={() => onSpriteClick(sprite.id)}
                        type="button"
                    >
                        {body}
                    </button>
                ) : (
                    body
                )}
            </div>
        </div>
    );
}

export default function BlockStage({
    snapshot,
    isRunning,
    variant = 'default',
    onSpriteClick = null,
    onPointerMove = null,
    onPointerDown = null,
    onPointerUp = null,
    onMoveMonitor = null,
    onMoveMonitorEnd = null,
    lessonSlug = null,
}) {
    const stageRef = useRef(null);
    const stage = snapshot.stage;
    const scratch = variant === 'scratch';
    const interactive = isRunning || snapshot.state === 'running';

    const reportPointer = (clientX, clientY) => {
        if (!stageRef.current) {
            return;
        }

        onPointerMove?.(clientX, clientY, stageRef.current.getBoundingClientRect());
    };

    if (scratch) {
        return (
            <div className="relative flex-1 overflow-hidden border-b border-[#d9d9d9] bg-white">
                <div
                    className="relative h-full min-h-[220px] w-full"
                    onMouseDown={(event) => {
                        onPointerDown?.(true);
                        reportPointer(event.clientX, event.clientY);
                    }}
                    onMouseLeave={() => onPointerUp?.(false)}
                    onMouseMove={(event) => reportPointer(event.clientX, event.clientY)}
                    onMouseUp={() => onPointerUp?.(false)}
                    ref={stageRef}
                    style={{ backgroundColor: stage.background }}
                >
                    {stage.backdropAssetUuid && lessonSlug ? (
                        <img
                            alt=""
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                            src={backdropImageUrl(lessonSlug, stage.backdropAssetUuid)}
                        />
                    ) : null}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-25"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />

                    <StageMonitorOverlay
                        monitors={snapshot.monitors}
                        onMoveMonitor={onMoveMonitor}
                        onMoveMonitorEnd={onMoveMonitorEnd}
                    />

                    {snapshot.sprites.map((sprite) =>
                        sprite.visible ? (
                            <SpriteVisual
                                activeSpriteId={snapshot.activeSpriteId}
                                interactive={interactive}
                                key={sprite.id}
                                lessonSlug={lessonSlug}
                                onSpriteClick={onSpriteClick}
                                sprite={sprite}
                                stage={stage}
                            />
                        ) : null,
                    )}
                </div>

                {snapshot.error ? (
                    <div className="absolute inset-x-0 bottom-0 border-t border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                        {snapshot.error}
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
            <div
                className="relative flex-1 overflow-hidden"
                style={{ backgroundColor: stage.background }}
            >
                {stage.backdropAssetUuid && lessonSlug ? (
                    <img
                        alt=""
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        src={backdropImageUrl(lessonSlug, stage.backdropAssetUuid)}
                    />
                ) : null}
                <StageMonitorOverlay
                    monitors={snapshot.monitors}
                    onMoveMonitor={onMoveMonitor}
                    onMoveMonitorEnd={onMoveMonitorEnd}
                />
                {snapshot.sprites.map((sprite) =>
                    sprite.visible ? (
                        <div key={sprite.id} className="absolute" style={spritePositionStyle(sprite, stage)}>
                            <CostumeFace
                                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-3xl shadow-md"
                                lessonSlug={lessonSlug}
                                scale={1}
                                sprite={sprite}
                            />
                        </div>
                    ) : null,
                )}
            </div>
            {snapshot.error ? (
                <div className="border-t border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{snapshot.error}</div>
            ) : null}
        </div>
    );
}
