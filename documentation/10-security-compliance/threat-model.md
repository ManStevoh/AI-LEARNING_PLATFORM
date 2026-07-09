# Threat Model

## Purpose

This document identifies major security and privacy threats for the AI Learning Platform and defines initial mitigations.

## High-Value Assets

- learner personal data,
- child data,
- institution data,
- teacher records,
- learner progress,
- learner digital twin,
- AI conversation logs,
- code submissions,
- payment data,
- certificates,
- uploaded content,
- admin accounts,
- AI prompts and provider keys,
- sandbox infrastructure.

## Primary Threat Actors

- unauthenticated attackers,
- malicious learners,
- compromised learner accounts,
- compromised teacher accounts,
- malicious insiders,
- abusive platform admins,
- external attackers targeting payments,
- attackers abusing code execution,
- prompt injection attackers,
- compromised third-party provider.

## Major Threat Areas

### Broken Access Control

Risks:

- teacher views another institution's learners,
- parent views unrelated child,
- learner accesses another learner's project,
- admin exports unauthorized data.

Mitigations:

- tenant-scoped policies,
- authorization tests,
- audit logs,
- least privilege roles,
- data export approvals.

### Prompt Injection And AI Data Leakage

Risks:

- uploaded document tells AI to ignore rules,
- AI leaks private institution content,
- AI reveals hidden test cases,
- AI gives full graded answers.

Mitigations:

- AI Gateway,
- tenant-scoped retrieval,
- prompt injection checks,
- hidden test isolation,
- assessment-mode prompts,
- output validation,
- audit logs.

### Code Execution Abuse

Risks:

- infinite loops,
- fork bombs,
- filesystem abuse,
- network scanning,
- crypto mining,
- container escape attempts.

Mitigations:

- isolated sandbox,
- CPU/memory/time limits,
- network disabled by default,
- disposable execution,
- rate limits,
- abuse monitoring.

### Child Data Exposure

Risks:

- unnecessary collection,
- weak guardian controls,
- exposed reports,
- unsafe AI responses.

Mitigations:

- data minimization,
- guardian policy,
- role-based access,
- age-aware AI,
- retention limits,
- privacy notices.

### Payment Fraud And Webhook Abuse

Risks:

- fake payment webhooks,
- replayed webhook events,
- subscription manipulation,
- invoice tampering.

Mitigations:

- signature verification,
- idempotency,
- provider reconciliation,
- audit logs,
- least privilege billing roles.

### File Upload Abuse

Risks:

- malware,
- oversized files,
- harmful content,
- private file exposure,
- PDF prompt injection.

Mitigations:

- object storage,
- file type validation,
- size limits,
- malware scanning where needed,
- private buckets,
- signed URLs,
- document sanitization.

### Offline Sync Abuse

Risks:

- replayed sync operations,
- stale writes overwrite current data,
- stolen device token,
- forged progress events.

Mitigations:

- device registration,
- token revocation,
- version checks,
- conflict resolution,
- idempotency,
- server-side validation.

### Admin Abuse

Risks:

- support user accesses learner data unnecessarily,
- admin impersonation misuse,
- hidden data changes.

Mitigations:

- privileged access review,
- impersonation logs,
- reason required,
- restricted impersonation,
- audit exports.

## Security Testing Requirements

Required tests:

- cross-tenant authorization tests,
- role/permission tests,
- upload tests,
- webhook replay tests,
- AI prompt injection tests,
- code sandbox abuse tests,
- rate limit tests,
- session/token revocation tests.

## Risk Register

Each risk should be tracked with:

- ID,
- severity,
- likelihood,
- affected assets,
- mitigation,
- owner,
- status,
- review date.

## Definition Of Done

A high-risk feature is ready only when:

- threats are documented,
- mitigations are implemented,
- tests exist,
- logs exist,
- incident response path exists,
- owner accepts residual risk.
