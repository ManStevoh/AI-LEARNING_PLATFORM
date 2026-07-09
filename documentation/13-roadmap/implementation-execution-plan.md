# Implementation Execution Plan

## Purpose

This document converts the platform vision into an execution plan.

The goal is to build a world-class platform in phases without attempting to ship every long-term feature at once.

## Execution Principle

Build the smallest coherent platform foundation first, not a throwaway MVP.

The first release should validate:

- institution accounts,
- learner/teacher workflows,
- Level 1 block coding,
- AI mentor,
- skill graph foundation,
- teacher dashboard,
- subscription foundation.

## Phase 0: Documentation And Design

Deliverables:

- PRD,
- database model,
- API standards,
- UI design system,
- Level 1 curriculum,
- security baseline,
- AI governance,
- code execution decision,
- deployment plan.

Exit criteria:

- engineering team can estimate work,
- designers can create Figma prototypes,
- curriculum team can author first lessons,
- pilot schools can understand value proposition.

## Phase 1: Platform Foundation

Core features:

- Laravel project setup,
- PostgreSQL,
- Redis,
- React/Inertia,
- Tailwind/design system,
- authentication,
- roles/permissions,
- institution model,
- teacher/learner accounts,
- basic dashboard,
- audit logging foundation.

Exit criteria:

- users can register/login,
- institution can create classes,
- teacher can add learners,
- learner can access dashboard.

## Phase 2: Curriculum And Skill Graph Foundation

Core features:

- domains,
- concepts,
- skills,
- prerequisites,
- learning paths,
- lesson authoring foundation,
- skill mapping,
- learner skill state.

Exit criteria:

- Level 1 skills exist,
- lessons map to skills,
- learner progress updates skill states.

## Phase 3: Level 1 Block Coding

Core features:

- Blockly workspace,
- stage preview,
- project save/load,
- generated JavaScript view,
- starter lessons,
- AI block explainer,
- teacher assignment,
- project submission.

Exit criteria:

- learner can complete first block project,
- teacher can assign and review,
- AI can explain blocks safely.

## Phase 4: AI Mentor Foundation

Core features:

- AI Gateway,
- provider adapter,
- prompt registry,
- cost tracking,
- safety rules,
- lesson-aware AI mentor,
- learner context,
- feedback rating.

Exit criteria:

- learner can ask lesson-context questions,
- AI uses hint-first behavior,
- usage and cost are tracked.

## Phase 5: Teacher And Institution Dashboard

Core features:

- class overview,
- learner progress,
- skill mastery,
- assignment status,
- common misconceptions,
- basic reports,
- institution seat usage.

Exit criteria:

- teacher can identify struggling learners,
- institution can see adoption and progress.

## Phase 6: Subscriptions And Payments

Core features:

- plans,
- entitlements,
- institution seats,
- invoices,
- M-Pesa foundation,
- manual institution billing,
- AI usage limits.

Exit criteria:

- institution can subscribe or be manually activated,
- learner seats are enforced,
- AI limits are enforced.

## Phase 7: Pilot Launch

Pilot targets:

- 1-3 schools or coding programs,
- 50-300 learners,
- 3-10 teachers.

Measure:

- activation,
- lesson completion,
- project completion,
- teacher time saved,
- AI usefulness,
- learner engagement,
- technical issues,
- willingness to pay.

Exit criteria:

- at least one institution wants continued use,
- teachers report clear value,
- learners complete real projects,
- critical security/privacy issues are resolved.

## Phase 8: Browser IDE And Code Execution

Core features:

- Monaco editor,
- file tree,
- code runner integration,
- tests,
- coding assignments,
- AI code review,
- teacher feedback.

Exit criteria:

- learners can complete simple JavaScript/Python labs,
- code runs safely,
- tests produce feedback.

## Phase 9: Career Path Expansion

Tracks:

- frontend,
- backend,
- full stack,
- mobile,
- data/AI,
- cybersecurity.

Features:

- projects,
- portfolio,
- certificates,
- interview practice,
- GitHub guidance.

## Phase 10: Mobile, Desktop, Offline, WhatsApp

Sequence:

1. PWA offline drafts.
2. Flutter mobile offline lessons.
3. Desktop app for offline project work.
4. WhatsApp learning reminders and quizzes.

## Suggested Initial Team

Minimum serious team:

- product/technical lead,
- Laravel backend engineer,
- React frontend engineer,
- UI/UX designer,
- curriculum designer,
- AI engineer or AI integration engineer,
- QA/test engineer part-time,
- DevOps support part-time.

As funding grows:

- security engineer,
- data/analytics engineer,
- mobile engineer,
- content team,
- customer success,
- sales/partnerships.

## Release Gates

Every release must pass:

- functional tests,
- authorization tests,
- tenant isolation tests,
- accessibility smoke test,
- performance smoke test,
- AI safety checks where applicable,
- backup/deployment check,
- rollback plan.

## Risk Register

Major risks:

- scope too large,
- AI costs too high,
- code execution security,
- weak curriculum quality,
- poor teacher adoption,
- poor offline planning,
- data privacy issues,
- overbuilding before pilots,
- underestimating content operations.

Mitigations:

- phase delivery,
- pilot early,
- track AI usage,
- use managed sandbox initially,
- review curriculum with teachers,
- define privacy policies early,
- keep modular architecture.

## Immediate Next Step

Before coding:

1. Complete Level 1 block coding curriculum.
2. Create Figma design system and first learner/teacher flows.
3. Define first database migrations.
4. Define first API contracts.
5. Select AI provider for first pilot.
6. Select pilot institution.
7. Build Phase 1 foundation.
