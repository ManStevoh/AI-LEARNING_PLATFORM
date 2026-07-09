<?php

namespace App\Modules\AI\Data;

final class PromptVersion
{
    /**
     * @param  list<string>  $safetyRules
     */
    public function __construct(
        public readonly string $key,
        public readonly string $version,
        public readonly string $name,
        public readonly string $purpose,
        public readonly string $systemTemplate,
        public readonly string $userTemplate,
        public readonly array $safetyRules = [],
    ) {}

    public function identifier(): string
    {
        return "{$this->key}@{$this->version}";
    }
}
