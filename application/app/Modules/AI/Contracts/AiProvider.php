<?php

namespace App\Modules\AI\Contracts;

use App\Modules\AI\Data\AiRequest;
use App\Modules\AI\Data\AiResponse;
use App\Modules\AI\Enums\AiCapability;

interface AiProvider
{
    public function name(): string;

    public function supports(AiCapability $capability): bool;

    public function complete(AiRequest $request, string $requestId): AiResponse;
}
