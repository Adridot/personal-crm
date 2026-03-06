# Open Questions

The initial high-priority questions from the planning phase have now been resolved.

## Active Open Questions

| Question | Why It Is Open |
| --- | --- |
| Should the frontend keep `GET /api/account/me` as the stable current-user contract, or intentionally promote Better Auth `GET /api/auth/get-session` to that role? | Current frontend auth work can be implemented either way, but only one contract should become canonical. |
| When should auth/session payload schemas be promoted back into `packages/contracts`? | The contract package is still intentionally narrow, but session payloads are now close to becoming stable enough for promotion. |

## Recently Resolved Decisions

| Question | Final Decision | Impact |
| --- | --- | --- |
| Is Google Calendar quick scheduling part of MVP or optional MVP+? | Backlog only, not part of MVP. | Keeps the reminder scope smaller and avoids unnecessary Google Calendar complexity. |
| What reminder recurrence rules are required exactly? | One-time, weekly, monthly, and yearly. | Defines the minimum recurrence model for MVP reminders. |
| Are groups distinct from tags in the data model? | Yes. Groups are first-class entities; tags remain descriptive labels. | Shapes the contact schema, filters, and future scoring model. |
| Should imports run synchronously or as tracked jobs from day one? | Tracked jobs immediately. | Changes import API design, status visibility, and observability. |
| Does relationship scoring appear in MVP dashboard or only V1? | Only V1. | Keeps MVP dashboard intentionally simple. |

## Working Rule

If new high-impact ambiguities appear, add them here only if they are truly unresolved and cannot be decided from the approved product and architecture baseline.
