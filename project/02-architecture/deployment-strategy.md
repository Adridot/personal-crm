# Deployment Strategy

## Initial Deployment Philosophy

Start with the simplest environment model that supports development quality:

- local Docker for repeatable setup,
- GitHub Codespaces compatibility,
- and a path to simple hosted deployment later.

## Environment Model

### Local Development

- PostgreSQL via Docker.
- Frontend and backend run in local dev mode.
- Environment variables managed through local `.env` conventions.

### Codespaces

- Repository should remain compatible with cloud development environments.
- Setup should not assume a complex local-only machine configuration.

### Staging / Production Later

- Favor a simple PaaS or container-based target.
- Avoid Kubernetes unless real scale proves it necessary.

## CI/CD Baseline

GitHub Actions should eventually cover:

- install,
- lint,
- test,
- build,
- and migration checks.

The preferred execution model is root-level commands delegated through Turborepo so CI and local development use the same entry points.

## Database Migrations

- Use Drizzle migrations.
- Run migrations as part of the deployment flow.
- Keep migration history explicit and reviewable.

## Secrets Handling

- Store secrets in environment variables or platform secret stores.
- Never hard-code provider credentials.
- Separate local, staging, and production values cleanly.

## Anti-Goals

- No premature multi-environment orchestration layer.
- No complex microservice deployment topology.
- No infra features that distract from validating the product.
