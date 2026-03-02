# ADR-0005: REST-First API

## Context

Several API styles were possible, including REST, GraphQL, and type-coupled RPC approaches. The initial product surface is relatively conventional and CRUD-heavy.

## Decision

Start with a REST-first API design.

## Alternatives Considered

- GraphQL from day one.
- tRPC or another RPC-style interface.

## Consequences

- Straightforward endpoint design and testing.
- Good fit for NestJS conventions.
- Future public API exposure is easier to reason about.
- Some frontend data aggregation may need dedicated endpoints such as the dashboard API.
