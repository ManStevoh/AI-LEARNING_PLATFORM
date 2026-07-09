# Project Status Ledger

## Purpose

This ledger records what has been completed, what has been developed, what is partially done, and what remains pending.

It should be updated after every meaningful implementation or documentation milestone.

## Current Snapshot

Date:

- 2026-07-09.

Repository:

- https://github.com/ManStevoh/AI-LEARNING_PLATFORM

Published commit:

- `5d9eeab Add teacher review views for institution-scoped learner block projects.`

Current local implementation status:

- Laravel application foundation published in `application/`.
- GitHub Pages documentation portal published from repository root.
- Phase 2 identity/tenancy foundation implemented locally with typed institution roles, tenant context, and role-aware workspaces.
- Learning Core curriculum foundation seeded and exposed in the learner workspace UI.

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
- teacher block project review list and detail views with tenant-scoped access.

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

## Not Yet Developed

Application:

- full role/permission implementation beyond institution membership roles,
- API implementation.

## Latest Verification

Application verification:

- `php artisan route:list` passes,
- `php artisan test` passes with 63 tests and 352 assertions,
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
- teacher block project review routes and UI.

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

- Blockly runtime code,
- stage/sprite engine,
- browser IDE,
- sandbox integration,
- assignment grading implementation.

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
- teacher block project review views (local, pending commit).

Not published:

- PostgreSQL local setup (next slice).

## Immediate Next Build Sequence

1. Configure database for PostgreSQL once local services are available.
2. Persist prompt registry to database tables with version publishing workflow.
3. Add teacher feedback notes on reviewed block projects.

## Ledger Update Rule

After each milestone, update:

- completed documentation,
- developed artifacts,
- partially developed artifacts,
- pending work,
- validation evidence,
- commit/publish status.
