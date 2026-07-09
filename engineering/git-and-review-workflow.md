# Git And Review Workflow

## Purpose

This document defines how code and documentation changes should be reviewed.

## Branching

Recommended:

- `main` is always deployable,
- feature branches for work,
- small pull requests,
- release branches only when needed.

## Commit Principles

- commit related changes together,
- use clear messages,
- avoid committing secrets,
- include docs when decisions change.

## Pull Request Requirements

Each PR should include:

- summary,
- test plan,
- screenshots for UI,
- migration notes,
- security/privacy notes if relevant,
- AI impact if relevant,
- rollout/rollback notes for risky changes.

## Review Focus

Reviewers should check:

- correctness,
- tenant isolation,
- authorization,
- accessibility,
- security,
- performance,
- maintainability,
- tests,
- docs.

## Required Checks Before Merge

- tests pass,
- lint/format pass,
- migrations reviewed,
- no secrets,
- OpenAPI updated for API changes,
- docs updated for major behavior.

## Documentation Review

Documentation PRs should verify:

- factual claims are sourced,
- assumptions are labeled,
- recommendations include rationale,
- links are valid,
- pending work is updated.

## Acceptance Criteria

- every PR is reviewed,
- risky changes have rollback plan,
- security-sensitive changes receive deeper review,
- documentation remains versioned with the codebase.
