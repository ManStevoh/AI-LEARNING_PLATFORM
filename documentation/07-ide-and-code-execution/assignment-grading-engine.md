# Assignment Grading Engine

## Purpose

This document defines how coding assignments, projects, and practical assessments are graded.

The grading engine should combine automated tests, rubrics, AI-assisted feedback, and teacher review.

## Grading Inputs

- submitted files,
- execution output,
- visible test results,
- hidden test results,
- rubric,
- learner reflection,
- AI code review,
- teacher feedback.

## Grading Flow

```text
Submission created
  |
  v
Snapshot files
  |
  v
Run automated tests
  |
  v
Run static checks where configured
  |
  v
AI drafts feedback
  |
  v
Map findings to rubric/competencies
  |
  v
Teacher reviews if required
  |
  v
Release feedback
```

## Grading Modes

- practice feedback,
- formative assessment,
- summative assessment,
- certificate assessment.

Human review requirements increase with stakes.

## Automated Tests

Support:

- visible tests,
- hidden tests,
- unit tests,
- integration tests later,
- output comparison for beginner tasks.

Rules:

- hidden tests must not be exposed,
- tests must be versioned,
- test failures should be readable.

## AI Feedback

AI can review:

- readability,
- bugs,
- security basics,
- performance basics,
- architecture basics,
- missing tests,
- documentation.

AI feedback must:

- be labeled,
- avoid hidden solution leakage,
- map to rubric where possible,
- be reviewable by teacher.

## Rubric Scoring

Each rubric item should include:

- criteria,
- points/level,
- competency IDs,
- evidence source,
- feedback.

## Acceptance Criteria

- submissions are snapshotted,
- tests run in sandbox,
- rubric is versioned,
- AI feedback is auditable,
- teacher can override,
- learner sees clear next steps,
- competency evidence is updated after approval/rules.
