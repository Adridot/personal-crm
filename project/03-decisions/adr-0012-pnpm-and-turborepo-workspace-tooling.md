# ADR-0012: pnpm and Turborepo Workspace Tooling

## Context

The repository is starting as a TypeScript monorepo with at least a frontend app, a backend API, shared planning docs, and an expected need for future internal packages. The workspace bootstrap needs a package manager and an orchestration layer that stay simple at small scale but remain useful as the repository grows.

## Decision

Use:

- `pnpm` workspaces for dependency management and local package linking.
- Turborepo for task orchestration, caching, and package-aware execution.
- Root package-aware commands such as `dev`, `build`, `lint`, `test`, and `typecheck` should delegate to `turbo run ...`.
- Task implementations should live in the relevant workspace `package.json` files.
- Repo-wide quality commands such as `check`, `fix`, and `format` should run directly from the root against the shared Biome and Ultracite configuration.
- Package-scoped execution should use `turbo run ... --filter=...` or `pnpm --filter ...` instead of custom root scripts per package.

## Alternatives Considered

- Bun as the primary package manager and runtime baseline.
- `pnpm` workspaces without a task orchestrator.
- Other monorepo orchestrators such as Nx.

## Consequences

- The repo gets a conventional workspace model with explicit package boundaries.
- Local and CI entry points stay consistent: Turborepo handles package-aware tasks, while root quality commands remain simple, repo-wide, and aligned with the underlying tool names.
- Package tasks can be cached, filtered, and parallelized as more apps and internal packages are added.
- The workspace baseline stays compatible with adding focused internal packages later without reworking command structure.
