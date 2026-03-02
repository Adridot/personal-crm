# Observability and Operations

## Goals

- Make failures visible early.
- Trace imports and user-impacting actions.
- Keep enough operational insight without building a full platform prematurely.

## Logging

Use structured logs for:

- auth events,
- import start and completion,
- failed external provider calls,
- contact mutations,
- reminder mutations,
- account export and deletion.

Logs should include request correlation information and user context when safe to do so, without exposing unnecessary private payloads.

## Error Handling

- Use centralized exception handling in the backend.
- Normalize error responses for the frontend.
- Capture unexpected exceptions in an error monitoring system once one is added.

## Metrics and Traces

The first practical metrics set should include:

- request latency,
- request error rate,
- import success/failure counts,
- reminder creation counts,
- dashboard aggregation timing.

OpenTelemetry and Sentry are both reasonable future baselines, but they are not required before the first code lands.

## Import Job Visibility

Imports are a critical reliability surface. The system should retain enough metadata to answer:

- when an import started,
- whether it finished,
- whether it partially failed,
- and which provider it used.

## Operational Simplicity

- Favor simple process models in MVP.
- Do not require a background processing platform unless the import workflow proves too heavy for direct request handling.
- Keep local development setup predictable and repeatable.
