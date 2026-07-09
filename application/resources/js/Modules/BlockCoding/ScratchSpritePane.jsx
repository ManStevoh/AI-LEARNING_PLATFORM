import { costumeImageUrl } from './costumeAssets.js';

export default function ScratchSpritePane({ snapshot, activeSpriteId, onSelectSprite, lessonSlug }) {
    const activeSprite = snapshot.sprites.find((sprite) => sprite.id === activeSpriteId) ?? snapshot.sprites[0];

    return (
        <div className="grid shrink-0 grid-cols-[minmax(0,1fr)_88px] gap-2 border-t border-[#d9d9d9] bg-[#fafafa] p-2">
            <div className="rounded-md border border-[#d9d9d9] bg-white p-2">
                <p className="text-xs font-semibold text-[#575e75]">{activeSprite.name}</p>
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
                            {sprite.costumeAssetUuid && lessonSlug ? (
                                <img
                                    alt={sprite.name}
                                    className="h-10 w-10 rounded-md border border-[#e0e0e0] bg-[#f5f5f5] object-contain"
                                    src={costumeImageUrl(lessonSlug, sprite.costumeAssetUuid)}
                                />
                            ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f5f5f5] text-xl">
                                    {sprite.emoji}
                                </div>
                            )}
                            <p className="mt-1 max-w-[72px] truncate text-[10px] font-medium text-[#575e75]">{sprite.name}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
