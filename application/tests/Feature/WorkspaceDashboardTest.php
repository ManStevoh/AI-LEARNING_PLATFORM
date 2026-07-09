<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class WorkspaceDashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_redirects_teachers_to_teacher_workspace(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($user, $institution, InstitutionRole::Teacher);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertRedirect('/teacher');
    }

    public function test_teacher_can_view_teacher_dashboard(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($user, $institution, InstitutionRole::Teacher);

        $response = $this->withoutVite()->actingAs($user)->get('/teacher');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('Teacher/Dashboard')->has('metrics', 3));
    }

    public function test_learner_can_view_learner_dashboard(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($user, $institution, InstitutionRole::Learner);

        $response = $this->withoutVite()->actingAs($user)->get('/learner');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('Learner/Dashboard'));
    }

    public function test_institution_admin_can_view_institution_dashboard(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($user, $institution, InstitutionRole::InstitutionAdmin);

        $response = $this->withoutVite()->actingAs($user)->get('/institution/workspace');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('Institution/Dashboard'));
    }

    public function test_teacher_cannot_access_institution_workspace(): void
    {
        $user = User::factory()->create();
        $institution = Institution::factory()->create();

        $this->attachMember($user, $institution, InstitutionRole::Teacher);

        $response = $this->actingAs($user)->get('/institution/workspace');

        $response->assertForbidden();
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
