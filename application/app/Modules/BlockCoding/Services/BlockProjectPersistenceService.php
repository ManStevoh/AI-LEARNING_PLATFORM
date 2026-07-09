<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\BlockCoding\Models\BlockProject;

class BlockProjectPersistenceService
{
    public function findForLearner(int $userId, int $institutionId, string $lessonSlug): ?BlockProject
    {
        return BlockProject::query()
            ->where('institution_id', $institutionId)
            ->where('user_id', $userId)
            ->where('lesson_slug', $lessonSlug)
            ->first();
    }

    /**
     * @param  array<string, mixed>  $workspace
     */
    public function saveForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        array $workspace,
        ?string $generatedCode = null,
    ): BlockProject {
        return BlockProject::query()->updateOrCreate(
            [
                'institution_id' => $institutionId,
                'user_id' => $userId,
                'lesson_slug' => $lessonSlug,
            ],
            [
                'schema_version' => '1.0',
                'workspace' => $workspace,
                'generated_code' => $generatedCode,
                'last_saved_at' => now(),
            ],
        );
    }

    /**
     * @return array<string, mixed>|null
     */
    public function toFrontendPayload(?BlockProject $project): ?array
    {
        if ($project === null) {
            return null;
        }

        return [
            'schema_version' => $project->schema_version,
            'workspace' => $project->workspace,
            'generated_code' => $project->generated_code,
            'last_saved_at' => $project->last_saved_at?->toIso8601String(),
        ];
    }
}
