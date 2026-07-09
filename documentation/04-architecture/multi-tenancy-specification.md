# Multi-Tenancy Specification

## Purpose

This document defines how the platform supports many institutions safely inside one platform.

Institutions are first-class tenants. Schools, universities, bootcamps, NGOs, government programs, and companies must have isolated data, billing, roles, reports, and policy settings.

## Tenancy Model

Start with shared application and shared PostgreSQL database using tenant-scoped rows.

Future enterprise options:

- dedicated database per large tenant,
- dedicated deployment,
- country/regional deployment,
- custom data residency.

## Tenant Hierarchy

```text
Platform
  |
  v
Institution
  |
  +-- Campus
  +-- Department
  +-- Class
  +-- Cohort
  +-- Teacher
  +-- Learner
  +-- Parent/Guardian
```

## Tenant-Owned Data

Tenant-scoped data includes:

- classes,
- cohorts,
- enrollments,
- assignments,
- submissions,
- reports,
- learner progress,
- learner digital twin records,
- teacher feedback,
- institution billing,
- AI usage,
- exports,
- uploaded resources.

## Tenant Isolation Requirements

- Every tenant-scoped query must filter by institution context.
- Every policy must verify institution membership.
- Every background job must carry institution ID.
- Every cache key for tenant data must include institution ID.
- Every report/export must enforce tenant scope.
- Every AI retrieval request must enforce tenant scope.
- Every audit log must include tenant ID.

## Tenant Settings

Institution settings should include:

- country,
- curriculum framework,
- timezone,
- language preferences,
- enabled features,
- AI policy,
- learner age policy,
- guardian visibility,
- data export permissions,
- billing owner,
- notification preferences.

## Cross-Tenant Platform Data

Some data may be global:

- public courses,
- canonical skills,
- global curriculum graph,
- public templates,
- platform pricing plans,
- public help docs.

Rules:

- global content can be referenced by tenants,
- tenant-specific copies or overrides must be clearly owned,
- tenant private content must never leak into global search or AI retrieval.

## Tenant Customization

Institutions may need:

- branding,
- curriculum mappings,
- custom classes/cohorts,
- private resources,
- custom reports,
- custom AI policy,
- custom subscription terms.

Do not over-customize early. Use configuration first, custom deployments later only for enterprise customers.

## Data Export

Tenant exports must:

- verify permission,
- log request,
- run asynchronously,
- generate signed download link,
- expire link,
- include audit metadata.

## Tenant Deletion And Suspension

Support:

- subscription suspension,
- access freeze,
- data export before deletion,
- soft-delete period,
- permanent deletion workflow according to contract and law.

## Tenant Analytics

Analytics should be scoped by:

- institution,
- campus,
- class,
- cohort,
- teacher,
- course,
- skill,
- time period.

## Testing Requirements

Must test:

- cross-tenant access blocked,
- API tenant scoping,
- dashboard scoping,
- AI retrieval scoping,
- export scoping,
- background job scoping,
- cache scoping.

## Definition Of Done

A tenant-scoped feature is complete only when:

- table has tenant relationship,
- queries enforce tenant scope,
- policy checks membership,
- tests cover cross-tenant denial,
- audit logs include tenant ID,
- AI/search/cache usage is tenant-safe.
