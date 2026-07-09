<?php

namespace Tests\Feature;

use App\Models\Institution;
use App\Models\User;
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
            'role' => 'teacher',
            'joined_at' => now(),
        ]);

        $this->assertTrue($user->institutions()->whereKey($institution)->exists());
        $this->assertSame('teacher', $institution->users()->firstOrFail()->pivot->role);
    }
}
