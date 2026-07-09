# Authentication And Authorization Specification

## Purpose

This document defines authentication, authorization, roles, permissions, tenant context, and entitlement checks for the AI Learning Platform.

The platform will serve learners, teachers, parents, institutions, administrators, and future API clients. Access control must be institution-aware, subscription-aware, age-aware, and auditable.

## Authentication Methods

### Phase 1

- Email and password.
- Secure Laravel sessions for web.
- Laravel Sanctum for API tokens.
- Password reset.
- Email verification.

### Phase 2

- Google login.
- Microsoft login for schools.
- MFA for teachers, institution admins, and platform admins.

### Phase 3

- Institution SSO through SAML/OIDC.
- Apple login where needed.
- Device management for mobile/desktop offline clients.

## Session And Token Strategy

### Web

Use Laravel session authentication.

Security requirements:

- CSRF protection,
- secure cookies,
- SameSite cookie settings,
- session regeneration after login,
- logout from all devices,
- idle timeout for privileged roles.

### Mobile And Desktop

Use Sanctum bearer tokens.

Token metadata:

- device name,
- device ID,
- platform,
- app version,
- abilities/scopes,
- last used timestamp,
- revoked timestamp.

## Role Model

Global roles:

- Platform Super Admin,
- Platform Support,
- Curriculum Admin,
- Security/Admin Auditor.

Institution roles:

- Institution Owner,
- Institution Admin,
- Campus Admin,
- Teacher,
- Assistant Teacher,
- Learner,
- Parent/Guardian,
- Billing Manager.

Content roles:

- Curriculum Author,
- Curriculum Reviewer,
- Content Publisher.

## Permission Model

Permissions should be action-based.

Examples:

- `institution.view`
- `institution.update`
- `class.create`
- `class.manage_members`
- `learner.view_progress`
- `assignment.create`
- `submission.review`
- `ai.teacher_tools.use`
- `billing.manage`
- `reports.export`
- `curriculum.publish`
- `admin.impersonate`

## Authorization Layers

Every sensitive action should pass:

```text
Authentication
  |
  v
Tenant context
  |
  v
Role/permission
  |
  v
Laravel policy
  |
  v
Subscription entitlement
  |
  v
Usage limit
  |
  v
Safety/age rule
```

## Tenant Context

Users may belong to multiple institutions.

Requirements:

- user can switch active institution,
- active institution must be stored safely,
- permission checks must use active institution,
- background jobs must carry institution ID,
- audit logs must include institution ID.

## Entitlements

Authorization must include subscription entitlements.

Examples:

- institution can create only allowed number of learner seats,
- teacher AI tools available only on certain plans,
- code execution minutes limited by plan,
- offline downloads available only on eligible plans,
- reports export controlled by plan.

## Child And Guardian Controls

Requirements:

- child accounts can be linked to guardians,
- guardian access limited to their child,
- teacher/institution policy controls what guardians see,
- child privacy rules apply by country and age,
- communication features must be restricted for minors.

## Admin Impersonation

If admin impersonation is implemented:

- only trusted platform admins can use it,
- require reason,
- log start/end,
- show impersonation banner,
- restrict sensitive actions while impersonating,
- notify institution where policy requires.

## Audit Requirements

Audit:

- login failures,
- password changes,
- MFA changes,
- role changes,
- permission changes,
- institution membership changes,
- billing changes,
- data exports,
- admin impersonation,
- AI policy changes.

## Testing Requirements

Tests must cover:

- learner cannot access another learner's private data,
- teacher cannot access classes outside institution,
- parent cannot access unrelated learner,
- institution admin cannot cross tenant,
- subscription limits block actions,
- revoked token cannot access API,
- inactive institution membership blocks access.

## Implementation Recommendations

- Use Laravel policies for domain authorization.
- Use `spatie/laravel-permission` for roles/permissions.
- Evaluate team/tenant mode for institution-scoped roles.
- Keep subscription checks in entitlement services, not scattered conditionals.
- Add authorization tests for every module.
