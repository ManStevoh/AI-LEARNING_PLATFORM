# Browser IDE Specification

## Purpose

This document defines the browser-based IDE for learners moving from block coding and beginner text coding into professional software engineering.

The browser IDE should support:

- lessons,
- code editing,
- file trees,
- code execution,
- tests,
- AI mentoring,
- project submissions,
- Git/portfolio workflows,
- future deployments.

## Target Levels

The browser IDE primarily supports:

- Level 3: Hybrid editing,
- Level 4: Full coding environment with AI mentoring,
- Level 5: Real-world projects.

## Recommended Frontend Foundation

- React,
- Inertia for first web version integration,
- Monaco Editor,
- Tailwind/shadcn-based design system,
- Web Workers for editor/language services where required,
- xterm.js later if a terminal UI is needed.

## Workspace Layout

Recommended desktop layout:

```text
+----------------------------------------------------------+
| Lesson / Project Header                                  |
+------------------+-------------------------+-------------+
| File Explorer    | Monaco Editor           | AI Mentor   |
|                  |                         |             |
+------------------+-------------------------+-------------+
| Console / Tests / Output / Problems / Terminal           |
+----------------------------------------------------------+
```

Mobile layout:

- simplify to tabs,
- avoid forcing full desktop IDE experience,
- prioritize reading, small edits, quiz, and review.

## Core IDE Areas

### File Explorer

Supports:

- files,
- folders,
- create/rename/delete where allowed,
- starter templates,
- hidden test files where protected,
- read-only instructional files.

### Editor

Supports:

- syntax highlighting,
- autocomplete where available,
- formatting,
- diagnostics,
- multiple files,
- read-only regions where needed,
- diff view later.

### Output Panel

Tabs:

- console output,
- test results,
- problems/errors,
- AI explanation,
- submission feedback.

### AI Mentor Panel

Capabilities:

- explain current file,
- explain error,
- suggest debugging steps,
- review submission,
- ask guiding questions,
- link to lesson content,
- respect assessment mode.

## Project Model

A coding project contains:

- project metadata,
- language/runtime,
- file tree,
- starter files,
- learner files,
- hidden tests,
- visible tests,
- assignment instructions,
- rubric,
- execution settings,
- submission history.

## Supported Project Types

Initial:

- JavaScript fundamentals,
- Python fundamentals,
- HTML/CSS/JavaScript,
- Laravel concept labs later,
- API labs later.

Future:

- React/Next.js,
- Laravel full-stack,
- Flutter,
- SQL/database labs,
- Docker/cloud labs,
- AI/data labs.

## Code Execution Flow

```text
Learner clicks Run
  |
  v
Save current files
  |
  v
Create execution request
  |
  v
Queue sandbox job
  |
  v
Run with resource limits
  |
  v
Return output/errors/tests
  |
  v
AI optionally explains result
```

Rules:

- code never runs on app servers,
- execution is tenant/user scoped,
- outputs are size-limited,
- timeouts are enforced,
- malicious patterns are logged.

## Assessment Mode

When assessment mode is active:

- AI cannot give full solution,
- hidden tests remain hidden,
- hints are limited by policy,
- submissions are timestamped,
- plagiarism/originality checks may run later,
- teacher controls feedback release.

## AI Integration

AI context can include:

- current lesson,
- assignment prompt,
- visible files,
- selected code,
- execution error,
- test results,
- learner competency state,
- rubric.

AI must not receive:

- hidden tests unless teacher/admin mode,
- unrelated learner data,
- secrets,
- unnecessary personal data.

## Git And Portfolio Future

Future features:

- connect GitHub,
- export project,
- create repository,
- generate README draft,
- portfolio artifact mapping,
- deployment notes,
- code history/diff.

Rules:

- learner controls external publishing,
- minors require policy review for public sharing,
- AI-generated README must not exaggerate learner work.

## Collaboration Future

Possible later features:

- pair programming,
- teacher live view,
- comments,
- code review,
- group projects.

These require additional privacy and moderation rules.

## Offline Considerations

Future desktop/mobile offline IDE should support:

- local file storage,
- queued runs only where local runtime exists,
- offline reading/editing,
- sync conflict resolution,
- local project snapshots.

Do not assume every execution requires continuous connectivity in future clients.

## Accessibility Requirements

Required:

- keyboard navigation,
- accessible tabs/panels,
- sufficient contrast,
- font size controls,
- screen reader labels,
- reduced motion,
- readable error messages,
- non-color-only diagnostics.

Monaco accessibility settings should be reviewed during implementation.

## Security Requirements

- no secrets in starter files,
- no app-server execution,
- sandbox isolation,
- resource limits,
- output limits,
- file count/size limits,
- upload scanning,
- rate limits,
- audit logs for execution/submission.

## Analytics Events

Events:

- code_project_created,
- code_file_opened,
- code_file_updated,
- code_execution_requested,
- code_execution_completed,
- test_passed,
- test_failed,
- ai_code_review_requested,
- code_submission_created,
- feedback_viewed.

## Acceptance Criteria

- learner can open a starter project,
- file tree and editor load,
- learner can edit and save files,
- learner can run code through sandbox,
- output/test results return clearly,
- AI can explain an error with context,
- assessment mode restricts AI help,
- submission stores project snapshot,
- teacher can review submission.
