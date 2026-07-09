# AI Data Handling Policy

## Purpose

This document defines how data may be used in AI requests, retrieval, memory, evaluation, and logs.

## Core Rules

- send minimum necessary data,
- respect tenant boundaries,
- avoid unnecessary personal data in prompts,
- do not send secrets,
- log safely,
- retain only as long as needed,
- honor deletion/export obligations.

## Data Categories

- learner profile context,
- lesson/curriculum content,
- learner submissions,
- AI conversation content,
- AI tool call data,
- retrieval chunks,
- evaluation examples,
- safety incidents.

## Provider Controls

For each AI provider track:

- data sent,
- region/options,
- retention policy,
- training-use policy,
- subprocessors,
- contractual terms,
- tenant restrictions.

## Prompt And Response Logs

Logs should support:

- debugging,
- safety review,
- cost tracking,
- evaluation.

Controls:

- redact where possible,
- restrict access,
- define retention,
- avoid exposing child data unnecessarily.

## AI Memory

AI memory must:

- be evidence-based,
- be scoped to learner/tenant,
- support correction,
- support deletion/retention,
- avoid protected characteristic inference.

## RAG

RAG must:

- filter by tenant,
- filter by publication/visibility,
- exclude unauthorized content,
- log retrieval traces.

## Acceptance Criteria

- AI provider registry exists,
- prompt logs have retention policy,
- tenant filtering is tested,
- AI memory is correctable,
- child learner data receives stricter handling.
