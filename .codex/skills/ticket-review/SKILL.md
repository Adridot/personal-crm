---
name: ticket-review
description: Perform rigorous ticket and pull request reviews with adaptive checklists and evidence-based findings. Use when reviewing code changes, validating AI review comments, or preparing merge decisions. Output findings first with P0-P3 severity, confidence, file:line, and concrete fix recommendations.
---

# Ticket Review

## Overview

Run high-signal reviews that prioritize correctness, security, and regression risk. Keep the process adaptive to changed files, and validate disputed claims against official documentation before accepting them.

## Review Workflow

1. Build review context.
- Read ticket/PR goal, changed files, and relevant architecture docs.
- Identify impacted layers (frontend, backend, DB, infra, docs).

2. Select an adaptive checklist.
- Choose review dimensions based on touched code:
  - correctness and behavior regressions,
  - security and data handling,
  - performance and scalability,
  - architecture consistency,
  - tests and observability.

3. Evaluate AI-generated review comments when provided.
- Classify each external comment as `accept`, `reject`, or `needs clarification`.
- Verify technical claims against official docs before accepting.
- Do not auto-apply suggestions.

4. Produce findings-first output.
- Findings must be sorted by severity (P0 to P3).
- Include confidence and precise location.
- Keep summaries secondary.

## Severity and Confidence Model

- `P0`: Critical bug/security/data-loss risk. Must be fixed before merge.
- `P1`: High-impact functional issue or major regression risk.
- `P2`: Medium risk, maintainability/performance/correctness concern.
- `P3`: Minor issue, clarity/readability/non-critical improvement.

Confidence scale:
- `0.90-1.00`: Strong evidence from code path or authoritative spec.
- `0.70-0.89`: Likely issue with solid indicators but partial uncertainty.
- `0.50-0.69`: Plausible concern needing confirmation.
- `<0.50`: Do not raise as a formal finding; move to open question.

## Mandatory Finding Schema

Each finding must include:
- `severity`: `P0 | P1 | P2 | P3`
- `confidence`: decimal in `[0,1]`
- `file:line`: precise location
- `title`: short label
- `impact`: concrete risk
- `fix recommendation`: actionable correction

## Mandatory Output Order

1. `Findings` (sorted by severity, highest first)
2. `AI comment triage` (`accept/reject/needs clarification` with rationale and source)
3. `Open questions / assumptions`
4. `Change summary` (brief)
5. `Residual risks / test gaps`

If there are no findings:
- State that explicitly.
- Still report residual risks or missing validation.

## Review Rules

- Focus on behavior, bugs, regressions, and security first.
- Avoid low-value style nitpicks unless they hide real risk.
- Prefer evidence over speculation.
- Include exact file references for every finding.

## References

Load when needed:
- `references/review-standards.md`
