# Learning Genome And Competency Engine

## Purpose

The Learning Genome is the platform's fine-grained model of what a learner can understand, do, explain, debug, create, and apply.

It is more detailed than:

- course completion,
- lesson progress,
- quiz scores,
- badges,
- or certificates.

The Learning Genome models thousands of small competencies and uses evidence from learning activities to update each learner's state.

## Core Idea

A learner is not represented as:

```text
Course completed: 72%
```

The learner is represented as:

```text
Variables: mastered
Loops: practicing
Array indexing: needs review
Function decomposition: near mastery
Debugging syntax errors: mastered
Debugging logic errors: practicing
Explaining trade-offs: introduced
Writing tests: needs review
API authentication: not started
```

This enables more precise teaching, assessment, intervention, and career guidance.

## Evidence Status

Competency-based education, learning analytics, xAPI/Caliper-style events, and machine-readable competency frameworks are supported by existing standards and research.

The specific Learning Genome implementation is a strategic product design. It must be validated through:

- pilot learning outcomes,
- teacher review,
- assessment reliability testing,
- fairness checks,
- learner trust research.

## Relationship To Existing Platform Models

```text
Computing Knowledge Graph
  |
  v
Defines concepts, skills, prerequisites, standards, careers
  |
  v
Learning Genome
  |
  v
Tracks learner competency state across those skills
  |
  v
Learner Digital Twin
  |
  v
Combines competencies with preferences, projects, history, context
```

## Competency Dimensions

The platform should model more than technical facts.

### Conceptual Understanding

Can the learner explain the idea?

Examples:

- define a variable,
- explain a loop,
- describe HTTP request/response,
- explain database normalization.

### Procedural Skill

Can the learner perform the task?

Examples:

- create a route,
- write a function,
- build a form,
- write an SQL query,
- deploy an app.

### Debugging Ability

Can the learner diagnose and fix issues?

Examples:

- syntax error,
- runtime error,
- logic bug,
- dependency issue,
- API error,
- database migration failure.

### Transfer Ability

Can the learner apply knowledge in a new situation?

Examples:

- use loops in a game and in data processing,
- apply authentication concepts across Laravel and Next.js,
- use database relationships in different domains.

### Reasoning And Explanation

Can the learner justify decisions?

Examples:

- choose between array and object,
- explain trade-offs,
- defend an architecture,
- compare approaches.

### Professional Habits

Can the learner work like an engineer?

Examples:

- writes readable code,
- tests edge cases,
- uses version control,
- documents decisions,
- reviews feedback,
- handles errors.

### Collaboration And Communication

Can the learner participate in team work?

Examples:

- explain code to peers,
- write project notes,
- respond to code review,
- collaborate in pair/group tasks.

### Creativity And Product Thinking

Can the learner build original and useful things?

Examples:

- generate project ideas,
- adapt requirements,
- improve UI,
- consider user needs,
- make design trade-offs.

## Competency State Model

Recommended states:

- not started,
- introduced,
- practicing,
- improving,
- near mastery,
- mastered,
- needs review,
- regressed,
- blocked.

The state should be evidence-based, not manually guessed.

## Confidence Model

Each competency state should include confidence.

Example:

```json
{
  "competency": "loops.for.basic",
  "state": "near_mastery",
  "confidence": 0.78,
  "evidence_count": 9,
  "last_evidence_at": "2026-07-09T15:00:00Z"
}
```

Important:

- confidence is a system estimate, not a psychological truth.
- avoid presenting fake precision to learners.
- teacher-facing views can show more detail than learner-facing views.

## Evidence Types

Evidence can come from:

- lesson completion,
- quiz attempt,
- coding exercise,
- block project,
- code execution result,
- debugging challenge,
- project rubric,
- teacher feedback,
- AI review,
- peer review,
- oral explanation,
- portfolio artifact,
- simulation decision,
- interview answer.

Evidence quality should vary by source.

Example:

- completing a lesson is weak evidence,
- passing a quiz is medium evidence,
- solving a new project problem is strong evidence,
- explaining reasoning to a teacher is strong evidence,
- repeated success over time is stronger than one success.

## Evidence Record

Recommended fields:

```text
competency_evidence
  id
  learner_profile_id
  competency_id
  evidence_type
  source_type
  source_id
  score
  max_score
  rubric_level
  confidence_delta
  teacher_verified
  ai_generated
  ai_reviewed
  occurred_at
  metadata
```

## Competency Identifier Design

Use stable identifiers.

Examples:

```text
programming.variables.basic
programming.loops.for.basic
programming.loops.while.basic
programming.arrays.indexing
programming.functions.parameters
web.http.request_response
backend.laravel.routing.basic
backend.laravel.middleware.auth
database.sql.select.basic
security.input_validation.basic
testing.unit.basic
```

Rules:

- IDs should be stable,
- names can change without breaking records,
- competencies should map to prerequisites,
- competencies should map to lessons, projects, assessments, and careers.

## Scoring Principles

The platform should avoid simplistic scoring.

Bad model:

```text
Watched lesson = mastered
```

Better model:

```text
Mastery requires multiple evidence points across explanation, practice, debugging, and transfer.
```

Recommended inputs:

- recency,
- evidence quality,
- difficulty,
- independence,
- number of attempts,
- hint usage,
- teacher verification,
- transfer task success,
- consistency over time.

## Mastery Rules

Example mastery rule:

