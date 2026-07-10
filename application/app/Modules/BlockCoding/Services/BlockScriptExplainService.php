<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Gateway\AiGateway;
use App\Modules\AI\Prompts\PromptRegistry;
use App\Modules\AI\Prompts\PromptRenderer;
use App\Modules\AI\Services\MentorContextBuilder;

class BlockScriptExplainService
{
    public function __construct(
        private AiGateway $gateway,
        private PromptRegistry $promptRegistry,
        private PromptRenderer $promptRenderer,
        private MentorContextBuilder $contextBuilder,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function explainForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        string $script,
        ?string $context = null,
    ): array {
        $lessonContext = $this->contextBuilder->build($context ?? '', $lessonSlug);

        $prompt = $this->promptRegistry->resolve('block_coding.script.explain');
        $rendered = $this->promptRenderer->render($prompt, [
            ...$lessonContext,
            'script' => trim($script),
            'context' => trim((string) $context),
        ]);

        $response = $this->gateway->complete(new AiRequest(
            taskType: 'block_script_explain',
            messages: [
                ['role' => 'system', 'content' => $rendered->system],
                ['role' => 'user', 'content' => $rendered->user],
            ],
            tenantId: $institutionId,
            userId: $userId,
            promptId: $rendered->prompt->identifier(),
            metadata: [
                'lesson_slug' => $lessonSlug,
                'context' => $lessonContext,
                'safety_rules' => $rendered->prompt->safetyRules,
            ],
        ));

        return [
            'explanation' => $response->content,
            'request_id' => $response->requestId,
            'provider' => $response->provider,
            'model' => $response->model,
            'prompt_id' => $rendered->prompt->identifier(),
        ];
    }
}
