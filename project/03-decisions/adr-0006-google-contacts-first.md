# ADR-0006: Google Contacts First

## Context

Many possible contact sources were discussed, including Google, Apple/iCloud, social networks, and Beeper-linked channels. The MVP needed a narrow and reliable integration starting point.

## Decision

Use Google Contacts as the only approved import source for MVP.

## Alternatives Considered

- Support Google plus CSV/vCard in MVP.
- Support multiple providers immediately.
- Postpone all imports and rely on manual data entry first.

## Consequences

- Lower integration complexity in MVP.
- No duplicate-merge requirement in MVP because only one provider is active.
- Additional source support becomes a V1 expansion.
