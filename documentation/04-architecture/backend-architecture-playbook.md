# Backend Architecture Playbook

## Purpose

This document defines the backend architecture for the AI Learning Platform. The backend should become an education operating system, not a simple LMS backend.

The backend must support:

- web application,
- future mobile app,
- future desktop app,
- offline synchronization,
- WhatsApp learning,
- institutions and schools,
- AI tutoring,
- block coding,
- browser IDE,
- code execution,
- assessments,
- payments,
- analytics,
- subscriptions,
- certificates,
- and global scale.

## Core Backend Philosophy

Use Laravel as a modular monolith first.

Laravel should provide:

- routing,
- controllers,
- validation,
- policies,
- queues,
- events,
- jobs,
- notifications,
- scheduling,
- database access,
- authentication,
- authorization,
- testing,
- API infrastructure,
- observability integration,
- and developer productivity.

The architecture should avoid a permanent "everything in `app/Http/Controllers`" structure. Code should be organized by product capability.

## Recommended Backend Stack

### Core

- Laravel current stable version.
- PHP 8.4+ where supported by hosting and package compatibility.
- PostgreSQL.
- Redis.
- Laravel Horizon.
- Laravel Sanctum.
- Laravel Socialite.
- Laravel Scout.
- Laravel Pennant.
- Laravel Pulse.
- Laravel Telescope for local/staging debugging only.
- Laravel Octane later when performance profiling justifies it.

### Storage And Search

- MinIO for local S3-compatible development.
- Cloudflare R2, AWS S3, or another S3-compatible object store for production.
- Meilisearch for fast application search where needed.
- PostgreSQL full-text search for simpler internal search needs.
- pgvector for early AI retrieval and embeddings.

### AI

- internal AI Gateway module,
- provider adapters for OpenAI, Anthropic, Google Gemini, and future local/open-weight models,
- prompt registry,
- RAG ingestion pipeline,
- AI safety checks,
- token/cost metering.

## Primary Architecture

```text
Clients
  |
  +-- React + Inertia Web
  +-- Future Flutter Mobile
  +-- Future Desktop App
  +-- Future WhatsApp Bot
  +-- Partner APIs
  |
  v
Laravel Modular Monolith
  |
  +-- PostgreSQL
  +-- Redis
  +-- Horizon Workers
  +-- Object Storage
  +-- AI Gateway
  +-- Search
  +-- Code Execution Sandbox
  +-- Payment Providers
```

## Backend Modules

Recommended first-class modules:

- Identity,
- AccessControl,
- Institutions,
- Learners,
- Teachers,
- Parents,
- Courses,
- Lessons,
- Curriculum,
- Assessments,
- AI,
- Blockly,
- IDE,
- CodeExecution,
- Payments,
- Subscriptions,
- Certificates,
- Analytics,
- Notifications,
- Media,
- Gamification,
- Marketplace,
- Community,
- Administration,
- Audit,
- Integrations,
- OfflineSync.

## Module Structure

Recommended structure per module:

```text
Modules/Courses/
  Actions/
  Console/
  Data/
  Database/
    Migrations/
    Seeders/
    Factories/
  Domain/
    Events/
    Exceptions/
    ValueObjects/
  Http/
    Controllers/
    Middleware/
    Requests/
    Resources/
  Jobs/
  Listeners/
  Models/
  Notifications/
  Policies/
  Providers/
  Queries/
  Routes/
    web.php
    api.php
  Services/
  Support/
  Tests/
    Feature/
    Unit/
  module.json
```

Guidance:

- Controllers should stay thin.
- Requests validate input.
- Policies authorize actions.
- Actions handle application use cases.
- Services contain domain workflows when a use case is larger than a single action.
- Jobs run asynchronous work.
- Events announce facts that already happened.
- Listeners react to events.
- Queries handle complex read models and dashboard data.
- Models should not become dumping grounds for all business logic.

## Module Boundary Rules

### Allowed

