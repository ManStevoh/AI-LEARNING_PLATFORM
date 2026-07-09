# Status Tracking Procedure

## Purpose

Every implementation slice, documentation milestone, or bugfix batch must leave a clear record of **what was done**, **what is partially done**, and **what remains pending**.

This procedure is mandatory. It prevents drift between code, docs, and the project status ledger.

## When To Run

Run this procedure:

- after each **proceed** implementation slice (before telling the user the slice is complete),
- after a meaningful documentation-only pass,
- after a publish commit (update published commit hash),
- when a module moves phase (e.g. Block Coding Phase 0 → Phase 1).

Do **not** skip because work is "local only" — local work belongs in the ledger under **local / not yet published**.

## Files To Update (In Order)

| Order | File | Role |
|-------|------|------|
| 1 | Module living status doc | Per-module done vs pending detail (e.g. `06-block-coding/implementation-status.md`) |
| 2 | Module registry / spec | Row-level status if applicable (e.g. `block-registry.md`) |
| 3 | `project-status-ledger.md` | Executive snapshot: developed, partial, verification, publish state |
| 4 | `pending-work-register.md` | Only when priorities or P0–P9 items change |
| 5 | `documentation-completeness-and-pending-work-audit.md` | When documentation inventory changes (new files or sections completed) |

Optional for large releases:

- `13-roadmap/implementation-backlog.md` ticket IDs,
- ADR or OpenAPI when contracts change.

## Entry Template (Module Living Doc)

Use this section structure in module `implementation-status.md` files:

```markdown
## Snapshot

- **Last updated:** YYYY-MM-DD
- **Phase:** e.g. Phase 1 (in progress)
- **Published:** yes | no (commit hash if yes)

## Done

| Item | Evidence |
|------|----------|
| Short name | file path, test name, or doc path |

## In Progress / Partial

| Item | Blocker or remaining work |
|------|---------------------------|

## Pending (Next Slices)

| Item | Phase | Registry / backlog ref |
|------|-------|------------------------|

## Verification

- `php artisan test` — N tests
- `npm run build` — pass/fail
```

## Entry Template (Project Status Ledger)

After each slice, update in `project-status-ledger.md`:

1. **Current Snapshot** — date, published commit, one-line local status.
2. **Developed Artifacts** — bullet list of new shipped items.
3. **Partially Developed Artifacts** — module subsection with *done* vs *next*.
4. **Latest Verification** — test count, build status.
5. **Publication Status** — published vs not published lists.
6. **Immediate Next Build Sequence** — ordered next 2–3 slices.

## Definition Of Done (Status)

A slice is not complete until:

- code merged or ready to commit,
- tests pass (PHPUnit for backend; build for frontend),
- module registry / living status updated,
- `project-status-ledger.md` updated,
- user can see what to **proceed** with next.

## Module Living Status Documents

| Module | Living status file |
|--------|-------------------|
| Block Coding | `documentation/06-block-coding/implementation-status.md` |
| AI Gateway | *(create when second major slice lands)* |
| Curriculum content | `documentation/03-curriculum/level-1-complete-content-package.md` + ledger |

Add a row here when a module gets its first living status doc.

## Roles

| Actor | Responsibility |
|-------|----------------|
| Implementing engineer / agent | Updates files 1–3 before marking slice complete |
| Reviewer | Confirms ledger matches diff |
| Product owner | Adjusts `pending-work-register.md` priorities |

## Related Documents

- [project-status-ledger.md](./project-status-ledger.md)
- [pending-work-register.md](./pending-work-register.md)
- [engineering-constitution.md](./engineering-constitution.md) — Definition of Done
- [06-block-coding/implementation-status.md](../06-block-coding/implementation-status.md)
