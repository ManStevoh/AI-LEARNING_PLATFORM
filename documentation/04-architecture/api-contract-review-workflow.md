# API Contract Review Workflow

## Purpose

This document defines how API contracts are designed, reviewed, versioned, and tested.

## Source Of Truth

The OpenAPI file at `api/openapi.yaml` is the starting public/mobile API contract.

## API Change Workflow

```text
Identify product requirement
  |
  v
Design endpoint/schema
  |
  v
Review auth/tenant/entitlement rules
  |
  v
Update OpenAPI
  |
  v
Implement endpoint
  |
  v
Add tests
  |
  v
Generate/update clients later
```

## Review Requirements

Every endpoint must define:

- purpose,
- actor,
- auth scheme,
- tenant scope,
- permissions,
- entitlements,
- request schema,
- response schema,
- errors,
- rate limits,
- events emitted.

## Versioning

Initial:

- `/api/v1`.

Rules:

- do not break mobile/desktop clients without versioning or migration plan,
- additive changes preferred,
- deprecations require notice.

## Error Examples

All APIs should use consistent errors:

```json
{
  "error": {
    "code": "permission_denied",
    "message": "You do not have permission to access this resource.",
    "request_id": "req_123"
  }
}
```

## Acceptance Criteria

- OpenAPI updated for API changes,
- auth and tenant rules reviewed,
- tests cover success and failure,
- examples are included,
- breaking changes are explicitly approved.
