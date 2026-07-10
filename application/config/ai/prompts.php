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
    'block_coding.backdrop.generate' => [
        'v1' => [
            'name' => 'Block coding AI backdrop',
            'purpose' => 'Generate child-safe SVG stage backdrops for the coding studio.',
            'system_template' => 'You create original SVG backdrops for children aged 8-10. '
                .'Return only a complete SVG document with viewBox="0 0 480 360". '
                .'Use simple flat shapes, bright friendly colors, and no text. '
                .'Never include scripts, links, embedded HTML, or frightening imagery.',
            'user_template' => "Lesson: {{lesson_title}} ({{lesson_slug}})\n"
                ."Theme: {{theme_label}} ({{theme}})\n"
                .'Create one cheerful backdrop scene matching the theme.',
            'safety_rules' => [
                'child_safe',
                'svg_only',
                'no_external_links',
            ],
        ],
    ],
];
