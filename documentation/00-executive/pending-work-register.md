# Pending Work Register

## Purpose

This document tracks what remains pending after the current documentation foundation.

Items are grouped as:

- Foundation: required before serious implementation.
- Detailed Spec: needed before building that module.
- Validation: needs real-world evidence.
- Implementation: actual product build work.

## Current Status Summary

Most foundational and implementation-grade documentation is now present.

Pending work has moved from "define the company/product architecture" to:

- deeper module-by-module implementation details,
- actual code,
- actual Figma/design artifacts,
- actual curriculum assets and project files,
- pilot validation,
- legal/compliance review,
- commercial validation.

## Current Completion Pass

The latest documentation pass added:

- user personas,
- feature catalogue,
- role/permission/entitlement matrix,
- core user journeys,
- assessment framework and rubrics,
- Kenya CBC alignment process,
- Level 1 complete content package requirements,
- module contracts and boundaries,
- queue/job/event catalog,
- AI Gateway implementation spec,
- AI tool registry spec,
- RAG ingestion and retrieval spec,
- block taxonomy and custom blocks,
- stage runtime specification,
- browser IDE specification,
- assignment grading engine,
- Git and portfolio integration,
- institution onboarding and operations,
- pricing validation and unit economics,
- OWASP ASVS control matrix,
- legal document checklist,
- deployment runbook,
- backup and disaster recovery runbook,
- cost management plan,
- coding standards,
- Git and review workflow.

The newest completion pass added:

- ACE Platform Engineering Constitution,
- persistent Cursor engineering rule,
- learner experience specification,
- teacher dashboard UX specification,
- institution dashboard UX specification,
- AI mentor UX specification,
- coding workspace UX specification,
- accessibility implementation checklist,
- API contract review workflow,
- field research and interview plan,
- pilot launch checklist,
- sales and customer success playbook,
- child safety policy,
- AI data handling policy,
- seven additional architecture decision records,
- AI Kernel and Learning Genome diagrams,
- release gate checklists,
- production readiness checklist,
- Phase 1 sprint plan,
- environment specifications,
- service level objectives.

The documentation is now close to end-to-end implementation readiness, but it is still not a substitute for real code, legal advice, Figma designs, curriculum authoring, provider selection, and pilot evidence.

## Remaining True Pending Work

These cannot be completed by documentation alone:

- commit and push the repository,
- create the actual Figma design system and prototypes,
- scaffold the Laravel/React/Inertia application,
- write database migrations, factories, seeders, and tests,
- implement modules and APIs,
- expand and validate `api/openapi.yaml` from real endpoint decisions,
- build Blockly projects and runtime code,
- build browser IDE and sandbox integration,
- author real Level 1 lesson scripts, worksheets, assets, quizzes, and Blockly starter projects,
- select and test AI providers,
- select and test sandbox provider,
- complete lawyer-reviewed legal documents,
- validate ODPC obligations,
- run school/teacher/parent/learner interviews,
- validate pricing and willingness to pay,
- select pilot institutions,
- run pilot and collect evidence,
- revise roadmap based on pilot results.

## Highest Priority Pending Items

### P0: Commit And Push Documentation

Type: Implementation.

Status: Pending.

Why it matters:

- work is currently uncommitted and unpushed.

Next action:

- review files,
- commit,
- push to GitHub.

### P1: Figma Design System And Prototypes

Type: Detailed Spec.

Status: Pending.

Needed:

- design tokens in Figma,
- component library,
- learner dashboard prototype,
- block coding workspace prototype,
- teacher dashboard prototype,
- institution dashboard prototype.

### P2: Detailed Database Migrations

Type: Implementation.

Status: Pending.

Needed:

- actual Laravel migrations,
- factories,
- seeders,
- ERD refinement,
- indexes,
- tenant constraints.

### P3: Laravel Project Scaffold

Type: Implementation.

Status: Pending.

Needed:

- Laravel app,
- React/Inertia,
- PostgreSQL,
- Redis,
- Tailwind,
- module structure,
- auth foundation.

### P4: Level 1 Content Authoring

Type: Implementation/Content.

Status: Pending.

Needed:

