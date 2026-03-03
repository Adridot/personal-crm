# ADR-0013: Shared Zod Contract Package

## Context

The product is REST-first, but both frontend and backend will need to agree on request and response shapes. Re-declaring DTOs in each app would add drift risk and duplicated maintenance. At the same time, sharing backend persistence models directly with the frontend would create undesirable coupling.

## Decision

Create a focused internal package, `packages/contracts`, to hold shared transport contracts.

That package should:

- define shared Zod schemas,
- export inferred TypeScript types from those schemas,
- stay import-safe in both browser and server environments,
- and remain limited to transport contracts and validation helpers.

It may begin as an empty workspace placeholder during bootstrap and gain real schemas as API contracts become concrete.

It must not export:

- Drizzle table definitions,
- persistence-layer entities,
- Nest service internals,
- or backend-only authentication implementation details.

## Alternatives Considered

- Re-declare DTOs separately in frontend and backend code.
- Share ORM or persistence models directly.
- Create a broad `shared` package for unrelated utilities, types, and business logic.
- Defer all shared contract work to generated OpenAPI clients later.

## Consequences

- The repo gets a single source of truth for validated API payloads that need to be shared.
- Frontend and backend can evolve with less contract drift.
- Package boundaries stay clearer because transport contracts are separated from persistence and business logic.
- Additional internal packages should still be created only for distinct responsibilities rather than accumulating everything under a generic shared package.
