# Data Model

This document captures the canonical domain entities for the approved planning baseline. It is a documentation artifact, not a final migration file.

## Ownership Rule

The authentication baseline uses Better Auth core tables with default naming. The auth `user` table itself does not include `user_id`.

All user-owned domain tables should include `user_id` and must be queried with ownership filters. Those foreign keys must reference the Better Auth `user.id` column using a compatible text/string type.

## Entities

### `user`

- Purpose: Better Auth core account identity table.
- Key columns:
  - `id`
  - `email`
  - `name`
  - `email_verified`
  - `image`
  - `created_at`
  - `updated_at`
- Relationships:
  - referenced by `session`
  - referenced by `account`
- Version note:
  - generated in MVP through Better Auth + Drizzle

### `session`

- Purpose: Better Auth core session storage.
- Key columns:
  - `id`
  - `expires_at`
  - `token`
  - `ip_address` nullable
  - `user_agent` nullable
  - `user_id`
  - `created_at`
  - `updated_at`
- Relationships:
  - belongs to `user`
- Version note:
  - generated in MVP through Better Auth + Drizzle

### `account`

- Purpose: Better Auth core provider and credential account storage.
- Key columns:
  - `id`
  - `account_id`
  - `provider_id`
  - `user_id`
  - `access_token` nullable
  - `refresh_token` nullable
  - `id_token` nullable
  - `access_token_expires_at` nullable
  - `refresh_token_expires_at` nullable
  - `scope` nullable
  - `password` nullable
  - `created_at`
  - `updated_at`
- Relationships:
  - belongs to `user`
- Version note:
  - generated in MVP through Better Auth + Drizzle

### `verification`

- Purpose: Better Auth verification token storage for flows such as email verification and password reset.
- Key columns:
  - `id`
  - `identifier`
  - `value`
  - `expires_at`
  - `created_at`
  - `updated_at`
- Relationships:
  - standalone auth support table
- Version note:
  - generated in MVP through Better Auth + Drizzle

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
  - `group_id` nullable
  - timestamps
- Relationships:
  - belongs to zero or one group
  - many-to-many with tags
  - one-to-many with interactions
  - one-to-many with reminders
  - self-referential links through `relationships`
- Version note:
  - required in MVP

### `groups`

- Purpose: relationship tiering for contacts such as close friends, friends, acquaintances, or other custom group buckets.
- Key columns:
  - `id`
  - `user_id`
  - `name`
  - `color`
  - `default_follow_up_interval_days` nullable
  - `sort_order` nullable
- Relationships:
  - one-to-many with contacts
  - may be referenced by reminders
- Version note:
  - required in MVP

### `tags`

- Purpose: descriptive labeling for source, topic, interests, industry, or other non-hierarchical qualifiers.
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
- Integrity rules:
  - store each relationship pair in canonical order so `contact_id_1 < contact_id_2`
  - add a database `CHECK` constraint enforcing `contact_id_1 < contact_id_2`
  - add a database `UNIQUE` constraint on `(user_id, contact_id_1, contact_id_2)`
  - reject self-links by ensuring the two contact IDs are different
- Relationships:
  - links two contact records
- Version note:
  - required in MVP
- Implementation note:
  - the application must sort the two contact IDs before insertion and before duplicate checks

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
  - `group_id` nullable
  - `title`
  - `description`
  - `due_at`
  - `recurrence_rule`
  - `status`
  - timestamps
- Relationships:
  - may belong to a contact
  - may belong to a group
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

- Purpose: trace import executions and provider sync attempts as tracked jobs.
- Key columns:
  - `id`
  - `user_id`
  - `source`
  - `status`
  - `job_type`
  - `started_at`
  - `finished_at`
  - `details`
- Relationships:
  - belongs to a user
- Version note:
  - required in MVP for Google import job tracking and observability

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

## Group and Tag Model

The canonical MVP model is now explicit:

- `groups` are first-class entities and express relationship tiers,
- each contact belongs to zero or one group,
- groups may carry default follow-up attributes for future relationship scoring,
- `tags` are separate many-to-many descriptors used for labeling and filtering.
