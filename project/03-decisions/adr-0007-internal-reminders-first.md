# ADR-0007: Internal Reminders First

## Context

Reminder workflows were discussed alongside possible Google Tasks synchronization and Google Calendar scheduling support.

## Decision

Implement reminders as an internal application capability first, without Google Tasks synchronization.

## Alternatives Considered

- Synchronize reminders to Google Tasks from MVP.
- Use Google Calendar as the primary reminder system.

## Consequences

- Faster MVP implementation and fewer provider dependencies.
- Clearer ownership of reminder logic inside the product.
- Google Tasks integration remains a future option.
- Google Calendar quick scheduling is explicitly deferred to backlog work rather than approved for MVP.
