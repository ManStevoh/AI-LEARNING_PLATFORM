# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2–3 — **partial** (motion Level 1 complete)
- **Published to GitHub:** `b900247`
- **Custom ACE blocks:** 27 done / ~35 Level 1 documented
- **Tests:** 90 PHPUnit

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1 events + control | complete |
| Runtime | Phase 2 motion (all documented L1 blocks) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 2 looks + sound | partial |
| Runtime | Phase 2–3 sensing | complete for L1 scope |
| Teacher | Skill mastery view + support gaps | `TeacherSkillMasteryService`, `/teacher/skills` |

### Motion blocks (all done)

move, turn, go to x/y, **glide**, **point in direction**, **if on edge bounce**.

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Sound asset uploads | 2 | data model v1.3 |
| P2 | Stage rendering ADR | 2 | parity strategy |

## Verification (Latest)

```text
php artisan test   → 90 passed
npm run build      → pass
```

Manual smoke:

- **glide 1 secs to x 100 y 0** — smooth animation
- **forever** move + **if on edge bounce** — paddle/ball style

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
