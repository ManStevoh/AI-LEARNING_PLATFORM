<?php

return [
    'default_course_slug' => env('LEARNING_DEFAULT_COURSE_SLUG', 'level-1-block-creator'),

    'inactive_learner_days' => (int) env('LEARNING_INACTIVE_LEARNER_DAYS', 7),

    'block_sound' => [
        'max_kilobytes' => (int) env('LEARNING_BLOCK_SOUND_MAX_KB', 2048),
        'allowed_mimes' => ['mp3', 'wav', 'ogg', 'm4a', 'webm', 'x-wav'],
    ],
];
