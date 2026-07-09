<?php

namespace App\Modules\AI\Data;

final class AiRequest
{
    /**
     * @param  list<array{role: string, content: string}>  $messages
     * @param  array<string, mixed>  $metadata
     */
    public function __construct(
        public readonly string $taskType,
        public readonly array $messages,
        public readonly ?int $tenantId = null,
        public readonly ?int $userId = null,
        public readonly ?string $promptId = null,
        public readonly array $metadata = [],
        public readonly ?string $modelPreference = null,
    ) {}
}
