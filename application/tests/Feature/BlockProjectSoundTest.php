<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectSound;
use App\Modules\BlockCoding\Services\BlockProjectSoundService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BlockProjectSoundTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');
    }

    public function test_learner_can_upload_list_and_stream_sound_for_lesson(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-05-sound-and-interaction';
        $file = UploadedFile::fake()->create('meow.wav', 12, 'audio/wav');

        $this->actingAs($user)->post("/learner/learn/{$lessonSlug}/sounds", [
            'file' => $file,
            'name' => 'Meow',
        ])->assertCreated()
            ->assertJsonPath('sound.name', 'Meow')
            ->assertJsonStructure(['sound' => ['uuid', 'mime_type', 'size_bytes']]);

        $sound = BlockProjectSound::query()->first();
        $this->assertNotNull($sound);
        Storage::disk('local')->assertExists($sound->path);

        $this->actingAs($user)->getJson("/learner/learn/{$lessonSlug}/sounds")
            ->assertOk()
            ->assertJsonCount(1, 'sounds')
            ->assertJsonPath('sounds.0.name', 'Meow');

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/sounds/{$sound->uuid}/audio")
            ->assertOk()
            ->assertHeader('Content-Type', 'audio/wav');
    }

    public function test_learner_can_delete_uploaded_sound(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-05-sound-and-interaction';

        $sound = app(BlockProjectSoundService::class)->storeForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            UploadedFile::fake()->create('pop.wav', 8, 'audio/wav'),
            'Pop',
        );

        $this->actingAs($user)->delete("/learner/learn/{$lessonSlug}/sounds/{$sound->uuid}")
            ->assertOk()
            ->assertJsonPath('deleted', true);

        $this->assertDatabaseMissing('block_project_sounds', ['uuid' => $sound->uuid]);
        Storage::disk('local')->assertMissing($sound->path);
    }

    public function test_learner_can_save_project_envelope_with_sound_refs(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-05-sound-and-interaction';

        $sound = app(BlockProjectSoundService::class)->storeForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            UploadedFile::fake()->create('beat.mp3', 16, 'audio/mpeg'),
            'Beat',
        );

        $workspace = [
            'format' => 'ace_project',
            'version' => '1.3',
            'blockly' => [
                'blocks' => [
                    'languageVersion' => 0,
                    'blocks' => [],
                ],
            ],
            'sounds' => [
                [
                    'id' => $sound->uuid,
                    'name' => 'Beat',
                    'asset_uuid' => $sound->uuid,
                ],
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => "await runtime.playSound('asset:{$sound->uuid}');",
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.3');
    }

    public function test_sound_assets_are_isolated_by_institution(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $first = Institution::factory()->create();
        $second = Institution::factory()->create();
        $this->attachLearner($user, $first);
        $this->attachLearner($user, $second);
        $lessonSlug = 'unit-05-sound-and-interaction';

        $sound = app(BlockProjectSoundService::class)->storeForLearner(
            $user->id,
            $first->id,
            $lessonSlug,
            UploadedFile::fake()->create('local.wav', 8, 'audio/wav'),
            'Local',
        );

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/sounds/{$sound->uuid}/audio")
            ->assertForbidden();
    }

    public function test_learner_cannot_access_another_learners_sound(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$owner, $ownerInstitution] = $this->createLearnerWithInstitution();
        [$other, $otherInstitution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-05-sound-and-interaction';

        $sound = app(BlockProjectSoundService::class)->storeForLearner(
            $owner->id,
            $ownerInstitution->id,
            $lessonSlug,
            UploadedFile::fake()->create('secret.wav', 8, 'audio/wav'),
            'Secret',
        );

        $this->actingAs($other)->get("/learner/learn/{$lessonSlug}/sounds/{$sound->uuid}/audio")
            ->assertForbidden();
    }

    public function test_upload_requires_active_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $lessonSlug = 'unit-05-sound-and-interaction';

        $this->actingAs($user)->post("/learner/learn/{$lessonSlug}/sounds", [
            'file' => UploadedFile::fake()->create('clip.wav', 8, 'audio/wav'),
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
