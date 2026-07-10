import { useMemo, useState } from 'react';

/**
 * Scratch-style full-screen asset picker shared by backdrops, sprites, and costumes.
 */
export default function AssetLibraryModal({
    open,
    title,
    categories = [],
    items = [],
    imageUrl,
    onClose,
    onSelect,
    emptyMessage = 'No items match your search.',
    aspectClass = 'aspect-square',
}) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');

    const filtered = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return items.filter((item) => {
            const matchesCategory =
                category === 'all' || (item.categories ?? []).includes(category);
            const haystack = [item.name, item.id, ...(item.tags ?? []), ...(item.categories ?? [])]
                .join(' ')
                .toLowerCase();

            return matchesCategory && (normalizedQuery === '' || haystack.includes(normalizedQuery));
        });
    }, [items, query, category]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
            <div
                aria-labelledby="asset-library-title"
                aria-modal="true"
                className="flex max-h-[min(90vh,760px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                role="dialog"
            >
                <div className="flex items-center justify-between border-b border-[#d9d9d9] bg-[#855cd6] px-4 py-3 text-white">
                    <button
                        className="rounded-md px-2 py-1 text-sm font-medium hover:bg-white/10"
                        onClick={onClose}
                        type="button"
                    >
                        ← Back
                    </button>
                    <h2 className="text-base font-semibold" id="asset-library-title">
                        {title}
                    </h2>
                    <span aria-hidden="true" className="w-12" />
                </div>

                <div className="border-b border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <label className="relative w-full lg:max-w-xs">
                            <span className="sr-only">Search</span>
                            <input
                                className="w-full rounded-full border border-[#d9d9d9] py-2 pl-10 pr-4 text-sm outline-none ring-[#855cd6] focus:ring-2"
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search"
                                type="search"
                                value={query}
                            />
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
                            >
                                🔍
                            </span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((item) => {
                                const active = category === item.id;

                                return (
                                    <button
                                        className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                            active
                                                ? 'bg-[#ffab19] text-white'
                                                : 'bg-[#855cd6] text-white hover:bg-[#714bb8]'
                                        }`}
                                        key={item.id}
                                        onClick={() => setCategory(item.id)}
                                        type="button"
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#e8eaed] p-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {filtered.map((item) => (
                            <button
                                className="overflow-hidden rounded-xl border border-[#d9d9d9] bg-white text-left shadow-sm transition hover:border-[#855cd6] hover:ring-2 hover:ring-[#855cd6]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#855cd6]"
                                key={item.id}
                                onClick={() => onSelect?.(item.id)}
                                type="button"
                            >
                                <div className={`${aspectClass} flex items-center justify-center bg-[#f8fafc] p-2`}>
                                    <img
                                        alt={item.name}
                                        className="max-h-full max-w-full object-contain"
                                        loading="lazy"
                                        src={imageUrl(item.id)}
                                    />
                                </div>
                                <p className="truncate px-2 py-2 text-center text-xs font-medium text-[#575e75]">
                                    {item.name}
                                </p>
                            </button>
                        ))}
                    </div>
                    {filtered.length === 0 ? (
                        <p className="py-12 text-center text-sm text-[#777]">{emptyMessage}</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
