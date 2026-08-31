# about-section Specification

## Purpose

Introduces the portfolio owner with a professional profile summary and three highlight cards that communicate key attributes or areas of expertise. All content is locale-aware.

## Requirements

### Requirement: Profile Summary

The about section MUST display a text summary of the owner's professional background and identity. The text MUST be served from the active locale's i18n file and MUST NOT be hard-coded in the component.

#### Scenario: Profile text renders in active locale

- GIVEN the active locale is `en`
- WHEN the about section mounts
- THEN the English profile summary is displayed
- AND no untranslated keys (e.g., `about.summary`) are visible

#### Scenario: Locale switch updates profile text

- GIVEN the user switches locale from `en` to `es`
- WHEN the about section re-renders
- THEN the Spanish profile summary replaces the English one without page reload

### Requirement: Three Highlight Cards

The about section MUST render exactly three highlight cards. Each card MUST display an icon or visual indicator, a short title, and a brief description. All card text MUST be i18n-translated.

#### Scenario: All three cards are visible

- GIVEN the user scrolls to the about section
- WHEN the section is in viewport
- THEN three cards are rendered with distinct titles and descriptions

#### Scenario: Card content is locale-aware

- GIVEN the active locale is `es`
- WHEN the about section renders
- THEN all three card titles and descriptions are in Spanish
