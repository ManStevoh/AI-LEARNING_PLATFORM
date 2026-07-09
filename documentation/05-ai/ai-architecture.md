# AI Architecture

## AI Principle

AI must function as an educational mentor, not only as a chatbot. The platform should use AI to teach, scaffold, assess, guide, personalize, and support teachers while protecting learners from unsafe, inaccurate, or shortcut-based behavior.

## Core AI Capabilities

### Learner-Facing AI

- concept explanation,
- block coding hints,
- generated-code explanation,
- debugging guidance,
- code review,
- project planning,
- quiz practice,
- daily challenges,
- interview practice,
- roadmap guidance,
- portfolio feedback,
- learning recommendations.

### Teacher-Facing AI

- lesson planning,
- quiz generation,
- marking schemes,
- assignment rubrics,
- code review assistance,
- classroom intervention suggestions,
- slide generation,
- lab generation,
- curriculum mapping,
- report comments.

### Institution-Facing AI

- cohort risk detection,
- progress summaries,
- curriculum coverage reports,
- teacher workload insights,
- school-level analytics,
- recommendation reports.

## AI Gateway

All AI requests should pass through an internal AI Gateway.

Responsibilities:

- provider abstraction,
- model routing,
- prompt selection,
- context assembly,
- RAG retrieval,
- safety checks,
- rate limits,
- cost tracking,
- caching,
- logging,
- redaction,
- evaluation,
- fallback handling,
- tenant-level controls.

Supported providers should include:

- OpenAI,
- Anthropic,
- Google Gemini,
- and future open-weight or privately hosted models.

The product should not expose provider-specific logic throughout the application. Provider SDKs should be isolated behind the gateway.

## Model Routing

The platform should choose models based on task type, learner age, cost, latency, institution policy, privacy needs, and quality requirements.

Example routing:

- simple explanations: lower-cost model,
- advanced code review: stronger reasoning/code model,
- child learner tutoring: stricter safety profile,
- quiz generation: structured-output capable model,
- RAG answer from course content: model with citation and grounding prompt,
- offline/private deployment: local or institution-approved model.

## Retrieval-Augmented Generation

RAG should be used whenever answers need to be grounded in course content, school materials, curriculum standards, documentation, rubrics, or institution policies.

Typical flow:

```text
Upload content
  |
  v
Extract text
  |
  v
Clean and segment content
  |
  v
Chunk content
  |
  v
Create embeddings
  |
  v
Store vectors and metadata
  |
  v
Retrieve relevant chunks
  |
  v
Generate grounded response
  |
  v
Return answer with citations or source references
```

Initial vector store:

- PostgreSQL with pgvector.

Future options:

- Qdrant,
- Weaviate,
- Pinecone,
- OpenSearch,
- or a dedicated retrieval service.

## Prompt Architecture

Prompts should be versioned and testable.

Each prompt should define:

- purpose,
- user role,
- learner age or level,
- input schema,
- output schema,
- safety rules,
- refusal rules,
- teaching style,
- context requirements,
- examples,
- evaluation criteria,
- version history.

## Structured Outputs

Use structured outputs for:

- quizzes,
- rubrics,
- grading feedback,
- learning recommendations,
- lesson plans,
- project requirements,
- skill maps,
- analytics summaries,
- intervention suggestions.

Structured outputs should be validated before being stored or shown.

## AI Safety

Safety requirements:

- age-appropriate responses,
- no harmful content,
- no direct cheating support where learning integrity matters,
- hints before full solutions,
- teacher override and moderation,
- audit logs for sensitive AI actions,
- PII minimization,
- prompt injection defenses for uploaded content,
- source-grounded responses for curriculum questions,
- institution-level model and data controls.

## AI For Coding Education

The AI coding mentor should:

- explain errors,
- ask guiding questions,
- provide debugging steps,
- reference the relevant lesson,
- identify misconceptions,
- encourage tests,
- avoid simply solving graded assignments,
- review code for readability, correctness, security, and maintainability,
- and adapt explanations to the learner's level.

## AI Evaluation

AI features require evaluation before production release.

Evaluation dimensions:

- factual accuracy,
- pedagogical quality,
- code correctness,
- safety,
- bias,
- hallucination risk,
- groundedness,
- latency,
- cost,
- learner usefulness,
- teacher acceptance.

Evaluation datasets should include:

- beginner programming questions,
- Blockly project mistakes,
- JavaScript and Python exercises,
- Laravel/React/Flutter code,
- Kenyan curriculum questions,
- safety prompts,
- prompt injection attempts,
- grading examples.

## Observability

Log AI events with:

- request ID,
- tenant ID,
- user role,
- feature,
- model,
- provider,
- prompt version,
- token usage,
- latency,
- cost estimate,
- retrieval IDs,
- safety result,
- output validation result,
- user feedback.

Do not log sensitive learner data unnecessarily. Use redaction and retention controls.

## Cost Controls

Required controls:

- plan-based AI limits,
- institution quotas,
- per-feature budgets,
- prompt compression,
- response caching,
- retrieval caching,
- cheaper models for simple tasks,
- stronger models only where justified,
- admin cost dashboards.

## AI Architecture Backlog

- Prompt registry specification.
- AI Gateway API contract.
- Model provider adapter interfaces.
- RAG ingestion pipeline.
- AI safety policy.
- AI evaluation benchmark.
- Prompt injection defense playbook.
- AI cost dashboard requirements.
- Institution-level AI settings.
- Offline AI strategy for future desktop/mobile.
