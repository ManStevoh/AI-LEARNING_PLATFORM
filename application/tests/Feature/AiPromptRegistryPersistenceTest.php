<?php

namespace Tests\Feature;

use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\AI\Models\AiPrompt;
use App\Modules\AI\Models\AiPromptVersion;
use App\Modules\AI\Prompts\PromptRegistry;
use App\Modules\AI\Services\AiPromptRegistryService;
use Database\Seeders\AiPromptFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AiPromptRegistryPersistenceTest extends TestCase
{
    use RefreshDatabase;

    public function test_foundation_seeder_publishes_config_prompts(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $this->assertSame(1, AiPrompt::query()->count());
        $this->assertSame(1, AiPromptVersion::query()->whereNotNull('published_at')->count());

        $prompt = app(PromptRegistry::class)->resolve('learner.mentor.hint', 'v1');

        $this->assertSame('learner.mentor.hint', $prompt->key);
        $this->assertSame('v1', $prompt->version);
        $this->assertContains('no_full_solution', $prompt->safetyRules);
    }

    public function test_registry_prefers_database_over_config(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        config([
            'ai.prompts.learner.mentor.hint.v1.system_template' => 'Config fallback template should not be used.',
        ]);

        $prompt = app(PromptRegistry::class)->resolve('learner.mentor.hint', 'v1');

        $this->assertStringContainsString('ACE mentor', $prompt->systemTemplate);
        $this->assertStringNotContainsString('Config fallback template', $prompt->systemTemplate);
    }

    public function test_publish_version_sets_published_at(): void
    {
        $service = app(AiPromptRegistryService::class);

        $service->upsertDraftVersion('learner.mentor.hint', 'v2', [
            'name' => 'Learner mentor hint v2',
            'purpose' => 'Updated mentor guidance.',
            'system_template' => 'You are ACE mentor v2.',
            'user_template' => '{{user_message}}',
            'safety_rules' => ['child_safe'],
        ]);

        $published = $service->publishVersion('learner.mentor.hint', 'v2');

        $this->assertNotNull($published->published_at);
        $this->assertDatabaseHas('ai_prompt_versions', [
            'id' => $published->id,
            'version' => 'v2',
        ]);
    }

    public function test_it_resolves_latest_published_version_when_version_is_omitted(): void
    {
        $service = app(AiPromptRegistryService::class);

        $service->upsertDraftVersion('learner.mentor.hint', 'v1', [
            'name' => 'Learner mentor hint',
            'purpose' => 'Guide learners.',
            'system_template' => 'Version one.',
            'user_template' => '{{user_message}}',
            'safety_rules' => ['child_safe'],
        ]);
        $service->publishVersion('learner.mentor.hint', 'v1', now()->subMinute());

        $service->upsertDraftVersion('learner.mentor.hint', 'v2', [
            'name' => 'Learner mentor hint v2',
            'purpose' => 'Guide learners.',
            'system_template' => 'Version two.',
            'user_template' => '{{user_message}}',
            'safety_rules' => ['child_safe'],
        ]);
        $service->publishVersion('learner.mentor.hint', 'v2');

        $prompt = app(PromptRegistry::class)->resolve('learner.mentor.hint');

        $this->assertSame('v2', $prompt->version);
        $this->assertSame('Version two.', $prompt->systemTemplate);
    }

    public function test_it_rejects_editing_published_prompt_versions_in_place(): void
    {
        $service = app(AiPromptRegistryService::class);

        $service->upsertDraftVersion('learner.mentor.hint', 'v1', [
            'name' => 'Learner mentor hint',
            'purpose' => 'Guide learners.',
            'system_template' => 'Published template.',
            'user_template' => '{{user_message}}',
            'safety_rules' => ['child_safe'],
        ]);
        $service->publishVersion('learner.mentor.hint', 'v1');

        $this->expectException(AiGatewayException::class);
        $this->expectExceptionMessage('cannot be edited in place');

        $service->upsertDraftVersion('learner.mentor.hint', 'v1', [
            'name' => 'Learner mentor hint',
            'purpose' => 'Guide learners.',
            'system_template' => 'Changed template.',
            'user_template' => '{{user_message}}',
            'safety_rules' => ['child_safe'],
        ]);
    }
}
