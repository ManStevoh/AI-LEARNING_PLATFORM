<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\InstitutionRole;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * @return BelongsToMany<Institution>
     */
    public function institutions(): BelongsToMany
    {
        return $this->belongsToMany(Institution::class)
            ->withPivot(['role', 'joined_at'])
            ->withTimestamps();
    }

    public function belongsToInstitution(Institution|int $institution): bool
    {
        $institutionId = $institution instanceof Institution ? $institution->getKey() : $institution;

        return $this->institutions()->whereKey($institutionId)->exists();
    }

    public function hasInstitutionRole(Institution|int $institution, InstitutionRole|string $role): bool
    {
        $institutionId = $institution instanceof Institution ? $institution->getKey() : $institution;
        $roleValue = $role instanceof InstitutionRole ? $role->value : $role;

        return $this->institutions()
            ->whereKey($institutionId)
            ->wherePivot('role', $roleValue)
            ->exists();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
