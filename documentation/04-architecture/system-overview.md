# System Architecture Overview

## Architecture Goal

The platform should begin as a fast, maintainable Laravel + React web product while preserving a clean path toward mobile apps, desktop apps, offline learning, WhatsApp learning, AI scale, and institutional SaaS.

## Recommended Architecture Style

Use a modular monolith first, with strong domain boundaries and event-driven extensions.

This is preferred over starting with microservices because:

- the team can move faster,
- Laravel is excellent for cohesive product development,
- early requirements will evolve,
- operational complexity stays lower,
- and domain boundaries can still be designed cleanly.

The architecture should be service-ready, meaning well-defined modules can later be extracted into separate services only when scale, team ownership, or operational constraints justify it.

## High-Level Components

```text
Learners / Teachers / Admins / Parents / Institutions
        |
        v
React + Inertia Web Application
        |
        v
Laravel Application
        |
        +--> PostgreSQL
        +--> Redis
        +--> Queues / Horizon
        +--> Object Storage
        +--> AI Gateway
        +--> Code Execution Sandbox
        +--> Search / Vector Retrieval
        +--> Notifications
        +--> Payment Providers
```

Future clients:

```text
Flutter Mobile App
Tauri or Flutter Desktop App
WhatsApp Bot
Partner APIs
```

These clients should connect through versioned APIs and shared authentication/authorization rules.

## Core Domains

### Identity And Access

Responsibilities:

- authentication,
- multi-factor authentication,
- users,
- roles,
- permissions,
- guardians,
- child accounts,
- institution membership,
- teacher-student relationships,
- API tokens,
- session management.

### Institution Management

Responsibilities:

- institutions,
- campuses,
- departments,
- classes,
- cohorts,
- teachers,
- learners,
- invitations,
- bulk account creation,
- school subscriptions,
- institution dashboards,
- data exports.

### Learning Engine

Responsibilities:

- courses,
- modules,
- lessons,
- activities,
- prerequisites,
- progress,
- mastery,
- learning paths,
- recommendations.

### Curriculum Engine

Responsibilities:

- curriculum standards,
- Kenyan CBC alignment,
- TVET alignment,
- skill maps,
- age bands,
- topic dependencies,
- competency frameworks.

### Block Coding Engine

Responsibilities:

- Blockly workspaces,
- custom blocks,
- project serialization,
- generated code,
- game stage integration,
- sprite logic,
- learner hints,
- AI analysis of block programs.

### IDE And Code Execution Engine

Responsibilities:

- Monaco Editor,
- coding exercises,
- project files,
- sandbox execution,
- tests,
- grading,
- Git integration,
- deployment guidance.

### AI Engine

Responsibilities:

- AI gateway,
- model routing,
- prompts,
- RAG,
- curriculum-aware tutoring,
- code review,
- grading assistance,
- lesson generation,
- quiz generation,
- safety filters,
- AI telemetry,
- cost controls.

### Assessment Engine

Responsibilities:

- quizzes,
- coding assignments,
- rubrics,
- auto-grading,
- teacher moderation,
- exam integrity,
- mastery tracking,
- feedback generation.

### Subscription And Billing Engine

Responsibilities:

- plans,
- entitlements,
- usage limits,
- institution licenses,
- family plans,
- invoices,
- M-Pesa,
- Stripe,
- discounts,
- trials,
- renewals.

### Analytics Engine

Responsibilities:

- learner progress,
- classroom dashboards,
- weak concept detection,
- cohort health,
- completion rates,
- teacher workload insights,
- institution reports,
- business metrics.

## Database Recommendation

Use PostgreSQL as the default primary database.

Reasons:

- strong fit for complex institutional SaaS,
- strong JSONB support for project metadata,
- advanced indexes for analytics,
- full-text search,
- pgvector support for embeddings,
- mature relational integrity.

See `architecture/decisions/0001-use-postgresql-as-primary-database.md`.

## Web Stack Recommendation

The first web product can use React + Inertia.js + Laravel.

Guidelines:

- Use TypeScript for React.
- Use Tailwind CSS for styling.
- Use Laravel policies for authorization.
- Use Form Requests for validation.
- Use API Resources for structured responses where APIs are exposed.
- Keep domain logic outside controllers.
- Use queues for AI, grading, emails, notifications, imports, exports, reports, and indexing.
- Generate OpenAPI contracts for mobile/desktop/partner APIs.

## Offline Strategy

Offline is a future major capability, but the architecture should prepare for it from the beginning.

Offline-capable data should be designed around:

- stable IDs,
- sync timestamps,
- version numbers,
- conflict handling,
- local storage models,
- resumable uploads,
- content packaging,
- encrypted local storage,
- and background synchronization.

Expected local storage:

- Web: IndexedDB.
- Mobile: SQLite or a Flutter-supported local database.
- Desktop: SQLite.

## Scaling Strategy

Initial scale:

- one Laravel application,
- PostgreSQL,
- Redis,
- queue workers,
- object storage,
- CDN,
- background jobs.

Growth scale:

- horizontal Laravel app servers,
- read replicas,
- Redis clustering where needed,
- queue separation by workload,
- separate AI workers,
- separate code execution infrastructure,
- analytics warehouse,
- dedicated search infrastructure if needed.

Enterprise scale:

- regional deployments,
- tenant isolation options,
- data residency support,
- dedicated enterprise instances,
- Kubernetes where operationally justified,
- strict observability and incident response.

## Security-Critical Components

The following components require special design review:

- authentication,
- authorization,
- institution data isolation,
- child accounts,
- payments,
- AI conversation logging,
- file uploads,
- code execution,
- offline sync,
- admin impersonation,
- data exports,
- third-party integrations.

## Architecture Rule

Every new module must define:

- domain purpose,
- owned data,
- public interfaces,
- permissions,
- events,
- jobs,
- audit logs,
- failure modes,
- security controls,
- observability signals,
- and testing requirements.
