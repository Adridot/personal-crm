# Auth and Security

## Approved Baseline

- Authentication provider: Better Auth.
- Account model: one account equals one user.
- Session model: secure cookie or token-backed session managed through Better Auth.
- Authorization rule: every user-owned record must be scoped by authenticated ownership.

## Security Decisions

### Password Handling

- Passwords must never be stored in plain text.
- Use established password hashing defaults from Better Auth or the selected adapter.

### Session Security

- Use secure session storage and transport.
- Prefer HTTP-only cookies where appropriate.
- Ensure session invalidation works on logout.

### OAuth Token Handling

Google import requires OAuth access. Provider tokens must be treated as sensitive secrets.

- Store tokens securely.
- Encrypt stored refresh tokens if persisted.
- Limit token access to import workflows only.
- Remove or revoke tokens when the user disconnects the provider or deletes the account.

### Data Isolation

- All domain queries must enforce `user_id` ownership.
- Service and controller layers must not trust client-submitted ownership fields.
- Future row-level security may be evaluated, but application-level filtering is the approved baseline.

### GDPR and Data Control

- Users must be able to export their data.
- Users must be able to delete their account and owned records.
- Destructive flows should be explicit and confirmed in the UI.

## Security Risks to Track

- OAuth token leakage.
- Missing ownership checks in new endpoints.
- Overly broad logging of private data.
- Provider policy violations from future integrations.
- Cross-account data exposure through joins or aggregation bugs.

## Future Hardening

- Token encryption at rest.
- Formal audit logging for sensitive actions.
- Optional row-level security in PostgreSQL.
- Secret rotation runbook.
- Security review before adding messaging ingestion or enrichment providers.
