<?php

return [
    'default_course_slug' => env('LEARNING_DEFAULT_COURSE_SLUG', 'level-1-block-creator'),

    'inactive_learner_days' => (int) env('LEARNING_INACTIVE_LEARNER_DAYS', 7),
];
