<?php

namespace App\Modules\BlockCoding\Models;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockProjectSound extends Model
{
    protected $fillable = [
        'uuid',
        'institution_id',
        'user_id',
        'lesson_slug',
        'name',
        'disk',
        'path',
        'mime_type',
        'size_bytes',
        'original_filename',
    ];

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    /**
     * @return BelongsTo<Institution, $this>
     */
    public function institution(): BelongsTo
    {
        return $this->belongsTo(Institution::class);
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
