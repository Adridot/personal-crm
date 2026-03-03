# Product Requirements Document

## Problem Statement

People maintain meaningful relationships across fragmented systems such as Google Contacts, calendars, messaging apps, and social platforms. Without a dedicated tool, it is hard to remember who was contacted recently, what happened in the last interaction, and who should be followed up with next.

`personal-crm` solves this by creating a single place for contact data, relationship context, interaction history, and follow-up reminders.

## Users

### Primary User

- An individual user managing personal and professional relationships.
- The user wants one system of record for contacts and follow-ups.
- The current approved model is one account per user, with no shared workspace requirement.

## Jobs To Be Done

- Import my contacts from Google into one place.
- Organize contacts using groups, tags, and relationship context.
- View what happened recently with each person.
- Record new interactions quickly.
- Create reminders so I stay in touch intentionally.
- Export or delete my data when I want.

## MVP User Stories

| ID | User Story | Acceptance Criteria |
| --- | --- | --- |
| US-01 | As a user, I can register and log in with email and password. | Better Auth is integrated, authenticated sessions work, and protected resources are scoped to the current user. |
| US-02 | As a user, I can connect Google and import my Google Contacts. | OAuth succeeds, contacts are fetched from Google People API, imports are tracked as jobs, and imported contacts appear in the app. |
| US-03 | As a user, I can browse, search, and filter my contacts. | Contact list supports pagination, text search, group filtering, and tag-based filtering. |
| US-04 | As a user, I can create, edit, and delete contacts with fixed fields. | Contact CRUD works for name, email, phone, company, job title, birthday, address, and notes. |
| US-05 | As a user, I can classify contacts using groups and tags. | I can assign each contact to zero or one group, create and assign tags, and use both in filtering. Groups express relationship tiers, while tags describe source, topic, or interest. |
| US-06 | As a user, I can link contacts together with relationship types. | A contact can reference another contact as family, friend, colleague, or another defined relationship type. |
| US-07 | As a user, I can record interactions on a contact timeline. | I can add a dated interaction with a type and notes, and see interactions ordered chronologically. |
| US-08 | As a user, I can create reminders tied to contacts or groups. | Reminders are stored internally, support one-time, weekly, monthly, and yearly recurrence, and appear in upcoming reminder views. |
| US-09 | As a user, I can see a dashboard with reminders and contacts needing attention. | The dashboard shows due reminders, recently inactive contacts, and simple relationship activity indicators. |
| US-10 | As a user, I can export my data and delete my account. | Export produces structured data, account deletion removes owned data, and the flow is explicit and deliberate. |

## V1 Scope

- Add Apple/iCloud import and selected additional source connectors.
- Introduce AI-assisted duplicate detection and merge suggestion workflows.
- Add relationship scoring and follow-up frequency targets.
- Add contact-level task presets and intelligent task suggestion groundwork.
- Add gifts, debts, and gift ideas.
- Improve UI personalization.
- Expose a public API surface for future integrations.

## V2+ Scope

- Add PWA support and offline-oriented mobile behavior.
- Add Beeper-based message ingestion and linking.
- Add Google Calendar quick scheduling if it still proves useful after reminder flows stabilize.
- Add natural-language reminders and richer AI assistance.
- Add custom fields system and typed dynamic attributes.
- Add browser capture workflows.
- Add OCR-based business card import.
- Add enrichment APIs and contextual news feeds.
- Add alternative views such as board, gallery, or calendar.

## Non-Functional Requirements

### Security

- Use Better Auth for account lifecycle and session handling.
- Isolate user data by ownership checks on every request.
- Protect OAuth tokens and application secrets.
- Follow standard secure defaults for password handling, cookies, and transport security.

### Performance

- Core CRUD requests should feel responsive under normal personal CRM usage.
- The app should support at least low-thousands of contacts without degraded usability.
- Contact listing must use pagination and server-side filtering.

### Privacy and GDPR

- Contact data is sensitive by default.
- Users must be able to export and delete their data.
- Future integrations must respect provider policies and consent requirements.

### Observability

- Structured logs for auth, imports, data changes, and failures.
- Error monitoring for external integration failures and backend exceptions.
- Traceability for imports and significant user actions.

### Deployment Simplicity

- Local Docker should be the first-class development target.
- Cloud development compatibility is optional and must not drive MVP bootstrap decisions.
- Avoid over-engineered infrastructure in the first release.
- Keep the architecture deployable on a simple PaaS later.
