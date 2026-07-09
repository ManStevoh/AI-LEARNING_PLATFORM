# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2 — Scratch Motion/Looks/Sound/Events/Control parity (visible palette)
- **Published to GitHub:** pending Scratch parity publish
- **Custom ACE blocks:** ~63 done (plus Blockly control/math/text/variables)
- **Tests:** 102 PHPUnit + StageRuntime smoke 20/20

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1 events + control | complete |
| Runtime | Phase 2 motion (full Scratch motion palette) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 2 looks (say/think/costumes/effects/layers) | complete for L1 Scratch set |
| Runtime | Phase 2 sound (play/start/effects/volume) | complete for L1 Scratch set |
| Runtime | Phase 2–3 sensing | complete for L1 scope |
| Assets | Sound + costume uploads | envelope v1.3 / v1.4 |
| Architecture | Stage rendering ADR | ADR 0010 |
| Teacher | Skill mastery | `/teacher/skills` |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Backdrop asset uploads | 2 | data model |
| P2 | Stage monitor checkboxes for reporters | 2 | Scratch UI |
| P3 | Clones / My Blocks | 3 | parity strategy |
| P4 | PixiJS renderer adapter when needed | 2 | ADR 0010 |

## Verification (Latest)

```text
php artisan test              → 102 passed
node stageRuntime.smoke.mjs   → 20/20 passed
npm run build                 → pass
```

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
- [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)
