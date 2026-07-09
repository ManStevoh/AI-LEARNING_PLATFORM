# Learner Digital Twin

## Purpose

The learner digital twin is a living learning profile that helps the platform personalize instruction, assessment, review, career guidance, AI mentoring, and teacher intervention.

It is not just a gradebook. It is a structured model of each learner's skills, evidence, progress, misconceptions, learning preferences, projects, confidence indicators, and career readiness.

## Principle

The learner digital twin must be useful, transparent, privacy-aware, and controllable.

The platform should not create a mysterious black-box profile that learners and teachers cannot understand. Where appropriate, learners and teachers should be able to see why the platform recommends a skill, review, project, or career path.

## What The Digital Twin Tracks

### Identity Context

- learner ID,
- age band,
- institution,
- class/cohort,
- country/curriculum context,
- language preferences,
- accessibility needs,
- device/connectivity constraints.

### Skill State

For each skill:

- not started,
- introduced,
- practicing,
- near mastery,
- mastered,
- needs review,
- regressed,
- blocked.

### Evidence

Evidence can include:

- lesson completion,
- quiz attempts,
- code submissions,
- block projects,
- debugging exercises,
- project rubrics,
- oral explanations,
- teacher feedback,
- AI review,
- peer collaboration,
- portfolio artifacts.

### Misconceptions

Track recurring mistakes:

- loop off-by-one errors,
- variable naming confusion,
- block disconnected from event,
- confusing assignment and comparison,
- missing return statement,
- route/controller mismatch,
- database relationship misunderstanding,
- authentication flow confusion.

### Learning Preferences

The platform may infer and allow user correction for:

- prefers visual explanation,
- prefers code examples,
- prefers analogies,
- prefers step-by-step hints,
- prefers challenge-first learning,
- needs slower pacing,
- benefits from review before new concepts.

These should be treated as adaptive hints, not fixed labels.

### Confidence And Friction Signals

Estimate carefully from:

- repeated failures,
- long inactivity during tasks,
- frequent hint requests,
- abandoned labs,
- fast confident completions,
- self-reported confidence,
- teacher observations.

The system must avoid overclaiming emotional states. Use language such as "may need support" instead of pretending to know exactly how a learner feels.

### Project And Portfolio State

Track:

- projects completed,
- projects in progress,
- skills demonstrated,
- portfolio readiness,
- GitHub readiness,
- deployment readiness,
- README quality,
- code quality,
- tests,
- teacher approvals.

### Career Readiness

Track:

- career interests,
- inferred strengths,
- role fit signals,
- required skills missing,
- interview readiness,
- portfolio gaps,
- certification readiness,
- employer-aligned skills.

## Digital Twin Data Model

Initial tables or domain models:

- `learner_profiles`,
- `learner_skill_states`,
- `learner_skill_evidence`,
- `learner_misconceptions`,
- `learner_learning_preferences`,
- `learner_project_profiles`,
- `learner_portfolio_items`,
- `learner_career_signals`,
- `learner_recommendations`,
- `learner_ai_memory_summaries`,
- `learner_intervention_flags`.

## Skill State Model

Each learner-skill record should include:

- learner ID,
- skill ID,
- state,
- confidence score,
- mastery score,
- last practiced date,
- evidence count,
- strongest evidence type,
- latest evidence ID,
- next recommended action,
- review due date,
- teacher override,
- AI explanation summary.

## Evidence Model

Each evidence record should include:

- learner ID,
- skill ID,
- activity type,
- activity ID,
- score or rubric result,
- qualitative feedback,
- AI feedback ID,
- teacher feedback ID,
- timestamp,
- confidence contribution,
- mastery contribution.

## Recommendation Model

Recommendations should include:

- target learner,
- recommendation type,
- recommended skill/resource/project,
- reason,
- confidence,
- priority,
- expiry,
- source engine,
- teacher visibility,
- learner-facing explanation.

Example:

```text
Recommendation: Review loops before recursion
Reason: Learner missed 3 loop tracing questions and requested hints in two loop labs.
Next action: Complete "Loop Tracing Practice 2" before starting recursion.
```

