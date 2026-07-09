# AI Operating System And Agent Architecture

## Purpose

This document defines how the platform evolves from "AI chat" into an AI Education Operating System.

The goal is not to build a thin wrapper around an LLM. The goal is to build a Laravel-powered intelligence layer that combines:

- learner context,
- curriculum knowledge,
- retrieval,
- tools,
- workflows,
- long-term memory,
- learning events,
- safety controls,
- evaluation,
- and specialized agents.

Foundation models provide reasoning and language generation. The platform's advantage comes from the system around the model.

## Evidence Status

The following are factual technology capabilities based on official product documentation:

- Laravel supports services, events, queues, jobs, scheduling, broadcasting, notifications, and HTTP clients.
- OpenAI, Anthropic, and Google Gemini support tool/function calling patterns.
- PostgreSQL with pgvector can store and search embeddings.
- Learning event standards such as xAPI and Caliper support structured learning activity records.

The following are strategic recommendations that require validation:

- the AI Operating System should become a major product differentiator,
- the learner digital twin should improve personalization,
- multi-agent workflows should improve quality over one generic assistant,
- event-driven AI should improve retention and teacher intervention.

These recommendations must be validated through prototypes, AI evaluations, teacher review, and pilot data.

## Core Architecture

```text
Learner / Teacher / Admin
  |
  v
Laravel Application
  |
  +-- Identity, Tenant, Role, Subscription Context
  +-- Curriculum Knowledge Graph
  +-- Learner Digital Twin
  +-- Learning Event Store
  +-- Content And Document Store
  |
  v
AI Kernel
  |
  +-- Context Engine
  +-- Retrieval Engine
  +-- Prompt Engine
  +-- Memory Engine
  +-- Tool Registry
  +-- Workflow Engine
  +-- Agent Orchestrator
  +-- Safety And Evaluation Layer
  |
  v
AI Gateway
  |
  +-- OpenAI
  +-- Anthropic
  +-- Google Gemini
  +-- Future Local/Open-Weight Models
  |
  v
Laravel Services
  |
  +-- Lessons
  +-- Quizzes
  +-- Code Runner
  +-- Progress
  +-- Notifications
  +-- Analytics
  +-- Certificates
```

## AI Kernel

The AI Kernel is the internal platform layer that coordinates context, tools, workflows, agents, and safety.

It should not be a single controller or one chat service. It should be a set of versioned services with clear responsibilities.

Recommended Laravel namespace:

```text
app/
  AI/
    Kernel/
    Gateway/
    Context/
    Prompts/
    Memory/
    Retrieval/
    Tools/
    Agents/
    Workflows/
    Evaluation/
    Safety/
```

If the codebase uses a modular architecture, AI should be a first-class module:

```text
Modules/
  AI/
    app/
      Kernel/
      Gateway/
      Context/
      Prompts/
      Memory/
      Retrieval/
      Tools/
      Agents/
      Workflows/
      Evaluation/
      Safety/
```

## Context Engine

The Context Engine decides what the model is allowed to see.

It should assemble only the minimum useful context for the task.

Inputs:

- authenticated user,
- tenant/institution,
- role and permissions,
- age band,
- current lesson,
- current course/path,
- skill states,
- recent learning events,
- subscription/AI limits,
- current task,
- retrieved curriculum content,
- safety policy.

Example context package:

```json
{
  "learner": {
    "age_band": "teen",
    "preferred_language": "English",
    "career_goal": "backend developer"
  },
  "current_learning_state": {
    "course": "Software Engineering Foundations",
    "lesson": "Loops",
    "completed_skills": ["variables", "functions"],
    "struggling_skills": ["arrays"]
  },
  "response_policy": {
    "mode": "scaffold",
    "do_not_give_full_solution": true,
    "max_words": 500
  }
}
```

Rules:

- Do not send full user records.
- Do not send raw private data unless required.
- Do not send unrelated course content.
- Do not send another learner's data.
- Always include tenant boundaries.

## Prompt Engine

The Prompt Engine converts a task and context package into a model request.

Every production prompt must be versioned.

Prompt metadata:

