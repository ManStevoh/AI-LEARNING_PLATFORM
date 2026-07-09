<?php

namespace App\Policies;

use App\Models\User;
use App\Modules\BlockCoding\Models\BlockProjectSound;

class BlockProjectSoundPolicy
{
    public function view(User $user, BlockProjectSound $sound): bool
    {
        return $this->ownsSound($user, $sound);
    }

    public function delete(User $user, BlockProjectSound $sound): bool
    {
        return $this->ownsSound($user, $sound);
    }

    private function ownsSound(User $user, BlockProjectSound $sound): bool
    {
        return $sound->user_id === $user->id;
    }
}
