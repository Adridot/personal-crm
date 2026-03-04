# ADR-0017: Better Auth Default Auth Schema Baseline

## Context

The project needed its first real PostgreSQL schema baseline before full authentication wiring was implemented. The approved stack already locked Better Auth for authentication and Drizzle for schema management and migrations.

The team had to decide whether to hand-author an app-owned `users` table first, or to let Better Auth define the initial auth schema immediately and keep future auth wiring aligned with that baseline.

## Decision

Use Better Auth as the source of truth for the initial authentication schema in MVP.

Generate and commit the Better Auth core Drizzle schema with default conventions:

- `user`
- `session`
- `account`
- `verification`

Keep Better Auth default table names and id conventions for the MVP auth baseline. Defer additional user fields such as `locale`.

Use Drizzle Kit for migration generation and application after the Better Auth schema is generated.

## Alternatives Considered

- Create an app-owned `users` table first and adapt Better Auth to it later.
- Create only Drizzle plumbing in MVP-006 and defer the first real schema to MVP-007.
- Customize Better Auth immediately to use plural table names and UUID auth ids.

## Consequences

- MVP-007 can focus on Better Auth transport and session wiring instead of redefining auth tables.
- The committed auth schema is generated, not hand-authored, and should be treated accordingly.
- Future domain tables must use a `user_id` type compatible with the Better Auth `user.id` text/string column.
- Any future desire to rename auth tables or change auth id conventions will require a deliberate migration rather than being absorbed implicitly.
