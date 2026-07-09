# Last-Mile Execution Roadmap

## Purpose

This document is the build roadmap from documentation foundation to production-scale platform.

It is the step-by-step execution guide used to validate all work against:

- `documentation/00-executive/engineering-constitution.md`,
- `documentation/README.md`,
- architecture decisions,
- product requirements,
- security/compliance documents,
- AI governance,
- UI/UX standards,
- implementation backlog.

## Execution Rule

No phase is complete until:

- scope is implemented,
- tests pass,
- documentation is updated,
- security and tenant isolation are reviewed,
- user-facing flows have loading, empty, and error states,
- release gate criteria are met.

## Phase 0: Documentation And Governance Foundation

Status: Completed at documentation level.

Completed:

- product vision,
- Engineering Constitution,
- research registry,
- product requirements,
- architecture playbooks,
- AI architecture and governance,
- curriculum framework,
- security baseline,
- UI/UX design direction,
- infrastructure and operations docs,
- roadmap and backlog,
- ADRs,
- Cursor project rule.

Exit criteria:

- documentation repository published,
- constitution enforced by Cursor rule,
- pending work register maintained.

## Phase 1: Application Foundation

Goal:

- create the Laravel + React + Inertia application foundation.

Build:

- Laravel app scaffold,
- React/Inertia setup,
- TypeScript,
- Tailwind,
- design token wiring,
- PostgreSQL configuration,
- Redis/queue configuration,
- local fake services,
- base testing setup,
- module folder structure,
- CI-ready scripts.

Validate against:

- `engineering/local-development.md`,
- `engineering/coding-standards.md`,
- `architecture/decisions/0003-use-laravel-react-inertia-for-first-web-version.md`.

Exit criteria:

- app boots locally,
- tests run,
- frontend builds,
- no secrets committed,
- `.env.example` documents required settings.

## Phase 2: Identity, Tenancy, And Authorization

Goal:

- establish users, institutions, roles, permissions, and tenant isolation.

Build:

- authentication,
- users,
- institutions,
- roles/permissions,
- tenant context middleware,
- policies,
- audit logging foundation,
- seed data.

Validate against:

- `documentation/02-product/role-permission-and-entitlement-matrix.md`,
- `documentation/04-architecture/authentication-and-authorization.md`,
- `documentation/04-architecture/multi-tenancy-specification.md`.

Exit criteria:

- tenant isolation tests pass,
- teacher cannot access another institution,
- admin actions are audited.

## Phase 3: Curriculum And Learning Core

Goal:

- create the basic learning engine.

Build:

- courses,
- modules,
- lessons,
- skills,
- competencies,
- learning events,
- learner progress,
- Level 1 content seed data.

Validate against:

- `documentation/03-curriculum/computing-knowledge-graph.md`,
- `documentation/05-ai/learning-genome-and-competency-engine.md`,
- `documentation/04-architecture/learning-event-taxonomy.md`.

Exit criteria:

- learner can start and complete a lesson,
- events are recorded,
- skill state updates from evidence.

## Phase 4: Institution And Teacher Platform

Goal:

- enable schools to manage classes and teachers.

Build:

- teacher dashboard,
- class/cohort management,
- learner enrollment,
- assignment workflow,
- progress summaries,
- bulk import later.

Validate against:

- `documentation/08-institutions/institution-onboarding-and-operations.md`,
- `documentation/09-ui-ux/teacher-dashboard-ux-specification.md`,
- `documentation/09-ui-ux/institution-dashboard-ux-specification.md`.

Exit criteria:

- teacher can assign a lesson,
- teacher can view class progress,
- institution admin can view tenant-scoped reports.

## Phase 5: Level 1 Block Coding

Goal:

- deliver the first learning differentiator.

Build:

- Blockly workspace,
- stage runtime,
- sprites,
- project save/load,
- generated JavaScript view,
- project submission,
- teacher review.

Validate against:

- `documentation/06-block-coding/stage-runtime-specification.md`,
- `documentation/06-block-coding/block-taxonomy-and-custom-blocks.md`,
- `documentation/03-curriculum/level-1-complete-content-package.md`.

Exit criteria:

- learner can build and run a block project,
- project autosaves,
- AI-ready workspace JSON is stored,
- teacher can review submission.

## Phase 6: AI Gateway And Mentor Foundation

Goal:

- add AI through governed infrastructure, not ad hoc calls.

Build:

- AI Gateway,
- provider adapter,
- prompt registry,
- context builder,
- RAG over seed lessons,
- Teacher Agent,
- Coding Agent later,
- usage/cost logging,
- safety events.

