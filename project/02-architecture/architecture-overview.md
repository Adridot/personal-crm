# Architecture Overview

## Approved Technical Baseline

- Repository model: monorepo.
- Frontend: React + Vite + shadcn/ui + TanStack Query.
- Backend: NestJS + Drizzle ORM + PostgreSQL + Better Auth.
- API style: REST-first.
- Data isolation: one PostgreSQL database with logical per-user isolation via `user_id`.
- Reminder model: internal reminder system first.
- Reminder recurrence baseline: one-time, weekly, monthly, yearly.
- Import model: tracked jobs from day one.
- Internationalization: frontend strings must be translation-ready from day one.

## Guiding Principles

- Keep implementation simple enough for local Docker and Codespaces development.
- Optimize for clean domain boundaries before adding integrations.
- Avoid early infrastructure complexity.
- Preserve room for future integrations without hard-coding them into MVP.
- Prefer explicit data ownership checks to hidden magic.

## Monorepo Shape

The monorepo should eventually support at least:

- a frontend application,
- a backend API,
- shared types or utilities where useful,
- infrastructure or tooling configuration,
- and documentation under `project/`.

Exact workspace tooling is an implementation detail, but the documentation assumes a unified repository lifecycle.

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
- TanStack Query for server data synchronization,
- and UI primitives based on shadcn/ui.

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
