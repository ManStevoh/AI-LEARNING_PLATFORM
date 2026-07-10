<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\AuditLog;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Services\InstitutionBlockPackService;
use App\Support\Audit\AuditAction;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InstitutionBlockPackTest extends TestCase
{
    use RefreshDatabase;

    public function test_institution_admin_can_update_own_block_packs(): void
    {
        $admin = $this->createInstitutionAdmin();
        $institution = $admin->institutions()->firstOrFail();

        $this->actingAs($admin)->patch(route('institutions.block-packs.update', $institution), [
            'enabled_packs' => [
                InstitutionBlockPackService::PACK_ACE_AI,
                InstitutionBlockPackService::PACK_ACE_CURRICULUM,
            ],
        ])->assertRedirect()
            ->assertSessionHas('blockPacksUpdated', true);

        $institution->refresh();

        $this->assertSame([
            InstitutionBlockPackService::PACK_ACE_AI,
            InstitutionBlockPackService::PACK_ACE_CURRICULUM,
        ], $institution->settings['block_coding']['enabled_packs']);

        $this->assertSame('kenya_cbc', $institution->settings['curriculum_context']);
        $this->assertTrue($institution->settings['ai_enabled']);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $admin->id,
            'institution_id' => $institution->id,
            'action' => AuditAction::INSTITUTION_BLOCK_PACKS_UPDATED,
        ]);
    }

    public function test_teacher_cannot_update_block_packs(): void
    {
        $teacher = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($teacher, $institution, InstitutionRole::Teacher);

        $this->actingAs($teacher)->patch(route('institutions.block-packs.update', $institution), [
            'enabled_packs' => [InstitutionBlockPackService::PACK_ACE_AI],
        ])->assertForbidden();

        $institution->refresh();

        $this->assertArrayNotHasKey('block_coding', $institution->settings ?? []);
        $this->assertSame(0, AuditLog::query()->where('action', AuditAction::INSTITUTION_BLOCK_PACKS_UPDATED)->count());
    }

    public function test_institution_admin_cannot_update_another_institution(): void
    {
        $admin = $this->createInstitutionAdmin();
        $otherInstitution = Institution::factory()->create();

        $this->actingAs($admin)->patch(route('institutions.block-packs.update', $otherInstitution), [
            'enabled_packs' => [InstitutionBlockPackService::PACK_ACE_AI],
        ])->assertForbidden();

        $otherInstitution->refresh();

        $this->assertArrayNotHasKey('block_coding', $otherInstitution->settings ?? []);
    }

    public function test_invalid_pack_id_is_rejected(): void
    {
        $admin = $this->createInstitutionAdmin();
        $institution = $admin->institutions()->firstOrFail();

        $this->actingAs($admin)->patch(route('institutions.block-packs.update', $institution), [
            'enabled_packs' => ['ace_unknown_pack'],
        ])->assertSessionHasErrors('enabled_packs.0');

        $institution->refresh();

        $this->assertArrayNotHasKey('block_coding', $institution->settings ?? []);
    }

    public function test_explicit_empty_enabled_packs_persists(): void
    {
        $admin = $this->createInstitutionAdmin();
        $institution = $admin->institutions()->firstOrFail();

        $this->actingAs($admin)->patch(route('institutions.block-packs.update', $institution), [
            'enabled_packs' => [],
        ])->assertRedirect()
            ->assertSessionHas('blockPacksUpdated', true);

        $institution->refresh();

        $this->assertSame([], $institution->settings['block_coding']['enabled_packs'] ?? null);
        $this->assertSame([], app(InstitutionBlockPackService::class)->enabledPackIds($institution));
    }

    public function test_learner_lesson_workspace_receives_current_tenant_enabled_packs(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create([
            'settings' => [
                'block_coding' => [
                    'enabled_packs' => [InstitutionBlockPackService::PACK_ACE_AI],
                ],
            ],
        ]);
        $this->attachMember($user, $institution, InstitutionRole::Learner);

        $this->withoutVite()->actingAs($user)->get('/learner/learn/unit-01-meet-the-coding-studio')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Learner/Lesson')
                ->where('workspace.enabled_block_packs', [InstitutionBlockPackService::PACK_ACE_AI])
            );
    }

    public function test_absent_block_pack_setting_defaults_to_all_enabled(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $this->attachMember($user, $institution, InstitutionRole::Learner);

        $this->withoutVite()->actingAs($user)->get('/learner/learn/unit-01-meet-the-coding-studio')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Learner/Lesson')
                ->where('workspace.enabled_block_packs', InstitutionBlockPackService::catalogPackIds())
            );
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
