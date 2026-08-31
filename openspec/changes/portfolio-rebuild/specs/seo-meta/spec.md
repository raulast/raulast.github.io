# seo-meta Specification

## Purpose

Manages per-locale HTML metadata, hreflang alternate links, canonical URLs, and a static sitemap to maximize search engine visibility and prevent duplicate-content penalties for the bilingual portfolio.

## Requirements

### Requirement: Per-Locale Meta Tags

The app MUST inject locale-specific `<title>`, `<meta name="description">`, and Open Graph tags for each locale (`en`, `es`). Meta content MUST be served from the active locale's i18n file. Tags MUST be injected into `<head>` via react-helmet-async.

#### Scenario: English meta tags on /en

- GIVEN the active locale is `en`
- WHEN the page loads
- THEN `<head>` contains a `<title>` and `<meta name="description">` with English content
- AND `<meta property="og:locale" content="en_US">` is present

#### Scenario: Spanish meta tags on /es

- GIVEN the active locale is `es`
- WHEN the page loads
- THEN `<head>` contains a `<title>` and `<meta name="description">` with Spanish content
- AND `<meta property="og:locale" content="es_ES">` (or `es_AR`) is present

### Requirement: Hreflang Alternate Links

Every page MUST include `<link rel="alternate" hreflang="...">` tags for both `en` and `es`, plus `hreflang="x-default"` pointing to the `/en` URL. This MUST be present regardless of the active locale.

#### Scenario: Hreflang tags present on English page

- GIVEN the active locale is `en`
- WHEN the page loads
- THEN `<head>` contains `<link rel="alternate" hreflang="en">` pointing to the `/en` URL
- AND `<link rel="alternate" hreflang="es">` pointing to the `/es` URL
- AND `<link rel="alternate" hreflang="x-default">` pointing to the `/en` URL

#### Scenario: Hreflang tags present on Spanish page

- GIVEN the active locale is `es`
- WHEN the page loads
- THEN both hreflang `en` and `es` alternate links are present in `<head>`

### Requirement: Canonical URL

Each locale page MUST include a `<link rel="canonical">` tag pointing to its own absolute URL to prevent duplicate content indexing.

#### Scenario: Canonical on /en

- GIVEN the user is on `/en`
- WHEN the page loads
- THEN `<head>` contains `<link rel="canonical" href="https://raulast.github.io/en">`

#### Scenario: Canonical on /es

- GIVEN the user is on `/es`
- WHEN the page loads
- THEN `<head>` contains `<link rel="canonical" href="https://raulast.github.io/es">`

### Requirement: Static Sitemap

The build MUST produce a `sitemap.xml` at the root of the `docs/` output. The sitemap MUST list at minimum the `/en` and `/es` URLs with their `hreflang` annotations.

#### Scenario: Sitemap is present after build

- GIVEN `bun run build` completes
- WHEN the `docs/` directory is inspected
- THEN `docs/sitemap.xml` exists and is valid XML

#### Scenario: Sitemap includes both locale URLs

- GIVEN `docs/sitemap.xml` exists
- WHEN the sitemap is parsed
- THEN it contains entries for `https://raulast.github.io/en` and `https://raulast.github.io/es`