- complete lessons,
- Blockly starter projects,
- teacher guides,
- quizzes,
- rubrics,
- final project,
- offline worksheet options.

### P5: AI Gateway Technical Implementation Spec

Type: Detailed Spec.

Status: Partially documented.

Needed:

- provider adapter interface,
- prompt registry schema,
- AI request lifecycle,
- evaluation tests,
- cost model,
- tenant AI settings.

### P5A: AI Kernel And Agent Prototype

Type: Implementation/Validation.

Status: Pending.

Needed:

- AI Kernel service,
- Agent Orchestrator,
- Context Builder,
- Prompt Builder,
- Tool Registry,
- first Teacher Agent,
- first Coding Agent,
- safe read-only tools,
- RAG-backed curriculum search,
- AI evaluation examples,
- cost and latency measurement.

Validation:

- compare agent response quality against baseline chat,
- test tool-calling reliability,
- teacher review of responses,
- learner helpfulness ratings,
- safety and hallucination review.

### P5B: Learning Genome Prototype

Type: Detailed Spec/Validation.

Status: Pending.

Needed:

- first 100-300 competencies,
- competency ID naming system,
- Level 1 competency mapping,
- evidence model,
- learner competency state table,
- teacher dashboard view,
- basic recommendation rules,
- false mastery/false weakness review process.

Validation:

- compare system competency states with teacher judgment,
- measure learner understanding of recommendations,
- verify that completion is not treated as mastery,
- test privacy and role-based access.

### P5C: AI-Native Platform Advanced Layers

Type: Long-Term Strategy.

Status: Future.

Includes:

- Personal AI Twin,
- AI Teacher Twin,
- AI Institution Twin,
- AI Course Evolution,
- AI Industry Connector,
- AI Simulation Engine,
- AI Mission Control,
- AI Plugin System,
- AI Agent Marketplace,
- AI Federation.

Validation:

- each layer requires separate product discovery,
- legal/privacy review is mandatory before twins and federation,
- plugin/marketplace features require security and governance design.

### P6: Sandbox Provider Selection

Type: Validation/Decision.

Status: Pending.

Needed:

- compare Judge0/E2B/other providers,
- cost tests,
- security review,
- latency tests.

### P7: Pricing Validation

Type: Validation.

Status: Pending.

Needed:

- school interviews,
- pilot proposal,
- pricing tests,
- AI cost model,
- willingness-to-pay data.

### P8: Legal/Privacy Review

Type: Validation/Compliance.

Status: Pending.

Needed:

- Kenya privacy review,
- child data policy,
- school data processing agreement,
- terms,
- privacy notice,
- AI data processing terms.

### P9: Pilot Institution Selection

Type: Validation.

Status: Pending.

Needed:

- identify 1-3 institutions,
- confirm devices/connectivity,
- recruit teachers,
- define pilot schedule,
- set success metrics.

## Detailed Spec Backlog

Still needed:

- Level 2 full curriculum.
- Level 3 full curriculum.
- Level 4 full curriculum.
- Level 5 full curriculum.
- Kenya CBC alignment matrix.
- TVET alignment matrix.
- UI accessibility checklist.
- Teacher dashboard detailed spec.
- Institution reports detailed spec.
- Subscription billing detailed spec.
- M-Pesa integration spec.
- WhatsApp integration spec.
- Certificate and credential spec.
- Marketplace/community spec.
- Parent portal spec.
- Analytics warehouse spec.
- AI evaluation benchmark spec.

## Expanded Documentation Pending By Area

### Product

Pending:

- user personas,
- role/permission/entitlement matrix,
- complete feature catalogue,
- core user journeys,
- learner onboarding,
- teacher onboarding,
- institution onboarding,
- parent/guardian workflows,
- admin workflows,
- support workflows,
- notification requirements,
- error/empty/loading states.

### Curriculum

Pending:

- Level 1 complete lesson scripts,
- Level 1 teacher guide,
- Level 1 student workbook,
- Level 1 quizzes,
- Level 1 assessment rubrics,
- Level 2 complete curriculum,
- Level 3 complete curriculum,
- Level 4 complete curriculum,
- Level 5 career-track curriculum,
- Kenya CBC alignment matrix,
- TVET alignment matrix,
- assessment framework,
- localization strategy.

