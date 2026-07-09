<?php

namespace App\Modules\BlockCoding\Models;

use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockProjectFeedback extends Model
{
    protected $table = 'block_project_feedback';

    protected $fillable = [
        'block_project_id',
        'institution_id',
        'teacher_user_id',
        'notes',
    ];

    public function blockProject(): BelongsTo
    {
        return $this->belongsTo(BlockProject::class);
    }

    public function institution(): BelongsTo
    {
        return $this->belongsTo(Institution::class);
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_user_id');
    }
}
