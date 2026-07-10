import { useRef, useState } from 'react';
import ChooseCostumeModal from './ChooseCostumeModal.jsx';
import {
    deleteLessonCostume,
    normalizeCostumeEntry,
    resolveCostumeImageUrl,
    uploadLessonCostume,
} from './costumeAssets.js';
import { createLibraryCostumeEntry } from './spriteLibrary.js';

const PRESET_EMOJIS = ['🐱', '🐶', '🦊', '🐻', '🐸', '🤖', '⭐', '🚀'];

function formatBytes(bytes) {
    if (!bytes) {
        return null;
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    return `${(bytes / 1024).toFixed(1)} KB`;
}

function CostumeThumb({ costume, lessonSlug }) {
    const entry = normalizeCostumeEntry(costume);
    const imageUrl = resolveCostumeImageUrl(costume, lessonSlug);

    if (imageUrl) {
        return (
            <img
                alt={entry.name}
                className="h-10 w-10 rounded-md border border-[#e0e0e0] object-contain bg-[#f5f5f5]"
                src={imageUrl}
            />
        );
    }

    return (
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f5f5f5] text-xl">
            {entry.emoji}
        </div>
    );
}

function costumeTypeLabel(entry) {
    switch (entry.type) {
        case 'asset':
            return 'Uploaded image';
        case 'library':
            return 'ACE library';
        default:
            return 'Emoji costume';
    }
}

export default function ScratchCostumesPane({
    lessonSlug,
    activeSprite,
    onAddCostume,
    onSelectCostume,
    onDeleteCostume,
    onSaveRequest,
}) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');
    const [libraryOpen, setLibraryOpen] = useState(false);

    if (!activeSprite) {
        return (
            <div className="flex min-h-[320px] items-center justify-center bg-[#fafafa] p-8 text-sm text-[#999]">
                Select a sprite to manage costumes.
            </div>
        );
    }

    const costumes = Array.isArray(activeSprite.costumes) ? activeSprite.costumes : [activeSprite.emoji ?? '🐱'];
    const costumeIndex = activeSprite.costumeIndex ?? 0;

    const handleUpload = async (event) => {
        const file = event.target.files?.[0];

        event.target.value = '';

        if (!file) {
            return;
        }

        setStatus('uploading');
        setError('');

        try {
            const uploaded = await uploadLessonCostume(lessonSlug, file);
            onAddCostume?.(activeSprite.id, {
                type: 'asset',
                asset_uuid: uploaded.uuid,
                name: uploaded.name,
                emoji: '🖼️',
                size_bytes: uploaded.size_bytes,
            });
            onSaveRequest?.();
            setStatus('idle');
        } catch {
            setStatus('error');
            setError('Upload failed. Use a JPG, PNG, GIF, or WebP under 1 MB.');
        }
    };

    const handleAddPreset = (emoji) => {
        onAddCostume?.(activeSprite.id, {
            type: 'emoji',
            emoji,
            name: emoji,
        });
        onSaveRequest?.();
    };

    const handleChooseLibrary = (libraryId) => {
        const entry = createLibraryCostumeEntry(libraryId);

        if (!entry) {
            return;
        }

        onAddCostume?.(activeSprite.id, entry);
        onSaveRequest?.();
        setLibraryOpen(false);
    };

    const handleDelete = async (index) => {
        const costume = costumes[index];
        const entry = normalizeCostumeEntry(costume);

        if (costumes.length <= 1) {
            setError('Keep at least one costume on the sprite.');
            return;
        }

        setStatus('deleting');
        setError('');

        try {
            if (entry.type === 'asset') {
                await deleteLessonCostume(lessonSlug, entry.asset_uuid);
            }

            onDeleteCostume?.(activeSprite.id, index);
            onSaveRequest?.();
            setStatus('idle');
        } catch {
            setStatus('error');
            setError('Could not delete this costume.');
        }
    };

    return (
        <div className="flex h-full min-h-[320px] flex-col bg-[#fafafa] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-[#575e75]">Costumes · {activeSprite.name}</p>
                    <p className="text-xs text-[#999]">
                        Choose from the ACE library, add emoji presets, or upload an image (max 1 MB).
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        className="rounded-md border border-[#855cd6] bg-white px-3 py-1.5 text-xs font-semibold text-[#855cd6] hover:bg-[#f6f0ff] disabled:opacity-60"
                        disabled={status === 'uploading' || status === 'deleting'}
                        onClick={() => setLibraryOpen(true)}
                        type="button"
                    >
                        Choose costume
                    </button>
                    <button
                        className="rounded-md bg-[#855cd6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#714bb8] disabled:opacity-60"
                        disabled={status === 'uploading' || status === 'deleting'}
                        onClick={() => inputRef.current?.click()}
                        type="button"
                    >
                        {status === 'uploading' ? 'Uploading…' : 'Upload'}
                    </button>
                </div>
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
                    {PRESET_EMOJIS.map((emoji) => (
                        <button
                            aria-label={`Add ${emoji} costume`}
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#d9d9d9] bg-white text-xl hover:border-[#855cd6]"
                            key={emoji}
                            onClick={() => handleAddPreset(emoji)}
                            type="button"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>

            <ul className="mt-4 space-y-2">
                {costumes.map((costume, index) => {
                    const entry = normalizeCostumeEntry(costume);
                    const isActive = index === costumeIndex;

                    return (
                        <li
                            className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${
                                isActive
                                    ? 'border-[#855cd6] bg-white ring-2 ring-[#855cd6]/20'
                                    : 'border-[#d9d9d9] bg-white'
                            }`}
                            key={`${entry.type}-${entry.library_id ?? entry.asset_uuid ?? entry.emoji}-${index}`}
                        >
                            <button
                                className="flex min-w-0 flex-1 items-center gap-3 text-left"
                                onClick={() => onSelectCostume?.(activeSprite.id, index)}
                                type="button"
                            >
                                <CostumeThumb costume={costume} lessonSlug={lessonSlug} />
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-[#575e75]">
                                        {entry.name}
                                        {isActive ? ' · active' : ''}
                                    </p>
                                    <p className="text-xs text-[#999]">
                                        {entry.type === 'asset'
                                            ? formatBytes(costume.size_bytes) ?? costumeTypeLabel(entry)
                                            : costumeTypeLabel(entry)}
                                    </p>
                                </div>
                            </button>
                            <button
                                aria-label={`Delete costume ${entry.name}`}
                                className="rounded-md border border-rose-200 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                                disabled={status === 'deleting' || costumes.length <= 1}
                                onClick={() => handleDelete(index)}
                                type="button"
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>

            <ChooseCostumeModal
                onClose={() => setLibraryOpen(false)}
                onSelect={handleChooseLibrary}
                open={libraryOpen}
            />
        </div>
    );
}
