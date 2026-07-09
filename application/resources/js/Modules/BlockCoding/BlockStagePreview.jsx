export default function BlockStagePreview({ stage }) {
    return (
        <div className="flex h-full min-h-[420px] flex-col rounded-2xl border border-[var(--color-border-subtle)] bg-gradient-to-br from-sky-50 to-indigo-50 shadow-sm">
            <div className="border-b border-[var(--color-border-subtle)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{stage.title}</p>
                <p className="text-xs text-[var(--color-text-muted)]">Runtime shell</p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-2 border-dashed border-indigo-200 bg-white/80 text-4xl">
                    🐱
                </div>
                <p className="mt-6 max-w-sm text-sm text-[var(--color-text-secondary)]">{stage.message}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-indigo-600">{stage.status}</p>
            </div>
        </div>
    );
}
