import { useRef, useState } from 'react';
import { deleteLessonSound, previewSound, uploadLessonSound } from './soundAssets.js';

function formatBytes(bytes) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function ScratchSoundsPane({ lessonSlug, sounds, onSoundsChange, onSaveRequest }) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleUpload = async (event) => {
        const file = event.target.files?.[0];

        event.target.value = '';

        if (!file) {
            return;
        }

        setStatus('uploading');
        setError('');

        try {
            const uploaded = await uploadLessonSound(lessonSlug, file);
            const nextSounds = [
                ...sounds.filter((sound) => sound.asset_uuid !== uploaded.uuid),
                {
                    id: uploaded.uuid,
                    name: uploaded.name,
                    asset_uuid: uploaded.uuid,
                    size_bytes: uploaded.size_bytes,
                },
            ];

            onSoundsChange?.(nextSounds);
            onSaveRequest?.();
            setStatus('idle');
        } catch {
            setStatus('error');
            setError('Upload failed. Use an MP3, WAV, or OGG file under 2 MB.');
        }
    };

    const handleDelete = async (assetUuid) => {
        setStatus('deleting');
        setError('');

        try {
            await deleteLessonSound(lessonSlug, assetUuid);
            onSoundsChange?.(sounds.filter((sound) => sound.asset_uuid !== assetUuid));
            onSaveRequest?.();
            setStatus('idle');
        } catch {
            setStatus('error');
            setError('Could not delete this sound.');
        }
    };

    return (
        <div className="flex h-full min-h-[320px] flex-col bg-[#fafafa] p-4">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-[#575e75]">Sounds</p>
                    <p className="text-xs text-[#999]">Upload audio for your project (max 2 MB).</p>
                </div>
                <button
                    className="rounded-md bg-[#855cd6] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#714bb8] disabled:opacity-60"
                    disabled={status === 'uploading' || status === 'deleting'}
                    onClick={() => inputRef.current?.click()}
                    type="button"
                >
                    {status === 'uploading' ? 'Uploading…' : 'Upload sound'}
                </button>
                <input
                    accept="audio/*,.mp3,.wav,.ogg,.m4a,.webm"
                    className="hidden"
                    onChange={handleUpload}
                    ref={inputRef}
                    type="file"
                />
            </div>

            {error ? <p className="mt-3 text-xs text-rose-600">{error}</p> : null}

            {sounds.length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-[#d9d9d9] bg-white p-6 text-center text-sm text-[#999]">
                    No uploaded sounds yet. Upload a clip to use it in play sound blocks.
                </div>
            ) : (
                <ul className="mt-4 space-y-2">
                    {sounds.map((sound) => (
                        <li
                            className="flex items-center justify-between gap-3 rounded-xl border border-[#d9d9d9] bg-white px-3 py-2"
                            key={sound.asset_uuid}
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-[#575e75]">{sound.name}</p>
                                {sound.size_bytes ? (
                                    <p className="text-xs text-[#999]">{formatBytes(sound.size_bytes)}</p>
                                ) : null}
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                                <button
                                    aria-label={`Preview ${sound.name}`}
                                    className="rounded-md border border-[#d9d9d9] px-2 py-1 text-xs font-medium text-[#575e75] hover:bg-[#f5f5f5]"
                                    onClick={() => previewSound(lessonSlug, sound.asset_uuid)}
                                    type="button"
                                >
                                    Play
                                </button>
                                <button
                                    aria-label={`Delete ${sound.name}`}
                                    className="rounded-md border border-rose-200 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50"
                                    disabled={status === 'deleting'}
                                    onClick={() => handleDelete(sound.asset_uuid)}
                                    type="button"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
