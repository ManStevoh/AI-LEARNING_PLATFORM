import { useRef } from 'react';

function spritePositionStyle(sprite, stage) {
    const halfWidth = stage.width / 2;
    const halfHeight = stage.height / 2;

    return {
        left: `${50 + (sprite.x / halfWidth) * 50}%`,
        top: `${50 - (sprite.y / halfHeight) * 50}%`,
        transform: `translate(-50%, -50%) rotate(${sprite.direction - 90}deg)`,
    };
}

function SpriteVisual({ sprite, stage, activeSpriteId, interactive, onSpriteClick }) {
    const isActive = sprite.id === activeSpriteId;
    const canClick = interactive && onSpriteClick;
    const scale = (sprite.size ?? 100) / 100;

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
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg border bg-white/95 text-2xl shadow-sm ${
                    isActive ? 'border-[#855cd6] ring-2 ring-[#855cd6]/30' : 'border-white/80'
                } ${canClick ? 'cursor-pointer hover:scale-105' : ''}`}
                style={{ transform: `scale(${scale})` }}
            >
                {sprite.emoji}
            </div>
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
                    onMouseMove={(event) => reportPointer(event.clientX, event.clientY)}
                    ref={stageRef}
                    style={{ backgroundColor: stage.background }}
                >
                    <div
                        className="pointer-events-none absolute inset-0 opacity-25"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />

                    {snapshot.sprites.map((sprite) =>
                        sprite.visible ? (
                            <SpriteVisual
                                activeSpriteId={snapshot.activeSpriteId}
                                interactive={interactive}
                                key={sprite.id}
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
                {snapshot.sprites.map((sprite) =>
                    sprite.visible ? (
                        <div key={sprite.id} className="absolute" style={spritePositionStyle(sprite, stage)}>
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-3xl shadow-md">
                                {sprite.emoji}
                            </div>
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
