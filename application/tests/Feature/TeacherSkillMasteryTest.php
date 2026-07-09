<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use App\Modules\Curriculum\Services\TeacherSkillMasteryService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeacherSkillMasteryTest extends TestCase
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

    public function test_teacher_can_view_skill_mastery_overview(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$teacher, $learner, $institution] = $this->createTeacherLearnerPair();

        app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-02-events-and-actions',
            $this->sampleWorkspace(),
            'await runtime.moveSteps(5);',
        );

        $this->withoutVite()->actingAs($teacher)->get('/teacher/skills')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Teacher/SkillMastery/Index')
                ->where('course.title', 'Level 1: Block Creator')
                ->has('metrics', 3)
                ->has('skills', 14)
                ->where('skills', fn ($skills) => collect($skills)->contains(
                    fn ($skill) => $skill['slug'] === 'programming.events.green-flag'
                        && $skill['demonstrated_count'] === 1,
                ))
                ->has('learners_needing_support', 0)
            );
    }

    public function test_in_progress_learners_with_missing_prerequisites_are_flagged(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [, $learner, $institution] = $this->createTeacherLearnerPair();

        app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-03-motion-and-coordinates',
            $this->sampleWorkspace(),
        );

        $overview = app(TeacherSkillMasteryService::class)->getOverview($institution->id);

        $this->assertCount(1, $overview['learners_needing_support']);
        $this->assertSame($learner->email, $overview['learners_needing_support'][0]['email']);
        $this->assertStringContainsString(
            'Missing prerequisite: Green flag event',
            $overview['learners_needing_support'][0]['gaps'][0]['reasons'][0],
        );
    }

    public function test_stale_in_progress_skill_activity_is_flagged(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [, $learner, $institution] = $this->createTeacherLearnerPair();
        $persistence = app(BlockProjectPersistenceService::class);

        $project = $persistence->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
        );

        $project->forceFill(['last_saved_at' => now()->subDays(10)])->save();

        $overview = app(TeacherSkillMasteryService::class)->getOverview($institution->id);

        $this->assertCount(1, $overview['learners_needing_support']);
        $this->assertContains(
            'Inactive while practicing this skill',
            $overview['learners_needing_support'][0]['gaps'][0]['reasons'],
        );
    }

    public function test_skill_mastery_only_includes_learners_from_current_institution(): void
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
        $persistence->saveForLearner(
            $localLearner->id,
            $institution->id,
            'unit-02-events-and-actions',
            $this->sampleWorkspace(),
            'await runtime.moveSteps(5);',
        );
        $persistence->saveForLearner(
            $foreignLearner->id,
            $foreignInstitution->id,
            'unit-02-events-and-actions',
            $this->sampleWorkspace(),
            'await runtime.moveSteps(5);',
        );

        $overview = app(TeacherSkillMasteryService::class)->getOverview($institution->id);
        $greenFlag = collect($overview['skills'])->firstWhere('slug', 'programming.events.green-flag');

        $this->assertSame(1, $greenFlag['demonstrated_count']);
    }

    public function test_learner_cannot_access_teacher_skill_mastery(): void
    {
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        $this->actingAs($learner)->get('/teacher/skills')->assertForbidden();
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
