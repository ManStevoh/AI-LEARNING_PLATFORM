# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 3 — assets + monitors + backdrop library (envelope v1.7)
- **Published to GitHub:** `8e929eb`
- **Custom ACE blocks:** ~78 done (plus Blockly control/math/text/variables/lists/procedures)
- **Tests:** 110 PHPUnit + StageRuntime smoke 32/32

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1–3 events/control/clones/sensing | complete |
| Runtime | Phase 2 motion/looks/sound (Scratch palettes) | `stageRuntime.js`, `aceBlocks.js` |
| Toolbox | Scratch category order + Operators/Lists/My Blocks | `levelOneToolbox.js` |
| Assets | Sound / costume / backdrop uploads | envelope v1.3–v1.5 |
| Assets | ACE backdrop library (25 SVGs) + Choose modal | `backdropLibrary.js`, `ChooseBackdropModal.jsx` |
| Assets | Procedural surprise backdrops | `proceduralBackdrop.js` |
| UI | Stage monitor checkboxes + overlay | envelope v1.6 |
| Architecture | Stage rendering ADR | ADR 0010 |
| Teacher | Skill mastery | `/teacher/skills` |

## In Progress / Partial

| Item | Blocker or remaining work |
|------|---------------------------|
| Color-touching sensing | API present; returns `false` until pixel sampling |
| Loudness | Stub until microphone path |
| AI-generated backdrops | Future slice via AI Gateway |
| Variable/list stage monitors | Blockly variable UI chrome |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Pixel color sensing (canvas/Pixi) | 3 | ADR 0010 |
| P2 | AI backdrop generation (child-safe) | 4 | AI Gateway |
| P3 | PixiJS renderer adapter when needed | 2 | ADR 0010 |

## Verification (Latest)

```text
php artisan test              → 110 passed
node stageRuntime.smoke.mjs   → 32/32 passed
npm run build                 → pass
```

## Related

- [block-registry.md](./block-registry.md)
- [block-project-data-model.md](./block-project-data-model.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
- [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)
