<?php

namespace Tests\Feature;

use App\Modules\Curriculum\Models\Course;
use App\Modules\Curriculum\Models\Domain;
use App\Modules\Curriculum\Models\Lesson;
use App\Modules\Curriculum\Models\Skill;
use App\Modules\Curriculum\Services\CurriculumCatalogService;
use Database\Seeders\CurriculumFoundationSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CurriculumFoundationSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_curriculum_foundation_seeder_populates_level_one_catalog(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $this->assertGreaterThanOrEqual(2, Domain::query()->count());
        $this->assertGreaterThanOrEqual(14, Skill::query()->count());

        $course = Course::query()->where('slug', 'level-1-block-creator')->first();
        $this->assertNotNull($course);
        $this->assertSame(10, $course->modules()->count());
        $this->assertSame(10, Lesson::query()->count());
        $this->assertTrue(
            Lesson::query()->whereDoesntHave('skills', fn ($query) => $query->where('lesson_skill_mappings.role', 'primary'))->doesntExist()
        );
    }

    public function test_catalog_service_returns_published_course_and_prerequisites(): void
    {
        $this->seed(CurriculumFoundationSeeder::class);

        $catalog = app(CurriculumCatalogService::class);
        $course = $catalog->getPublishedCourse('level-1-block-creator');

        $this->assertNotNull($course);
        $this->assertGreaterThanOrEqual(1, $catalog->getSkillPrerequisites('programming.loops.repeat-basic')->count());
    }
}
