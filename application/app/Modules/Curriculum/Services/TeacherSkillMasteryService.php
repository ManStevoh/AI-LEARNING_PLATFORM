<?php

namespace App\Modules\Curriculum\Services;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProject;
use App\Modules\Curriculum\Enums\CourseStatus;
use App\Modules\Curriculum\Enums\SkillRelationshipType;
use App\Modules\Curriculum\Models\Course;
use App\Modules\Curriculum\Models\Lesson;
use App\Modules\Curriculum\Models\Skill;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class TeacherSkillMasteryService
{
    private const DEFAULT_COURSE_SLUG = 'level-1-block-creator';

    /**
     * @return array<string, mixed>
     */
    public function getOverview(int $institutionId): array
    {
        $courseSlug = (string) config('learning.default_course_slug', self::DEFAULT_COURSE_SLUG);
        $course = $this->publishedCourseWithSkills($courseSlug);
        $skillCatalog = $this->buildSkillCatalog($course);
        $learners = $this->learnersForInstitution($institutionId);
        $projectsByLearner = $this->projectsGroupedByLearner(
            $institutionId,
            $learners->pluck('id'),
        );

        $learnerSkillStates = $learners->mapWithKeys(function (User $learner) use ($skillCatalog, $projectsByLearner) {
            $projects = $projectsByLearner->get($learner->id, collect());

            return [
                $learner->id => $this->skillStatesForLearner($skillCatalog, $projects),
            ];
        });

        $skillSummaries = collect($skillCatalog)
            ->map(fn (array $skill) => $this->summarizeSkill($skill, $learners, $learnerSkillStates))
            ->values()
            ->all();

        $learnersNeedingSupport = $this->learnersNeedingSupport($learners, $skillCatalog, $learnerSkillStates);

        return [
            'course' => $course === null ? null : [
                'slug' => $course->slug,
                'title' => $course->title,
            ],
            'metrics' => $this->buildMetrics($skillSummaries, $learners, $learnersNeedingSupport),
            'skills' => $skillSummaries,
            'learners_needing_support' => $learnersNeedingSupport,
        ];
    }

    private function publishedCourseWithSkills(string $courseSlug): ?Course
    {
        return Course::query()
            ->where('slug', $courseSlug)
            ->where('status', CourseStatus::Published)
            ->with([
                'modules.lessons' => fn ($query) => $query
                    ->where('status', CourseStatus::Published)
                    ->orderBy('sort_order')
                    ->with('skills'),
            ])
            ->first();
    }

    /**
     * @return list<array{slug: string, name: string, lesson_slugs: list<string>, prerequisite_slugs: list<string>}>
     */
    private function buildSkillCatalog(?Course $course): array
    {
        if ($course === null) {
            return [];
        }

        $catalog = [];

        foreach ($course->modules as $module) {
            foreach ($module->lessons as $lesson) {
                foreach ($lesson->skills as $skill) {
                    if (! isset($catalog[$skill->slug])) {
                        $catalog[$skill->slug] = [
                            'slug' => $skill->slug,
                            'name' => $skill->name,
                            'lesson_slugs' => [],
                            'prerequisite_slugs' => $this->prerequisiteSlugsForSkill($skill),
                        ];
                    }

                    $catalog[$skill->slug]['lesson_slugs'][] = $lesson->slug;
                }
            }
        }

        foreach ($catalog as &$skill) {
            $skill['lesson_slugs'] = array_values(array_unique($skill['lesson_slugs']));
        }

        return array_values($catalog);
    }

    /**
     * @return list<string>
     */
    private function prerequisiteSlugsForSkill(Skill $skill): array
    {
        return Skill::query()
            ->whereIn('id', function ($query) use ($skill) {
                $query->select('target_skill_id')
                    ->from('skill_relationships')
                    ->where('source_skill_id', $skill->id)
                    ->where('relationship_type', SkillRelationshipType::Requires->value);
            })
            ->orderBy('sort_order')
            ->pluck('slug')
            ->all();
    }

    /**
     * @param  list<array{slug: string, name: string, lesson_slugs: list<string>, prerequisite_slugs: list<string>}>  $skillCatalog
     * @param  Collection<int, BlockProject>  $projects
     * @return array<string, array{status: string, needs_support: bool, reasons: list<string>}>
     */
    private function skillStatesForLearner(array $skillCatalog, Collection $projects): array
    {
        $projectsByLesson = $projects->keyBy('lesson_slug');
        $statuses = [];

        foreach ($skillCatalog as $skill) {
            $statuses[$skill['slug']] = $this->resolveSkillStatus($skill['lesson_slugs'], $projectsByLesson);
        }

        $skillNames = collect($skillCatalog)->pluck('name', 'slug');
        $states = [];

        foreach ($skillCatalog as $skill) {
            $status = $statuses[$skill['slug']];
            $reasons = $this->supportReasonsForSkill(
                $skill,
                $status,
                $skill['lesson_slugs'],
                $projectsByLesson,
                $statuses,
                $skillNames,
            );

            $states[$skill['slug']] = [
                'status' => $status,
                'needs_support' => $reasons !== [],
                'reasons' => $reasons,
            ];
        }

        return $states;
    }

    /**
     * @param  list<string>  $lessonSlugs
     * @param  Collection<string, BlockProject>  $projectsByLesson
     */
    private function resolveSkillStatus(array $lessonSlugs, Collection $projectsByLesson): string
    {
        $relevant = $this->projectsForLessons($lessonSlugs, $projectsByLesson);

        if ($relevant->isEmpty()) {
            return 'not_started';
        }

        $hasCode = $relevant->contains(fn (BlockProject $project) => filled($project->generated_code));

        return $hasCode ? 'demonstrated' : 'in_progress';
    }

    /**
     * @param  list<string>  $lessonSlugs
     * @param  Collection<string, BlockProject>  $projectsByLesson
     * @return Collection<string, BlockProject>
     */
    private function projectsForLessons(array $lessonSlugs, Collection $projectsByLesson): Collection
    {
        return $projectsByLesson->filter(
            fn (BlockProject $project, string $lessonSlug) => in_array($lessonSlug, $lessonSlugs, true),
        );
    }

    /**
     * @param  array{slug: string, name: string, lesson_slugs: list<string>, prerequisite_slugs: list<string>}  $skill
     * @param  list<string>  $lessonSlugs
     * @param  Collection<string, BlockProject>  $projectsByLesson
     * @param  array<string, string>  $statuses
     * @param  Collection<string, string>  $skillNames
     * @return list<string>
     */
    private function supportReasonsForSkill(
        array $skill,
        string $status,
        array $lessonSlugs,
        Collection $projectsByLesson,
        array $statuses,
        Collection $skillNames,
    ): array {
        if ($status === 'not_started' || $status === 'demonstrated') {
            return [];
        }

        $reasons = [];
        $relevant = $this->projectsForLessons($lessonSlugs, $projectsByLesson);
        $lastActive = $relevant
            ->pluck('last_saved_at')
            ->filter()
            ->sortDesc()
            ->first();

        if ($this->isStale($lastActive)) {
            $reasons[] = 'Inactive while practicing this skill';
        }

        foreach ($skill['prerequisite_slugs'] as $prerequisiteSlug) {
            $prerequisiteStatus = $statuses[$prerequisiteSlug] ?? 'not_started';

            if ($prerequisiteStatus !== 'demonstrated') {
                $reasons[] = 'Missing prerequisite: '.($skillNames[$prerequisiteSlug] ?? $prerequisiteSlug);
            }
        }

        return array_values(array_unique($reasons));
    }

    /**
     * @param  list<array{slug: string, name: string, lesson_slugs: list<string>, prerequisite_slugs: list<string>}>  $skillCatalog
     * @param  Collection<int, Collection<int, BlockProject>>  $learnerSkillStates
     * @return list<array<string, mixed>>
     */
    private function summarizeSkill(array $skill, Collection $learners, Collection $learnerSkillStates): array
    {
        $counts = [
            'demonstrated' => 0,
            'in_progress' => 0,
            'not_started' => 0,
        ];
        $needsSupport = 0;

        foreach ($learners as $learner) {
            $state = $learnerSkillStates->get($learner->id, [])[$skill['slug']] ?? [
                'status' => 'not_started',
                'needs_support' => false,
            ];

            $counts[$state['status']] = ($counts[$state['status']] ?? 0) + 1;

            if ($state['needs_support']) {
                $needsSupport++;
            }
        }

        $learnerTotal = max($learners->count(), 1);

        return [
            'slug' => $skill['slug'],
            'name' => $skill['name'],
            'demonstrated_count' => $counts['demonstrated'],
            'in_progress_count' => $counts['in_progress'],
            'not_started_count' => $counts['not_started'],
            'mastery_percent' => (int) round(($counts['demonstrated'] / $learnerTotal) * 100),
            'learners_needing_support' => $needsSupport,
        ];
    }

    /**
     * @param  list<array{slug: string, name: string, lesson_slugs: list<string>, prerequisite_slugs: list<string>}>  $skillCatalog
     * @param  Collection<int, array<string, array{status: string, needs_support: bool, reasons: list<string>}>>  $learnerSkillStates
     * @return list<array<string, mixed>>
     */
    private function learnersNeedingSupport(
        Collection $learners,
        array $skillCatalog,
        Collection $learnerSkillStates,
    ): array {
        $skillNames = collect($skillCatalog)->pluck('name', 'slug');

        return $learners
            ->map(function (User $learner) use ($learnerSkillStates, $skillNames) {
                $states = $learnerSkillStates->get($learner->id, []);
                $gaps = [];

                foreach ($states as $slug => $state) {
                    if (! $state['needs_support']) {
                        continue;
                    }

                    $gaps[] = [
                        'skill_slug' => $slug,
                        'skill_name' => $skillNames[$slug] ?? $slug,
                        'status' => $state['status'],
                        'reasons' => $state['reasons'],
                    ];
                }

                if ($gaps === []) {
                    return null;
                }

                return [
                    'id' => $learner->id,
                    'name' => $learner->name,
                    'email' => $learner->email,
                    'gap_count' => count($gaps),
                    'gaps' => $gaps,
                ];
            })
            ->filter()
            ->sortByDesc('gap_count')
            ->values()
            ->all();
    }

    /**
     * @param  list<array<string, mixed>>  $skillSummaries
     * @param  list<array<string, mixed>>  $learnersNeedingSupport
     * @return list<array{label: string, value: string, hint: string}>
     */
    private function buildMetrics(array $skillSummaries, Collection $learners, array $learnersNeedingSupport): array
    {
        $skillCount = count($skillSummaries);
        $learnerCount = max($learners->count(), 1);
        $demonstratedTotal = collect($skillSummaries)->sum('demonstrated_count');
        $possible = max($skillCount * $learnerCount, 1);
        $classMastery = (int) round(($demonstratedTotal / $possible) * 100);

        return [
            [
                'label' => 'Skills tracked',
                'value' => (string) $skillCount,
                'hint' => 'From published Level 1 course',
            ],
            [
                'label' => 'Need support',
                'value' => (string) count($learnersNeedingSupport),
                'hint' => 'Learners with skill gaps',
            ],
            [
                'label' => 'Class mastery',
                'value' => "{$classMastery}%",
                'hint' => 'Demonstrated skill evidence',
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
            ->get()
            ->groupBy('user_id');
    }

    private function isStale(?Carbon $lastActiveAt): bool
    {
        if ($lastActiveAt === null) {
            return true;
        }

        $inactiveDays = (int) config('learning.inactive_learner_days', 7);

        return $lastActiveAt->lt(now()->subDays($inactiveDays));
    }
}
