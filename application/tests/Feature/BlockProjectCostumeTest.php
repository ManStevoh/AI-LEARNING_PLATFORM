<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectCostume;
use App\Modules\BlockCoding\Services\BlockProjectCostumeService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BlockProjectCostumeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
    }

    public function test_learner_can_upload_list_and_stream_costume_for_lesson(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';
        $file = UploadedFile::fake()->image('hero.png', 64, 64);

        $this->actingAs($user)->post("/learner/learn/{$lessonSlug}/costumes", [
            'file' => $file,
            'name' => 'Hero',
        ])->assertCreated()
            ->assertJsonPath('costume.name', 'Hero')
            ->assertJsonStructure(['costume' => ['uuid', 'mime_type', 'size_bytes']]);

        $costume = BlockProjectCostume::query()->first();
        $this->assertNotNull($costume);
        Storage::disk('local')->assertExists($costume->path);

        $this->actingAs($user)->getJson("/learner/learn/{$lessonSlug}/costumes")
            ->assertOk()
            ->assertJsonCount(1, 'costumes')
            ->assertJsonPath('costumes.0.name', 'Hero');

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/costumes/{$costume->uuid}/image")
            ->assertOk();
    }

    public function test_learner_can_delete_uploaded_costume(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $costume = app(BlockProjectCostumeService::class)->storeForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            UploadedFile::fake()->image('cat.png', 48, 48),
            'Cat',
        );

        $this->actingAs($user)->delete("/learner/learn/{$lessonSlug}/costumes/{$costume->uuid}")
            ->assertOk()
            ->assertJsonPath('deleted', true);

        $this->assertDatabaseMissing('block_project_costumes', ['uuid' => $costume->uuid]);
        Storage::disk('local')->assertMissing($costume->path);
    }

    public function test_learner_can_save_project_envelope_with_costume_refs(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $costume = app(BlockProjectCostumeService::class)->storeForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            UploadedFile::fake()->image('robot.png', 48, 48),
            'Robot',
        );

        $workspace = [
            'format' => 'ace_project',
            'version' => '1.4',
            'blockly' => [
                'blocks' => [
                    'languageVersion' => 0,
                    'blocks' => [],
                ],
            ],
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🖼️',
                    'costumes' => [
                        '🐱',
                        [
                            'type' => 'asset',
                            'asset_uuid' => $costume->uuid,
                            'name' => 'Robot',
                            'emoji' => '🖼️',
                        ],
                    ],
                    'costumeIndex' => 1,
                ],
            ],
            'active_sprite_id' => 'sprite-1',
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.switchCostume(2);',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.4');
    }

    public function test_costume_assets_are_isolated_by_institution(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $first = Institution::factory()->create();
        $second = Institution::factory()->create();
        $this->attachLearner($user, $first);
        $this->attachLearner($user, $second);
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $costume = app(BlockProjectCostumeService::class)->storeForLearner(
            $user->id,
            $first->id,
            $lessonSlug,
            UploadedFile::fake()->image('local.png', 32, 32),
            'Local',
        );

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/costumes/{$costume->uuid}/image")
            ->assertForbidden();
    }

    public function test_learner_cannot_access_another_learners_costume(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$owner, $ownerInstitution] = $this->createLearnerWithInstitution();
        [$other] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $costume = app(BlockProjectCostumeService::class)->storeForLearner(
            $owner->id,
            $ownerInstitution->id,
            $lessonSlug,
            UploadedFile::fake()->image('secret.png', 32, 32),
            'Secret',
        );

        $this->actingAs($other)->get("/learner/learn/{$lessonSlug}/costumes/{$costume->uuid}/image")
            ->assertForbidden();
    }

    public function test_upload_requires_active_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $this->actingAs($user)->post("/learner/learn/{$lessonSlug}/costumes", [
            'file' => UploadedFile::fake()->image('clip.png', 32, 32),
        ])->assertForbidden();
    }

    /**
     * @return array{0: User, 1: Institution}
     */
    private function createLearnerWithInstitution(): array
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        return [$user, $institution];
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
