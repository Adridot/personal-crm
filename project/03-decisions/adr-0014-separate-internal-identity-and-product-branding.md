# ADR-0014: Separate Internal Identity and Product Branding

## Context

The project may be renamed in the future, but the repository, package names, scripts, and local infrastructure already use `personal-crm` as a technical identifier. Renaming those technical identifiers repeatedly would create unnecessary churn across workspace tooling, package imports, CI, local environments, and documentation maintenance.

At the same time, user-visible naming should not be hard-coded in many places if the product brand changes later.

## Decision

Keep `personal-crm` as the stable internal technical identity unless there is a compelling operational reason to change it.

Separate that internal identity from product branding:

- technical identifiers stay stable, for example repository naming, workspace package names, local database naming, and internal slugs used by tools;
- user-visible branding should be centralized in a dedicated configuration module;
- environment variables should be used for values that vary by deployment, not for every branding string by default.

The first implementation of this branding separation should be a focused brand configuration module rather than a broad runtime templating system.

## Alternatives Considered

- Make repository, package, and infrastructure identifiers easily renameable everywhere.
- Rename internal package names and local infrastructure identifiers whenever the product brand changes.
- Push all branding into environment variables from the start.
- Keep user-visible naming scattered across frontend and backend code.

## Consequences

- Technical tooling remains stable even if the marketed product name changes.
- Rebranding work becomes mostly a change to centralized brand configuration and user-visible assets.
- The repo avoids premature abstraction and templating complexity.
- Future white-label or multi-brand requirements remain possible, but they are not forced into the architecture early.
