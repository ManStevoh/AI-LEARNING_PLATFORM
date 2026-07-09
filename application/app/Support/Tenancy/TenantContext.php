<?php

namespace App\Support\Tenancy;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\Pivot;

class TenantContext
{
    private const SESSION_KEY = 'active_institution_id';

    private ?Institution $institution = null;

    private ?Pivot $membership = null;

    public function set(Institution $institution, ?Pivot $membership = null): void
    {
        $this->institution = $institution;
        $this->membership = $membership;
    }

    public function current(): ?Institution
    {
        return $this->institution;
    }

    public function membership(): ?Pivot
    {
        return $this->membership;
    }

    public function role(): ?InstitutionRole
    {
        $role = $this->membership?->role;

        return $role ? InstitutionRole::tryFrom($role) : null;
    }

    public function id(): ?int
    {
        return $this->institution?->id;
    }

    public function hasCurrent(): bool
    {
        return $this->institution !== null;
    }

    public function clear(): void
    {
        $this->institution = null;
        $this->membership = null;
    }

    public function sessionKey(): string
    {
        return self::SESSION_KEY;
    }

    public function resolveForUser(User $user, ?int $institutionId = null): bool
    {
        if ($institutionId !== null) {
            return $this->activateMembership($user, $institutionId);
        }

        $activeMemberships = $this->activeMembershipsQuery($user)->get();

        if ($activeMemberships->count() === 1) {
            $institution = $activeMemberships->first();
            $this->set($institution, $institution->pivot);

            return true;
        }

        $this->clear();

        return false;
    }

    public function activateMembership(User $user, int $institutionId): bool
    {
        $institution = $this->activeMembershipsQuery($user)
            ->whereKey($institutionId)
            ->first();

        if (! $institution) {
            $this->clear();

            return false;
        }

        $this->set($institution, $institution->pivot);

        return true;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Institution>
     */
    private function activeMembershipsQuery(User $user)
    {
        return $user->institutions()
            ->wherePivot('status', MembershipStatus::Active->value)
            ->where('institutions.status', 'active');
    }
}
