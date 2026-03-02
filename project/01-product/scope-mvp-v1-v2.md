# Scope Boundaries

This document is the hard boundary reference for what belongs in MVP, what is deferred to V1, and what belongs in V2+ or explicit backlog territory.

## MVP

| Feature | Status | Notes |
| --- | --- | --- |
| Email/password auth with Better Auth | Included | Required baseline. |
| One account = one user | Included | Shared or collaborative accounts are not part of MVP. |
| Google Contacts import | Included | Only import source approved for MVP, tracked as jobs from day one. |
| Contact CRUD with fixed fields | Included | No custom fields UI. |
| Groups | Included | Each contact belongs to zero or one group used for relationship tiering. |
| Tags | Included | Tags qualify source, topic, or interests, independently of groups. |
| Contact relationships | Included | Family, friend, colleague, and similar links. |
| Interaction timeline | Included | Contact-scoped history only. |
| Internal reminders | Included | Stored and managed in the application with one-time, weekly, monthly, and yearly recurrence. |
| Dashboard | Included | Reminders, stale contacts, simple aggregate insights. |
| Export and account deletion | Included | Privacy baseline. |
| Frontend internationalization foundation | Included | All UI strings should be translation-ready from day one. |

## V1

| Feature | Status | Notes |
| --- | --- | --- |
| Apple/iCloud import | Deferred to V1 | First additional source. |
| Other source connectors | Deferred to V1 | Social or directory imports, subject to policy limits. |
| AI duplicate merge suggestions | Deferred to V1 | Needed once multiple sources exist. |
| Connection score | Deferred to V1 | Depends on interaction and reminder data. |
| Follow-up frequency goals | Deferred to V1 | Supports relationship scoring. |
| Contact task presets | Deferred to V1 | "Send a message", "plan a drink", custom contact task. |
| Intelligent task suggestions | Deferred to V1 | Initial AI/task automation foundation. |
| Gifts, debts, and gift ideas | Deferred to V1 | Relationship enrichment layer. |
| Public API | Deferred to V1 | REST-first if exposed externally. |
| UI personalization | Deferred to V1 | Layout and visibility refinements. |

## V2+

| Feature | Status | Notes |
| --- | --- | --- |
| PWA support | Deferred to V2+ | Includes offline and push concerns. |
| Beeper message ingestion | Deferred to V2+ | Messaging history is explicitly not part of MVP. |
| Google Calendar quick scheduling | Deferred to V2+ | Explicit backlog item, not part of MVP implementation. |
| Natural-language reminder creation | Deferred to V2+ | Depends on AI integration. |
| Custom fields system | Deferred to V2+ | Includes schema and UI, not just storage ideas. |
| Browser extension | Deferred to V2+ | Contact capture from the web. |
| OCR business card import | Deferred to V2+ | Camera or webcam workflow. |
| Contact enrichment APIs | Deferred to V2+ | External public profile enrichment. |
| Advanced views | Deferred to V2+ | Board, calendar, gallery. |
| News/context feeds | Deferred to V2+ | Contact-related context enrichment. |

## Do Not Build Yet

The following features were discussed, but they are explicitly not approved for early implementation:

- Beeper messages and message syncing.
- Google Calendar quick scheduling.
- Custom fields UI or dynamic schema editing.
- Google Tasks synchronization.
- Multi-user shared accounts or collaborative workspaces.
- Board, calendar, and gallery views.
- Browser extension workflows.
- OCR business card scanning.
- Contact enrichment APIs.

## Explicitly Out of Scope for Current Planning

- Sales pipeline features.
- Campaign or bulk outbound email flows.
- Generic team collaboration workflows.
- A general-purpose task manager unrelated to contacts.
