<?php

namespace App\Http\Controllers;

use App\Enums\InstitutionRole;
use App\Support\Navigation\WorkspaceNavigation;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private TenantContext $tenantContext,
    ) {}

    public function __invoke(): Response|RedirectResponse
    {
        $role = $this->tenantContext->role();

        if ($role !== null) {
            return redirect(WorkspaceNavigation::homeRoute($role));
        }

        return Inertia::render('Dashboard/Hub');
    }

    public static function roleAllowsWorkspace(?InstitutionRole $role): bool
    {
        return $role !== null;
    }
}
