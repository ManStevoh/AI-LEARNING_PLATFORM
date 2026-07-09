# Computing Knowledge Graph

## Purpose

The platform should not treat curriculum as a flat collection of courses. It should treat computing education as a structured knowledge graph of concepts, skills, competencies, resources, assessments, projects, careers, and learner evidence.

This allows the platform to answer questions such as:

- What should this learner learn next?
- Which prerequisite is missing?
- Which skills does this project demonstrate?
- Which assessments prove mastery?
- Which career pathways match this learner's strengths?
- Which teacher intervention is most useful?
- Which curriculum standards are covered?
- Which local Kenya examples can teach the same concept?

## Core Thesis

Courses are delivery formats. Skills are the durable learning architecture.

Instead of:

```text
50 courses
```

The platform should model:

```text
Thousands of interconnected skills, concepts, competencies, lessons, labs, projects, assessments, and career outcomes.
```

Every learning object should map to the graph.

## Research And Standards Anchors

Use these as references:

- 1EdTech CASE for exchanging competencies, academic standards, and learning outcomes.
- xAPI for learning experience event statements.
- 1EdTech Caliper Analytics for structured learning activity events.
- IEEE 2881 Learning Metadata Terms for learning resources and events.
- Rich Skill Descriptors and CTDL-ASN for machine-readable skills and workforce alignment.
- K-12 CS Framework and CSTA standards for computing domains.
- CS2023 for advanced computer science knowledge areas.
- Kenya CBC and TVET/CBET frameworks for local alignment.

## Graph Entity Types

### Domain

Large knowledge areas.

Examples:

- Computational Thinking,
- Programming,
- Databases,
- Web Development,
- Mobile Development,
- AI,
- Cybersecurity,
- Cloud,
- Robotics,
- Software Engineering,
- Career Readiness.

### Concept

A conceptual unit.

Examples:

- loop,
- variable,
- condition,
- function,
- API,
- authentication,
- database relationship,
- component state,
- recursion,
- deployment.

### Skill

A demonstrable ability.

Examples:

- "Use a loop to repeat sprite movement."
- "Write a function with parameters."
- "Create a Laravel route and controller."
- "Design a relational database table with a foreign key."
- "Debug an undefined variable error."
- "Explain how an API request works."

### Competency

A broader outcome made of multiple skills.

Examples:

- Build an interactive block coding game.
- Build a responsive web page.
- Create a REST API.
- Deploy a full-stack application.
- Review code for correctness and maintainability.

### Learning Resource

Any instructional object.

Examples:

- lesson,
- video,
- diagram,
- animation,
- lab,
- reading,
- teacher guide,
- offline worksheet,
- AI explanation template.

### Assessment

Any proof activity.

Examples:

- quiz,
- coding task,
- debugging challenge,
- project rubric,
- oral explanation,
- AI interview,
- code review task.

### Project

A larger artifact that demonstrates skills.

Examples:

- maze game,
- calculator,
- portfolio website,
- Laravel CRUD app,
- Flutter app,
- AI chatbot,
- cloud deployment,
- capstone SaaS.

### Career

Target role or pathway.

Examples:

- Frontend Developer,
- Backend Developer,
- Full-Stack Developer,
- Mobile Developer,
- AI Engineer,
- Data Analyst,
- Cybersecurity Analyst,
- Cloud Engineer,
- Robotics/IoT Developer,
- Software Engineering Instructor.

### Standard

External curriculum or competency framework.

Examples:

- Kenya CBC competency,
- TVET qualification element,
- K-12 CS standard,
- CSTA standard,
- CS2023 knowledge area,
- employer skill requirement.

## Graph Relationship Types

Required relationships:

- `requires`: Skill A requires Skill B.
- `supports`: Resource supports Skill A.
- `assesses`: Assessment assesses Skill A.
- `demonstrates`: Project demonstrates Skill A.
- `belongs_to`: Skill belongs to Concept/Domain.
- `equivalent_to`: Skill aligns with external standard.
- `part_of`: Skill is part of Competency.
- `precedes`: Skill should usually be learned before another.
- `remediates`: Resource helps with a misconception.
- `extends`: Advanced skill extends beginner skill.
- `career_relevant_to`: Skill is relevant to a career.
- `localized_by`: Example localizes a concept to a region/context.

## Example Graph Slice

```text
Programming
  |
  v
Loops
  |
  +-- requires: sequence
  +-- supports: "Repeat movement block lesson"
  +-- supports: "JavaScript for loop lesson"
  +-- assesses: "Predict loop output quiz"
  +-- assesses: "Buggy loop challenge"
  +-- demonstrates: "Maze patrol game"
  +-- extends: nested loops
  +-- career_relevant_to: Software Engineer
```

## Skill Descriptor Model

Each skill should include:

- ID,
- name,
- short description,
- skill statement,
- domain,
- concept,
- level,
- difficulty,
- prerequisites,
- related skills,
- observable evidence,
- assessment methods,
- mastery criteria,
- misconceptions,
- remediation resources,
- curriculum alignments,
- career alignments,
- local examples,
- AI teaching guidance.

