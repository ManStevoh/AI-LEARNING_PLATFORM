# Database Migration Strategy

## Purpose

This document defines how database migrations should be designed, reviewed, tested, deployed, and evolved.

The platform will contain complex tenant data, learner records, AI data, billing, projects, assessments, and analytics. Migration discipline is critical.

## Migration Principles

- Migrations must be small and reviewable.
- Migrations should be module-owned.
- Migrations must preserve tenant safety.
- High-risk data migrations require rollback and backfill plans.
- Schema migrations and large data migrations should be separated.
- Production migrations must be tested on realistic data volume.

## Migration Ownership

Each module owns its migrations.

Examples:

```text
Modules/Institutions/Database/Migrations
Modules/Curriculum/Database/Migrations
Modules/AI/Database/Migrations
Modules/Subscriptions/Database/Migrations
```

## Naming Convention

Use descriptive migration names:

```text
create_institutions_table
create_institution_memberships_table
add_institution_id_to_block_projects_table
create_learner_skill_states_table
```

Avoid vague names:

```text
update_users
fix_table
add_fields
```

## Required Columns

Most tables should include:

- `id`,
- `created_at`,
- `updated_at`.

Tenant-scoped tables should include:

- `institution_id`.

Syncable tables should include:

- `version`,
- `deleted_at` where tombstones are needed,
- `created_by`,
- `updated_by`.

Auditable tables may include:

- `created_by`,
- `updated_by`,
- `deleted_by`.

## Foreign Key Rules

Use foreign keys for critical relationships.

Define delete behavior deliberately:

- `restrict` for critical historical records,
- `cascade` only where child data should truly disappear,
- `nullOnDelete` where history should remain but owner can be removed.

Examples:

- Do not cascade-delete learner evidence casually.
- Do not cascade-delete payment records.
- Soft-delete institution data where legal/contracts require retention windows.

## Index Rules

Add indexes for:

- foreign keys,
- `institution_id`,
- status fields,
- timestamps used in filtering,
- search fields,
- sync cursors,
- event streams,
- subscription lookups.

Composite indexes should match real query patterns.

Examples:

```text
institution_id + class_id
institution_id + learner_profile_id
learner_profile_id + skill_id
subscription_id + metric
institution_id + created_at
```

## JSONB Rules

Use JSONB for:

- flexible metadata,
- provider payload summaries,
- block workspace snapshots,
- AI request metadata,
- rubric configuration.

Do not use JSONB to avoid modeling core relationships.

## Migration Review Checklist

Before merging a migration:

- Does it belong to the correct module?
- Does it include tenant scoping where needed?
- Are foreign keys correct?
- Are indexes present for expected queries?
- Is delete behavior safe?
- Does it affect existing data?
- Does it need a backfill?
- Does it need downtime?
- Does it affect offline sync?
- Does it affect analytics?
- Is rollback safe?

## Deployment Strategy

Use expand-and-contract for risky changes:

1. Add nullable column/table.
2. Deploy code that writes both old and new data where needed.
3. Backfill.
4. Switch reads to new structure.
5. Remove old structure in later release.

## Seed Data

Seed:

- default roles,
- permissions,
- core plans,
- initial skill domains,
- Level 1 skills,
- sample institution for development,
- demo teacher/learner users.

Never seed production with test users unless explicitly intended.

## Migration Order For First Build

Recommended order:

1. Identity.
2. Institutions.
3. Roles/permissions.
4. Curriculum graph.
5. Learning content.
6. Learner profiles.
7. Progress and skill states.
8. Block coding projects.
9. AI gateway records.
10. Subscriptions.
11. Audit logs.

## Definition Of Done

A migration is ready when:

- it is reviewed,
- tested locally,
- tested in CI,
- rollback behavior is understood,
- indexes are justified,
- tenant safety is verified,
- data migration plan exists if needed.
