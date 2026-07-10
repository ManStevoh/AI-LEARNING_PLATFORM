import { AI_BACKDROP_THEMES } from './aiBackdrop.js';

export default function GenerateAiBackdropModal({
    open,
    onClose,
    onSelect,
    generatingTheme = null,
}) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
            <div
                aria-labelledby="ai-backdrop-title"
                aria-modal="true"
                className="flex max-h-[min(90vh,640px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                role="dialog"
            >
                <div className="flex items-center justify-between border-b border-[#d9d9d9] bg-[#855cd6] px-4 py-3 text-white">
                    <button
                        className="rounded-md px-2 py-1 text-sm font-medium hover:bg-white/10"
                        disabled={generatingTheme !== null}
                        onClick={onClose}
                        type="button"
                    >
                        ← Back
                    </button>
                    <h2 className="text-base font-semibold" id="ai-backdrop-title">
                        Generate with AI
                    </h2>
                    <span aria-hidden="true" className="w-12" />
                </div>

                <div className="border-b border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
                    <p className="text-sm text-[#575e75]">
                        Pick a child-safe theme. ACE creates an original SVG backdrop through the AI Gateway.
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#e8eaed] p-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {AI_BACKDROP_THEMES.map((theme) => {
                            const isGenerating = generatingTheme === theme.id;

                            return (
                                <button
                                    className="overflow-hidden rounded-xl border border-[#d9d9d9] bg-white text-left shadow-sm transition hover:border-[#855cd6] hover:ring-2 hover:ring-[#855cd6]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855cd6] disabled:cursor-wait disabled:opacity-70"
                                    disabled={generatingTheme !== null}
                                    key={theme.id}
                                    onClick={() => onSelect?.(theme.id)}
                                    type="button"
                                >
                                    <div
                                        className="aspect-[4/3] w-full"
                                        style={{
                                            background: `linear-gradient(180deg, ${theme.color} 0%, ${theme.color}88 55%, #ffffff 100%)`,
                                        }}
                                    />
                                    <p className="truncate px-2 py-2 text-center text-xs font-medium text-[#575e75]">
                                        {isGenerating ? 'Generating…' : theme.label}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