- A module can use its own models, actions, services, policies, jobs, and events.
- A module can publish events that other modules listen to.
- A module can expose read/query contracts where another module needs data.
- A module can call shared platform services such as logging, authorization, media, notifications, and AI Gateway.

### Avoid

- Directly importing another module's Eloquent models.
- Directly calling another module's internal services.
- Writing to another module's tables without an owning API/action.
- Circular dependencies.
- Shared "god services" that know every module.

## Event-Driven Internal Architecture

Use events for side effects and decoupling.

Example:

```text
LessonCompleted
  |
  +-- Gamification awards XP
  +-- Analytics updates progress read model
  +-- Certificates checks completion
  +-- Notifications informs parent/teacher where appropriate
  +-- AI updates learner memory profile
```

Event rules:

- Events should be named as facts in past tense.
- Events should include stable IDs, not full unrelated object graphs.
- Long-running listeners should be queued.
- Side effects should run after database commit where correctness matters.
- Failed listeners should be observable and retryable.

Important Laravel feature:

- Laravel supports queued event listeners using `ShouldQueue`.
- Laravel supports listeners that should dispatch after database commits.

## API-First Strategy

Even if the first web application uses Inertia, the backend must be API-ready.

Client strategy:

- Inertia for first-party web app speed.
- Versioned REST APIs for mobile, desktop, WhatsApp, and partner integrations.
- OpenAPI 3.1 contracts for external and multi-client APIs.
- Sanctum session authentication for first-party SPA/web flows.
- Sanctum token authentication for mobile/desktop/partner clients where appropriate.

API rules:

- Use versioned routes such as `/api/v1`.
- Use API Resources for response shape.
- Use request classes for validation.
- Use policies for authorization.
- Use rate limits.
- Use idempotency keys for payment, sync, import, and code execution operations.
- Use pagination for lists.
- Use stable error formats.

## Authentication

Initial authentication:

- email/password,
- Laravel session authentication for web,
- Laravel Sanctum for SPA and API tokens,
- Google login through Socialite where useful,
- Microsoft login for schools later,
- MFA for teachers, admins, and institution owners.

Future:

- Apple login,
- SAML/OIDC institution SSO,
- government/education identity providers,
- device management for offline apps.

Sanctum guidance:

- Use cookie/session authentication for first-party web/SPAs.
- Use bearer tokens for mobile and desktop clients.
- Scope tokens by device and abilities.
- Allow token revocation per device.

## Authorization And Entitlements

Authorization should combine:

- institution tenant context,
- roles,
- permissions,
- Laravel policies,
- subscription entitlements,
- feature flags,
- usage quotas,
- learner age/safety policy.

Recommended package:

- `spatie/laravel-permission` with teams support considered for institution-scoped permissions.

Important rule:

- Do not rely only on role names such as `teacher` or `admin`.
- Sensitive actions must check policy, tenant, subscription, and limits.

Example:

```text
Can teacher create assignment?
  |
  +-- Is user authenticated?
  +-- Is active institution valid?
  +-- Does user have teacher/admin permission in that institution?
  +-- Does subscription allow assignments?
  +-- Has institution exceeded active assignment limits?
  +-- Is feature enabled for this tenant?
```

## Multi-Tenancy

The platform should use shared-database multi-tenancy first, with strict tenant scoping.

Tenant hierarchy:

```text
Platform
  |
  v
Institution
  |
  +-- Campus
  +-- Department
  +-- Classes
  +-- Teachers
  +-- Learners
  +-- Parents
```

Rules:

- Institution-scoped data must include `institution_id` or a clear tenant relationship.
- Queries must enforce tenant scope.
- Policies must verify tenant membership.
- Exports must be tenant-scoped.
- Audit logs must include tenant context.
- Background jobs must carry tenant context explicitly.
- Cache keys must include tenant IDs where data is tenant-specific.

Future enterprise options:

- dedicated database per large enterprise tenant,
- dedicated deployment,
- regional data residency,
- custom retention policies.

## Database Strategy

Use PostgreSQL.

Separate domains logically even if they share one database:

