# OWASP ASVS Control Matrix

## Purpose

This document maps the platform's security requirements to OWASP ASVS-style control areas.

The target baseline is ASVS Level 2 for production handling learner, child, school, payment, AI, and code execution data.

Source:

- OWASP ASVS: https://asvs.dev/

## Control Areas

### Architecture And Threat Modeling

Required:

- threat model for AI, code execution, institutions, payments, and child data,
- security requirements documented,
- trust boundaries identified,
- high-risk flows reviewed.

Evidence:

- `threat-model.md`,
- architecture diagrams,
- security review notes.

### Authentication

Required:

- secure password handling,
- rate limits,
- email verification where required,
- MFA for admins later,
- session security,
- token revocation for mobile/desktop.

### Authorization

Required:

- role/permission checks,
- tenant isolation,
- object-level authorization,
- subscription entitlement checks,
- AI tool authorization.

Tests:

- learner cannot access another learner,
- teacher cannot access unrelated class,
- institution admin cannot access another institution.

### Input Validation

Required:

- request validation,
- file upload validation,
- AI tool input schema validation,
- code execution limits,
- payment callback validation.

### Output Encoding

Required:

- escape user content,
- sanitize rendered markdown where needed,
- protect AI-generated content from unsafe rendering.

### Cryptography

Required:

- TLS,
- encrypted secrets,
- hashed passwords,
- signed URLs for private files,
- encryption for sensitive tokens.

### Error Handling And Logging

Required:

- no sensitive data in user errors,
- audit logs for sensitive actions,
- security event logs,
- AI safety logs,
- code execution abuse logs.

### Data Protection

Required:

- privacy-by-design,
- data minimization,
- retention policy,
- export/deletion workflows,
- child data safeguards.

### File And Resource Security

Required:

- object storage,
- file scanning strategy,
- private buckets,
- signed URLs,
- upload size/type limits.

### API Security

Required:

- authentication,
- authorization,
- rate limits,
- validation,
- idempotency for payments,
- OpenAPI contract.

### AI Security

Required:

- AI Gateway only,
- prompt injection controls,
- RAG tenant filtering,
- tool authorization,
- output safety checks,
- cost abuse controls.

### Code Execution Security

Required:

- sandbox isolation,
- no app-server execution,
- CPU/memory/time limits,
- network restrictions where possible,
- abuse monitoring.

## Acceptance Criteria

- ASVS checklist is reviewed before production,
- high-risk controls have tests,
- tenant isolation tests exist,
- AI and sandbox controls are tested,
- security gaps are tracked with owners.
