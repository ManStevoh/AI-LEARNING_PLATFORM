# Block Coding System

## Goal

Build a Scratch-inspired but original block coding environment that introduces learners to programming through games, animations, stories, simulations, and robotics-ready logic.

The platform should use Blockly as the block editor foundation, but it must build its own education experience around Blockly.

## What Blockly Provides

Blockly provides:

- drag-and-drop workspace,
- toolbox,
- blocks,
- variables,
- functions,
- serialization,
- custom blocks,
- code generation.

## What The Platform Must Build

Blockly does not provide a complete Scratch-like product. The platform must build:

- stage,
- sprite system,
- costumes,
- asset manager,
- sound support,
- event runtime,
- animation loop,
- collision detection,
- project saving,
- learner accounts,
- classroom assignments,
- AI analysis,
- generated code display,
- curriculum mapping,
- progress tracking,
- teacher dashboards,
- and institution management.

## Level 1: Block Coding With Games And Animations

Learners use blocks to create:

- movement,
- animations,
- stories,
- simple games,
- quizzes,
- simulations,
- music interactions,
- and basic robotics logic.

Core concepts:

- sequence,
- events,
- loops,
- conditionals,
- variables,
- coordinates,
- collision,
- functions,
- debugging,
- decomposition.

Required block categories:

- Motion,
- Looks,
- Sound,
- Events,
- Control,
- Sensing,
- Operators,
- Variables,
- Functions,
- Game,
- Animation,
- AI,
- Robotics.

## Level 2: Blocks Beside Generated Code

The platform should show generated JavaScript or Python beside the blocks.

Example:

```text
Repeat 10
  Move 10
  Turn 15
```

Generated JavaScript:

```javascript
for (let i = 0; i < 10; i += 1) {
  move(10);
  turn(15);
}
```

Teaching goal:

- show that blocks are real programming concepts,
- reduce fear of text code,
- introduce syntax gradually,
- connect loops, variables, functions, and conditions to professional languages.

## Level 3: Hybrid Editing

Learners gradually edit controlled parts of generated code.

Hybrid modes:

- blocks only,
- blocks plus read-only generated code,
- blocks plus editable parameters,
- blocks plus editable code snippets,
- code with block preview,
- full code mode.

This transition must be carefully designed to avoid confusing learners.

## AI Features

AI should analyze Blockly workspace JSON, project metadata, learner level, and lesson context.

AI can:

- explain what a block does,
- detect missing event blocks,
- identify unreachable blocks,
- identify infinite loops,
- explain why a sprite does not move,
- suggest hints,
- generate challenges,
- produce variations of assignments,
- explain generated code,
- create reflection questions,
- help teachers review projects.

AI should usually give hints before complete answers.

## Stage Engine

Recommended technology options:

- PixiJS for high-performance 2D rendering,
- Phaser for game-oriented features,
- HTML Canvas for simpler custom rendering.

Initial recommendation:

- Use PixiJS if the team wants flexible control and a modern rendering layer.
- Use Phaser if game mechanics and built-in game primitives matter more.

## Project Data Model

A block coding project should store:

- project ID,
- owner,
- institution,
- classroom assignment,
- title,
- description,
- level,
- sprite list,
- costume list,
- sound list,
- workspace JSON,
- generated code snapshot,
- asset references,
- AI feedback history,
- submissions,
- teacher comments,
- version history.

## Teacher Capabilities

Teachers should be able to:

- assign block coding challenges,
- view submissions,
- replay projects,
- inspect blocks,
- view generated code,
- see AI feedback,
- grade with rubrics,
- create classroom competitions,
- identify common mistakes.

## Differentiation From Scratch

The product should not clone Scratch feature-for-feature.

It should differentiate through:

- AI tutoring,
- curriculum alignment,
- teacher dashboards,
- institutional accounts,
- generated code transition,
- robotics integration,
- local curriculum support,
- assessment workflows,
- and progression to professional coding.

## Robotics Future

Future robotics blocks can include:

- read sensor,
- set motor speed,
- turn LED on,
- play buzzer,
- read temperature,
- read distance,
- send signal,
- upload to microcontroller.

Potential platforms:

- micro:bit,
- Arduino,
- Raspberry Pi,
- ESP32,
- LEGO-compatible robotics kits.

## Open Questions

- Should the initial generated language be JavaScript only, or JavaScript plus Python?
- Should the first stage engine use PixiJS or Phaser?
- Should the first curriculum target ages 8-12, 13-17, or mixed beginner cohorts?
- Should robotics be simulated first before hardware integration?
- What minimum offline capability should block projects support in the first web release?
