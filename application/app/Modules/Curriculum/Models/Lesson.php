<?php

namespace App\Modules\Curriculum\Models;

use App\Modules\Curriculum\Enums\CourseStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Lesson extends Model
{
    protected $fillable = [
        'course_module_id',
        'slug',
        'title',
        'summary',
        'sort_order',
        'status',
        'estimated_minutes',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'status' => CourseStatus::class,
        ];
    }

    /**
     * @return BelongsTo<CourseModule, $this>
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(CourseModule::class, 'course_module_id');
    }

    /**
     * @return BelongsToMany<Skill>
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'lesson_skill_mappings')
            ->withPivot(['role'])
            ->withTimestamps();
    }
}
