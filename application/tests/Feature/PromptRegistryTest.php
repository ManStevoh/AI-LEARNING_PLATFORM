<?php

namespace Tests\Feature;

use App\Modules\AI\Prompts\PromptRegistry;
use App\Modules\AI\Prompts\PromptRenderer;
use Tests\TestCase;

class PromptRegistryTest extends TestCase
{
    public function test_it_resolves_registered_prompt_version(): void
    {
        $prompt = app(PromptRegistry::class)->resolve('learner.mentor.hint', 'v1');

        $this->assertSame('learner.mentor.hint', $prompt->key);
        $this->assertSame('v1', $prompt->version);
        $this->assertSame('learner.mentor.hint@v1', $prompt->identifier());
        $this->assertContains('no_full_solution', $prompt->safetyRules);
    }

    public function test_renderer_replaces_prompt_placeholders(): void
    {
        $prompt = app(PromptRegistry::class)->resolve('learner.mentor.hint', 'v1');

        $rendered = app(PromptRenderer::class)->render($prompt, [
            'user_message' => 'How do loops work?',
            'lesson_slug' => 'unit-06-repeat-loops',
            'lesson_title' => 'Repeat Loops',
            'unit_title' => 'Repeat Loops',
            'skill_names' => 'Repeat loops',
        ]);

        $this->assertStringContainsString('ACE mentor', $rendered->system);
        $this->assertStringContainsString('Repeat Loops', $rendered->user);
        $this->assertStringContainsString('How do loops work?', $rendered->user);
    }

    public function test_it_rejects_unknown_prompt_keys(): void
    {
        $this->expectException(\App\Modules\AI\Exceptions\AiGatewayException::class);

        app(PromptRegistry::class)->resolve('missing.prompt');
    }
}
