<?php

namespace App\Policies;

use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectBackdrop;

class BlockProjectBackdropPolicy
{
    public function view(User $user, BlockProjectBackdrop $backdrop): bool
    {
        return $this->ownsBackdrop($user, $backdrop);
    }

    public function delete(User $user, BlockProjectBackdrop $backdrop): bool
    {
        return $this->ownsBackdrop($user, $backdrop);
    }

    private function ownsBackdrop(User $user, BlockProjectBackdrop $backdrop): bool
    {
        return $backdrop->user_id === $user->id;
    }
}
