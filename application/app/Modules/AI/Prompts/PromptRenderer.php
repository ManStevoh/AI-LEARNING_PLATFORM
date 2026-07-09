<?php

namespace App\Modules\AI\Prompts;

use App\Modules\AI\Data\PromptVersion;
use App\Modules\AI\Data\RenderedPrompt;

class PromptRenderer
{
    /**
     * @param  array<string, string>  $context
     */
    public function render(PromptVersion $prompt, array $context): RenderedPrompt
    {
        return new RenderedPrompt(
            prompt: $prompt,
            system: $this->replacePlaceholders($prompt->systemTemplate, $context),
            user: $this->replacePlaceholders($prompt->userTemplate, $context),
        );
    }

    /**
     * @param  array<string, string>  $context
     */
    private function replacePlaceholders(string $template, array $context): string
    {
        $replacements = [];

        foreach ($context as $key => $value) {
            $replacements['{{'.$key.'}}'] = $value;
        }

        return strtr($template, $replacements);
    }
}
