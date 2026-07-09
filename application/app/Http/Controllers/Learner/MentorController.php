<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\MentorAskRequest;
use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Gateway\AiGateway;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;

class MentorController extends Controller
{
    public function __construct(
        private AiGateway $gateway,
        private TenantContext $tenantContext,
    ) {}

    public function ask(MentorAskRequest $request): JsonResponse
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before using the AI mentor.');

        $response = $this->gateway->complete(new AiRequest(
            taskType: 'learner_mentor_hint',
            messages: [
                ['role' => 'user', 'content' => $request->validated('message')],
            ],
            tenantId: $this->tenantContext->id(),
            userId: $request->user()->id,
            promptId: 'learner.mentor.hint.v1',
            metadata: array_filter([
                'lesson_slug' => $request->validated('lesson_slug'),
            ]),
        ));

        return response()->json([
            'reply' => $response->content,
            'request_id' => $response->requestId,
            'provider' => $response->provider,
            'model' => $response->model,
        ]);
    }
}
