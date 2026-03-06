# Auth and Security

## Approved Baseline

- Authentication provider: Better Auth.
- Nest integration baseline: `@thallesp/nestjs-better-auth`.
- Account model: one account equals one user.
- Session model: Better Auth cookie-backed sessions for MVP, not bearer tokens.
- Core auth schema baseline: Better Auth default tables `user`, `session`, `account`, and `verification`.
- Auth user identifier baseline: text/string id from Better Auth defaults, not UUID.
- Authorization baseline: global auth guard enabled in Nest, with explicit anonymous annotations for public endpoints.
- Frontend auth transport: same-origin via the frontend `/api` path, backed by the Vite proxy in development and a reverse proxy in deployed environments.
- Better Auth remains pinned to `1.4.21` while the selected Nest community integration catches up with newer runtime lines.

## Security Decisions

### Runtime Compatibility

- `apps/api` remains on the standard Nest CommonJS runtime for now.
- The current Nest community integration is pinned to a Better Auth-compatible version line until upstream compatibility catches up.

### Password Handling

- Passwords must never be stored in plain text.
- Use established password hashing defaults from Better Auth or the selected adapter.

### Session Security

- Use secure session storage and transport.
- Prefer HTTP-only cookies where appropriate.
- Ensure session invalidation works on logout.
- Keep Better Auth native endpoints mounted at `/api/auth/*`.
- Expose `GET /api/account/me` as the app-owned authenticated session summary endpoint.
- Treat provider-native session payloads as implementation details unless the project intentionally promotes them to an application-level contract.

### OAuth Token Handling

Google import requires OAuth access. Provider tokens must be treated as sensitive secrets.

- Store tokens securely.
- Encrypt stored refresh tokens if persisted.
- Limit token access to import workflows only.
- Remove or revoke tokens when the user disconnects the provider or deletes the account.

### Data Isolation

- All domain queries must enforce `user_id` ownership.
- Service and controller layers must not trust client-submitted ownership fields.
- Domain `user_id` foreign keys must align with the Better Auth `user.id` string/text type.
- Public routes such as `health` must be explicitly annotated as anonymous under the global guard model.
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
