# Tasks: Portfolio Rebuild — Nuxt 3 → React 19 + TypeScript

**Change**: portfolio-rebuild
**Artifact Store**: hybrid
**Delivery Strategy**: auto-chain
**Chain Strategy**: stacked-to-main
**Date**: 2026-08-31

---

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 900–1 200 (21 new files + 8 deleted/replaced + 2 build scripts) |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 → PR 2 → PR 3 → PR 4 → PR 5 → PR 6 (stacked to main) |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Focused test command | Runtime harness | Rollback boundary |
|------|------|-----------|----------------------|-----------------|-------------------|
| 1 | Scaffold: Bun + Vite + React + TS + Router + Tailwind v4 + i18n init + locale files | PR 1 | `bun run dev` (no errors) | `bun run dev` → localhost:5173 loads | Revert all new files; restore Nuxt via `git checkout nuxt-last -- .` |
| 2 | Pen.app design + Layout + Header + Footer + LanguageSwitcher | PR 2 | `bun run dev` → /en loads layout | `bun run dev` → /en and /es render chrome | Revert Layout.tsx, Header.tsx, Footer.tsx, LanguageSwitcher.tsx, design.pen |
| 3 | Hero + About + Stack sections | PR 3 | `bun run dev` → three sections visible on /en and /es | `bun run dev` → scroll through three sections | Revert HeroSection.tsx, AboutSection.tsx, StackSection.tsx, StackBadge.tsx |
| 4 | Projects section | PR 4 | `bun run dev` → three project cards visible | `bun run dev` → scroll to Projects section | Revert ProjectsSection.tsx, ProjectCard.tsx, i18n projects keys |
| 5 | Contact section + SEO meta + sitemap | PR 5 | `bun run build` → docs/sitemap.xml exists | `bun run build` → inspect docs/index.html meta tags | Revert ContactSection.tsx, sitemap script, Helmet usage in LocaleRoot.tsx |
| 6 | Build optimization + GitHub Pages deploy verification | PR 6 | `bun run build` → exit 0; docs/404.html exists | `bun run build` → verify docs/ structure | Revert scripts/post-build.sh changes; no functional section rollback needed |

---

## ⚠️ Required Inputs Before Apply

The following MUST be provided before the apply phase starts:

- **Final CV data** — project names, metrics, descriptions for `en.json` / `es.json` (placeholders used otherwise)
- **Owner's email** — for `ContactSection` mailto href
- **Owner's LinkedIn URL** — for `ContactSection` LinkedIn anchor

---

## Phase 1 — Project Scaffold (PR 1)

- [ ] 1.1 Tag last Nuxt commit: `git tag nuxt-last`
- [ ] 1.2 Delete Nuxt source files: `pages/`, `layouts/`, `components/`, `server/`, `app.vue`, `nuxt.config.ts`, `tailwind.config.js`, `assets/` — single commit "chore: remove Nuxt 3 source"
- [ ] 1.3 Run `bun create vite . --template react-ts`; resolve any conflicts; commit scaffold as "chore: scaffold Vite + React 19 + TypeScript"
  - Files: `index.html`, `vite.config.ts`, `tsconfig.json`, `package.json`, `src/main.tsx`, `src/App.tsx`
  - AC: `bun install` exits 0; `bun run dev` starts without errors
- [ ] 1.4 Install dependencies: `react-router-dom@7`, `react-i18next`, `i18next`, `i18next-browser-languagedetector`, `react-helmet-async`; dev-deps: `@tailwindcss/vite`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
  - Files: `package.json`
  - AC: `bun install` exits 0; no peer-dep warnings for React 19
- [ ] 1.5 Configure `vite.config.ts`: add `@tailwindcss/vite` plugin, `@` alias to `src/`, `base: '/'`, `outDir: 'dist'`; add Vitest config block (`environment: 'jsdom'`)
  - Files: `vite.config.ts`
  - AC: `bun run dev` loads at localhost:5173 without Tailwind errors
- [ ] 1.6 Create `src/index.css` with Tailwind v4 CSS-first setup: `@import 'tailwindcss'` + `@theme` block with all four design tokens (`--color-bg`, `--color-accent-red`, `--color-accent-blue`, `--color-text`, `--font-sans`)
  - Files: `src/index.css`
  - AC: Tailwind utility classes resolve in browser; no console warnings
- [ ] 1.7 Create `src/i18n/index.ts` with i18next init: `LanguageDetector`, `detection.order: ['path', 'navigator']`, `fallbackLng: 'en'`, static resources pointing to en.json and es.json
  - Files: `src/i18n/index.ts`
  - AC: `i18n.language` resolves from URL path without page reload
