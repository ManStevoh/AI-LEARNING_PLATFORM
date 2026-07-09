<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Modules\Curriculum\Services\TeacherClassOverviewService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class ClassOverviewController extends Controller
{
    public function __construct(
        private TeacherClassOverviewService $classOverviewService,
        private TenantContext $tenantContext,
    ) {}

    public function index(): Response|HttpResponse
    {
        $institutionId = $this->tenantContext->id();

        abort_if($institutionId === null, 403, 'Select an institution before viewing class progress.');

        return Inertia::render('Teacher/ClassOverview/Index', $this->classOverviewService->getOverview($institutionId));
    }
}
