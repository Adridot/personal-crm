# MVP Backlog

This backlog is intentionally issue-ready. Each item is sized to roughly 1 to 2 days of focused work.

## MVP-001: Initialize monorepo workspace

- Objective: create the repository workspace structure for frontend, backend, and shared tooling.
- Scope: workspace config, package manager choice, root scripts, base ignore rules, developer entry points.
- Implementation notes: keep the setup conventional and compatible with Codespaces.
- Dependencies: none.
- Acceptance criteria: repo installs cleanly and exposes documented root commands for dev, build, and test.
- Estimate: 1 day

## MVP-002: Add local PostgreSQL and environment baseline

- Objective: provide a repeatable local database runtime.
- Scope: Docker setup, env templates, connection configuration, startup instructions.
- Implementation notes: keep this minimal and production-agnostic.
- Dependencies: MVP-001.
- Acceptance criteria: a contributor can start PostgreSQL locally and the backend can connect to it.
- Estimate: 1 day

## MVP-003: Bootstrap NestJS API application

- Objective: establish the backend project skeleton.
- Scope: NestJS app creation, module layout, health route, config loading.
- Implementation notes: define domain module placeholders early.
- Dependencies: MVP-001, MVP-002.
- Acceptance criteria: backend boots locally and exposes a basic health endpoint.
- Estimate: 1 day

## MVP-004: Bootstrap React frontend application

- Objective: establish the frontend project skeleton.
- Scope: Vite app, route shell, shadcn/ui baseline, TanStack Query setup.
- Implementation notes: do not build feature pages yet.
- Dependencies: MVP-001.
- Acceptance criteria: frontend boots locally and renders an application shell.
- Estimate: 1 day

## MVP-005: Add frontend i18n foundation

- Objective: make all future UI strings translation-ready.
- Scope: translation provider, locale files, shared translation helpers, initial English and French scaffolding.
- Implementation notes: translate shell pages and auth screens first.
- Dependencies: MVP-004.
- Acceptance criteria: visible shell strings resolve through the translation layer.
- Estimate: 1 day

## MVP-006: Add Drizzle schema and migration baseline

- Objective: introduce database schema management.
- Scope: Drizzle config, migration pipeline, initial user-related schema.
- Implementation notes: keep schema ownership explicit from the start.
- Dependencies: MVP-002, MVP-003.
- Acceptance criteria: migrations run successfully against local PostgreSQL.
- Estimate: 1 day

## MVP-007: Integrate Better Auth

- Objective: support account registration, login, logout, and session retrieval.
- Scope: Better Auth wiring, backend adapter integration, frontend auth bootstrapping.
- Implementation notes: follow secure defaults.
- Dependencies: MVP-003, MVP-004, MVP-006.
- Acceptance criteria: a user can register, log in, and maintain a valid session.
- Estimate: 2 days

## MVP-008: Enforce authenticated route protection

- Objective: prevent anonymous access to protected resources.
- Scope: backend guards or middleware, frontend route gating, session checks.
- Implementation notes: keep auth failures consistent.
- Dependencies: MVP-007.
- Acceptance criteria: protected routes are inaccessible without a valid session.
- Estimate: 1 day

## MVP-009: Implement user ownership enforcement pattern

- Objective: standardize `user_id` scoping across backend reads and writes.
- Scope: repository/service conventions, helper utilities, test coverage.
- Implementation notes: this is a security-critical foundation item.
- Dependencies: MVP-006, MVP-007.
- Acceptance criteria: no user-owned query path operates without explicit ownership scoping.
- Estimate: 1 day

## MVP-010: Create contacts schema

- Objective: introduce the core `contacts` persistence model.
- Scope: Drizzle schema, migrations, fixed fields, timestamps.
- Implementation notes: exclude custom fields from MVP schema commitments.
- Dependencies: MVP-006.
- Acceptance criteria: contacts table exists and matches the approved fixed-field model.
- Estimate: 1 day

## MVP-011: Implement contact repository and service layer

- Objective: create the backend domain logic for contacts.
- Scope: create, read, update, delete, list, search scaffolding.
- Implementation notes: keep service boundaries clean for future import reuse.
- Dependencies: MVP-009, MVP-010.
- Acceptance criteria: contact service supports CRUD and list operations for one user.
- Estimate: 1 day

## MVP-012: Expose contacts REST endpoints

