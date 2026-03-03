# Architecture Overview

## Approved Technical Baseline

- Repository model: monorepo.
- Workspace tooling: `pnpm` workspaces + Turborepo.
- Frontend: React + Vite + TanStack Router + TanStack Query + shadcn/ui on Base UI.
- Backend: NestJS + Drizzle ORM + PostgreSQL + Better Auth.
- Shared contract strategy: a focused internal package will hold shared Zod schemas and inferred TypeScript types for transport-level contracts.
- API style: REST-first.
- Data isolation: one PostgreSQL database with logical per-user isolation via `user_id`.
- Reminder model: internal reminder system first.
- Reminder recurrence baseline: one-time, weekly, monthly, yearly.
- Import model: tracked jobs from day one.
- Internationalization: frontend strings must be translation-ready from day one.

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

- authenticated routes,
- translation-ready copy,
- dashboard and contacts views as first-class pages,
- TanStack Router as the routing baseline,
- TanStack Query for server data synchronization,
- UI primitives based on shadcn/ui configured for Base UI,
- and a Vite development server proxying `/api` calls to the NestJS backend.

TanStack Start was evaluated for the frontend, but it is intentionally deferred while NestJS remains the primary backend runtime. The additional full-stack features in TanStack Start are not needed for the MVP shell and would overlap with responsibilities already assigned to NestJS.

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
