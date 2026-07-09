<?php

namespace Database\Seeders;

use App\Modules\Curriculum\Enums\CourseStatus;
use App\Modules\Curriculum\Enums\LessonSkillRole;
use App\Modules\Curriculum\Enums\SkillRelationshipType;
use App\Modules\Curriculum\Models\Concept;
use App\Modules\Curriculum\Models\Course;
use App\Modules\Curriculum\Models\CourseModule;
use App\Modules\Curriculum\Models\Domain;
use App\Modules\Curriculum\Models\Lesson;
use App\Modules\Curriculum\Models\Skill;
use App\Modules\Curriculum\Models\SkillRelationship;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CurriculumFoundationSeeder extends Seeder
{
    public function run(): void
    {
        $domains = $this->seedDomains();
        $concepts = $this->seedConcepts($domains);
        $skills = $this->seedSkills($concepts);
        $this->seedSkillRelationships($skills);
        $this->seedLevelOneCourse($skills);
    }

    /**
     * @return array<string, Domain>
     */
    private function seedDomains(): array
    {
        $items = [
            ['slug' => 'computational-thinking', 'name' => 'Computational Thinking'],
            ['slug' => 'programming', 'name' => 'Programming'],
        ];

        $domains = [];

        foreach ($items as $index => $item) {
            $domains[$item['slug']] = Domain::query()->updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'name' => $item['name'],
                    'sort_order' => $index + 1,
                    'status' => 'active',
                ],
            );
        }

        return $domains;
    }

    /**
     * @param  array<string, Domain>  $domains
     * @return array<string, Concept>
     */
    private function seedConcepts(array $domains): array
    {
        $items = [
            ['slug' => 'studio-basics', 'name' => 'Studio Basics', 'domain' => 'programming'],
            ['slug' => 'sequence', 'name' => 'Sequence', 'domain' => 'computational-thinking'],
            ['slug' => 'events', 'name' => 'Events', 'domain' => 'programming'],
            ['slug' => 'motion', 'name' => 'Motion', 'domain' => 'programming'],
            ['slug' => 'looks', 'name' => 'Looks', 'domain' => 'programming'],
            ['slug' => 'sound', 'name' => 'Sound', 'domain' => 'programming'],
            ['slug' => 'loops', 'name' => 'Loops', 'domain' => 'programming'],
            ['slug' => 'conditionals', 'name' => 'Conditionals', 'domain' => 'programming'],
            ['slug' => 'variables', 'name' => 'Variables', 'domain' => 'programming'],
            ['slug' => 'debugging', 'name' => 'Debugging', 'domain' => 'computational-thinking'],
            ['slug' => 'project-presentation', 'name' => 'Project Presentation', 'domain' => 'computational-thinking'],
        ];

        $concepts = [];

        foreach ($items as $index => $item) {
            $concepts[$item['slug']] = Concept::query()->updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'domain_id' => $domains[$item['domain']]->id,
                    'name' => $item['name'],
                    'sort_order' => $index + 1,
                ],
            );
        }

        return $concepts;
    }

    /**
     * @param  array<string, Concept>  $concepts
     * @return array<string, Skill>
     */
    private function seedSkills(array $concepts): array
    {
        $items = [
            ['slug' => 'programming.studio.identify-stage', 'concept' => 'studio-basics', 'name' => 'Identify stage', 'statement' => 'Identify the stage in the coding studio.'],
            ['slug' => 'programming.studio.identify-sprite', 'concept' => 'studio-basics', 'name' => 'Identify sprite', 'statement' => 'Identify sprites in a project.'],
            ['slug' => 'programming.sequence.connect-blocks', 'concept' => 'sequence', 'name' => 'Connect blocks', 'statement' => 'Connect blocks in the correct sequence.'],
            ['slug' => 'programming.events.green-flag', 'concept' => 'events', 'name' => 'Green flag event', 'statement' => 'Start actions with a green flag event.'],
            ['slug' => 'programming.events.user-input', 'concept' => 'events', 'name' => 'User input events', 'statement' => 'Respond to key press and sprite click events.'],
            ['slug' => 'programming.motion.move-sprite', 'concept' => 'motion', 'name' => 'Move sprite', 'statement' => 'Move a sprite intentionally across the stage.'],
            ['slug' => 'programming.motion.coordinates', 'concept' => 'motion', 'name' => 'Coordinates', 'statement' => 'Use x/y position and direction.'],
            ['slug' => 'programming.looks.storytelling', 'concept' => 'looks', 'name' => 'Visual storytelling', 'statement' => 'Use say, think, costumes, and backdrops in sequence.'],
            ['slug' => 'programming.sound.interaction', 'concept' => 'sound', 'name' => 'Sound interaction', 'statement' => 'Trigger sound from user actions and motion.'],
            ['slug' => 'programming.loops.repeat-basic', 'concept' => 'loops', 'name' => 'Repeat loops', 'statement' => 'Use repeat loops for repeated actions.'],
            ['slug' => 'programming.conditionals.if-basic', 'concept' => 'conditionals', 'name' => 'Simple conditions', 'statement' => 'Use if conditions to make decisions.'],
            ['slug' => 'programming.variables.score', 'concept' => 'variables', 'name' => 'Score variables', 'statement' => 'Create, update, and reset score variables.'],
            ['slug' => 'programming.debugging.test-one-change', 'concept' => 'debugging', 'name' => 'Test one change', 'statement' => 'Test one change and explain a fix.'],
            ['slug' => 'programming.project.presentation', 'concept' => 'project-presentation', 'name' => 'Present a project', 'statement' => 'Explain project behavior and design choices.'],
        ];

        $skills = [];

        foreach ($items as $index => $item) {
            $skills[$item['slug']] = Skill::query()->updateOrCreate(
                ['slug' => $item['slug']],
                [
                    'concept_id' => $concepts[$item['concept']]->id,
                    'name' => $item['name'],
                    'statement' => $item['statement'],
                    'learning_level' => 1,
                    'sort_order' => $index + 1,
                    'status' => 'active',
                ],
            );
        }

        return $skills;
    }

    /**
     * @param  array<string, Skill>  $skills
     */
    private function seedSkillRelationships(array $skills): void
    {
        $chains = [
            'programming.sequence.connect-blocks' => ['programming.studio.identify-stage', 'programming.studio.identify-sprite'],
            'programming.events.green-flag' => ['programming.sequence.connect-blocks'],
            'programming.motion.move-sprite' => ['programming.events.green-flag'],
            'programming.looks.storytelling' => ['programming.motion.move-sprite'],
            'programming.sound.interaction' => ['programming.events.user-input'],
            'programming.loops.repeat-basic' => ['programming.sequence.connect-blocks'],
            'programming.conditionals.if-basic' => ['programming.events.user-input'],
            'programming.variables.score' => ['programming.loops.repeat-basic'],
            'programming.debugging.test-one-change' => ['programming.conditionals.if-basic', 'programming.variables.score'],
            'programming.project.presentation' => ['programming.debugging.test-one-change'],
        ];

        foreach ($chains as $source => $targets) {
            foreach ($targets as $target) {
                SkillRelationship::query()->updateOrCreate(
                    [
                        'source_skill_id' => $skills[$source]->id,
                        'target_skill_id' => $skills[$target]->id,
                        'relationship_type' => SkillRelationshipType::Requires,
                    ],
                    [],
                );
            }
        }
    }

    /**
     * @param  array<string, Skill>  $skills
     */
    private function seedLevelOneCourse(array $skills): void
    {
        $course = Course::query()->updateOrCreate(
            ['slug' => 'level-1-block-creator'],
            [
                'title' => 'Level 1: Block Creator',
                'description' => 'Visual block coding for games, animations, and interactive stories.',
                'learning_level' => 1,
                'age_band' => '8-10',
                'version' => '1.0.0',
                'status' => CourseStatus::Published,
                'sort_order' => 1,
                'published_at' => now(),
                'metadata' => [
                    'goal' => 'Create simple interactive animations and games using block programming.',
                ],
            ],
        );

        $units = [
            ['title' => 'Meet The Coding Studio', 'skills' => ['programming.studio.identify-stage', 'programming.studio.identify-sprite', 'programming.sequence.connect-blocks']],
            ['title' => 'Events And Actions', 'skills' => ['programming.events.green-flag', 'programming.events.user-input']],
            ['title' => 'Motion And Coordinates', 'skills' => ['programming.motion.move-sprite', 'programming.motion.coordinates']],
            ['title' => 'Looks And Storytelling', 'skills' => ['programming.looks.storytelling']],
            ['title' => 'Sound And Interaction', 'skills' => ['programming.sound.interaction']],
            ['title' => 'Repeat Loops', 'skills' => ['programming.loops.repeat-basic']],
            ['title' => 'Simple Conditions', 'skills' => ['programming.conditionals.if-basic']],
            ['title' => 'Score And Variables', 'skills' => ['programming.variables.score']],
            ['title' => 'Debugging Blocks', 'skills' => ['programming.debugging.test-one-change']],
            ['title' => 'Final Project', 'skills' => ['programming.project.presentation', 'programming.debugging.test-one-change']],
        ];

        foreach ($units as $index => $unit) {
            $moduleSlug = 'unit-'.str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT).'-'.Str::slug($unit['title']);

            $module = CourseModule::query()->updateOrCreate(
                ['course_id' => $course->id, 'slug' => $moduleSlug],
                [
                    'title' => $unit['title'],
                    'description' => 'Level 1 unit '.($index + 1),
                    'sort_order' => $index + 1,
                ],
            );

            $lesson = Lesson::query()->updateOrCreate(
                ['course_module_id' => $module->id, 'slug' => $moduleSlug],
                [
                    'title' => $unit['title'],
                    'summary' => 'Introductory lesson for '.$unit['title'].'.',
                    'sort_order' => 1,
                    'status' => CourseStatus::Published,
                    'estimated_minutes' => 45,
                ],
            );

            foreach ($unit['skills'] as $position => $skillSlug) {
                $lesson->skills()->syncWithoutDetaching([
                    $skills[$skillSlug]->id => [
                        'role' => $position === 0
                            ? LessonSkillRole::Primary->value
                            : LessonSkillRole::Secondary->value,
                    ],
                ]);
            }
        }
    }
}
