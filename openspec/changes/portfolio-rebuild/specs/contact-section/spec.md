# contact-section Specification

## Purpose

Provides the visitor with two direct contact channels — email (mailto) and LinkedIn — with no server-side form or backend. All labels and supporting text are locale-aware.

## Requirements

### Requirement: Email Contact CTA

The contact section MUST display a clickable email CTA that opens the default mail client via a `mailto:` link pointing to the owner's email address. The CTA label MUST be i18n-translated.

#### Scenario: Email CTA opens mail client

- GIVEN the user is on the contact section
- WHEN the email CTA is clicked
- THEN the default mail client opens with the owner's email pre-populated in the To field

#### Scenario: Email CTA label is locale-aware

- GIVEN the active locale is `es`
- WHEN the contact section renders
- THEN the email CTA label is in Spanish

### Requirement: LinkedIn Contact CTA

The contact section MUST display a clickable LinkedIn CTA that opens the owner's LinkedIn profile in a new browser tab. The CTA label MUST be i18n-translated.

#### Scenario: LinkedIn CTA opens in new tab

- GIVEN the user is on the contact section
- WHEN the LinkedIn CTA is clicked
- THEN the owner's LinkedIn profile opens in a new browser tab

#### Scenario: LinkedIn CTA label is locale-aware

- GIVEN the active locale is `es`
- WHEN the contact section renders
- THEN the LinkedIn CTA label is in Spanish

### Requirement: No Server-Side Form

The contact section MUST NOT include a form that submits data to any server endpoint. Contact MUST be handled exclusively through the mailto and LinkedIn links.

#### Scenario: No form element in contact section

- GIVEN the contact section renders
- WHEN the DOM is inspected
- THEN no `<form>` element is present in the contact section
