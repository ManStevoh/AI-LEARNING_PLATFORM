<?php

namespace App\Modules\BlockCoding\Models;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockProject extends Model
{
    protected $fillable = [
        'institution_id',
        'user_id',
        'lesson_slug',
        'schema_version',
        'workspace',
        'generated_code',
        'last_saved_at',
    ];

    protected function casts(): array
    {
        return [
            'workspace' => 'array',
            'last_saved_at' => 'datetime',
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
