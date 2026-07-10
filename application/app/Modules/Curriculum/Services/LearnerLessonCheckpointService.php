<?php

namespace App\Modules\Curriculum\Services;

use App\Modules\Curriculum\Models\LearnerLessonCheckpoint;

class LearnerLessonCheckpointService
{
    /**
     * @return array<string, mixed>
     */
    public function markComplete(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        string $stepKey,
    ): array {
        $checkpoint = LearnerLessonCheckpoint::query()->updateOrCreate(
            [
                'institution_id' => $institutionId,
                'user_id' => $userId,
                'lesson_slug' => $lessonSlug,
                'step_key' => $stepKey,
            ],
            [
                'completed_at' => now(),
            ],
        );

        return $this->toPayload($checkpoint);
    }

    /**
     * @return list<string>
     */
    public function listForLearner(int $userId, int $institutionId, string $lessonSlug): array
    {
        return LearnerLessonCheckpoint::query()
            ->where('institution_id', $institutionId)
            ->where('user_id', $userId)
            ->where('lesson_slug', $lessonSlug)
            ->orderBy('step_key')
            ->pluck('step_key')
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    private function toPayload(LearnerLessonCheckpoint $checkpoint): array
    {
        return [
            'step_key' => $checkpoint->step_key,
            'lesson_slug' => $checkpoint->lesson_slug,
            'completed_at' => $checkpoint->completed_at?->toIso8601String(),
        ];
    }
}
