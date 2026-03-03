# Product Summary

## What This App Is

`personal-crm` is a relationship management application for a single user who wants to centralize contacts, remember interactions, and get help deciding who to contact next.

It starts with Google Contacts as the only import source, adds structured contact management, interaction history, reminders, and a dashboard, and leaves richer intelligence and integrations for later versions.

## What This App Is Not

- Not a sales CRM.
- Not a team collaboration product.
- Not a messaging client in the MVP.
- Not a universal contact sync engine on day one.
- Not a generic task manager unrelated to contacts.

## MVP

- Email/password authentication with Better Auth.
- One account maps to one user.
- Translation-ready web application shell with dashboard and contacts routes.
- Google Contacts import via OAuth and Google People API.
- Import execution tracked as jobs from day one.
- Contact CRUD with fixed fields only.
- One optional group per contact for relationship tiering.
- Tags used separately for source, topic, or interest labeling.
- Relationship links between contacts.
- Interaction timeline per contact.
- Internal reminders with punctual or recurring behavior.
- Reminder recurrence baseline: one-time, weekly, monthly, and yearly.
- Dashboard showing reminders and stale relationships.
- Data export and account deletion.

## V1

- Additional import sources: Apple/iCloud plus selected social/contact sources.
- AI-assisted duplicate detection and merge suggestions.
- Connection score and follow-up frequency targets.
- Contact-level task presets such as "send a message" or "plan a drink."
- Intelligent task suggestion foundation based on relationship data.
- Gifts, debts, and gift ideas tracking.
- UI personalization and stronger internationalization coverage.
- Public API exposure for future integrations.

## Key Deferred Features

- Google Calendar quick scheduling.
- Google Tasks synchronization.
- TanStack Start adoption and frontend server-runtime features such as SSR or server functions.
- Beeper message ingestion.
- PWA/mobile offline mode.
- Custom fields UI and schema.
- Browser extension for contact capture.
- OCR business card scanning.
- Contact enrichment APIs.
- Advanced views such as board, calendar, or gallery.
