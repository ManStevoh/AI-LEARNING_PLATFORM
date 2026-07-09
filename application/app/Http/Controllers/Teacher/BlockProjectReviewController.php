<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Modules\BlockCoding\Services\BlockProjectReviewService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class BlockProjectReviewController extends Controller
{
    public function __construct(
        private BlockProjectReviewService $reviewService,
        private TenantContext $tenantContext,
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
}
