<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\AI\Models\AiUsageRecord;
use App\Modules\BlockCoding\Models\BlockProjectBackdrop;
use App\Modules\BlockCoding\Services\BlockProjectBackdropService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class BlockProjectBackdropAiGenerationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('local');

        config([
            'ai.default_provider' => 'fake',
            'ai.providers.fake.enabled' => true,
        ]);
    }

    public function test_learner_can_generate_ai_backdrop_through_ai_gateway(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $response = $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/backdrops/generate", [
            'theme' => 'ocean',
        ]);

        $response->assertCreated()
            ->assertJsonPath('theme', 'ocean')
            ->assertJsonPath('provider', 'fake')
            ->assertJsonPath('prompt_id', 'block_coding.backdrop.generate@v1')
            ->assertJsonPath('backdrop.name', 'AI Ocean')
            ->assertJsonPath('backdrop.mime_type', 'image/svg+xml')
            ->assertJsonStructure([
                'backdrop' => ['uuid', 'mime_type', 'size_bytes'],
                'theme',
                'request_id',
                'provider',
                'prompt_id',
                'color',
            ]);

        $backdrop = BlockProjectBackdrop::query()->first();
        $this->assertNotNull($backdrop);
        Storage::disk('local')->assertExists($backdrop->path);
        $this->assertStringContainsString('<svg', Storage::disk('local')->get($backdrop->path));

        $this->assertSame(1, AiUsageRecord::query()->count());
        $this->assertDatabaseHas('ai_usage_records', [
            'institution_id' => $backdrop->institution_id,
            'user_id' => $user->id,
            'task_type' => 'block_coding_backdrop_generate',
        ]);

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/backdrops/{$backdrop->uuid}/image")
            ->assertOk();
    }

    public function test_ai_backdrop_generation_requires_institution_context(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/backdrops/generate", [
            'theme' => 'ocean',
        ])->assertForbidden();
    }

    public function test_ai_backdrop_generation_validates_theme(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $this->withoutExceptionHandling();

        $this->expectException(ValidationException::class);

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/backdrops/generate", [
            'theme' => 'haunted',
        ]);
    }

    public function test_ai_backdrop_assets_are_isolated_by_institution(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $first = Institution::factory()->create();
        $second = Institution::factory()->create();
        $this->attachLearner($user, $first);
        $this->attachLearner($user, $second);
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $first->id,
        ]);

        $response = $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/backdrops/generate", [
            'theme' => 'forest',
        ])->assertCreated();

        $uuid = (string) $response->json('backdrop.uuid');

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $this->actingAs($user)->get("/learner/learn/{$lessonSlug}/backdrops/{$uuid}/image")
            ->assertForbidden();
    }

    public function test_learner_can_save_project_envelope_with_ai_backdrop(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        [$user, $institution] = $this->createLearnerWithInstitution();
        $lessonSlug = 'unit-04-looks-and-storytelling';

        $backdrop = app(BlockProjectBackdropService::class)->storeSvgForLearner(
            $user->id,
            $institution->id,
            $lessonSlug,
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" fill="#4fc3f7"/></svg>',
            'AI Ocean',
        );

        $workspace = [
            'format' => 'ace_project',
            'version' => '2.0',
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
                        'type' => 'ai',
                        'id' => 'backdrop-ai-1',
                        'asset_uuid' => $backdrop->uuid,
                        'theme' => 'ocean',
                        'request_id' => 'req-test-1',
                        'name' => 'AI Ocean',
                        'color' => '#4fc3f7',
                    ],
                ],
                'backdropIndex' => 0,
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.setBackdrop("AI Ocean");',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '2.0');
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
