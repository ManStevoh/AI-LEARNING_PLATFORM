<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use App\Modules\BlockCoding\Services\BlockProjectReviewService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeacherBlockProjectReviewTest extends TestCase
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

    public function test_teacher_can_list_institution_block_projects(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $teacher = User::factory()->create();
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
            'await runtime.moveSteps(10);',
        );

        $this->withoutVite()->actingAs($teacher)->get('/teacher/block-projects')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Teacher/BlockProjects/Index')
                ->has('projects', 1)
                ->where('projects.0.lesson_title', 'Meet The Coding Studio')
            );
    }

    public function test_teacher_can_review_block_project_detail(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $teacher = User::factory()->create();
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        $project = app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-02-events-and-actions',
            $this->sampleWorkspace(),
            'await runtime.turnDegrees(15);',
        );

        $this->withoutVite()->actingAs($teacher)->get("/teacher/block-projects/{$project->id}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Teacher/BlockProjects/Show')
                ->has('project', fn (Assert $detail) => $detail
                    ->where('lesson_title', 'Events And Actions')
                    ->where('generated_code', 'await runtime.turnDegrees(15);')
                    ->where('workspace_block_count', 1)
                    ->etc()
                )
            );
    }

    public function test_teacher_cannot_review_project_from_another_institution(): void
    {
        $teacher = User::factory()->create();
        $learner = User::factory()->create();
        $teacherInstitution = Institution::factory()->create(['name' => 'Teacher School']);
        $foreignInstitution = Institution::factory()->create(['name' => 'Foreign School']);

        $this->attachMember($teacher, $teacherInstitution, InstitutionRole::Teacher);
        $this->attachMember($learner, $foreignInstitution, InstitutionRole::Learner);

        $foreignProject = app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $foreignInstitution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
        );

        $this->actingAs($teacher)->get("/teacher/block-projects/{$foreignProject->id}")->assertNotFound();
    }

    public function test_review_service_scopes_projects_to_institution(): void
    {
        $learner = User::factory()->create();
        $first = Institution::factory()->create();
        $second = Institution::factory()->create();

        $persistence = app(BlockProjectPersistenceService::class);
        $persistence->saveForLearner($learner->id, $first->id, 'unit-01-meet-the-coding-studio', $this->sampleWorkspace());
        $persistence->saveForLearner($learner->id, $second->id, 'unit-02-events-and-actions', $this->sampleWorkspace());

        $reviewService = app(BlockProjectReviewService::class);

        $this->assertCount(1, $reviewService->listForInstitution($first->id));
        $this->assertSame('unit-01-meet-the-coding-studio', $reviewService->listForInstitution($first->id)->first()['lesson_slug']);
    }

    public function test_learner_cannot_access_teacher_block_project_review_routes(): void
    {
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        $this->actingAs($learner)->get('/teacher/block-projects')->assertForbidden();
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
