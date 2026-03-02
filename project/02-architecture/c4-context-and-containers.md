# C4 Context and Containers

## C4 Level 1: System Context

```text
[User]
  |
  v
[React Frontend]
  |
  v
[NestJS API]
  |
  v
[PostgreSQL]

External systems connected to the API:
- Google People API (MVP)
- Google Calendar (open question / optional integration path)
- Apple/iCloud (V1)
- Beeper (V2+)
```

### Context Notes

- The user interacts only through the web application in the approved baseline.
- The frontend never accesses external providers directly except through approved auth flows.
- The backend is the policy enforcement point for ownership, validation, and integrations.

## C4 Level 2: Container View

```text
+--------------------------------------------------------------+
|                         personal-crm                         |
|                                                              |
|  +------------------+         +---------------------------+  |
|  | React Frontend   | <-----> | NestJS API                |  |
|  | - auth screens   |  HTTP   | - auth module             |  |
|  | - dashboard      |         | - contacts module         |  |
|  | - contacts list  |         | - tags module             |  |
|  | - contact detail |         | - relationships module    |  |
|  | - reminders UI   |         | - interactions module     |  |
|  | - i18n           |         | - reminders module        |  |
|  +------------------+         | - imports module          |  |
|                               | - exports module          |  |
|                               +------------+--------------+  |
|                                            |                 |
|                                            v                 |
|                                   +----------------------+   |
|                                   | PostgreSQL           |   |
|                                   | - users              |   |
|                                   | - contacts           |   |
|                                   | - tags               |   |
|                                   | - relationships      |   |
|                                   | - interactions       |   |
|                                   | - reminders          |   |
|                                   | - imports            |   |
|                                   +----------------------+   |
+--------------------------------------------------------------+
```

## Container Responsibilities

### React Frontend

- Session-aware UI.
- Display dashboard and contact workflows.
- Handle i18n and client-side routing.
- Use TanStack Query for API state.

### NestJS API

- Authenticate the user and enforce ownership.
- Expose REST endpoints for all approved MVP capabilities.
- Integrate with Google People API for import.
- Persist domain data through Drizzle.

### PostgreSQL

- Store all primary application data.
- Support logical tenant isolation through `user_id`.
- Serve as the system of record for imported and manually managed contacts.

## Deferred Containers

These are not required for MVP but may appear later:

- background job worker for heavy imports or AI processing,
- public API gateway,
- message ingestion workers,
- mobile/offline sync layer.
