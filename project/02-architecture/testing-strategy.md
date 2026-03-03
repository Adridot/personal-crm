# Testing Strategy

## Principles

- Test critical behavior, not framework internals.
- Cover ownership boundaries aggressively.
- Mock external integrations consistently.
- Keep the MVP shippable with a practical, not inflated, test pyramid.

## Test Layers

### Unit Tests

Use unit tests for:

- domain services,
- validation logic,
- reminder recurrence helpers,
- dashboard aggregation helpers,
- import mapping logic.

### Integration Tests

Use integration tests for:

- authenticated REST endpoints,
- database persistence paths,
- ownership filtering behavior,
- import lifecycle records.

### End-to-End Tests

Use e2e tests for the main user journeys:

1. register and log in,
2. connect Google and import contacts,
3. browse and edit contacts,
4. add an interaction,
5. create a reminder,
6. view dashboard results,
7. export data,
8. delete account.

## External API Mocking

All Google integration tests should run against mocks or recorded fixtures. Do not rely on live provider access in CI.

## MVP-Critical Coverage Areas

The following areas need higher confidence than aesthetic UI details:

- auth and session enforcement,
- `user_id` ownership filtering,
- contact import mapping,
- reminder recurrence logic,
- export and deletion flows.

## Minimum Definition of Done

For an MVP-critical ticket, "done" should normally mean:

- implementation completed,
- unit or integration coverage added for all new or modified business logic,
- no cross-user access regression introduced,
- relevant docs or backlog notes updated if behavior changed.
