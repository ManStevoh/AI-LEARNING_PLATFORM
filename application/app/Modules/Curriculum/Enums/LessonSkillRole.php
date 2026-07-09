<?php

namespace App\Modules\Curriculum\Enums;

enum LessonSkillRole: string
{
    case Primary = 'primary';
    case Secondary = 'secondary';
    case Prerequisite = 'prerequisite';
}
