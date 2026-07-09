# Phase 1 Detailed Tickets

## Purpose

This document defines detailed implementation tickets for Phase 1: Platform Foundation.

## Phase 1 Goal

Create the production-grade foundation for the web platform:

- Laravel app,
- React/Inertia frontend,
- PostgreSQL,
- Redis,
- modular structure,
- authentication,
- institution tenancy,
- base design system,
- seed data,
- CI foundation.

## Ticket Format

Each ticket should eventually be copied into GitHub Issues, Linear, Jira, or another project tracker.

## Foundation Tickets

### P1-001: Initialize Laravel Application

Type: Engineering

Acceptance criteria:

- Laravel app created.
- Environment file example exists.
- App boots locally.
- Default route works.

### P1-002: Configure PostgreSQL

Type: Backend

Acceptance criteria:

- PostgreSQL connection configured.
- Local Docker service documented.
- Test database works.

### P1-003: Configure Redis

Type: Backend

Acceptance criteria:

- Redis configured for cache and queues.
- Queue worker can process test job.

### P1-004: Install React/Inertia/TypeScript

Type: Frontend

Acceptance criteria:

- Inertia pages render.
- TypeScript builds.
- Vite dev server works.

### P1-005: Configure Tailwind And Base Tokens

Type: Frontend/UI

Acceptance criteria:

- Tailwind configured.
- Design token values mapped.
- Base typography/colors available.

### P1-006: Add Base UI Components

Type: Frontend/UI

Acceptance criteria:

- Button, Input, Card, Dialog, Tabs, Toast exist.
- Components use token classes.
- Focus states visible.

## Architecture Tickets

### P1-007: Create Modular Directory Structure

Type: Backend

Acceptance criteria:

- module directory convention exists,
- sample module loads routes,
- sample module migration runs,
- module test runs.

### P1-008: Add Base Audit Logging

Type: Backend/Security

Acceptance criteria:

- audit log table exists,
- privileged action can be logged,
- user and institution context supported.

## Identity Tickets

### P1-009: User Registration

Type: Backend/Frontend

Acceptance criteria:

- user can register,
- validation errors shown,
- password hashed,
- event logged.

### P1-010: User Login And Logout

Type: Backend/Frontend

Acceptance criteria:

- user can log in,
- session regenerates,
- user can log out,
- invalid credentials handled.

### P1-011: Password Reset

Type: Backend/Frontend

Acceptance criteria:

- reset request works,
- reset email is queued/logged locally,
- password reset works.

## Institution Tickets

### P1-012: Institution Model And Migration

Type: Backend

Acceptance criteria:

- institutions table exists,
- institution factory exists,
- tests cover creation.

### P1-013: Institution Memberships

Type: Backend

Acceptance criteria:

- membership table exists,
- user can belong to institution,
- role field exists,
- tests cover membership.

### P1-014: Active Institution Context

Type: Backend

Acceptance criteria:

- user can select active institution,
- active institution is used in policies,
- invalid institution switch is blocked.

### P1-015: Institution Dashboard Shell

Type: Frontend

Acceptance criteria:

- institution dashboard page exists,
- shows placeholder metrics,
- permission protected.

## Class And Learner Tickets

### P1-016: Class Model

Type: Backend

Acceptance criteria:

- class table exists,
- class belongs to institution,
- teacher can create class.

### P1-017: Learner Enrollment In Class

Type: Backend

Acceptance criteria:

- learner can be added to class,
- class roster returns learners,
- cross-tenant add is blocked.

### P1-018: Teacher Class Dashboard

Type: Frontend

Acceptance criteria:

- teacher sees classes,
- teacher sees class roster,
- empty state exists.

## CI And Quality Tickets

### P1-019: Configure Test Suite

Type: Engineering

Acceptance criteria:

- backend tests run,
- frontend type check runs,
- CI command documented.

### P1-020: Add Authorization Tests

Type: Security

Acceptance criteria:

- teacher cannot access another institution,
- learner cannot access admin pages,
- parent cannot access unrelated learner.

## Phase 1 Exit Criteria

Phase 1 is complete when:

- app runs locally,
- users authenticate,
- institutions exist,
- teachers can manage a class roster,
- base UI shell exists,
- tenant scoping is tested,
- CI passes.
