# Service Level Objectives

## Purpose

This document defines initial reliability and performance targets.

SLOs should start realistic and tighten after pilot data.

## Initial Targets

Web availability:

- pilot target: best effort with rapid response,
- production target later: 99.5%+ monthly for core learning flows.

Page performance:

- dashboard usable within acceptable latency on common school connections,
- heavy IDE/Blockly bundles lazy-loaded.

AI response:

- simple responses should feel interactive,
- long AI workflows should show progress/queued state.

Code execution:

- run requests should show queued/running/completed states,
- timeouts should be clear.

## Critical User Journeys

- login,
- learner dashboard,
- lesson view,
- block project save/run,
- teacher dashboard,
- AI mentor request,
- assignment submission.

## Error Budgets

Define after pilot:

- allowed downtime,
- AI failure rate,
- code execution failure rate,
- queue delay threshold.

## Monitoring

Track:

- uptime,
- API latency,
- queue lag,
- AI latency/error rate,
- sandbox latency/error rate,
- database health,
- storage errors.

## Acceptance Criteria

- critical journeys have health checks,
- alerts exist for severe failures,
- pilot incidents are reviewed,
- SLOs are updated from real usage.
