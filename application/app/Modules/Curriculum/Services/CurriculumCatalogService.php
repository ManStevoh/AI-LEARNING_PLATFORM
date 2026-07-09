<?php

namespace App\Modules\Curriculum\Services;

use App\Modules\Curriculum\Enums\CourseStatus;
use App\Modules\Curriculum\Models\Course;
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
}
