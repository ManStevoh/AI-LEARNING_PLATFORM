<?php

namespace Database\Seeders;

use App\Modules\AI\Services\AiPromptRegistryService;
use Illuminate\Database\Seeder;

class AiPromptFoundationSeeder extends Seeder
{
    public function run(): void
    {
        app(AiPromptRegistryService::class)->syncFromConfig(
            config('ai.prompts', []),
            publish: true,
        );
    }
}
