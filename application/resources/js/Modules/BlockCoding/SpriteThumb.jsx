import { resolveCostumeImageUrl } from './costumeAssets.js';
import { librarySpriteUrl } from './spriteLibrary.js';

export default function SpriteThumb({ sprite, lessonSlug, className = 'h-10 w-10' }) {
    const costume = sprite?.costumes?.[sprite.costumeIndex ?? 0];
    const imageUrl =
        resolveCostumeImageUrl(costume, lessonSlug) ??
        (sprite?.costumeLibraryId ? librarySpriteUrl(sprite.costumeLibraryId) : null) ??
        (sprite?.costumeAssetUuid && lessonSlug
            ? resolveCostumeImageUrl({ type: 'asset', asset_uuid: sprite.costumeAssetUuid }, lessonSlug)
            : null);

    if (imageUrl) {
        return (
            <img
                alt={sprite?.name ?? 'Sprite'}
                className={`${className} rounded-md border border-[#e0e0e0] bg-[#f5f5f5] object-contain`}
                src={imageUrl}
            />
        );
    }

    return (
        <div
            className={`${className} flex items-center justify-center rounded-md border border-[#e0e0e0] bg-[#f5f5f5] text-xl`}
        >
            {sprite?.emoji ?? '🐱'}
        </div>
    );
}
