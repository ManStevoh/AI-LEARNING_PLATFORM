<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Http\Requests\Teacher\SaveBlockProjectFeedbackRequest;
use App\Modules\BlockCoding\Services\BlockProjectFeedbackService;
use App\Modules\BlockCoding\Services\BlockProjectReviewService;
use App\Support\Audit\AuditAction;
use App\Support\Audit\AuditLogger;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class BlockProjectReviewController extends Controller
{
    public function __construct(
        private BlockProjectReviewService $reviewService,
        private BlockProjectFeedbackService $feedbackService,
        private TenantContext $tenantContext,
        private AuditLogger $auditLogger,
    ) {}

    public function index(): Response|HttpResponse
    {
        $institutionId = $this->tenantContext->id();

        abort_if($institutionId === null, 403, 'Select an institution before reviewing learner projects.');

        return Inertia::render('Teacher/BlockProjects/Index', [
            'projects' => $this->reviewService->listForInstitution($institutionId)->values()->all(),
        ]);
    }

    public function show(int $blockProject): Response|HttpResponse
    {
        $institutionId = $this->tenantContext->id();

        abort_if($institutionId === null, 403, 'Select an institution before reviewing learner projects.');

        $project = $this->reviewService->findForInstitution($institutionId, $blockProject);

        abort_if($project === null, 404, 'Learner project not found.');

        return Inertia::render('Teacher/BlockProjects/Show', [
            'project' => $this->reviewService->toReviewDetail($project),
        ]);
    }

    public function storeFeedback(SaveBlockProjectFeedbackRequest $request, int $blockProject): RedirectResponse
    {
        $institutionId = $this->tenantContext->id();

        abort_if($institutionId === null, 403, 'Select an institution before reviewing learner projects.');

        $project = $this->reviewService->findForInstitution($institutionId, $blockProject);

        abort_if($project === null, 404, 'Learner project not found.');

        $feedback = $this->feedbackService->saveForProject(
            $project,
            $request->user(),
            $institutionId,
            $request->validated('notes'),
        );

        $this->auditLogger->record(
            AuditAction::BLOCK_PROJECT_FEEDBACK_SAVED,
            $request->user(),
            $project,
            [
                'block_project_id' => $project->id,
                'feedback_id' => $feedback->id,
            ],
            $request,
        );

        return redirect()
            ->route('teacher.block-projects.show', $blockProject)
            ->with('feedbackSaved', true);
    }
}
