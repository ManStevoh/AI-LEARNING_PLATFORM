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

    private function attachLearner(User $user, Institution $institution): void
    {
        $institution->users()->attach($user, [
            'role' => InstitutionRole::Learner->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);
    }
}
