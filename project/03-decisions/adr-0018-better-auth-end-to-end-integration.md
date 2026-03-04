# ADR-0018: Better Auth End-to-End Integration Baseline

## Context

The project had already chosen Better Auth, but the MVP still needed a concrete integration strategy across:

- the NestJS backend,
- the TanStack Router frontend,
- route protection,
- session transport,
- and app-owned session introspection.

At the same time, Better Auth's generic Node documentation pushes toward ESM-oriented integration patterns, while the existing API application had originally been bootstrapped with a standard NestJS CommonJS runtime.

## Decision

Adopt the following end-to-end auth baseline for MVP:

- integrate Better Auth in NestJS through `@thallesp/nestjs-better-auth`,
- keep the Nest global auth guard enabled by default,
- mark public routes explicitly as anonymous,
- keep Better Auth native endpoints at `/api/auth/*`,
- add `GET /api/account/me` as the app-owned authenticated session endpoint,
- use cookie-backed Better Auth sessions,
- use same-origin frontend auth transport through `/api`,
- protect the localized dashboard and contacts routes immediately,
- and use dedicated localized sign-in and sign-up pages.

Because the current community Nest package is not yet compatible with the latest Better Auth runtime line, pin Better Auth to `1.4.21` for now and defer the upgrade until upstream compatibility is fixed. Keep `apps/api` on the standard NestJS CommonJS runtime until an upgrade actually requires a broader ESM migration.

## Alternatives Considered

- integrate Better Auth manually in Nest without the community package,
- keep CommonJS in `apps/api` and try to work around Better Auth runtime requirements,
- use a token or bearer-based frontend auth transport,
- defer route protection until after the first auth UI screens exist,
- expose only Better Auth native endpoints and skip an app-owned `/api/account/me` endpoint.

## Consequences

- Auth behavior is consistent across backend guards, frontend route protection, and the shell session UI.
- The API keeps the simpler NestJS CommonJS runtime for now, reducing churn in imports and tooling.
- Public endpoints such as `health` must be intentionally annotated to stay accessible.
- The frontend and backend keep a simple same-origin auth model that works with the Vite `/api` proxy in development and a reverse proxy later.
- `/api/account/me` becomes the stable application-level current-user contract for future frontend work.
- The Better Auth version is intentionally pinned for compatibility and must be revisited when the community Nest integration catches up.
