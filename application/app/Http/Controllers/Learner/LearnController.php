<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Modules\BlockCoding\Services\BlockProjectPersistenceService;
use App\Modules\BlockCoding\Services\BlockStarterProjectService;
use App\Modules\BlockCoding\Services\BlockWorkspaceShellService;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearnController extends Controller
{
    public function __construct(
        private CurriculumCatalogService $catalog,
        private BlockWorkspaceShellService $workspaceShell,
        private BlockProjectPersistenceService $projectPersistence,
        private BlockStarterProjectService $starterProjects,
        private TenantContext $tenantContext,
    ) {}

    public function index(): Response
    {
        $course = $this->catalog->getPublishedCourseOutline('level-1-block-creator');

        abort_if($course === null, 404, 'Published learning path not found.');

        return Inertia::render('Learner/Learn', [
            'course' => $course,
        ]);
    }

    public function show(Request $request, string $lessonSlug): Response
    {
        $lesson = $this->catalog->getPublishedLessonDetail($lessonSlug);

        abort_if($lesson === null, 404, 'Published lesson not found.');

        $savedProject = null;

        if ($this->tenantContext->id() !== null) {
            $savedProject = $this->projectPersistence->toFrontendPayload(
                $this->projectPersistence->findForLearner(
                    $request->user()->id,
                    $this->tenantContext->id(),
                    $lessonSlug,
                ),
            );
        }

        return Inertia::render('Learner/Lesson', [
            'lesson' => $lesson,
            'workspace' => $this->workspaceShell->configForLesson($lesson),
            'savedProject' => $savedProject,
            'starterProject' => $savedProject === null
                ? $this->starterProjects->forLesson($lessonSlug)
                : null,
        ]);
    }
}
