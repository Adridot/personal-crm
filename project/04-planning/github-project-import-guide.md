# GitHub Project Import Guide

This file explains how to convert the markdown backlog into GitHub issues, labels, and milestones later.

## Recommended Labels

### Type

- `type:feature`
- `type:tech`
- `type:docs`

### Priority

- `priority:p0`
- `priority:p1`
- `priority:p2`

### Area

- `area:frontend`
- `area:backend`
- `area:db`
- `area:auth`
- `area:integrations`
- `area:observability`
- `area:testing`

### Version

- `version:mvp`
- `version:v1`
- `version:v2`

## Suggested Milestones

- `MVP Foundation`
- `MVP Beta`
- `V1 Integrations`
- `V2 Research`

## Issue Creation Order

1. Create all epics as umbrella issues or GitHub Project items.
2. Create `MVP-001` through `MVP-009` first, because they establish platform and security foundations.
3. Create contact management and classification issues next.
4. Create interactions, reminders, and dashboard issues after the contact model stabilizes.
5. Create export, deletion, tests, and CI tickets before calling MVP complete.

## Mapping Guidance

- Use ticket IDs from the markdown files in issue titles.
- Copy the ticket body directly into the GitHub issue description.
- Convert `Dependencies` into linked issues when available.
- Add milestone and labels during creation, not afterward.

## Suggested Label Mapping

Examples:

- `MVP-007 Integrate Better Auth`
  - `type:feature`
  - `priority:p0`
  - `area:auth`
  - `version:mvp`

- `MVP-033 Add structured logging foundation`
  - `type:tech`
  - `priority:p1`
  - `area:observability`
  - `version:mvp`

- `V1-005 Implement AI-assisted duplicate suggestion pipeline`
  - `type:feature`
  - `priority:p1`
  - `area:integrations`
  - `version:v1`

## Practical Import Strategy

- Start with the MVP backlog only.
- Keep V1 and V2+ in markdown until MVP work begins.
- Avoid creating hundreds of future issues too early; promote them when the previous phase is stable.
