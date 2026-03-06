# Risks and Mitigations

| Risk | Why It Matters | Initial Mitigation |
| --- | --- | --- |
| External provider policy risk | Google, Apple, social, or messaging providers may restrict access patterns or require compliance reviews. | Keep MVP limited to Google Contacts and validate each new provider before building. |
| OAuth token security | Imported contact access depends on sensitive provider credentials. | Encrypt or otherwise securely store tokens, restrict access paths, and avoid logging secrets. |
| Duplicate merge complexity | Duplicate detection becomes difficult once multiple sources exist. | Defer merge logic until V1 and keep humans in the approval loop. |
| Feature creep | Personal CRM products can expand endlessly into messaging, enrichment, AI, and mobile. | Enforce the MVP/V1/V2+ boundaries documented in this folder. |
| Over-modeling custom fields too early | A dynamic field system can distort the initial schema and UX. | Keep fixed fields only in MVP and revisit custom fields after core workflows stabilize. |
| Import reliability and partial sync errors | Provider APIs can fail mid-import or return incomplete data. | Track imports explicitly, persist status, and design retry-aware workflows later. |
| Performance degradation with large contact lists | Personal contact datasets can grow into the thousands. | Use pagination, filtering, and efficient queries from the start. |
| Privacy risk around future message ingestion | Messages are significantly more sensitive than contacts and notes. | Keep Beeper and messaging ingestion out of MVP and V1 until privacy and policy expectations are reviewed. |
| Session contract drift | Frontend work can drift toward Better Auth provider-native payloads while architecture docs still treat `/api/account/me` as the app-owned stable contract. | Resolve one canonical session contract and move its schema into `packages/contracts` once stabilized. |
| Cross-layer ticket drift | A “frontend” branch can quietly remove backend endpoints or shared contracts, making review and rollback harder. | Keep large frontend and backend work on separate tickets and branches, and treat cross-layer changes as explicit exceptions during planning. |
| Tooling process ambiguity | Auth helper tests currently pass, but one test run reports a hanging process, and `intlayer build` output can look watch-like during typecheck runs. | Keep the current scripts, but track test harness cleanup and Intlayer command behavior before treating the pipeline as fully settled. |
