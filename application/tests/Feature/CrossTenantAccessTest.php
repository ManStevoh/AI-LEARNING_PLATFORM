<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CrossTenantAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_view_another_institution_they_are_not_a_member_of(): void
    {
        $user = User::factory()->create();
        $memberInstitution = Institution::factory()->create();
        $foreignInstitution = Institution::factory()->create();

        $memberInstitution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/institutions/'.$foreignInstitution->id);

        $response->assertForbidden();
    }

    public function test_user_can_view_their_own_institution(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $response = $this->withoutVite()
            ->actingAs($user)
            ->get('/institutions/'.$institution->id);

        $response->assertOk();
    }
}
