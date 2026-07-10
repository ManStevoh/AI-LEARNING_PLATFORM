# Project Status Ledger

## Purpose

This ledger records what has been completed, what has been developed, what is partially done, and what remains pending.

It should be updated after every meaningful implementation or documentation milestone.

## Current Snapshot

Date:

- 2026-07-10.

Repository:

- https://github.com/ManStevoh/AI-LEARNING_PLATFORM

Published commit:

- `8e929eb` — Add ACE backdrop library with Choose modal and procedural backdrops.

Current local implementation status:

- Laravel application foundation published in `application/`.
- GitHub Pages documentation portal published from repository root.
- Phase 2 identity/tenancy foundation implemented locally with typed institution roles, tenant context, and role-aware workspaces.
- Learning Core curriculum foundation seeded and exposed in the learner workspace UI.
- **Block coding Phase 1 complete + Phase 2 looks partial** published in `828be6b`.
- **Teacher skill mastery view** published in `65ddc0b`.
- **Sound asset uploads** published in `4c1ca17`.
- **Costume uploads** published in `7b0acd0`.
- **Stage rendering ADR 0010** (PixiJS) published in `98a8a3e`.
- **Scratch Motion/Looks/Sound/Events/Control palette parity** published in `f7c2d3c`.
- **Scratch Control clones + Sensing/Operators/Lists/My Blocks parity** published in `a79c32b`.
- **Backdrop asset uploads (envelope v1.5)** published in `e39ec5d`.
- **Stage reporter monitors (envelope v1.6)** published in `ae12511`.
- **ACE backdrop library + procedural backdrops (envelope v1.7)** published in `8e929eb`.
- **Status tracking procedure** documented as standard process for done vs pending updates.

## Completed Documentation

Status: Completed at foundation and implementation-guidance level.

Completed areas:

- executive/product vision,
- Engineering Constitution,
- research registry and evidence policy,
- source-to-decision traceability,
- product requirements,
- personas,
- feature catalogue,
- role/permission/entitlement matrix,
- core user journeys,
- curriculum and pedagogy framework,
- computing knowledge graph,
- Level 1 curriculum/package requirements,
- Level 2-5 roadmap,
- assessment framework,
- Kenya CBC alignment process,
- backend architecture,
- database/domain model strategy,
- API standards,
- modular boundary rules,
- queue/job/event catalog,
- AI architecture,
- AI Gateway implementation spec,
- AI governance and safety,
- AI tool registry,
- RAG ingestion spec,
- learner digital twin,
- Learning Genome,
- AI-native education platform strategy,
- block coding system,
- block taxonomy,
- scratch parity and custom engine strategy,
- block registry (living),
- block project data model,
- block coding implementation status (living),
- status tracking procedure,
- stage runtime spec,
- browser IDE spec,
- code execution sandbox spec,
- assignment grading,
- Git/portfolio integration,
- institution platform and onboarding,
- UI/UX research and screen specs,
- accessibility checklist,
- security baseline,
- OWASP ASVS matrix,
- privacy/data protection baseline,
- legal document checklist,
- child safety policy,
- AI data handling policy,
- infrastructure and CI/CD strategy,
- deployment/DR/cost/SLO docs,
- subscription model,
- pricing/unit economics,
- go-to-market and customer success,
- roadmap, release gates, pilot checklist, sprint plan,
- engineering coding standards,
- Git/review workflow,
- ADRs,
- architecture diagrams,
- Cursor engineering rule.

## Developed Artifacts

Status: Documentation repository, GitHub Pages docs portal, and application foundation published. Identity/tenancy foundation started locally.

Developed:

