import { useMemo, useState } from 'react';
import { BACKDROP_CATEGORIES, filterLibraryBackdrops, libraryBackdropUrl } from './backdropLibrary.js';

export default function ChooseBackdropModal({ open, onClose, onSelect }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');

    const items = useMemo(() => filterLibraryBackdrops(query, category), [query, category]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
            <div
                className="flex max-h-[min(90vh,760px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
                role="dialog"
                aria-labelledby="choose-backdrop-title"
                aria-modal="true"
            >
                <div className="flex items-center justify-between border-b border-[#d9d9d9] bg-[#855cd6] px-4 py-3 text-white">
                    <button
                        className="rounded-md px-2 py-1 text-sm font-medium hover:bg-white/10"
                        onClick={onClose}
                        type="button"
                    >
                        Back
                    </button>
                    <h2 className="text-base font-semibold" id="choose-backdrop-title">
                        Choose a Backdrop
                    </h2>
                    <span className="w-12" aria-hidden="true" />
                </div>

                <div className="border-b border-[#e5e5e5] bg-[#fafafa] px-4 py-3">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <input
                            className="w-full rounded-full border border-[#d9d9d9] px-4 py-2 text-sm outline-none ring-[#855cd6] focus:ring-2 lg:max-w-xs"
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search"
                            type="search"
                            value={query}
                        />
                        <div className="flex flex-wrap gap-2">
                            {BACKDROP_CATEGORIES.map((item) => {
                                const active = category === item.id;

                                return (
                                    <button
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
                        {items.map((item) => (
                            <button
                                className="overflow-hidden rounded-xl border border-[#d9d9d9] bg-white text-left shadow-sm transition hover:border-[#855cd6] hover:ring-2 hover:ring-[#855cd6]/20"
                                key={item.id}
                                onClick={() => onSelect?.(item.id)}
                                type="button"
                            >
                                <img
                                    alt={item.name}
                                    className="aspect-[4/3] w-full object-cover"
                                    loading="lazy"
                                    src={libraryBackdropUrl(item.id)}
                                />
                                <p className="truncate px-2 py-2 text-center text-xs font-medium text-[#575e75]">
                                    {item.name}
                                </p>
                            </button>
                        ))}
                    </div>
                    {items.length === 0 ? (
                        <p className="py-12 text-center text-sm text-[#777]">No backdrops match your search.</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
