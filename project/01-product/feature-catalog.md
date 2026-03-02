# Feature Catalog

| Feature | Description | User Value | Version Target | Dependencies | Notes / Constraints |
| --- | --- | --- | --- | --- | --- |
| Authentication | Email/password account creation and login with session handling | Protects private relationship data | MVP | Better Auth, session storage | One account maps to one user |
| Google Contacts Import | Import contacts from Google People API | Avoids manual contact re-entry | MVP | Google OAuth, import service | Only approved source for MVP |
| Contacts CRUD | Create, edit, view, delete contacts using fixed fields | Keeps a usable system of record | MVP | Contacts schema, auth | No custom fields UI in MVP |
| Tags / Groups | Classify contacts for filtering and follow-up patterns | Helps organization and dashboards | MVP | Contacts CRUD | Group semantics remain unresolved |
| Relationships | Link contacts to one another with relationship types | Adds context beyond flat contact lists | MVP | Contacts CRUD | Must be contact-owned and user-scoped |
| Interaction Timeline | Record calls, meetings, emails, and notes over time | Builds memory of the relationship | MVP | Contacts CRUD | Chronological history per contact |
| Reminders | One-time and recurring reminders tied to contacts | Supports intentional follow-up | MVP | Contacts, recurrence rules | Internal only, no Google Tasks sync |
| Dashboard | Show due reminders and inactive relationships | Gives an at-a-glance action view | MVP | Reminders, interactions, contacts | Exact scoring remains simple in MVP |
| Data Export | Export contacts and history | Supports data portability | MVP | Contacts, interactions, reminders | CSV/JSON acceptable |
| Account Deletion | Delete account and owned data | Supports privacy expectations | MVP | Auth, data ownership | Explicit destructive flow |
| Frontend i18n | Translation-ready UI strings and locale support | Reduces future internationalization cost | MVP | Frontend shell | Backend code remains English-only |
| Google Calendar Quick Scheduling | Launch or create a calendar event from a contact flow | Makes planning a meetup faster | Open question | Google integration | Scope status still unresolved |
| Connection Score | Relationship health indicator based on cadence and history | Helps prioritize outreach | V1 | Interactions, reminders, cadence settings | Keep simple first, AI later |
| AI-Assisted Duplicate Merge | Suggest likely duplicates across sources | Prevents duplicate contact records | V1 | Multi-source imports, AI provider | Requires manual validation |
| Gifts / Debts / Ideas | Track gifts, loans, and personal gift ideas | Supports richer relationship context | V1 | Contacts, timeline | Personal-life oriented enrichment |
| Contact Task Presets | One-click actions like "send a message" | Reduces friction for common actions | V1 | Contacts, reminders | Not a generic task manager |
| Intelligent Task Suggestions | Suggest follow-up actions from relationship data | Makes the app proactive | V1 foundation | Interaction history, cadence rules | AI depth deferred beyond V1 |
| Beeper Integration | Import message metadata or conversation history | Adds interaction context from messaging tools | V2+ | Beeper API, identity linking | Explicitly deferred |
| PWA | Mobile-friendly installable experience with offline considerations | Improves day-to-day personal usage | V2+ | Frontend shell, sync strategy | Not needed for MVP delivery |
| Custom Fields System | User-defined typed fields on contacts | Adds schema flexibility | V2+ | UI, storage model, validation | Avoid over-modeling too early |
