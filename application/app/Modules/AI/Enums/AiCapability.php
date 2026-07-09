<?php

namespace App\Modules\AI\Enums;

enum AiCapability: string
{
    case Completion = 'completion';
    case Embedding = 'embedding';
}
