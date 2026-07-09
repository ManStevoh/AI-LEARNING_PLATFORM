# Infrastructure And CI/CD

## Purpose

This document defines the initial infrastructure and CI/CD strategy for the AI Learning Platform.

## Infrastructure Principles

- Start simple.
- Use Docker for reproducible environments.
- Avoid Kubernetes until scale or team maturity justifies it.
- Separate web, worker, scheduler, and sandbox workloads.
- Use managed services where they reduce risk.
- Build for observability and backup from the beginning.

## Environments

Required environments:

- local,
- development,
- staging,
- production.

Environment rules:

- production data must not be copied to local without sanitization,
- staging should mirror production architecture where practical,
- secrets must be environment-managed,
- migrations must be tested before production.

## Initial Production Architecture

```text
Cloudflare
  |
  v
Load Balancer / Web Server
  |
  v
Laravel Web App
  |
  +-- PostgreSQL
  +-- Redis
  +-- Horizon Workers
  +-- Scheduler
  +-- Object Storage
  +-- Search
  +-- AI Providers
  +-- Sandbox Service
```

## Core Services

### Web Application

- Laravel,
- PHP-FPM initially,
- Octane later only after profiling.

### Queue Workers

- Redis queues,
- Horizon,
- separate queues for AI, grading, media, reports, billing, code execution.

### Scheduler

Runs:

- recurring reports,
- cleanup jobs,
- billing reconciliation,
- Horizon snapshots,
- backup checks,
- notification schedules.

### Database

- PostgreSQL,
- automated backups,
- point-in-time recovery where possible,
- monitoring for slow queries and storage.

### Cache And Queues

- Redis,
- separate logical databases/connections where needed,
- monitor memory and queue depth.

### Object Storage

- S3-compatible storage,
- private buckets by default,
- signed URLs,
- lifecycle policies.

## CI Pipeline

Required checks:

- PHP dependency install,
- JS dependency install,
- PHP tests,
- TypeScript build,
- linting/format checks,
- static analysis where configured,
- database migration check,
- security/dependency scanning,
- OpenAPI validation where APIs exist.

## CD Pipeline

Deployment steps:

1. Build artifacts.
2. Run tests.
3. Deploy code.
4. Put app in maintenance only if needed.
5. Run migrations safely.
6. Restart PHP/web processes.
7. Restart Horizon workers gracefully.
8. Clear/warm caches.
9. Run smoke tests.
10. Monitor errors and latency.

## Release Gates

Production release requires:

- tests passing,
- no critical security findings,
- migration reviewed,
- rollback plan,
- smoke test plan,
- queue compatibility checked,
- feature flags ready for risky features.

## Backup Strategy

Back up:

- PostgreSQL,
- object storage metadata,
- critical uploaded files,
- environment configuration references,
- OpenAPI/spec documents,
- curriculum content exports.

Requirements:

- automated daily backups,
- restore testing,
- retention policy,
- encrypted backups,
- access control.

## Disaster Recovery

Define:

- recovery time objective,
- recovery point objective,
- restore process,
- incident roles,
- communication plan,
- post-incident review.

## Secrets Management

Secrets include:

- database credentials,
- Redis credentials,
- AI provider keys,
- payment keys,
- object storage keys,
- webhook secrets,
- encryption keys.

Rules:

- never commit secrets,
- rotate secrets,
- use least privilege,
- separate staging and production.

## Scaling Plan

Phase 1:

- single app server,
- managed database,
- Redis,
- workers.

Phase 2:

- multiple app servers,
- more workers,
- read replicas,
- CDN optimization.

Phase 3:

- separate AI workers,
- separate sandbox service,
- analytics warehouse,
- regional deployments.

## Definition Of Done

Infrastructure is production-ready when:

- deployment is repeatable,
- backups exist and are tested,
- monitoring exists,
- secrets are protected,
- workers are supervised,
- logs are centralized,
- rollback plan exists.
