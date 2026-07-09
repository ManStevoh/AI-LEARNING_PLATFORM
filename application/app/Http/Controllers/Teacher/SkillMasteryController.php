<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Modules\Curriculum\Services\TeacherSkillMasteryService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillMasteryController extends Controller
{
    public function __construct(
        private TeacherSkillMasteryService $skillMasteryService,
        private TenantContext $tenantContext,
    ) {}

    public function index(): Response|HttpResponse
    {
        $institutionId = $this->tenantContext->id();

        abort_if($institutionId === null, 403, 'Select an institution before viewing skill mastery.');

        return Inertia::render('Teacher/SkillMastery/Index', $this->skillMasteryService->getOverview($institutionId));
    }
}
