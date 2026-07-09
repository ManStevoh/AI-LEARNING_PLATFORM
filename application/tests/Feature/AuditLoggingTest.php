<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\AuditLog;
use App\Models\Institution;
use App\Models\User;
use App\Support\Audit\AuditAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuditLoggingTest extends TestCase
{
    use RefreshDatabase;

    public function test_successful_login_is_audited(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ])->assertRedirect(route('dashboard', absolute: false));

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => AuditAction::AUTH_LOGIN,
            'institution_id' => null,
        ]);
    }

    public function test_logout_is_audited(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/logout')->assertRedirect('/');

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => AuditAction::AUTH_LOGOUT,
        ]);
    }

    public function test_institution_switch_is_audited_with_tenant_context(): void
    {
        $user = User::factory()->create();
        $first = Institution::factory()->create(['name' => 'First School']);
        $second = Institution::factory()->create(['name' => 'Second School']);

        foreach ([$first, $second] as $institution) {
            $institution->users()->attach($user, [
                'role' => InstitutionRole::Teacher->value,
                'status' => MembershipStatus::Active->value,
                'joined_at' => now(),
            ]);
        }

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ])->assertRedirect(route('dashboard', absolute: false));

        $log = AuditLog::query()->where('action', AuditAction::TENANT_INSTITUTION_SWITCHED)->first();

        $this->assertNotNull($log);
        $this->assertSame($user->id, $log->user_id);
        $this->assertSame($second->id, $log->institution_id);
        $this->assertSame($second->id, $log->subject_id);
        $this->assertSame(Institution::class, $log->subject_type);
    }

    public function test_failed_institution_switch_is_not_audited(): void
    {
        $user = User::factory()->create();
        $ownInstitution = Institution::factory()->create();
        $foreignInstitution = Institution::factory()->create();

        $ownInstitution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $foreignInstitution->id,
        ])->assertForbidden();

        $this->assertDatabaseCount('audit_logs', 0);
    }
}
