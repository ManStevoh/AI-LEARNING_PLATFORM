<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\BlockCoding\Models\BlockProject;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use Illuminate\Support\Collection;

class BlockProjectReviewService
{
    public function __construct(
        private CurriculumCatalogService $catalog,
    ) {}

    /**
     * @return Collection<int, array<string, mixed>>
     */
    public function listForInstitution(int $institutionId): Collection
    {
        return BlockProject::query()
            ->where('institution_id', $institutionId)
            ->with('user:id,name,email')
            ->orderByDesc('last_saved_at')
            ->orderByDesc('updated_at')
            ->get()
            ->map(fn (BlockProject $project) => $this->toListItem($project));
    }

    public function findForInstitution(int $institutionId, int $projectId): ?BlockProject
    {
        return BlockProject::query()
            ->where('institution_id', $institutionId)
            ->whereKey($projectId)
            ->with('user:id,name,email')
            ->first();
    }

    /**
     * @return array<string, mixed>
     */
    public function toListItem(BlockProject $project): array
    {
        return [
            'id' => $project->id,
            'learner' => [
                'name' => $project->user?->name,
                'email' => $project->user?->email,
            ],
            'lesson_slug' => $project->lesson_slug,
            'lesson_title' => $this->lessonTitle($project->lesson_slug),
            'last_saved_at' => $project->last_saved_at?->toIso8601String(),
            'has_generated_code' => filled($project->generated_code),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toReviewDetail(BlockProject $project): array
    {
        return [
            ...$this->toListItem($project),
            'schema_version' => $project->schema_version,
            'generated_code' => $project->generated_code,
            'workspace_block_count' => count($project->workspace['blocks']['blocks'] ?? []),
        ];
    }

    private function lessonTitle(string $lessonSlug): string
    {
        $lesson = $this->catalog->getPublishedLessonDetail($lessonSlug);

        return $lesson['title'] ?? $lessonSlug;
    }
}
