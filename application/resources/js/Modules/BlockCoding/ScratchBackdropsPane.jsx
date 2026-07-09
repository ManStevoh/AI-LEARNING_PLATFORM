import { useRef, useState } from 'react';
import {
    backdropImageUrl,
    deleteLessonBackdrop,
    normalizeBackdropEntry,
    uploadLessonBackdrop,
} from './backdropAssets.js';

const PRESET_BACKDROPS = [
    { name: 'blue sky', color: '#dbeafe' },
    { name: 'grass', color: '#bbf7d0' },
    { name: 'sunset', color: '#fed7aa' },
    { name: 'night', color: '#1e293b' },
    { name: 'white', color: '#ffffff' },
    { name: 'pink', color: '#fce7f3' },
];

function formatBytes(bytes) {
    if (!bytes) {
        return null;
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    return `${(bytes / 1024).toFixed(1)} KB`;
}

function BackdropThumb({ backdrop, lessonSlug }) {
    const entry = normalizeBackdropEntry(backdrop);

    if (entry.type === 'asset') {
        return (
            <img
                alt={entry.name}
                className="h-10 w-16 rounded-md border border-[#e0e0e0] object-cover bg-[#f5f5f5]"
                src={backdropImageUrl(lessonSlug, entry.asset_uuid)}
            />
        );
    }

    return (
        <div
            aria-hidden="true"
            className="h-10 w-16 rounded-md border border-[#e0e0e0]"
            style={{ backgroundColor: entry.color }}
        />
    );
}

export default function ScratchBackdropsPane({
    lessonSlug,
    stage,
    onAddBackdrop,
    onSelectBackdrop,
    onDeleteBackdrop,
    onSaveRequest,
}) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const backdrops = Array.isArray(stage?.backdrops) ? stage.backdrops : [];
    const backdropIndex = stage?.backdropIndex ?? 0;

    const handleUpload = async (event) => {
        const file = event.target.files?.[0];

        event.target.value = '';

        if (!file) {
            return;
        }

        setStatus('uploading');
        setError('');

        try {
            const uploaded = await uploadLessonBackdrop(lessonSlug, file);
            onAddBackdrop?.({
                type: 'asset',
                id: `backdrop-asset-${uploaded.uuid}`,
                asset_uuid: uploaded.uuid,
                name: uploaded.name,
                color: '#e5e7eb',
                size_bytes: uploaded.size_bytes,
            });
            onSaveRequest?.();
            setStatus('idle');
        } catch {
            setStatus('error');
            setError('Upload failed. Use a JPG, PNG, GIF, or WebP under 2 MB.');
        }
    };

    const handleAddPreset = (preset) => {
        onAddBackdrop?.({
            type: 'color',
            id: `backdrop-${Date.now()}`,
            name: preset.name,
            color: preset.color,
        });
        onSaveRequest?.();
    };

    const handleDelete = async (index) => {
        const backdrop = backdrops[index];
        const entry = normalizeBackdropEntry(backdrop);

        if (backdrops.length <= 1) {
            setError('Keep at least one backdrop on the stage.');
            return;
        }

        setStatus('deleting');
        setError('');

        try {
            if (entry.type === 'asset') {
                await deleteLessonBackdrop(lessonSlug, entry.asset_uuid);
            }

            onDeleteBackdrop?.(index);
            onSaveRequest?.();
            setStatus('idle');
        } catch {
            setStatus('error');
            setError('Could not delete this backdrop.');
        }
    };

    return (
        <div className="flex h-full min-h-[320px] flex-col bg-[#fafafa] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-[#575e75]">Backdrops · Stage</p>
                    <p className="text-xs text-[#999]">Add color presets or upload an image (max 2 MB).</p>
                </div>
                <button
                    className="rounded-md bg-[#855cd6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#714bb8] disabled:opacity-60"
                    disabled={status === 'uploading' || status === 'deleting'}
                    onClick={() => inputRef.current?.click()}
                    type="button"
                >
                    {status === 'uploading' ? 'Uploading…' : 'Upload backdrop'}
                </button>
                <input
                    accept="image/*,.jpg,.jpeg,.png,.gif,.webp"
                    className="hidden"
                    onChange={handleUpload}
                    ref={inputRef}
                    type="file"
                />
            </div>

            {error ? <p className="mt-3 text-xs text-rose-600">{error}</p> : null}

            <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#999]">Presets</p>
                <div className="flex flex-wrap gap-2">
                    {PRESET_BACKDROPS.map((preset) => (
                        <button
                            aria-label={`Add ${preset.name} backdrop`}
                            className="h-10 w-16 rounded-md border border-[#d9d9d9] hover:border-[#855cd6]"
                            key={preset.name}
                            onClick={() => handleAddPreset(preset)}
                            style={{ backgroundColor: preset.color }}
                            type="button"
                            title={preset.name}
                        />
                    ))}
                </div>
            </div>

            <ul className="mt-4 space-y-2">
                {backdrops.map((backdrop, index) => {
                    const entry = normalizeBackdropEntry(backdrop, index);
                    const isActive = index === backdropIndex;

                    return (
                        <li
                            className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${
                                isActive
                                    ? 'border-[#855cd6] bg-white ring-2 ring-[#855cd6]/20'
                                    : 'border-[#d9d9d9] bg-white'
                            }`}
                            key={`${entry.type}-${entry.asset_uuid ?? entry.id}-${index}`}
                        >
                            <button
                                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                                onClick={() => onSelectBackdrop?.(index)}
                                type="button"
                            >
                                <BackdropThumb backdrop={backdrop} lessonSlug={lessonSlug} />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-[#575e75]">
                                        {entry.name}
                                        {isActive ? ' · active' : ''}
                                    </p>
                                    <p className="text-xs text-[#999]">
                                        {entry.type === 'asset'
                                            ? formatBytes(backdrop.size_bytes) ?? 'Uploaded image'
                                            : entry.color}
                                    </p>
                                </div>
                            </button>
                            <button
                                aria-label={`Delete backdrop ${entry.name}`}
                                className="rounded-md border border-rose-200 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                                disabled={status === 'deleting' || backdrops.length <= 1}
                                onClick={() => handleDelete(index)}
                                type="button"
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
