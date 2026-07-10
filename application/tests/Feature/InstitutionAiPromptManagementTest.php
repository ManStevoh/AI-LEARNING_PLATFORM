<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\AuditLog;
use App\Models\Institution;
use App\Models\User;
use App\Modules\AI\Models\AiPrompt;
use App\Modules\AI\Models\AiPromptVersion;
use App\Modules\AI\Prompts\PromptRegistry;
use App\Support\Audit\AuditAction;
use Database\Seeders\AiPromptFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InstitutionAiPromptManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_institution_admin_can_view_prompt_registry(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $admin = $this->createInstitutionAdmin();

        $this->withoutVite()->actingAs($admin)->get('/institution/prompts')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Institution/Prompts/Index')
                ->has('prompts', 2)
                ->where('prompts', fn ($prompts) => collect($prompts)->pluck('prompt_key')->sort()->values()->all() === [
                    'block_coding.backdrop.generate',
                    'learner.mentor.hint',
                ])
            );
    }

    public function test_institution_admin_can_view_prompt_detail(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $admin = $this->createInstitutionAdmin();
        $prompt = AiPrompt::query()->where('prompt_key', 'learner.mentor.hint')->firstOrFail();

        $this->withoutVite()->actingAs($admin)->get("/institution/prompts/{$prompt->id}")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Institution/Prompts/Show')
                ->where('prompt.prompt_key', 'learner.mentor.hint')
                ->where('prompt.suggested_next_version', 'v2')
                ->has('prompt.versions', 1)
            );
    }

    public function test_institution_admin_can_save_and_publish_prompt_draft(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $admin = $this->createInstitutionAdmin();
        $prompt = AiPrompt::query()->where('prompt_key', 'learner.mentor.hint')->firstOrFail();

        $this->actingAs($admin)->post("/institution/prompts/{$prompt->id}/versions", [
            'version' => 'v2',
            'system_template' => 'You are ACE mentor v2.',
            'user_template' => 'Question: {{user_message}}',
            'safety_rules' => ['child_safe', 'no_full_solution'],
            'changelog' => 'Tightened mentor guidance.',
        ])->assertRedirect(route('institution.prompts.show', $prompt));

        $this->assertDatabaseHas('ai_prompt_versions', [
            'ai_prompt_id' => $prompt->id,
            'version' => 'v2',
            'system_template' => 'You are ACE mentor v2.',
            'published_at' => null,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $admin->id,
            'action' => AuditAction::AI_PROMPT_DRAFT_SAVED,
        ]);

        $this->actingAs($admin)->post("/institution/prompts/{$prompt->id}/versions/v2/publish")
            ->assertRedirect(route('institution.prompts.show', $prompt));

        $draft = AiPromptVersion::query()
            ->where('ai_prompt_id', $prompt->id)
            ->where('version', 'v2')
            ->firstOrFail();

        $this->assertNotNull($draft->published_at);

        $resolved = app(PromptRegistry::class)->resolve('learner.mentor.hint');
        $this->assertSame('v2', $resolved->version);
        $this->assertSame('You are ACE mentor v2.', $resolved->systemTemplate);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $admin->id,
            'action' => AuditAction::AI_PROMPT_VERSION_PUBLISHED,
        ]);
    }

    public function test_teacher_cannot_access_prompt_management(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $teacher = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);

        $this->actingAs($teacher)->get('/institution/prompts')->assertForbidden();
    }

    public function test_draft_save_requires_templates(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $admin = $this->createInstitutionAdmin();
        $prompt = AiPrompt::query()->where('prompt_key', 'learner.mentor.hint')->firstOrFail();

        $this->withoutExceptionHandling();
        $this->expectException(ValidationException::class);

        $this->actingAs($admin)->post("/institution/prompts/{$prompt->id}/versions", [
            'version' => 'v2',
            'system_template' => '',
            'user_template' => '',
        ]);
    }

    public function test_published_prompt_versions_cannot_be_edited_in_place(): void
    {
        $this->seed(AiPromptFoundationSeeder::class);

        $admin = $this->createInstitutionAdmin();
        $prompt = AiPrompt::query()->where('prompt_key', 'learner.mentor.hint')->firstOrFail();

        $this->actingAs($admin)->post("/institution/prompts/{$prompt->id}/versions", [
            'version' => 'v1',
            'system_template' => 'Attempted overwrite.',
            'user_template' => '{{user_message}}',
            'safety_rules' => ['child_safe'],
        ])->assertRedirect(route('institution.prompts.show', $prompt))
            ->assertSessionHasErrors('version');

        $this->assertSame(0, AuditLog::query()->where('action', AuditAction::AI_PROMPT_DRAFT_SAVED)->count());
    }

    private function createInstitutionAdmin(): User
    {
        $admin = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($admin, $institution, InstitutionRole::InstitutionAdmin);

        return $admin;
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
