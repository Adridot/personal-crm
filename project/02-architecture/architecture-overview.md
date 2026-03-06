# Architecture Overview

## Approved Technical Baseline

- Repository model: monorepo.
- Workspace tooling: `pnpm` workspaces + Turborepo.
- Frontend: React + Vite + TanStack Router + TanStack Query + Intlayer + shadcn/ui on Base UI.
- Backend: NestJS + Drizzle ORM + PostgreSQL + Better Auth.
- API runtime baseline: standard NestJS CommonJS in `apps/api`, with Better Auth pinned to the current community-integration-compatible version line.
- Shared contract strategy: a focused internal package will hold shared Zod schemas and inferred TypeScript types for transport-level contracts.
- API style: REST-first.
- Data isolation: one PostgreSQL database with logical per-user isolation via `user_id`.
- Reminder model: internal reminder system first.
- Reminder recurrence baseline: one-time, weekly, monthly, yearly.
- Import model: tracked jobs from day one.
- Internationalization: frontend strings must be translation-ready from day one, using Intlayer with `prefix-no-default`, English as the default locale, and cookie + localStorage persistence.

## Guiding Principles

- Keep implementation simple enough for local Docker development and straightforward local onboarding.
- Optimize for clean domain boundaries before adding integrations.
- Avoid early infrastructure complexity.
- Preserve room for future integrations without hard-coding them into MVP.
- Prefer explicit data ownership checks to hidden magic.
- Prefer purpose-specific internal packages over a broad `shared` bucket.
- Share transport contracts, not ORM models or backend-only business logic.

## Monorepo Shape

The monorepo should eventually support at least:

- a frontend application,
- a backend API,
- a focused internal package for shared transport contracts,
- infrastructure or tooling configuration,
- and documentation under `project/`.

The approved initial layout is:

- `apps/web`
- `apps/api`
- `packages/contracts`
- `project/`

The approved workspace baseline is `pnpm` for dependency management and Turborepo for task orchestration.

## Shared Contract Boundary

The first internal package should have one purpose: define shared API contracts.

- `packages/contracts` should own Zod schemas for shared request and response payloads.
- Frontend and backend should consume inferred TypeScript types from those Zod schemas.
- The contracts package must stay safe to import in both browser and server contexts.
- Drizzle table definitions, persistence models, Nest service internals, and auth implementation details must not be exported from `packages/contracts`.
- Additional internal packages should be created only when they have a distinct responsibility, for example config, UI, or generated clients.
- During workspace bootstrap, `packages/contracts` may exist only as a placeholder package. Real schemas should be added when shared endpoint contracts actually stabilize.
- App-local parsing is acceptable while a contract is still moving, but once an endpoint is treated as stable it should be promoted back into a shared schema in `packages/contracts`.

## Backend Domain Modules

The NestJS application should be split into domain-focused modules, not a monolithic service. The initial module set is:

- Auth
- Users / Account
- Contacts
- Groups
- Tags / Classification
- Relationships
- Interactions
- Reminders
- Imports / Import Jobs
- Exports / Account deletion

Deferred modules that should not block MVP:

- Duplicate merge / AI assistance
- Gifts / Debts / Gift ideas
- External public API
- Beeper messages

## Frontend Baseline

The frontend is a single-page application with:

- dedicated localized auth pages,
- authenticated routes,
- explicit guest routes,
- translation-ready copy,
- dashboard and contacts views as first-class pages,
- TanStack Router as the routing baseline,
- TanStack Query for server data synchronization,
- Intlayer for frontend internationalization,
- UI primitives based on shadcn/ui configured for Base UI,
- file-based route organization as the scaling default,
- pathless guest and authenticated layout routes for access control,
- router-level pending, error, and not-found fallbacks for consistent UX,
- and a Vite development server proxying `/api` calls to the NestJS backend.

The auth transport baseline is same-origin:

- Better Auth client requests stay on the frontend origin,
- Vite proxies `/api` to NestJS in development,
- and production should preserve the same-origin appearance through a reverse proxy rather than exposing a separate public auth origin.

TanStack Start was evaluated for the frontend, but it is intentionally deferred while NestJS remains the primary backend runtime. The additional full-stack features in TanStack Start are not needed for the MVP shell and would overlap with responsibilities already assigned to NestJS.

The approved frontend i18n baseline is:

- Intlayer configured at the `apps/web` application level,
- `prefix-no-default` locale routing,
- English as the default locale,
- cookie + localStorage locale persistence,
- proxy-backed locale detection through `intlayerProxy()`,
- colocated `.content.ts` dictionaries near routes and UI components,
- and no editor, CMS, AI, or localized rewrite features in MVP.

The approved frontend route-organization baseline is:

- TanStack Router file-based routing,
- locale-prefixed route trees under `/{-$locale}`,
- pathless `_guest` and `_authenticated` layout routes,
- feature-oriented route folders when page modules grow,
- and router-level default fallback components rather than ad hoc page-level fallback duplication.

## Data Ownership Model

There is one physical PostgreSQL database. Isolation is logical:

- every user-owned table carries `user_id`,
- every read and write must scope to the authenticated user,
- no feature may bypass ownership checks,
- and future row-level security can be evaluated later.

## Deferred Technical Complexity

The following are intentionally deferred:

- browser extension architecture,
- sync engine for multiple providers,
- message ingestion pipelines,
- generalized custom field engine,
- and mobile/offline data synchronization.