- identity data,
- institution data,
- learning data,
- assessment data,
- AI memory,
- analytics read models,
- search metadata,
- media metadata,
- payment data,
- audit logs.

Rules:

- Use foreign keys for critical relational integrity.
- Use JSONB for flexible metadata, not as a replacement for real modeling.
- Use indexes for tenant, status, date, user, class, subscription, and dashboard queries.
- Use read models/materialized views where dashboard performance requires them.
- Use migrations per module.
- Use database transactions around critical workflows.

## Queues And Background Jobs

Do not perform expensive work inside web requests.

Queue:

- AI generation,
- AI grading,
- AI feedback,
- embeddings,
- OCR,
- PDF parsing,
- video processing,
- code execution,
- certificate generation,
- emails,
- SMS/WhatsApp notifications,
- report generation,
- imports,
- exports,
- analytics aggregation,
- search indexing,
- billing reconciliation.

Recommended queue groups:

- `critical`,
- `default`,
- `ai`,
- `grading`,
- `code-execution`,
- `media`,
- `notifications`,
- `reports`,
- `imports`,
- `billing`,
- `low`.

Use Redis queues and Horizon.

Horizon provides:

- queue dashboard,
- throughput metrics,
- runtime metrics,
- failed job visibility,
- worker configuration,
- queue balancing.

## Caching Strategy

Cache carefully and invalidate deliberately.

Cache candidates:

- curriculum maps,
- public courses,
- subscription plans,
- institution settings,
- permissions,
- feature flags,
- dashboards,
- leaderboards,
- static learning resources,
- AI retrieval chunks,
- generated lesson previews.

Rules:

- Cache keys must include tenant context when needed.
- Use tags where supported and useful.
- Avoid caching sensitive data without a clear need.
- Invalidate on domain events.
- Track cache hit rates for major caches.

## File And Media Storage

Use object storage, not the web server filesystem.

Store:

- PDFs,
- images,
- videos,
- audio,
- student projects,
- Blockly assets,
- code uploads,
- certificates,
- generated reports,
- AI-generated assets,
- exports.

Rules:

- Use private buckets by default.
- Use signed URLs for protected access.
- Scan uploads where risk requires it.
- Store metadata in PostgreSQL.
- Queue heavy processing.
- Use lifecycle policies for temporary files.

## AI Gateway Backend Design

The Laravel application must not call AI providers directly from random modules.

All AI calls go through the AI Gateway module.

Responsibilities:

- provider abstraction,
- model routing,
- prompt registry,
- RAG context assembly,
- safety filtering,
- structured output validation,
- token usage tracking,
- cost tracking,
- caching,
- tenant AI policies,
- AI audit logs,
- evaluation data collection.

Backend modules should request AI capabilities such as:

- explain block project,
- generate quiz,
- review code,
- grade assignment,
- create lesson plan,
- summarize cohort risk,
- recommend learner practice.

They should not care which provider is used.

## AI Memory And Learner Profile

The backend should build a learner memory profile over time.

Track:

- completed courses,
- completed lessons,
- quiz performance,
- code errors,
- misconceptions,
- preferred explanation styles,
- strengths,
- weak topics,
- projects completed,
- teacher feedback,
- AI interactions,
- career goals.

Privacy rules:

- do not store unnecessary sensitive data,
- allow deletion/export where legally required,
- separate raw AI logs from durable learner profile summaries,
- apply retention policies.

## Code Execution Backend

Code execution is high risk and should be separated operationally even if controlled by the Laravel monolith.

Requirements:

- never execute untrusted code on app servers,
- use isolated containers or stronger sandboxing,
- set CPU, memory, time, process, and filesystem limits,
- restrict networking by default,
- sanitize inputs and outputs,
- store execution logs,
- queue execution requests,
- return status asynchronously,
- monitor abuse.

Likely future extraction:

- CodeExecution module becomes a separate service.

## Offline Sync Backend

Even if offline comes later, backend IDs and APIs should support it.

Requirements:

