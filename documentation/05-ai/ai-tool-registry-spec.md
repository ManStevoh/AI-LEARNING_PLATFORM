# AI Tool Registry Spec

## Purpose

This document defines how AI agents safely call Laravel capabilities.

Tools turn AI from text generation into controlled platform action.

## Core Rule

AI never directly queries the database or performs unrestricted actions.

AI requests a tool call, then Laravel:

- validates input,
- checks permission,
- checks entitlement,
- checks tenant scope,
- executes the action,
- logs the result,
- returns controlled output.

## Tool Metadata

Each tool requires:

```text
tool_key
name
description
input_schema
output_schema
allowed_agents
required_permissions
required_entitlements
tenant_scope
side_effect_level
human_approval_required
rate_limit
audit_required
status
owner
```

## Side-Effect Levels

- read_only,
- draft_write,
- learner_visible_write,
- teacher_visible_write,
- grade_affecting,
- billing_affecting,
- admin_affecting.

High-impact tools require stronger controls.

## Initial Tools

Read-only:

- get_current_lesson,
- search_curriculum,
- get_learner_progress,
- get_skill_state,
- get_assignment_rubric,
- get_class_summary.

Draft-write:

- create_quiz_draft,
- create_assignment_draft,
- create_project_brief_draft,
- create_teacher_intervention_note,
- create_flashcards.

Controlled learner tools:

- recommend_next_lesson,
- create_practice_plan,
- explain_code_error,
- review_code_submission.

Sandbox tools:

- run_code,
- run_visible_tests,
- fetch_execution_result.

## Tool Authorization Flow

```text
Agent requests tool
  |
  v
Validate schema
  |
  v
Check user/tenant context
  |
  v
Check permission
  |
  v
Check entitlement/quota
  |
  v
Check side-effect policy
  |
  v
Execute service
  |
  v
Audit and return safe result
```

## Human Approval

Require approval for:

- publishing curriculum,
- issuing certificates,
- sending parent reports,
- changing grades,
- billing changes,
- institution-wide actions,
- high-impact learner recommendations.

## Tool Output Rules

Tool results should:

- be minimal,
- exclude secrets,
- exclude unrelated learner data,
- include source IDs where useful,
- be structured,
- include errors safely.

## Logging

Log:

- tool key,
- agent,
- initiating user,
- tenant,
- input hash or safe input,
- output status,
- side-effect level,
- duration,
- error,
- audit ID.

## Testing

Required tests:

- schema validation,
- authorization,
- tenant isolation,
- entitlement limits,
- side-effect controls,
- audit logging,
- unsafe input rejection.

## Acceptance Criteria

- every tool has schema,
- every tool has owner,
- every tool checks authorization,
- tool calls are logged,
- high-impact tools require approval,
- arbitrary tool execution is impossible from clients.
