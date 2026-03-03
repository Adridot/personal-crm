# Project Documentation Workspace

This `project/` folder is the canonical planning baseline for `personal-crm`.

It exists to do four things:

1. Preserve the original planning conversation in an archival format.
2. Convert that conversation into stable, readable documentation.
3. Produce an issue-ready backlog for later GitHub project setup.
4. Freeze MVP, V1, and V2+ scope boundaries before implementation starts.

## Current Status

- Planning: complete enough to start repository bootstrap work.
- Architecture: baseline approved.
- Workspace baseline: `pnpm` workspaces + `Turborepo`, with a focused internal contracts package strategy.
- Frontend baseline: `React + Vite + TanStack Router + TanStack Query + shadcn/ui` on `Base UI`.
- Frontend framework posture: TanStack Start has been evaluated and deferred while NestJS remains the primary backend.
- Implementation: bootstrap work is in progress.
- Documentation language: English, except for archival transcript content.

## Read This First

1. [PRD](01-product/prd.md)
2. [Architecture Overview](02-architecture/architecture-overview.md)
3. [Decision Log](03-decisions/)
4. [MVP Backlog](04-planning/backlog-mvp.md)

## Folder Map

- [00-context](00-context/)
  - Product vision, planning transcript, and external references.
- [01-product](01-product/)
  - Product summary, canonical PRD, scope boundaries, and feature catalog.
- [02-architecture](02-architecture/)
  - Technical architecture, domain model, API design, security, testing, and deployment notes.
- [03-decisions](03-decisions/)
  - ADRs for major architectural and product decisions.
- [04-planning](04-planning/)
  - Roadmap, epics, issue-ready backlog, and GitHub import guidance.
- [05-open-questions](05-open-questions/)
  - Open product questions plus known risks and mitigations.

## Conventions

- `MVP` means the first implementation scope that should be built.
- `V1` means the first meaningful expansion after MVP stabilization.
- `V2+` means deferred or exploratory work.
- A feature marked as deferred must not silently move into MVP implementation.
- Current account model is `one account = one user`.

## Canonical Sources

- Product intent: [01-product/prd.md](01-product/prd.md)
- Scope boundaries: [01-product/scope-mvp-v1-v2.md](01-product/scope-mvp-v1-v2.md)
- Technical baseline: [02-architecture/architecture-overview.md](02-architecture/architecture-overview.md)
- Final planning decisions: [03-decisions](03-decisions/)
- Execution plan: [04-planning/backlog-mvp.md](04-planning/backlog-mvp.md)
