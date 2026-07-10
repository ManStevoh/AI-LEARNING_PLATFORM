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

    public function test_learner_can_save_project_envelope_with_sprites(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '1.1',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 12,
                    'y' => -8,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
                ],
            ],
            'active_sprite_id' => 'sprite-1',
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'await runtime.waitSeconds(1);',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.1');

        $this->assertDatabaseHas('block_projects', [
            'institution_id' => $institution->id,
            'user_id' => $user->id,
            'lesson_slug' => $lessonSlug,
            'schema_version' => '1.1',
        ]);

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '1.1')
                    ->where('workspace.format', 'ace_project')
                    ->where('workspace.sprites.0.x', 12)
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_stage_monitors(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '1.6',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
                ],
            ],
            'active_sprite_id' => 'sprite-1',
            'monitors' => [
                [
                    'id' => 'x_position',
                    'visible' => true,
                    'x' => 12,
                    'y' => 24,
                ],
                [
                    'id' => 'timer',
                    'visible' => true,
                    'x' => 12,
                    'y' => 58,
                ],
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.getXPosition();',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.6');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '1.6')
                    ->where('workspace.monitors.0.id', 'x_position')
                    ->where('workspace.monitors.1.id', 'timer')
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_library_and_procedural_backdrops(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '1.7',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
                ],
            ],
            'active_sprite_id' => 'sprite-1',
            'stage' => [
                'backdrops' => [
                    [
                        'type' => 'library',
                        'id' => 'backdrop-lib-desert-dunes',
                        'library_id' => 'desert-dunes',
                        'name' => 'Desert Dunes',
                        'color' => '#f6c56b',
                    ],
                    [
                        'type' => 'procedural',
                        'id' => 'backdrop-proc-424242',
                        'seed' => 424242,
                        'name' => 'Surprise 242',
                        'color' => '#dbeafe',
                    ],
                ],
                'backdropIndex' => 1,
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.setBackdrop("Surprise 242");',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.7');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '1.7')
                    ->where('workspace.stage.backdrops.0.library_id', 'desert-dunes')
                    ->where('workspace.stage.backdrops.1.seed', 424242)
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_library_sprite_costumes(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '1.8',
            'blockly' => $this->sampleWorkspace(),
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
                [
                    'id' => 'sprite-2',
                    'name' => 'Owl',
                    'x' => 40,
                    'y' => -20,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🦉',
                    'costumes' => [
                        [
                            'type' => 'library',
                            'library_id' => 'ace-owl',
                            'name' => 'Owl',
                            'emoji' => '🦉',
                        ],
                    ],
                    'costumeIndex' => 0,
                ],
            ],
            'active_sprite_id' => 'sprite-2',
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.addSpriteFromLibrary("ace-owl");',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.8');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '1.8')
                    ->where('workspace.sprites.1.costumes.0.library_id', 'ace-owl')
                    ->where('workspace.active_sprite_id', 'sprite-2')
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_variable_monitors(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '1.9',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
                ],
            ],
            'active_sprite_id' => 'sprite-1',
            'monitors' => [
                [
                    'id' => 'var:score-var',
                    'label' => 'score',
                    'visible' => true,
                    'x' => 16,
                    'y' => 20,
                ],
                [
                    'id' => 'list:length:items-var',
                    'label' => 'length of items',
                    'visible' => true,
                    'x' => 16,
                    'y' => 54,
                ],
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.setVariableById("score-var", 5);',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '1.9');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '1.9')
                    ->where('workspace.monitors.0.id', 'var:score-var')
                    ->where('workspace.monitors.0.label', 'score')
                    ->where('workspace.monitors.1.id', 'list:length:items-var')
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_pen_trails(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '2.1',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
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
                ],
                'backdropIndex' => 0,
                'penTrails' => [
                    [
                        'x1' => 0,
                        'y1' => 0,
                        'x2' => 40,
                        'y2' => 20,
                        'color' => '#ff0000',
                        'size' => 4,
                        'spriteId' => 'sprite-1',
                    ],
                ],
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.penDown(); runtime.goToXY(40, 20);',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '2.1');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '2.1')
                    ->where('workspace.stage.penTrails.0.color', '#ff0000')
                    ->where('workspace.stage.penTrails.0.size', 4)
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_video_sensing_state(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '2.3',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
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
                ],
                'backdropIndex' => 0,
                'video' => [
                    'state' => 'on-flipped',
                    'transparency' => 25,
                ],
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.setVideoState("on-flipped");',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '2.3');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '2.3')
                    ->where('workspace.stage.video.state', 'on-flipped')
                    ->where('workspace.stage.video.transparency', 25)
                    ->etc()
                )
            );
    }

    public function test_learner_can_save_project_envelope_with_pen_stamps(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachLearner($user, $institution);

        $lessonSlug = 'unit-01-meet-the-coding-studio';
        $workspace = [
            'format' => 'ace_project',
            'version' => '2.2',
            'blockly' => $this->sampleWorkspace(),
            'sprites' => [
                [
                    'id' => 'sprite-1',
                    'name' => 'Sprite1',
                    'x' => 0,
                    'y' => 0,
                    'direction' => 90,
                    'visible' => true,
                    'emoji' => '🐱',
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
                ],
                'backdropIndex' => 0,
                'stamps' => [
                    [
                        'spriteId' => 'sprite-1',
                        'x' => 40,
                        'y' => 20,
                        'direction' => 135,
                        'size' => 80,
                        'costume' => '🐱',
                        'layer' => 2,
                    ],
                ],
            ],
        ];

        $this->actingAs($user)->postJson("/learner/learn/{$lessonSlug}/project", [
            'workspace' => $workspace,
            'generated_code' => 'runtime.stamp();',
        ])->assertOk()->assertJsonPath('saved_project.schema_version', '2.2');

        $this->withoutVite()->actingAs($user)->get("/learner/learn/{$lessonSlug}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('savedProject', fn (Assert $project) => $project
                    ->where('schema_version', '2.2')
                    ->where('workspace.stage.stamps.0.spriteId', 'sprite-1')
                    ->where('workspace.stage.stamps.0.x', 40)
                    ->where('workspace.stage.stamps.0.direction', 135)
                    ->where('workspace.stage.stamps.0.size', 80)
                    ->where('workspace.stage.stamps.0.costume', '🐱')
                    ->where('workspace.stage.stamps.0.layer', 2)
                    ->etc()
                )
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
