# ADR-0010: Imports Are Tracked Jobs From Day One

## Context

Google Contacts import is a core MVP feature. An open question remained about whether imports should execute as simple synchronous actions or as tracked jobs with visible lifecycle state.

## Decision

Treat imports as tracked jobs from day one.

The initial implementation may still run inside the main application process, but the product and API model must expose import lifecycle state explicitly.

## Alternatives Considered

- Fully synchronous imports with no job record.
- Synchronous imports plus lightweight logs only.
- A separate worker queue from the first implementation.

## Consequences

- The `imports` table becomes a job-tracking record, not just an audit trail.
- The frontend must be able to observe import status explicitly.
- The system is easier to evolve later toward background processing without redefining product behavior.
