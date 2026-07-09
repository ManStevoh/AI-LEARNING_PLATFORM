<?php

namespace App\Modules\BlockCoding\Services;

use App\Modules\BlockCoding\Support\LevelOneStarterWorkspaceBuilder;

class BlockStarterProjectService
{
    /**
     * @return array<string, mixed>
     */
    public function forLesson(string $lessonSlug): array
    {
        $workspace = $this->workspaceForLesson($lessonSlug);

        return [
            'schema_version' => '1.0',
            'lesson_slug' => $lessonSlug,
            'title' => $this->titleForLesson($lessonSlug),
            'workspace' => $workspace,
        ];
    }

    /**
     * @return list<string>
     */
    public function supportedLessonSlugs(): array
    {
        return array_keys($this->lessonTitles());
    }

    /**
     * @return array<string, mixed>
     */
    private function workspaceForLesson(string $lessonSlug): array
    {
        return match ($lessonSlug) {
            'unit-01-meet-the-coding-studio' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::say('unit01_say', 'Hello studio!')
            ),
            'unit-02-events-and-actions' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::move('unit02_move', 10)
            ),
            'unit-03-motion-and-coordinates' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::goTo('unit03_go', 0, 80)
            ),
            'unit-04-looks-and-storytelling' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::say('unit04_say', 'Once upon a time...')
            ),
            'unit-05-sound-and-interaction' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::chain(
                    LevelOneStarterWorkspaceBuilder::move('unit05_move', 5),
                    LevelOneStarterWorkspaceBuilder::say('unit05_say', 'Tap to interact!')
                )
            ),
            'unit-06-repeat-loops' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::chain(
                    LevelOneStarterWorkspaceBuilder::move('unit06_move_a', 10),
                    LevelOneStarterWorkspaceBuilder::move('unit06_move_b', 10)
                )
            ),
            'unit-07-simple-conditions' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::turn('unit07_turn', 15)
            ),
            'unit-08-score-and-variables' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::say('unit08_say', 'Score: 0')
            ),
            'unit-09-debugging-blocks' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::move('unit09_move', 5)
            ),
            'unit-10-final-project' => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::chain(
                    LevelOneStarterWorkspaceBuilder::move('unit10_move', 15),
                    LevelOneStarterWorkspaceBuilder::say('unit10_say', 'My project!')
                )
            ),
            default => LevelOneStarterWorkspaceBuilder::greenFlagWithStack(
                LevelOneStarterWorkspaceBuilder::say('default_say', 'Let\'s code!')
            ),
        };
    }

    /**
     * @return array<string, string>
     */
    private function lessonTitles(): array
    {
        return [
            'unit-01-meet-the-coding-studio' => 'Meet the studio starter',
            'unit-02-events-and-actions' => 'Events starter',
            'unit-03-motion-and-coordinates' => 'Motion starter',
            'unit-04-looks-and-storytelling' => 'Storytelling starter',
            'unit-05-sound-and-interaction' => 'Interaction starter',
            'unit-06-repeat-loops' => 'Loops starter',
            'unit-07-simple-conditions' => 'Conditions starter',
            'unit-08-score-and-variables' => 'Variables starter',
            'unit-09-debugging-blocks' => 'Debugging starter',
            'unit-10-final-project' => 'Final project starter',
        ];
    }

    private function titleForLesson(string $lessonSlug): string
    {
        return $this->lessonTitles()[$lessonSlug] ?? 'Level 1 starter project';
    }
}
