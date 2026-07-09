<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Modules\Curriculum\Services\TeacherClassOverviewService;
use App\Support\Tenancy\TenantContext;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private TeacherClassOverviewService $classOverviewService,
        private TenantContext $tenantContext,
    ) {}

    public function __invoke(): Response
    {
        $institutionId = $this->tenantContext->id();

        return Inertia::render('Teacher/Dashboard', [
            'metrics' => $institutionId === null
                ? $this->fallbackMetrics()
                : $this->classOverviewService->dashboardMetrics($institutionId),
        ]);
    }

    /**
     * @return list<array{label: string, value: string, hint: string}>
     */
    private function fallbackMetrics(): array
    {
        return [
            ['label' => 'Active learners', 'value' => '0', 'hint' => 'Select an institution'],
            ['label' => 'With saved projects', 'value' => '0', 'hint' => 'Learner activity pending'],
            ['label' => 'Needs attention', 'value' => '0', 'hint' => 'Monitor inactive learners'],
        ];
    }
}
