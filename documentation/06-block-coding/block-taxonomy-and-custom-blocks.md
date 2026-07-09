# Block Taxonomy And Custom Blocks

## Purpose

This document defines the block categories for Level 1 and future block-to-code learning.

Blockly provides the framework. The platform defines educational categories, custom blocks, and progression rules.

## Level 1 Core Categories

### Motion

Blocks:

- move steps,
- turn,
- go to x/y,
- glide,
- point direction,
- bounce on edge.

Concepts:

- sequence,
- coordinates,
- direction,
- movement.

### Looks

Blocks:

- say,
- think,
- switch costume,
- show/hide,
- change size,
- set background.

Concepts:

- output,
- animation,
- state.

### Events

Blocks:

- when green flag clicked,
- when key pressed,
- when sprite clicked,
- broadcast,
- when broadcast received.

Concepts:

- event-driven programming.

### Control

Blocks:

- wait,
- repeat,
- forever,
- if,
- if/else,
- stop.

Concepts:

- loops,
- conditions,
- timing,
- flow control.

### Sensing

Blocks:

- touching sprite,
- touching edge,
- key pressed,
- mouse clicked,
- timer.

Concepts:

- input,
- state,
- conditions.

### Operators

Blocks:

- arithmetic,
- comparison,
- logical and/or/not,
- random number.

Concepts:

- expressions,
- Boolean logic.

### Variables

Blocks:

- set variable,
- change variable,
- show/hide variable.

Concepts:

- state,
- score,
- lives,
- timer.

## Future Custom Categories

- AI,
- Robotics,
- Web,
- Data,
- APIs,
- Databases,
- Game Physics.

## AI Blocks Future

Examples:

- ask AI,
- classify text,
- generate story idea,
- summarize input.

Rules:

- child safety filters required,
- usage limits required,
- AI output must be visible and explainable.

## Robotics Blocks Future

Examples:

- read sensor,
- set motor speed,
- turn LED on,
- if temperature greater than,
- send command to simulator.

Rules:

- simulator first,
- hardware integration later,
- safety instructions required.

## Generated Code Mapping

Every block should define:

- JavaScript mapping,
- Python mapping later,
- plain-language explanation,
- common mistakes,
- related competencies.

## Block Metadata

Recommended fields:

```text
block_type
category
display_name
description
inputs
outputs
js_generator
python_generator
competency_ids
age_band
difficulty
common_misconceptions
```

## Acceptance Criteria

- Level 1 blocks cover required concepts,
- each block maps to competencies,
- each block has generated code mapping,
- custom blocks are versioned,
- AI can explain each block,
- teachers can see which block concepts learners struggle with.
