<?php

namespace App\Modules\BlockCoding\Support;

class AiBackdropThemeCatalog
{
  /**
   * @return array<string, array{label: string, color: string}>
   */
    public static function themes(): array
    {
        return [
            'ocean' => ['label' => 'Ocean', 'color' => '#4fc3f7'],
            'space' => ['label' => 'Space', 'color' => '#1a1033'],
            'forest' => ['label' => 'Forest', 'color' => '#7ccd5b'],
            'desert' => ['label' => 'Desert', 'color' => '#f6c56b'],
            'candy' => ['label' => 'Candy Land', 'color' => '#fce7f3'],
            'city' => ['label' => 'City', 'color' => '#cfd8dc'],
            'sports' => ['label' => 'Sports', 'color' => '#66bb6a'],
            'fantasy' => ['label' => 'Fantasy', 'color' => '#b39ddb'],
        ];
    }

    public static function isAllowed(string $theme): bool
    {
        return array_key_exists($theme, self::themes());
    }

    /**
     * @return array{label: string, color: string}|null
     */
    public static function get(string $theme): ?array
    {
        return self::themes()[$theme] ?? null;
    }
}
