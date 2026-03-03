# ADR-0012: pnpm and Turborepo Workspace Tooling

## Context

The repository is starting as a TypeScript monorepo with at least a frontend app, a backend API, shared planning docs, and an expected need for future internal packages. The workspace bootstrap needs a package manager and an orchestration layer that stay simple at small scale but remain useful as the repository grows.

## Decision

Use:

- `pnpm` workspaces for dependency management and local package linking.
- Turborepo for task orchestration, caching, and package-aware execution.

Root scripts should delegate to `turbo run ...`, while task implementations live in the relevant package scripts.

## Alternatives Considered

- Bun as the primary package manager and runtime baseline.
- `pnpm` workspaces without a task orchestrator.
- Other monorepo orchestrators such as Nx.

## Consequences

- The repo gets a conventional workspace model with explicit package boundaries.
- Local and CI entry points stay consistent through root commands delegated to Turborepo.
- Package tasks can be cached, filtered, and parallelized as more apps and internal packages are added.
- The workspace baseline stays compatible with adding focused internal packages later without reworking command structure.
