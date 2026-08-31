# github-pages-deploy Specification

## Purpose

Defines the static build pipeline that produces a `docs/` directory suitable for GitHub Pages publishing, including the SPA routing fallback trick and Google Search Console verification file preservation.

## Requirements

### Requirement: Static Build to docs/ Folder

The build script MUST output compiled static assets to `docs/`. `docs/` MUST be cleaned before every build to prevent stale artifacts. The Vite `outDir` configuration MUST be set to `docs`.

#### Scenario: Build produces docs/ output

- GIVEN the developer runs `bun run build`
- WHEN the build completes without error
- THEN a `docs/` directory exists containing `index.html` and all static assets

#### Scenario: Old docs/ artifacts are removed before build

- GIVEN stale files exist in `docs/` from a previous build
- WHEN `bun run build` is executed
- THEN `docs/` is cleaned before new assets are written

### Requirement: 404 Fallback File

The build MUST produce `docs/404.html` as an exact copy of `docs/index.html`. This enables GitHub Pages to serve the SPA entry point for all unmatched paths.

#### Scenario: 404.html exists after build

- GIVEN `bun run build` completes
- WHEN `docs/` is inspected
- THEN `docs/404.html` exists
- AND its content is identical to `docs/index.html`

### Requirement: Google Search Console Verification File Preservation

The build MUST preserve `public/googleb16d2e2b5cd0da1f.html` so that it is available at `https://raulast.github.io/googleb16d2e2b5cd0da1f.html` after deployment.

#### Scenario: Verification file present after build

- GIVEN the file `public/googleb16d2e2b5cd0da1f.html` exists in the project root
- WHEN `bun run build` completes
- THEN `docs/googleb16d2e2b5cd0da1f.html` exists in the output

### Requirement: Build Scripts in package.json

The project's `package.json` MUST define a `build` script using Bun that runs `vite build` and the post-build copy steps (clean docs, copy dist → docs, duplicate 404.html). A `dev` script MUST start the Vite development server.

#### Scenario: bun run dev starts dev server

- GIVEN the developer runs `bun run dev`
- WHEN the command executes
- THEN the Vite development server starts on `http://localhost:3000` (or configured port) with no errors

#### Scenario: bun run build produces complete output

- GIVEN the developer runs `bun run build`
- WHEN the command executes
- THEN it exits with code 0
- AND `docs/index.html`, `docs/404.html`, and `docs/sitemap.xml` all exist
