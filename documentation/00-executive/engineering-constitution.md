# ACE Platform Engineering Constitution

Version: 1.0

## Purpose

This document is the engineering constitution for the AI Computing Education Platform.

It defines the non-negotiable standards that every contributor, developer, designer, reviewer, architect, and AI coding assistant must follow.

Every feature, database table, API, UI component, AI integration, and deployment decision must align with this constitution.

## 1. Engineering Philosophy

Every feature must be:

- scalable,
- maintainable,
- secure,
- observable,
- testable,
- modular,
- reusable,
- accessible,
- documented,
- production-ready,
- offline-ready where relevant,
- AI-ready where relevant.

The platform should become easier to maintain as it grows. Developers should not only add code; they should reduce confusion, strengthen tests, improve documentation, and simplify complexity where appropriate.

## 2. Product Quality Standard

The platform serves learners, children, teachers, institutions, parents, and administrators. Quality is not optional.

Every product capability must define:

- user goal,
- business goal,
- acceptance criteria,
- permissions,
- subscription entitlement,
- analytics events,
- error states,
- accessibility expectations,
- security/privacy considerations.

## 3. Code Quality Standards

Never:

- duplicate business logic,
- hardcode business-configurable values,
- leave dead code,
- leave unresolved TODOs in production paths,
- create hidden dependencies,
- bypass authorization,
- suppress exceptions silently,
- introduce unnecessary dependencies,
- create large unowned utility files.

Always:

- use dependency injection where appropriate,
- use descriptive names,
- separate concerns,
- keep functions/classes focused,
- document public interfaces,
- prefer typed code,
- reuse existing services before creating new abstractions,
- keep changes scoped to the requirement.

## 4. Architecture Rules

The backend is a modular monolith first.

Never:

- put business logic in controllers,
- put SQL in views,
- allow React to bypass APIs/backend services,
- create circular module dependencies,
- create giant service classes,
- let provider-specific logic leak across modules.

Always:

- enforce module boundaries,
- keep controllers thin,
- use application services/actions for workflows,
- use events for cross-module side effects where appropriate,
- keep domain ownership clear,
- add ADRs for major architectural decisions.

## 5. Database Standards

Never:

- introduce N+1 queries,
- use `SELECT *` in performance-sensitive queries,
- add nullable fields without reason,
- omit indexes for common filters/foreign keys,
- store relational data in JSON just because it is convenient,
- bypass tenant scoping.

Always:

- use foreign keys where appropriate,
- add indexes intentionally,
- paginate lists,
- use transactions for multi-step consistency,
- review expensive queries,
- preserve auditability for sensitive data,
- design IDs and sync metadata with future offline clients in mind.

## 6. Performance Standards

Performance is a feature.

Targets:

- backend responses should be fast for typical operations,
- expensive work must be queued,
- heavy frontend bundles must be lazy-loaded,
- dashboards must avoid unbounded queries,
- assets should be optimized and cached,
- AI and sandbox calls must expose queued/loading states.

Rules:

- use caching strategically,
- avoid premature optimization,
- measure before major optimization work,
- monitor API latency, queue lag, AI latency, and database health.

## 7. Frontend Engineering Rules

Never:

- hardcode random colors,
- create inconsistent spacing,
- create one-off button styles,
- ignore loading/error/empty states,
- break keyboard navigation,
- build inaccessible custom controls.

Always:

- use the design system,
- use reusable components,
- use TypeScript,
- respect design tokens,
- handle responsive states,
- provide skeleton/loading states,
- provide meaningful error states,
- test critical interactions.

## 8. UI Quality Rules

Every screen should look like it was designed by one team.

The following must follow the design system:

- spacing,
- margins,
- typography,
- colors,
- buttons,
- cards,
- forms,
- icons,
- animations,
- charts,
- dashboard layouts.

UI polish matters, but clarity matters more than decoration.

## 9. AI Engineering Rules

Never:

- call AI providers directly from UI,
- expose API keys,
- trust AI output without validation where required,
- let prompt injection access sensitive data,
- let AI tools act as superusers,
- use AI-only judgment for high-stakes outcomes.

Always:

- use the AI Gateway,
- version prompts,
- validate structured outputs,
- permission-check tool calls,
- tenant-filter RAG retrieval,
- log usage and cost,
- apply safety checks,
- use human review for high-impact outputs.

