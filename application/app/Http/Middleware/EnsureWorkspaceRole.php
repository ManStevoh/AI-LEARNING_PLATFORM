<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureWorkspaceRole
{
    public function __construct(
        private TenantContext $tenantContext,
    ) {}

    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $currentRole = $this->tenantContext->role()?->value;

        if ($currentRole === null || ! in_array($currentRole, $roles, true)) {
            abort(403, 'You do not have access to this workspace.');
        }

        if (! $this->tenantContext->hasCurrent()) {
            return redirect()->route('institution.select');
        }

        return $next($request);
    }
}
