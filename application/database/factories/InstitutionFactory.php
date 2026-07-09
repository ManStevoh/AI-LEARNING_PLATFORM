<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<\App\Models\Institution>
 */
class InstitutionFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->company().' School';

        return [
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(100, 999),
            'country_code' => 'KE',
            'status' => 'active',
            'settings' => [
                'curriculum_context' => 'kenya_cbc',
                'ai_enabled' => true,
            ],
        ];
    }
}