- Markdown documentation repository,
- OpenAPI starter file,
- design token JSON starter,
- ADR set,
- Mermaid architecture diagrams,
- Cursor always-applied rule,
- engineering standards files,
- Laravel 13 application scaffold,
- Inertia Laravel middleware,
- React/Inertia entrypoint,
- first React landing page,
- Tailwind/Vite frontend build,
- module skeleton folder,
- safe `.env.example` defaults,
- Institution model,
- institution membership migration,
- institution factory,
- demo institution seed data,
- basic Laravel feature test update,
- institution membership test,
- Docsify-style GitHub Pages documentation portal,
- searchable documentation sidebar,
- typed institution role enum,
- tenant context service,
- tenant-scoped institution membership helper methods,
- expanded institution role tests,
- session authentication (login, register, logout),
- protected dashboard route,
- auth feature tests,
- membership status on institution_user pivot,
- tenant context middleware and session switching,
- institution policy for view/update access,
- institution select and profile pages,
- cross-tenant access tests,
- role-aware app shell with learner, teacher, and institution dashboards,
- workspace navigation shared through Inertia props,
- Curriculum module foundation (domains, concepts, skills, courses, lessons),
- Level 1 block coding seed catalog,
- curriculum catalog service and seeder tests,
- learner dashboard wired to published Level 1 course outline,
- learner learning-path page (`/learner/learn`) with unit list,
- demo learner seed user (`learner@example.com`),
- learner curriculum dashboard feature tests,
- audit logging foundation (`audit_logs` table, `AuditLogger`, auth and tenant switch events),
- learner lesson detail page (`/learner/learn/{slug}`) with skills and unit context,
- Blockly workspace shell with Level 1 toolbox, stage preview placeholder, and generated JavaScript panel,
- stage runtime with green-flag execution, sprite motion/looks blocks, and run/stop controls,
- tenant-scoped block project persistence with auto-save and reload on lesson pages,
- AI Gateway shell with fake provider, usage logging, and learner mentor endpoint,
- Level 1 starter Blockly projects for all ten lessons with lesson-page load fallback,
- learner lesson AI mentor panel wired to the gateway endpoint,
- AI prompt registry, renderer, and mentor context builder for lesson-aware responses,
- teacher block project review list and detail views with tenant-scoped access,
- teacher feedback notes on reviewed block projects with upsert, audit logging, and tenant isolation,
- database-backed AI prompt registry with version publishing workflow and config fallback,
- institution-admin AI prompt management UI with draft save, publish, and audit logging,
- teacher class overview with institution-scoped learner progress summaries and live dashboard metrics,
- teacher skill mastery view with skill evidence, prerequisite gaps, and inactive-learner support flags,
- tenant-scoped block project sound uploads with envelope v1.3 refs,
- tenant-scoped block project costume uploads with envelope v1.4 sprite costume refs,
- ADR 0010: PixiJS for ACE stage rendering (Phaser rejected; DOM Level 1 default).
- Scratch Control clones + Sensing/Operators/Lists/My Blocks palette parity.
- tenant-scoped block project backdrop uploads with envelope v1.5 stage refs.
- stage reporter monitors with toolbox checkboxes and overlay (envelope v1.6).
- ACE backdrop library (25 SVGs) with Choose modal + procedural surprise backdrops (envelope v1.7).

### Block Coding (Published)

Status: Phase 1–3 Scratch parity + uploads + monitors + backdrop library published. See `documentation/06-block-coding/implementation-status.md`.

Developed:

- Scratch-style coding studio UI (tabs, stage, sprite pane, green flag/stop),
- Blockly Zelos theme and Scratch palette order,
- ACE Stage Engine Phases 1–3,
- Operators/Lists/My Blocks,
- project envelope through v1.7,
- ACE backdrop library + procedural generator,
- block registry and scratch parity strategy docs,
- StageRuntime smoke 32/32; PHPUnit 110.

Next action:

- configure PostgreSQL once local services are available.

## Partially Developed Artifacts

### Laravel Application Scaffold

Status:

- scaffold completed to first foundation baseline in `application/` and published to GitHub.

Important:

- local `.env` exists and must not be committed,
- Docker/PostgreSQL local services are not configured because Docker is not available on the machine.

Next action:

- add authentication/tenancy policies and middleware next,
- configure real PostgreSQL once local services are available.

### Identity And Tenancy Foundation

Status:

- baseline completed with typed institution roles, tenant context middleware, institution policies, and role-aware workspaces.

Completed baseline:

- `InstitutionRole` enum,
- tenant context service,
- institution membership helper methods on `User`,
- role-scoped membership helper on `Institution`,
- seeder role value now uses the enum,
- tests for tenant-scoped role checks and tenant context lifecycle,
- session authentication (login, register, logout),
- tenant context middleware and institution switching,
- institution policy for view/update access,
- role-aware app shell with learner, teacher, and institution dashboards.

Next action:

- configure PostgreSQL once local services are available.

### Block Coding / ACE Stage Engine

Status:

- Phase 0 complete (motion, looks say, green flag).
- Phase 1 complete (events, control, envelope v1.1, active sprite, sprite clicked).

Completed in Phase 1:

- 11 custom ACE blocks with runtime wiring,
- keyboard and broadcast event bus,
- project save format v1.1,
- living implementation status doc.

Next action:

- commit and push Phase 1 slice,
- begin Phase 2 looks/sound blocks and rendering engine ADR.

See:

- `documentation/06-block-coding/implementation-status.md`,
- `documentation/06-block-coding/block-registry.md`.

## Not Yet Developed

Application:

- full role/permission implementation beyond institution membership roles,
- API implementation.

## Latest Verification

Application verification:

- `php artisan route:list` passes,
- `php artisan test` passes with 110 tests and 629 assertions,
- `npm run build` passes,
- `application/.env` is ignored,
- `application/vendor`, `application/node_modules`, and `application/public/build` are ignored.

Latest local verification:

