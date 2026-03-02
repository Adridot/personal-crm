# Open Questions

These questions were intentionally left unresolved so they can be handled explicitly later instead of being decided accidentally in code.

| Question | Current Recommendation | Impact | When It Must Be Decided |
| --- | --- | --- | --- |
| Is Google Calendar quick scheduling part of MVP or optional MVP+? | Treat it as optional until the core reminder system is working. | Affects integration scope and Google permission surface. | Before building reminder-adjacent UX beyond the core MVP. |
| What reminder recurrence rules are required exactly? | Start with one-time, weekly, monthly, and yearly as the practical minimum. | Affects schema and reminder engine design. | Before implementing reminder recurrence storage. |
| Are groups distinct from tags in the data model? | Use tags as the committed MVP baseline and keep group semantics unresolved. | Affects schema, UI language, and filtering model. | Before contact classification implementation is finalized. |
| Should imports run synchronously or as tracked jobs from day one? | Start simple, but record import lifecycle in the `imports` table. | Affects API design and operational behavior. | Before Google import implementation. |
| Does relationship scoring appear in MVP dashboard or only V1? | Keep MVP dashboard simple; defer formal scoring to V1. | Prevents scope creep in dashboard work. | Before dashboard aggregation logic is finalized. |

## Working Rule

If a feature depends on one of these questions and the answer is still open, prefer the recommendation above and record the choice in an ADR or implementation note when it becomes final.
