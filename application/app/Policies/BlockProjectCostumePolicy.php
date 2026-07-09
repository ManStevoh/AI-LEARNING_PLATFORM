<?php

namespace App\Policies;

use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectCostume;

class BlockProjectCostumePolicy
{
    public function view(User $user, BlockProjectCostume $costume): bool
    {
        return $this->ownsCostume($user, $costume);
    }

    public function delete(User $user, BlockProjectCostume $costume): bool
    {
        return $this->ownsCostume($user, $costume);
    }

    private function ownsCostume(User $user, BlockProjectCostume $costume): bool
    {
        return $costume->user_id === $user->id;
    }
}
