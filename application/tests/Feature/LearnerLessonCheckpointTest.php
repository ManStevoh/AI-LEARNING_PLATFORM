<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\Curriculum\Models\LearnerLessonCheckpoint;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LearnerLessonCheckpointTest extends TestCase
{
    use RefreshDatabase;

    public function test_learner_can_mark_checkpoint_with_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/checkpoints", [
            'step_key' => 'intro-blocks',
        ])->assertOk()
            ->assertJsonPath('checkpoint.step_key', 'intro-blocks')
            ->assertJsonPath('checkpoint.lesson_slug', $lessonSlug)
            ->assertJsonStructure(['checkpoint' => ['step_key', 'lesson_slug', 'completed_at']]);

        $this->assertDatabaseHas('learner_lesson_checkpoints', [
            'institution_id' => $institution->id,
            'user_id' => $user->id,
            'lesson_slug' => $lessonSlug,
            'step_key' => 'intro-blocks',
        ]);

        $this->actingAs($user)->getJson("/learner/learn/{$lessonSlug}/checkpoints")
            ->assertOk()
            ->assertJsonPath('step_keys', ['intro-blocks']);
    }

    public function test_mark_checkpoint_requires_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/learner/learn/unit-01-meet-the-coding-studio/checkpoints', [
            'step_key' => 'intro-blocks',
        ])->assertForbidden();
    }

    public function test_checkpoints_are_isolated_by_institution(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $first = Institution::factory()->create(['name' => 'First School']);
        $second = Institution::factory()->create(['name' => 'Second School']);
        $this->attachLearner($user, $first);
        $this->attachLearner($user, $second);

        $lessonSlug = 'unit-01-meet-the-coding-studio';

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $first->id,
        ]);

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/checkpoints", [
            'step_key' => 'intro-blocks',
        ])->assertOk();

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $this->actingAs($user)->getJson("/learner/learn/{$lessonSlug}/checkpoints")
            ->assertOk()
            ->assertJsonPath('step_keys', []);

        $this->assertSame(1, LearnerLessonCheckpoint::query()->where('user_id', $user->id)->count());
    }

    public function test_remarking_same_step_is_idempotent(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/checkpoints", [
            'step_key' => 'intro-blocks',
        ])->assertOk();

        $firstCompletedAt = LearnerLessonCheckpoint::query()->first()->completed_at;

        $this->travel(1)->seconds();

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/checkpoints", [
            'step_key' => 'intro-blocks',
        ])->assertOk()
            ->assertJsonPath('checkpoint.step_key', 'intro-blocks');

        $this->assertSame(1, LearnerLessonCheckpoint::query()->count());

        $checkpoint = LearnerLessonCheckpoint::query()->first();
        $this->assertTrue($checkpoint->completed_at->greaterThan($firstCompletedAt));
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