- [ ] 1.8 Create `src/i18n/locales/en.json` and `src/i18n/locales/es.json` with all top-level keys: `hero`, `about`, `stack`, `projects`, `contact`, `meta`, `nav` — populated with real or placeholder content
  - Files: `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
  - AC: All required i18n keys present; no missing-key warnings in console
- [ ] 1.9 Create `src/types/i18n.ts` with TypeScript type definitions for translation key paths
  - Files: `src/types/i18n.ts`
  - AC: `tsc --noEmit` exits 0; i18n key types resolve in editor
- [ ] 1.10 Create `src/router/index.tsx` with `createBrowserRouter`: root route → `<RootRedirect />`, `/:locale` route → `<Layout />` with `<LocaleRoot />` index child (stub components for now)
  - Files: `src/router/index.tsx`
  - AC: App renders without router errors; `/en` and `/es` resolve without 404
- [ ] 1.11 Create stub `src/pages/RootRedirect.tsx`: reads `navigator.language`, calls `useNavigate` to `/es` or `/en`
  - Files: `src/pages/RootRedirect.tsx`
  - AC: Navigating to `/` redirects to `/es` or `/en` based on browser language
- [ ] 1.12 Create stub `src/pages/LocaleRoot.tsx`: renders `<main>` placeholder; wraps with `HelmetProvider`
  - Files: `src/pages/LocaleRoot.tsx`
  - AC: `/en` and `/es` routes render without errors

---

## Phase 2 — Design in Pen.app + Layout Chrome (PR 2)

- [ ] 2.1 Open Pen.app MCP; create `design.pen` file with component frames for Header, Footer, HeroSection, AboutSection, StackSection, ProjectsSection, ContactSection using design tokens from `src/index.css`
  - Files: `design.pen`
  - AC: `design.pen` committed to repo root; frames match design token colors
- [ ] 2.2 Create `src/components/LanguageSwitcher.tsx`: renders button(s) for `/en` ↔ `/es`; calls `useNavigate` + `i18n.changeLanguage`
  - Files: `src/components/LanguageSwitcher.tsx`
  - AC: Clicking switcher updates URL and content locale without page reload
- [ ] 2.3 Create `src/components/Header.tsx`: renders logo/name + `<LanguageSwitcher />`; uses `t('nav.*')` keys
  - Files: `src/components/Header.tsx`
  - AC: Header renders in both locales; LanguageSwitcher is functional
- [ ] 2.4 Create `src/components/Footer.tsx`: copyright line from `t('nav.copyright')`
  - Files: `src/components/Footer.tsx`
  - AC: Footer renders; text updates on locale switch
- [ ] 2.5 Create `src/components/Layout.tsx`: wraps `<Header />`, `<Outlet />`, `<Footer />` inside a root `<div>` with `bg-[--color-bg] text-[--color-text]`
  - Files: `src/components/Layout.tsx`
  - AC: `/en` and `/es` render full page chrome with header + footer

---

## Phase 3 — Hero + About + Stack Sections (PR 3)

- [ ] 3.1 Create `src/components/StackBadge.tsx`: presentational pill badge; accepts `name: string` prop
  - Files: `src/components/StackBadge.tsx`
  - AC: Badge renders with correct styling; name is never translated
- [ ] 3.2 Create `src/sections/HeroSection.tsx`: renders `t('hero.name')`, `t('hero.title')`, `t('hero.summary')`; two anchor CTAs (`#projects`, `#contact`) with translated labels
  - Files: `src/sections/HeroSection.tsx`
  - AC: Hero renders in both locales; CTAs scroll to correct section anchors
- [ ] 3.3 Create `src/sections/AboutSection.tsx`: renders profile summary + exactly 3 highlight cards (icon, title, description) — all from `t('about.*')`
  - Files: `src/sections/AboutSection.tsx`
  - AC: Exactly 3 cards visible; all text locale-aware; no hard-coded strings
- [ ] 3.4 Create `src/sections/StackSection.tsx`: renders section heading from `t('stack.heading')`; groups `StackBadge` components by category; category labels translated, tech names not translated
  - Files: `src/sections/StackSection.tsx`
  - AC: Categories and badges render; category labels update on locale switch; badge names stay English
- [ ] 3.5 Wire Hero, About, Stack into `src/pages/LocaleRoot.tsx` in scroll order with section `id` attributes; add per-locale Helmet block (title, description, og:locale, canonical, hreflang en/es/x-default)
  - Files: `src/pages/LocaleRoot.tsx`
  - AC: Sections visible in scroll order; browser tab title matches locale

---

## Phase 4 — Projects Section (PR 4)

- [ ] 4.1 Create `src/components/ProjectCard.tsx`: presentational card; props: `name: string`, `description: string`, `metric: string`, `tags: string[]`; description locale-aware via prop; name/metric/tags not translated
  - Files: `src/components/ProjectCard.tsx`
  - AC: Card renders with all four data areas visible
