# Content Operations

## Purpose

This document defines how curriculum content is created, reviewed, published, localized, versioned, and improved.

The platform's quality will depend as much on content operations as software engineering.

## Content Types

Supported content:

- skills,
- lessons,
- diagrams,
- animations,
- videos,
- labs,
- quizzes,
- debugging challenges,
- projects,
- rubrics,
- teacher guides,
- offline worksheets,
- AI explanation templates,
- localized examples,
- certificates.

## Content Lifecycle

```text
Idea
  |
  v
Draft
  |
  v
Curriculum Review
  |
  v
Technical Review
  |
  v
Pedagogy Review
  |
  v
Accessibility Review
  |
  v
Pilot
  |
  v
Publish
  |
  v
Measure
  |
  v
Improve
```

## Roles

### Curriculum Author

Creates lessons, projects, quizzes, and teacher materials.

### Technical Reviewer

Checks correctness of code, terminology, examples, and project requirements.

### Pedagogy Reviewer

Checks age appropriateness, learning objectives, scaffolding, and assessment quality.

### Accessibility Reviewer

Checks readability, captions, contrast, keyboard use, and alternative formats.

### Publisher

Approves content for release.

## Canonical Content Rule

AI can generate drafts, examples, and variants.

AI must not publish canonical curriculum without human review.

Canonical content must define:

- skill mapping,
- objective,
- prerequisites,
- lesson body,
- practice,
- assessment,
- rubric,
- teacher notes,
- AI behavior guidance.

## Versioning

Every lesson should have:

- version,
- author,
- reviewer,
- publish date,
- changelog,
- compatible skill graph version,
- deprecated state where applicable.

Do not silently change assessment criteria after learners have submitted work.

## Localization

Localization includes:

- language,
- examples,
- cultural context,
- curriculum standards,
- currency/payment references,
- local project themes.

Example contexts:

- Kenyan transport,
- mobile money,
- farming,
- small businesses,
- school clubs,
- community health,
- climate.

Localization must preserve the same learning objective.

## AI-Generated Variants

AI may generate:

- simpler explanation,
- advanced explanation,
- local analogy,
- quiz variation,
- practice variation,
- teacher summary,
- parent summary.

Requirements:

- variant links to canonical skill/objective,
- variant is labeled as AI-generated until reviewed,
- high-use variants should be reviewed and promoted if valuable.

## Quality Checklist

Each lesson must include:

- clear objective,
- target level,
- prerequisites,
- key vocabulary,
- worked example,
- practice,
- debugging activity where applicable,
- assessment,
- reflection,
- teacher guidance,
- accessibility notes,
- skill mapping.

## Content Analytics

Track:

- completion rate,
- quiz performance,
- common wrong answers,
- hint usage,
- AI question themes,
- time spent,
- project completion,
- teacher feedback,
- learner rating.

Use analytics to improve content.

## Content Governance

Establish:

- editorial style guide,
- technical terminology guide,
- code style guide,
- accessibility guide,
- localization guide,
- AI content policy,
- review cadence.

## Definition Of Done

Content is publishable when:

- objective is clear,
- skill mapping exists,
- assessment exists,
- review is complete,
- accessibility needs are considered,
- teacher notes exist,
- AI behavior rules exist,
- analytics events are defined.
