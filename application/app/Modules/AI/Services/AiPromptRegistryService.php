<?php

namespace App\Modules\AI\Services;

use App\Modules\AI\Data\PromptVersion;
use App\Modules\AI\Enums\PromptStatus;
use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\AI\Models\AiPrompt;
use App\Modules\AI\Models\AiPromptVersion;
use Illuminate\Support\Carbon;

class AiPromptRegistryService
{
    public function ensurePrompt(string $promptKey, string $name, string $purpose, string $owner = 'platform'): AiPrompt
    {
        return AiPrompt::query()->updateOrCreate(
            ['prompt_key' => $promptKey],
            [
                'name' => $name,
                'purpose' => $purpose,
                'owner' => $owner,
                'status' => PromptStatus::Active,
            ],
        );
    }

    /**
     * @param  array<string, mixed>  $definition
     */
    public function upsertDraftVersion(string $promptKey, string $version, array $definition): AiPromptVersion
    {
        $prompt = $this->ensurePrompt(
            $promptKey,
            (string) ($definition['name'] ?? $promptKey),
            (string) ($definition['purpose'] ?? ''),
        );

        $existing = AiPromptVersion::query()
            ->where('ai_prompt_id', $prompt->id)
            ->where('version', $version)
            ->first();

        if ($existing?->isPublished()) {
            throw new AiGatewayException("Prompt version [{$promptKey}@{$version}] is published and cannot be edited in place.");
        }

        return AiPromptVersion::query()->updateOrCreate(
            [
                'ai_prompt_id' => $prompt->id,
                'version' => $version,
            ],
            [
                'system_template' => (string) ($definition['system_template'] ?? ''),
                'developer_template' => $definition['developer_template'] ?? null,
                'user_template' => (string) ($definition['user_template'] ?? ''),
                'input_schema' => $definition['input_schema'] ?? null,
                'output_schema' => $definition['output_schema'] ?? null,
                'safety_rules' => $definition['safety_rules'] ?? [],
                'changelog' => $definition['changelog'] ?? null,
            ],
        );
    }

    public function publishVersion(string $promptKey, string $version, ?Carbon $publishedAt = null): AiPromptVersion
    {
        $record = AiPromptVersion::query()
            ->whereHas('prompt', fn ($query) => $query->where('prompt_key', $promptKey))
            ->where('version', $version)
            ->first();

        if ($record === null) {
            throw new AiGatewayException("Prompt version [{$promptKey}@{$version}] is not registered.");
        }

        if ($record->isPublished()) {
            return $record;
        }

        $record->published_at = $publishedAt ?? now();
        $record->save();

        return $record->fresh(['prompt']);
    }

    public function resolvePublished(string $promptKey, ?string $version = null): ?PromptVersion
    {
        $query = AiPromptVersion::query()
            ->whereHas('prompt', fn ($builder) => $builder
                ->where('prompt_key', $promptKey)
                ->where('status', PromptStatus::Active))
            ->whereNotNull('published_at')
            ->with('prompt');

        if ($version !== null) {
            $query->where('version', $version);
        } else {
            $query->orderByDesc('published_at')->orderByDesc('id');
        }

        $record = $query->first();

        if ($record === null) {
            return null;
        }

        return $this->toPromptVersion($record);
    }

    /**
     * @param  array<string, array<string, array<string, mixed>>>  $promptDefinitions
     */
    public function syncFromConfig(array $promptDefinitions, bool $publish = true): void
    {
        foreach ($promptDefinitions as $promptKey => $versions) {
            foreach ($versions as $version => $definition) {
                $record = $this->upsertDraftVersion($promptKey, (string) $version, $definition);

                if ($publish) {
                    $this->publishVersion($promptKey, $record->version);
                }
            }
        }
    }

    private function toPromptVersion(AiPromptVersion $record): PromptVersion
    {
        $prompt = $record->prompt;

        return new PromptVersion(
            key: $prompt->prompt_key,
            version: $record->version,
            name: $prompt->name,
            purpose: $prompt->purpose,
            systemTemplate: $record->system_template,
            userTemplate: $record->user_template,
            safetyRules: $record->safety_rules ?? [],
        );
    }
}
