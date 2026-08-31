# i18n-routing Specification

## Purpose

Bilingual routing for the portfolio SPA. All routes are prefixed with a locale segment (`/es` or `/en`). The app detects the browser's preferred language at the root and redirects automatically.

## Requirements

### Requirement: Locale-Prefixed Routes

The router MUST expose all portfolio routes under `/es/*` and `/en/*` path segments. There MUST be no content accessible at a non-prefixed path (except the root redirect).

#### Scenario: Navigate to locale root

- GIVEN the user navigates to `/en`
- WHEN the route resolves
- THEN the full single-page layout renders in English

#### Scenario: Navigate to Spanish locale root

- GIVEN the user navigates to `/es`
- WHEN the route resolves
- THEN the full single-page layout renders in Spanish

### Requirement: Root Redirect — Browser Language Detection

The root route (`/`) MUST read `navigator.language` (or `navigator.languages[0]`) and redirect the user to `/es` if the detected language starts with `es`, or to `/en` otherwise.

#### Scenario: Browser language is Spanish

- GIVEN the user navigates to `/`
- AND `navigator.language` starts with `es`
- WHEN the root route loads
- THEN the user is redirected to `/es`

#### Scenario: Browser language is not Spanish

- GIVEN the user navigates to `/`
- AND `navigator.language` does not start with `es` (e.g., `en-US`, `fr`, `de`)
- WHEN the root route loads
- THEN the user is redirected to `/en`

### Requirement: Language Switcher

The app MUST provide a UI control that allows the user to switch between `/es` and `/en` without reloading the page. Switching MUST preserve the current scroll position or section context where possible.

#### Scenario: Switch from English to Spanish

- GIVEN the user is on `/en`
- WHEN the language switcher is activated for Spanish
- THEN the user is navigated to `/es` and content updates to Spanish

#### Scenario: Switch from Spanish to English

- GIVEN the user is on `/es`
- WHEN the language switcher is activated for English
- THEN the user is navigated to `/en` and content updates to English

### Requirement: 404 Routing Fallback (GitHub Pages)

The app MUST include a `404.html` file identical to `index.html` so that GitHub Pages redirects all unknown paths back to the SPA entry point. The SPA router then handles locale resolution client-side.

#### Scenario: Direct URL access on GitHub Pages

- GIVEN the user navigates directly to `/es` or `/en` in a browser
- AND GitHub Pages receives the request
- WHEN GitHub Pages cannot find a static file at that path
- THEN GitHub Pages serves `404.html` (which is a copy of `index.html`)
- AND the SPA router resolves the path correctly
