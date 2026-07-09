<?php

namespace Database\Seeders;

use App\Enums\InstitutionRole;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $institution = Institution::factory()->create([
            'name' => 'ACE Demo School',
            'slug' => 'ace-demo-school',
        ]);

        $institution->users()->attach($admin, [
            'role' => InstitutionRole::InstitutionAdmin->value,
            'joined_at' => now(),
        ]);
    }
}
