# Institution Onboarding And Operations

## Purpose

This document defines how schools, universities, bootcamps, NGOs, and training organizations join, configure, operate, and renew the platform.

## Institution Types

- primary school,
- junior/senior school,
- coding academy,
- university department,
- TVET institution,
- NGO program,
- corporate training program,
- government program.

## Onboarding Flow

```text
Lead captured
  |
  v
Discovery call
  |
  v
Pilot or subscription proposal
  |
  v
Institution tenant created
  |
  v
Admin and billing roles assigned
  |
  v
Teachers invited
  |
  v
Learners imported
  |
  v
Curriculum/path configured
  |
  v
Training session
  |
  v
Pilot/term starts
```

## Required Setup Data

- institution name,
- country,
- curriculum context,
- campuses,
- departments/classes,
- primary admin,
- billing contact,
- teacher list,
- learner roster,
- subscription plan,
- AI policy,
- data processing agreement status.

## Teacher Provisioning

Teachers can be added by:

- invitation email,
- admin-created account,
- bulk import,
- future SSO.

Required:

- assigned institution,
- assigned classes,
- role/permissions,
- onboarding checklist,
- teacher dashboard access.

## Learner Provisioning

Learners can be added by:

- teacher-created learner,
- admin-created learner,
- CSV import,
- self-join class code,
- future SSO/roster integration.

Rules:

- child data collection must be minimized,
- duplicate detection is required,
- import errors must be explainable,
- learners must be tenant-scoped.

## Bulk Import Requirements

CSV fields:

- learner name,
- email or username,
- class/cohort,
- age band,
- optional guardian contact,
- optional student ID.

Import process:

```text
Upload CSV
  |
  v
Validate columns
  |
  v
Preview rows/errors
  |
  v
Confirm import
  |
  v
Create accounts/enrollments
  |
  v
Generate report
```

## Institution Dashboard

Dashboard should show:

- active learners,
- active teachers,
- class progress,
- course completion,
- competency gaps,
- AI usage,
- code execution usage,
- subscription status,
- support issues,
- renewal signals.

## Reports

Report types:

- class progress report,
- learner progress report,
- competency coverage report,
- AI usage report,
- attendance/activity report,
- certificate readiness report,
- pilot outcome report.

Exports:

- CSV,
- PDF later,
- API later.

Exports must be permission-checked and audited.

## Institution AI Controls

Admins should configure:

- AI enabled/disabled,
- allowed learner AI features,
- teacher AI features,
- model/provider policy later,
- monthly AI limits,
- child learner restrictions,
- assessment-mode behavior.

## Support Operations

Support channels:

- email,
- in-app support,
- future WhatsApp,
- account manager for enterprise.

Support categories:

- login/access,
- billing,
- learner import,
- AI issue,
- content issue,
- technical issue,
- data/privacy request.

## Pilot Operations

Pilot should define:

- duration,
- learner count,
- teacher count,
- target level,
- success metrics,
- training schedule,
- support contact,
- data collection consent,
- final report date.

Pilot success metrics:

- activation rate,
- weekly active learners,
- lesson completion,
- project completion,
- teacher usage,
- AI helpfulness,
- willingness to continue/pay.

## Renewal Process

Renewal signals:

- active usage,
- completion rates,
- teacher satisfaction,
- learner outcomes,
- support burden,
- invoice/payment status.

Renewal package:

- usage summary,
- learning outcomes,
- teacher feedback,
- recommended plan,
- next-term curriculum plan.

## Acceptance Criteria

- institution can be created and configured,
- admin can invite teachers,
- learners can be imported with validation,
- classes can be created,
- teachers can assign lessons,
- institution dashboard is tenant-scoped,
- exports are audited,
- subscription entitlements are enforced.
