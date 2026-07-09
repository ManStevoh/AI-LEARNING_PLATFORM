<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\AuditLog;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectFeedback;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use App\Support\Audit\AuditAction;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeacherBlockProjectFeedbackTest extends TestCase
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
                'blocks' => [],
            ],
        ];
    }

    public function test_teacher_can_save_feedback_on_institution_project(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$teacher, $learner, $institution, $project] = $this->createTeacherLearnerProject();

        $this->actingAs($teacher)->post("/teacher/block-projects/{$project->id}/feedback", [
            'notes' => 'Great start. Try adding a repeat loop next.',
        ])->assertRedirect(route('teacher.block-projects.show', $project->id));

        $this->assertDatabaseHas('block_project_feedback', [
            'block_project_id' => $project->id,
            'institution_id' => $institution->id,
            'teacher_user_id' => $teacher->id,
            'notes' => 'Great start. Try adding a repeat loop next.',
        ]);

        $this->withoutVite()->actingAs($teacher)->get("/teacher/block-projects/{$project->id}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('project.feedback', fn (Assert $feedback) => $feedback
                    ->where('notes', 'Great start. Try adding a repeat loop next.')
                    ->etc()
                )
            );
    }

    public function test_teacher_feedback_is_audited(): void
    {
        [$teacher, , $institution, $project] = $this->createTeacherLearnerProject();

        $this->actingAs($teacher)->post("/teacher/block-projects/{$project->id}/feedback", [
            'notes' => 'Check your event block order.',
        ])->assertRedirect();

        $this->assertDatabaseHas('audit_logs', [
            'institution_id' => $institution->id,
            'user_id' => $teacher->id,
            'action' => AuditAction::BLOCK_PROJECT_FEEDBACK_SAVED,
        ]);
    }

    public function test_teacher_cannot_save_feedback_for_foreign_institution_project(): void
    {
        $teacher = User::factory()->create();
        $learner = User::factory()->create();
        $teacherInstitution = Institution::factory()->create();
        $foreignInstitution = Institution::factory()->create();

        $this->attachMember($teacher, $teacherInstitution, InstitutionRole::Teacher);
        $this->attachMember($learner, $foreignInstitution, InstitutionRole::Learner);

        $foreignProject = app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $foreignInstitution->id,
            'unit-01-meet-the-coding-studio',
            $this->sampleWorkspace(),
        );

        $this->actingAs($teacher)->post("/teacher/block-projects/{$foreignProject->id}/feedback", [
            'notes' => 'Should not save.',
        ])->assertNotFound();

        $this->assertSame(0, BlockProjectFeedback::query()->count());
        $this->assertSame(0, AuditLog::query()->count());
    }

    public function test_feedback_notes_are_required(): void
    {
        [$teacher, , , $project] = $this->createTeacherLearnerProject();

        $this->withoutExceptionHandling();
        $this->expectException(ValidationException::class);

        $this->actingAs($teacher)->post("/teacher/block-projects/{$project->id}/feedback", [
            'notes' => '',
        ]);
    }

    /**
     * @return array{0: User, 1: User, 2: Institution, 3: \App\Modules\BlockCoding\Models\BlockProject}
     */
    private function createTeacherLearnerProject(): array
    {
        $teacher = User::factory()->create();
        $learner = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);
        $this->attachMember($learner, $institution, InstitutionRole::Learner);

        $project = app(BlockProjectPersistenceService::class)->saveForLearner(
            $learner->id,
            $institution->id,
            'unit-06-repeat-loops',
            $this->sampleWorkspace(),
            'await runtime.moveSteps(5);',
        );

        return [$teacher, $learner, $institution, $project];
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
