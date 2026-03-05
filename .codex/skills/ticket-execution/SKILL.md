---
name: ticket-execution
description: Execute an already validated ticket with strict scope control. Use when planning decisions are locked and implementation can begin. Enforce planning preconditions, avoid autonomous scope drift, keep frontend/backend work separated when substantial, and never commit/push/open PR unless explicitly requested by the user.
---

# Ticket Execution

## Overview

Implement a validated ticket predictably with minimal risk and clear traceability. Keep execution narrow, verify against current standards, and require explicit user approval for any VCS publishing actions.

## Preconditions

Execution starts only if all are true:

1. A planning artifact exists and is validated by the user.
2. Crucial decisions are resolved.
3. Scope target is explicit (`frontend`, `backend`, or `docs`).

If these are not satisfied, stop and request the missing prerequisite.

## Execution Workflow

1. Reconfirm scope and target layer.
- If the ticket is substantially frontend + backend, stop and propose split tickets.
- Continue only when one dominant layer is selected.

2. Research current standards before coding.
- Check official docs relevant to the touched stack.
- Prefer primary documentation and recognized repositories.
- Record links in the update message.

3. Implement only in-scope changes.
- Do not add unrelated refactors.
- Keep changes minimal and reversible.
- Avoid architecture expansion unless explicitly approved.

4. Ask questions only on blockers.
- Do not ask non-blocking questions unnecessarily.
- If blocked, present options and wait for user choice.

5. Validate rigorously.
- Run targeted checks for affected package(s).
- Run repo-level checks when requested by project policy or ticket scope.
- Report what was run and what could not be run.

6. Keep VCS publishing explicit.
- Never commit, push, or create PR unless user explicitly asks.
- Prepare clear commit grouping when requested.

7. Update traceability artifacts.
- Update the related issue status/details.
- Update impacted project docs/ADRs/backlog when behavior or architecture changed.

## Branch and Split Policy

Use `master` as default base branch.

Naming conventions:
- `codex/<ticket>-backend`
- `codex/<ticket>-frontend`
- `codex/<ticket>-docs`

If a requested ticket spans major frontend and backend work:
- Stop execution and propose split into two execution tickets.
- Resume once user confirms the split and target ticket.

## Output Format During Execution

Use concise status updates with:
- `Scope`
- `Standards checked`
- `Changes made`
- `Validation`
- `Open blockers` (if any)
- `Docs/issue updates`

## Completion Criteria

Execution is complete when:
- in-scope implementation is done,
- validations were executed and reported,
- docs/issue were aligned,
- and no unresolved blocker remains.

## References

Load when needed:
- `references/execution-standards.md`
