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
        <div className="shrink-0 border-t border-[#d9d9d9] bg-[#fafafa] p-2">
            <div className="rounded-md border border-[#d9d9d9] bg-white p-2">
                <div className="flex flex-wrap items-stretch gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <div className="scratch-sprite-strip min-w-0 flex-1">
                            {snapshot.sprites.map((sprite) => {
                                const isActive = sprite.id === activeSpriteId;

                                return (
                                    <button
                                        aria-label={`Select ${sprite.name}`}
                                        aria-pressed={isActive}
                                        className={`scratch-sprite-tile flex flex-col items-center rounded-md border p-1.5 transition ${
                                            isActive
                                                ? 'border-[#855cd6] bg-[#f6f0ff] ring-2 ring-[#855cd6]/25'
                                                : 'border-[#d9d9d9] bg-white hover:border-[#bbb]'
                                        }`}
                                        key={sprite.id}
                                        onClick={() => onSelectSprite?.(sprite.id)}
                                        type="button"
                                    >
                                        <SpriteThumb lessonSlug={lessonSlug} sprite={sprite} />
                                        <p className="mt-1 w-full truncate text-center text-[10px] font-medium text-[#575e75]">
                                            {sprite.name}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            className="shrink-0 rounded-full border border-[#855cd6] bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#855cd6] hover:bg-[#f6f0ff]"
                            onClick={() => setLibraryOpen(true)}
                            type="button"
                        >
                            Choose sprite
                        </button>
                    </div>

                    <div className="min-w-[140px] shrink-0 border-[#e6e6e6] pl-3 lg:border-l">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999]">Sprite</p>
                        <p className="truncate text-xs font-semibold text-[#575e75]">{activeSprite.name}</p>
                        <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-[#575e75]">
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
                </div>
            </div>

            <ChooseSpriteModal onClose={() => setLibraryOpen(false)} onSelect={handleChooseSprite} open={libraryOpen} />
        </div>
    );
}
