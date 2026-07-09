<?php

namespace App\Http\Middleware;

use App\Support\Navigation\WorkspaceNavigation;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $tenantContext = app(TenantContext::class);
        $role = $tenantContext->role();

        return [
            ...parent::share($request),
            'app' => [
                'name' => config('app.name', 'ACE Platform'),
                'environment' => app()->environment(),
            ],
            'auth' => [
                'user' => $request->user()?->only(['id', 'name', 'email']),
            ],
            'tenant' => [
                'institution' => $tenantContext->current()?->only(['id', 'name', 'slug']),
                'role' => $role?->value,
            ],
            'navigation' => [
                'primary' => WorkspaceNavigation::primary($role),
                'home' => WorkspaceNavigation::homeRoute($role),
            ],
        ];
    }
}
