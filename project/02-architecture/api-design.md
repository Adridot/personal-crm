# API Design

This document records the intended REST surface and API conventions. It is not a generated contract and should be treated as a planning baseline.

## API Style

- REST-first.
- JSON request and response bodies.
- Authenticated routes scoped to the current user.
- Backend remains the ownership enforcement layer.

## Core Conventions

### Authentication

- Better Auth handles session lifecycle.
- Protected routes require an authenticated session.
- Ownership is enforced through the resolved user identity.

### Pagination

- List endpoints should support cursor or page-based pagination.
- MVP minimum: stable page-based pagination with explicit limit.

### Filtering

- Contact list must support:
  - text search,
  - tag filtering,
  - future extensibility for inactive/recent filters.

### Error Format

Errors should follow a stable JSON envelope:

```json
{
  "error": {
    "code": "string_identifier",
    "message": "Human-readable explanation",
    "details": {}
  }
}
```

### Ownership Checks

- Every read, update, or delete must ensure the target record belongs to the authenticated user.
- No cross-user access path is allowed.

## MVP Endpoint Groups

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/session`

Note: actual path details may align with Better Auth conventions during implementation.

### Contacts

- `GET /api/contacts`
- `POST /api/contacts`
- `GET /api/contacts/:id`
- `PATCH /api/contacts/:id`
- `DELETE /api/contacts/:id`

### Tags

- `GET /api/tags`
- `POST /api/tags`
- `PATCH /api/tags/:id`
- `DELETE /api/tags/:id`

### Relationships

- `POST /api/contacts/:id/relationships`
- `DELETE /api/relationships/:id`

### Interactions

- `GET /api/contacts/:id/interactions`
- `POST /api/contacts/:id/interactions`
- `PATCH /api/interactions/:id`
- `DELETE /api/interactions/:id`

### Reminders

- `GET /api/reminders`
- `POST /api/reminders`
- `PATCH /api/reminders/:id`
- `DELETE /api/reminders/:id`

### Imports

- `POST /api/imports/google`
- `GET /api/imports`
- `GET /api/imports/:id`

### Exports / Account

- `POST /api/account/export`
- `DELETE /api/account`

### Dashboard

- `GET /api/dashboard`

## Future Endpoint Groups

These are documented to reserve conceptual space, not to approve implementation now:

- AI suggestions
- duplicate merge review
- Beeper sync
- Apple/iCloud sync
- public API endpoints for third parties

## Response Shape Guidelines

- List endpoints should return data plus pagination metadata.
- Detail endpoints should return primary entity plus related data needed by the page.
- Dashboard endpoint should aggregate reminders, stale contacts, and simple counts instead of requiring multiple waterfall requests.
