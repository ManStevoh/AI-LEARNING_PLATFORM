<?php

namespace App\Modules\AI\Models;

use App\Modules\AI\Enums\PromptStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AiPrompt extends Model
{
    protected $fillable = [
        'prompt_key',
        'name',
        'owner',
        'purpose',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'status' => PromptStatus::class,
        ];
    }

    public function versions(): HasMany
    {
        return $this->hasMany(AiPromptVersion::class);
    }

    public function latestPublishedVersion(): HasOne
    {
        return $this->hasOne(AiPromptVersion::class)
            ->whereNotNull('published_at')
            ->latest('published_at');
    }
}
