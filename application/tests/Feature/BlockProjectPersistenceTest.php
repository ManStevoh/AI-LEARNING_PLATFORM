<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProject;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class BlockProjectPersistenceTest extends TestCase
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

    public function test_learner_can_save_and_reload_block_project_for_lesson(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $this->sampleWorkspace(),
            'generated_code' => 'await runtime.moveSteps(10);',
        ])->assertOk()->assertJsonPath('saved_project.generated_code', 'await runtime.moveSteps(10);');

        $this->assertDatabaseHas('block_projects', [
            'institution_id' => $institution->id,
            'user_id' => $user->id,
            'lesson_slug' => $lessonSlug,
        ]);

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '1.0')
                    ->where('generated_code', 'await runtime.moveSteps(10);')
                    ->has('workspace')
                    ->etc()
                )
            );
    }

    public function test_block_projects_are_isolated_by_institution(): void
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

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $this->sampleWorkspace(),
            'generated_code' => 'first institution project',
        ])->assertOk();

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->where('savedProject', null));

        $this->assertSame(1, BlockProject::query()->where('user_id', $user->id)->count());
    }

    public function test_save_requires_active_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();

        $this->actingAs($user)->postJson('/learner/learn/unit-01-meet-the-coding-studio/project', [
            'workspace' => $this->sampleWorkspace(),
        ])->assertForbidden();
    }

    public function test_persistence_service_upserts_by_learner_lesson_and_institution(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $service = app(BlockProjectPersistenceService::class);

        $service->saveForLearner($user->id, $institution->id, 'unit-01-meet-the-coding-studio', $this->sampleWorkspace(), 'v1');
        $service->saveForLearner($user->id, $institution->id, 'unit-01-meet-the-coding-studio', $this->sampleWorkspace(), 'v2');

        $this->assertSame(1, BlockProject::query()->count());
        $this->assertSame('v2', BlockProject::query()->first()->generated_code);
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
