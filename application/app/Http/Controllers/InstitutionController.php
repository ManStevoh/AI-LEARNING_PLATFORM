<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetActiveInstitutionRequest;
use App\Models\Institution;
use App\Models\User;
use App\Support\Audit\AuditAction;
use App\Support\Audit\AuditLogger;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InstitutionController extends Controller
{
    public function __construct(
        private TenantContext $tenantContext,
        private AuditLogger $auditLogger,
    ) {}

    public function select(Request $request): Response|RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $memberships = $this->membershipsForUser($user);

        if ($memberships->isEmpty()) {
            abort(403, 'This account is not linked to any institution.');
        }

        if ($memberships->count() === 1 && $this->tenantContext->hasCurrent()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Institution/Select', [
            'memberships' => $memberships,
            'activeInstitutionId' => $this->tenantContext->id(),
        ]);
    }

    public function show(Institution $institution): Response
    {
        $this->authorize('view', $institution);

        return Inertia::render('Institution/Show', [
            'institution' => [
                'id' => $institution->id,
                'name' => $institution->name,
                'slug' => $institution->slug,
                'country_code' => $institution->country_code,
                'status' => $institution->status,
            ],
        ]);
    }

    public function switchInstitution(SetActiveInstitutionRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();
        $institutionId = (int) $request->validated('institution_id');

        if (! $this->tenantContext->activateMembership($user, $institutionId)) {
            abort(403, 'You do not have access to that institution.');
        }

        $request->session()->put($this->tenantContext->sessionKey(), $institutionId);

        $this->auditLogger->record(
            AuditAction::TENANT_INSTITUTION_SWITCHED,
            $user,
            Institution::query()->find($institutionId),
            ['institution_id' => $institutionId],
            $request,
        );

        return redirect()->route('dashboard');
    }

    /**
     * @return \Illuminate\Support\Collection<int, array<string, mixed>>
     */
    private function membershipsForUser(User $user)
    {
        return $user->institutions()
            ->wherePivot('status', 'active')
            ->where('institutions.status', 'active')
            ->orderBy('institutions.name')
            ->get()
            ->map(fn (Institution $institution) => [
                'id' => $institution->id,
                'name' => $institution->name,
                'slug' => $institution->slug,
                'role' => $institution->pivot->role,
                'status' => $institution->pivot->status,
            ]);
    }
}
