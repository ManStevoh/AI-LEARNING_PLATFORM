<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Teacher/Dashboard', [
            'metrics' => [
                ['label' => 'Active learners', 'value' => '24', 'hint' => 'Across 2 classes'],
                ['label' => 'Assignments due', 'value' => '3', 'hint' => 'This week'],
                ['label' => 'Needs help', 'value' => '5', 'hint' => 'AI flagged for review'],
            ],
        ]);
    }
}
