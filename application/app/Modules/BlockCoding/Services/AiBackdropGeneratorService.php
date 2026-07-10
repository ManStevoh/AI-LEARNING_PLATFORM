<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Gateway\AiGateway;
use App\Modules\AI\Prompts\PromptRegistry;
use App\Modules\AI\Prompts\PromptRenderer;
use App\Modules\BlockCoding\Models\BlockProjectBackdrop;
use App\Modules\BlockCoding\Support\AiBackdropSvgSanitizer;
use App\Modules\BlockCoding\Support\AiBackdropThemeCatalog;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use InvalidArgumentException;

class AiBackdropGeneratorService
{
    public function __construct(
        private AiGateway $gateway,
        private PromptRegistry $promptRegistry,
        private PromptRenderer $promptRenderer,
        private BlockProjectBackdropService $backdrops,
        private AiBackdropSvgSanitizer $sanitizer,
        private CurriculumCatalogService $catalog,
    ) {}

    public function generateForLearner(
        int $userId,
        int $institutionId,
        string $lessonSlug,
        string $theme,
    ): array {
        if (! AiBackdropThemeCatalog::isAllowed($theme)) {
            throw new InvalidArgumentException('Unsupported backdrop theme.');
        }

        $lesson = $this->catalog->getPublishedLessonDetail($lessonSlug);
        $themeMeta = AiBackdropThemeCatalog::get($theme);

        $prompt = $this->promptRegistry->resolve('block_coding.backdrop.generate');
        $rendered = $this->promptRenderer->render($prompt, [
            'lesson_title' => $lesson['title'] ?? 'Coding studio',
            'lesson_slug' => $lessonSlug,
            'theme' => $theme,
            'theme_label' => $themeMeta['label'] ?? $theme,
        ]);

        $response = $this->gateway->complete(new AiRequest(
            taskType: 'block_coding_backdrop_generate',
            messages: [
                ['role' => 'system', 'content' => $rendered->system],
                ['role' => 'user', 'content' => $rendered->user],
            ],
            tenantId: $institutionId,
            userId: $userId,
            promptId: $rendered->prompt->identifier(),
            metadata: [
                'lesson_slug' => $lessonSlug,
                'theme' => $theme,
                'safety_rules' => $rendered->prompt->safetyRules,
            ],
        ));

        $svg = $this->sanitizer->sanitize($response->content);

        $backdrop = $this->backdrops->storeSvgForLearner(
            $userId,
            $institutionId,
            $lessonSlug,
            $svg,
            'AI '.$themeMeta['label'],
        );

        return [
            'backdrop' => $this->backdrops->toFrontendPayload($backdrop),
            'theme' => $theme,
            'request_id' => $response->requestId,
            'provider' => $response->provider,
            'prompt_id' => $rendered->prompt->identifier(),
            'color' => $themeMeta['color'] ?? '#dbeafe',
        ];
    }
}
