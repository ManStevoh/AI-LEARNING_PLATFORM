<?php

namespace App\Modules\AI\Providers;

use App\Modules\AI\Contracts\AiProvider;
use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Data\AiResponse;
use App\Modules\AI\Enums\AiCapability;

class FakeAiProvider implements AiProvider
{
    public function name(): string
    {
        return 'fake';
    }

    public function supports(AiCapability $capability): bool
    {
        return $capability === AiCapability::Completion;
    }

    public function complete(AiRequest $request, string $requestId): AiResponse
    {
        $startedAt = hrtime(true);
        $userMessage = $this->latestUserMessage($request);
        $content = $this->buildMentorReply($request->taskType, $userMessage, $request->metadata);

        return new AiResponse(
            requestId: $requestId,
            provider: $this->name(),
            model: (string) config('ai.providers.fake.model', 'fake-mentor-v1'),
            content: $content,
            latencyMs: max(1, (int) ((hrtime(true) - $startedAt) / 1_000_000)),
            usage: [
                'prompt_tokens' => max(1, (int) (strlen($userMessage) / 4)),
                'completion_tokens' => max(1, (int) (strlen($content) / 4)),
            ],
            metadata: [
                'simulated' => true,
            ],
        );
    }

    /**
     * @param  array<string, mixed>  $metadata
     */
    private function buildMentorReply(string $taskType, string $userMessage, array $metadata): string
    {
        $lessonSlug = is_string($metadata['lesson_slug'] ?? null) ? $metadata['lesson_slug'] : null;
        $lessonHint = $lessonSlug ? " You are working in {$lessonSlug}." : '';

        return match ($taskType) {
            'learner_mentor_hint' => 'Try one small change at a time and watch the stage. '
                .'For your question, focus on the next block that moves you closer to the goal without giving away the full answer.'
                .$lessonHint,
            default => 'The ACE mentor is in sandbox mode. Describe what you tried and what you expected to happen.'
                .($userMessage !== '' ? " You asked: \"{$userMessage}\"." : ''),
        };
    }

    private function latestUserMessage(AiRequest $request): string
    {
        for ($index = count($request->messages) - 1; $index >= 0; $index--) {
            $message = $request->messages[$index];

            if (($message['role'] ?? null) === 'user') {
                return trim((string) ($message['content'] ?? ''));
            }
        }

        return '';
    }
}
