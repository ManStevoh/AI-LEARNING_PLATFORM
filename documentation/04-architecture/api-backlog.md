# API Backlog

## Purpose

This document tracks API contracts that must be designed after the starter OpenAPI file.

Starter contract:

- `api/openapi.yaml`

## Priority 1 APIs

### Identity

- login,
- logout,
- current user,
- token issue,
- token revoke,
- device list,
- active institution switch.

### Institutions

- create institution,
- update institution,
- list members,
- invite teacher,
- invite learner,
- import learners,
- create class,
- list classes,
- class roster.

### Learner Progress

- get learning path,
- get lesson,
- mark lesson progress,
- submit quiz attempt,
- get skill states,
- get recommendations.

### Block Coding

- create block project,
- update block project,
- save project version,
- list project assets,
- submit project,
- get AI block explanation.

### AI Mentor

- send mentor message,
- get mentor response,
- rate AI response,
- get AI usage.

## Priority 2 APIs

### Assessments

- list assessments,
- submit answers,
- get attempt result,
- teacher review,
- rubric scoring.

### Subscriptions

- list plans,
- get current subscription,
- assign seats,
- get usage meters,
- get invoices,
- payment initiation,
- webhook endpoints.

### Teacher Dashboard

- class overview,
- learner risk list,
- skill mastery summary,
- submission queue,
- misconceptions report.

## Priority 3 APIs

### Code Execution

- create execution,
- get status,
- get logs,
- get test results,
- cancel execution.

### Offline Sync

- register device,
- pull changes,
- push operations,
- list conflicts,
- resolve conflict,
- download offline package.

### Portfolio

- list portfolio items,
- approve project,
- generate README,
- get skill evidence,
- publish portfolio profile.

## API Documentation Requirements

Every API backlog item must define:

- path,
- method,
- auth requirements,
- tenant context,
- request schema,
- response schema,
- errors,
- rate limits,
- events emitted,
- audit requirements,
- tests.
