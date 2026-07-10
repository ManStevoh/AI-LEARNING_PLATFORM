<?php

namespace App\Modules\BlockCoding\Services;

use App\Models\Institution;

class BlockWorkspaceShellService
{
    public function __construct(
        private InstitutionBlockPackService $blockPackService,
    ) {}

    /**
     * @param  array<string, mixed>  $lesson
     * @return array<string, mixed>
     */
    public function configForLesson(array $lesson, ?Institution $institution = null): array
    {
        return [
            'preset' => 'level_1_default',
            'enabled_block_packs' => $this->blockPackService->enabledPackIds($institution),
            'lesson_slug' => $lesson['slug'],
            'stage' => [
                'title' => 'Stage',
                'status' => 'active',
                'renderer' => $this->resolveStageRenderer($lesson),
                'width' => 480,
                'height' => 360,
                'background' => '#dbeafe',
                'sprites' => [
                    [
                        'id' => 'sprite-1',
                        'name' => 'Sprite',
                        'x' => 0,
                        'y' => 0,
                        'direction' => 90,
                        'emoji' => '🐱',
                        'visible' => true,
                    ],
                ],
            ],
            'runtime' => [
                'max_run_ms' => 10000,
                'max_loop_iterations' => 10000,
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $lesson
     */
    private function resolveStageRenderer(array $lesson): string
    {
        $renderer = $lesson['stage_renderer'] ?? 'dom';

        return in_array($renderer, ['dom', 'pixi'], true) ? $renderer : 'dom';
    }
}