### Architecture

Pending:

- module contracts,
- queue/job/event catalog,
- cache strategy,
- search architecture,
- file/media architecture,
- analytics warehouse architecture,
- integration/webhook architecture,
- scaling and performance playbook,
- data retention architecture.

### AI

Pending:

- AI Gateway implementation spec,
- provider adapter interface,
- prompt registry schema,
- AI tool registry,
- RAG ingestion pipeline,
- AI memory retention policy,
- AI evaluation benchmark,
- model routing and cost matrix,
- AI Mission Control spec,
- AI incident response runbook.

### Block Coding

Pending:

- block taxonomy,
- custom block definitions,
- Blockly JSON/project schema,
- stage runtime API,
- sprite/costume/sound model,
- generated code mapping,
- block-to-code pedagogy rules,
- Blockly accessibility and mobile strategy.

### IDE And Code Execution

Pending:

- browser IDE specification,
- Monaco integration plan,
- Git/GitHub integration,
- project file model,
- assignment grading engine,
- language support matrix,
- sandbox provider evaluation,
- test runner integration,
- portfolio publishing workflow.

### Institutions

Pending:

- detailed institution onboarding,
- teacher account creation workflow,
- student bulk import workflow,
- class/cohort management,
- parent/guardian linking,
- school reports,
- procurement workflow,
- institution account management.

### UI/UX

Pending:

- Figma design system,
- learner dashboard spec,
- teacher dashboard spec,
- institution dashboard spec,
- AI mentor UX,
- coding workspace UX,
- mobile responsive UX,
- accessibility implementation checklist,
- motion guidelines,
- data visualization rules.

### Security And Compliance

Pending:

- OWASP ASVS control matrix,
- security testing plan,
- incident response runbook,
- child safety policy,
- privacy notice,
- terms of service,
- acceptable use policy,
- subprocessor registry,
- AI data handling policy,
- vulnerability disclosure policy.

### Infrastructure

Pending:

- environment specifications,
- Docker Compose implementation,
- deployment runbook,
- backup restore test plan,
- disaster recovery runbook,
- cost management plan,
- secrets management procedure,
- CDN/WAF configuration,
- service-level objectives.

### Business

Pending:

- pricing validation evidence,
- unit economics,
- school sales process,
- customer success playbook,
- pilot contract template,
- support model,
- investor narrative,
- partnership strategy,
- grants/NGO/government strategy,
- expansion country criteria.

### Engineering

Pending:

- coding standards,
- Laravel module conventions,
- React frontend standards,
- Git workflow,
- pull request checklist,
- branching strategy,
- code review checklist,
- documentation contribution guide,
- database migration review checklist,
- AI prompt review workflow.

## Implementation Backlog

Still needed:

- create Laravel application,
- create migrations,
- create modules,
- create UI components,
- build auth,
- build institution management,
- build skill graph,
- build block coding workspace,
- build AI mentor,
- build teacher dashboard,
- build subscription foundation,
- deploy staging environment,
- run pilot.

## Validation Backlog

Still needs evidence:

- school willingness to pay,
- best initial price,
- teacher time saved,
- learner completion rates,
- AI helpfulness,
- AI cost per learner,
- offline needs,
- device constraints,
- curriculum fit,
- support workload.

## What Is No Longer Foundationally Missing

The following now exist at foundation level:

- vision,
- market research,
- standards map,
- backend architecture,
- database model,
- API standards,
- OpenAPI starter,
- AI architecture,
- AI governance,
- learner digital twin,
- knowledge graph,
- UI/UX playbook,
- design token starter,
- block coding system,
- Level 1 outline,
- Level 2-5 roadmap,
- institution platform,
- subscription model,
- security baseline,
- threat model,
- privacy baseline,
- infrastructure plan,
- testing strategy,
- implementation backlog.

## Recommended Next Sequence

1. Commit and push documentation.
2. Create Figma prototype.
3. Scaffold Laravel application.
4. Implement Phase 1 tickets.
5. Author Level 1 content.
6. Select pilot institutions.
7. Run pilot and collect evidence.
