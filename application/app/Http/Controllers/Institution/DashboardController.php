<?php

namespace App\Http\Controllers\Institution;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Institution/Dashboard', [
            'metrics' => [
                ['label' => 'Active learners', 'value' => '186', 'hint' => 'Last 30 days'],
                ['label' => 'Seat usage', 'value' => '74%', 'hint' => '148 of 200 seats'],
                ['label' => 'AI usage', 'value' => '1.2k', 'hint' => 'Mentor sessions this month'],
            ],
        ]);
    }
}
