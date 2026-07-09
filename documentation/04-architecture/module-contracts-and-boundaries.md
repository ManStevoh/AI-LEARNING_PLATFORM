# Module Contracts And Boundaries

## Purpose

This document defines how modules should interact inside the Laravel modular monolith.

The goal is to keep the speed of one deployable application while avoiding a tangled LMS codebase.

## Module Boundary Rules

- Each module owns its domain logic.
- Modules should not reach directly into another module's internal services.
- Cross-module communication should use public application services, events, or read models.
- Database relationships across modules should be deliberate and reviewed.
- Shared code should be small and stable.

## First-Class Modules

Recommended modules:

- Identity,
- AccessControl,
- Institutions,
- Learners,
- Curriculum,
- Learning,
- Assessment,
- BlockCoding,
- IDE,
- CodeExecution,
- AI,
- Subscriptions,
- Payments,
- Notifications,
- Analytics,
- Content,
- Media,
- Portfolio,
- Admin.

## Module Internal Structure

```text
Modules/{ModuleName}/
  app/
    Actions/
    Data/
    Events/
    Http/
      Controllers/
      Requests/
      Resources/
    Jobs/
    Listeners/
    Models/
    Policies/
    Services/
  database/
    migrations/
    factories/
    seeders/
  routes/
  tests/
```

## Public Contracts

Each module should expose:

- application services,
- events,
- data transfer objects,
- policies,
- API resources where needed.

Avoid exposing:

- internal query details,
- internal model mutation methods,
- provider-specific integrations.

## Example: Lesson Completion

```text
Learning Module
  |
  v
LessonCompleted event
  |
  +-- Analytics listener
  +-- Learning Genome listener
  +-- Gamification listener
  +-- Notification listener
  +-- AI Memory listener
```

## Cross-Module Access Rules

Allowed:

- call a public service,
- dispatch an event,
- query a documented read model,
- use shared value objects.

Avoid:

- importing another module's controller,
- updating another module's tables directly,
- depending on another module's private model behavior,
- circular service dependencies.

## Shared Kernel

Allowed shared concepts:

- IDs,
- tenant context,
- money,
- date ranges,
- pagination,
- audit metadata,
- feature flags,
- result objects.

Shared kernel must stay small.

## Boundary Testing

Required:

- architecture tests or static checks for forbidden dependencies,
- module-level feature tests,
- contract tests for public services,
- event listener tests.

## Acceptance Criteria

- each module has owner/responsibility,
- module boundaries are documented,
- public services are named,
- cross-module events are cataloged,
- no module bypasses authorization or tenant context,
- AI and payment provider calls are isolated in their modules.
