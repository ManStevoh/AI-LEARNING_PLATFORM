<?php

namespace App\Modules\Curriculum\Enums;

enum CourseStatus: string
{
    case Draft = 'draft';
    case Published = 'published';
}
