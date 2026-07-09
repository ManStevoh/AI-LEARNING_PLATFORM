<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\MentorAskRequest;
use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Gateway\AiGateway;
use App\Modules\AI\Prompts\PromptRegistry;
use App\Modules\AI\Prompts\PromptRenderer;
use App\Modules\AI\Services\MentorContextBuilder;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;

class MentorController extends Controller
{
    public function __construct(
        private AiGateway $gateway,
        private TenantContext $tenantContext,
        private MentorContextBuilder $contextBuilder,
        private PromptRegistry $promptRegistry,
        private PromptRenderer $promptRenderer,
    ) {}

    public function ask(MentorAskRequest $request): JsonResponse
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before using the AI mentor.');

        $context = $this->contextBuilder->build(
            $request->validated('message'),
            $request->validated('lesson_slug'),
        );

        $prompt = $this->promptRegistry->resolve('learner.mentor.hint');
        $rendered = $this->promptRenderer->render($prompt, $context);

        $response = $this->gateway->complete(new AiRequest(
            taskType: 'learner_mentor_hint',
            messages: [
                ['role' => 'system', 'content' => $rendered->system],
                ['role' => 'user', 'content' => $rendered->user],
            ],
            tenantId: $this->tenantContext->id(),
            userId: $request->user()->id,
            promptId: $rendered->prompt->identifier(),
            metadata: [
                'lesson_slug' => $context['lesson_slug'] !== '' ? $context['lesson_slug'] : null,
                'context' => $context,
                'safety_rules' => $rendered->prompt->safetyRules,
            ],
        ));

        return response()->json([
            'reply' => $response->content,
            'request_id' => $response->requestId,
            'provider' => $response->provider,
            'model' => $response->model,
            'prompt_id' => $rendered->prompt->identifier(),
        ]);
    }
}
