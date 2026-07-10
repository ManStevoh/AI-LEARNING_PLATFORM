<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\MarkLessonCheckpointRequest;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Modules\Curriculum\Services\LearnerLessonCheckpointService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;

class LessonCheckpointController extends Controller
{
    public function __construct(
        private LearnerLessonCheckpointService $checkpoints,
        private CurriculumCatalogService $catalog,
        private TenantContext $tenantContext,
    ) {}

    public function store(MarkLessonCheckpointRequest $request, string $lessonSlug): JsonResponse
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before saving lesson progress.');
        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');

        $checkpoint = $this->checkpoints->markComplete(
            $request->user()->id,
            $this->tenantContext->id(),
            $lessonSlug,
            $request->validated('step_key'),
        );

        return response()->json([
            'checkpoint' => $checkpoint,
        ]);
    }

    public function index(string $lessonSlug): JsonResponse
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before loading lesson progress.');
        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');

        return response()->json([
            'step_keys' => $this->checkpoints->listForLearner(
                request()->user()->id,
                $this->tenantContext->id(),
                $lessonSlug,
            ),
        ]);
    }
}
