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

class LearnerMentorAskTest extends TestCase
{
    use RefreshDatabase;

    public function test_learner_can_ask_mentor_through_ai_gateway(): void
    {
        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $response = $this->actingAs($user)->postJson('/learner/mentor/ask', [
            'message' => 'How do I use a repeat loop?',
            'lesson_slug' => 'unit-06-repeat-loops',
        ]);

        $response->assertOk()
            ->assertJsonPath('provider', 'fake')
            ->assertJsonPath('prompt_id', 'learner.mentor.hint@v1')
            ->assertJsonStructure(['reply', 'request_id', 'provider', 'model', 'prompt_id']);

        $this->assertSame(1, AiUsageRecord::query()->count());
        $this->assertDatabaseHas('ai_usage_records', [
            'institution_id' => $institution->id,
            'user_id' => $user->id,
            'task_type' => 'learner_mentor_hint',
        ]);
    }

    public function test_mentor_reply_includes_lesson_context_when_lesson_slug_is_provided(): void
    {
        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);

        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $response = $this->actingAs($user)->postJson('/learner/mentor/ask', [
            'message' => 'How do I use a repeat loop?',
            'lesson_slug' => 'unit-06-repeat-loops',
        ]);

        $response->assertOk();
        $this->assertStringContainsString('Repeat Loops', (string) $response->json('reply'));
    }

    public function test_mentor_ask_requires_institution_context(): void
    {
        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);

        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/learner/mentor/ask', [
            'message' => 'Help me with events.',
        ])->assertForbidden();
    }

    public function test_mentor_ask_validates_message(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $this->withoutExceptionHandling();

        $this->expectException(ValidationException::class);

        $this->actingAs($user)->postJson('/learner/mentor/ask', []);
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
