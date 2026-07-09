<?php

namespace App\Modules\AI\Services;

use App\Modules\Curriculum\Services\CurriculumCatalogService;

class MentorContextBuilder
{
    public function __construct(
        private CurriculumCatalogService $catalog,
    ) {}

    /**
     * @return array<string, string>
     */
    public function build(string $userMessage, ?string $lessonSlug = null): array
    {
        $lesson = $lessonSlug ? $this->catalog->getPublishedLessonDetail($lessonSlug) : null;

        $skills = collect($lesson['skills'] ?? [])
            ->pluck('name')
            ->filter()
            ->values()
            ->all();

        return [
            'user_message' => trim($userMessage),
            'lesson_slug' => $lessonSlug ?? '',
            'lesson_title' => (string) ($lesson['title'] ?? 'your current lesson'),
            'unit_title' => (string) ($lesson['module']['title'] ?? ''),
            'skill_names' => $skills === [] ? 'general block coding' : implode(', ', $skills),
        ];
    }
}
