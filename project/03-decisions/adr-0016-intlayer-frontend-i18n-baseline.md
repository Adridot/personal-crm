# ADR-0016: Intlayer Frontend i18n Baseline

## Context

The frontend needed an MVP-ready internationalization foundation that fits a Vite SPA, TanStack Router, and a NestJS-backed architecture. The team wanted a modern, component-friendly i18n approach, explicit locale routing, and browser-language detection without adopting TanStack Start or moving server responsibilities away from NestJS.

## Decision

Use Intlayer as the frontend i18n baseline in `apps/web`, with:

- `prefix-no-default` locale routing,
- English as the default locale,
- cookie + localStorage locale persistence,
- proxy-backed locale detection through `intlayerProxy()`,
- colocated `.content.ts` dictionaries near routes and UI components,
- and no editor, CMS, AI, compiler extraction, or localized rewrite features in MVP.

TanStack Router remains the routing system. Route slugs stay canonical and English for MVP, for example `/dashboard`, `/contacts`, `/fr/dashboard`, and `/fr/contacts`.

## Alternatives Considered

- Use `react-i18next` as a more conservative frontend i18n baseline.
- Keep generic translation-ready text containers and postpone the i18n library choice.
- Adopt TanStack Start and follow the full Intlayer TanStack Start integration path immediately.
- Use localStorage only for locale persistence.

## Consequences

- The frontend gets a concrete, modern i18n implementation instead of a deferred placeholder.
- Browser-language detection and locale redirects can work before client rendering through the Vite proxy layer.
- Locale-aware navigation helpers become part of the frontend baseline.
- The project avoids overlapping frontend server-runtime concerns while NestJS remains the primary backend.
- Advanced Intlayer capabilities remain available later, but they do not complicate the MVP shell.
