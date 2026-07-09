# Local Development Setup

## Purpose

This document defines the expected local development environment for the AI Learning Platform.

## Required Tools

Recommended:

- PHP 8.4+,
- Composer,
- Node.js LTS,
- npm or pnpm,
- Docker,
- PostgreSQL,
- Redis,
- MinIO,
- Meilisearch,
- Git.

## Recommended Local Services

Use Docker Compose for:

- PostgreSQL,
- Redis,
- MinIO,
- Meilisearch,
- Mailpit,
- optional local sandbox runner.

## Environment Variables

Required categories:

- app settings,
- database,
- Redis,
- queue,
- mail,
- object storage,
- search,
- AI providers,
- payments,
- logging.

Never commit `.env`.

## Local Bootstrap Flow

Expected setup:

```text
clone repository
install Composer dependencies
install Node dependencies
copy .env.example
start Docker services
run migrations
seed core data
start Laravel server
start Vite
start queue worker/Horizon
```

## Seed Data

Local seed should create:

- platform admin,
- sample institution,
- institution admin,
- teacher,
- learner,
- parent,
- Level 1 skill graph,
- sample lessons,
- sample block project,
- sample subscription plan.

## Local URLs

Suggested:

- App: `http://localhost:8000`
- Vite: `http://localhost:5173`
- MinIO: `http://localhost:9001`
- Mailpit: `http://localhost:8025`
- Meilisearch: `http://localhost:7700`
- Horizon: `http://localhost:8000/horizon`

## Development Rules

- Run tests before submitting PR.
- Keep migrations small.
- Do not use production credentials locally.
- Do not use real learner data locally.
- Use fake AI provider mode for most tests.
- Use real AI provider only when explicitly testing AI integration.

## Fake Services

Provide fake/local adapters for:

- AI Gateway,
- M-Pesa,
- Stripe,
- email,
- SMS/WhatsApp,
- sandbox execution.

## Definition Of Done

Local development is ready when:

- one command starts required services,
- seed data works,
- tests run,
- frontend builds,
- queues work,
- object storage works,
- developers can complete the first learner flow locally.
