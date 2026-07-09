<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private CurriculumCatalogService $catalog,
    ) {}

    public function __invoke(): Response
    {
        $course = $this->catalog->getPublishedCourseOutline('level-1-block-creator');

        return Inertia::render('Learner/Dashboard', [
            'course' => $course,
            'metrics' => $this->buildMetrics($course),
        ]);
    }

    /**
     * @param  array<string, mixed>|null  $course
     * @return list<array{label: string, value: string, hint: string}>
     */
    private function buildMetrics(?array $course): array
    {
        if ($course === null) {
            return [
                ['label' => 'Learning path', 'value' => 'Unavailable', 'hint' => 'Curriculum seed not loaded'],
                ['label' => 'Streak', 'value' => '0 days', 'hint' => 'Start your first lesson'],
                ['label' => 'Projects', 'value' => '0 active', 'hint' => 'Complete lessons to unlock projects'],
            ];
        }

        $nextLesson = $course['next_lesson'] ?? null;

        return [
            [
                'label' => 'Continue lesson',
                'value' => $nextLesson['title'] ?? 'Get started',
                'hint' => $nextLesson['module_title'] ?? 'Level 1',
            ],
            [
                'label' => 'Course units',
                'value' => (string) $course['module_count'],
                'hint' => $course['title'],
            ],
            [
                'label' => 'Learning level',
                'value' => 'Level '.$course['learning_level'],
                'hint' => 'Ages '.$course['age_band'],
            ],
        ];
    }
}
