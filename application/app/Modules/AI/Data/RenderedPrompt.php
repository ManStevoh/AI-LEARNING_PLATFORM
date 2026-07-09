<?php

namespace App\Modules\AI\Data;

final class RenderedPrompt
{
    public function __construct(
        public readonly PromptVersion $prompt,
        public readonly string $system,
        public readonly string $user,
    ) {}
}
