<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\Institution\DashboardController as InstitutionDashboardController;
use App\Http\Controllers\Learner\BlockProjectController;
use App\Http\Controllers\Learner\DashboardController as LearnerDashboardController;
use App\Http\Controllers\Learner\LearnController as LearnerLearnController;
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use App\Http\Middleware\ResolveTenantContext;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::get('register', [RegisteredUserController::class, 'create'])->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::middleware(['auth', ResolveTenantContext::class])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    Route::get('learner', LearnerDashboardController::class)
        ->middleware('workspace.role:learner,parent')
        ->name('learner.dashboard');
    Route::get('learner/learn', [LearnerLearnController::class, 'index'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.learn');
    Route::get('learner/learn/{lessonSlug}', [LearnerLearnController::class, 'show'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.lesson');
    Route::post('learner/learn/{lessonSlug}/project', [BlockProjectController::class, 'store'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.project.store');
    Route::get('teacher', TeacherDashboardController::class)
        ->middleware('workspace.role:teacher')
        ->name('teacher.dashboard');
    Route::get('institution/workspace', InstitutionDashboardController::class)
        ->middleware('workspace.role:institution_admin')
        ->name('institution.dashboard');

    Route::get('institution/select', [InstitutionController::class, 'select'])->name('institution.select');
    Route::post('institution/switch', [InstitutionController::class, 'switchInstitution'])->name('institution.switch');
    Route::get('institutions/{institution}', [InstitutionController::class, 'show'])->name('institutions.show');
});
