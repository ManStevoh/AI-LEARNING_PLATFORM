import { useState } from 'react';
import ChooseSpriteModal from './ChooseSpriteModal.jsx';
import SpriteThumb from './SpriteThumb.jsx';

export default function ScratchSpritePane({
    snapshot,
    activeSpriteId,
    onSelectSprite,
    onAddSpriteFromLibrary,
    lessonSlug,
}) {
    const [libraryOpen, setLibraryOpen] = useState(false);
    const activeSprite = snapshot.sprites.find((sprite) => sprite.id === activeSpriteId) ?? snapshot.sprites[0];

    const handleChooseSprite = (libraryId) => {
        onAddSpriteFromLibrary?.(libraryId);
        setLibraryOpen(false);
    };

    return (
        <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_88px] gap-2 border-t border-[#d9d9d9] bg-[#fafafa] p-2">
            <div className="rounded-md border border-[#d9d9d9] bg-white p-2">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#575e75]">{activeSprite.name}</p>
                    <button
                        className="rounded-full border border-[#855cd6] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#855cd6] hover:bg-[#f6f0ff]"
                        onClick={() => setLibraryOpen(true)}
                        type="button"
                    >
                        Choose sprite
                    </button>
                </div>
                <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-[#575e75]">
                    <div>
                        <dt className="text-[#999]">x</dt>
                        <dd className="font-medium">{Math.round(activeSprite.x)}</dd>
                    </div>
                    <div>
                        <dt className="text-[#999]">y</dt>
                        <dd className="font-medium">{Math.round(activeSprite.y)}</dd>
                    </div>
                    <div>
                        <dt className="text-[#999]">Size</dt>
                        <dd className="font-medium">{Math.round(activeSprite.size ?? 100)}</dd>
                    </div>
                    <div>
                        <dt className="text-[#999]">Direction</dt>
                        <dd className="font-medium">{Math.round(activeSprite.direction)}</dd>
                    </div>
                </dl>
            </div>
            <div className="flex flex-col gap-1">
                {snapshot.sprites.map((sprite) => {
                    const isActive = sprite.id === activeSpriteId;

                    return (
                        <button
                            key={sprite.id}
                            aria-label={`Select ${sprite.name}`}
                            aria-pressed={isActive}
                            className={`flex flex-col items-center justify-center rounded-md border p-2 transition ${
                                isActive
                                    ? 'border-[#855cd6] bg-white ring-2 ring-[#855cd6]/30'
                                    : 'border-[#d9d9d9] bg-white hover:border-[#bbb]'
                            }`}
                            onClick={() => onSelectSprite?.(sprite.id)}
                            type="button"
                        >
                            <SpriteThumb lessonSlug={lessonSlug} sprite={sprite} />
                            <p className="mt-1 max-w-[72px] truncate text-[10px] font-medium text-[#575e75]">{sprite.name}</p>
                        </button>
                    );
                })}
            </div>

            <ChooseSpriteModal onClose={() => setLibraryOpen(false)} onSelect={handleChooseSprite} open={libraryOpen} />
        </div>
    );
}