## 10. Security Rules

Security follows OWASP ASVS-aligned practices.

Always:

- validate inputs,
- authorize every action,
- enforce tenant boundaries,
- protect secrets,
- use least privilege,
- rate limit sensitive operations,
- audit privileged actions,
- protect child data,
- use CSRF protection where applicable,
- avoid leaking internal errors.

Never:

- trust client input,
- expose stack traces to users,
- hardcode credentials,
- store secrets in prompts,
- execute learner code on app servers.

## 11. Error Handling

No white screens.

Every error should have:

- user-safe message,
- logging,
- recovery path,
- monitoring where relevant,
- alerting for severe failures.

Errors will happen. The standard is graceful handling, not pretending failure is impossible.

## 12. Observability

Everything important must be measurable.

Track:

- API latency,
- error rates,
- queue lag,
- database performance,
- AI usage and cost,
- sandbox execution,
- payment callbacks,
- tenant-level usage,
- critical learner journeys.

Logs must be useful, structured where practical, and must not expose sensitive data unnecessarily.

## 13. Testing Rules

Minimum expectations:

- unit tests for domain logic,
- feature/integration tests for workflows,
- authorization tests,
- tenant isolation tests,
- accessibility checks for critical UI,
- AI evaluation tests where AI influences guidance or assessment,
- payment callback tests,
- sandbox execution tests with safe fakes/mocks.

No critical feature is complete without tests.

## 14. Accessibility Rules

Accessibility is a first-class requirement.

Support:

- keyboard navigation,
- screen readers,
- focus indicators,
- sufficient contrast,
- reduced motion,
- readable errors,
- non-color-only indicators,
- accessible forms,
- accessible dashboards.

Target:

- WCAG 2.2 AA for web experiences.

## 15. Configuration Rules

Nothing should be hardcoded if it is business-configurable.

Configurable items include:

- platform name,
- logos,
- institution branding,
- theme tokens where allowed,
- AI provider/model policy,
- subscription plans,
- storage providers,
- email templates,
- certificates,
- learning calendars,
- feature flags.

Configuration must still be permission-controlled and auditable.

## 16. Multi-Tenancy Rules

Every institution must be isolated.

Institution-specific data includes:

- users,
- classes,
- teachers,
- learners,
- courses,
- reports,
- storage quotas,
- AI limits,
- subscription entitlements,
- branding.

Tenant isolation must be tested, not assumed.

## 17. API Standards

APIs must be:

- versioned,
- documented,
- predictable,
- tenant-scoped,
- permission-checked,
- idempotent where appropriate,
- consistent in error format.

OpenAPI must be updated for public/mobile-facing API changes.

## 18. Documentation Rules

Every module should document:

- purpose,
- responsibilities,
- public interfaces,
- dependencies,
- events/jobs,
- security considerations,
- testing notes,
- operational concerns.

Major decisions require ADRs.

## 19. Deployment Rules

No manual production changes.

Deployments should be:

- reproducible,
- reviewed,
- observable,
- reversible where practical,
- backed by smoke tests,
- supported by rollback plans.

Infrastructure and configuration must be documented.

## 20. Cursor And AI Coding Assistant Rules

Cursor must:

- follow this constitution,
- follow documented module boundaries,
- reuse existing services before creating new ones,
- avoid inventing architecture,
- preserve documented decisions unless asked to change them,
- generate/update tests with feature work,
- update documentation when behavior changes,
- explain major architectural changes,
- avoid unnecessary dependencies,
- never bypass security, tenancy, or authorization rules.

## 21. Definition Of Done

A feature is not complete until:

- requirements are implemented,
- code is reviewed,
- tests pass,
- authorization is tested,
- tenant scope is tested where relevant,
- performance is acceptable,
- accessibility is checked,
- security/privacy impact is reviewed,
- documentation is updated,
- module implementation status and project status ledger are updated per `documentation/00-executive/status-tracking-procedure.md`,
- monitoring/logging exists where relevant.

## 22. Data And Privacy Rules

The platform must minimize and protect data.

Rules:

- collect only what is needed,
- protect child learner data,
- define retention,
- support export/deletion workflows,
- restrict raw AI logs,
- maintain subprocessor records,
- separate public, tenant, and private data.

## 23. AI Education Integrity

AI should teach, not shortcut learning.

AI must:

