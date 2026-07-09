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
        $content = $this->buildMentorReply($request, $userMessage);

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
                'prompt_id' => $request->promptId,
            ],
        );
    }

    private function buildMentorReply(AiRequest $request, string $userMessage): string
    {
        /** @var array<string, string> $context */
        $context = is_array($request->metadata['context'] ?? null)
            ? $request->metadata['context']
            : [];

        $lessonTitle = $context['lesson_title'] ?? null;
        $skillNames = $context['skill_names'] ?? null;
        $lessonHint = $lessonTitle ? "In {$lessonTitle}, " : '';

        return match ($request->taskType) {
            'learner_mentor_hint' => $lessonHint
                .'try one small change at a time and watch the stage. '
                .($skillNames ? "Focus on skills like {$skillNames}. " : '')
                .'What is the next block that moves you closer to the goal without giving away the full answer?'
                .($userMessage !== '' ? " You asked about: \"{$this->extractQuestion($userMessage)}\"." : ''),
            default => 'The ACE mentor is in sandbox mode. Describe what you tried and what you expected to happen.'
                .($userMessage !== '' ? " You asked: \"{$userMessage}\"." : ''),
        };
    }

    private function extractQuestion(string $renderedUserMessage): string
    {
        if (preg_match('/Learner question:\s*(.+)$/s', $renderedUserMessage, $matches) === 1) {
            return trim($matches[1]);
        }

        return trim($renderedUserMessage);
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
