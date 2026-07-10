<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\AI\Models\AiUsageRecord;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class BlockScriptExplainTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);
    }

    public function test_learner_can_explain_script_through_ai_gateway(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';

        $response = $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/explain-script", [
            'script' => 'await runtime.moveSteps(10);',
            'context' => 'I am stuck on the move block.',
        ]);

        $response->assertOk()
            ->assertJsonPath('provider', 'fake')
            ->assertJsonPath('prompt_id', 'block_coding.script.explain@v1')
            ->assertJsonStructure(['explanation', 'request_id', 'provider', 'model', 'prompt_id']);

        $this->assertSame(1, AiUsageRecord::query()->count());
        $this->assertDatabaseHas('ai_usage_records', [
            'institution_id' => $institution->id,
            'user_id' => $user->id,
            'task_type' => 'block_script_explain',
        ]);
    }

    public function test_explain_script_requires_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/learner/learn/unit-01-meet-the-coding-studio/explain-script', [
            'script' => 'await runtime.moveSteps(10);',
        ])->assertForbidden();
    }

    public function test_explain_script_validates_script(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $this->withoutExceptionHandling();

        $this->expectException(ValidationException::class);

        $this->actingAs($user)->postJson('/learner/learn/unit-01-meet-the-coding-studio/explain-script', [
            'script' => '',
        ]);
    }

    private function attachLearner(User $user, Institution $institution): void
    {
        $institution->users()->attach($user, [
            'role' => InstitutionRole::Learner->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);
    }
}
