<?php

namespace App\Modules\BlockCoding\Support;

use InvalidArgumentException;

class AiBackdropSvgSanitizer
{
    private const MAX_BYTES = 120_000;

    public function sanitize(string $svg): string
    {
        $trimmed = trim($svg);

        if ($trimmed === '') {
            throw new InvalidArgumentException('AI backdrop SVG was empty.');
        }

        if (strlen($trimmed) > self::MAX_BYTES) {
            throw new InvalidArgumentException('AI backdrop SVG exceeded the size limit.');
        }

        if (! str_contains($trimmed, '<svg') || ! str_contains($trimmed, '</svg>')) {
            throw new InvalidArgumentException('AI backdrop response must be a complete SVG document.');
        }

        $lower = strtolower($trimmed);

        foreach (['<script', 'javascript:', 'onload=', 'onerror=', '<iframe', '<foreignobject', 'data:text/html'] as $needle) {
            if (str_contains($lower, $needle)) {
                throw new InvalidArgumentException('AI backdrop SVG contained disallowed content.');
            }
        }

        if (preg_match('/xlink:href\s*=\s*["\']https?:/i', $trimmed) === 1) {
            throw new InvalidArgumentException('AI backdrop SVG cannot reference external URLs.');
        }

        return $trimmed;
    }
}
