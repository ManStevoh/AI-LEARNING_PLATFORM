<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LearnerLessonStarterProjectTest extends TestCase
{
    use RefreshDatabase;

    public function test_saved_project_replaces_starter_project_on_lesson_page(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => [
                'blocks' => [
                    'languageVersion' => 0,
                    'blocks' => [],
                ],
            ],
            'generated_code' => 'await runtime.moveSteps(5);',
        ])->assertOk();

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject')
                ->where('starterProject', null)
            );
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
