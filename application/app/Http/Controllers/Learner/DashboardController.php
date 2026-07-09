<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Learner/Dashboard', [
            'metrics' => [
                ['label' => 'Continue lesson', 'value' => 'Loops in Motion', 'hint' => 'Unit 4'],
                ['label' => 'Streak', 'value' => '3 days', 'hint' => 'Keep practicing'],
                ['label' => 'Projects', 'value' => '2 active', 'hint' => '1 due this week'],
            ],
        ]);
    }
}