- [ ] 4.2 Create `src/sections/ProjectsSection.tsx`: renders section heading from `t('projects.heading')`; maps exactly 3 project entries from `t('projects.items')` to `<ProjectCard />`
  - Files: `src/sections/ProjectsSection.tsx`
  - AC: Exactly 3 cards rendered; descriptions update on locale switch; names/metrics/tags unchanged
- [ ] 4.3 Populate `en.json` and `es.json` with `projects.items` array (3 entries each): name, description, metric, tags
  - Files: `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
  - AC: All three cards display correct locale descriptions; names and metrics identical in both locales
- [ ] 4.4 Wire ProjectsSection into `src/pages/LocaleRoot.tsx` with `id="projects"` anchor
  - Files: `src/pages/LocaleRoot.tsx`
  - AC: Hero "View Work" CTA smooth-scrolls to ProjectsSection

---

## Phase 5 — Contact Section + SEO + Sitemap (PR 5)

- [ ] 5.1 Create `src/sections/ContactSection.tsx`: email `<a href="mailto:...">` with `t('contact.emailLabel')`; LinkedIn `<a href="..." target="_blank">` with `t('contact.linkedinLabel')`; no `<form>` element
  - Files: `src/sections/ContactSection.tsx`
  - AC: Email CTA opens mail client; LinkedIn opens profile in new tab; no `<form>` in DOM
- [ ] 5.2 Populate `en.json` and `es.json` with `contact.*` keys: `emailLabel`, `linkedinLabel`, `heading`; insert real email and LinkedIn URL values
  - Files: `src/i18n/locales/en.json`, `src/i18n/locales/es.json`
  - AC: Email and LinkedIn CTAs contain correct href values; labels locale-aware
- [ ] 5.3 Wire ContactSection into `src/pages/LocaleRoot.tsx` with `id="contact"` anchor
  - Files: `src/pages/LocaleRoot.tsx`
  - AC: Hero "Contact" CTA smooth-scrolls to ContactSection
- [ ] 5.4 Complete Helmet block in `LocaleRoot.tsx`: inject canonical `<link>`, hreflang `en` / `es` / `x-default` (`→/en`), `og:locale`, `og:title`, `og:description` from i18n meta keys
  - Files: `src/pages/LocaleRoot.tsx`
  - AC: Inspect DOM on `/en` and `/es` — all required `<link>` and `<meta>` tags present
- [ ] 5.5 Create `scripts/generate-sitemap.mjs`: writes `dist/sitemap.xml` with `<url>` entries for `/en` and `/es` with `<xhtml:link>` hreflang annotations
  - Files: `scripts/generate-sitemap.mjs`
  - AC: `node scripts/generate-sitemap.mjs` (pointing to `dist/`) produces valid XML with both locale URLs
- [ ] 5.6 Create `public/robots.txt` pointing `Sitemap:` to `https://raulast.github.io/sitemap.xml`
  - Files: `public/robots.txt`
  - AC: `docs/robots.txt` present after build

---

## Phase 6 — Build Pipeline + GitHub Pages Deploy (PR 6)

- [ ] 6.1 Create `scripts/post-build.sh`: (1) `cp dist/index.html dist/404.html`; (2) `cp public/googleb16d2e2b5cd0da1f.html dist/`; (3) `node scripts/generate-sitemap.mjs`; (4) `rm -rf docs && cp -r dist docs`; `chmod +x`
  - Files: `scripts/post-build.sh`
  - AC: Script is executable; each step runs without error on a clean `dist/`
- [ ] 6.2 Update `package.json` build script to: `tsc --noEmit && vite build && bash scripts/post-build.sh`; verify `dev` script is `vite`
  - Files: `package.json`
  - AC: `bun run build` exits 0; `docs/index.html`, `docs/404.html`, `docs/sitemap.xml`, `docs/googleb16d2e2b5cd0da1f.html` all exist
- [ ] 6.3 Verify `docs/404.html` byte-identical to `docs/index.html` post-build; add assertion in post-build.sh or README note
  - Files: `scripts/post-build.sh` (or `docs/`)
  - AC: `diff docs/index.html docs/404.html` exits 0
- [ ] 6.4 Confirm GitHub Pages repo settings: source = `main` branch, folder = `/docs`; no GitHub Actions CI needed
  - Files: (repository settings — no file change)
  - AC: `https://raulast.github.io/en` resolves correctly after push; direct URL access resolves via 404.html fallback

---

## Task Summary

| Phase | PR | Tasks | Focus |
|-------|----|-------|-------|
| Phase 1 | PR 1 | 12 | Scaffold + Router + i18n + locale files |
| Phase 2 | PR 2 | 5 | Pen.app design + Layout chrome |
| Phase 3 | PR 3 | 5 | Hero + About + Stack sections |
| Phase 4 | PR 4 | 4 | Projects section |
| Phase 5 | PR 5 | 6 | Contact + SEO meta + Sitemap |
| Phase 6 | PR 6 | 4 | Build pipeline + GH Pages verification |
| **Total** | 6 PRs | **36** | — |
