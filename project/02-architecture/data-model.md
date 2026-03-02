# Data Model

This document captures the canonical domain entities for the approved planning baseline. It is a documentation artifact, not a final migration file.

## Ownership Rule

All user-owned tables should include `user_id` and must be queried with ownership filters. The `users` table itself does not need `user_id`.

## Entities

### `users`

- Purpose: account identity and primary user preferences.
- Key columns:
  - `id`
  - `email`
  - `password_hash` or Better Auth-managed equivalent
  - `locale`
  - `created_at`
  - `updated_at`
- Relationships:
  - owns contacts, tags, relationships, interactions, reminders, imports, and future domain records
- Version note:
  - required in MVP

### `contacts`

- Purpose: core contact records managed by the user.
- Key columns:
  - `id`
  - `user_id`
  - `first_name`
  - `last_name`
  - `email`
  - `phone`
  - `company`
  - `job_title`
  - `birthday`
  - `address`
  - `notes`
  - timestamps
- Relationships:
  - many-to-many with tags
  - one-to-many with interactions
  - one-to-many with reminders
  - self-referential links through `relationships`
- Version note:
  - required in MVP

### `tags`

- Purpose: contact classification and filtering.
- Key columns:
  - `id`
  - `user_id`
  - `name`
  - `color`
- Relationships:
  - many-to-many with contacts
- Version note:
  - required in MVP

### `contact_tags`

- Purpose: join table for contact/tag assignments.
- Key columns:
  - `contact_id`
  - `tag_id`
- Relationships:
  - connects `contacts` and `tags`
- Version note:
  - required in MVP

### `relationships`

- Purpose: semantic links between two contacts owned by the same user.
- Key columns:
  - `id`
  - `user_id`
  - `contact_id_1`
  - `contact_id_2`
  - `relation_type`
  - `notes`
- Relationships:
  - links two contact records
- Version note:
  - required in MVP

### `interactions`

- Purpose: timeline entries for relationship history.
- Key columns:
  - `id`
  - `user_id`
  - `contact_id`
  - `occurred_at`
  - `type`
  - `notes`
- Relationships:
  - belongs to a contact
- Version note:
  - required in MVP

### `reminders`

- Purpose: internal reminder records for future follow-ups.
- Key columns:
  - `id`
  - `user_id`
  - `contact_id` nullable
  - `title`
  - `description`
  - `due_at`
  - `recurrence_rule`
  - `status`
  - timestamps
- Relationships:
  - may belong to a contact
- Version note:
  - required in MVP

### `gifts_debts`

- Purpose: richer relationship metadata such as gifts, debts, and loans.
- Key columns:
  - `id`
  - `user_id`
  - `contact_id`
  - `type`
  - `description`
  - `amount`
  - `occurred_at`
- Relationships:
  - belongs to a contact
- Version note:
  - deferred to V1

### `imports`

- Purpose: trace import executions and provider sync attempts.
- Key columns:
  - `id`
  - `user_id`
  - `source`
  - `status`
  - `started_at`
  - `finished_at`
  - `details`
- Relationships:
  - belongs to a user
- Version note:
  - required in MVP for Google import observability

### `ai_suggestions`

- Purpose: persist duplicate merge suggestions, follow-up suggestions, or other AI outputs.
- Key columns:
  - `id`
  - `user_id`
  - `contact_id` nullable
  - `suggestion_type`
  - `payload`
  - `status`
  - timestamps
- Relationships:
  - may point to a contact
- Version note:
  - deferred to V1 and beyond

## Explicit Non-Commitment on Custom Fields

Custom fields were discussed, but they are not an active MVP feature and are not part of the approved MVP schema.

Do not implement `custom_fields` as an approved MVP requirement. Treat it as a backlog schema consideration only, to be revisited when the custom fields system is explicitly promoted.

## Open Modeling Question

`groups` are part of the product language, but the canonical MVP persistence model is not finalized. Current recommendation:

- commit to `tags` in MVP,
- use tags as the minimum classification model,
- and decide later whether groups become a first-class table or remain a UI abstraction.
