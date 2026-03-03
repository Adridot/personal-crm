# ADR-0011: Canonical Relationship Pair Ordering

## Context

The `relationships` table links two contacts owned by the same user. If the system allows both `(A, B)` and `(B, A)`, the same semantic relationship can be stored twice in reverse order.

That would weaken data integrity, complicate duplicate detection, and make relationship queries harder to reason about.

## Decision

Store relationship pairs in canonical order.

- `contact_id_1` must always be less than `contact_id_2`
- the database should enforce this with a `CHECK` constraint
- the database should also enforce uniqueness with a `UNIQUE` constraint on `(user_id, contact_id_1, contact_id_2)`
- application code must sort the two contact IDs before insert and before duplicate checks

## Alternatives Considered

- Allow both pair orders and deduplicate in application logic only.
- Keep the table unconstrained and rely on periodic cleanup jobs.
- Model the pair as two directional rows instead of one undirected row.

## Consequences

- The schema gains a small amount of constraint complexity.
- Relationship creation logic must normalize input order before persistence.
- Duplicate reverse-order rows become impossible at the database level.
- Read queries become simpler because each undirected pair has exactly one canonical representation.
