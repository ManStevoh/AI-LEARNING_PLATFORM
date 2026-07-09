<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectBackdrop;
use App\Modules\BlockCoding\Services\BlockProjectBackdropService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BlockProjectBackdropTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
    }

    public function test_learner_can_upload_list_and_stream_backdrop_for_lesson(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';
        $file = UploadedFile::fake()->image('park.png', 320, 240);

        $this->actingAs($user)->post("/learner/learn/{$lessonSlug}/backdrops", [
            'file' => $file,
            'name' => 'Park',
        ])->assertCreated()
            ->assertJsonPath('backdrop.name', 'Park')
            ->assertJsonStructure(['backdrop' => ['uuid', 'mime_type', 'size_bytes']]);

        $backdrop = BlockProjectBackdrop::query()->first();
        $this->assertNotNull($backdrop);
        Storage::disk('local')->assertExists($backdrop->path);

        $this->actingAs($user)->getJson("/learner/learn/{$lessonSlug}/backdrops")
            ->assertOk()
            ->assertJsonCount(1, 'backdrops')
            ->assertJsonPath('backdrops.0.name', 'Park');

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/backdrops/{$backdrop->uuid}/image")
            ->assertOk();
    }

    public function test_learner_can_delete_uploaded_backdrop(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $backdrop = app(BlockProjectBackdropService::class)->storeForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            UploadedFile::fake()->image('sky.png', 160, 120),
            'Sky',
        );

        $this->actingAs($user)->delete("/learner/learn/{$lessonSlug}/backdrops/{$backdrop->uuid}")
            ->assertOk()
            ->assertJsonPath('deleted', true);

        $this->assertDatabaseMissing('block_project_backdrops', ['uuid' => $backdrop->uuid]);
        Storage::disk('local')->assertMissing($backdrop->path);
    }

    public function test_learner_can_save_project_envelope_with_backdrop_refs(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $backdrop = app(BlockProjectBackdropService::class)->storeForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            UploadedFile::fake()->image('forest.png', 160, 120),
            'Forest',
        );

        $workspace = [
            'format' => 'ace_project',
            'version' => '1.5',
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
                    'emoji' => '🐱',
                    'costumes' => ['🐱'],
                    'costumeIndex' => 0,
                ],
            ],
            'active_sprite_id' => 'sprite-1',
            'stage' => [
                'backdrops' => [
                    [
                        'id' => 'backdrop-1',
                        'name' => 'blue sky',
                        'color' => '#dbeafe',
                    ],
                    [
                        'type' => 'asset',
                        'id' => 'backdrop-asset-1',
                        'asset_uuid' => $backdrop->uuid,
                        'name' => 'Forest',
                        'color' => '#e5e7eb',
                    ],
                ],
                'backdropIndex' => 1,
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.setBackdrop("Forest");',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.5');
    }

    public function test_backdrop_assets_are_isolated_by_institution(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $first = Institution::factory()->create();
        $second = Institution::factory()->create();
        $this->attachLearner($user, $first);
        $this->attachLearner($user, $second);
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $backdrop = app(BlockProjectBackdropService::class)->storeForLearner(
            $user->id,
            $first->id,
            $lessonSlug,
            UploadedFile::fake()->image('local.png', 64, 48),
            'Local',
        );

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/backdrops/{$backdrop->uuid}/image")
            ->assertForbidden();
    }

    public function test_learner_cannot_access_another_learners_backdrop(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$owner, $ownerInstitution] = $this->createLearnerWithInstitution();
        [$other] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $backdrop = app(BlockProjectBackdropService::class)->storeForLearner(
            $owner->id,
            $ownerInstitution->id,
            $lessonSlug,
            UploadedFile::fake()->image('secret.png', 64, 48),
            'Secret',
        );

        $this->actingAs($other)->get("/learner/learn/{$lessonSlug}/backdrops/{$backdrop->uuid}/image")
            ->assertForbidden();
    }

    public function test_upload_requires_active_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $this->actingAs($user)->post("/learner/learn/{$lessonSlug}/backdrops", [
            'file' => UploadedFile::fake()->image('clip.png', 64, 48),
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
