# V1 Backlog

This backlog is still issue-ready, but it is intentionally sequenced after MVP stabilization.

## V1-001: Add Apple/iCloud import research spike

- Objective: validate the technical path and policy constraints for iCloud contact import.
- Scope: provider capabilities, auth model, data mapping feasibility.
- Implementation notes: capture unknowns before coding.
- Dependencies: MVP Google import completion.
- Acceptance criteria: documented implementation plan for iCloud import exists.
- Estimate: 1 day

## V1-002: Implement Apple/iCloud import flow

- Objective: support iCloud as the second approved contact source.
- Scope: auth flow, import service, mapping, import history integration.
- Implementation notes: keep the import lifecycle consistent with Google.
- Dependencies: V1-001.
- Acceptance criteria: users can import contacts from iCloud.
- Estimate: 2 days

## V1-003: Add additional source connector framework

- Objective: prepare for social or directory sources beyond Google and Apple.
- Scope: connector abstraction, provider metadata, import pipeline conventions.
- Implementation notes: avoid premature abstraction until at least two providers exist.
- Dependencies: V1-002.
- Acceptance criteria: the codebase supports adding a third provider without duplicating import logic blindly.
- Estimate: 2 days

## V1-004: Define duplicate review domain model

- Objective: support duplicate detection once multiple sources exist.
- Scope: duplicate candidate model, review states, merge decision structure.
- Implementation notes: keep human validation in the loop.
- Dependencies: multiple source import support.
- Acceptance criteria: duplicate suggestions can be stored and reviewed.
- Estimate: 1 day

## V1-005: Implement AI-assisted duplicate suggestion pipeline

- Objective: generate likely duplicate matches across imported sources.
- Scope: provider payload comparison, AI provider integration, confidence thresholds.
- Implementation notes: suggestions only, never auto-merge silently.
- Dependencies: V1-004.
- Acceptance criteria: the system can generate merge suggestions for user review.
- Estimate: 2 days

## V1-006: Build duplicate review UI

- Objective: let users inspect and approve merge suggestions.
- Scope: review list, compare view, accept/reject flow.
- Implementation notes: ensure merge actions are reversible or well-audited.
- Dependencies: V1-005.
- Acceptance criteria: users can validate or reject duplicate suggestions from the UI.
- Estimate: 2 days

## V1-007: Add follow-up cadence settings

- Objective: let users define how often they want to stay in touch with specific contacts or categories.
- Scope: cadence fields, defaults, per-contact or per-tag configuration.
- Implementation notes: keep configuration understandable.
- Dependencies: MVP reminders and tags.
- Acceptance criteria: cadence preferences can be stored and edited.
- Estimate: 1 day

## V1-008: Implement connection score calculation

- Objective: surface relationship health signals.
- Scope: score formula, dashboard integration, stale-threshold interpretation.
- Implementation notes: start with deterministic rules before adding AI adjustments.
- Dependencies: V1-007, MVP interactions.
- Acceptance criteria: contacts receive a visible score or status derived from relationship data.
- Estimate: 2 days

## V1-009: Add contact task preset model

- Objective: support one-click contact actions.
- Scope: preset action definitions, contact-level task creation flow.
- Implementation notes: keep tasks tied to contacts, not a generic task board.
- Dependencies: MVP reminders/contact detail.
- Acceptance criteria: a contact can generate a preset follow-up action.
- Estimate: 1 day

## V1-010: Build contact task preset UI

- Objective: expose quick actions on contact pages.
- Scope: preset buttons, custom contact task entry, state updates.
- Implementation notes: examples include "send a message" and "plan a drink."
- Dependencies: V1-009.
- Acceptance criteria: the user can create contact-scoped follow-up actions from the UI.
- Estimate: 1 day

## V1-011: Implement intelligent task suggestion foundation

- Objective: begin automatic suggestion of useful follow-up actions.
- Scope: rule-based suggestion engine seeded by interaction history and cadence.
- Implementation notes: keep the first version explainable.
- Dependencies: V1-008, V1-009.
- Acceptance criteria: the app can propose simple context-based follow-up suggestions.
- Estimate: 2 days

## V1-012: Add gifts, debts, and gift ideas schema

- Objective: enrich contact context with life-oriented metadata.
- Scope: persistence model, CRUD endpoints, ownership checks.
- Implementation notes: treat these as optional relationship annotations.
- Dependencies: MVP contacts.
- Acceptance criteria: gifts, debts, and gift ideas can be stored against contacts.
- Estimate: 1 day

## V1-013: Build gifts, debts, and gift ideas UI

- Objective: expose the new relationship metadata in the frontend.
- Scope: contact detail panels, create/edit/delete flows.
- Implementation notes: avoid bloating the main contact view.
- Dependencies: V1-012.
- Acceptance criteria: users can manage gifts, debts, and ideas from the contact UI.
- Estimate: 2 days

## V1-014: Add public API planning pass

- Objective: define which internal capabilities should be exposed externally first.
- Scope: API scope review, auth strategy, rate-limit notes, security constraints.
- Implementation notes: this can remain a design ticket if implementation is not prioritized.
- Dependencies: MVP stabilization.
- Acceptance criteria: documented public API surface proposal exists.
- Estimate: 1 day
