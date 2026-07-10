<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\Institution\AiPromptController;
use App\Http\Controllers\Institution\InstitutionBlockPackController;
use App\Http\Controllers\Institution\DashboardController as InstitutionDashboardController;
use App\Http\Controllers\Learner\BlockProjectController;
use App\Http\Controllers\Learner\BlockProjectBackdropController;
use App\Http\Controllers\Learner\BlockProjectCostumeController;
use App\Http\Controllers\Learner\BlockProjectSoundController;
use App\Http\Controllers\Learner\BlockScriptExplainController;
use App\Http\Controllers\Learner\LessonCheckpointController;
use App\Http\Controllers\Learner\DashboardController as LearnerDashboardController;
use App\Http\Controllers\Learner\LearnController as LearnerLearnController;
use App\Http\Controllers\Learner\MentorController as LearnerMentorController;
use App\Http\Controllers\Teacher\ClassOverviewController;
use App\Http\Controllers\Teacher\BlockProjectReviewController;
use App\Http\Controllers\Teacher\SkillMasteryController;
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
    Route::get('learner/learn/{lessonSlug}/checkpoints', [LessonCheckpointController::class, 'index'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.checkpoints.index');
    Route::post('learner/learn/{lessonSlug}/checkpoints', [LessonCheckpointController::class, 'store'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.checkpoints.store');
    Route::post('learner/learn/{lessonSlug}/explain-script', [BlockScriptExplainController::class, 'store'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.explain-script.store');
    Route::get('learner/learn/{lessonSlug}/sounds', [BlockProjectSoundController::class, 'index'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.sounds.index');
    Route::post('learner/learn/{lessonSlug}/sounds', [BlockProjectSoundController::class, 'store'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.sounds.store');
    Route::get('learner/learn/{lessonSlug}/sounds/{sound}/audio', [BlockProjectSoundController::class, 'audio'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.sounds.audio');
    Route::delete('learner/learn/{lessonSlug}/sounds/{sound}', [BlockProjectSoundController::class, 'destroy'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.sounds.destroy');
    Route::get('learner/learn/{lessonSlug}/costumes', [BlockProjectCostumeController::class, 'index'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.costumes.index');
    Route::post('learner/learn/{lessonSlug}/costumes', [BlockProjectCostumeController::class, 'store'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.costumes.store');
    Route::get('learner/learn/{lessonSlug}/costumes/{costume}/image', [BlockProjectCostumeController::class, 'image'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.costumes.image');
    Route::delete('learner/learn/{lessonSlug}/costumes/{costume}', [BlockProjectCostumeController::class, 'destroy'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.costumes.destroy');
    Route::post('learner/learn/{lessonSlug}/backdrops/generate', [BlockProjectBackdropController::class, 'generate'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.backdrops.generate');
    Route::get('learner/learn/{lessonSlug}/backdrops', [BlockProjectBackdropController::class, 'index'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.backdrops.index');
    Route::post('learner/learn/{lessonSlug}/backdrops', [BlockProjectBackdropController::class, 'store'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.backdrops.store');
    Route::get('learner/learn/{lessonSlug}/backdrops/{backdrop}/image', [BlockProjectBackdropController::class, 'image'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.backdrops.image');
    Route::delete('learner/learn/{lessonSlug}/backdrops/{backdrop}', [BlockProjectBackdropController::class, 'destroy'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.backdrops.destroy');
    Route::post('learner/mentor/ask', [LearnerMentorController::class, 'ask'])
        ->middleware('workspace.role:learner,parent')
        ->name('learner.mentor.ask');
    Route::get('teacher', TeacherDashboardController::class)
        ->middleware('workspace.role:teacher')
        ->name('teacher.dashboard');
    Route::get('teacher/classes', [ClassOverviewController::class, 'index'])
        ->middleware('workspace.role:teacher')
        ->name('teacher.classes.index');
    Route::get('teacher/skills', [SkillMasteryController::class, 'index'])
        ->middleware('workspace.role:teacher')
        ->name('teacher.skills.index');
    Route::get('teacher/block-projects', [BlockProjectReviewController::class, 'index'])
        ->middleware('workspace.role:teacher')
        ->name('teacher.block-projects.index');
    Route::get('teacher/block-projects/{blockProject}', [BlockProjectReviewController::class, 'show'])
        ->middleware('workspace.role:teacher')
        ->name('teacher.block-projects.show');
    Route::post('teacher/block-projects/{blockProject}/feedback', [BlockProjectReviewController::class, 'storeFeedback'])
        ->middleware('workspace.role:teacher')
        ->name('teacher.block-projects.feedback.store');
    Route::get('institution/workspace', InstitutionDashboardController::class)
        ->middleware('workspace.role:institution_admin')
        ->name('institution.dashboard');
    Route::get('institution/prompts', [AiPromptController::class, 'index'])
        ->middleware('workspace.role:institution_admin')
        ->name('institution.prompts.index');
    Route::get('institution/prompts/{aiPrompt}', [AiPromptController::class, 'show'])
        ->middleware('workspace.role:institution_admin')
        ->name('institution.prompts.show');
    Route::post('institution/prompts/{aiPrompt}/versions', [AiPromptController::class, 'storeVersion'])
        ->middleware('workspace.role:institution_admin')
        ->name('institution.prompts.versions.store');
    Route::post('institution/prompts/{aiPrompt}/versions/{version}/publish', [AiPromptController::class, 'publishVersion'])
        ->middleware('workspace.role:institution_admin')
        ->where('version', 'v\d+')
        ->name('institution.prompts.versions.publish');

    Route::get('institution/select', [InstitutionController::class, 'select'])->name('institution.select');
    Route::post('institution/switch', [InstitutionController::class, 'switchInstitution'])->name('institution.switch');
    Route::get('institutions/{institution}', [InstitutionController::class, 'show'])->name('institutions.show');
    Route::patch('institutions/{institution}/block-packs', [InstitutionBlockPackController::class, 'update'])
        ->name('institutions.block-packs.update');
});
