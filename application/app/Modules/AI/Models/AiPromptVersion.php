<?php

namespace App\Modules\AI\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiPromptVersion extends Model
{
    protected $fillable = [
        'ai_prompt_id',
        'version',
        'system_template',
        'developer_template',
        'user_template',
        'input_schema',
        'output_schema',
        'safety_rules',
        'evaluation_set_id',
        'changelog',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'input_schema' => 'array',
            'output_schema' => 'array',
            'safety_rules' => 'array',
            'published_at' => 'datetime',
        ];
    }

    public function prompt(): BelongsTo
    {
        return $this->belongsTo(AiPrompt::class, 'ai_prompt_id');
    }

    public function isPublished(): bool
    {
        return $this->published_at !== null;
    }
}
