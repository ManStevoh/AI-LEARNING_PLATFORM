<?php

namespace App\Http\Controllers\Institution;

use App\Http\Controllers\Controller;
use App\Http\Requests\Institution\UpdateBlockPacksRequest;
use App\Models\Institution;
use App\Modules\BlockCoding\Services\InstitutionBlockPackService;
use App\Support\Audit\AuditAction;
use App\Support\Audit\AuditLogger;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\RedirectResponse;

class InstitutionBlockPackController extends Controller
{
    public function __construct(
        private InstitutionBlockPackService $blockPackService,
        private TenantContext $tenantContext,
        private AuditLogger $auditLogger,
    ) {}

    public function update(UpdateBlockPacksRequest $request, Institution $institution): RedirectResponse
    {
        abort_unless(
            $this->tenantContext->id() === $institution->id,
            403,
            'You can only update block packs for your active institution.',
        );

        $previousEnabledPacks = $this->blockPackService->enabledPackIds($institution);

        $institution = $this->blockPackService->updateEnabledPacks(
            $institution,
            $request->validated('enabled_packs'),
        );

        $this->auditLogger->record(
            AuditAction::INSTITUTION_BLOCK_PACKS_UPDATED,
            $request->user(),
            $institution,
            [
                'previous_enabled_packs' => $previousEnabledPacks,
                'enabled_packs' => $this->blockPackService->enabledPackIds($institution),
            ],
            $request,
        );

        return redirect()->back()->with('blockPacksUpdated', true);
    }
}
