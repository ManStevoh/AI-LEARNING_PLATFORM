# ADR 0003: Use Laravel, React, And Inertia For First Web Version

## Status

Accepted.

## Context

The platform needs a fast first web implementation while preserving strong backend control, authentication, authorization, queues, events, and future API readiness.

## Decision

Use Laravel with React and Inertia.js for the first online web version.

## Rationale

- Laravel supports the backend needs of the platform.
- React supports complex UI surfaces such as Blockly, Monaco, dashboards, and AI interfaces.
- Inertia allows rapid full-stack delivery without building a fully separate SPA immediately.

## Consequences

- Marketing pages may need separate SSR/SEO decisions.
- Mobile, desktop, WhatsApp, and partner clients still require API-first discipline.
- Complex frontend surfaces should use TypeScript and design system components.
