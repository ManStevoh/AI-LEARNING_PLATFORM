<?php

namespace App\Modules\AI\Gateway;

use App\Modules\AI\Contracts\AiProvider;
use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\AI\Providers\FakeAiProvider;

class ProviderRouter
{
    public function resolve(?string $providerName = null): AiProvider
    {
        $name = $providerName ?? (string) config('ai.default_provider', 'fake');

        return match ($name) {
            'fake' => $this->resolveFakeProvider(),
            default => throw new AiGatewayException("Unsupported AI provider [{$name}]."),
        };
    }

    private function resolveFakeProvider(): AiProvider
    {
        if (! config('ai.providers.fake.enabled', false)) {
            throw new AiGatewayException('Fake AI provider is disabled.');
        }

        return app(FakeAiProvider::class);
    }
}
