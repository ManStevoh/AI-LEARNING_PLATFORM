<?php

namespace App\Modules\Curriculum\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Domain extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'description',
        'sort_order',
        'status',
    ];

    /**
     * @return HasMany<Concept>
     */
    public function concepts(): HasMany
    {
        return $this->hasMany(Concept::class)->orderBy('sort_order');
    }
}
