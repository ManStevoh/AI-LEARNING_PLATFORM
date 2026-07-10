<?php

namespace App\Modules\BlockCoding\Services;

use App\Models\Institution;

class InstitutionBlockPackService
{
    public const PACK_ACE_AI = 'ace_ai';

    public const PACK_ACE_CURRICULUM = 'ace_curriculum';

    public const PACK_ACE_ROBOTICS = 'ace_robotics';

    private const SETTINGS_KEY = 'block_coding';

    private const ENABLED_PACKS_KEY = 'enabled_packs';

    /**
     * @return list<string>
     */
    public static function catalogPackIds(): array
    {
        return array_column((new self)->catalog(), 'id');
    }

    /**
     * @return list<array{id: string, label: string, description: string, owner: string, default_enabled: bool, rollout: string}>
     */
    public function catalog(): array
    {
        return [
            [
                'id' => self::PACK_ACE_AI,
                'label' => 'AI',
                'description' => 'AI-assisted script explanation blocks for learners.',
                'owner' => 'ace',
                'default_enabled' => true,
                'rollout' => 'Phase 4 optional pack; gates the AI toolbox category.',
            ],
            [
                'id' => self::PACK_ACE_CURRICULUM,
                'label' => 'Curriculum',
                'description' => 'Lesson checkpoint blocks tied to curriculum progress.',
                'owner' => 'ace',
                'default_enabled' => true,
                'rollout' => 'Phase 4 optional pack; gates the Curriculum toolbox category.',
            ],
            [
                'id' => self::PACK_ACE_ROBOTICS,
                'label' => 'Robotics',
                'description' => 'Robotics sensor blocks for hardware-oriented lessons.',
                'owner' => 'ace',
                'default_enabled' => true,
                'rollout' => 'Phase 4 optional pack; gates the Robotics toolbox category.',
            ],
        ];
    }

    /**
     * @return list<string>
     */
    public function enabledPackIds(?Institution $institution): array
    {
        if ($institution === null) {
            return self::catalogPackIds();
        }

        $settings = $institution->settings ?? [];
        $blockCoding = $settings[self::SETTINGS_KEY] ?? null;

        if (! is_array($blockCoding) || ! array_key_exists(self::ENABLED_PACKS_KEY, $blockCoding)) {
            return self::catalogPackIds();
        }

        $enabledPacks = $blockCoding[self::ENABLED_PACKS_KEY];

        if (! is_array($enabledPacks)) {
            return self::catalogPackIds();
        }

        return $this->filterToCatalog($enabledPacks);
    }

    /**
     * @param  list<string>  $packIds
     */
    public function updateEnabledPacks(Institution $institution, array $packIds): Institution
    {
        $filtered = $this->filterToCatalog(array_values(array_unique($packIds)));

        $settings = $institution->settings ?? [];
        $blockCoding = is_array($settings[self::SETTINGS_KEY] ?? null)
            ? $settings[self::SETTINGS_KEY]
            : [];
        $blockCoding[self::ENABLED_PACKS_KEY] = $filtered;
        $settings[self::SETTINGS_KEY] = $blockCoding;

        $institution->settings = $settings;
        $institution->save();

        return $institution->refresh();
    }

    /**
     * @return array{catalog: list<array{id: string, label: string, description: string, owner: string, default_enabled: bool, rollout: string}>, enabled_pack_ids: list<string>}
     */
    public function toFrontendPayload(?Institution $institution): array
    {
        return [
            'catalog' => $this->catalog(),
            'enabled_pack_ids' => $this->enabledPackIds($institution),
        ];
    }

    /**
     * @param  list<mixed>  $packIds
     * @return list<string>
     */
    private function filterToCatalog(array $packIds): array
    {
        $allowed = self::catalogPackIds();

        return array_values(array_filter(
            $packIds,
            fn ($id): bool => is_string($id) && in_array($id, $allowed, true),
        ));
    }
}
