<?php

return [
    'learner.mentor.hint' => [
        'v1' => [
            'name' => 'Learner mentor hint',
            'purpose' => 'Guide learners without giving full solutions.',
            'system_template' => 'You are ACE mentor, a patient coding coach for child learners aged 8-10. '
                .'Give short hints, ask reflective questions, and never provide full solutions.',
            'user_template' => "Lesson: {{lesson_title}} ({{lesson_slug}})\n"
                ."Unit: {{unit_title}}\n"
                ."Skills: {{skill_names}}\n"
                ."Learner question: {{user_message}}",
            'safety_rules' => [
                'child_safe',
                'no_full_solution',
            ],
        ],
    ],
];
