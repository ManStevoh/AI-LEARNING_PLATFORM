<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Models\Institution;
use App\Models\User;
use App\Support\Tenancy\TenantContext;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InstitutionMembershipTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_belong_to_an_institution_with_a_role(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'joined_at' => now(),
        ]);

        $this->assertTrue($user->institutions()->whereKey($institution)->exists());
        $this->assertSame(InstitutionRole::Teacher->value, $institution->users()->firstOrFail()->pivot->role);
    }

    public function test_user_institution_role_helpers_are_tenant_scoped(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();
        $otherInstitution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'joined_at' => now(),
        ]);

        $this->assertTrue($user->belongsToInstitution($institution));
        $this->assertFalse($user->belongsToInstitution($otherInstitution));
        $this->assertTrue($user->hasInstitutionRole($institution, InstitutionRole::Teacher));
        $this->assertFalse($user->hasInstitutionRole($institution, InstitutionRole::InstitutionAdmin));
        $this->assertFalse($user->hasInstitutionRole($otherInstitution, InstitutionRole::Teacher));
        $this->assertTrue($institution->usersWithRole(InstitutionRole::Teacher)->whereKey($user)->exists());
    }

    public function test_tenant_context_tracks_current_institution_for_a_request_scope(): void
    {
        $institution = Institution::factory()->create();

        $tenantContext = app(TenantContext::class);

        $this->assertFalse($tenantContext->hasCurrent());

        $tenantContext->set($institution);

        $this->assertTrue($tenantContext->hasCurrent());
        $this->assertTrue($tenantContext->current()->is($institution));
        $this->assertSame($institution->id, $tenantContext->id());

        $tenantContext->clear();

        $this->assertFalse($tenantContext->hasCurrent());
        $this->assertNull($tenantContext->current());
    }
}
