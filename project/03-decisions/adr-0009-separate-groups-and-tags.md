# ADR-0009: Separate Groups and Tags

## Context

The original planning language used both groups and tags, but the exact data-model relationship between them was still unresolved. This ambiguity affected contact classification, filtering, and future relationship scoring.

## Decision

Model groups and tags as separate concepts:

- each contact belongs to zero or one group,
- groups represent relationship tiers such as close friends, friends, acquaintances, or other user-defined buckets,
- tags remain many-to-many descriptors used for source, topic, interests, or other qualifiers.

## Alternatives Considered

- Use tags only and treat groups as a UI alias.
- Use groups only and remove tags.
- Postpone group modeling until after MVP.

## Consequences

- The data model includes a first-class `groups` table and `contacts.group_id`.
- Filtering and UI wording become clearer.
- Future cadence defaults and relationship scoring can build directly on groups without overloading tags.
