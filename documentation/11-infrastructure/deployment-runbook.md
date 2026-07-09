# Deployment Runbook

## Purpose

This runbook defines the deployment process for staging and production.

## Environments

- local,
- staging,
- production.

## Pre-Deployment Checklist

- tests pass,
- migrations reviewed,
- environment variables configured,
- secrets available,
- queues healthy,
- backups current,
- feature flags checked,
- release notes prepared.

## Deployment Steps

```text
Build artifact/container
  |
  v
Run tests/security checks
  |
  v
Deploy to staging
  |
  v
Run smoke tests
  |
  v
Approve production release
  |
  v
Run production migrations
  |
  v
Deploy application
  |
  v
Restart workers safely
  |
  v
Run smoke tests
  |
  v
Monitor metrics/logs
```

## Migration Rules

- avoid destructive migrations without expand-contract plan,
- back up before risky migrations,
- run migrations before code only where compatible,
- monitor slow migrations.

## Smoke Tests

Required:

- homepage loads,
- login works,
- dashboard loads,
- database connected,
- Redis connected,
- queue worker healthy,
- AI Gateway disabled/enabled state known,
- code execution health known.

## Rollback

Rollback plan must include:

- app version rollback,
- worker rollback,
- feature flag disable,
- migration rollback strategy where safe,
- data correction plan where rollback is not possible.

## Acceptance Criteria

- staging deploy works,
- production deploy checklist exists,
- smoke tests are documented,
- rollback path is known,
- deployment logs are retained.
