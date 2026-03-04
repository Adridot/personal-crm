# ADR-0003: Approved Tech Stack

## Context

The backend and frontend stacks were explicitly discussed, along with alternatives such as Supabase and Convex.

## Decision

Use:

- NestJS for the backend,
- Drizzle ORM with PostgreSQL for persistence,
- Better Auth for authentication, integrated in NestJS through the selected community package,
- React + Vite for the frontend,
- TanStack Router for frontend routing,
- TanStack Query for frontend data fetching and cache management,
- Intlayer for frontend internationalization,
- shadcn/ui configured on top of Base UI primitives,
- and TanStack Start deferred unless the product later needs frontend server-runtime features that justify overlapping with NestJS.
- Zod for shared transport contract schemas and inferred TypeScript types.
- `pnpm` workspaces for dependency management.
- Turborepo for monorepo task orchestration.

## Alternatives Considered

- Convex as a backend platform.
- Supabase as a backend/auth/database platform.
- Vue or Svelte instead of React.
- React Router instead of TanStack Router.
- TanStack Start as the immediate frontend framework baseline.
- shadcn/ui on Radix primitives instead of Base UI.
- Bun as the primary package manager and runtime baseline.
- Managing frontend and backend scripts without a task orchestrator.

## Consequences

- Strong TypeScript consistency across the stack.
- Conventional relational data model and migrations.
- A temporary Better Auth compatibility pin in `apps/api` while the community Nest integration catches up with the latest Better Auth runtime line.
- Slightly more implementation work than choosing a backend platform product, but higher architectural control.
- A clear path to sharing validated API contracts without coupling frontend code to persistence models.
- A route-aware frontend architecture aligned with the wider TanStack family without forcing a full-stack framework pivot.
- Faster and more consistent monorepo task execution as the repository grows.
