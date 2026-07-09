<?php

namespace App\Policies;

use App\Enums\InstitutionRole;
use App\Enums\MembershipStatus;
use App\Models\Institution;
use App\Models\User;

class InstitutionPolicy
{
    public function view(User $user, Institution $institution): bool
    {
        return $this->hasActiveMembership($user, $institution);
    }

    public function update(User $user, Institution $institution): bool
    {
        return $user->hasInstitutionRole($institution, InstitutionRole::InstitutionAdmin)
            && $this->hasActiveMembership($user, $institution);
    }

    public function manageMembers(User $user, Institution $institution): bool
    {
        return $this->update($user, $institution);
    }

    private function hasActiveMembership(User $user, Institution $institution): bool
    {
        if ($institution->status !== 'active') {
            return false;
        }

        return $user->institutions()
            ->whereKey($institution)
            ->wherePivot('status', MembershipStatus::Active->value)
            ->exists();
    }
}
