# Missing Pieces Gap Analysis

## Purpose

This document identifies what is still missing from the AI Learning Platform engineering playbook and what must be added before implementation can safely begin.

The repository already contains strong foundations for:

- product vision,
- market research,
- curriculum and pedagogy,
- computing knowledge graph,
- AI architecture,
- learner digital twin,
- backend architecture,
- UI/UX direction,
- block coding,
- institutions,
- subscriptions,
- security baseline,
- standards,
- and roadmap.

The next gap is converting this vision into implementation-grade specifications.

## Highest-Priority Missing Documents

### 1. Product Requirements Document

Missing:

- complete module-by-module functional requirements,
- user roles,
- user journeys,
- acceptance criteria,
- feature priorities,
- constraints,
- assumptions,
- edge cases.

Why it matters:

- Engineers cannot build safely from vision alone.
- Designers need exact workflows.
- Investors and partners need product clarity.

Required next document:

- `documentation/02-product/product-requirements-document.md`

### 2. Database And Domain Model

Missing:

- domain entities,
- table groups,
- relationships,
- tenancy model,
- indexes,
- audit strategy,
- analytics read models,
- skill graph storage,
- AI memory storage,
- offline sync metadata.

Why it matters:

- The platform's long-term scalability depends heavily on data design.

Required next document:

- `documentation/04-architecture/database-and-domain-model.md`

### 3. API Standards

Missing:

- route conventions,
- versioning,
- authentication,
- authorization,
- pagination,
- filtering,
- errors,
- idempotency,
- OpenAPI rules,
- mobile/desktop/WhatsApp API rules.

Why it matters:

- Future clients require stable contracts.

Required next document:

- `documentation/04-architecture/api-standards.md`

### 4. Code Execution Sandbox Specification

Missing:

- security model,
- language support,
- resource limits,
- execution lifecycle,
- test runner model,
- artifact storage,
- abuse controls,
- managed vs self-hosted strategy.

Why it matters:

- Running learner code is one of the highest-risk parts of the platform.

Required next document:

- `documentation/07-ide-and-code-execution/code-execution-sandbox.md`

### 5. Offline Sync Specification

Missing:

- sync model,
- local storage model,
- conflict resolution,
- device identity,
- sync cursors,
- offline events,
- file sync,
- security,
- mobile/desktop future requirements.

Why it matters:

- Offline support must shape IDs, APIs, event design, and data model early.

Required next document:

- `documentation/04-architecture/offline-sync-architecture.md`

### 6. AI Governance And Safety

Missing:

- AI safety policy,
- model routing rules,
- prompt governance,
- child safety,
- assessment integrity,
- human review,
- hallucination controls,
- logging and retention,
- cost controls,
- AI evaluation.

Why it matters:

- The platform is AI-powered and serves children, schools, and institutions.

Required next document:

- `documentation/05-ai/ai-governance-and-safety.md`

### 7. Implementation Roadmap With Team Plan

Missing:

- implementation phases by sprint,
- team roles,
- staffing plan,
- milestone gates,
- risk register,
- pilot plan,
- release criteria.

Why it matters:

- The roadmap currently explains phases, but not detailed execution management.

Required next document:

- `documentation/13-roadmap/implementation-execution-plan.md`

## Other Important Missing Areas

### UI/UX

Still needed:

- detailed learner dashboard wireframe spec,
- teacher dashboard UX spec,
- institution dashboard UX spec,
- Blockly workspace UX spec,
- IDE workspace UX spec,
- mobile UX direction,
- accessibility checklist,
- design token JSON proposal.

### Curriculum

Still needed:

- Level 1 block coding curriculum,
- Level 2 block-to-code curriculum,
- Level 3 hybrid curriculum,
- Level 4 browser IDE curriculum,
- Level 5 career tracks,
- Kenya CBC alignment matrix,
- TVET alignment matrix,
- assessment rubric library.

### Business

Still needed:

- go-to-market strategy,
- school pilot strategy,
- pricing validation plan,
- partnership strategy,
- investor narrative,
- sales process,
- customer support model,
- customer success playbook.

### Infrastructure

Still needed:

- Docker local development architecture,
- staging/production architecture,
- CI/CD plan,
- observability plan,
- backup and disaster recovery,
- cloud cost strategy,
- deployment checklist.

### Security And Compliance

Still needed:

- threat model,
- ASVS control matrix,
- child data protection policy,
- privacy notice draft,
- data retention policy,
- incident response plan,
- vulnerability disclosure policy,
- vendor/subprocessor register.

### Content Operations

Missing but critical:

- content authoring workflow,
- curriculum review process,
- AI-generated content approval,
- versioning of lessons,
- localization process,
- teacher resource publishing,
- quality assurance for content.

### Data And Analytics

Missing:

- learning event taxonomy,
- data warehouse strategy,
- institution reports spec,
- AI analytics metrics,
- learner mastery scoring model,
- dashboard metric definitions.

## What Must Be Built Before Coding Starts

Minimum documentation before implementation:

1. Product Requirements Document.
2. Database and domain model.
3. API standards.
4. Authentication and authorization spec.
5. Multi-tenancy spec.
6. AI Gateway technical spec.
7. Code execution sandbox spec.
8. Offline sync spec.
9. UI design system tokens/components.
10. Level 1 block coding curriculum.
11. Security threat model.
12. Implementation execution plan.

## Recommended Next Action

Proceed by creating the missing implementation-grade foundations:

- product requirements,
- database/domain model,
- API standards,
- offline sync,
- code execution,
- AI governance,
- implementation execution plan.

These documents close the biggest gap between strategy and actual engineering.
