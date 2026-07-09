<?php

namespace App\Providers;

use App\Support\Audit\AuditLogger;
use App\Support\Tenancy\TenantContext;
use App\Modules\AI\Gateway\AiGateway;
use App\Modules\AI\Gateway\ProviderRouter;
use App\Modules\AI\Prompts\PromptRegistry;
use App\Modules\AI\Prompts\PromptRenderer;
use App\Modules\AI\Providers\FakeAiProvider;
use App\Modules\AI\Services\AiPromptManagementService;
use App\Modules\AI\Services\AiPromptRegistryService;
use App\Modules\AI\Services\AiUsageLogger;
use App\Modules\Curriculum\Services\TeacherClassOverviewService;
use App\Modules\AI\Services\MentorContextBuilder;
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
        $this->app->singleton(AiPromptRegistryService::class);
        $this->app->singleton(AiPromptManagementService::class);
        $this->app->singleton(PromptRegistry::class);
        $this->app->singleton(PromptRenderer::class);
        $this->app->singleton(MentorContextBuilder::class);
        $this->app->singleton(TeacherClassOverviewService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
