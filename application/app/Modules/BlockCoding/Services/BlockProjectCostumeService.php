<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\BlockCoding\Models\BlockProjectCostume;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlockProjectCostumeService
{
    private const DISK = 'local';

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function listForLearner(int $userId, int $institutionId, string $lessonSlug): Collection
    {
        return BlockProjectCostume::query()
            ->where('institution_id', $institutionId)
            ->where('user_id', $userId)
            ->where('lesson_slug', $lessonSlug)
            ->orderBy('name')
            ->get()
            ->map(fn (BlockProjectCostume $costume) => $this->toFrontendPayload($costume));
    }

    public function storeForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        UploadedFile $file,
        ?string $displayName = null,
    ): BlockProjectCostume {
        $uuid = (string) Str::uuid();
        $extension = strtolower($file->getClientOriginalExtension() ?: 'bin');
        $filename = "{$uuid}.{$extension}";
        $path = "block-project-costumes/{$institutionId}/{$userId}/{$lessonSlug}/{$filename}";

        Storage::disk(self::DISK)->putFileAs(
            dirname($path),
            $file,
            basename($path),
        );

        return BlockProjectCostume::query()->create([
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

    public function deleteForLearner(BlockProjectCostume $costume): void
    {
        Storage::disk($costume->disk)->delete($costume->path);
        $costume->delete();
    }

    public function streamImage(BlockProjectCostume $costume): StreamedResponse
    {
        abort_unless(Storage::disk($costume->disk)->exists($costume->path), 404, 'Costume file not found.');

        return Storage::disk($costume->disk)->response(
            $costume->path,
            $costume->original_filename,
            [
                'Content-Type' => $costume->mime_type,
                'Cache-Control' => 'private, max-age=3600',
            ],
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toFrontendPayload(BlockProjectCostume $costume): array
    {
        return [
            'uuid' => $costume->uuid,
            'name' => $costume->name,
            'mime_type' => $costume->mime_type,
            'size_bytes' => $costume->size_bytes,
            'original_filename' => $costume->original_filename,
            'created_at' => $costume->created_at?->toIso8601String(),
        ];
    }

    private function defaultDisplayName(UploadedFile $file): string
    {
        $basename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        return Str::limit(trim($basename) !== '' ? trim($basename) : 'Costume', 120, '');
    }
}
