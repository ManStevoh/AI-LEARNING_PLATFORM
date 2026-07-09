# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2–3 — **partial** (motion Level 1 complete)
- **Published to GitHub:** pending this slice
- **Custom ACE blocks:** 27 done / ~35 Level 1 documented
- **Tests:** 85 PHPUnit

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1 events + control | complete |
| Runtime | Phase 2 motion (all documented L1 blocks) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 2 looks + sound | partial |
| Runtime | Phase 2–3 sensing | complete for L1 scope |

### Motion blocks (all done)

move, turn, go to x/y, **glide**, **point in direction**, **if on edge bounce**.

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Teacher skill mastery view | app | ledger |
| P2 | Sound asset uploads | 2 | data model v1.3 |
| P3 | Stage rendering ADR | 2 | parity strategy |

## Verification (Latest)

```text
php artisan test   → 85 passed
npm run build      → pass
```

Manual smoke:

- **glide 1 secs to x 100 y 0** — smooth animation
- **forever** move + **if on edge bounce** — paddle/ball style

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
