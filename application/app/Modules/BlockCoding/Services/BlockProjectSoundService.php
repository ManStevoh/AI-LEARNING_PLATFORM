<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\BlockCoding\Models\BlockProjectSound;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlockProjectSoundService
{
    private const DISK = 'local';

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function listForLearner(int $userId, int $institutionId, string $lessonSlug): Collection
    {
        return BlockProjectSound::query()
            ->where('institution_id', $institutionId)
            ->where('user_id', $userId)
            ->where('lesson_slug', $lessonSlug)
            ->orderBy('name')
            ->get()
            ->map(fn (BlockProjectSound $sound) => $this->toFrontendPayload($sound));
    }

    public function storeForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        UploadedFile $file,
        ?string $displayName = null,
    ): BlockProjectSound {
        $uuid = (string) Str::uuid();
        $extension = strtolower($file->getClientOriginalExtension() ?: 'bin');
        $filename = "{$uuid}.{$extension}";
        $path = "block-project-sounds/{$institutionId}/{$userId}/{$lessonSlug}/{$filename}";

        Storage::disk(self::DISK)->putFileAs(
            dirname($path),
            $file,
            basename($path),
        );

        return BlockProjectSound::query()->create([
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

    public function deleteForLearner(BlockProjectSound $sound): void
    {
        Storage::disk($sound->disk)->delete($sound->path);
        $sound->delete();
    }

    public function streamAudio(BlockProjectSound $sound): StreamedResponse
    {
        abort_unless(Storage::disk($sound->disk)->exists($sound->path), 404, 'Sound file not found.');

        return Storage::disk($sound->disk)->response(
            $sound->path,
            $sound->original_filename,
            [
                'Content-Type' => $sound->mime_type,
                'Cache-Control' => 'private, max-age=3600',
            ],
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function toFrontendPayload(BlockProjectSound $sound): array
    {
        return [
            'uuid' => $sound->uuid,
            'name' => $sound->name,
            'mime_type' => $sound->mime_type,
            'size_bytes' => $sound->size_bytes,
            'original_filename' => $sound->original_filename,
            'created_at' => $sound->created_at?->toIso8601String(),
        ];
    }

    private function defaultDisplayName(UploadedFile $file): string
    {
        $basename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);

        return Str::limit(trim($basename) !== '' ? trim($basename) : 'Sound', 120, '');
    }
}