- Objective: make contact operations available through the API.
- Scope: list, detail, create, update, delete endpoints.
- Implementation notes: include validation and consistent error responses.
- Dependencies: MVP-011.
- Acceptance criteria: contacts endpoints work end-to-end for authenticated users.
- Estimate: 1 day

## MVP-013: Build contacts list page

- Objective: provide the primary contact browsing interface.
- Scope: paginated list UI, search input, loading and empty states.
- Implementation notes: use TanStack Query for fetching.
- Dependencies: MVP-012, MVP-004, MVP-005.
- Acceptance criteria: user can browse and search owned contacts from the frontend.
- Estimate: 1 day

## MVP-014: Build contact detail and edit page

- Objective: support direct contact management in the UI.
- Scope: contact detail view, edit form, delete action, fixed fields only.
- Implementation notes: keep UX simple and translation-ready.
- Dependencies: MVP-012, MVP-013.
- Acceptance criteria: user can view, edit, and delete a contact from the UI.
- Estimate: 2 days

## MVP-015: Create tags schema and API

- Objective: support contact classification.
- Scope: tags table, tag CRUD endpoints, ownership checks.
- Implementation notes: do not over-model groups yet.
- Dependencies: MVP-006, MVP-009.
- Acceptance criteria: authenticated users can create and manage tags.
- Estimate: 1 day

## MVP-016: Add contact-tag assignments and filtering

- Objective: attach tags to contacts and filter by them.
- Scope: join table, assignment endpoints or contact payload handling, list filtering.
- Implementation notes: tags are the minimum guaranteed classification model.
- Dependencies: MVP-012, MVP-015.
- Acceptance criteria: contacts can be tagged and filtered by assigned tags.
- Estimate: 1 day

## MVP-017: Record the groups modeling decision

- Objective: resolve or temporarily constrain the groups concept for MVP delivery.
- Scope: document whether groups are separate entities or not, and align UI wording.
- Implementation notes: this may result in "tags only for MVP" if no separate model is justified.
- Dependencies: MVP-015, MVP-016.
- Acceptance criteria: docs and backlog remain internally consistent about groups.
- Estimate: 0.5 to 1 day

## MVP-018: Create relationships schema and API

- Objective: support semantic links between contacts.
- Scope: relationship table, create/delete endpoints, allowed relationship types.
- Implementation notes: ensure both linked contacts belong to the same user.
- Dependencies: MVP-010, MVP-009.
- Acceptance criteria: user can create and remove relationship links between owned contacts.
- Estimate: 1 day

## MVP-019: Add relationships UI to contact detail

- Objective: surface contact-to-contact links in the frontend.
- Scope: relationship listing, add flow, remove flow.
- Implementation notes: keep the relationship type set simple in MVP.
- Dependencies: MVP-018, MVP-014.
- Acceptance criteria: user can manage relationships from a contact page.
- Estimate: 1 day

## MVP-020: Create interactions schema and service

- Objective: support the manual relationship timeline.
- Scope: interaction table, allowed interaction types, service layer.
- Implementation notes: prioritize chronology and simplicity.
- Dependencies: MVP-010, MVP-009.
- Acceptance criteria: interactions can be stored and queried by contact.
- Estimate: 1 day

## MVP-021: Expose interaction endpoints and timeline UI

- Objective: let users record and inspect interactions.
- Scope: API endpoints, add interaction form, timeline rendering.
- Implementation notes: keep the interaction model compact.
- Dependencies: MVP-020, MVP-014.
- Acceptance criteria: user can add an interaction and see it appear on the contact timeline.
- Estimate: 2 days

## MVP-022: Create reminders schema and recurrence model

- Objective: support scheduled follow-up reminders.
- Scope: reminders table, recurrence representation, status field design.
- Implementation notes: keep rules simple but explicit.
- Dependencies: MVP-006, MVP-009.
- Acceptance criteria: reminder records support one-time and recurring use cases.
- Estimate: 1 day

## MVP-023: Expose reminder endpoints

- Objective: make reminders manageable through the API.
- Scope: list, create, update, delete reminder endpoints.
- Implementation notes: contact-linked reminders are the primary use case.
- Dependencies: MVP-022.
- Acceptance criteria: authenticated users can manage reminders for their own contacts.
- Estimate: 1 day

## MVP-024: Build reminders UI flows

- Objective: make reminders usable from the frontend.
- Scope: reminder creation, editing, completion state, due-date views.
- Implementation notes: no Google Tasks sync.
- Dependencies: MVP-023, MVP-014.
- Acceptance criteria: user can create and manage reminders through the UI.
- Estimate: 2 days