Example:

```text
Skill ID: programming.loops.repeat-basic
Name: Use a repeat loop
Statement: Learner can use a repeat loop to run a sequence of instructions a fixed number of times.
Prerequisites: sequence, event trigger
Evidence: block project, output prediction, debugging challenge
Mastery: uses loop correctly in two different contexts and explains why repetition is needed
Misconceptions: loop body not connected, wrong repeat count, infinite loop confusion
Local examples: traffic lights, matatu route stops, farm watering schedule
```

## Learning Object Mapping

Every lesson should map to:

- primary skills,
- secondary skills,
- prerequisites,
- misconceptions addressed,
- assessments,
- project outputs,
- curriculum standards,
- AI prompt behavior,
- difficulty level,
- age/grade suitability,
- localization options,
- offline suitability.

Every project should map to:

- skills demonstrated,
- rubric criteria,
- career relevance,
- portfolio value,
- teacher review requirements,
- AI review rules.

Every AI interaction should map to:

- current skill,
- learner state,
- lesson context,
- allowed assistance level,
- evidence generated,
- follow-up recommendations.

## Knowledge Graph And AI

The AI Gateway should use the graph to:

- select relevant prerequisite explanations,
- avoid teaching concepts out of order,
- personalize examples,
- recommend remediation,
- generate skill-aligned practice,
- explain why a learner is blocked,
- prevent AI from giving a full solution when a hint is pedagogically better,
- generate teacher reports tied to skills,
- update the learner digital twin.

## Curriculum Intelligence Engine

Responsibilities:

- maintain skill graph,
- map lessons to skills,
- map assessments to skills,
- track prerequisites,
- detect missing prerequisite knowledge,
- support curriculum alignment,
- recommend next learning objectives,
- support country-specific curriculum views.

## Learning Intelligence Engine

Responsibilities:

- estimate learner mastery,
- track misconceptions,
- recommend review,
- personalize explanation style,
- adjust pacing,
- detect frustration or repeated failure patterns,
- recommend intervention.

## Career Intelligence Engine

Responsibilities:

- map skills to careers,
- infer learner strengths,
- recommend career paths,
- recommend portfolio projects,
- map skills to local employer needs,
- support certificates and readiness reports.

## Assessment Intelligence Engine

Responsibilities:

- generate skill-aligned assessments,
- adapt difficulty,
- diagnose misconceptions,
- grade with rubrics,
- produce feedback,
- recommend remediation,
- detect over-helping or cheating risk.

## Mentor Intelligence Engine

Responsibilities:

- tutor,
- coach,
- review,
- motivate,
- provide hints,
- explain errors,
- suggest next steps,
- adapt tone to learner age and level.

## Storage Strategy

Initial implementation can store graph data in PostgreSQL:

- `skills`,
- `concepts`,
- `domains`,
- `competencies`,
- `skill_relationships`,
- `learning_resources`,
- `resource_skill_mappings`,
- `assessments`,
- `assessment_skill_mappings`,
- `projects`,
- `project_skill_mappings`,
- `career_paths`,
- `career_skill_mappings`,
- `curriculum_standards`,
- `standard_skill_mappings`.

Use PostgreSQL recursive queries and graph-like relationship tables first.

Future options:

- dedicated graph database if graph traversal complexity grows,
- semantic/RDF layer for standards interoperability,
- vector search for semantic discovery,
- Graph-RAG for AI reasoning over skills and resources.

## API Requirements

The platform should eventually expose APIs for:

- list skills,
- get skill details,
- get prerequisites,
- get recommended next skills,
- map resource to skills,
- map assessment to skills,
- get learner skill state,
- update mastery evidence,
- get career pathway requirements,
- import/export competency frameworks.

## Authoring Requirements

Curriculum authors need tools to:

- create skills,
- define prerequisites,
- attach lessons,
- attach assessments,
- define misconceptions,
- align to standards,
- preview learner paths,
- detect orphan skills,
- detect circular prerequisites,
- detect missing assessments,
- review AI-generated variants.

## Quality Rules

- No lesson should exist without skill mapping.
- No skill should claim mastery without evidence criteria.
- No assessment should exist without assessed skills.
- No career pathway should exist without required skills.
- AI-generated content must inherit canonical skill objectives.
- Localized lesson variants must preserve the same learning objective.
- The graph must be versioned because curriculum changes over time.

## Immediate Build Recommendations

Start with:

1. Define the top-level computing domains.
2. Define the first 300-500 foundational skills.
3. Build a skills/prerequisite data model in PostgreSQL.
4. Map Level 1 block coding lessons to the graph.
5. Add learner skill mastery records.
6. Add AI tutor context from current skill and prerequisites.
7. Add teacher dashboard by skill mastery, not only lesson completion.

Do not attempt to author 12,000 skills manually on day one. Build the graph gradually, validate it through real courses, and use AI to assist authors while humans approve canonical objectives.
