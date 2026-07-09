# AI Gateway Implementation Spec

## Purpose

This document defines the implementation design for the AI Gateway.

The AI Gateway is the only approved path for model calls, embeddings, AI tool execution, prompt rendering, safety checks, usage logging, model routing, and provider abstraction.

## Non-Negotiable Rule

No application module should call OpenAI, Anthropic, Gemini, or any AI provider directly.

All AI requests must pass through:

```text
Application Feature
  |
  v
AI Kernel / Agent Orchestrator
  |
  v
AI Gateway
  |
  v
Provider Adapter
```

## Responsibilities

The AI Gateway must handle:

- provider abstraction,
- model routing,
- prompt rendering,
- context packaging,
- structured output schemas,
- tool definition normalization,
- tool-call response parsing,
- safety checks,
- PII redaction where appropriate,
- tenant AI policies,
- rate limits,
- subscription entitlements,
- token and cost metering,
- retries and fallback,
- logging and audit traces,
- evaluation hooks.

## Laravel Module Structure

Recommended structure:

```text
Modules/AI/
  app/
    Gateway/
      AiGateway.php
      AiRequest.php
      AiResponse.php
      ProviderRouter.php
      CostMeter.php
      SafetyPipeline.php
      OutputValidator.php
    Providers/
      AiProvider.php
      OpenAiProvider.php
      AnthropicProvider.php
      GeminiProvider.php
      LocalModelProvider.php
    Prompts/
      PromptRegistry.php
      PromptRenderer.php
      PromptVersion.php
    Tools/
      ToolRegistry.php
      ToolDefinition.php
      ToolExecutor.php
    Retrieval/
      RetrievalService.php
      EmbeddingService.php
    Models/
    Jobs/
    Events/
    Tests/
```

## Core Interfaces

### Provider Interface

```php
interface AiProvider
{
    public function supports(AiCapability $capability): bool;

    public function complete(AiRequest $request): AiResponse;

    public function embed(EmbeddingRequest $request): EmbeddingResponse;
}
```

### Gateway Interface

```php
interface AiGateway
{
    public function complete(AiRequest $request): AiResponse;

    public function stream(AiRequest $request): AiStream;

    public function embed(EmbeddingRequest $request): EmbeddingResponse;
}
```

### Tool Interface

```php
interface AiTool
{
    public function definition(): ToolDefinition;

    public function authorize(ToolContext $context): bool;

    public function execute(ToolCall $call, ToolContext $context): ToolResult;
}
```

## Request Lifecycle

```text
Feature creates AI task
  |
  v
Build user/tenant/task context
  |
  v
Check permission and entitlement
  |
  v
Select prompt version
  |
  v
Retrieve relevant content if needed
  |
  v
Run safety/input checks
  |
  v
Route to provider/model
  |
  v
Send normalized provider request
  |
  v
Parse model response/tool calls
  |
  v
Execute authorized tools if allowed
  |
  v
Validate output schema
  |
  v
Run safety/output checks
  |
  v
Log usage, cost, traces
  |
  v
Return response
```

## AiRequest Fields

Recommended fields:

```text
request_id
tenant_id
user_id
actor_role
agent_id
task_type
prompt_id
prompt_version
model_preference
capabilities_required
messages
context
retrieval_sources
tools_allowed
output_schema
safety_profile
assessment_mode
max_tokens
temperature
metadata
```

## AiResponse Fields

Recommended fields:

```text
response_id
request_id
provider
model
content
structured_output
tool_calls
retrieval_citations
safety_result
usage
cost_estimate
latency_ms
finish_reason
error
metadata
```

## Provider Routing

Routing inputs:

- task type,
- required capability,
- cost limit,
- latency target,
- learner age,
- tenant policy,
- assessment mode,
- data sensitivity,
- output schema support,
- tool-calling support,
- provider availability.

Example:

