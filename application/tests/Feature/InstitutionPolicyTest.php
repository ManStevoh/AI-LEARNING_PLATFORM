<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Policies\InstitutionPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InstitutionPolicyTest extends TestCase
{
    use RefreshDatabase;

    public function test_institution_admin_can_update_their_institution(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::InstitutionAdmin->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $policy = new InstitutionPolicy;

        $this->assertTrue($policy->view($user, $institution));
        $this->assertTrue($policy->update($user, $institution));
    }

    public function test_teacher_can_view_but_not_update_institution_settings(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $institution->users()->attach($user, [
            'role' => InstitutionRole::Teacher->value,
            'status' => MembershipStatus::Active->value,
            'joined_at' => now(),
        ]);

        $policy = new InstitutionPolicy;

        $this->assertTrue($policy->view($user, $institution));
        $this->assertFalse($policy->update($user, $institution));
    }
}
