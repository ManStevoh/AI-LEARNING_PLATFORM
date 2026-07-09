<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use App\Modules\Curriculum\Services\TeacherClassOverviewService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeacherClassOverviewTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, mixed>
     */
    private function sampleWorkspace(): array
    {
        return [
            'blocks' => [
                'languageVersion' => 0,
                'blocks' => [
                    ['type' => 'ace_event_green_flag', 'id' => 'hat'],
                ],
            ],
        ];
    }

    public function test_teacher_can_view_class_overview_with_learner_progress(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$teacher, $learner, $institution] = $this->createTeacherLearnerPair();

        app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
            'await runtime.moveSteps(5);',
        );

        app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-02-events-and-actions',
            $this->sampleWorkspace(),
        );

        $this->withoutVite()->actingAs($teacher)->get('/teacher/classes')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Teacher/ClassOverview/Index')
                ->where('course.title', 'Level 1: Block Creator')
                ->has('metrics', 3)
                ->has('learners', 1)
                ->where('learners.0.email', $learner->email)
                ->where('learners.0.lessons_started', 2)
                ->where('learners.0.lessons_with_code', 1)
                ->where('learners.0.total_lessons', 10)
                ->where('learners.0.current_lesson_title', 'Events And Actions')
                ->where('learners.0.needs_attention', false)
            );
    }

    public function test_teacher_dashboard_uses_live_class_metrics(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$teacher, $learner, $institution] = $this->createTeacherLearnerPair();

        app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
        );

        $this->withoutVite()->actingAs($teacher)->get('/teacher')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Teacher/Dashboard')
                ->where('metrics.0.value', '1')
                ->where('metrics.1.value', '1')
                ->where('metrics.2.value', '0')
            );
    }

    public function test_inactive_learners_are_flagged_for_attention(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$teacher, $learner, $institution] = $this->createTeacherLearnerPair();
        $persistence = app(BlockProjectPersistenceService::class);

        $project = $persistence->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
        );

        $project->forceFill(['last_saved_at' => now()->subDays(10)])->save();

        $overview = app(TeacherClassOverviewService::class)->getOverview($institution->id);

        $this->assertTrue($overview['learners'][0]['needs_attention']);
    }

    public function test_class_overview_only_lists_learners_from_current_institution(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $teacher = User::factory()->create();
        $localLearner = User::factory()->create(['email' => 'local@example.com']);
        $foreignLearner = User::factory()->create(['email' => 'foreign@example.com']);
        $institution = Institution::factory()->create();
        $foreignInstitution = Institution::factory()->create();

        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);
        $this->attachMember($localLearner, $institution, InstitutionRole::Learner);
        $this->attachMember($foreignLearner, $foreignInstitution, InstitutionRole::Learner);

        $persistence = app(BlockProjectPersistenceService::class);
        $persistence->saveForLearner($localLearner->id, $institution->id, 'unit-01-meet-the-coding-studio', $this->sampleWorkspace());
        $persistence->saveForLearner($foreignLearner->id, $foreignInstitution->id, 'unit-02-events-and-actions', $this->sampleWorkspace());

        $overview = app(TeacherClassOverviewService::class)->getOverview($institution->id);

        $this->assertCount(1, $overview['learners']);
        $this->assertSame('local@example.com', $overview['learners'][0]['email']);
    }

    public function test_learner_cannot_access_teacher_class_overview(): void
    {
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        $this->actingAs($learner)->get('/teacher/classes')->assertForbidden();
    }

    public function test_not_started_learners_need_attention(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$teacher, , $institution] = $this->createTeacherLearnerPair();

        $this->withoutVite()->actingAs($teacher)->get('/teacher/classes')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('learners.0.lessons_started', 0)
                ->where('learners.0.needs_attention', true)
            );
    }

    /**
     * @return array{0: User, 1: User, 2: Institution}
     */
    private function createTeacherLearnerPair(): array
    {
        $teacher = User::factory()->create();
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        return [$teacher, $learner, $institution];
    }

    private function attachMember(User $user, Institution $institution, InstitutionRole $role): void
    {
        $institution->users()->attach($user, [
            'role' => $role->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);
    }
}
