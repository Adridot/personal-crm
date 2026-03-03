# ADR-0003: Approved Tech Stack

## Context

The backend and frontend stacks were explicitly discussed, along with alternatives such as Supabase and Convex.

## Decision

Use:

- NestJS for the backend,
- Drizzle ORM with PostgreSQL for persistence,
- Better Auth for authentication,
- React + Vite for the frontend,
- shadcn/ui and TanStack Query for frontend UX and data handling.
- Zod for shared transport contract schemas and inferred TypeScript types.
- `pnpm` workspaces for dependency management.
- Turborepo for monorepo task orchestration.

## Alternatives Considered

- Convex as a backend platform.
- Supabase as a backend/auth/database platform.
- Vue or Svelte instead of React.
- Bun as the primary package manager and runtime baseline.
- Managing frontend and backend scripts without a task orchestrator.

## Consequences

- Strong TypeScript consistency across the stack.
- Conventional relational data model and migrations.
- Slightly more implementation work than choosing a backend platform product, but higher architectural control.
- A clear path to sharing validated API contracts without coupling frontend code to persistence models.
- Faster and more consistent monorepo task execution as the repository grows.
