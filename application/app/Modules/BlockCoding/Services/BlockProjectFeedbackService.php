<?php

namespace App\Modules\BlockCoding\Services;

use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProject;
use App\Modules\BlockCoding\Models\BlockProjectFeedback;

class BlockProjectFeedbackService
{
    public function saveForProject(
        BlockProject $project,
        User $teacher,
        int $institutionId,
        string $notes,
    ): BlockProjectFeedback {
        return BlockProjectFeedback::query()->updateOrCreate(
            ['block_project_id' => $project->id],
            [
                'institution_id' => $institutionId,
                'teacher_user_id' => $teacher->id,
                'notes' => trim($notes),
            ],
        );
    }

    /**
     * @return array<string, mixed>|null
     */
    public function toFrontendPayload(?BlockProjectFeedback $feedback): ?array
    {
        if ($feedback === null) {
            return null;
        }

        $feedback->loadMissing('teacher:id,name');

        return [
            'notes' => $feedback->notes,
            'teacher_name' => $feedback->teacher?->name,
            'updated_at' => $feedback->updated_at?->toIso8601String(),
        ];
    }
}
