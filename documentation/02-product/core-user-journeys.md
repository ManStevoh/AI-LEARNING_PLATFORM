# Core User Journeys

## Purpose

This document defines the platform's primary user journeys at product-spec level.

Each journey should later be expanded into detailed UI flows, API contracts, acceptance tests, and analytics events.

## Journey Principles

- Reduce friction for first-time learners and teachers.
- Make AI useful but transparent.
- Keep institution workflows predictable and auditable.
- Design every journey for future mobile, desktop, and offline support.
- Capture learning events for analytics and the learner digital twin.
- Provide useful empty, loading, error, and recovery states.

## Journey 1: Individual Learner Signup

Actors:

- Adult Learner,
- Child Learner,
- Parent/Guardian where required.

Flow:

```text
Visit platform
  |
  v
Choose learner account
  |
  v
Enter age band and basic details
  |
  v
If child, require guardian or institution-controlled flow
  |
  v
Select goal or placement path
  |
  v
Create learner profile
  |
  v
Show starter dashboard
```

Required states:

- email verification pending,
- guardian consent pending,
- placement not started,
- no course selected,
- free plan limit visible.

Acceptance criteria:

- child account flow does not collect unnecessary data,
- learner can start an allowed free lesson,
- AI mentor respects age and account status,
- onboarding emits analytics/learning events.

## Journey 2: Institution Onboarding

Actors:

- Institution Owner,
- Institution Admin,
- Billing Contact,
- Platform Admin.

Flow:

```text
Institution requests account
  |
  v
Platform/admin approves or self-serve creates tenant
  |
  v
Set institution profile
  |
  v
Choose subscription plan
  |
  v
Configure campuses/classes
  |
  v
Invite teachers
  |
  v
Import learners
  |
  v
Assign curriculum
```

Required states:

- trial active,
- payment pending,
- teacher invite pending,
- import failed,
- no classes,
- no learners,
- AI disabled by institution.

Acceptance criteria:

- institution data is tenant-scoped,
- billing contact can be separate from academic admin,
- bulk import has validation and rollback/error report,
- setup checklist shows progress.

## Journey 3: Teacher Creates A Class

Actors:

- Teacher,
- Institution Admin.

Flow:

```text
Teacher opens dashboard
  |
  v
Create class
  |
  v
Select curriculum level/path
  |
  v
Add learners or request admin import
  |
  v
Assign first lesson/project
  |
  v
Monitor class progress
```

Required states:

- no assigned institution,
- class pending approval,
- no learners,
- no curriculum selected,
- learners not activated.

Acceptance criteria:

- teacher only sees assigned classes,
- class creation respects institution plan limits,
- first assignment creates learner notifications/events,
- dashboard highlights learners needing support.

## Journey 4: Learner Starts A Guided Learning Session

Actors:

- Learner,
- AI Teacher Agent.

Flow:

```text
Learner opens dashboard
  |
  v
Platform recommends today's goal
  |
  v
Learner opens lesson
  |
  v
Reads/watches/practices
  |
  v
Asks AI for hint if needed
  |
  v
Completes practice
  |
  v
Receives feedback and next step
```

Required states:

- lesson loading,
- offline unavailable,
- AI limit reached,
- prerequisite missing,
- practice failed,
- practice completed,
- review due.

Acceptance criteria:

- AI references current lesson context,
- hints scaffold before giving answers,
- progress updates skill state,
- learner sees why next step is recommended.

## Journey 5: Level 1 Block Coding Project

Actors:

- Learner,
- Teacher,
- AI Mentor.

Flow:

```text
Open project brief
  |
  v
Blockly workspace loads
  |
  v
Learner drags blocks
  |
  v
Runs project on stage
  |
  v
AI detects issue or answers question
  |
  v
Learner submits project
  |
  v
Teacher/AI rubric feedback generated
```

Required states:

- workspace loading,
- project autosaved,
- blocks invalid,
- runtime error,
- stage paused,
- submitted,
- feedback pending.

Acceptance criteria:

- project state is saved safely,
- AI can inspect Blockly JSON,
- generated code view maps blocks to code,
- submission maps to competencies.

## Journey 6: AI Mentor Question

Actors:

- Learner,
- AI Kernel,
- Teacher Agent or Coding Agent.

Flow:

```text
Learner asks question
  |
  v
AI Kernel classifies task
  |
  v
Build context
  |
  v
Retrieve relevant content
  |
  v
Route to agent
  |
  v
Run tools if needed
  |
  v
Return answer with sources/hints
  |
  v
Record rating and learning event
```

Required states:

- AI unavailable,
- safety blocked,
- answer needs source,
- assessed-mode limited answer,
- quota reached.

Acceptance criteria:

