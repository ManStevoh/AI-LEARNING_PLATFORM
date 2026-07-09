# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2–3 — **partial** (looks costumes + sound uploads; rendering ADR accepted)
- **Published to GitHub:** pending ADR 0010 publish
- **Custom ACE blocks:** 27 done / ~35 Level 1 documented
- **Tests:** 102 PHPUnit (unchanged this slice)

## Done

| Area | Item | Evidence |
|------|------|----------|
| Runtime | Phase 1 events + control | complete |
| Runtime | Phase 2 motion (all documented L1 blocks) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 2 looks + sound | presets + sound/costume uploads |
| Runtime | Phase 2–3 sensing | complete for L1 scope |
| Teacher | Skill mastery view + support gaps | `TeacherSkillMasteryService`, `/teacher/skills` |
| Sounds | Tenant-scoped upload + envelope v1.3 | `BlockProjectSoundService`, Sounds tab |
| Costumes | Tenant-scoped upload + envelope v1.4 | `BlockProjectCostumeService`, Costumes tab |
| Architecture | Stage rendering ADR | [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md) — PixiJS; Phaser rejected; DOM default |

### Motion blocks (all done)

move, turn, go to x/y, **glide**, **point in direction**, **if on edge bounce**.

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Backdrop asset uploads | 2 | data model |
| P2 | PixiJS renderer adapter (when needed) | 2 | ADR 0010 |
| P3 | Execution-model ADR | 2–3 | parity strategy |

## Verification (Latest)

```text
php artisan test   → 102 passed (no code change this slice)
npm run build      → n/a (docs-only)
```

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
- [ADR 0010](../../architecture/decisions/0010-use-pixijs-for-ace-stage-rendering.md)
