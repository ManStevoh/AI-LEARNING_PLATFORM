<?php

namespace App\Modules\AI\Data;

final class AiResponse
{
    /**
     * @param  array<string, int>  $usage
     * @param  array<string, mixed>  $metadata
     */
    public function __construct(
        public readonly string $requestId,
        public readonly string $provider,
        public readonly string $model,
        public readonly string $content,
        public readonly int $latencyMs,
        public readonly array $usage = [],
        public readonly array $metadata = [],
    ) {}
}
