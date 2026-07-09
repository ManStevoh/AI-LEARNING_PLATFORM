# ADR 0004: Use Blockly For Visual Programming

## Status

Accepted.

## Context

The platform needs a block coding environment that can be customized, inspected by AI, saved as structured data, and mapped to generated code.

## Decision

Use Blockly as the visual programming foundation.

## Rationale

- Blockly provides block workspace, toolbox, serialization, custom blocks, and code generation.
- The platform can build its own stage, sprites, curriculum, AI feedback, and institutional workflows around it.

## Consequences

- Blockly is not a full Scratch replacement by itself.
- The platform must build the runtime, stage, sprite model, project model, and AI inspection layer.
