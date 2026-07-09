# Teacher Dashboard UX Specification

## Purpose

This document defines the teacher dashboard experience for class management, assignment, progress monitoring, AI assistance, and intervention.

## Teacher Goals

- see which learners need help,
- assign lessons/projects,
- review submissions,
- use AI to save preparation time,
- report progress to institution/parents.

## Dashboard Sections

- class selector,
- active assignments,
- learners needing support,
- competency gaps,
- recent submissions,
- AI recommendations,
- upcoming reviews,
- quick actions.

## Key Flows

### Assign Lesson

```text
Select class
  |
  v
Choose lesson/project
  |
  v
Set due date/options
  |
  v
Preview learner view
  |
  v
Assign
```

### Review Submission

```text
Open submissions
  |
  v
Filter by status
  |
  v
View learner work
  |
  v
Review AI feedback draft
  |
  v
Score rubric
  |
  v
Release feedback
```

### AI Lesson Support

Teacher can:

- generate quiz draft,
- generate assignment draft,
- summarize class progress,
- draft intervention notes,
- create review practice.

AI outputs must be drafts until teacher approval.

## Required States

- no classes assigned,
- no learners,
- no submissions,
- AI disabled by institution,
- import pending,
- report loading,
- learner at risk.

## Acceptance Criteria

- teacher can understand class health quickly,
- learner details are scoped to assigned classes,
- AI drafts are clearly labeled,
- assignment and review flows are accessible,
- dashboard supports bulk actions safely.
