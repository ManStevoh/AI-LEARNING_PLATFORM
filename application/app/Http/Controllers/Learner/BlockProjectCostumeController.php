<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\UploadBlockProjectCostumeRequest;
use App\Modules\BlockCoding\Models\BlockProjectCostume;
use App\Modules\BlockCoding\Services\BlockProjectCostumeService;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlockProjectCostumeController extends Controller
{
    public function __construct(
        private BlockProjectCostumeService $costumes,
        private CurriculumCatalogService $catalog,
        private TenantContext $tenantContext,
    ) {}

    public function index(string $lessonSlug): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);

        return response()->json([
            'costumes' => $this->costumes->listForLearner(
                request()->user()->id,
                $this->tenantContext->id(),
                $lessonSlug,
            ),
        ]);
    }

    public function store(UploadBlockProjectCostumeRequest $request, string $lessonSlug): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);

        $costume = $this->costumes->storeForLearner(
            $request->user()->id,
            $this->tenantContext->id(),
            $lessonSlug,
            $request->file('file'),
            $request->validated('name'),
        );

        return response()->json([
            'costume' => $this->costumes->toFrontendPayload($costume),
        ], 201);
    }

    public function image(string $lessonSlug, BlockProjectCostume $costume): StreamedResponse
    {
        $this->assertLessonContext($lessonSlug);
        $this->assertCostumeInTenant($costume);
        $this->authorize('view', $costume);
        abort_unless($costume->lesson_slug === $lessonSlug, 404, 'Costume not found for this lesson.');

        return $this->costumes->streamImage($costume);
    }

    public function destroy(string $lessonSlug, BlockProjectCostume $costume): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);
        $this->assertCostumeInTenant($costume);
        $this->authorize('delete', $costume);
        abort_unless($costume->lesson_slug === $lessonSlug, 404, 'Costume not found for this lesson.');

        $this->costumes->deleteForLearner($costume);

        return response()->json(['deleted' => true]);
    }

    private function assertLessonContext(string $lessonSlug): void
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before managing costumes.');
        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');
    }

    private function assertCostumeInTenant(BlockProjectCostume $costume): void
    {
        abort_unless($costume->institution_id === $this->tenantContext->id(), 403, 'Costume is not available in this institution.');
    }
}
