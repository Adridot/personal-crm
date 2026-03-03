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

## Local Database

1. Copy the local environment template:
   - `cp .env.example .env`
2. Start PostgreSQL:
   - `pnpm db:up`
3. Stream database logs:
   - `pnpm db:logs`
4. Stop local services:
   - `pnpm db:down`
5. Reset the local database volume:
   - `pnpm db:reset`

The local database runs PostgreSQL 18 through Docker Compose and expects `DATABASE_URL` in the root `.env` file.
