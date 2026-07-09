# ADR 0007: Design Offline-Ready From The Start

## Status

Accepted.

## Context

The first product is online web, but future mobile and desktop apps should support offline learning.

## Decision

Design IDs, APIs, events, content packages, and sync metadata to support future offline clients.

## Rationale

- target markets may have connectivity constraints,
- offline support is harder to retrofit,
- learning events and project saves need sync-safe design.

## Consequences

- backend APIs need idempotency and sync concepts,
- clients need local storage strategy later,
- conflict resolution must be specified before mobile/desktop build.
