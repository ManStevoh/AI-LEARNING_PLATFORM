<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureInstitutionContext
{
    public function __construct(
        private TenantContext $tenantContext,
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        if (! $this->tenantContext->hasCurrent()) {
            if ($request->user()?->institutions()->exists()) {
                return redirect()->route('institution.select');
            }

            abort(403, 'No active institution context is available for this account.');
        }

        return $next($request);
    }
}
