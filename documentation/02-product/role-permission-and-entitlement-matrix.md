# Role, Permission, And Entitlement Matrix

## Purpose

This document defines the platform's role, permission, and subscription entitlement model.

The platform must support individual learners, children, parents/guardians, teachers, institutions, platform administrators, curriculum authors, AI agents, and future partner integrations.

## Core Principle

Authorization must not rely on simple role names alone.

Every sensitive action should evaluate:

- identity,
- role,
- permission,
- tenant/institution,
- class/cohort membership,
- age/guardian rules,
- subscription entitlements,
- feature flags,
- AI usage limits,
- data ownership,
- audit requirements.

## Role Categories

### Platform Roles

- Platform Owner,
- Platform Admin,
- Support Admin,
- Finance Admin,
- Security Admin,
- Content Admin,
- AI Operations Admin.

### Institution Roles

- Institution Owner,
- Institution Admin,
- Campus Admin,
- Department Admin,
- Teacher,
- Teaching Assistant,
- Curriculum Coordinator,
- Billing Contact.

### Learner And Family Roles

- Adult Learner,
- Child Learner,
- Parent/Guardian,
- Family Account Owner.

### Content Roles

- Curriculum Author,
- Technical Reviewer,
- Pedagogy Reviewer,
- Accessibility Reviewer,
- Publisher.

### System Roles

- AI Agent,
- Sandbox Worker,
- Sync Client,
- Integration Client,
- Webhook Consumer.

System roles must use scoped credentials and must never bypass authorization checks.

## Permission Domains

### Identity And Account

Permissions:

- view own profile,
- update own profile,
- manage password,
- manage MFA,
- manage linked accounts,
- manage child account,
- impersonate user,
- suspend user,
- delete/anonymize user.

Rules:

- user impersonation must be audited,
- child account management requires guardian/institution policy,
- destructive account actions require elevated permission.

### Institution Management

Permissions:

- create institution,
- view institution,
- update institution settings,
- manage campuses,
- manage departments,
- manage classes/cohorts,
- invite teachers,
- bulk import learners,
- export institution data,
- suspend institution,
- configure curriculum alignment.

Rules:

- institution admins only manage their own institution,
- exports require audit logging,
- cross-tenant access is platform-admin only.

### Class And Learner Management

Permissions:

- view assigned classes,
- create class,
- update class,
- enroll learner,
- remove learner,
- reset learner password,
- view learner progress,
- add teacher feedback,
- assign lesson,
- assign project,
- view learner AI history summary.

Rules:

- teachers can only view learners in assigned classes,
- teachers should not see sensitive parent/payment data,
- learner AI raw logs may require stricter access than AI summaries.

### Curriculum And Content

Permissions:

- create content draft,
- edit own draft,
- edit assigned content,
- review content,
- approve content,
- publish content,
- archive content,
- create curriculum standard mapping,
- create competency mapping,
- generate AI content draft.

Rules:

- AI-generated canonical content requires human review,
- publishing requires reviewer separation where feasible,
- content versions must be preserved.

### Learning And Assessment

Permissions:

- start lesson,
- submit practice,
- request hint,
- submit assessment,
- view own grade,
- grade learner submission,
- override AI grade,
- create assessment,
- publish assessment,
- view assessment analytics.

Rules:

- assessed tasks must enforce AI integrity rules,
- grade overrides must be audited,
- learners cannot view hidden tests or rubrics before release.

### AI Features

Permissions:

- use AI mentor,
- request hint,
- request code review,
- generate quiz draft,
- generate lesson draft,
- generate project brief,
- run AI agent workflow,
- view AI usage,
- configure AI provider,
- configure tenant AI limits,
- review AI incident.

Rules:

- child learners may have restricted AI modes,
- tenants can disable specific AI features,
- high-cost AI features require entitlement checks,
- AI tool calls must be permission-checked like normal user actions.

### Code Execution

Permissions:

- run code,
- submit code,
- view execution logs,
- run tests,
- create assignment tests,
- view hidden test results,
- approve sandbox exception,
- manage sandbox settings.

Rules:

- learner code never runs on app servers,
- teachers can see submissions for assigned classes,
- hidden tests remain protected.

### Billing And Subscriptions

Permissions:

- view own billing,
- manage family billing,
- view institution billing,
- manage institution subscription,
- apply discount,
- issue invoice,
- view payment history,
- configure payment provider,
- cancel subscription.

Rules:

- teachers should not see institution payment details unless assigned billing role,
- finance actions require audit logs,
- subscription entitlements must be enforced centrally.

### Analytics And Reports

Permissions:

