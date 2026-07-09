# Implementation Backlog

## Purpose

This document converts the playbook into a build backlog. It is not a final sprint plan, but it gives the engineering team a clear starting breakdown.

## Backlog Status Labels

- `Draft`
- `Ready For Design`
- `Ready For Engineering`
- `In Progress`
- `Blocked`
- `Done`

## Epic 1: Project Foundation

### PF-001: Create Laravel Application

Scope:

- Laravel setup,
- PostgreSQL connection,
- Redis connection,
- React/Inertia,
- TypeScript,
- Tailwind.

Acceptance:

- app runs locally,
- database connects,
- frontend builds,
- CI can install dependencies.

### PF-002: Configure Modular Structure

Scope:

- define module directory,
- module service provider pattern,
- coding conventions,
- test conventions.

Acceptance:

- sample module works,
- routes/migrations/tests can be module-owned.

### PF-003: Add Base Design System

Scope:

- Tailwind tokens,
- shadcn/ui setup,
- base layout,
- buttons/forms/cards/dialogs.

Acceptance:

- components render,
- dark/light mode strategy exists,
- accessibility basics checked.

## Epic 2: Identity And Tenancy

### ID-001: User Authentication

Scope:

- registration,
- login,
- logout,
- password reset,
- email verification.

### ID-002: Institution Accounts

Scope:

- create institution,
- institution profile,
- active institution context.

### ID-003: Roles And Permissions

Scope:

- role model,
- permission model,
- policies,
- institution membership.

### ID-004: Class And Learner Management

Scope:

- create class,
- invite teacher,
- invite learner,
- basic roster.

## Epic 3: Curriculum Knowledge Graph

### KG-001: Domain/Concept/Skill Model

Scope:

- domains,
- concepts,
- skills,
- skill relationships.

### KG-002: Skill Mapping

Scope:

- map lessons to skills,
- map assessments to skills,
- map projects to skills.

### KG-003: Learner Skill State

Scope:

- learner skill state records,
- evidence records,
- mastery state updates.

## Epic 4: Level 1 Block Coding

### BC-001: Blockly Workspace

Scope:

- embed Blockly,
- toolbox,
- basic categories,
- workspace serialization.

### BC-002: Stage Preview

Scope:

- simple sprite/stage runtime,
- run project,
- reset project.

### BC-003: Project Save And Load

Scope:

- create project,
- save workspace JSON,
- load project,
- version history foundation.

### BC-004: Generated Code View

Scope:

- show JavaScript generated from blocks,
- syntax highlighting.

### BC-005: Project Submission

Scope:

- submit project to teacher,
- teacher review view,
- basic feedback.

## Epic 5: AI Gateway

### AI-001: Provider Adapter

Scope:

- one initial provider,
- model config,
- request/response logging.

### AI-002: Prompt Registry

Scope:

- prompt IDs,
- prompt versions,
- feature mapping.

### AI-003: Lesson-Aware Mentor

Scope:

- AI mentor in lesson/block workspace,
- context includes lesson and skill,
- hint-first behavior.

### AI-004: Cost And Usage Tracking

Scope:

- token usage,
- model usage,
- tenant usage,
- learner usage.

## Epic 6: Teacher Dashboard

### TD-001: Class Overview

Scope:

- learners,
- progress,
- current assignments.

### TD-002: Submission Queue

Scope:

- submitted block projects,
- teacher feedback,
- status.

### TD-003: Skill Mastery View

Scope:

- class skills,
- learner mastery states,
- learners needing support.

## Epic 7: Subscriptions

### SUB-001: Plan Model

Scope:

- plans,
- entitlements,
- AI limits,
- seat limits.

### SUB-002: Institution Seats

Scope:

- allocate seats,
- enforce seat limit,
- seat usage dashboard.

### SUB-003: Manual Billing Foundation

Scope:

- invoice record,
- manual payment status,
- admin activation.

## Epic 8: Pilot Readiness

### PILOT-001: Pilot Institution Setup

Scope:

- create pilot institution,
- teacher accounts,
- learner import.

### PILOT-002: Level 1 Content Pack

Scope:

- first 10 units,
- teacher guide,
- final project rubric.

### PILOT-003: Pilot Reporting

Scope:

- activation,
- progress,
- project completion,
- AI usage,
- teacher feedback.

## Engineering Rules

Every ticket must include:

- owning module,
- acceptance criteria,
- tests,
- security notes,
- tenant implications,
- analytics events,
- documentation updates.

## First Build Recommendation

Start with:

1. Project foundation.
2. Identity and institution tenancy.
3. Curriculum skill graph.
4. Level 1 Blockly workspace.
5. AI mentor foundation.
6. Teacher dashboard.
7. Pilot reporting.
