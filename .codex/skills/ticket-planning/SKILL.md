---
name: ticket-planning
description: Build a decision-ready ticket plan before implementation. Use when a feature, refactor, architecture change, or bug fix needs scope definition, option analysis, risk framing, acceptance criteria, and execution slicing. Enforce a minimum of 5 clarification questions, block on crucial unresolved decisions, and split mixed frontend/backend work into separate sub-tickets.
---

# Ticket Planning

## Overview

Create high-quality, implementation-ready plans with explicit trade-offs and clear boundaries. Always standardize output, ask at least 5 questions, and stop on crucial unresolved decisions.

## Planning Workflow

1. Load context first.
- Read the user request, relevant docs, open issues, ADRs, and impacted code areas.
- Identify whether scope is frontend, backend, docs, or mixed.

2. Research current standards before proposing architecture.
- Use official documentation and known repositories for the technologies involved.
- Record sources in the output under `Standards & Sources`.
- Prefer primary sources over blogs.

3. Detect scope coupling early.
- If a ticket implies substantial frontend and backend work, split into two sub-tickets by default.
- Keep planning specialized to one phase whenever possible.
- Propose `frontend`, `backend`, and optional `docs` branches separately.

4. Enumerate options for each crucial decision.
- Provide 2-3 options with trade-offs, risks, and operational cost.
- Mark the recommended option explicitly and justify it.

5. Ask clarification questions.
- Ask a minimum of 5 questions.
- Do not cap the number of questions if more are needed.
- Mark each question as either `blocking` or `non-blocking`.

6. Enforce crucial-decision blocking.
- If any crucial decision is unresolved, stop and request user choice.
- Do not move to execution planning or coding while blocked.

7. Produce execution-ready slicing.
- Create phase order, dependencies, acceptance signals, and risks.
- Include branch naming aligned to:
  - `codex/<ticket>-backend`
  - `codex/<ticket>-frontend`
  - `codex/<ticket>-docs`
- Use `master` as base branch.

## Mandatory Output Format

Always output sections in this exact order:

1. `Context`
2. `Standards & Sources`
3. `Options`
4. `Recommended path`
5. `Questions for you`
6. `Execution plan`

Rules:
- `Questions for you` must contain at least 5 questions.
- `Standards & Sources` must include links.
- `Execution plan` must state if the ticket was split and why.
- Do not include implementation commands in planning output.

## Split Policy

If requested work is large and spans frontend and backend:
- Propose two sub-tickets by default.
- Keep each sub-ticket independently executable.
- Keep acceptance criteria separated by layer.

If requested work is tiny on one side and substantial on the other:
- Keep a primary ticket on the substantial side.
- Call out the small cross-layer change explicitly as a constrained dependency.

## Completion Criteria

A planning result is complete only when:
- all blocking decisions are answered,
- scope boundaries are explicit,
- risks and mitigations are stated,
- acceptance signals are testable,
- and issue/doc updates are listed as required follow-up.

## References

Load when needed:
- `references/planning-standards.md`
