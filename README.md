# personal-crm

Project planning and architecture documentation live in [project/README.md](project/README.md).

## Workspace Commands

- `pnpm dev`
- `pnpm dev:web`
- `pnpm dev:api`
- `pnpm build`
- `pnpm lint`
- `pnpm check`
- `pnpm fix`
- `pnpm format`
- `pnpm test`
- `pnpm typecheck`

## Standard Workflow

- Package-aware tasks use Turborepo from the root: `dev`, `build`, `lint`, `test`, and `typecheck` all delegate to `turbo run ...`.
- Task implementations live in each workspace package so they stay cacheable and can be targeted with `--filter`.
- Repo-wide code quality commands run directly at the root against the shared Biome and Ultracite config: `pnpm check`, `pnpm fix`, and `pnpm format`.
- To run a task for one package, prefer `turbo run <task> --filter=<package>` or `pnpm --filter <package> <task>`.
- CI should prefer non-mutating root commands: `pnpm check`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
