# ADR-0015: TanStack Frontend Baseline Without TanStack Start

## Context

The frontend bootstrap needed a routing and data-fetching baseline. The product already committed to React, Vite, NestJS as the backend, and a desire to use the TanStack ecosystem wherever it adds clear value. TanStack Start was evaluated as part of that discussion.

## Decision

Use:

- TanStack Router as the frontend routing baseline.
- TanStack Query as the frontend server-state and caching baseline.
- shadcn/ui configured for Base UI primitives, using the CLI in a controlled way.
- A plain Vite SPA for MVP frontend bootstrap.

Do not adopt TanStack Start in MVP. Re-evaluate it later only if the product needs frontend server-runtime features such as SSR, server functions, or framework-level middleware that justify overlap with the existing NestJS backend.

## Alternatives Considered

- React Router with TanStack Query.
- TanStack Start in SPA mode from day one.
- TanStack Start with broader full-stack responsibilities alongside NestJS.
- shadcn/ui on Radix primitives instead of Base UI.

## Consequences

- The frontend stays aligned with the TanStack ecosystem for routing and data access without introducing a second full-stack runtime model.
- NestJS remains the single primary backend execution environment.
- The project keeps a clean path to adopt other TanStack libraries later, such as Form, Table, or Virtual.
- If SSR or server-runtime needs become important later, TanStack Start can be revisited with a clearer justification.