- prompt ID,
- version,
- owner,
- agent,
- purpose,
- inputs,
- output schema,
- allowed tools,
- safety rules,
- evaluation cases,
- changelog.

Prompt types:

- system prompt,
- developer/platform instruction,
- learner task prompt,
- retrieved context block,
- tool schema,
- output schema,
- safety wrapper.

Example prompt policy:

```text
You are a software engineering tutor.
Teach by asking questions and giving hints before answers.
Use the learner's current lesson and skill state.
If this is an assessed task, do not provide the full solution.
If you are uncertain, say what source is needed.
Return valid JSON matching the requested schema.
```

## Retrieval Engine

The Retrieval Engine grounds responses in platform-owned content.

Retrieval sources:

- lessons,
- teacher notes,
- lab instructions,
- quizzes,
- projects,
- rubrics,
- curriculum standards,
- institution policies,
- documentation,
- code examples,
- FAQ/support content.

Retrieval rules:

- prefer canonical platform content,
- filter by tenant and visibility,
- filter by learner age/level,
- include source IDs in model context,
- store retrieval traces for audit,
- do not retrieve unpublished content for learners.

## Memory Engine

The Memory Engine stores durable learning-relevant facts, not every chat message forever.

Memory examples:

- learner often confuses assignment and comparison,
- learner prefers visual explanations,
- learner is preparing for backend development,
- learner struggles with array indexing,
- learner completed two Laravel projects,
- learner benefits from smaller hints.

Recommended memory fields:

```text
ai_memories
  id
  learner_profile_id
  institution_id
  memory_type
  content
  evidence_event_ids
  embedding
  importance
  confidence
  visibility
  expires_at
  created_at
  updated_at
```

Memory rules:

- memory must be evidence-based,
- sensitive memories require stricter controls,
- learners/teachers should be able to correct important adaptive assumptions,
- memory must support retention/deletion policies,
- do not infer protected characteristics,
- do not present inferred preferences as permanent labels.

## Tool Registry

The Tool Registry exposes safe Laravel capabilities to agents.

The model should not access the database directly. It should request tools, and Laravel should validate permissions, run the action, and return controlled results.

Tool metadata:

```text
tool_id
name
description
input_schema
output_schema
allowed_agents
required_permissions
rate_limit
tenant_scope
side_effect_level
human_approval_required
audit_required
```

Tool side-effect levels:

- read only,
- learner-visible draft,
- writes learner progress,
- writes curriculum draft,
- sends notification,
- creates paid/administrative action.

Tools that affect grades, billing, discipline, or institution records require explicit human approval or strict workflow controls.

## Initial Tools

Recommended first tool set:

- `get_current_lesson`
- `search_curriculum`
- `get_student_progress`
- `get_skill_state`
- `generate_practice_question`
- `generate_quiz_draft`
- `review_code_submission`
- `run_code_in_sandbox`
- `create_flashcards`
- `recommend_next_lesson`
- `create_teacher_intervention_note`
- `summarize_class_progress`

Later tools:

- `generate_course_outline`
- `generate_lab_package`
- `generate_assignment_rubric`
- `create_project_brief`
- `recommend_career_path`
- `prepare_interview_session`
- `create_certificate_recommendation`
- `open_support_ticket`
- `send_parent_report_draft`

## Agent Orchestrator

The Agent Orchestrator routes tasks to specialized agents.

It should decide:

- which agent handles the request,
- which context is needed,
- which tools are allowed,
- whether RAG is required,
- whether human approval is required,
- whether the response needs reviewer/fact-checker pass,
- whether the task should run synchronously or in a queue.

Example routing:

```text
"Explain loops" -> Teacher Agent
"Why is my code failing?" -> Coding Agent
"Create a quiz" -> Assessment Agent
"What should I learn next?" -> Recommendation Agent
"Summarize Section B performance" -> Analytics Agent
"Create a 12-week backend course" -> Curriculum Agent
```

## Specialized Agents

### Teacher Agent

Purpose:

- explain concepts,
- scaffold learning,
- generate analogies,
- ask guiding questions,
- create micro-practice.

