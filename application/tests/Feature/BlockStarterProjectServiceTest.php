<?php

namespace Tests\Feature;

use App\Modules\BlockCoding\Services\BlockStarterProjectService;
use Tests\TestCase;

class BlockStarterProjectServiceTest extends TestCase
{
    public function test_it_returns_starter_workspace_for_each_level_one_lesson(): void
    {
        $service = app(BlockStarterProjectService::class);

        foreach ($service->supportedLessonSlugs() as $lessonSlug) {
            $starter = $service->forLesson($lessonSlug);

            $this->assertSame('1.0', $starter['schema_version']);
            $this->assertSame($lessonSlug, $starter['lesson_slug']);
            $this->assertArrayHasKey('workspace', $starter);
            $this->assertSame('ace_event_green_flag', $starter['workspace']['blocks']['blocks'][0]['type']);
        }
    }

    public function test_unit_two_starter_includes_motion_block(): void
    {
        $starter = app(BlockStarterProjectService::class)->forLesson('unit-02-events-and-actions');

        $stackBlock = $starter['workspace']['blocks']['blocks'][0]['inputs']['STACK']['block'];

        $this->assertSame('ace_motion_move_steps', $stackBlock['type']);
    }

    public function test_unknown_lesson_gets_default_starter(): void
    {
        $starter = app(BlockStarterProjectService::class)->forLesson('unknown-lesson');

        $this->assertSame('Level 1 starter project', $starter['title']);
        $this->assertSame('ace_looks_say', $starter['workspace']['blocks']['blocks'][0]['inputs']['STACK']['block']['type']);
    }
}
