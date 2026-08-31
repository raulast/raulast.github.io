# projects-section Specification

## Purpose

Highlights exactly three featured projects with concise descriptions, measurable impact metrics, and technology tags. All descriptive text is locale-aware; project names and metrics are not translated.

## Requirements

### Requirement: Three Project Cards

The projects section MUST render exactly three project cards. Each card MUST include: a project name, a short description, at least one metric (quantified impact), and one or more technology tags.

#### Scenario: All three project cards are rendered

- GIVEN the user scrolls to the projects section
- WHEN the section is in viewport
- THEN exactly three project cards are visible with distinct names

#### Scenario: Each card includes a metric

- GIVEN any project card is rendered
- WHEN the card content is inspected
- THEN at least one measurable metric (e.g., "40% reduction in load time") is present

### Requirement: Locale-Aware Project Descriptions

Project names and metrics MUST NOT be translated (they are proper nouns and numbers). Project short descriptions MUST come from the active locale's i18n file.

#### Scenario: Descriptions update on locale switch

- GIVEN the active locale switches from `en` to `es`
- WHEN the projects section re-renders
- THEN each project card's description updates to Spanish
- AND project names and metrics remain unchanged

### Requirement: Technology Tags

Each project card MUST display one or more technology tags indicating the stack used. Tags are proper nouns and MUST NOT be translated.

#### Scenario: Tags render on each card

- GIVEN any project card is rendered
- WHEN the card is visible
- THEN at least one technology tag is displayed

### Requirement: Section Heading

The projects section MUST display a translated section heading sourced from the active locale's i18n file.

#### Scenario: Heading is locale-aware

- GIVEN the active locale is `es`
- WHEN the projects section renders
- THEN the section heading is in Spanish
