<?php

return [
    'default_provider' => env('AI_DEFAULT_PROVIDER', 'fake'),

    'providers' => [
        'fake' => [
            'enabled' => (bool) env('AI_FAKE_ENABLED', true),
            'model' => 'fake-mentor-v1',
        ],
    ],

    'prompts' => require __DIR__.'/ai/prompts.php',
];
