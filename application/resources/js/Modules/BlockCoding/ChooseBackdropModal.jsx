import AssetLibraryModal from './AssetLibraryModal.jsx';
import { BACKDROP_CATEGORIES, BACKDROP_LIBRARY, libraryBackdropUrl } from './backdropLibrary.js';

export default function ChooseBackdropModal({ open, onClose, onSelect }) {
    return (
        <AssetLibraryModal
            aspectClass="aspect-[4/3]"
            categories={BACKDROP_CATEGORIES}
            emptyMessage="No backdrops match your search."
            imageUrl={libraryBackdropUrl}
            items={BACKDROP_LIBRARY}
            onClose={onClose}
            onSelect={onSelect}
            open={open}
            title="Choose a Backdrop"
        />
    );
}
