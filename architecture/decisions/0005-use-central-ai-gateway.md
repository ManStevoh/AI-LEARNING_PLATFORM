# ADR 0005: Use A Central AI Gateway

## Status

Accepted.

## Context

The platform will use multiple AI providers and must manage safety, cost, prompts, routing, tools, retrieval, and observability.

## Decision

All AI calls must go through a central AI Gateway.

## Rationale

- prevents provider-specific logic from spreading,
- enables model routing,
- centralizes safety and cost controls,
- supports prompt versioning and AI evaluation,
- supports tenant-level AI policy.

## Consequences

- initial implementation requires more structure than direct provider calls,
- all teams must use the gateway interface,
- gateway reliability becomes critical infrastructure.
