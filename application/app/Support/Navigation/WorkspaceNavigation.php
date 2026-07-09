<?php

namespace App\Support\Navigation;

use App\Enums\InstitutionRole;

class WorkspaceNavigation
{
    /**
     * @return list<array{label: string, href: string}>
     */
    public static function primary(?InstitutionRole $role): array
    {
        return match ($role) {
            InstitutionRole::InstitutionAdmin => [
                ['label' => 'Overview', 'href' => '/institution/workspace'],
                ['label' => 'Learners', 'href' => '#'],
                ['label' => 'Teachers', 'href' => '#'],
                ['label' => 'Classes', 'href' => '#'],
                ['label' => 'Reports', 'href' => '#'],
                ['label' => 'Settings', 'href' => '#'],
            ],
            InstitutionRole::Teacher => [
                ['label' => 'Dashboard', 'href' => '/teacher'],
                ['label' => 'Classes', 'href' => '#'],
                ['label' => 'Assignments', 'href' => '#'],
                ['label' => 'Submissions', 'href' => '#'],
                ['label' => 'Analytics', 'href' => '#'],
            ],
            InstitutionRole::Learner, InstitutionRole::Parent => [
                ['label' => 'Dashboard', 'href' => '/learner'],
                ['label' => 'Learn', 'href' => '#'],
                ['label' => 'Projects', 'href' => '#'],
                ['label' => 'Practice', 'href' => '#'],
                ['label' => 'AI Mentor', 'href' => '#'],
                ['label' => 'Portfolio', 'href' => '#'],
            ],
            default => [
                ['label' => 'Home', 'href' => '/dashboard'],
            ],
        };
    }

    public static function homeRoute(?InstitutionRole $role): string
    {
        return match ($role) {
            InstitutionRole::InstitutionAdmin => '/institution/workspace',
            InstitutionRole::Teacher => '/teacher',
            InstitutionRole::Learner, InstitutionRole::Parent => '/learner',
            default => '/dashboard',
        };
    }
}