Validate against:

- `documentation/05-ai/ai-gateway-implementation-spec.md`,
- `documentation/05-ai/ai-tool-registry-spec.md`,
- `documentation/05-ai/rag-ingestion-and-retrieval-spec.md`,
- `documentation/10-security-compliance/ai-data-handling-policy.md`.

Exit criteria:

- no direct AI provider calls outside gateway,
- AI answers lesson questions with context,
- AI events and usage are logged,
- safety behavior is tested.

## Phase 7: Browser IDE And Code Execution

Goal:

- support transition from blocks to professional code.

Build:

- Monaco editor,
- file explorer,
- project save,
- sandbox execution adapter,
- output/test panel,
- AI code explanation,
- submission snapshot.

Validate against:

- `documentation/07-ide-and-code-execution/browser-ide-specification.md`,
- `documentation/07-ide-and-code-execution/code-execution-sandbox.md`,
- `architecture/decisions/0006-isolate-learner-code-execution.md`.

Exit criteria:

- learner code never runs on app server,
- sandbox provider/fake adapter works,
- learner can run a beginner coding task,
- results are captured.

## Phase 8: Assessment, Portfolio, And Certificates

Goal:

- convert learning into evidence.

Build:

- assessments,
- rubrics,
- project scoring,
- portfolio items,
- certificate rules,
- competency evidence.

Validate against:

- `documentation/03-curriculum/assessment-framework-and-rubrics.md`,
- `documentation/07-ide-and-code-execution/assignment-grading-engine.md`,
- `documentation/07-ide-and-code-execution/git-and-portfolio-integration.md`.

Exit criteria:

- project can be assessed,
- competency evidence is recorded,
- learner can view portfolio item.

## Phase 9: Subscriptions, Billing, And Entitlements

Goal:

- make the platform commercially operable.

Build:

- subscription plans,
- entitlements,
- usage limits,
- AI credits,
- institution seat limits,
- M-Pesa/payment adapter later,
- invoice status.

Validate against:

- `documentation/12-business/subscription-model.md`,
- `documentation/12-business/pricing-validation-and-unit-economics.md`,
- Safaricom Daraja references in `documentation/01-research/source-registry.md`.

Exit criteria:

- entitlements are centrally enforced,
- plan limits work,
- usage is auditable.

## Phase 10: Pilot Readiness

Goal:

- prepare for real school validation.

Build:

- pilot admin tools,
- support workflow,
- reporting,
- privacy/legal documents reviewed,
- onboarding guides,
- monitoring and backups.

Validate against:

- `documentation/13-roadmap/pilot-launch-checklist.md`,
- `documentation/10-security-compliance/legal-document-checklist.md`,
- `documentation/13-roadmap/production-readiness-checklist.md`.

Exit criteria:

- pilot institution selected,
- teachers trained,
- metrics defined,
- legal review complete,
- production monitoring enabled.

## Phase 11: Mobile, Desktop, Offline, And WhatsApp

Goal:

- expand beyond the first web version.

Build:

- offline package model,
- sync engine,
- mobile app,
- desktop app,
- WhatsApp learning channel,
- push notifications.

Validate against:

- `documentation/04-architecture/offline-sync-architecture.md`,
- `architecture/decisions/0007-design-offline-ready-from-start.md`,
- Meta WhatsApp Cloud API references.

Exit criteria:

- offline learning path syncs safely,
- mobile/desktop clients use documented APIs,
- WhatsApp channel respects consent and privacy.

## Phase 12: AI-Native Scale

Goal:

- evolve into an education intelligence platform.

Build:

- AI Mission Control,
- Learning Genome improvements,
- AI Teacher Twin,
- Institution Twin,
- industry connector,
- marketplace/plugin governance.

Validate against:

- `documentation/05-ai/ai-native-education-intelligence-platform.md`,
- `documentation/05-ai/learning-genome-and-competency-engine.md`,
- `documentation/10-security-compliance/ai-data-handling-policy.md`.

Exit criteria:

- advanced AI features are validated,
- human oversight exists,
- marketplace/plugin boundaries are secure.

## Phase Validation Matrix

Every phase must answer:

- What requirement is being implemented?
- Which documentation governs it?
- Which ADR applies?
- What data does it touch?
- What permissions are required?
- What tests prove it works?
- What can fail?
- How do users recover?
- What monitoring is needed?
- What documentation changed?

## Current Next Step

Start with Phase 1:

- clean/complete application scaffold,
- configure Laravel + React/Inertia,
- create local development baseline,
- avoid committing secrets,
- update project status ledger.
