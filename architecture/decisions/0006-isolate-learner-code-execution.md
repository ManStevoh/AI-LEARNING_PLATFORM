# ADR 0006: Isolate Learner Code Execution

## Status

Accepted.

## Context

The platform will execute untrusted learner code for labs, assessments, and projects.

## Decision

Learner code must never run on application servers. It must run in isolated managed sandboxes, containers, or stronger isolation environments.

## Rationale

- learner code may be malicious or accidental harmful,
- app servers hold sensitive platform data,
- code execution needs CPU, memory, time, file, and network limits.

## Consequences

- code execution requires separate infrastructure/provider,
- latency and cost must be measured,
- sandbox failures need clear learner feedback.
