# Offline Sync Architecture

## Purpose

The platform will start online-first, but future mobile and desktop apps must support offline learning. Offline requirements should shape backend IDs, APIs, sync metadata, event design, and local data models from the beginning.

## Offline Goals

Support offline access to:

- downloaded lessons,
- quizzes,
- block coding projects,
- coding practice drafts,
- notes,
- progress events,
- teacher-assigned offline packs,
- selected media/resources.

Do not assume offline access to:

- cloud AI,
- server-side code execution,
- live collaboration,
- payments,
- real-time teacher dashboards.

## Client Storage

### Web/PWA

- IndexedDB for drafts, local progress queue, downloaded resources metadata.
- Service worker for app shell and static assets where appropriate.

### Mobile

- SQLite-based storage.
- Encrypted secure storage for tokens.
- Background sync where supported.

### Desktop

- SQLite for local data.
- Local filesystem for project files where appropriate.
- Encrypted credential storage.

## Sync Concepts

### Device

Each offline-capable client must register a device.

Track:

- device ID,
- user ID,
- device name,
- platform,
- app version,
- last sync,
- revoked state.

### Sync Cursor

A cursor records what the client has already seen.

Track:

- device ID,
- tenant/institution ID,
- collection,
- cursor token,
- last pulled timestamp.

### Operation Queue

Offline clients store operations locally, then push them when online.

Examples:

- lesson completed,
- quiz answered,
- block project saved,
- code draft updated,
- note created,
- assignment submitted.

## Conflict Strategy

Use different strategies by data type.

### Append-Only Events

Examples:

- progress events,
- quiz attempts,
- AI usage records.

Strategy:

- append and reconcile on server.

### Last-Writer-Wins With Version Check

Examples:

- simple notes,
- draft metadata.

Strategy:

- accept latest version only if base version matches,
- otherwise create conflict.

### Manual Conflict Resolution

Examples:

- project files,
- block projects,
- submitted assignments.

Strategy:

- preserve both versions,
- show conflict to learner/teacher,
- allow merge or choose version.

## Sync API

Required endpoints:

```text
POST /api/v1/devices
GET /api/v1/sync/pull
POST /api/v1/sync/push
GET /api/v1/sync/conflicts
POST /api/v1/sync/conflicts/{id}/resolve
GET /api/v1/offline-packages/{id}
```

## Offline Package

An offline package may include:

- lessons,
- resources,
- quizzes,
- starter projects,
- block assets,
- teacher notes,
- expected sync rules.

Package metadata:

- package ID,
- version,
- course/lesson IDs,
- skill IDs,
- institution/class scope,
- expiry,
- size,
- checksum.

## Security Requirements

- Local tokens must be stored securely.
- Sensitive data should be minimized on device.
- Child data should be protected.
- Offline packages should expire where appropriate.
- Device revocation must block future sync.
- Sync endpoints must enforce tenant scoping.

## Analytics

Offline events should preserve:

- original event time,
- sync time,
- device ID,
- app version,
- activity ID,
- learner ID,
- skill IDs.

## Implementation Strategy

Phase 1:

- Online-only web, but use stable IDs and event models.

Phase 2:

- PWA drafts and limited local persistence.

Phase 3:

- Flutter mobile offline lessons and quiz progress.

Phase 4:

- Desktop offline project work and sync.

## Definition Of Done

Offline-capable data is ready when:

- stable IDs exist,
- versioning exists,
- sync API exists,
- conflict rules are documented,
- local storage model is defined,
- security controls exist,
- tests cover conflict cases.
