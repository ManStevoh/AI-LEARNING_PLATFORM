<?php

namespace App\Modules\BlockCoding\Services;

class BlockWorkspaceShellService
{
    /**
     * @param  array<string, mixed>  $lesson
     * @return array<string, mixed>
     */
    public function configForLesson(array $lesson): array
    {
        return [
            'preset' => 'level_1_default',
            'lesson_slug' => $lesson['slug'],
            'stage' => [
                'title' => 'Preview stage',
                'status' => 'placeholder',
                'message' => 'Sprite stage and green-flag runtime will mount here in the next slice.',
            ],
        ];
    }
}
