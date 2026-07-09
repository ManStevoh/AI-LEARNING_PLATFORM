# ADR 0010: Use PixiJS For ACE Stage Rendering

## Status

Accepted.

## Context

The ACE Stage Engine already owns execution semantics in `stageRuntime.js`:

- sprites, costumes, sounds, events, sensing, motion, looks,
- project envelope persistence (v1.1–v1.4),
- runtime safety limits (max run time, loop caps),
- React-hosted Blockly editor and studio shell.

The current stage view is an **HTML/CSS DOM renderer** (`BlockStage.jsx`). That is enough for Level 1 intro lessons (few sprites, emoji/image costumes, speech bubbles).

Phase 2+ needs (from [scratch-parity-and-custom-engine-strategy.md](../../documentation/06-block-coding/scratch-parity-and-custom-engine-strategy.md) and [stage-runtime-specification.md](../../documentation/06-block-coding/stage-runtime-specification.md)):

- more sprites and layers,
- costume/backdrop image performance,
- graphic effects (ghost, color, brightness),
- pen / trails,
- smoother glide and collision visualization,
- optional particles for feedback.

Open options were:

1. **Keep HTML/CSS** indefinitely,
2. **PixiJS** (2D WebGL/canvas renderer),
3. **Phaser** (full game framework),
4. Hybrid (DOM for UI chrome, canvas for stage only).

## Decision

1. **Keep `StageRuntime` as the single source of truth** for execution, sprite state, events, and sensing. Rendering never owns game logic.
2. **Adopt PixiJS** as the approved stage **renderer** when we outgrow HTML/CSS.
3. **Do not adopt Phaser** for the ACE Stage Engine.
4. **Ship a renderer adapter** so `BlockStage` can switch between:
   - `dom` (current HTML/CSS — default for Level 1),
   - `pixi` (PixiJS canvas — feature-flagged upgrade path).
5. **Defer the PixiJS dependency** until a concrete Level 1/2 lesson needs effects, pen, or multi-sprite performance that DOM cannot meet. Costume/sound uploads and envelope v1.4 do **not** require PixiJS yet.

## Rationale

### Why PixiJS

- PixiJS is a **renderer**, not a competing game VM. That matches ACE’s architecture: Blockly editor + owned Stage Engine + pluggable draw layer.
- Strong 2D sprite, texture, and filter support for costumes, backdrops, and looks effects.
- Smaller conceptual overlap with our event bus, broadcasts, and sensing model than a full framework.
- Easier to keep generated JS calling `runtime.*` methods while Pixi only mirrors snapshot state each frame.

### Why not Phaser

- Phaser provides scenes, physics, input, and tween systems that would **duplicate** StageRuntime contracts and risk two sources of truth.
- Heavier bundle and steeper coupling for curriculum-driven, AI-inspectable projects.
- ACE needs classroom persistence, tenant-scoped assets, and assessment hooks — not Phaser’s project lifecycle.

### Why not HTML/CSS forever

- DOM layout and CSS transforms scale poorly for many sprites, filters, and pen trails.
- Collision and layering visualization become awkward without a canvas scene graph.
- HTML/CSS remains valid for early Level 1 and as a fallback / low-power path.

### Why hybrid adapter

- Studio chrome (tabs, Blockly, sprite pane) stays React/DOM.
- Only the stage surface moves to Pixi when enabled.
- Feature flag / workspace config (`stage.renderer: 'dom' | 'pixi'`) allows staged rollout and rollback.

## Consequences

### Positive

- Clear ownership: runtime semantics stay in ACE code; Pixi draws.
- Avoids premature dependency weight while Level 1 DOM stage works.
- Aligns with Engineering Constitution: reuse architecture, add ADR for major choices, feature-flag risky changes.

### Negative / follow-ups

- Must implement a Pixi snapshot binder (sprites → sprites/textures, backdrop → stage background).
- Costume image URLs remain tenant-authenticated streams; Pixi texture loading must use credentialed fetches or blob URLs.
- Accessibility: canvas needs equivalent labels/alt paths for active sprite and errors (DOM overlays remain).
- Bundle size: load Pixi via dynamic `import()` only when `renderer === 'pixi'`.
- Pen, clones, and advanced effects still need runtime APIs before the renderer can show them.

## Non-goals

- Replacing Blockly.
- Running learner-generated code inside Pixi/Phaser plugins.
- Matching Scratch’s proprietary renderer or assets.
- Moving execution into a Web Worker in this ADR (separate future ADR if needed).

## Implementation guidance (when activating Pixi)

1. Add `pixi.js` only after a lesson/feature flag requires it; prefer dynamic import.
2. Introduce `StageRenderer` interface:

   - `mount(container)`,
   - `render(snapshot)`,
   - `resize(width, height)`,
   - `destroy()`.

3. Keep `BlockStage` as the React host that chooses `DomStageRenderer` or `PixiStageRenderer`.
4. Do not call Pixi APIs from Blockly generators or `aceBlocks.js`.
5. Add manual smoke + regression checks for costume images, green-flag motion, and stop.
6. Update [implementation-status.md](../../documentation/06-block-coding/implementation-status.md) when the Pixi adapter lands.

## Related

- ADR 0004 — Blockly for visual programming
- ADR 0003 — Laravel + React + Inertia web shell
- [scratch-parity-and-custom-engine-strategy.md](../../documentation/06-block-coding/scratch-parity-and-custom-engine-strategy.md)
- [stage-runtime-specification.md](../../documentation/06-block-coding/stage-runtime-specification.md)
- [block-project-data-model.md](../../documentation/06-block-coding/block-project-data-model.md)
