<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\ExplainBlockScriptRequest;
use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\BlockCoding\Services\BlockScriptExplainService;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;

class BlockScriptExplainController extends Controller
{
    public function __construct(
        private BlockScriptExplainService $explainer,
        private CurriculumCatalogService $catalog,
        private TenantContext $tenantContext,
    ) {}

    public function store(ExplainBlockScriptRequest $request, string $lessonSlug): JsonResponse
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before explaining scripts.');
        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');

        try {
            $result = $this->explainer->explainForLearner(
                $request->user()->id,
                $this->tenantContext->id(),
                $lessonSlug,
                $request->validated('script'),
                $request->validated('context'),
            );
        } catch (AiGatewayException) {
            return response()->json([
                'message' => 'Unable to explain this script right now. Try again in a moment.',
            ], 503);
        }

        return response()->json($result);
    }
}
