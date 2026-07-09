# Backup And Disaster Recovery Runbook

## Purpose

This document defines backup and recovery expectations.

## Critical Data

- PostgreSQL database,
- object storage files,
- user uploads,
- curriculum content,
- project files,
- AI prompt versions,
- audit logs,
- payment records.

## Backup Requirements

Database:

- automated daily backups minimum,
- point-in-time recovery where possible,
- encrypted backups,
- regular restore tests.

Object storage:

- versioning where possible,
- lifecycle policy,
- replication later if needed.

## Recovery Objectives

Define per environment:

- RPO: recovery point objective,
- RTO: recovery time objective.

Initial target:

- staging: best effort,
- production pilot: restore within same business day,
- production scale: stricter SLO after validation.

## Restore Test Process

```text
Select backup
  |
  v
Restore to isolated environment
  |
  v
Verify schema/data
  |
  v
Run smoke tests
  |
  v
Record result
```

## Disaster Scenarios

- database failure,
- object storage data loss,
- accidental deletion,
- bad migration,
- compromised credentials,
- provider outage,
- region outage.

## Acceptance Criteria

- backups are automated,
- restore test is scheduled,
- backup access is restricted,
- recovery process is documented,
- incidents produce postmortems.
