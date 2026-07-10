<?php

namespace Tests\Feature;

use App\Modules\BlockCoding\Services\BlockWorkspaceShellService;
use Tests\TestCase;

class BlockWorkspaceShellServiceTest extends TestCase
{
    public function test_it_returns_level_one_workspace_shell_config(): void
    {
        $service = app(BlockWorkspaceShellService::class);

        $config = $service->configForLesson([
            'slug' => 'unit-01-meet-the-coding-studio',
            'title' => 'Meet The Coding Studio',
        ]);

        $this->assertSame('level_1_default', $config['preset']);
        $this->assertSame('unit-01-meet-the-coding-studio', $config['lesson_slug']);
        $this->assertSame('active', $config['stage']['status']);
        $this->assertSame('dom', $config['stage']['renderer']);
        $this->assertSame(480, $config['stage']['width']);
        $this->assertSame('sprite-1', $config['stage']['sprites'][0]['id']);
        $this->assertSame(10000, $config['runtime']['max_run_ms']);
    }

    public function test_it_allows_lesson_stage_renderer_override(): void
    {
        $service = app(BlockWorkspaceShellService::class);

        $config = $service->configForLesson([
            'slug' => 'unit-04-looks-and-storytelling',
            'title' => 'Looks And Storytelling',
            'stage_renderer' => 'pixi',
        ]);

        $this->assertSame('pixi', $config['stage']['renderer']);
    }

    public function test_it_rejects_unknown_stage_renderer_values(): void
    {
        $service = app(BlockWorkspaceShellService::class);

        $config = $service->configForLesson([
            'slug' => 'unit-01-meet-the-coding-studio',
            'title' => 'Meet The Coding Studio',
            'stage_renderer' => 'phaser',
        ]);

        $this->assertSame('dom', $config['stage']['renderer']);
    }
}
