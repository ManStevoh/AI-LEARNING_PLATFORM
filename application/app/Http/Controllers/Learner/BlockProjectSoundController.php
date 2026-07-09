<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Http\Requests\Learner\UploadBlockProjectSoundRequest;
use App\Modules\BlockCoding\Models\BlockProjectSound;
use App\Modules\BlockCoding\Services\BlockProjectSoundService;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BlockProjectSoundController extends Controller
{
    public function __construct(
        private BlockProjectSoundService $sounds,
        private CurriculumCatalogService $catalog,
        private TenantContext $tenantContext,
    ) {}

    public function index(string $lessonSlug): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);

        return response()->json([
            'sounds' => $this->sounds->listForLearner(
                request()->user()->id,
                $this->tenantContext->id(),
                $lessonSlug,
            ),
        ]);
    }

    public function store(UploadBlockProjectSoundRequest $request, string $lessonSlug): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);

        $sound = $this->sounds->storeForLearner(
            $request->user()->id,
            $this->tenantContext->id(),
            $lessonSlug,
            $request->file('file'),
            $request->validated('name'),
        );

        return response()->json([
            'sound' => $this->sounds->toFrontendPayload($sound),
        ], 201);
    }

    public function audio(string $lessonSlug, BlockProjectSound $sound): StreamedResponse
    {
        $this->assertLessonContext($lessonSlug);
        $this->assertSoundInTenant($sound);
        $this->authorize('view', $sound);
        abort_unless($sound->lesson_slug === $lessonSlug, 404, 'Sound not found for this lesson.');

        return $this->sounds->streamAudio($sound);
    }

    public function destroy(string $lessonSlug, BlockProjectSound $sound): JsonResponse
    {
        $this->assertLessonContext($lessonSlug);
        $this->assertSoundInTenant($sound);
        $this->authorize('delete', $sound);
        abort_unless($sound->lesson_slug === $lessonSlug, 404, 'Sound not found for this lesson.');

        $this->sounds->deleteForLearner($sound);

        return response()->json(['deleted' => true]);
    }

    private function assertLessonContext(string $lessonSlug): void
    {
        abort_if($this->tenantContext->id() === null, 403, 'Select an institution before managing sounds.');
        abort_if($this->catalog->getPublishedLessonDetail($lessonSlug) === null, 404, 'Published lesson not found.');
    }

    private function assertSoundInTenant(BlockProjectSound $sound): void
    {
        abort_unless($sound->institution_id === $this->tenantContext->id(), 403, 'Sound is not available in this institution.');
    }
}
