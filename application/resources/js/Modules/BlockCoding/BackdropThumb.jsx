import { resolveBackdropImageUrl, normalizeBackdropEntry } from './backdropAssets.js';

export default function BackdropThumb({ backdrop, lessonSlug, className = 'h-10 w-16' }) {
    const entry = normalizeBackdropEntry(backdrop);
    const imageUrl = resolveBackdropImageUrl(entry, lessonSlug);

    if (imageUrl) {
        return (
            <img
                alt={entry.name}
                className={`${className} rounded-md border border-[#e0e0e0] object-cover bg-[#f5f5f5]`}
                src={imageUrl}
            />
        );
    }

    return (
        <div
            aria-hidden="true"
            className={`${className} rounded-md border border-[#e0e0e0]`}
            style={{ backgroundColor: entry.color }}
        />
    );
}
