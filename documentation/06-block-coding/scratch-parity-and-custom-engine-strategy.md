# Scratch Parity And Custom Engine Strategy

## Short Answer

**Yes.** The platform can support **all learner-facing capabilities that Scratch provides** (motion, looks, sound, events, control, sensing, operators, variables, lists, custom procedures) **plus ACE-only extensions** (AI mentor blocks, curriculum hooks, robotics, assessment, generated-code transition).

This is **not** a Scratch clone. We use **Blockly for the editor** and build an **ACE Stage Engine** for execution, sprites, assets, saving, classroom workflows, and AI inspection.

Scratch has roughly **115 block types** and a mature VM. ACE today has **5 custom runtime blocks** and a **Phase 0 HTML/CSS runtime**. Full parity is a **multi-phase engineering program**, not a single sprint.

---

## Architecture: Two Layers

```text
┌─────────────────────────────────────────────────────────────┐
│  ACE Platform (Laravel + React)                             │
│  curriculum · tenancy · assignments · AI gateway · grading  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│  Blockly Layer (editor only)                                │
│  toolbox · flyout · variables · serialization · generators  │
│  custom ACE block definitions (aceBlocks.js)                │
└─────────────────────────────┬───────────────────────────────┘
                              │ generated JS + workspace JSON
┌─────────────────────────────▼───────────────────────────────┐
│  ACE Stage Engine (we own this)                             │
│  sprites · costumes · sounds · events · collision · limits  │
│  execution · project model · replay · analytics hooks       │
└─────────────────────────────────────────────────────────────┘
```

**Blockly does not replace Scratch.** It replaces only the block *editor*. Every block that moves a sprite, plays a sound, or detects a collision must call into **our runtime**.

ADR: [0004-use-blockly-for-visual-programming.md](../../architecture/decisions/0004-use-blockly-for-visual-programming.md).

---

## What “All Blocks Like Scratch” Means For ACE

| Scratch area | Learner-facing goal | ACE approach | Notes |
|--------------|---------------------|--------------|-------|
| Motion | Move, turn, glide, point, bounce | Custom ACE blocks + runtime methods | Phase 1–2 |
| Looks | Say, think, costumes, effects | Custom blocks + costume/asset pipeline | Phase 2 |
| Sound | Play, stop, volume, effects | Web Audio + asset refs | Phase 2 |
| Events | Green flag, keys, clicks, broadcasts | Runtime event bus + hat blocks | Phase 1–2 |
| Control | Wait, repeat, forever, if, stop | Mix Blockly built-ins + ACE `wait` / `stop` | Phase 1 |
| Sensing | Touching, distance, mouse, ask | Runtime queries + hat blocks | Phase 2–3 |
| Operators | Math, strings, comparisons | Mostly Blockly built-ins | Phase 1 (partial) |
| Variables | Variables and lists | Blockly dynamic categories + runtime scope | Phase 1 (partial) |
| My Blocks | Custom procedures | Blockly procedures + naming rules | Phase 3 |
| Extensions | Pen, video, translate, etc. | ACE extensions only where curriculum needs | Phase 3+ |

**ACE-only categories (beyond Scratch):**

- **AI** — explain script, hint, debug suggestion, challenge variant
- **Curriculum** — lesson checkpoint, rubric self-check, skill tag
- **Robotics** — simulated sensors/motors, later hardware adapters
- **Assessment** — submit, reflect, peer review hooks
- **Code bridge** — highlight generated JS/Python, hybrid edit modes (Level 2–3)

We document every block in [block-registry.md](./block-registry.md). Taxonomy concepts live in [block-taxonomy-and-custom-blocks.md](./block-taxonomy-and-custom-blocks.md).

---

## Custom Engine: Phased Evolution

### Phase 0 — Current (prototype)

- `StageRuntime` in `application/resources/js/Modules/BlockCoding/stageRuntime.js`
- Single sprite, HTML/CSS stage, async JS via generated code
- Blocks: green flag, move, turn, go to x/y, say
- Save: Blockly workspace JSON only (no sprite/costume assets in project file yet)

**Purpose:** Units 1–4 intro lessons, teacher review, autosave, Scratch-style shell UI.

### Phase 1 — Level 1 core (curriculum unblock)

Target: complete Units 1–6 without pretending to be full Scratch.

- Multi-sprite model (still 2D)
- Events: key pressed, sprite clicked, broadcast / receive
- Control: `wait`, `stop` (ACE wrappers where Blockly is insufficient)
- Variables scoped per sprite and globally
- Project JSON v1: workspace + sprite list + positions + costumes (emoji or image refs)
- Runtime safety: loop limits, max run time (already started)

### Phase 2 — Looks, sound, sensing (Scratch-like projects)

- Costume switch, show/hide, size, backdrop
- Sound play/stop (tenant-scoped asset storage via platform adapters)
- Sensing: touching edge/sprite/color, distance, mouse x/y, ask/answer
- Collision model per [stage-runtime-specification.md](./stage-runtime-specification.md)
- Rendering upgrade: **PixiJS** when DOM stage is insufficient (see ADR 0010; Phaser rejected)

### Phase 3 — Full block parity + procedures

