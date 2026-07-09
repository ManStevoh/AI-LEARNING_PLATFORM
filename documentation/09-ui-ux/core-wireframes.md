# Core Wireframe Specifications

## Purpose

This document defines the core product screen layouts before visual design. These are structural wireframes, not final UI designs.

## Global App Shell

Desktop layout:

```text
+-------------------------------------------------------------+
| Top Bar: logo, search, AI, notifications, profile           |
+-------------+-----------------------------------------------+
| Sidebar     | Main Content                                  |
|             |                                               |
| Dashboard   | Page header                                   |
| Learn       | Primary content                               |
| Projects    | Secondary panels                              |
| Practice    |                                               |
| AI Mentor   |                                               |
| Portfolio   |                                               |
+-------------+-----------------------------------------------+
```

Required states:

- loading,
- empty,
- error,
- offline/limited connection,
- subscription limit,
- permission denied.

## Learner Dashboard

Layout:

```text
+-------------------------------------------------------------+
| Welcome + current learning path + next action               |
+----------------------+----------------------+---------------+
| Continue Lesson      | Skill Mastery        | Streak / XP   |
+----------------------+----------------------+---------------+
| Current Projects                                             |
+-------------------------------------------------------------+
| Recommended Practice | AI Mentor Suggestions | Recent Feedback |
+-------------------------------------------------------------+
| Portfolio Progress / Achievements                           |
+-------------------------------------------------------------+
```

Must show:

- next lesson,
- skill mastery,
- due assignments,
- current projects,
- AI mentor entry,
- recent teacher/AI feedback,
- streak/XP,
- recommended review.

## Teacher Dashboard

Layout:

```text
+-------------------------------------------------------------+
| Class selector + quick actions                              |
+----------------------+----------------------+---------------+
| Learners Active      | Assignments Due      | Needs Help    |
+----------------------+----------------------+---------------+
| Class Progress By Skill                                      |
+-------------------------------------------------------------+
| Submission Queue                    | Common Misconceptions |
+-------------------------------------------------------------+
| AI Teacher Tools: lesson planner, quiz, rubric, reports     |
+-------------------------------------------------------------+
```

Must show:

- classes,
- submissions needing review,
- learners needing help,
- weak skills,
- AI teacher tools,
- recent activity.

## Institution Dashboard

Layout:

```text
+-------------------------------------------------------------+
| Institution overview + billing/subscription status          |
+----------------------+----------------------+---------------+
| Active Learners      | Seat Usage           | AI Usage      |
+----------------------+----------------------+---------------+
| Cohort Progress       | Curriculum Coverage                 |
+-------------------------------------------------------------+
| Teacher Engagement    | Reports / Exports                   |
+-------------------------------------------------------------+
```

Must show:

- active learners,
- active teachers,
- seat usage,
- subscription status,
- AI usage,
- curriculum coverage,
- cohort progress,
- exports.

## Block Coding Workspace

Layout:

```text
+-------------------------------------------------------------+
| Project toolbar: run, save, submit, help, AI                |
+-------------+-------------------------------+---------------+
| Toolbox     | Blockly Workspace             | Stage Preview |
|             |                               |               |
| Motion      |                               | Sprites       |
| Looks       |                               | Assets        |
| Events      |                               |               |
| Control     |                               |               |
+-------------+-------------------------------+---------------+
| Generated Code Panel / AI Explanation Panel                 |
+-------------------------------------------------------------+
```

Must support:

- run project,
- save project,
- submit assignment,
- show generated JavaScript,
- AI block explanation,
- project assets,
- teacher instructions.

## Browser IDE Workspace

Layout:

```text
+-------------------------------------------------------------+
| Project toolbar: run, test, submit, AI, settings            |
+-------------+-------------------------------+---------------+
| File Tree   | Monaco Editor                 | Instructions  |
|             |                               | AI Mentor     |
+-------------+-------------------------------+---------------+
| Terminal / Test Results / Feedback                          |
+-------------------------------------------------------------+
```

Must support:

- file navigation,
- code editing,
- tests,
- run output,
- AI debugging,
- submission,
- teacher/AI feedback.

## AI Mentor Panel

Layout:

```text
+-------------------------------------------------------------+
| AI Mentor: current mode + context chips                     |
+-------------------------------------------------------------+
| Conversation                                                |
|                                                             |
+-------------------------------------------------------------+
| Suggested actions: Hint, Explain, Debug, Review, Practice   |
+-------------------------------------------------------------+
| Input                                                       |
+-------------------------------------------------------------+
```

Context chips:

- current lesson,
- current skill,
- project,
- assessment mode,
- allowed help level.

## Lesson Page

Layout:

```text
+-------------------------------------------------------------+
| Lesson title + skill tags + progress                        |
+-------------------------------+-----------------------------+
| Lesson content                | AI mentor / glossary        |
| diagrams, text, examples      |                             |
+-------------------------------+-----------------------------+
| Practice / quiz / lab                                       |
+-------------------------------------------------------------+
| Reflection + next step                                      |
+-------------------------------------------------------------+
```

## Billing Page

Layout:

```text
+-------------------------------------------------------------+
| Current plan + renewal + status                             |
+----------------------+----------------------+---------------+
| Seats                | AI Usage             | Storage       |
+----------------------+----------------------+---------------+
| Invoices / Payments                                          |
+-------------------------------------------------------------+
| Payment method / M-Pesa / Stripe settings                   |
+-------------------------------------------------------------+
```

## Mobile Simplification

Mobile should prioritize:

- continue lesson,
- AI mentor,
- practice,
- progress,
- notifications,
- offline downloads.

Avoid full IDE on small screens except simplified practice tasks.

## Accessibility Requirements

Every screen must support:

- keyboard navigation,
- visible focus,
- screen reader landmarks,
- responsive layout,
- reduced motion,
- meaningful empty states,
- color-independent status.

## Next Design Work

Create Figma prototypes for:

- learner onboarding,
- learner dashboard,
- Level 1 lesson,
- block coding workspace,
- teacher dashboard,
- institution dashboard,
- billing page.
