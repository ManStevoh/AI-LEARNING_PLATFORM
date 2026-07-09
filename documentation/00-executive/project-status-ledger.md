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

- `0cac615 Fix GitHub Pages docs sidebar`

Current local implementation status:

- Laravel application foundation published in `application/`.
- GitHub Pages documentation portal published from repository root.
- Phase 2 identity/tenancy foundation started locally with typed institution roles and tenant context support.

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
- auth feature tests.

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

- started with typed institution role primitives and request-scoped tenant context support.

Completed baseline:

- `InstitutionRole` enum,
- tenant context service,
- institution membership helper methods on `User`,
- role-scoped membership helper on `Institution`,
- seeder role value now uses the enum,
- tests for tenant-scoped role checks and tenant context lifecycle.

Next action:

- add authentication UI/API,
- add tenant context middleware,
- add policies for institution-scoped resources,
- add audit logging foundation.

## Not Yet Developed

Application:

- full role/permission implementation beyond institution membership roles,
- additional database migrations,
- additional seeders,
- broader authorization and tenant isolation tests,
- API implementation.

## Latest Verification

Application verification:

- `php artisan route:list` passes,
- `php artisan test` passes with 14 tests and 49 assertions,
- `npm run build` passes,
- `application/.env` is ignored,
- `application/vendor`, `application/node_modules`, and `application/public/build` are ignored.

Latest local verification:

- linter check reports no errors for the new tenancy files,
- expanded test run is in progress/backgrounded in the local terminal after adding Phase 2 tenancy helpers.

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
- Laravel application foundation.

Not published:

- latest local Phase 2 tenancy helpers and session auth foundation.

## Immediate Next Build Sequence

1. Finish identity/tenancy primitives.
2. Add tenant context middleware.
3. Add institution-scoped policies.
4. Add audit logging foundation.
6. Configure database for PostgreSQL once local services are available.
7. Continue Learning Core baseline after tenant isolation is protected.

## Ledger Update Rule

After each milestone, update:

- completed documentation,
- developed artifacts,
- partially developed artifacts,
- pending work,
- validation evidence,
- commit/publish status.
