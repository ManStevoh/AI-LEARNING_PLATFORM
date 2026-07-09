# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 3 — Control clones + Sensing/Operators/Lists/My Blocks palette parity
- **Published to GitHub:** pending (local slice ready)
- **Custom ACE blocks:** ~78 done (plus Blockly control/math/text/variables/lists/procedures)
- **Tests:** 102 PHPUnit + StageRuntime smoke 25/25

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1 events + control | complete |
| Runtime | Phase 2 motion/looks/sound (Scratch palettes) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 3 clones | `createCloneOf`, `deleteThisClone`, `onCloneStart` |
| Runtime | Phase 3 sensing (ask, mouse, timer, distance, current, …) | `aceBlocks.js` + runtime APIs |
| Toolbox | Scratch category order + Operators/Lists/My Blocks | `levelOneToolbox.js` |
| Assets | Sound + costume uploads | envelope v1.3 / v1.4 |
| Architecture | Stage rendering ADR | ADR 0010 |
| Teacher | Skill mastery | `/teacher/skills` |

## In Progress / Partial

| Item | Blocker or remaining work |
|------|---------------------------|
| Color-touching sensing | API present; returns `false` until pixel sampling |
| Loudness | Stub until microphone path |
| Stage monitor checkboxes | Scratch UI chrome only |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Backdrop asset uploads | 2 | data model |
| P2 | Stage monitor checkboxes for reporters | 2 | Scratch UI |
| P3 | Pixel color sensing (canvas/Pixi) | 3 | ADR 0010 |
| P4 | PixiJS renderer adapter when needed | 2 | ADR 0010 |

## Verification (Latest)

```text
php artisan test              → 102 passed
node stageRuntime.smoke.mjs   → 25/25 passed
npm run build                 → pass
```

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
- [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)