Primary tools:

- curriculum search,
- learner skill state,
- flashcard generator,
- practice question generator.

### Coding Agent

Purpose:

- review code,
- explain errors,
- suggest debugging steps,
- identify security/style/performance issues,
- support professional habits.

Primary tools:

- sandbox execution,
- static analysis,
- code submission retrieval,
- rubric retrieval.

### Assessment Agent

Purpose:

- generate quizzes,
- grade drafts where appropriate,
- create rubrics,
- produce feedback,
- protect assessment integrity.

Primary tools:

- quiz bank search,
- rubric generator,
- skill graph,
- anti-cheating policy.

### Career Agent

Purpose:

- map skills to careers,
- recommend projects,
- identify gaps,
- prepare interviews,
- support portfolio readiness.

Primary tools:

- career path graph,
- learner digital twin,
- project repository,
- portfolio evaluator.

### Curriculum Agent

Purpose:

- help authors create curriculum drafts,
- map lessons to skills,
- generate lesson variants,
- check prerequisite coverage.

Primary tools:

- knowledge graph,
- content templates,
- standards mapping,
- review checklist.

Important:

- AI-generated curriculum must remain draft until reviewed by humans.

### Analytics Agent

Purpose:

- summarize cohort progress,
- identify struggling topics,
- suggest teacher interventions,
- explain dashboard trends.

Primary tools:

- learning events,
- dashboard metrics,
- class summaries,
- institution reporting.

## Event-Driven AI

The platform should use Laravel events and queues to trigger AI workflows when learning events occur.

Examples:

```text
assessment_failed
  -> analyze mistakes
  -> generate revision plan
  -> schedule review
  -> notify teacher if repeated
```

```text
lesson_abandoned
  -> check friction signals
  -> recommend easier prerequisite
  -> offer AI explanation
```

```text
code_execution_failed
  -> classify error
  -> retrieve relevant lesson
  -> suggest debugging hint
```

Event-driven AI should start with low-risk recommendations and drafts. Automated actions that affect learners or teachers should be reviewed until reliability is proven.

## Workflow Engine

The Workflow Engine manages multi-step AI jobs.

Example: course draft generation

```text
Input: "Create a 12-week introductory Python course"
  |
  v
Generate course outline
  |
  v
Map skills and prerequisites
  |
  v
Generate lesson drafts
  |
  v
Generate quizzes and labs
  |
  v
Run curriculum review checks
  |
  v
Create author review tasks
```

Workflow requirements:

- durable state,
- retries,
- audit logs,
- human approval steps,
- cost limits,
- cancellation,
- progress tracking,
- versioned outputs.

Laravel queues can support early workflows. A dedicated workflow engine can be evaluated later if workflows become complex.

## AI Content Generation Pipeline

AI can accelerate content production, but it must not bypass editorial governance.

Pipeline:

```text
Topic
  |
  v
AI draft
  |
  v
Pedagogy review
  |
  v
Technical review
  |
  v
Accessibility review
  |
  v
Localization review
  |
  v
Publish
```

Generated content types:

- lesson draft,
- slide outline,
- lab brief,
- quiz draft,
- coding exercise,
- debugging challenge,
- rubric,
- teacher guide,
- flashcards,
- revision summary.

## Self-Critique And Review Agents

For higher-risk outputs, use review passes.

Examples:

- curriculum validator,
- safety reviewer,
- citation checker,
- code reviewer,
- assessment integrity reviewer,
- age-appropriateness reviewer.

Use review agents for:

- child-facing explanations,
- graded assessment feedback,
- curriculum generation,
- code security advice,
- career readiness scores,
- institutional reports.

Review agents reduce risk but do not guarantee correctness. Human review is still required for high-impact outputs.

## Learning Intelligence Layer

The Learning Intelligence Layer analyzes aggregate educational outcomes.

Questions it should answer:

- Which explanations improve completion?
- Which exercises predict future success?
- Where do learners repeatedly struggle?
- Which AI hints are rated helpful?
- Which projects produce stronger portfolios?
- Which skills need better prerequisite coverage?

Rules:

