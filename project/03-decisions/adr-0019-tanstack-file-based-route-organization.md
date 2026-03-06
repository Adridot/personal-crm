# ADR-0019: TanStack File-Based Route Organization and Router Fallbacks

## Context

The frontend moved beyond a flat shell and now needs a route structure that can grow without turning each route file into a large mixed-responsibility module. At the same time, auth gating, locale-aware URLs, and fallback UX need to stay consistent across pages.

## Decision

Adopt the following frontend routing baseline:

- use TanStack Router file-based routing as the default organization model,
- keep locale-aware routes under `/{-$locale}`,
- use pathless `_guest` and `_authenticated` layout routes to centralize access control,
- allow feature-oriented route folders with `route.tsx` and colocated `page.content.ts` files when pages grow,
- and register router-level default fallback components for pending, error, and not-found states.

Canonical English slugs remain unchanged across locales, with Intlayer handling translation of copy rather than localized route rewrites in MVP.

## Alternatives Considered

- keep a flatter route tree with one file per page even as route complexity grows,
- duplicate auth checks inside each page route instead of using pathless layouts,
- implement loading, error, and not-found UI ad hoc inside each route instead of central router fallbacks,
- or adopt TanStack Start now rather than keeping Vite + TanStack Router with NestJS as the backend runtime.

## Consequences

- Auth gating is centralized instead of duplicated across route files.
- Locale-aware route organization remains explicit and predictable.
- Fallback UX is more consistent across pages.
- The route tree can scale into feature folders without losing TanStack Router conventions.
- Documentation must distinguish approved route organization from future optional features such as localized slugs or TanStack Start migration.
