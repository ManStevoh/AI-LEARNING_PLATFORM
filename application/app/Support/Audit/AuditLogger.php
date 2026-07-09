<?php

namespace App\Support\Audit;

use App\Models\AuditLog;
use App\Models\User;
use App\Support\Tenancy\TenantContext;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class AuditLogger
{
    public function __construct(
        private TenantContext $tenantContext,
    ) {}

    /**
     * @param  array<string, mixed>  $metadata
     */
    public function record(
        string $action,
        ?User $user = null,
        ?Model $subject = null,
        array $metadata = [],
        ?Request $request = null,
    ): AuditLog {
        $request ??= request();

        return AuditLog::query()->create([
            'institution_id' => $this->tenantContext->id(),
            'user_id' => $user?->id,
            'action' => $action,
            'subject_type' => $subject?->getMorphClass(),
            'subject_id' => $subject?->getKey(),
            'metadata' => $metadata === [] ? null : $metadata,
            'ip_address' => $request?->ip(),
            'user_agent' => $request?->userAgent(),
        ]);
    }
}
