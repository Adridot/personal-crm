# ADR-0002: Monorepo

## Context

The product includes a frontend application, a backend API, shared technical decisions, and a large amount of project-level documentation. Coordination overhead should stay low while the product is still small.

## Decision

Use a monorepo for the frontend, backend, and shared planning assets.

## Alternatives Considered

- Separate repositories for frontend and backend.
- Separate repositories plus shared tooling repository.

## Consequences

- Simpler coordination and issue tracking early on.
- Easier shared CI and local development.
- Future repository split remains possible if the codebase becomes much larger.
