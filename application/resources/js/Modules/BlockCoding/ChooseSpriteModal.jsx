import AssetLibraryModal from './AssetLibraryModal.jsx';
import { SPRITE_CATEGORIES, SPRITE_LIBRARY, librarySpriteUrl } from './spriteLibrary.js';

export default function ChooseSpriteModal({ open, onClose, onSelect }) {
    return (
        <AssetLibraryModal
            categories={SPRITE_CATEGORIES}
            emptyMessage="No sprites match your search."
            imageUrl={librarySpriteUrl}
            items={SPRITE_LIBRARY}
            onClose={onClose}
            onSelect={onSelect}
            open={open}
            title="Choose a Sprite"
        />
    );
}
