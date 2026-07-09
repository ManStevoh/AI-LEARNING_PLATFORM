<?php

namespace Tests\Feature;

use App\Modules\AI\Services\MentorContextBuilder;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MentorContextBuilderTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_builds_lesson_context_from_published_curriculum(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $context = app(MentorContextBuilder::class)->build(
            'How do I use repeat blocks?',
            'unit-06-repeat-loops',
        );

        $this->assertSame('How do I use repeat blocks?', $context['user_message']);
        $this->assertSame('unit-06-repeat-loops', $context['lesson_slug']);
        $this->assertSame('Repeat Loops', $context['lesson_title']);
        $this->assertStringContainsString('Repeat loops', $context['skill_names']);
    }

    public function test_it_falls_back_when_lesson_slug_is_missing(): void
    {
        $context = app(MentorContextBuilder::class)->build('Help me debug.');

        $this->assertSame('', $context['lesson_slug']);
        $this->assertSame('your current lesson', $context['lesson_title']);
        $this->assertSame('general block coding', $context['skill_names']);
    }
}
