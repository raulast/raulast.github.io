# hero-section Specification

## Purpose

The first visible section of the portfolio. Communicates the owner's identity, professional role, value proposition, and presents two primary calls-to-action. Rendered in the active locale language.

## Requirements

### Requirement: Identity Display

The hero section MUST display the owner's full name and professional title. Both MUST be translated through the active locale's i18n keys.

#### Scenario: Hero renders in English

- GIVEN the active locale is `en`
- WHEN the hero section mounts
- THEN the owner's name and English professional title are visible

#### Scenario: Hero renders in Spanish

- GIVEN the active locale is `es`
- WHEN the hero section mounts
- THEN the owner's name and Spanish professional title are visible

### Requirement: Value Proposition

The hero section MUST include a short value proposition statement (1–2 sentences) that communicates the owner's unique professional offering. The text MUST come from the active locale's i18n file.

#### Scenario: Value proposition is locale-aware

- GIVEN the user switches from `/en` to `/es`
- WHEN the hero section re-renders
- THEN the value proposition text updates to the Spanish version

### Requirement: Dual Call-to-Action

The hero section MUST render exactly two CTA buttons: one linking to the Projects section (smooth scroll or anchor) and one linking to the Contact section. Both button labels MUST be i18n-translated.

#### Scenario: View work CTA scrolls to projects

- GIVEN the user is viewing the hero section
- WHEN the "View Work" (or locale equivalent) CTA is clicked
- THEN the page scrolls to the Projects section

#### Scenario: Contact CTA scrolls to contact

- GIVEN the user is viewing the hero section
- WHEN the "Contact" (or locale equivalent) CTA is clicked
- THEN the page scrolls to the Contact section
