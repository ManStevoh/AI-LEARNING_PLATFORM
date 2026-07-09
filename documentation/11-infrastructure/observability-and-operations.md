# Observability And Operations

## Purpose

This document defines logging, metrics, tracing, alerting, and operational readiness for the platform.

## Observability Goals

The team must be able to answer:

- Is the platform healthy?
- Are learners blocked?
- Are queues delayed?
- Are AI costs spiking?
- Are code executions failing?
- Are payments/webhooks failing?
- Are institutions experiencing errors?
- Are slow queries affecting dashboards?

## Signals

### Logs

Use structured logs.

Include:

- request ID,
- user ID where safe,
- institution ID,
- route/action,
- status,
- latency,
- error code,
- job ID,
- AI request ID where relevant.

### Metrics

Track:

- HTTP request count,
- HTTP latency,
- error rate,
- queue depth,
- job failures,
- AI token usage,
- AI cost,
- code execution count,
- code execution failures,
- payment failures,
- active users,
- storage usage,
- database slow queries.

### Traces

Trace:

- web request to database,
- web request to queue job,
- AI Gateway call,
- RAG retrieval,
- payment webhook,
- code execution lifecycle,
- offline sync push/pull.

## Dashboards

Required dashboards:

- platform health,
- queue health,
- AI usage and cost,
- code execution health,
- payment health,
- institution activity,
- database performance,
- error tracking.

## Alerts

Alert on:

- high error rate,
- queue backlog,
- failed payment webhooks,
- AI cost spike,
- sandbox failure spike,
- database storage risk,
- backup failure,
- high latency,
- security event spike.

## AI Observability

Track:

- provider,
- model,
- prompt version,
- feature,
- latency,
- tokens,
- cost,
- safety result,
- retrieval chunk IDs,
- user feedback,
- failure reason.

## Code Execution Observability

Track:

- language,
- runtime version,
- execution time,
- memory,
- timeout rate,
- failed tests,
- abuse flags,
- sandbox errors.

## Operational Runbooks

Required runbooks:

- production deploy,
- rollback,
- failed migration,
- database restore,
- queue backlog,
- AI provider outage,
- payment webhook failure,
- sandbox outage,
- security incident,
- tenant data export,
- high AI cost incident.

## Incident Management

Every incident should have:

- severity,
- owner,
- start/end time,
- affected users,
- timeline,
- mitigation,
- root cause,
- follow-up tasks.

## Definition Of Done

A production feature is observable when:

- logs include request/job context,
- metrics exist,
- errors are captured,
- dashboards show health,
- alerts exist for critical failure modes,
- runbook exists for expected incidents.
