<?php

namespace App\Http\Controllers\Learner;

use App\Http\Controllers\Controller;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use Inertia\Inertia;
use Inertia\Response;

class LearnController extends Controller
{
    public function __construct(
        private CurriculumCatalogService $catalog,
    ) {}

    public function index(): Response
    {
        $course = $this->catalog->getPublishedCourseOutline('level-1-block-creator');

        abort_if($course === null, 404, 'Published learning path not found.');

        return Inertia::render('Learner/Learn', [
            'course' => $course,
        ]);
    }
}
