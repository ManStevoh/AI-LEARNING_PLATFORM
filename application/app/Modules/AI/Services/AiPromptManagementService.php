<?php

namespace App\Modules\AI\Services;

use App\Modules\AI\Models\AiPrompt;
use App\Modules\AI\Models\AiPromptVersion;
use Illuminate\Support\Collection;

class AiPromptManagementService
{
    public function __construct(
        private AiPromptRegistryService $registryService,
    ) {}

    /**
     * @return list<array<string, mixed>>
     */
    public function listSummaries(): array
    {
        return AiPrompt::query()
            ->withCount([
                'versions',
                'versions as published_versions_count' => fn ($query) => $query->whereNotNull('published_at'),
            ])
            ->with('latestPublishedVersion')
            ->orderBy('prompt_key')
            ->get()
            ->map(fn (AiPrompt $prompt) => [
                'id' => $prompt->id,
                'prompt_key' => $prompt->prompt_key,
                'name' => $prompt->name,
                'purpose' => $prompt->purpose,
                'status' => $prompt->status->value,
                'version_count' => $prompt->versions_count,
                'published_version_count' => $prompt->published_versions_count,
                'latest_published_version' => $prompt->latestPublishedVersion?->version,
                'latest_published_at' => $prompt->latestPublishedVersion?->published_at?->toIso8601String(),
            ])
            ->values()
            ->all();
    }

    /**
     * @return array<string, mixed>
     */
    public function toDetail(AiPrompt $prompt): array
    {
        $prompt->load([
            'versions' => fn ($query) => $query->orderByDesc('published_at')->orderByDesc('id'),
        ]);

        $latestPublished = $prompt->versions->first(fn (AiPromptVersion $version) => $version->isPublished());

        return [
            'id' => $prompt->id,
            'prompt_key' => $prompt->prompt_key,
            'name' => $prompt->name,
            'purpose' => $prompt->purpose,
            'status' => $prompt->status->value,
            'suggested_next_version' => $this->suggestNextVersion($prompt),
            'latest_published' => $latestPublished === null ? null : $this->toVersionDetail($latestPublished),
            'versions' => $prompt->versions
                ->map(fn (AiPromptVersion $version) => $this->toVersionDetail($version))
                ->values()
                ->all(),
        ];
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    public function saveDraft(AiPrompt $prompt, string $version, array $payload): AiPromptVersion
    {
        return $this->registryService->upsertDraftVersion($prompt->prompt_key, $version, [
            'name' => $prompt->name,
            'purpose' => $prompt->purpose,
            'system_template' => $payload['system_template'],
            'user_template' => $payload['user_template'],
            'safety_rules' => $payload['safety_rules'],
            'changelog' => $payload['changelog'] ?? null,
        ]);
    }

    public function publish(AiPrompt $prompt, string $version): AiPromptVersion
    {
        return $this->registryService->publishVersion($prompt->prompt_key, $version);
    }

    public function suggestNextVersion(AiPrompt $prompt): string
    {
        $latestNumericVersion = AiPromptVersion::query()
            ->where('ai_prompt_id', $prompt->id)
            ->pluck('version')
            ->map(fn (string $version) => $this->parseVersionNumber($version))
            ->filter()
            ->max();

        $nextNumber = ($latestNumericVersion ?? 0) + 1;

        return 'v'.$nextNumber;
    }

    /**
     * @return array<string, mixed>
     */
    private function toVersionDetail(AiPromptVersion $version): array
    {
        return [
            'version' => $version->version,
            'is_published' => $version->isPublished(),
            'published_at' => $version->published_at?->toIso8601String(),
            'system_template' => $version->system_template,
            'user_template' => $version->user_template,
            'safety_rules' => $version->safety_rules ?? [],
            'changelog' => $version->changelog,
            'updated_at' => $version->updated_at?->toIso8601String(),
        ];
    }

    private function parseVersionNumber(string $version): ?int
    {
        if (! preg_match('/^v(\d+)$/', $version, $matches)) {
            return null;
        }

        return (int) $matches[1];
    }
}
