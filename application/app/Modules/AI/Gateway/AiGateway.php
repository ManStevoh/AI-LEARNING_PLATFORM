<?php

namespace App\Modules\AI\Gateway;

use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Data\AiResponse;
use App\Modules\AI\Enums\AiCapability;
use App\Modules\AI\Exceptions\AiGatewayException;
use App\Modules\AI\Services\AiUsageLogger;
use Illuminate\Support\Str;

class AiGateway
{
    public function __construct(
        private ProviderRouter $router,
        private AiUsageLogger $usageLogger,
    ) {}

    public function complete(AiRequest $request): AiResponse
    {
        $provider = $this->router->resolve($request->modelPreference);

        if (! $provider->supports(AiCapability::Completion)) {
            throw new AiGatewayException("Provider [{$provider->name()}] does not support completion.");
        }

        $requestId = (string) Str::uuid();

        try {
            $response = $provider->complete($request, $requestId);
            $this->usageLogger->log($request, $response);

            return $response;
        } catch (AiGatewayException $exception) {
            throw $exception;
        } catch (\Throwable $exception) {
            throw new AiGatewayException('AI Gateway request failed.', previous: $exception);
        }
    }
}
