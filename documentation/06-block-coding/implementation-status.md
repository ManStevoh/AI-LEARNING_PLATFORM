# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 3 — assets + libraries + monitors
- **Published to GitHub:** `ce19a08`
- **Custom ACE blocks:** ~84 done (plus Blockly control/math/text/variables/lists/procedures)
- **Tests:** 120 PHPUnit + StageRuntime smoke 49/49 + stage renderer smoke 11/11

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1–3 events/control/clones/sensing | complete |
| Runtime | Phase 2 motion/looks/sound (Scratch palettes) | `stageRuntime.js`, `aceBlocks.js` |
| Toolbox | Scratch category order + Operators/Lists/My Blocks | `levelOneToolbox.js` |
| Assets | Sound / costume / backdrop uploads | envelope v1.3–v1.5 |
| Assets | ACE backdrop library (25 SVGs) + Choose modal | `backdropLibrary.js`, `AssetLibraryModal.jsx` |
| Assets | ACE sprite library (48 SVGs) + Choose sprite/costume modals | `spriteLibrary.js`, `ChooseSpriteModal.jsx` |
| Assets | Shared Scratch-style asset library UI | `AssetLibraryModal.jsx` |
| Assets | Procedural surprise backdrops | `proceduralBackdrop.js` |
| Assets | AI-generated backdrops (child-safe, AI Gateway) | envelope v2.0, `AiBackdropGeneratorService` |
| UI | Stage monitor checkboxes + overlay | envelope v1.6 |
| UI | Variable/list stage monitors (Blockly chrome) | envelope v1.9, `dynamicMonitors.js` |
| Sensing | Pixel color touching (canvas sampler) | `stageColorSampler.js` |
| Architecture | Stage rendering ADR | ADR 0010 |
| Architecture | PixiJS stage renderer adapter (feature-flagged) | `stageRenderers/` |
| Runtime | Pen layer with Blockly blocks + Pixi/DOM rendering | envelope v2.1, `penLayer.js` |
| Teacher | Skill mastery | `/teacher/skills` |

## In Progress / Partial

| Item | Blocker or remaining work |
|------|---------------------------|
| Loudness | Stub until microphone path |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Pen stamp block | 3 | block registry |
| P2 | Video sensing extension | 4 | block registry |

## Verification (Latest)

```text
php artisan test                 → 120 passed
node stageRuntime.smoke.mjs      → 49/49 passed
node stageRenderer.smoke.mjs     → 11/11 passed
npm run build                    → pass
```

## Related

- [block-registry.md](./block-registry.md)
- [block-project-data-model.md](./block-project-data-model.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
- [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)
