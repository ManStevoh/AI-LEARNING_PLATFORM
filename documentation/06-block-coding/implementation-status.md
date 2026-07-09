# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 3 — palette parity + backdrop asset uploads (envelope v1.5)
- **Published to GitHub:** `e39ec5d`
- **Custom ACE blocks:** ~78 done (plus Blockly control/math/text/variables/lists/procedures)
- **Tests:** 108 PHPUnit + StageRuntime smoke 27/27

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1–3 events/control/clones/sensing | complete |
| Runtime | Phase 2 motion/looks/sound (Scratch palettes) | `stageRuntime.js`, `aceBlocks.js` |
| Toolbox | Scratch category order + Operators/Lists/My Blocks | `levelOneToolbox.js` |
| Assets | Sound uploads | envelope v1.3 |
| Assets | Costume uploads | envelope v1.4 |
| Assets | Backdrop uploads | envelope v1.5, Backdrops tab |
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
| P1 | Stage monitor checkboxes for reporters | 2 | Scratch UI |
| P2 | Pixel color sensing (canvas/Pixi) | 3 | ADR 0010 |
| P3 | PixiJS renderer adapter when needed | 2 | ADR 0010 |

## Verification (Latest)

```text
php artisan test              → 108 passed
node stageRuntime.smoke.mjs   → 27/27 passed
npm run build                 → pass
```

## Related

- [block-registry.md](./block-registry.md)
- [block-project-data-model.md](./block-project-data-model.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
- [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)
