# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2 (looks) — **partial**
- **Published to GitHub:** `828be6b`
- **Custom ACE blocks:** 16 done / ~35 Level 1 documented
- **Tests:** 85 PHPUnit

## Done

| Area | Item | Evidence |
|------|------|----------|
| Editor | Blockly 13 + Zelos + Scratch-style theme | `aceTheme.js`, `blocklySetup.js` |
| Editor | Level 1 toolbox (all core categories) | `levelOneToolbox.js` |
| UI | Scratch studio shell + collapsible nav | `BlockLessonWorkspace.jsx`, `ShellLayoutContext.jsx` |
| Runtime | Phase 1 events + control (complete) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 2 looks: think, show, hide, set size | `stageRuntime.js`, `BlockStage.jsx` |
| Runtime | Phase 2 looks: switch costume (emoji list), backdrop (color presets) | partial — no asset upload yet |
| Persistence | Project envelope v1.1 + sprite size/costumes | `projectEnvelope.js` |
| Backend | Tenant-scoped save/load + teacher review | `BlockProject*` services, tests |
| Docs | Strategy, registry, data model, status procedure | `06-block-coding/*.md` |

### Blocks done

Green flag, key pressed, sprite clicked, broadcast, receive, move, turn, go to xy, say, **think**, **show**, **hide**, **set size**, wait, stop.  
Partial: **switch costume** (numbered emoji costumes), **switch backdrop** (color presets).

## In Progress / Partial

| Area | Item | Remaining |
|------|------|-----------|
| Looks | Switch costume | Costume editor UI; image assets via storage adapter |
| Looks | Switch backdrop | Named backdrop library; not only color presets |
| Runtime | Variables | Per-sprite scope not implemented |
| Sound | All blocks | Phase 2 remainder |
| Sensing | All blocks | Phase 2–3 |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Sound blocks + Web Audio | 2 | registry (TBD rows) |
| P2 | Sensing blocks + collision | 2–3 | stage-runtime spec |
| P2 | Stage rendering ADR (PixiJS vs Phaser) | 2 | parity strategy |
| P3 | Motion: glide, point direction, bounce | 2 | registry |

## Verification (Latest)

```text
php artisan test   → 85 passed
npm run build      → pass (run after this slice)
```

Manual smoke:

- **think** shows italic thought bubble
- **hide** / **show** toggle sprite visibility
- **set size to** scales sprite on stage
- **switch backdrop** changes stage color
- **switch costume to 1** uses emoji from sprite costumes list

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
