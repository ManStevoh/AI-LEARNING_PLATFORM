<?php

namespace App\Enums;

enum InstitutionRole: string
{
    case InstitutionAdmin = 'institution_admin';
    case Teacher = 'teacher';
    case Learner = 'learner';
    case Parent = 'parent';
}