- use anonymized or aggregated data where possible,
- respect privacy and consent,
- avoid unfair profiling,
- validate findings before changing curriculum,
- keep educators in the review loop.

## Laravel Implementation Outline

Suggested classes:

```text
AIKernel
AgentOrchestrator
ContextBuilder
PromptBuilder
RetrievalService
MemoryService
ToolRegistry
ToolExecutor
WorkflowRunner
ProviderRouter
SafetyEvaluator
ResponseEvaluator
CostMeter
```

Suggested interfaces:

```php
interface Agent
{
    public function handle(AgentRequest $request): AgentResponse;
}

interface AiTool
{
    public function definition(): ToolDefinition;

    public function execute(ToolCall $call, ToolContext $context): ToolResult;
}

interface AiProvider
{
    public function complete(AiRequest $request): AiResponse;
}
```

Suggested tables:

```text
ai_requests
ai_responses
ai_tool_calls
ai_prompt_versions
ai_agent_runs
ai_workflows
ai_workflow_steps
ai_memories
ai_retrieval_chunks
ai_evaluations
ai_usage_meters
```

## API Endpoints

Initial API endpoints:

```text
POST /api/ai/mentor/messages
POST /api/ai/code/review
POST /api/ai/quiz/draft
POST /api/ai/curriculum/search
POST /api/ai/tools/run
GET  /api/ai/usage
GET  /api/ai/agent-runs/{id}
```

Important:

- public clients should not call arbitrary tools,
- tool execution must be server-side,
- every endpoint must enforce tenant, role, age, subscription, and rate-limit policies.

## Observability

Track:

- model used,
- prompt version,
- token usage,
- latency,
- cost,
- tool calls,
- retrieval sources,
- safety blocks,
- user rating,
- teacher override,
- hallucination reports,
- fallback rate.

Do not log sensitive raw data unnecessarily.

## Evaluation

AI features should not be shipped only because they appear to work in demos.

Evaluation types:

- factual correctness,
- curriculum grounding,
- age appropriateness,
- answer helpfulness,
- scaffold-before-solution behavior,
- code review accuracy,
- quiz quality,
- rubric consistency,
- safety policy compliance,
- cost per successful learning session.

Minimum launch rule:

- every production agent must have test prompts,
- every high-risk agent must have human-reviewed examples,
- every prompt change must be versioned.

## Security And Privacy Controls

Required controls:

- no direct provider calls outside AI Gateway,
- tenant-scoped retrieval,
- permission-checked tool execution,
- prompt injection defenses,
- PII redaction where possible,
- audit logs for tool calls,
- rate limits and abuse controls,
- human approval for high-impact actions,
- retention rules for prompts/responses,
- provider/subprocessor registry.

## Phase Roadmap

### Phase 1: AI Service Foundation

- provider adapter,
- AI Gateway,
- prompt builder,
- context builder,
- usage logging,
- simple mentor chat.

### Phase 2: RAG And Personalization

- content ingestion,
- vector search,
- learner context,
- memory service,
- citations/source tracing.

### Phase 3: Tool Calling

- tool registry,
- safe read tools,
- progress lookup,
- curriculum search,
- quiz draft generation,
- code review tool.

### Phase 4: Agent Orchestration

- Teacher Agent,
- Coding Agent,
- Assessment Agent,
- Career Agent,
- routing rules,
- evaluator pass.

### Phase 5: Event-Driven AI

- learning event triggers,
- revision plan workflows,
- teacher intervention suggestions,
- proactive recommendations.

### Phase 6: Learning Intelligence

- aggregate analysis,
- curriculum improvement recommendations,
- cohort-level insights,
- AI prompt and lesson optimization.

## Non-Negotiable Rules

- AI must teach, not simply give answers.
- AI tools must be permission-checked.
- AI-generated curriculum must be reviewed before publishing.
- AI must be grounded in platform content for curriculum-specific answers.
- AI must not execute untrusted code on the application server.
- AI memory must be privacy-aware and correctable.
- High-stakes decisions require human oversight.
- Cost must be measured per tenant, learner, feature, and model.
