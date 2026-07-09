<?php

namespace App\Modules\Curriculum\Models;

use App\Modules\Curriculum\Enums\SkillRelationshipType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SkillRelationship extends Model
{
    protected $fillable = [
        'source_skill_id',
        'target_skill_id',
        'relationship_type',
    ];

    protected function casts(): array
    {
        return [
            'relationship_type' => SkillRelationshipType::class,
        ];
    }

    /**
     * @return BelongsTo<Skill, $this>
     */
    public function sourceSkill(): BelongsTo
    {
        return $this->belongsTo(Skill::class, 'source_skill_id');
    }

    /**
     * @return BelongsTo<Skill, $this>
     */
    public function targetSkill(): BelongsTo
    {
        return $this->belongsTo(Skill::class, 'target_skill_id');
    }
}
