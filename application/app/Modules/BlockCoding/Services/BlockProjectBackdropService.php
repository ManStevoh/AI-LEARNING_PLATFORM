<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\BlockCoding\Models\BlockProjectBackdrop;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlockProjectBackdropService
{
    private const DISK = 'local';

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function listForLearner(int $userId, int $institutionId, string $lessonSlug): Collection
    {
        return BlockProjectBackdrop::query()
            ->where('institution_id', $institutionId)
            ->where('user_id', $userId)
            ->where('lesson_slug', $lessonSlug)
            ->orderBy('name')
            ->get()
            ->map(fn (BlockProjectBackdrop $backdrop) => $this->toFrontendPayload($backdrop));
    }

    public function storeForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        UploadedFile $file,
        ?string $displayName = null,
    ): BlockProjectBackdrop {
        $uuid = (string) Str::uuid();
        $extension = strtolower($file->getClientOriginalExtension() ?: 'bin');
        $filename = "{$uuid}.{$extension}";
        $path = "block-project-backdrops/{$institutionId}/{$userId}/{$lessonSlug}/{$filename}";

        Storage::disk(self::DISK)->putFileAs(
            dirname($path),
            $file,
            basename($path),
        );

        return BlockProjectBackdrop::query()->create([
            'uuid' => $uuid,
            'institution_id' => $institutionId,
            'user_id' => $userId,
            'lesson_slug' => $lessonSlug,
            'name' => $displayName ?: $this->defaultDisplayName($file),
            'disk' => self::DISK,
            'path' => $path,
            'mime_type' => $file->getMimeType() ?? 'application/octet-stream',
            'size_bytes' => $file->getSize() ?: 0,
            'original_filename' => $file->getClientOriginalName(),
        ]);
    }

    public function storeSvgForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        string $svg,
        ?string $displayName = null,
    ): BlockProjectBackdrop {
        $uuid = (string) Str::uuid();
        $filename = "{$uuid}.svg";
        $path = "block-project-backdrops/{$institutionId}/{$userId}/{$lessonSlug}/{$filename}";

        Storage::disk(self::DISK)->put($path, $svg);

        return BlockProjectBackdrop::query()->create([
            'uuid' => $uuid,
            'institution_id' => $institutionId,
            'user_id' => $userId,
            'lesson_slug' => $lessonSlug,
            'name' => Str::limit(trim($displayName ?? '') !== '' ? trim($displayName) : 'AI Backdrop', 120, ''),
            'disk' => self::DISK,
            'path' => $path,
            'mime_type' => 'image/svg+xml',
            'size_bytes' => strlen($svg),
            'original_filename' => $filename,
        ]);
    }

    public function deleteForLearner(BlockProjectBackdrop $backdrop): void
    {
        Storage::disk($backdrop->disk)->delete($backdrop->path);
        $backdrop->delete();
    }

    public function streamImage(BlockProjectBackdrop $backdrop): StreamedResponse
    {
        abort_unless(Storage::disk($backdrop->disk)->exists($backdrop->path), 404, 'Backdrop file not found.');

        return Storage::disk($backdrop->disk)->response(
            $backdrop->path,
            $backdrop->original_filename,
            [
                'Content-Type' => $backdrop->mime_type,
                'Cache-Control' => 'private, max-age=3600',
            ],
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toFrontendPayload(BlockProjectBackdrop $backdrop): array
    {
        return [
            'uuid' => $backdrop->uuid,
            'name' => $backdrop->name,
            'mime_type' => $backdrop->mime_type,
            'size_bytes' => $backdrop->size_bytes,
            'original_filename' => $backdrop->original_filename,
            'created_at' => $backdrop->created_at?->toIso8601String(),
        ];
    }

    private function defaultDisplayName(UploadedFile $file): string
    {
        $basename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        return Str::limit(trim($basename) !== '' ? trim($basename) : 'Backdrop', 120, '');
    }
}
