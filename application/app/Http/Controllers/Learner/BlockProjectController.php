<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\SaveBlockProjectRequest;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;

class BlockProjectController extends Controller
{
    public function __construct(
        private BlockProjectPersistenceService $persistence,
        private CurriculumCatalogService $catalog,
        private TenantContext $tenantContext,
    ) {}

    public function store(SaveBlockProjectRequest $request, string $lessonSlug): JsonResponse
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before saving your project.');

        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');

        $project = $this->persistence->saveForLearner(
            $request->user()->id,
            $this->tenantContext->id(),
            $lessonSlug,
            $request->validated('workspace'),
            $request->validated('generated_code'),
        );

        return response()->json([
            'saved_project' => $this->persistence->toFrontendPayload($project),
        ]);
    }
}
