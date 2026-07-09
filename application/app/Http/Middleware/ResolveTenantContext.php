<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenantContext
{
    public function __construct(
        private TenantContext $tenantContext,
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user === null) {
            $this->tenantContext->clear();

            return $next($request);
        }

        $sessionInstitutionId = $request->session()->get($this->tenantContext->sessionKey());

        if (is_numeric($sessionInstitutionId)) {
            $resolved = $this->tenantContext->activateMembership($user, (int) $sessionInstitutionId);
        } else {
            $resolved = $this->tenantContext->resolveForUser($user);
        }

        if ($resolved && $this->tenantContext->id() !== null) {
            $request->session()->put(
                $this->tenantContext->sessionKey(),
                $this->tenantContext->id(),
            );
        }

        if (! $resolved) {
            $request->session()->forget($this->tenantContext->sessionKey());
        }

        return $next($request);
    }
}
