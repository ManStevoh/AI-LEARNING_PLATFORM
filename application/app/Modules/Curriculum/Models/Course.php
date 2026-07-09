<?php

namespace App\Modules\Curriculum\Models;

use App\Modules\Curriculum\Enums\CourseStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'learning_level',
        'age_band',
        'version',
        'status',
        'sort_order',
        'metadata',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'status' => CourseStatus::class,
            'published_at' => 'datetime',
        ];
    }

    /**
     * @return HasMany<CourseModule>
     */
    public function modules(): HasMany
    {
        return $this->hasMany(CourseModule::class)->orderBy('sort_order');
    }
}
