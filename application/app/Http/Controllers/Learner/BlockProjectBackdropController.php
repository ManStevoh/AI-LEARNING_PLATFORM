<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\UploadBlockProjectBackdropRequest;
use App\Modules\BlockCoding\Models\BlockProjectBackdrop;
use App\Modules\BlockCoding\Services\BlockProjectBackdropService;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlockProjectBackdropController extends Controller
{
    public function __construct(
        private BlockProjectBackdropService $backdrops,
        private CurriculumCatalogService $catalog,
        private TenantContext $tenantContext,
    ) {}

    public function index(string $lessonSlug): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);

        return response()->json([
            'backdrops' => $this->backdrops->listForLearner(
                request()->user()->id,
                $this->tenantContext->id(),
                $lessonSlug,
            ),
        ]);
    }

    public function store(UploadBlockProjectBackdropRequest $request, string $lessonSlug): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);

        $backdrop = $this->backdrops->storeForLearner(
            $request->user()->id,
            $this->tenantContext->id(),
            $lessonSlug,
            $request->file('file'),
            $request->validated('name'),
        );

        return response()->json([
            'backdrop' => $this->backdrops->toFrontendPayload($backdrop),
        ], 201);
    }

    public function image(string $lessonSlug, BlockProjectBackdrop $backdrop): StreamedResponse
    {
        $this->assertLessonContext($lessonSlug);
        $this->assertBackdropInTenant($backdrop);
        $this->authorize('view', $backdrop);
        abort_unless($backdrop->lesson_slug === $lessonSlug, 404, 'Backdrop not found for this lesson.');

        return $this->backdrops->streamImage($backdrop);
    }

    public function destroy(string $lessonSlug, BlockProjectBackdrop $backdrop): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);
        $this->assertBackdropInTenant($backdrop);
        $this->authorize('delete', $backdrop);
        abort_unless($backdrop->lesson_slug === $lessonSlug, 404, 'Backdrop not found for this lesson.');

        $this->backdrops->deleteForLearner($backdrop);

        return response()->json(['deleted' => true]);
    }

    private function assertLessonContext(string $lessonSlug): void
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before managing backdrops.');
        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');
    }

    private function assertBackdropInTenant(BlockProjectBackdrop $backdrop): void
    {
        abort_unless($backdrop->institution_id === $this->tenantContext->id(), 403, 'Backdrop is not available in this institution.');
    }
}