- scaffold before solving,
- respect assessment mode,
- cite platform sources where possible,
- avoid hallucinated claims,
- ask for clarification when context is missing,
- escalate high-risk issues to humans.

## 24. Maintainability Rule

Every feature must leave the platform at least as maintainable as before.

This means:

- reduce duplication,
- improve naming,
- add tests,
- clarify ownership,
- delete obsolete code,
- document non-obvious decisions,
- avoid unnecessary abstraction.

## 25. Enforcement

This constitution is enforced through:

- code review,
- architecture review,
- tests,
- ADR review,
- documentation review,
- security review,
- accessibility review,
- Cursor rules,
- release gates.

If a feature conflicts with this constitution, the feature must change or an explicit architecture decision must justify the exception.

## 26. Dependency Governance

Dependencies are long-term commitments.

Never add a package only because it is convenient.

Before adding a dependency, confirm:

- it solves a real problem,
- it is maintained,
- it has acceptable license terms,
- it does not duplicate an existing capability,
- it does not weaken security,
- it fits the architecture,
- it can be tested and upgraded.

High-risk dependencies include:

- authentication,
- payments,
- AI providers,
- code execution,
- file upload/parsing,
- rich text/markdown rendering,
- browser editor/runtime packages.

## 27. Migration And Backward Compatibility Rules

Database and API changes must be safe.

Rules:

- use expand-and-contract migrations for risky changes,
- avoid destructive changes without review and backup,
- keep migrations small and reviewable,
- preserve API compatibility for shipped clients,
- document breaking changes,
- use feature flags for risky transitions,
- test rollback or forward-fix strategy.

Data migrations must be idempotent or carefully checkpointed where possible.

## 28. Feature Flag And Rollout Rules

Risky features should be released progressively.

Use feature flags for:

- AI behavior changes,
- billing changes,
- new assessment behavior,
- new dashboards,
- sandbox/runtime changes,
- institution-specific features,
- migrations requiring staged rollout.

Flags must have:

- owner,
- purpose,
- default state,
- rollout plan,
- cleanup date.

Do not leave stale flags permanently.

## 29. Incident And Postmortem Rules

Incidents are learning events for the engineering organization.

For serious incidents, record:

- what happened,
- user impact,
- timeline,
- root cause,
- detection gap,
- response gap,
- prevention actions,
- owner and due dates.

Postmortems must be blameless and action-oriented.

## 30. Data Lifecycle Rules

Every important data type must define:

- owner,
- purpose,
- retention period,
- access rules,
- export/deletion behavior,
- audit requirements,
- backup/recovery expectations.

Sensitive data includes:

- child learner data,
- AI conversations,
- assessment results,
- institution reports,
- payment records,
- code submissions,
- uploaded files.

## 31. Education Quality Gates

Educational content must pass quality review before it becomes canonical.

Review dimensions:

- technical correctness,
- pedagogy,
- age appropriateness,
- accessibility,
- curriculum alignment,
- assessment quality,
- AI safety,
- localization/cultural fit where relevant.

AI-generated learning content is a draft until reviewed.

## 32. Sandbox And Runtime Safety Rules

Learner code and block runtimes must be bounded.

Required:

- CPU/memory/time limits,
- output limits,
- network controls where possible,
- file limits,
- abuse detection,
- safe error messages,
- audit logs for suspicious activity.

No learner code may execute on application servers.

## 33. Marketplace And Plugin Rules

Future marketplaces and plugins must be treated as security boundaries.

Before enabling third-party content, plugins, or agents:

- define review workflow,
- define permissions/scopes,
- define data access boundaries,
- define moderation and takedown rules,
- define revenue/IP terms,
- define abuse response.

No plugin may access tenant or learner data without explicit scoped permission.

## 34. Compliance Ownership

Compliance is not a one-time checklist.

Every high-risk area must have an owner:

- privacy,
- child safety,
- AI safety,
- security,
- payments,
- code execution,
- accessibility,
- institution data.

Owners are responsible for reviews, evidence, policy updates, and release sign-off.

## 35. Stop-The-Line Rule

Any contributor may stop or challenge a release if they identify a serious issue involving:

- child safety,
- tenant isolation,
- payment integrity,
- data exposure,
- assessment integrity,
- AI safety,
- code execution security,
- production stability.

Shipping speed never overrides learner safety, data protection, or platform trust.
