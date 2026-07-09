# Product Requirements Document

## Status

Version: 0.1

This is the foundation PRD. It defines the product scope, modules, users, high-level requirements, and requirement-writing standard. Each major module should later receive a deeper module-specific PRD.

## Product Name

Working name: AI Learning Platform.

## Product Type

AI-powered computing education operating system for learners, teachers, institutions, parents, administrators, and career pathways.

## Product Goals

The platform must:

- teach computing from beginner to advanced professional level,
- support block coding, generated code, hybrid coding, full IDE coding, and real-world projects,
- provide AI mentorship,
- support schools and institutions,
- track skills through a computing knowledge graph,
- maintain learner digital twins,
- support teacher workflows,
- support subscriptions and institutional seats,
- support future mobile, desktop, offline, and WhatsApp channels,
- be secure, accessible, scalable, and globally credible.

## Primary User Roles

### Learner

Can:

- enroll in learning paths,
- complete lessons,
- build block projects,
- write code,
- ask AI mentor questions,
- complete quizzes,
- submit assignments,
- receive feedback,
- build portfolio,
- earn badges/certificates,
- view progress and skill mastery.

### Teacher

Can:

- create/manage classes,
- invite/import learners,
- assign lessons and projects,
- create quizzes,
- review submissions,
- use AI lesson planner,
- use AI grading assistant,
- view learner mastery,
- identify struggling learners,
- generate reports,
- communicate with parents where allowed.

### Institution Administrator

Can:

- manage institution profile,
- manage campuses/classes/cohorts,
- manage teachers,
- manage learner seats,
- view analytics,
- manage subscription,
- export reports,
- configure curriculum/country settings,
- manage institution policies.

### Parent Or Guardian

Can:

- view child progress,
- receive reports,
- manage family subscription where applicable,
- approve/monitor child account where required.

### Platform Administrator

Can:

- manage users,
- manage institutions,
- manage content,
- manage AI settings,
- review abuse/safety reports,
- manage subscriptions,
- manage platform configuration,
- view operational analytics.

### Curriculum Author

Can:

- create skills,
- create lessons,
- map content to skills,
- create assessments,
- create rubrics,
- review AI-generated content,
- publish curriculum versions.

## Product Modules

### Identity And Access

Requirements:

- support email/password login,
- support secure sessions,
- support API tokens for future clients,
- support roles and permissions,
- support institution-scoped membership,
- support password reset,
- support MFA for privileged users,
- support social login where enabled.

### Institution Management

Requirements:

- create institution accounts,
- manage institution profile,
- create campuses/classes/cohorts,
- invite/import teachers,
- invite/import learners,
- manage learner seats,
- view institution dashboards,
- export institution reports.

### Learning Paths

Requirements:

- define learning paths by goal/role,
- map paths to skills,
- support prerequisites,
- support adaptive recommendations,
- support progress tracking.

### Curriculum Knowledge Graph

Requirements:

- define domains, concepts, skills, competencies, standards, resources, assessments, projects, and career paths,
- define prerequisite relationships,
- map content and assessments to skills,
- support curriculum versioning,
- support localization.

### Lessons

Requirements:

- support text, images, diagrams, videos, animations, code snippets, quizzes, labs, and teacher notes,
- support age/level variants,
- support AI-generated explanation variants from canonical objectives,
- support offline-friendly versions later,
- track completion and mastery evidence.

### Block Coding

Requirements:

- provide Blockly workspace,
- provide custom blocks,
- provide project save/load,
- provide stage preview,
- provide generated code view,
- provide AI block explanation,
- support teacher assignments,
- support project submission.

### Browser IDE

Requirements:

- provide Monaco editor,
- provide file tree,
- provide instructions,
- provide run/test output,
- provide AI mentor,
- support submissions,
- support code review feedback,
- integrate with sandbox execution.

### Code Execution

Requirements:

- execute untrusted code outside application servers,
- enforce time/memory/CPU/network limits,
- return output and test results,
- store logs/artifacts,
- support teacher and AI feedback.