```text
simple explanation -> low-cost model
advanced code review -> stronger code/reasoning model
child learner mentor -> strict safety profile
quiz JSON generation -> structured output model
tool-heavy workflow -> model with reliable tool calling
private tenant content -> tenant-approved provider only
```

## Capability Model

Track provider/model capabilities:

- chat,
- streaming,
- JSON/structured output,
- tool calling,
- embeddings,
- vision,
- audio,
- code reasoning,
- long context,
- low latency,
- low cost,
- private deployment.

## Prompt Registry

Every production prompt must be versioned.

Prompt table fields:

```text
ai_prompts
  id
  prompt_key
  name
  owner
  purpose
  status
  created_at
  updated_at

ai_prompt_versions
  id
  prompt_id
  version
  system_template
  developer_template
  user_template
  input_schema
  output_schema
  safety_rules
  evaluation_set_id
  changelog
  published_at
```

Rules:

- do not edit published prompt versions in place,
- prompts require evaluation cases,
- high-risk prompts require review before publishing.

## Tool Registry

Tools should be defined server-side.

Tool fields:

```text
tool_key
name
description
input_schema
output_schema
allowed_agents
required_permissions
required_entitlements
side_effect_level
audit_required
human_approval_required
rate_limit
```

Initial read-only tools:

- get current lesson,
- search curriculum,
- get learner skill state,
- get class summary,
- get assignment rubric.

Initial controlled-write tools:

- create quiz draft,
- create teacher intervention note,
- create practice recommendation,
- save AI feedback draft.

## Safety Pipeline

Input checks:

- authentication,
- authorization,
- tenant scope,
- prompt injection risk,
- unsafe content,
- child safety,
- assessment mode,
- PII handling,
- subscription limits.

Output checks:

- age appropriateness,
- policy violations,
- direct solution leakage in assessment mode,
- unsupported claims,
- missing required schema,
- unsafe code/security advice,
- hallucination risk indicators.

## Database Tables

Recommended gateway tables:

```text
ai_requests
ai_responses
ai_tool_calls
ai_prompts
ai_prompt_versions
ai_provider_models
ai_model_routes
ai_usage_meters
ai_safety_events
ai_evaluations
ai_retrieval_traces
ai_incidents
```

## Usage And Cost Metering

Track usage by:

- tenant,
- user,
- role,
- feature,
- agent,
- prompt version,
- provider,
- model,
- date/time.

Metrics:

- input tokens,
- output tokens,
- embedding tokens,
- tool calls,
- cost estimate,
- latency,
- error rate,
- safety block rate.

## Retrieval Integration

Gateway should receive retrieval context from the Retrieval Service.

Retrieval trace should include:

- query,
- embedding model,
- chunk IDs,
- document IDs,
- similarity scores,
- tenant filters,
- visibility filters,
- prompt inclusion status.

## Streaming

Streaming should be supported for chat-like experiences.

Rules:

- usage must still be logged,
- partial outputs should not bypass safety where high-risk,
- tool calls should complete server-side,
- failed streams need graceful recovery.

## Error Handling

Error categories:

- provider unavailable,
- timeout,
- rate limit,
- quota exceeded,
- invalid output schema,
- safety blocked,
- tool authorization failed,
- retrieval failed,
- model unsupported capability.

Each error should include:

- user-safe message,
- internal reason,
- retryable flag,
- fallback action.

## Testing Requirements

Required tests:

- provider adapter unit tests,
- prompt rendering tests,
- tool authorization tests,
- tenant isolation tests,
- entitlement limit tests,
- safety pipeline tests,
- structured output validation tests,
- fallback routing tests,
- cost metering tests.

## Launch Acceptance Criteria

- no direct provider calls outside gateway,
- at least one provider adapter works,
- prompt versions are stored,
- usage and cost are logged,
- tenant AI limits work,
- tool calls are permission checked,
- AI events are observable,
- safety blocks are logged,
- evaluation examples exist for first agents.
