<?php

namespace App\Providers;

use App\Support\Audit\AuditLogger;
use App\Support\Tenancy\TenantContext;
use App\Modules\AI\Gateway\AiGateway;
use App\Modules\AI\Gateway\ProviderRouter;
use App\Modules\AI\Providers\FakeAiProvider;
use App\Modules\AI\Services\AiUsageLogger;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(TenantContext::class);
        $this->app->singleton(AuditLogger::class);
        $this->app->singleton(FakeAiProvider::class);
        $this->app->singleton(ProviderRouter::class);
        $this->app->singleton(AiUsageLogger::class);
        $this->app->singleton(AiGateway::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
