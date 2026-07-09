# Coding Standards

## Purpose

This document defines engineering standards for the platform implementation.

It is governed by `documentation/00-executive/engineering-constitution.md`, which is the highest-level engineering standard for the project.

## General Principles

- prefer clear code over clever abstractions,
- keep modules cohesive,
- enforce tenant boundaries,
- test critical behavior,
- avoid provider-specific logic outside adapters,
- document important decisions.

## Laravel Standards

- use Form Request classes for validation,
- use Policies for authorization,
- use Actions/Services for business workflows,
- keep controllers thin,
- use Resources for API responses,
- dispatch events for cross-module side effects,
- queue slow jobs,
- avoid direct AI/payment provider calls outside gateway/adapters.

## Database Standards

- every tenant-owned table includes tenant/institution scope where applicable,
- add indexes for foreign keys and common filters,
- avoid JSONB for relational data that needs joins,
- use JSONB for flexible metadata only,
- migrations must be reversible where practical,
- destructive migrations require review.

## React Standards

- use TypeScript,
- use design system components,
- keep server data loading explicit,
- handle loading/error/empty states,
- prefer accessible primitives,
- avoid hardcoded colors outside tokens.

## AI Standards

- prompts are versioned,
- AI outputs are schema-validated where possible,
- tool calls are permission-checked,
- AI usage is metered,
- high-risk outputs require review,
- no raw secrets in prompts.

## Testing Standards

Required:

- unit tests for pure domain logic,
- feature tests for workflows,
- authorization tests,
- tenant isolation tests,
- AI tool authorization tests,
- payment callback tests,
- code execution tests with mocked provider/sandbox.

## Pull Request Checklist

- requirement linked,
- tests added/updated,
- authorization checked,
- tenant scope checked,
- migrations reviewed,
- AI/security/privacy concerns reviewed,
- docs updated if behavior changed.

## Acceptance Criteria

- code follows module conventions,
- critical flows are tested,
- no provider logic leaks into controllers,
- no sensitive logs,
- PRs include relevant checks.