- tenant context middleware, institution switching, and cross-tenant policy tests pass,
- learner dashboard and learning-path pages render published Level 1 curriculum,
- auth login/logout and institution switch actions are audit logged,
- block project save/load with tenant-scoped persistence and auto-save on lesson pages,
- AI Gateway fake provider mentor endpoint with usage logging tests,
- starter Blockly projects and lesson mentor UI integration,
- prompt registry and mentor context builder with PHPUnit coverage,
- teacher block project review routes and UI,
- teacher block project feedback save with audit logging and tenant isolation tests,
- AI prompt registry database persistence, publish workflow, and seeder tests,
- institution-admin prompt management routes, UI, and authorization tests,
- teacher class overview routes, progress service, and tenant-scoped learner summary tests,
- teacher skill mastery routes, service, prerequisite/stale support flags, and tenant isolation tests,
- block project sound upload/list/stream/delete routes with tenant and ownership tests,
- block project costume upload/list/stream/delete routes with tenant and ownership tests,
- block project envelope v1.1 save/load with sprite state (PHPUnit),
- Scratch Phase 3 clones/sensing/operators/lists/My Blocks (StageRuntime smoke 25/25; published `a79c32b`).
- block project backdrop upload/list/stream/delete with envelope v1.5 (PHPUnit 6; smoke 27/27; published `e39ec5d`).
- stage reporter monitors with envelope v1.6 (PHPUnit persistence; smoke 31/31; published `ae12511`).
- ACE backdrop library + procedural backdrops with envelope v1.7 (PHPUnit persistence; smoke 32/32; published `8e929eb`).

Learning:

- actual Level 1 lesson scripts,
- worksheets,
- Blockly starter projects,
- quizzes,
- rubrics,
- teacher guides,
- learner workbook.

AI:

- AI Gateway code,
- provider adapters,
- prompt registry,
- RAG ingestion implementation,
- AI tool registry implementation,
- AI evaluation datasets.

Coding:

- full stage/sprite engine Phase 2+ (costumes, sound, sensing, collision),
- browser IDE,
- sandbox integration,
- assignment grading implementation.

Note: Blockly editor and Phase 0–1 ACE Stage Engine are **partially implemented locally** — see `06-block-coding/implementation-status.md`. Do not list "Blockly runtime code" as wholly absent.

Business/operations:

- payment integration,
- institution pilot contracts,
- legal-reviewed policies,
- production infrastructure,
- monitoring,
- customer support tooling.

Design:

- actual Figma design system,
- clickable prototypes,
- production UI components.

## Validation Pending

Still requires field evidence:

- school willingness to pay,
- teacher workflow fit,
- learner engagement,
- parent demand,
- AI helpfulness,
- AI cost per learner,
- offline needs,
- device/connectivity realities,
- curriculum fit,
- support burden,
- pilot conversion rate.

## Publication Status

Published:

- documentation foundation to GitHub,
- GitHub Pages documentation portal,
- Laravel application foundation,
- Phase 2 tenancy helpers and session authentication foundation,
- tenant context middleware and institution policies,
- role-aware workspace app shell,
- Learning Core curriculum foundation,
- learner workspace curriculum catalog UI,
- audit logging foundation,
- learner lesson detail pages,
- Blockly workspace shell,
- stage runtime and green-flag execution,
- block project save/load persistence,
- PHPUnit-required backend rule,
- AI Gateway fake provider shell,
- Level 1 starter Blockly projects,
- learner lesson AI mentor UI,
- AI prompt registry and mentor context builder,
- teacher block project review views,
- teacher feedback notes on reviewed block projects,
- database-backed AI prompt registry with version publishing workflow,
- institution-admin AI prompt management UI,
- teacher class overview with learner progress summaries,
- teacher skill mastery view with support gap detection,
- block project sound uploads with Sounds tab and envelope v1.3,
- block project costume uploads with Costumes tab and envelope v1.4,
- ADR 0010 PixiJS stage rendering decision,
- Scratch Motion/Looks/Sound/Events/Control palette parity,
- Scratch Control clones + Sensing/Operators/Lists/My Blocks palette parity,
- block project backdrop uploads with Backdrops tab and envelope v1.5,
- stage reporter monitors with toolbox checkboxes and overlay (envelope v1.6),
- ACE backdrop library with Choose modal + procedural surprise backdrops (envelope v1.7),
- Scratch block coding studio and ACE Stage Engine Phases 1–3,
- block coding docs (registry, parity strategy, status procedure).

Not published (local only):

- ACE backdrop library + procedural backdrops (envelope v1.7),
- PostgreSQL local setup (Docker unavailable).

Not published (blocked):

## Immediate Next Build Sequence

1. Publish ACE backdrop library slice (envelope v1.7).
2. Configure PostgreSQL once local services are available.
3. Pixel color sensing (canvas/Pixi) when needed.

## Ledger Update Rule

After each milestone, follow [status-tracking-procedure.md](./status-tracking-procedure.md) and update:

- module living status (e.g. `06-block-coding/implementation-status.md`),
- completed documentation,
- developed artifacts,
- partially developed artifacts,
- pending work,
- validation evidence,
- commit/publish status.