## MVP-025: Create Google OAuth connection flow for import

- Objective: obtain Google authorization for contact import.
- Scope: provider setup, OAuth callback handling, token storage rules.
- Implementation notes: treat provider tokens as sensitive.
- Dependencies: MVP-007.
- Acceptance criteria: a user can connect a Google account successfully.
- Estimate: 2 days

## MVP-026: Implement Google People API import mapping

- Objective: map Google contact data into the local contacts model.
- Scope: provider client, mapping logic, import normalization.
- Implementation notes: imported data should remain compatible with contact CRUD.
- Dependencies: MVP-025, MVP-010.
- Acceptance criteria: Google contacts can be transformed into local contact records.
- Estimate: 2 days

## MVP-027: Add import execution endpoint and import history

- Objective: make imports observable and repeatable.
- Scope: import trigger endpoint, `imports` table usage, status updates.
- Implementation notes: start simple; background jobs are not mandatory unless needed.
- Dependencies: MVP-026.
- Acceptance criteria: the app records when imports start, finish, or fail.
- Estimate: 1 day

## MVP-028: Build Google import UI

- Objective: let users trigger contact import from the frontend.
- Scope: connect flow, import action, status display, error states.
- Implementation notes: keep UX explicit and safe.
- Dependencies: MVP-027, MVP-013.
- Acceptance criteria: user can connect Google, run an import, and see status feedback in the UI.
- Estimate: 2 days

## MVP-029: Add dashboard aggregation endpoint

- Objective: support a focused action dashboard.
- Scope: due reminders, stale contacts, simple counts, minimal activity signals.
- Implementation notes: do not implement V1 connection scoring here.
- Dependencies: MVP-021, MVP-023, MVP-012.
- Acceptance criteria: one endpoint returns the data required by the MVP dashboard.
- Estimate: 1 day

## MVP-030: Build dashboard page

- Objective: deliver the core "what should I do now?" experience.
- Scope: reminders section, stale contact section, lightweight summary widgets.
- Implementation notes: keep the UI intentionally simple.
- Dependencies: MVP-029, MVP-005.
- Acceptance criteria: authenticated users land on a working dashboard after login.
- Estimate: 2 days

## MVP-031: Implement account export

- Objective: satisfy data portability requirements.
- Scope: export endpoint, exported file shape, frontend trigger.
- Implementation notes: JSON is acceptable even if CSV is added later.
- Dependencies: MVP-012, MVP-021, MVP-023.
- Acceptance criteria: user can export their owned data from the application.
- Estimate: 1 day

## MVP-032: Implement account deletion flow

- Objective: satisfy account and data deletion requirements.
- Scope: backend deletion path, frontend confirmation flow, owned data cleanup.
- Implementation notes: deletion must be explicit and irreversible.
- Dependencies: MVP-031, MVP-007.
- Acceptance criteria: a user can delete their account and owned records cleanly.
- Estimate: 1 day

## MVP-033: Add structured logging foundation

- Objective: make core flows diagnosable.
- Scope: request logging, import logging, error logging conventions.
- Implementation notes: do not log sensitive tokens or raw private payloads.
- Dependencies: MVP-003.
- Acceptance criteria: backend emits structured logs for key flows.
- Estimate: 1 day

## MVP-034: Add backend integration tests for ownership-sensitive routes

- Objective: reduce regression risk on security-critical paths.
- Scope: tests for contacts, interactions, reminders, and ownership filtering.
- Implementation notes: prioritize cross-user access prevention scenarios.
- Dependencies: MVP-012, MVP-021, MVP-023.
- Acceptance criteria: tests fail if unauthorized cross-user access becomes possible.
- Estimate: 2 days

## MVP-035: Add end-to-end happy path test

- Objective: verify the main user workflow from login to dashboard.
- Scope: auth, contact import, contact view, interaction creation, reminder creation.
- Implementation notes: external providers should be mocked in test environments.
- Dependencies: MVP-028, MVP-030.
- Acceptance criteria: one automated e2e flow covers the main MVP user journey.
- Estimate: 2 days

## MVP-036: Add GitHub Actions CI baseline

- Objective: prevent silent regressions.
- Scope: install, lint, test, and build workflow.
- Implementation notes: keep the pipeline lean enough to stay fast.
- Dependencies: MVP-033, MVP-034, MVP-035.
- Acceptance criteria: CI runs automatically and blocks obvious breakage.
- Estimate: 1 day
