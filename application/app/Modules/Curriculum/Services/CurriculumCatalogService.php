<?php

namespace App\Modules\Curriculum\Services;

use App\Modules\Curriculum\Enums\CourseStatus;
use App\Modules\Curriculum\Models\Course;
use App\Modules\Curriculum\Models\CourseModule;
use App\Modules\Curriculum\Models\Lesson;
use App\Modules\Curriculum\Models\Skill;
use Illuminate\Database\Eloquent\Collection;

class CurriculumCatalogService
{
    public function getPublishedCourse(string $slug): ?Course
    {
        return Course::query()
            ->where('slug', $slug)
            ->where('status', CourseStatus::Published)
            ->first();
    }

    /**
     * @return array<string, mixed>|null
     */
    public function getPublishedCourseOutline(string $slug): ?array
    {
        $course = Course::query()
            ->where('slug', $slug)
            ->where('status', CourseStatus::Published)
            ->with([
                'modules' => fn ($query) => $query->orderBy('sort_order')->with([
                    'lessons' => fn ($lessonQuery) => $lessonQuery->orderBy('sort_order'),
                ]),
            ])
            ->first();

        if ($course === null) {
            return null;
        }

        $modules = $course->modules->map(function (CourseModule $module) {
            $lesson = $module->lessons->first();

            return [
                'slug' => $module->slug,
                'title' => $module->title,
                'sort_order' => $module->sort_order,
                'lesson' => $lesson ? [
                    'slug' => $lesson->slug,
                    'title' => $lesson->title,
                    'summary' => $lesson->summary,
                    'estimated_minutes' => $lesson->estimated_minutes,
                ] : null,
            ];
        })->values()->all();

        $firstLesson = $course->modules->first()?->lessons->first();

        return [
            'slug' => $course->slug,
            'title' => $course->title,
            'description' => $course->description,
            'learning_level' => $course->learning_level,
            'age_band' => $course->age_band,
            'module_count' => count($modules),
            'modules' => $modules,
            'next_lesson' => $firstLesson ? [
                'slug' => $firstLesson->slug,
                'title' => $firstLesson->title,
                'module_title' => $course->modules->first()?->title,
                'estimated_minutes' => $firstLesson->estimated_minutes,
            ] : null,
        ];
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getSkillPrerequisites(string $skillSlug): Collection
    {
        $skill = Skill::query()->where('slug', $skillSlug)->firstOrFail();

        return Skill::query()
            ->whereIn('id', function ($query) use ($skill) {
                $query->select('target_skill_id')
                    ->from('skill_relationships')
                    ->where('source_skill_id', $skill->id)
                    ->where('relationship_type', 'requires');
            })
            ->get();
    }

    public function getLessonWithSkills(string $lessonSlug): ?Lesson
    {
        return Lesson::query()
            ->where('slug', $lessonSlug)
            ->where('status', CourseStatus::Published)
            ->with(['skills', 'module.course'])
            ->first();
    }

    /**
     * @return array<string, mixed>|null
     */
    public function getPublishedLessonDetail(string $lessonSlug): ?array
    {
        $lesson = $this->getLessonWithSkills($lessonSlug);

        if ($lesson === null) {
            return null;
        }

        $module = $lesson->module;
        $course = $module->course;

        return [
            'slug' => $lesson->slug,
            'title' => $lesson->title,
            'summary' => $lesson->summary,
            'estimated_minutes' => $lesson->estimated_minutes,
            'module' => [
                'slug' => $module->slug,
                'title' => $module->title,
                'sort_order' => $module->sort_order,
            ],
            'course' => [
                'slug' => $course->slug,
                'title' => $course->title,
            ],
            'skills' => $lesson->skills->map(fn (Skill $skill) => [
                'slug' => $skill->slug,
                'name' => $skill->name,
                'role' => $skill->pivot->role,
            ])->values()->all(),
        ];
    }
}
