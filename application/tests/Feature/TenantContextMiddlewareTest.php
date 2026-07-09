<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Support\Tenancy\TenantContext;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantContextMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_single_active_membership_is_auto_selected_for_authenticated_requests(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertOk();
        $this->assertTrue(app(TenantContext::class)->hasCurrent());
        $this->assertSame($institution->id, session('active_institution_id'));
    }

    public function test_user_can_switch_to_a_valid_institution(): void
    {
        $user = User::factory()->create();
        $first = Institution::factory()->create(['name' => 'First School']);
        $second = Institution::factory()->create(['name' => 'Second School']);

        $first->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $second->users()->attach($user, [
            'role' => InstitutionRole::Learner->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $second->id,
        ]);

        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertSame($second->id, session('active_institution_id'));
        $this->assertTrue(app(TenantContext::class)->current()->is($second));
    }

    public function test_user_cannot_switch_to_an_institution_they_do_not_belong_to(): void
    {
        $user = User::factory()->create();
        $ownInstitution = Institution::factory()->create();
        $foreignInstitution = Institution::factory()->create();

        $ownInstitution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $foreignInstitution->id,
        ]);

        $response->assertForbidden();
    }

    public function test_suspended_membership_cannot_be_activated(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Suspended->value,
            'joined_at' => now(),
        ]);

        $response = $this->actingAs($user)->post('/institution/switch', [
            'institution_id' => $institution->id,
        ]);

        $response->assertForbidden();
        $this->assertFalse(app(TenantContext::class)->hasCurrent());
    }
}
