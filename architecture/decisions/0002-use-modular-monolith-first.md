# ADR 0002: Use A Modular Monolith First

Status: Accepted

Date: 2026-07-09

## Context

The AI Learning Platform is a large product with many domains:

- identity,
- institutions,
- learners,
- teachers,
- courses,
- lessons,
- curriculum,
- assessments,
- AI,
- Blockly,
- IDE,
- payments,
- subscriptions,
- certificates,
- analytics,
- notifications,
- media,
- gamification,
- marketplace,
- community,
- administration.

The platform must move quickly at the beginning, but it should not become a disorganized Laravel codebase where every controller, model, service, and job is mixed by technical type only.

The founder wants the platform to become a multi-million-dollar education company with a path to mobile, desktop, offline sync, WhatsApp learning, institutional SaaS, AI-powered workflows, and future scale.

## Decision

Start with a Laravel modular monolith.

This means:

- one primary deployable Laravel application at the beginning,
- one primary PostgreSQL database at the beginning,
- modules organized by business capability,
- clear domain boundaries,
- internal events for side effects,
- service contracts where cross-module queries are needed,
- API-first interfaces for future clients,
- and a clean path to extract modules into services only when scale, team ownership, compliance, or operational needs justify it.

## Rationale

A modular monolith gives the platform:

- faster delivery than microservices,
- simpler deployment,
- easier debugging,
- easier transactions,
- lower DevOps burden,
- strong internal structure,
- and a future migration path.

Microservices introduce distributed systems complexity too early:

- many deployments,
- network failures,
- distributed tracing requirements,
- eventual consistency,
- data duplication,
- service versioning,
- complex local development,
- and more infrastructure overhead.

The platform should earn microservices through real constraints, not adopt them as an aesthetic choice.

## Consequences

### Positive

- Faster first product delivery.
- Better developer productivity.
- Clearer domain ownership than a traditional Laravel folder-by-type structure.
- Easier testing and refactoring.
- Lower infrastructure cost.
- Future service extraction remains possible.

### Negative

- Boundaries require team discipline.
- Laravel module packages can scaffold modules but do not enforce architecture automatically.
- Large modules can still become messy if coding standards are ignored.
- Cross-module dependencies must be reviewed carefully.

## Module Boundary Rules

- A module owns its own business logic.
- A module should not directly import another module's internal models or services.
- Cross-module side effects should usually use events and listeners.
- Cross-module reads should use explicit contracts, query services, or read models.
- Shared technical utilities belong in a shared/core layer, not in random modules.
- Circular dependencies are not allowed.
- Database tables should be owned by one domain even when other domains reference them.

## When To Extract A Microservice

Extract a module only when one or more of these are true:

- the module has independent scaling requirements,
- the module has distinct compliance or isolation requirements,
- a separate team owns it fully,
- it has different deployment cadence,
- it has extreme resource usage,
- it needs a different technology stack,
- or operational risk is lower when separated.

Likely future extraction candidates:

- code execution sandbox,
- AI gateway,
- analytics warehouse,
- media/video processing,
- notification delivery,
- search/retrieval infrastructure.

## Implementation Guidance

Use one of two approaches:

### Option A: Manual Modules

Create a top-level `modules/` or `app/Modules/` directory with custom service providers and PSR-4 autoloading.

Best when the team wants maximum control.

### Option B: `nwidart/laravel-modules`

Use `nwidart/laravel-modules` for scaffolding self-contained modules.

Important: the package organizes code, routes, migrations, service providers, and tests, but it does not enforce strict architectural boundaries. The team must still enforce boundary rules through code review, tests, static analysis, and architecture checks.

## References

- Laravel documentation: https://laravel.com/docs
- Laravel Modules: https://laravelmodules.com/docs/13/getting-started/introduction
- Laravel Events: https://laravel.com/docs/12.x/events
- Laravel Queues: https://laravel.com/docs/12.x/queues
