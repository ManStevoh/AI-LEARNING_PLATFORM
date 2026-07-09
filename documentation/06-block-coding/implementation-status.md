# Block Coding Implementation Status

Living document. Update after every block-coding slice per [status-tracking-procedure.md](../00-executive/status-tracking-procedure.md).

## Snapshot

- **Last updated:** 2026-07-10
- **Engine phase:** Phase 2 (looks + sound) — **partial**
- **Published to GitHub:** `36f35d4`
- **Custom ACE blocks:** 19 done / ~35 Level 1 documented
- **Tests:** 85 PHPUnit

## Done

| Area | Item | Evidence |
|------|------|----------|
| Editor | Blockly 13 + Zelos + Scratch-style theme | `aceTheme.js`, `blocklySetup.js` |
| Editor | Sound category in toolbox | `levelOneToolbox.js` |
| Runtime | Phase 1 events + control (complete) | `stageRuntime.js`, `aceBlocks.js` |
| Runtime | Phase 2 looks (think, show, hide, size, costume/backdrop presets) | partial |
| Runtime | Phase 2 sound: play, stop all, set volume | `soundEngine.js`, `stageRuntime.js` |
| Persistence | Project envelope v1.1 | `projectEnvelope.js` |
| Backend | Tenant-scoped save/load + teacher review | `BlockProject*` services |

### Blocks done

Events, motion, looks (incl. partial costume/backdrop), control, **play sound**, **stop all sounds**, **set volume**.  
Sound uses Web Audio presets (pop, click, success, drum) — no uploaded assets yet.

## In Progress / Partial

| Area | Item | Remaining |
|------|------|-----------|
| Sound | Uploaded sound assets | Tenant storage adapter + envelope v1.3 |
| Looks | Costume/backdrop | Asset libraries beyond emoji/color presets |
| Sensing | All blocks | Phase 2–3 |

## Pending (Next Slices)

| Priority | Item | Phase | Ref |
|----------|------|-------|-----|
| P1 | Sensing blocks (touching, key, mouse) | 2–3 | registry |
| P2 | Motion: glide, bounce, point direction | 2 | registry |
| P3 | Teacher skill mastery view | app | ledger |

## Verification (Latest)

```text
php artisan test   → 85 passed
npm run build      → pass
```

Manual smoke:

- **play sound pop** after green flag (browser may require user gesture — green flag counts)
- **set volume to** 50 then play sounds
- **stop all sounds** during a script

## Related

- [block-registry.md](./block-registry.md)
- [project-status-ledger.md](../00-executive/project-status-ledger.md)
