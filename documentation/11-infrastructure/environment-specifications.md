# Environment Specifications

## Purpose

This document defines local, staging, and production environment expectations.

## Local

Purpose:

- developer productivity.

Services:

- Laravel,
- Node/Vite,
- PostgreSQL,
- Redis,
- MinIO,
- optional Meilisearch,
- fake AI/sandbox/payment adapters where possible.

## Staging

Purpose:

- production-like testing,
- demos,
- pilot validation before release.

Requirements:

- production-like database,
- Redis/queues,
- object storage,
- AI sandbox keys,
- test payment environment,
- monitoring,
- seeded demo data.

## Production

Purpose:

- real institutions and learners.

Requirements:

- managed database or reliable self-managed ops,
- backups,
- Redis/queues,
- object storage,
- CDN/WAF,
- observability,
- secrets management,
- restricted admin access,
- incident response.

## Environment Variables

Categories:

- app,
- database,
- cache,
- queue,
- storage,
- mail,
- AI providers,
- sandbox provider,
- payment providers,
- observability.

## Acceptance Criteria

- environments are documented,
- secrets are not committed,
- staging is production-like enough for release testing,
- production has backups and monitoring.