- no provider is called directly outside AI Gateway,
- answer includes source references where applicable,
- tool calls are authorized,
- AI event is logged.

## Journey 7: Teacher Generates Assignment

Actors:

- Teacher,
- AI Assessment Agent.

Flow:

```text
Teacher selects class and topic
  |
  v
Chooses difficulty and skills
  |
  v
AI drafts assignment
  |
  v
Teacher edits
  |
  v
Teacher publishes
  |
  v
Learners receive assignment
```

Required states:

- AI draft failed,
- quota exceeded,
- rubric incomplete,
- teacher draft unsaved,
- published,
- scheduled.

Acceptance criteria:

- AI-generated assignment starts as draft,
- teacher review is required before publishing,
- assignment maps to competencies,
- learners cannot access hidden solution.

## Journey 8: Code Submission And Review

Actors:

- Learner,
- Coding Agent,
- Sandbox Worker,
- Teacher.

Flow:

```text
Learner writes code
  |
  v
Runs code/tests
  |
  v
Sandbox returns result
  |
  v
AI explains errors or reviews code
  |
  v
Learner submits
  |
  v
Teacher reviews or approves feedback
```

Required states:

- sandbox queued,
- timeout,
- memory limit exceeded,
- test failed,
- test passed,
- AI review pending,
- submitted.

Acceptance criteria:

- code never runs on app server,
- execution output is stored with limits,
- AI explains errors without leaking hidden solutions,
- review maps findings to rubric and competencies.

## Journey 9: Parent Views Child Progress

Actors:

- Parent/Guardian,
- Learner,
- Teacher.

Flow:

```text
Parent signs in
  |
  v
Selects linked child
  |
  v
Views progress summary
  |
  v
Views certificates/projects
  |
  v
Receives teacher-approved recommendations
```

Required states:

- child link pending,
- no progress yet,
- report unavailable,
- teacher note private.

Acceptance criteria:

- parent only sees linked child,
- sensitive classroom data is hidden,
- recommendations use supportive language,
- child privacy rules are enforced.

## Journey 10: Institution Reviews Cohort Analytics

Actors:

- Institution Admin,
- Teacher,
- Analytics Agent.

Flow:

```text
Admin opens institution dashboard
  |
  v
Selects class/cohort/date range
  |
  v
Views completion, competency, AI usage, risk signals
  |
  v
AI summarizes trends
  |
  v
Admin exports or assigns intervention
```

Required states:

- no data,
- data delayed,
- export pending,
- AI insight unavailable,
- privacy threshold not met.

Acceptance criteria:

- analytics are tenant-scoped,
- learner-level details require permission,
- aggregate summaries avoid exposing unnecessary personal data,
- exports are audited.

## Journey 11: Subscription Upgrade

Actors:

- Individual Learner,
- Parent,
- Institution Billing Contact,
- Finance Admin.

Flow:

```text
User hits plan limit
  |
  v
Views upgrade options
  |
  v
Chooses plan/payment method
  |
  v
Payment processed or invoice issued
  |
  v
Entitlements updated
  |
  v
User continues workflow
```

Required states:

- payment failed,
- invoice pending,
- M-Pesa confirmation pending,
- plan limit reached,
- downgrade scheduled.

Acceptance criteria:

- entitlements update centrally,
- failed payments do not corrupt access state,
- invoices/payment history are role-scoped,
- subscription changes are audited.

## Journey 12: Content Author Publishes Lesson

Actors:

- Curriculum Author,
- Reviewer,
- Publisher,
- AI Curriculum Agent.

Flow:

```text
Author creates draft
  |
  v
AI assists content generation
  |
  v
Technical review
  |
  v
Pedagogy review
  |
  v
Accessibility review
  |
  v
Publish version
  |
  v
Content becomes available by curriculum rules
```

Required states:

- draft,
- in review,
- changes requested,
- approved,
- published,
- archived.

Acceptance criteria:

- AI content is marked as generated/drafted,
- human review is required,
- content version history is preserved,
- published content maps to skills/competencies.

## Cross-Journey Analytics Events

Every journey should emit meaningful events:

- account_created,
- institution_created,
- class_created,
- learner_enrolled,
- lesson_started,
- lesson_completed,
- project_submitted,
- ai_question_asked,
- ai_response_rated,
- code_execution_completed,
- assessment_submitted,
- subscription_changed.

Events should follow `documentation/04-architecture/learning-event-taxonomy.md`.

## Cross-Journey Acceptance Criteria

- every flow handles loading/empty/error states,
- every sensitive action is authorized,
- tenant isolation is enforced,
- AI actions are logged,
- subscription entitlements are checked,
- learner events update progress,
- user-facing AI is transparent,
- critical failures have recovery paths.
