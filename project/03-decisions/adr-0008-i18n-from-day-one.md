# ADR-0008: Frontend Internationalization from Day One

## Context

The product will likely need French and English support. Retrofitting translation support later would create unnecessary UI churn and string extraction work.

## Decision

Make all frontend user-facing strings translation-ready from the start.

## Alternatives Considered

- Build the MVP in one language and internationalize later.
- Only internationalize the dashboard and authentication flows first.

## Consequences

- Slightly more upfront implementation discipline.
- Lower future cost for multilingual support.
- Backend code, naming, and technical documentation remain English-first.
