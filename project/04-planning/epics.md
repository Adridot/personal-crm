# Epics

## Epic 1: Project Bootstrap and Monorepo Setup

- Objective: establish the repository, workspace tooling, local runtime, and documentation-linked developer baseline.
- Included scope: frontend app shell, backend app shell, shared tooling, Dockerized Postgres, base scripts.
- Excluded scope: product features.
- Dependencies: none.
- Acceptance signal: a new contributor can install, run, and understand the repo structure locally.

## Epic 2: Authentication and User Isolation

- Objective: secure access to all private data.
- Included scope: Better Auth, session handling, ownership checks, user bootstrap.
- Excluded scope: social login beyond what is needed for Google import.
- Dependencies: Epic 1.
- Acceptance signal: only authenticated users can access their own records.

## Epic 3: Google Contacts Import

- Objective: ingest Google contacts as the initial dataset.
- Included scope: OAuth connection, tracked import jobs, mapping, import history.
- Excluded scope: multi-provider import, duplicate merge.
- Dependencies: Epics 1 and 2.
- Acceptance signal: a user can connect Google and see imported contacts in the app.

## Epic 4: Contact Management

- Objective: provide a usable system of record for contacts.
- Included scope: contact CRUD, listing, search, filtering, fixed-field editing.
- Excluded scope: custom fields UI.
- Dependencies: Epics 1 and 2.
- Acceptance signal: the user can manage contacts without relying on raw import state.

## Epic 5: Tags, Groups, and Relationships

- Objective: add relationship context and classification.
- Included scope: groups, tags, contact group assignment, contact tagging, relationship links.
- Excluded scope: advanced taxonomy systems.
- Dependencies: Epic 4.
- Acceptance signal: contacts can be classified and linked meaningfully.

## Epic 6: Interaction Timeline

- Objective: capture contact history over time.
- Included scope: interaction model, timeline UI/API, chronology.
- Excluded scope: messaging ingestion.
- Dependencies: Epic 4.
- Acceptance signal: each contact can show manually recorded interaction history.

## Epic 7: Reminders and Dashboard

- Objective: turn the product into an action-oriented relationship tool.
- Included scope: reminders, recurrence support, dashboard aggregations, stale contact indicators.
- Excluded scope: Google Tasks sync, Google Calendar quick scheduling, and advanced AI suggestions.
- Dependencies: Epics 4, 5, and 6.
- Acceptance signal: the dashboard helps the user decide what to do next.

## Epic 8: Export and Account Deletion

- Objective: support privacy and user control requirements.
- Included scope: export endpoints, deletion workflow, deletion safety.
- Excluded scope: complex legal retention policies.
- Dependencies: Epics 2 through 7.
- Acceptance signal: user data can be exported and deleted cleanly.

## Epic 9: Frontend i18n and UX Foundation

- Objective: keep the frontend translation-ready and coherent.
- Included scope: translation plumbing, route shell, shared layout patterns.
- Excluded scope: full localization depth for every future feature.
- Dependencies: Epic 1.
- Acceptance signal: all visible MVP UI copy is translation-ready.

## Epic 10: Observability, Tests, CI/CD

- Objective: make the system safe to evolve.
- Included scope: baseline tests, lint/build automation, structured logging foundation.
- Excluded scope: heavy platform engineering.
- Dependencies: all prior epics.
- Acceptance signal: CI validates core behavior and the app emits enough operational signals for debugging.