- view own progress,
- view class analytics,
- view institution analytics,
- view platform analytics,
- export reports,
- view AI Mission Control,
- view financial analytics.

Rules:

- learner-level analytics must be scoped,
- aggregate reports should minimize personal data,
- platform analytics should respect privacy policy and tenant agreements.

## Role Capability Matrix

| Capability | Learner | Parent | Teacher | Institution Admin | Content Author | Platform Admin |
|---|---:|---:|---:|---:|---:|---:|
| View own learning progress | Yes | Child only | Assigned learners | Institution learners | No | Yes |
| Use AI mentor | Entitled | No | Entitled | Configures | Entitled | Yes |
| Create class | No | No | Optional | Yes | No | Yes |
| Assign lesson | No | No | Yes | Yes | No | Yes |
| Grade work | No | No | Assigned learners | Optional | No | Yes |
| Create curriculum draft | No | No | Optional | Optional | Yes | Yes |
| Publish canonical content | No | No | No | Optional | With approval | Yes |
| Manage billing | Own/family | Family | No | Billing role | No | Finance/Admin |
| Export data | Own | Child | Class reports | Institution reports | Content only | Yes |
| Configure tenant AI | No | No | No | Yes | No | Yes |
| Impersonate user | No | No | No | No | No | Restricted |

## Subscription Entitlements

Entitlements should be checked separately from permissions.

Example:

- a teacher may have permission to generate quizzes,
- but the institution plan may only include 100 AI quiz generations per month.

Entitlement categories:

- learner seats,
- teacher seats,
- AI credits,
- AI models available,
- code execution minutes,
- storage quota,
- project quota,
- certificates,
- offline packages,
- analytics depth,
- institution branding,
- integrations,
- support level.

## Entitlement Examples

### Free Learner

- limited lessons,
- limited AI questions,
- limited project saves,
- no certificates or limited certificates,
- community/basic support.

### Student Pro

- expanded AI mentor access,
- project portfolio,
- code review quota,
- interview practice,
- certificates where eligible.

### Institution Starter

- learner seat pack,
- teacher dashboard,
- class management,
- basic analytics,
- controlled AI usage,
- basic reports.

### Institution Growth

- more seats,
- richer analytics,
- AI classroom assistant,
- bulk import,
- certificates,
- priority support.

### Institution Enterprise

- custom contracts,
- SSO later,
- custom AI provider policy,
- advanced reports,
- data export,
- dedicated support,
- potential data residency options.

## AI Agent Authorization

AI agents must never act as superusers.

Every AI tool call should include:

- initiating user,
- tenant,
- role,
- requested tool,
- purpose,
- side-effect level,
- required permission,
- entitlement check,
- audit ID.

Example:

```text
Teacher asks AI to create quiz
  |
  v
Check teacher can create quiz for class
  |
  v
Check institution AI quiz quota
  |
  v
Generate quiz draft
  |
  v
Save as draft, not published
```

## Data Access Rules

### Learners

Can access:

- own lessons,
- own progress,
- own projects,
- own AI mentor history where policy allows,
- assigned class content.

Cannot access:

- other learner data,
- hidden assessment solutions,
- admin reports,
- billing data unless adult/family owner.

### Teachers

Can access:

- assigned classes,
- assigned learner progress,
- submissions,
- class analytics,
- teacher-facing AI recommendations.

Cannot access:

- unrelated classes,
- institution billing unless billing role,
- platform admin data,
- raw sensitive AI logs unless authorized.

### Parents/Guardians

Can access:

- linked child progress summary,
- certificates,
- subscription/family billing,
- teacher-approved reports.

Cannot access:

- unrelated classroom data,
- private teacher notes unless shared,
- other learners' data.

## Audit Requirements

Audit logs required for:

- role changes,
- permission changes,
- learner data export,
- admin impersonation,
- grade override,
- certificate issuance,
- AI tool side effects,
- subscription changes,
- institution suspension,
- user deletion/anonymization.

## Implementation Guidance

Recommended Laravel approach:

- use policies for resource-level authorization,
- use gates for broad platform abilities,
- use roles/permissions through a dedicated permission layer,
- use subscription entitlement checks through a centralized service,
- use middleware for tenant context,
- use audit events for sensitive actions.

Do not scatter entitlement checks across controllers.

Recommended services:

```text
AuthorizationService
EntitlementService
TenantContext
AuditLogger
AiToolAuthorizationService
```

## Acceptance Criteria

- every sensitive endpoint has authorization tests,
- tenant isolation tests exist for all institution data,
- AI tool calls are permission checked,
- subscription limits are centrally enforced,
- admin impersonation is audited,
- grade overrides are audited,
- data exports are audited,
- child learner access rules are tested.
