# Stage Runtime Specification

## Purpose

This document defines the runtime that executes Blockly projects for Level 1 block coding.

Blockly provides the block workspace. The platform must provide the stage, sprites, events, project state, execution runtime, generated code mapping, AI inspection hooks, and teacher review data.

## Runtime Goals

The stage runtime should support:

- games,
- animations,
- stories,
- simple simulations,
- block-to-code learning,
- AI hints,
- project submission,
- teacher review,
- future robotics/sensor extensions.

## Recommended Frontend Technologies

Recommended stack:

- React for UI shell,
- Blockly for block workspace,
- **HTML/CSS stage renderer** for Level 1 default,
- **PixiJS** as the approved canvas renderer when effects/pen/multi-sprite performance require it ([ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)),
- Web Workers only if a future execution-model ADR requires them.

Decision (accepted):

- **PixiJS** for custom 2D rendering upgrade — does not own game logic.
- **Phaser** is not used for the ACE Stage Engine (duplicates runtime concerns).
- `StageRuntime` remains the source of truth; renderers only mirror snapshots.

## Stage Concepts

### Project

A project contains:

- project metadata,
- sprites,
- costumes,
- sounds,
- variables,
- blocks/workspace JSON,
- stage settings,
- generated code snapshot,
- run history,
- submission state.

### Stage

Stage properties:

- width,
- height,
- background,
- coordinate system,
- grid/snap settings,
- camera/future viewport,
- runtime state.

### Sprite

Sprite properties:

- ID,
- name,
- x/y position,
- rotation,
- size,
- visibility,
- costume,
- layer/z-index,
- velocity,
- collision shape,
- custom variables.

### Costume

Costume properties:

- asset ID,
- name,
- type,
- dimensions,
- anchor point,
- accessibility label.

### Sound

Sound properties:

- asset ID,
- name,
- duration,
- format,
- volume,
- playback rules.

## Event Model

Initial events:

- green flag clicked,
- key pressed,
- sprite clicked,
- backdrop changed,
- broadcast received,
- timer elapsed,
- collision detected,
- variable changed.

Event requirements:

- events should be deterministic where possible,
- event handlers should be inspectable by AI,
- long-running handlers must be interruptible,
- infinite loops must respect runtime limits.

## Execution Model

Recommended flow:

```text
Load project
  |
  v
Validate blocks
  |
  v
Compile or interpret block graph
  |
  v
Start runtime loop
  |
  v
Dispatch events
  |
  v
Update sprites/state
  |
  v
Render stage
  |
  v
Capture run events/errors
```

Runtime states:

- idle,
- running,
- paused,
- stopped,
- error,
- submitted.

## Block Execution

The runtime should support:

- sequence,
- motion,
- looks,
- sound,
- events,
- control,
- sensing,
- operators,
- variables,
- custom blocks later.

Execution limits:

- max loop iterations per tick,
- max event handlers,
- max sprites,
- max clones,
- max project memory,
- max run time for automated evaluation.

## Collision Model

Initial collision support:

- bounding box,
- circle,
- pixel-perfect later if needed.

Collision events:

- sprite touches sprite,
- sprite touches edge,
- sprite touches color/object later.

## Project Save Format

Recommended top-level format:

```json
{
  "version": "1.0",
  "stage": {},
  "sprites": [],
  "assets": [],
  "variables": [],
  "workspace": {},
  "metadata": {}
}
```

Rules:

- version every project schema,
- store Blockly JSON, not only generated code,
- preserve enough data for AI review and teacher playback,
- avoid storing unnecessary personal data inside project JSON.

## Generated Code Mapping

The runtime should expose generated code views:

- JavaScript first,
- Python later,
- simplified pseudo-code for younger learners where useful.

Rules:

- generated code should map visibly to blocks,
- learners should understand loops, conditions, variables, functions,
- generated code does not need to be production-quality in Level 1,
- code view should be pedagogical.

## AI Inspection Hooks

AI should be able to inspect:

- workspace JSON,
- disconnected blocks,
- event handlers,
- loops,
- variables,
- sprite state,
- runtime errors,
- run history,
- lesson objective,
- learner competency state.

AI should not need screenshots for basic logic review.

Example AI context:

```json
{
  "lesson_goal": "use repeat loops",
  "workspace_summary": {
    "event_handlers": 1,
    "loops": 2,
    "disconnected_blocks": 1
  },
  "runtime_error": "sprite did not move because move block is not connected to event"
}
```

## Teacher Review Data

Submitted projects should include:

- final workspace JSON,
- run status,
- detected concepts,
- rubric mapping,
- AI feedback draft,
- learner reflection,
- teacher score,
- teacher comments.

## Accessibility Requirements

Blockly interfaces can be challenging for accessibility.

Required:

- keyboard strategy research,
- screen-reader-friendly instructions,
- alternative lesson/practice modes,
- clear labels for sprites/assets,
- reduced motion option,
- color contrast compliance,
- non-color-only feedback.

## Offline Considerations

Future offline clients must support:

- local project save,
- queued submissions,
- asset caching,
- conflict handling,
- sync metadata.

Do not design project IDs or timestamps in a way that blocks offline sync.

## Analytics Events

Events:

- block_project_created,
- block_project_saved,
- block_project_run,
- block_project_error,
- block_project_submitted,
- block_added,
- block_removed,
- hint_requested,
- generated_code_viewed.

Events should avoid excessive noisy tracking and respect privacy.

## Acceptance Criteria

- learner can create a sprite project,
- green flag event can run blocks,
- motion blocks update stage,
- loops execute with limits,
- project autosaves,
- generated JavaScript view appears,
- runtime errors are surfaced clearly,
- AI can inspect workspace JSON,
- teacher can view submitted project state.
