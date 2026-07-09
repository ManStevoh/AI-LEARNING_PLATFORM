# ADR 0008: Use Shared Database Tenant-Scoped Model Initially

## Status

Accepted.

## Context

The platform must support many institutions while moving quickly in an early-stage product.

## Decision

Use a shared application and shared database with tenant-scoped rows initially.

## Rationale

- simpler operations,
- easier reporting,
- faster product iteration,
- sufficient with strict tenant isolation controls.

## Consequences

- every tenant-owned query must enforce tenant scope,
- tenant isolation tests are mandatory,
- some enterprise customers may later require stronger isolation.
