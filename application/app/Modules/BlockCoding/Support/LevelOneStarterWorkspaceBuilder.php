<?php

namespace App\Modules\BlockCoding\Support;

final class LevelOneStarterWorkspaceBuilder
{
    /**
     * @return array<string, mixed>
     */
    public static function greenFlagWithStack(array $stackBlock, string $hatId = 'starter_hat'): array
    {
        return [
            'blocks' => [
                'languageVersion' => 0,
                'blocks' => [[
                    'type' => 'ace_event_green_flag',
                    'id' => $hatId,
                    'x' => 40,
                    'y' => 40,
                    'inputs' => [
                        'STACK' => [
                            'block' => $stackBlock,
                        ],
                    ],
                ]],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function say(string $id, string $message, int $seconds = 2): array
    {
        return [
            'type' => 'ace_looks_say',
            'id' => $id,
            'inputs' => [
                'MESSAGE' => [
                    'block' => [
                        'type' => 'text',
                        'id' => $id.'_text',
                        'fields' => ['TEXT' => $message],
                    ],
                ],
                'SECONDS' => [
                    'block' => self::mathNumber($id.'_seconds', $seconds),
                ],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function move(string $id, int $steps): array
    {
        return [
            'type' => 'ace_motion_move_steps',
            'id' => $id,
            'inputs' => [
                'STEPS' => [
                    'block' => self::mathNumber($id.'_steps', $steps),
                ],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function turn(string $id, int $degrees): array
    {
        return [
            'type' => 'ace_motion_turn_degrees',
            'id' => $id,
            'inputs' => [
                'DEGREES' => [
                    'block' => self::mathNumber($id.'_degrees', $degrees),
                ],
            ],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public static function goTo(string $id, int $x, int $y): array
    {
        return [
            'type' => 'ace_motion_go_to_xy',
            'id' => $id,
            'inputs' => [
                'X' => [
                    'block' => self::mathNumber($id.'_x', $x),
                ],
                'Y' => [
                    'block' => self::mathNumber($id.'_y', $y),
                ],
            ],
        ];
    }

    /**
     * @param  array<string, mixed>  $block
     * @param  array<string, mixed>  $nextBlock
     * @return array<string, mixed>
     */
    public static function chain(array $block, array $nextBlock): array
    {
        $block['next'] = ['block' => $nextBlock];

        return $block;
    }

    /**
     * @return array<string, mixed>
     */
    private static function mathNumber(string $id, int $value): array
    {
        return [
            'type' => 'math_number',
            'id' => $id,
            'fields' => ['NUM' => $value],
        ];
    }
}
