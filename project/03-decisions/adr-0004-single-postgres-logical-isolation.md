# ADR-0004: Single PostgreSQL Database with Logical User Isolation

## Context

The product requires each user to experience their own isolated data domain. A question emerged about whether that meant one physical database per user or a shared database with strict ownership filtering.

## Decision

Use one physical PostgreSQL database and implement isolation logically through `user_id` on all user-owned tables, enforced by the application layer.

## Alternatives Considered

- One physical database per user.
- Separate schemas per user.
- Shared database with row-level security as the primary mechanism from day one.

## Consequences

- Simpler operations and deployment for MVP.
- Lower infrastructure complexity.
- Requires strong discipline in backend ownership filtering.
- Leaves room to add row-level security later if needed.
