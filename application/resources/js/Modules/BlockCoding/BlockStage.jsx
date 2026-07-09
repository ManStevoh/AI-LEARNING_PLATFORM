function spritePositionStyle(sprite, stage) {
    const halfWidth = stage.width / 2;
    const halfHeight = stage.height / 2;

    return {
        left: `${50 + (sprite.x / halfWidth) * 50}%`,
        top: `${50 - (sprite.y / halfHeight) * 50}%`,
        transform: `translate(-50%, -50%) rotate(${sprite.direction - 90}deg)`,
    };
}

function runtimeStatusLabel(state) {
    switch (state) {
        case 'running':
            return 'Running';
        case 'stopped':
            return 'Stopped';
        case 'error':
            return 'Error';
        default:
            return 'Ready';
    }
}

export default function BlockStage({ snapshot, onGreenFlag, onStop, isRunning }) {
    const stage = snapshot.stage;
    const sprite = snapshot.sprites[0];

    return (
        <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border-subtle)] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-4 py-3">
                <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{stage.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Stage runtime</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                    {runtimeStatusLabel(snapshot.state)}
                </span>
            </div>

            <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] px-4 py-3">
                <button
                    aria-label="Run program"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isRunning}
                    onClick={onGreenFlag}
                    type="button"
                >
                    ▶
                </button>
                <button
                    aria-label="Stop program"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-sm font-bold text-white shadow-sm transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={!isRunning}
                    onClick={onStop}
                    type="button"
                >
                    ■
                </button>
            </div>

            <div className="relative flex-1 overflow-hidden" style={{ backgroundColor: stage.background }}>
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="absolute left-1/2 top-1/2 h-full w-px -translate-x-1/2 bg-white/40" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/40" />

                {sprite.visible ? (
                    <div className="absolute" style={spritePositionStyle(sprite, stage)}>
                        <div className="relative">
                            {sprite.say ? (
                                <div className="absolute bottom-full left-1/2 mb-2 w-max max-w-[180px] -translate-x-1/2 rounded-2xl bg-white px-3 py-2 text-xs font-medium text-slate-800 shadow-md">
                                    {sprite.say}
                                </div>
                            ) : null}
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/90 text-3xl shadow-md">
                                {sprite.emoji}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {snapshot.error ? (
                <div className="border-t border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">{snapshot.error}</div>
            ) : null}
        </div>
    );
}
