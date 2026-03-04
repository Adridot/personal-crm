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
Better Auth also expects `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and the frontend origins allowed to call auth endpoints.

## Database Schema Workflow

1. Regenerate the Better Auth schema source:
   - `pnpm db:auth:generate`
2. Generate a new Drizzle migration:
   - `pnpm db:generate`
3. Apply pending migrations:
   - `pnpm db:migrate`
4. Explore the database schema locally:
   - `pnpm db:studio`

The API uses Better Auth's default core tables (`user`, `session`, `account`, `verification`) as the auth schema baseline.

## API

- Start the API in watch mode:
  - `pnpm dev:api`
- Health endpoint:
  - `http://localhost:3000/api/health`

The API reads environment variables from `apps/api/.env.local` first, then falls back to the root `.env` file.
