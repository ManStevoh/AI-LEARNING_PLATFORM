<?php

namespace App\Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Skill extends Model
{
    protected $fillable = [
        'concept_id',
        'slug',
        'name',
        'statement',
        'learning_level',
        'sort_order',
        'metadata',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    /**
     * @return BelongsTo<Concept, $this>
     */
    public function concept(): BelongsTo
    {
        return $this->belongsTo(Concept::class);
    }

    /**
     * @return BelongsToMany<Lesson>
     */
    public function lessons(): BelongsToMany
    {
        return $this->belongsToMany(Lesson::class, 'lesson_skill_mappings')
            ->withPivot(['role'])
            ->withTimestamps();
    }

    /**
     * @return HasMany<SkillRelationship>
     */
    public function prerequisites(): HasMany
    {
        return $this->hasMany(SkillRelationship::class, 'source_skill_id');
    }
}