```text
A learner can be marked near mastery for "for loops" when:
- at least 3 practice tasks are completed,
- at least 1 transfer task is completed,
- quiz accuracy is above threshold,
- hint dependency is low or decreasing,
- no recent critical misconception is present.
```

Final mastery should be confirmed by stronger evidence:

- project usage,
- debugging task,
- teacher review,
- or assessment performance.

## Misconception Tracking

A misconception is a recurring incorrect pattern.

Examples:

- uses assignment instead of comparison,
- places movement block outside event,
- confuses route and controller,
- forgets return statement,
- indexes arrays from 1 in JavaScript/Python,
- stores passwords incorrectly,
- fails to validate user input.

Misconceptions should:

- map to competencies,
- include evidence,
- trigger targeted practice,
- decay or resolve after repeated success.

## Learning Genome Update Flow

```text
Learning event occurs
  |
  v
Map event to competencies
  |
  v
Evaluate evidence quality
  |
  v
Update competency state
  |
  v
Update learner digital twin
  |
  v
Generate recommendations
  |
  v
Notify teacher if needed
```

## AI Role

AI can assist by:

- mapping learner work to competencies,
- identifying misconceptions,
- generating personalized practice,
- summarizing evidence,
- recommending next steps,
- drafting teacher interventions,
- explaining competency progress to learners.

AI must not be the only source for high-stakes competency decisions.

## Teacher Role

Teachers should be able to:

- view competency maps,
- override or confirm competency evidence,
- add qualitative feedback,
- approve certificates,
- flag incorrect AI interpretation,
- assign targeted practice.

## Learner View

Learners should see a simplified version:

- strengths,
- skills in progress,
- recommended next steps,
- projects proving skills,
- review topics,
- career readiness gaps.

Avoid overwhelming learners with hundreds of micro-skills.

## Institution View

Institutions should see aggregate competency data:

- class-level strengths,
- cohort skill gaps,
- curriculum coverage,
- teacher intervention needs,
- assessment reliability,
- certification readiness.

Do not expose unnecessary individual learner details to unauthorized users.

## Certificate Connection

Certificates should be issued from competency evidence.

Example:

```text
Backend Foundations Certificate
Requires:
- HTTP basics mastered
- Laravel routing near mastery/mastered
- CRUD project completed
- database relationships practicing or higher
- input validation mastered
- project reviewed by teacher or approved rubric
```

This makes certification more credible than completion-only certificates.

## Career Connection

The career graph should map roles to required competencies.

Example:

```text
Junior Laravel Developer
  |
  +-- PHP basics
  +-- OOP basics
  +-- Laravel routing
  +-- controllers
  +-- Blade/Inertia
  +-- Eloquent
  +-- validation
  +-- authentication
  +-- APIs
  +-- testing basics
  +-- deployment basics
```

Career readiness is then calculated from demonstrated evidence, not self-reported confidence only.

## Fairness And Safety

Risks:

- unfair labeling,
- overconfidence in AI judgments,
- penalizing learners with poor internet/devices,
- cultural or language bias,
- discouraging learners with low scores,
- treating inferred learning preferences as fixed traits.

Controls:

- use human review for high-stakes outcomes,
- show uncertainty,
- allow correction,
- include context such as device/connectivity,
- audit outcomes across groups,
- avoid punitive language.

## Privacy Controls

The Learning Genome contains sensitive educational data.

Required:

- role-based access,
- tenant isolation,
- retention policies,
- audit logs,
- data export support,
- deletion/anonymization rules,
- child data safeguards,
- consent/legal review.

## Database Concepts

Potential tables:

```text
competencies
competency_relationships
competency_evidence
learner_competency_states
learner_misconceptions
competency_recommendations
competency_certification_requirements
career_competency_requirements
assessment_competency_maps
project_competency_maps
```

## Integration Points

The Learning Genome integrates with:

- knowledge graph,
- learner digital twin,
- learning events,
- assessments,
- projects,
- AI mentor,
- teacher dashboard,
- institution reports,
- certificates,
- career roadmap,
- portfolio builder.

## Validation Metrics

Track:

- teacher agreement with competency state,
- learner understanding of recommendations,
- prediction accuracy for future assessment performance,
- completion improvement from recommendations,
- fairness across age/language/device groups,
- false mastery rate,
- false weakness rate,
- AI mapping accuracy.

## Phase Roadmap

### Phase 1: Manual Competency Map

- define first 100-300 competencies,
- map Level 1 lessons and projects,
- collect basic evidence,
- show teacher dashboard.

### Phase 2: Evidence-Based Updates

- update competency states from quizzes/projects,
- add teacher verification,
- add misconception tracking,
- recommend review practice.

### Phase 3: AI-Assisted Mapping

- AI maps submissions to competencies,
- teacher reviews samples,
- evaluation tests track accuracy.

### Phase 4: Certification And Career Readiness

- competency-based certificates,
- career readiness scoring,
- portfolio evidence mapping.

### Phase 5: Advanced Learning Genome

- transfer ability,
- reasoning evidence,
- simulation outcomes,
- collaboration signals,
- adaptive long-term planning.

## Non-Negotiable Rules

- Do not equate completion with mastery.
- Do not use AI-only judgments for high-stakes certification.
- Do not expose unnecessary learner details.
- Do not present estimates as absolute truth.
- Do not lock learners into fixed labels.
- Always connect recommendations to evidence.
