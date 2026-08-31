# stack-section Specification

## Purpose

Showcases the owner's technical expertise through a set of technology badges, visually organized by category. Category labels are i18n-translated; technology names are not (they are proper nouns).

## Requirements

### Requirement: Categorized Tech Badges

The stack section MUST display technology badges grouped under named categories. Each category MUST have a visible label and one or more badges. Category labels MUST be i18n-translated; individual technology names (e.g., "React", "TypeScript") MUST NOT be translated.

#### Scenario: Categories and badges render

- GIVEN the user scrolls to the stack section
- WHEN the section is in viewport
- THEN at least two categories are visible, each containing one or more technology badges

#### Scenario: Category labels are locale-aware

- GIVEN the active locale is `es`
- WHEN the stack section renders
- THEN category label text appears in Spanish
- AND technology badge names remain in their canonical English form

### Requirement: Section Heading

The stack section MUST include a translated section heading (e.g., "Tech Stack" / "Stack Tecnológico") sourced from the active locale's i18n file.

#### Scenario: Heading matches locale

- GIVEN the active locale is `en`
- WHEN the stack section renders
- THEN the section heading is in English

#### Scenario: Heading updates on locale switch

- GIVEN the active locale switches from `en` to `es`
- WHEN the stack section re-renders
- THEN the section heading updates to the Spanish equivalent
