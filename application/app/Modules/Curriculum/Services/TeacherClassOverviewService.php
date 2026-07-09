<?php

namespace App\Modules\Curriculum\Services;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProject;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class TeacherClassOverviewService
{
    private const DEFAULT_COURSE_SLUG = 'level-1-block-creator';

    public function __construct(
        private CurriculumCatalogService $catalog,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function getOverview(int $institutionId): array
    {
        $courseSlug = (string) config('learning.default_course_slug', self::DEFAULT_COURSE_SLUG);
        $course = $this->catalog->getPublishedCourseOutline($courseSlug);
        $lessonSlugs = $this->lessonSlugsFromOutline($course);
        $lessonTitles = $this->lessonTitlesFromOutline($course);
        $learners = $this->learnersForInstitution($institutionId);
        $projectsByLearner = $this->projectsGroupedByLearner($institutionId, $learners->pluck('id'));

        $learnerSummaries = $learners
            ->map(fn (User $learner) => $this->toLearnerSummary(
                $learner,
                $projectsByLearner->get($learner->id, collect()),
                count($lessonSlugs),
                $lessonTitles,
            ))
            ->values()
            ->all();

        return [
            'course' => $course === null ? null : [
                'slug' => $course['slug'],
                'title' => $course['title'],
                'module_count' => $course['module_count'],
            ],
            'metrics' => $this->buildMetrics($learnerSummaries),
            'learners' => $learnerSummaries,
        ];
    }

    /**
     * @return list<array{label: string, value: string, hint: string}>
     */
    public function dashboardMetrics(int $institutionId): array
    {
        return $this->buildMetrics($this->getOverview($institutionId)['learners']);
    }

    /**
     * @param  list<array<string, mixed>>  $learnerSummaries
     * @return list<array{label: string, value: string, hint: string}>
     */
    private function buildMetrics(array $learnerSummaries): array
    {
        $totalLearners = count($learnerSummaries);
        $withActivity = collect($learnerSummaries)->where('lessons_started', '>', 0)->count();
        $needsAttention = collect($learnerSummaries)->where('needs_attention', true)->count();

        return [
            [
                'label' => 'Active learners',
                'value' => (string) $totalLearners,
                'hint' => 'Enrolled in your institution',
            ],
            [
                'label' => 'With saved projects',
                'value' => (string) $withActivity,
                'hint' => 'Started at least one lesson',
            ],
            [
                'label' => 'Needs attention',
                'value' => (string) $needsAttention,
                'hint' => 'Not started or inactive recently',
            ],
        ];
    }

    /**
     * @return Collection<int, User>
     */
    private function learnersForInstitution(int $institutionId): Collection
    {
        $institution = Institution::query()->findOrFail($institutionId);

        return $institution->usersWithRole(InstitutionRole::Learner)
            ->wherePivot('status', MembershipStatus::Active->value)
            ->orderBy('users.name')
            ->get(['users.id', 'users.name', 'users.email']);
    }

    /**
     * @param  Collection<int, int|string>  $learnerIds
     * @return Collection<int|string, Collection<int, BlockProject>>
     */
    private function projectsGroupedByLearner(int $institutionId, Collection $learnerIds): Collection
    {
        if ($learnerIds->isEmpty()) {
            return collect();
        }

        return BlockProject::query()
            ->where('institution_id', $institutionId)
            ->whereIn('user_id', $learnerIds)
            ->orderByDesc('last_saved_at')
            ->orderByDesc('updated_at')
            ->get()
            ->groupBy('user_id');
    }

    /**
     * @param  Collection<int, BlockProject>  $projects
     * @param  array<string, string>  $lessonTitles
     * @return array<string, mixed>
     */
    private function toLearnerSummary(
        User $learner,
        Collection $projects,
        int $totalLessons,
        array $lessonTitles,
    ): array {
        $lessonsStarted = $projects->pluck('lesson_slug')->unique()->count();
        $lessonsWithCode = $projects->filter(fn (BlockProject $project) => filled($project->generated_code))
            ->pluck('lesson_slug')
            ->unique()
            ->count();
        $latestProject = $projects
            ->sortByDesc(fn (BlockProject $project) => sprintf(
                '%010d-%010d',
                $project->last_saved_at?->getTimestamp() ?? 0,
                $project->id,
            ))
            ->first();
        $lastActive = $projects
            ->pluck('last_saved_at')
            ->filter()
            ->sortDesc()
            ->first();
        $currentLessonSlug = $latestProject?->lesson_slug;
        $progressPercent = $totalLessons > 0
            ? (int) round(($lessonsStarted / $totalLessons) * 100)
            : 0;

        return [
            'id' => $learner->id,
            'name' => $learner->name,
            'email' => $learner->email,
            'lessons_started' => $lessonsStarted,
            'lessons_with_code' => $lessonsWithCode,
            'total_lessons' => $totalLessons,
            'progress_percent' => min($progressPercent, 100),
            'current_lesson_slug' => $currentLessonSlug,
            'current_lesson_title' => $currentLessonSlug
                ? ($lessonTitles[$currentLessonSlug] ?? $currentLessonSlug)
                : null,
            'last_active_at' => $lastActive?->toIso8601String(),
            'projects_count' => $projects->count(),
            'needs_attention' => $this->needsAttention($lessonsStarted, $lastActive),
        ];
    }

    private function needsAttention(int $lessonsStarted, ?Carbon $lastActiveAt): bool
    {
        if ($lessonsStarted === 0) {
            return true;
        }

        if ($lastActiveAt === null) {
            return true;
        }

        $inactiveDays = (int) config('learning.inactive_learner_days', 7);

        return $lastActiveAt->lt(now()->subDays($inactiveDays));
    }

    /**
     * @param  array<string, mixed>|null  $course
     * @return list<string>
     */
    private function lessonSlugsFromOutline(?array $course): array
    {
        if ($course === null) {
            return [];
        }

        return collect($course['modules'] ?? [])
            ->map(fn (array $module) => $module['lesson']['slug'] ?? null)
            ->filter()
            ->values()
            ->all();
    }

    /**
     * @param  array<string, mixed>|null  $course
     * @return array<string, string>
     */
    private function lessonTitlesFromOutline(?array $course): array
    {
        if ($course === null) {
            return [];
        }

        $titles = [];

        foreach ($course['modules'] ?? [] as $module) {
            $lesson = $module['lesson'] ?? null;

            if ($lesson === null) {
                continue;
            }

            $titles[$lesson['slug']] = $lesson['title'];
        }

        return $titles;
    }
}
