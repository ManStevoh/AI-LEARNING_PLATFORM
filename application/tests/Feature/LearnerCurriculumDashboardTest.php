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

class LearnerCurriculumDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_learner_dashboard_shows_published_level_one_course(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $response = $this->withoutVite()->actingAs($user)->get('/learner');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Learner/Dashboard')
            ->has('course', fn (Assert $course) => $course
                ->where('slug', 'level-1-block-creator')
                ->where('module_count', 10)
                ->has('next_lesson')
                ->etc()
            )
            ->has('metrics', 3)
        );
    }

    public function test_learner_can_view_learning_path_units(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $response = $this->withoutVite()->actingAs($user)->get('/learner/learn');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Learner/Learn')
            ->has('course.modules', 10)
        );
    }

    public function test_learner_can_view_published_lesson_detail(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $response = $this->withoutVite()->actingAs($user)->get('/learner/learn/unit-01-meet-the-coding-studio');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Learner/Lesson')
            ->has('lesson', fn (Assert $lesson) => $lesson
                ->where('slug', 'unit-01-meet-the-coding-studio')
                ->where('title', 'Meet The Coding Studio')
                ->has('skills', 3)
                ->etc()
            )
            ->has('workspace', fn (Assert $workspace) => $workspace
                ->where('preset', 'level_1_default')
                ->where('enabled_block_packs', [
                    'ace_ai',
                    'ace_curriculum',
                    'ace_robotics',
                ])
                ->where('lesson_slug', 'unit-01-meet-the-coding-studio')
                ->where('stage.status', 'active')
                ->where('stage.renderer', 'dom')
                ->has('runtime', fn (Assert $runtime) => $runtime
                    ->where('max_run_ms', 10000)
                    ->etc()
                )
                ->etc()
            )
            ->has('starterProject', fn (Assert $starter) => $starter
                ->where('lesson_slug', 'unit-01-meet-the-coding-studio')
                ->where('schema_version', '1.0')
                ->has('workspace.blocks.blocks', 1)
                ->etc()
            )
            ->where('savedProject', null)
        );
    }

    public function test_learner_cannot_view_unknown_lesson(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $this->withoutVite()->actingAs($user)->get('/learner/learn/does-not-exist')->assertNotFound();
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
