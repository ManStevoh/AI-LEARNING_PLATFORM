<?php

namespace App\Modules\AI\Models;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AiUsageRecord extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = [
        'institution_id',
        'user_id',
        'request_id',
        'provider',
        'model',
        'task_type',
        'prompt_tokens',
        'completion_tokens',
        'latency_ms',
        'status',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
        ];
    }

    public function institution(): BelongsTo
    {
        return $this->belongsTo(Institution::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