## AI Mentor Use

The AI mentor should use the digital twin to:

- know current skill,
- know prerequisites,
- adapt explanation,
- provide hints before answers,
- revisit weak concepts,
- recommend practice,
- personalize analogies,
- update summaries after sessions,
- inform teacher dashboards.

Example:

```text
Learner asks: I don't understand recursion.

AI context:
- recursion current skill,
- loops are weak,
- learner prefers analogies,
- learner completed maze game using loops,
- learner is age 13.

AI response strategy:
- compare recursion to repeated steps first,
- revisit loop mental model,
- use a simple analogy,
- avoid advanced stack-frame explanation until later.
```

## Teacher Use

Teachers should see:

- class mastery by skill,
- learners needing support,
- common misconceptions,
- recommended small groups,
- suggested interventions,
- project progress,
- evidence behind AI recommendations.

Teachers should be able to:

- override recommendations,
- add observations,
- approve portfolio items,
- adjust learner level,
- assign remediation,
- mark a concept as taught offline.

## Institution Use

Institutions should see aggregated insights:

- curriculum coverage,
- skills mastered,
- weak domains,
- cohort progress,
- teacher engagement,
- completion rates,
- AI usage impact,
- intervention effectiveness.

Institution views must avoid exposing unnecessary sensitive individual learner details unless role and policy allow it.

## Career Guidance Use

The digital twin should support:

- role recommendations,
- project recommendations,
- skill gap analysis,
- portfolio gap analysis,
- interview practice suggestions,
- certificate readiness,
- employer-aligned reports.

Example:

```text
Signal: Learner completes backend/database projects strongly.
Suggestion: Backend Developer or Platform Engineering path.
Next portfolio project: Inventory API with authentication, tests, and deployment.
```

## Privacy And Safety Requirements

The learner digital twin is sensitive.

Requirements:

- data minimization,
- clear privacy notice,
- parental/guardian controls where needed,
- institution data agreements,
- learner access where appropriate,
- teacher access controls,
- deletion/export workflows,
- retention policy,
- audit logs,
- explainable recommendations,
- no hidden high-stakes decisions without human oversight.

Do not use the digital twin to make employment, disciplinary, or high-stakes educational decisions without appropriate human review and policy controls.

## Events That Update The Digital Twin

Examples:

- `LessonCompleted`,
- `QuizAttempted`,
- `SkillPracticed`,
- `ProjectSubmitted`,
- `CodeReviewed`,
- `BugFixed`,
- `HintRequested`,
- `AssessmentPassed`,
- `AssessmentFailed`,
- `TeacherFeedbackAdded`,
- `PortfolioItemApproved`,
- `CareerGoalUpdated`,
- `OfflineProgressSynced`.

## Learning Analytics Standards

Consider compatibility with:

- xAPI for learning experience statements,
- 1EdTech Caliper Analytics for structured learning activity data,
- 1EdTech CASE for competency/standards alignment.

The platform does not need full certification on day one, but the internal event model should be designed so future interoperability is possible.

## AI Memory Strategy

Do not store every raw AI conversation permanently as the main memory.

Use layers:

1. Short-term context: current session.
2. Recent learning context: recent lessons, attempts, mistakes.
3. Durable summaries: skill state, misconceptions, preferences, projects.
4. Audit logs: retained according to policy.

This reduces privacy risk, cost, and hallucination risk.

## Quality Rules

- Every recommendation must have a reason.
- Every mastery claim must have evidence.
- Every AI-personalized response must be grounded in allowed learner context.
- Teachers should be able to inspect important recommendations.
- Learners should not be trapped by a wrong model; allow correction and retesting.
- Sensitive learner signals must have retention and access rules.

## Immediate Build Recommendations

Start with a simple version:

1. Track learner skill states.
2. Track evidence from quizzes, projects, labs, and teacher feedback.
3. Track common misconceptions.
4. Use the digital twin only for low-stakes recommendations.
5. Show teachers why a learner is flagged.
6. Add AI personalization gradually.

Avoid overbuilding predictive AI before enough real learner data exists.