- stable UUID/ULID identifiers,
- sync cursors,
- updated timestamps,
- version numbers,
- soft deletes where sync requires tombstones,
- conflict detection,
- resumable uploads,
- per-device tokens,
- sync audit logs.

Offline-capable domains:

- lessons,
- quizzes,
- learner progress,
- Blockly projects,
- coding practice,
- downloaded resources,
- teacher-created assignments.

## Search Strategy

Use layered search:

- PostgreSQL queries for relational filtering,
- PostgreSQL full-text search for simple text search,
- Meilisearch for fast user-facing search,
- pgvector for semantic retrieval,
- dedicated vector/search infrastructure later if scale requires it.

Searchable content:

- courses,
- lessons,
- projects,
- help docs,
- curriculum standards,
- code examples,
- teacher resources,
- institution users.

## Observability

Build observability from day one.

Track:

- HTTP latency,
- API errors,
- database query performance,
- queue depth,
- job failures,
- AI latency,
- AI cost,
- AI token usage,
- code execution duration,
- payment webhook failures,
- storage usage,
- login failures,
- tenant-level activity,
- cache hit rate.

Recommended tooling:

- structured logs,
- OpenTelemetry,
- Sentry or equivalent error tracking,
- Laravel Pulse for application insights,
- Horizon for queues,
- uptime monitoring,
- custom AI usage dashboard.

## Deployment Strategy

Initial production:

```text
Cloudflare
  |
  v
Load Balancer / Web Server
  |
  v
Laravel App
  |
  +-- PostgreSQL
  +-- Redis
  +-- Horizon Workers
  +-- Object Storage
  +-- Search
  +-- AI Providers
```

Guidance:

- Use Docker early for reproducible environments.
- Kubernetes can wait until operational complexity is justified.
- Use CI/CD from the beginning.
- Run queue workers separately from web processes.
- Separate scheduler process.
- Use zero-downtime deployment where possible.
- Keep secrets in environment/config management.

## Laravel Octane Strategy

Do not start with Octane unless performance testing shows a need.

Use standard PHP-FPM or equivalent first for simplicity.

Introduce Octane later for high-traffic workloads after:

- code is audited for long-lived process safety,
- packages are verified,
- memory leaks are monitored,
- stateful singleton risks are understood.

Octane supports FrankenPHP, RoadRunner, Swoole, and Open Swoole. FrankenPHP or RoadRunner are likely safer first options for many teams; Swoole can offer high performance but requires more operational care.

## Required Backend Packages

Initial likely packages:

- `laravel/sanctum`
- `laravel/horizon`
- `laravel/socialite`
- `laravel/scout`
- `laravel/pennant`
- `laravel/pulse`
- `laravel/telescope` for local/staging
- `spatie/laravel-permission`
- `spatie/laravel-activitylog`
- `spatie/laravel-medialibrary`
- `spatie/laravel-data`
- `spatie/laravel-query-builder`
- `spatie/laravel-backup`
- `spatie/laravel-health`
- `nwidart/laravel-modules` if using package-based modules
- OpenAPI documentation tooling
- payment SDKs for M-Pesa and Stripe
- AI provider SDKs wrapped behind the AI Gateway

Package rule:

- Prefer packages for solved infrastructure problems.
- Do not let packages define the domain architecture.
- Wrap provider-specific packages behind internal interfaces.

## Backend Definition Of Done

Every backend feature should define:

- owning module,
- routes/API contract,
- request validation,
- policy authorization,
- tenant scoping,
- subscription/entitlement checks,
- database migrations,
- events,
- jobs,
- audit logs,
- tests,
- observability,
- failure behavior,
- and documentation.

## Immediate Next Backend Documents

Create these next:

- Backend Module Catalogue.
- Database Domain Model.
- API Standards.
- Authentication And Authorization Specification.
- Multi-Tenancy Specification.
- AI Gateway Technical Specification.
- Queue And Job Strategy.
- Offline Sync Specification.
- Code Execution Service Specification.
- Observability And Incident Response Specification.
