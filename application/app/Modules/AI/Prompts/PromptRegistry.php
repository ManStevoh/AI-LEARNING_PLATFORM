<?php

namespace App\Modules\AI\Prompts;

use App\Modules\AI\Data\PromptVersion;
use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\AI\Services\AiPromptRegistryService;

class PromptRegistry
{
    public function __construct(
        private AiPromptRegistryService $registryService,
    ) {}

    public function resolve(string $promptKey, ?string $version = null): PromptVersion
    {
        $published = $this->registryService->resolvePublished($promptKey, $version);

        if ($published !== null) {
            return $published;
        }

        return $this->resolveFromConfig($promptKey, $version);
    }

    private function resolveFromConfig(string $promptKey, ?string $version): PromptVersion
    {
        $prompts = config('ai.prompts', []);

        if (! isset($prompts[$promptKey])) {
            throw new AiGatewayException("Prompt [{$promptKey}] is not registered.");
        }

        $version ??= array_key_first($prompts[$promptKey]);

        if ($version === null || ! isset($prompts[$promptKey][$version])) {
            throw new AiGatewayException("Prompt version [{$promptKey}@{$version}] is not registered.");
        }

        $definition = $prompts[$promptKey][$version];

        return new PromptVersion(
            key: $promptKey,
            version: $version,
            name: (string) ($definition['name'] ?? $promptKey),
            purpose: (string) ($definition['purpose'] ?? ''),
            systemTemplate: (string) ($definition['system_template'] ?? ''),
            userTemplate: (string) ($definition['user_template'] ?? ''),
            safetyRules: $definition['safety_rules'] ?? [],
        );
    }
}
