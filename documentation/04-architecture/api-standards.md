# API Standards

## Purpose

This document defines API standards for the AI Learning Platform.

The first web product may use Laravel + Inertia, but the backend must expose stable APIs for:

- mobile apps,
- desktop apps,
- offline sync,
- WhatsApp learning,
- code execution workers,
- AI services,
- institution integrations,
- future partner APIs.

## API Principles

- API-first where future clients need stable contracts.
- Inertia is allowed for first web release, but domain capabilities must not be trapped inside page controllers.
- APIs must be versioned.
- APIs must be documented with OpenAPI 3.1.
- APIs must enforce authentication, authorization, tenancy, subscription entitlements, and rate limits.
- APIs must use consistent errors, pagination, filtering, and idempotency.

## URL Versioning

Use:

```text
/api/v1/...
```

Examples:

```text
GET /api/v1/me
GET /api/v1/institutions/{institutionId}/classes
GET /api/v1/learners/{learnerId}/skills
POST /api/v1/block-projects
POST /api/v1/code-executions
POST /api/v1/ai/mentor/messages
```

## Authentication

### Web/Inertia

Use Laravel session authentication.

### Mobile/Desktop

Use Sanctum bearer tokens.

Token requirements:

- device name,
- device ID,
- token abilities,
- last used timestamp,
- revocation endpoint.

### Partner APIs

Start with scoped tokens.

Future:

- OAuth2 only if delegated third-party access becomes necessary.

## Authorization

Every protected endpoint must check:

- authenticated user,
- active tenant/institution context,
- role/permission,
- Laravel policy,
- subscription entitlement,
- usage quota where applicable,
- age/safety rule where applicable.

## Tenant Context

Tenant-scoped API calls should include institution context through path or explicit selected institution.

Preferred:

```text
/api/v1/institutions/{institutionId}/classes
```

Avoid hidden tenant context for sensitive operations unless it is clearly managed by session/device state.

## Request Format

Use JSON:

```http
Content-Type: application/json
Accept: application/json
```

File uploads should use:

- presigned object storage uploads for large files,
- multipart upload for large media,
- metadata creation through API.

## Response Envelope

For single resources:

```json
{
  "data": {
    "id": "example",
    "type": "lesson"
  }
}
```

For collections:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 25,
    "total": 100
  },
  "links": {
    "next": "..."
  }
}
```

## Error Format

Use a consistent error format:

```json
{
  "error": {
    "code": "subscription_limit_exceeded",
    "message": "This institution has reached its learner seat limit.",
    "details": {
      "limit": 100,
      "current": 100
    },
    "request_id": "req_..."
  }
}
```

Required error fields:

- `code`,
- `message`,
- `request_id`.

Validation errors:

```json
{
  "error": {
    "code": "validation_failed",
    "message": "The given data was invalid.",
    "fields": {
      "email": ["The email field is required."]
    },
    "request_id": "req_..."
  }
}
```

## Pagination

Default:

- `per_page=25`
- maximum `per_page=100`

Use cursor pagination for large feeds, activity logs, sync, and events.

## Filtering And Sorting

Recommended query pattern:

```text
GET /api/v1/institutions/{id}/learners?filter[status]=active&sort=-created_at
```

Use `spatie/laravel-query-builder` where appropriate.

## Idempotency

Require idempotency keys for:

- payments,
- subscription changes,
- sync uploads,
- import jobs,
- code execution requests,
- AI generation requests where duplicate cost matters,
- certificate generation.

Header:

```http
Idempotency-Key: uuid-or-client-generated-key
```

## Rate Limiting

Rate limit by:

- IP,
- user,
- tenant,
- token,
- endpoint class,
- AI cost sensitivity.

Special stricter limits:

- login,
- password reset,
- AI requests,
- code execution,
- file upload metadata,
- payment webhooks,
- WhatsApp webhooks.

## Webhooks

Webhook endpoints must:

- verify signatures,
- respond quickly,
- queue processing,
- use idempotency,
- log event ID,
- support retries,
- store raw payload where policy allows.

Webhook sources:

- M-Pesa,
- Stripe,
- WhatsApp,
- future LMS/SIS integrations.

## OpenAPI Requirements

Every public/mobile/desktop/partner API must be documented.

OpenAPI files should define:

- path,
- method,
- summary,
- description,
- auth requirements,
- request schema,
- response schema,
- error schema,
- examples,
- rate limits where relevant.

## API Categories

### Identity API

- current user,
- login,
- logout,
- token issue/revoke,
- profile,
- MFA.

### Institution API

- institutions,
- campuses,
- classes,
- cohorts,
- teachers,
- learners,
- imports,
- reports.

### Learning API

- paths,
- courses,
- lessons,
- progress,
- recommendations.

### Skill Graph API

- domains,
- concepts,
- skills,
- prerequisites,
- mastery states,
- career path mappings.

### Block Coding API

- projects,
- versions,
- assets,
- generated code,
- submissions,
- feedback.

### IDE API

- code projects,
- files,
- submissions,
- tests,
- reviews.

### Code Execution API

- create execution request,
- get execution status,
- get result,
- get logs.

### AI API

- mentor messages,
- code review,
- lesson explanation,
- quiz generation,
- teacher planner,
- usage records.

### Subscription API

- plans,
- subscriptions,
- invoices,
- payments,
- seat usage,
- entitlements.

### Offline Sync API

- register device,
- get sync cursor,
- pull changes,
- push changes,
- resolve conflicts,
- download offline package.

## Backward Compatibility

Breaking API changes require:

- new version,
- migration guide,
- deprecation notice,
- sunset date,
- monitoring of old version usage.

## API Definition Of Done

An API endpoint is complete when:

- request validation exists,
- authorization exists,
- tenant scoping exists,
- response schema is documented,
- errors follow standard format,
- tests exist,
- rate limits are appropriate,
- audit/logging exists where needed,
- OpenAPI is updated.
