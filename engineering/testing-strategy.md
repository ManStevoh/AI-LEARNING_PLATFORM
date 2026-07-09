# Testing Strategy

## Purpose

This document defines how the AI Learning Platform should be tested.

The platform includes learners, children, institutions, AI, payments, code execution, and offline sync. Testing must cover more than basic CRUD.

## Testing Principles

- Test business rules, not only implementation details.
- Test tenant isolation aggressively.
- Test AI features with evaluation datasets.
- Test accessibility continuously.
- Test code execution as hostile input.
- Test payments and webhooks with idempotency.
- Test offline sync conflicts.

## Test Types

### Unit Tests

Use for:

- domain services,
- value objects,
- policies,
- permission checks,
- entitlement checks,
- skill mastery calculations,
- recommendation rules.

### Feature Tests

Use for:

- user workflows,
- API endpoints,
- Inertia pages,
- form submissions,
- authorization,
- tenant scoping.

### Integration Tests

Use for:

- AI Gateway adapter boundaries,
- payment provider webhooks,
- object storage,
- search,
- queue jobs,
- sandbox orchestration.

### End-To-End Tests

Use for:

- learner onboarding,
- teacher class creation,
- block project submission,
- AI mentor flow,
- institution seat assignment,
- billing flow.

### Accessibility Tests

Use:

- keyboard navigation checks,
- contrast checks,
- focus checks,
- screen reader smoke tests,
- reduced motion checks.

### Security Tests

Must cover:

- cross-tenant access,
- broken access control,
- upload abuse,
- webhook replay,
- token revocation,
- rate limits,
- prompt injection,
- sandbox abuse.

### AI Evaluation Tests

Evaluate:

- correctness,
- hallucination,
- safety,
- pedagogical quality,
- hint-first behavior,
- age appropriateness,
- code feedback quality,
- cost/latency.

### Performance Tests

Test:

- dashboard queries,
- class roster loads,
- AI queue throughput,
- code execution queue,
- report generation,
- search queries.

## Critical Test Scenarios

### Tenant Isolation

- teacher from Institution A cannot see Institution B learners,
- parent cannot view unrelated learner,
- AI retrieval cannot retrieve another institution's document,
- exports are tenant-scoped.

### AI Mentor

- AI receives only allowed context,
- AI gives hints in assessment mode,
- AI refuses unsafe content,
- AI logs model/prompt/cost.

### Block Coding

- project saves and reloads,
- generated code view matches blocks,
- submission creates teacher review item,
- disconnected block mistake can be detected.

### Payments

- webhook signature required,
- duplicate webhook does not duplicate payment,
- subscription entitlements update correctly,
- failed payment state visible.

### Offline Sync

- offline progress syncs,
- conflict detected,
- revoked device cannot sync,
- stale update does not overwrite newer project.

## Test Data

Create fixtures for:

- platform admin,
- institution admin,
- teacher,
- learner,
- parent,
- school,
- class,
- Level 1 skills,
- lessons,
- block project,
- subscription plan.

## Definition Of Done

A feature is complete when:

- unit/feature tests exist,
- authorization tests exist,
- tenant tests exist where applicable,
- UI states are tested,
- accessibility smoke check passes,
- analytics events are tested,
- docs are updated.