### AI Mentor

Requirements:

- answer based on learner context,
- provide hints before full solutions,
- explain concepts,
- debug code,
- review code,
- generate practice,
- respect assessment integrity,
- log usage and cost,
- support multiple providers through AI Gateway.

### Assessments

Requirements:

- support quizzes,
- support coding tasks,
- support debugging tasks,
- support projects,
- support rubrics,
- support AI-assisted grading,
- support teacher moderation,
- map results to skills.

### Learner Digital Twin

Requirements:

- track skill states,
- track evidence,
- track misconceptions,
- track preferences,
- track projects,
- track portfolio,
- support recommendations,
- provide teacher-visible explanations for important flags.

### Portfolio

Requirements:

- collect approved projects,
- generate project summaries,
- support GitHub-ready README guidance,
- show skills demonstrated,
- support certificates/badges,
- support career readiness reports.

### Gamification

Requirements:

- support XP,
- badges,
- streaks,
- levels,
- quests,
- achievements,
- optional leaderboards,
- rewards tied to learning quality.

### Subscriptions And Billing

Requirements:

- support individual, family, teacher, institution, and enterprise plans,
- support learner seats,
- support AI quotas,
- support invoices,
- support M-Pesa,
- support Stripe later,
- support manual institution billing.

### Analytics

Requirements:

- learner progress,
- skill mastery,
- weak concepts,
- class reports,
- institution dashboards,
- AI usage,
- subscription usage,
- completion and retention.

### Notifications

Requirements:

- support email,
- in-app notifications,
- future SMS/WhatsApp,
- parent summaries,
- teacher alerts,
- assignment reminders.

## Non-Functional Requirements

### Security

- follow OWASP ASVS Level 2 target for sensitive production areas,
- enforce tenant isolation,
- secure uploads,
- audit privileged actions,
- protect child data,
- isolate code execution.

### Accessibility

- target WCAG 2.2 AA,
- support keyboard navigation,
- visible focus states,
- accessible forms,
- accessible dashboards,
- reduced motion.

### Performance

- dashboard pages should load quickly with paginated/optimized queries,
- AI and heavy work should run asynchronously where needed,
- code execution should report status clearly.

### Reliability

- critical operations must be transactional,
- background jobs must be retryable,
- failed jobs must be observable,
- payments and sync must use idempotency.

### Scalability

- support modular monolith first,
- use queues for heavy tasks,
- support horizontal scaling,
- keep future service extraction possible.

### Maintainability

- organize code by modules,
- use tests,
- document APIs,
- avoid provider lock-in,
- record architecture decisions.

## Requirement Format

Every detailed requirement should use:

```text
ID:
Title:
User/Role:
Priority:
Description:
Acceptance Criteria:
Dependencies:
Security/Privacy Notes:
Analytics Events:
Status:
```

Example:

```text
ID: LEARNER-AI-001
Title: Ask AI Mentor For Lesson Help
User/Role: Learner
Priority: High
Description: Learner can ask the AI Mentor a question while inside a lesson.
Acceptance Criteria:
- AI receives current lesson ID, skill ID, and allowed context.
- AI response uses hint-first behavior during graded work.
- AI response is logged with model, cost, prompt version, and safety result.
- Learner can rate whether response helped.
Dependencies: AI Gateway, Learner Digital Twin, Lesson module.
Security/Privacy Notes: Do not expose other learners' data.
Analytics Events: ai_mentor_question_asked, ai_mentor_response_rated.
Status: Draft
```

## Release Scope Guidance

### First Build Scope

Must include:

- authentication,
- institution accounts,
- teacher/learner accounts,
- basic learning path,
- Level 1 block coding,
- basic AI mentor,
- skill mapping,
- teacher dashboard,
- subscription foundation.

### Later Scope

Add:

- full IDE,
- code execution,
- AI grading,
- mobile app,
- desktop app,
- offline sync,
- WhatsApp learning,
- advanced career tracks,
- enterprise integrations.
