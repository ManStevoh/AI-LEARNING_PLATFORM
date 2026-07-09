<?php

namespace Tests\Feature;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_without_institution_see_workspace_hub(): void
    {
        $user = User::factory()->create();

        $response = $this->withoutVite()
            ->actingAs($user)
            ->get('/dashboard');

        $response->assertOk();
        $response->assertInertia(fn (Assert $page) => $page->component('Dashboard/Hub'));
    }
}
