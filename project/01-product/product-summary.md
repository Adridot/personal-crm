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
- Google Contacts import via OAuth and Google People API.
- Contact CRUD with fixed fields only.
- Contact classification through tags, with group semantics still to be finalized.
- Relationship links between contacts.
- Interaction timeline per contact.
- Internal reminders with punctual or recurring behavior.
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

- Google Tasks synchronization.
- Beeper message ingestion.
- PWA/mobile offline mode.
- Custom fields UI and schema.
- Browser extension for contact capture.
- OCR business card scanning.
- Contact enrichment APIs.
- Advanced views such as board, calendar, or gallery.
