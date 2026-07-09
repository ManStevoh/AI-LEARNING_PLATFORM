<?php

namespace App\Modules\AI\Enums;

enum PromptStatus: string
{
    case Active = 'active';
    case Archived = 'archived';
}