- Remaining Motion/Looks blocks (glide, graphic effects where in scope)
- Lists, custom procedures (“My Blocks”)
- Clones (if curriculum requires; gated by performance review)
- Replay for teachers, richer analytics events

### Phase 4 — ACE extensions

- AI blocks (via AI Gateway only — no direct provider calls)
- Robotics simulator blocks
- Institution-specific block packs (feature-flagged)
- Level 2–3 generated-code and hybrid editing

Each phase must ship with **tests**: runtime behavior, tenant isolation on saves, authorization on assets, and AI tool boundaries where applicable.

---

## Implementation Rules (Engineering Constitution)

1. **One block, one runtime contract** — Every custom block defines: Blockly shape, JS generator, runtime method, competency IDs, lesson refs. No “UI-only” blocks.
2. **Registry before code** — Add row to [block-registry.md](./block-registry.md) before merging block implementation.
3. **No direct Scratch copy** — Match *concepts* and *pedagogy*, not trademarks, artwork, or proprietary block wording where avoidable.
4. **Thin controllers, fat runtime** — Laravel persists projects; React hosts editor; **Stage Engine** owns execution semantics.
5. **AI inspects workspace JSON** — Blocks must serialize predictably for mentor and teacher tools.
6. **Feature flags for risky scope** — Clones, hardware robotics, hybrid code edit.

---

## Scratch Parity Matrix (Summary)

Detailed rows: [block-registry.md](./block-registry.md).

| Category | Scratch (~blocks) | ACE documented L1 | ACE implemented | Target phase |
|----------|-------------------|-------------------|-----------------|--------------|
| Motion | 15 | 6 | 3 | 1–2 |
| Looks | 18 | 6 | 1 | 2 |
| Sound | 9 | 0 (in system doc) | 0 | 2 |
| Events | 11 | 5 | 1 | 1–2 |
| Control | 11 | 6 | 5 (Blockly) | 1 |
| Sensing | 18 | 5 | 0 | 2–3 |
| Operators | 17 | 4 (+ Blockly) | partial | 1 |
| Variables / lists | 15 | 3 (+ dynamic) | partial | 1–3 |
| Procedures | dynamic | planned | 0 | 3 |
| **ACE-only** | — | AI, robotics, curriculum | 0 | 4 |

---

## Documentation Roadmap (Write Before Build)

These docs are the contract for “all Scratch + ours”:

| Document | Status | Purpose |
|----------|--------|---------|
| block-coding-system.md | Done | Vision and levels |
| **scratch-parity-and-custom-engine-strategy.md** | **This doc** | Scope, phases, architecture |
| block-taxonomy-and-custom-blocks.md | Done | Category concepts |
| stage-runtime-specification.md | Done | Runtime behavior spec |
| **block-registry.md** | Started | Per-block status and metadata |
| block-project-data-model.md | **Needed** | Full save format v1+ |
| generated-code-mapping-specification.md | **Needed** | JS now, Python later |
| stage-rendering-engine ADR | **Done** | [0010-use-pixijs-for-ace-stage-rendering.md](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md) — PixiJS renderer; Phaser rejected; DOM default until needed |
| execution-model ADR | **Needed** | AsyncFunction vs worker vs VM |

Update [project-status-ledger.md](../00-executive/project-status-ledger.md) when each phase lands.

**Procedure:** After every slice, follow [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md) and update [implementation-status.md](./implementation-status.md).

---

## Open Decisions (Remaining)

1. **Generated language** — JavaScript first; Python mapping rules for Level 2.
2. **Clone semantics** — Match Scratch or simplified ACE subset.
3. **Offline** — Which blocks/assets work offline per ADR 0007.
4. **Execution model** — Keep AsyncFunction (current) vs worker/VM (future ADR).

**Resolved:** Rendering engine — PixiJS as upgrade renderer; HTML/CSS remains Level 1 default ([ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)).
**Resolved:** Project file versioning — envelope v1.1–v1.4 with backward-compatible load ([block-project-data-model.md](./block-project-data-model.md)).

---

## Recommended Delivery Order (Tied To Curriculum)

| Curriculum units | Blocks / engine required |
|------------------|--------------------------|
| Units 1–4 | Green flag, motion, looks (say), control, variables — **Phase 0–1** |
| Units 5–6 | Sound, more events, wait — **Phase 1–2** |
| Units 7–8 | Sensing, collision, broadcasts — **Phase 2** |
| Units 9–10 | Games, procedures, assessment — **Phase 2–3** |

Do not add toolbox blocks until the runtime and registry support them (avoids “blocks that do nothing”).

---

## Bottom Line For Stakeholders

- **Can we have everything Scratch has, plus more?** Yes — as a **roadmap**, with our **own engine** and **our** curriculum/AI/institution layer.
- **Can we do it all at once?** No — runtime, assets, and ~100+ block/runtime pairs are substantial; curriculum already assumes blocks not built yet.
- **What to do next?** Finish **Phase 1** docs (`block-project-data-model`, registry rows for Unit 5+ blocks), pick **rendering ADR**, then implement events + multi-sprite + remaining Level 1 motion/looks blocks in registry order.

When you say **proceed** on the application side, implement the next **registry-defined** slice with tests — not ad-hoc block additions.
