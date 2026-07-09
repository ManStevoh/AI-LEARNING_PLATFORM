# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2–3 (looks, sound, sensing) — **partial**
- **Published to GitHub:** `87a7ea9` (sensing slice pending commit)
- **Custom ACE blocks:** 24 done / ~35 Level 1 documented
- **Tests:** 85 PHPUnit

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1 events + control | complete |
| Runtime | Phase 2 looks + sound | partial (presets only) |
| Runtime | Phase 2–3 sensing: touching, mouse x/y, key?, timer | `stageRuntime.js`, `BlockStage.jsx` |
| Editor | Sensing category in toolbox | `levelOneToolbox.js` |

### Blocks done (24)

All Phase 1 blocks, looks/sound blocks, plus **touching**, **mouse x/y**, **key pressed?**, **timer**.

## In Progress / Partial

| Area | Item | Remaining |
|------|------|-----------|
| Sensing | Touching another sprite | Multi-sprite collision |
| Sound | Uploaded assets | Storage adapter |
| Looks | Costume/backdrop libraries | Asset pipeline |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Motion: glide, bounce on edge | 2 | registry |
| P2 | Teacher skill mastery view | app | ledger |
| P3 | Stage rendering ADR | 2 | parity strategy |

## Verification (Latest)

```text
php artisan test   → 85 passed
npm run build      → pass
```

Manual smoke:

- **if touching edge** inside forever + move loop
- **mouse x** / **mouse y** in say block while moving mouse over stage
- **key space pressed?** with if during run

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
