# Cost Management Plan

## Purpose

This document defines how the platform controls cloud, AI, sandbox, storage, and support costs.

## Cost Categories

- application hosting,
- database,
- Redis,
- object storage,
- CDN,
- search,
- AI model usage,
- embeddings,
- code execution sandbox,
- observability,
- email/SMS/WhatsApp,
- payment fees,
- backups.

## Cost Controls

AI:

- feature-level quotas,
- tenant limits,
- cheaper model routing,
- caching where safe,
- prompt length control,
- RAG chunk limits.

Sandbox:

- execution timeouts,
- queue limits,
- language quotas,
- abuse detection,
- plan-based execution minutes.

Storage:

- upload limits,
- lifecycle policies,
- private buckets,
- cleanup abandoned artifacts.

## Dashboards

Track:

- cost per tenant,
- cost per active learner,
- AI cost per feature,
- sandbox cost per feature,
- storage growth,
- gross margin.

## Alerts

Alert on:

- AI spend spike,
- sandbox abuse,
- storage growth anomaly,
- queue backlog,
- payment provider errors.

## Acceptance Criteria

- every paid feature has cost visibility,
- AI usage is metered,
- sandbox usage is metered,
- plan limits protect margin,
- cost review happens monthly.
