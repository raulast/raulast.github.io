# Design: Portfolio Rebuild — Nuxt 3 → React 19 + TypeScript

**Change**: portfolio-rebuild
**Artifact Store**: hybrid
**Date**: 2026-08-31

---

## Technical Approach

Full greenfield replacement of the Nuxt 3 stub. Delete all Nuxt source files, scaffold a Bun + Vite + React 19 + TypeScript project with React Router v7 in SPA mode, react-i18next for bilingual content, Tailwind CSS v4 CSS-first setup, and a `docs/` static output strategy for GitHub Pages. No backend. All section components are purely presentational.

---

## Architecture Decisions

| Decision | Choice | Alternatives Rejected | Rationale |
|----------|--------|-----------------------|-----------|
| Runtime | Bun ≥ 1.1 | npm, pnpm | Faster installs; consistent with owner's stack preference |
| Router | React Router v7 (`createBrowserRouter`) | TanStack Router, Next.js | Owner-specified; SPA mode fits static GH Pages |
| i18n | react-i18next + i18next-browser-languagedetector | next-i18next, lingui | Owner-specified; zero-config SSR-free setup for SPA |
| CSS | Tailwind CSS v4, CSS-first (`@import`) | Tailwind v3 + config.js, CSS Modules | Owner-specified; v4 removes need for JS config |
| Meta | react-helmet-async | react-helmet, document.title | Async-safe; works in React 19 with concurrent features |
| Deploy | `docs/` folder, 404 trick | GitHub Actions + `gh-pages` branch | Simpler — no CI pipeline needed; owner already uses `docs/` |
| Build output | `dist/` → copy to `docs/` post-build | Direct `outDir: docs` in Vite | Separates Vite concerns from GH Pages publish source; allows clean wipe step |

---

## File and Folder Structure

```
raulast.github.io/
├── index.html                     # Vite HTML entry (root)
├── vite.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.ico                # Preserved
│   ├── googleb16d2e2b5cd0da1f.html  # Preserved — Search Console
│   └── robots.txt                 # New
├── src/
│   ├── main.tsx                   # ReactDOM.createRoot entry
│   ├── App.tsx                    # RouterProvider mount
│   ├── index.css                  # Tailwind v4 @import entry
│   ├── router/
│   │   └── index.tsx              # createBrowserRouter config
│   ├── i18n/
│   │   ├── index.ts               # i18next init + detector config
│   │   └── locales/
│   │       ├── en.json
│   │       └── es.json
│   ├── components/
│   │   ├── Layout.tsx             # <Outlet> wrapper with Header+Footer
│   │   ├── Header.tsx             # Nav + LanguageSwitcher
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx   # /en ↔ /es navigation button
│   │   ├── ProjectCard.tsx        # Presentational card
│   │   └── StackBadge.tsx         # Pill badge for tech name
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── StackSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   ├── pages/
│   │   ├── LocaleRoot.tsx         # Renders all sections in scroll order
│   │   └── RootRedirect.tsx       # Reads navigator.language → navigate()
│   └── types/
│       └── i18n.ts                # Translation key type definitions
├── scripts/
│   └── post-build.sh              # cp dist/index.html dist/404.html; rm -rf docs; cp -r dist docs
├── docs/                          # GH Pages publish source (git-tracked output)
└── openspec/                      # SDD artifacts (not shipped)
```

---

## Routing Architecture

```
/ ─────────────────── RootRedirect (navigate to /es or /en)
├── /en ──────────── Layout
│   └── index       LocaleRoot (Hero→About→Stack→Projects→Contact)
└── /es ──────────── Layout
    └── index       LocaleRoot
```

**React Router v7 config** (`src/router/index.tsx`):

```tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import LocaleRoot from '@/pages/LocaleRoot'
import RootRedirect from '@/pages/RootRedirect'

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  {
    path: '/:locale',           // matches 'en' | 'es'
    element: <Layout />,
    children: [{ index: true, element: <LocaleRoot /> }],
  },
])
```

**RootRedirect** reads `navigator.language` and calls `useNavigate` to `/es` (if `startsWith('es')`) else `/en`. No server round-trip.

---

## i18n Architecture

**Init** (`src/i18n/index.ts`):

```ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import es from './locales/es.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, es: { translation: es } },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: { order: ['path', 'navigator'] },
  })

export default i18n
```

**Locale JSON structure** (`src/i18n/locales/en.json`):

```json
{
  "hero": { "name": "Raúl Ast", "title": "Senior Full Stack Engineer & Tech Lead", "value": "...", "cta_work": "View Work", "cta_contact": "Contact" },
  "about": { "summary": "...", "cards": [{ "icon": "⚡", "title": "...", "desc": "..." }] },
  "stack": { "heading": "Tech Stack", "categories": { "frontend": "Frontend", "backend": "Backend", "infra": "Infrastructure" } },
  "projects": { "heading": "Projects", "items": [{ "name": "...", "desc": "...", "metric": "...", "tags": ["React", "TypeScript"] }] },
  "contact": { "heading": "Contact", "email_label": "Send Email", "linkedin_label": "LinkedIn" },
  "meta": { "title": "Raúl Ast — Senior Full Stack Engineer", "description": "...", "og_locale": "en_US" },
  "nav": { "switch_lang": "Español" }
}
```

**Usage pattern** in components:

```tsx
const { t, i18n } = useTranslation()
// <h1>{t('hero.name')}</h1>
// i18n.language → 'en' | 'es'
```

**LanguageSwitcher** navigates between `/en` and `/es` using `useNavigate` and sets `i18n.changeLanguage`.

---

## Tailwind v4 Setup

**`src/index.css`** (CSS-first, no `tailwind.config.js`):

```css
@import 'tailwindcss';

@theme {
  --color-bg: #1a1a2e;
  --color-accent-red: #e94560;
  --color-accent-blue: #0f3460;
  --color-text: #eaeaea;
  --font-sans: 'Inter', system-ui, sans-serif;
}

:root {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

Usage in components: `className="bg-bg text-accent-red"` (Tailwind v4 reads `@theme` tokens as utilities automatically).

**`vite.config.ts`**:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  build: { outDir: 'dist', emptyOutDir: true },
})
```

---

## SEO — react-helmet-async

**Provider** in `src/main.tsx`:

```tsx
import { HelmetProvider } from 'react-helmet-async'
// wrap <RouterProvider> with <HelmetProvider>
```

**Usage** in `LocaleRoot.tsx`:

```tsx
const { t, i18n } = useTranslation()
const locale = i18n.language  // 'en' | 'es'
const base = 'https://raulast.github.io'

<Helmet>
  <html lang={locale} />
  <title>{t('meta.title')}</title>
  <meta name="description" content={t('meta.description')} />
  <meta property="og:locale" content={t('meta.og_locale')} />
  <link rel="canonical" href={`${base}/${locale}`} />
  <link rel="alternate" hrefLang="en" href={`${base}/en`} />
  <link rel="alternate" hrefLang="es" href={`${base}/es`} />
  <link rel="alternate" hrefLang="x-default" href={`${base}/en`} />
</Helmet>
```

---

## GitHub Pages Deploy

**`scripts/post-build.sh`**:

```bash
#!/bin/bash
set -e
cp dist/index.html dist/404.html
cp public/googleb16d2e2b5cd0da1f.html dist/googleb16d2e2b5cd0da1f.html
node scripts/generate-sitemap.mjs   # writes dist/sitemap.xml
rm -rf docs
cp -r dist docs
```

**`package.json` scripts**:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build && bash scripts/post-build.sh",
    "preview": "vite preview"
  }
}
```

**Sitemap** (`scripts/generate-sitemap.mjs`): writes `dist/sitemap.xml` with `/en` and `/es` URLs and `xhtml:link` hreflang annotations.

---

## Component Architecture

| Component | Type | Receives | Notes |
|-----------|------|----------|-------|
| `Layout` | Container | — | `<Header/><Outlet/><Footer/>` |
| `Header` | Presentational | — | Logo + `<LanguageSwitcher/>` |
| `Footer` | Presentational | — | Copyright line (i18n) |
| `LanguageSwitcher` | Interactive | — | `useNavigate` + `i18n.changeLanguage` |
| `LocaleRoot` | Container | — | `<Helmet>` + all sections in order |
| `HeroSection` | Presentational | — | `t('hero.*')` + anchor links |
| `AboutSection` | Presentational | — | `t('about.*')` + 3 cards |
| `StackSection` | Presentational | — | `t('stack.*')` + `<StackBadge/>` |
| `ProjectsSection` | Presentational | — | `t('projects.*')` + `<ProjectCard/>` |
| `ContactSection` | Presentational | — | mailto + LinkedIn (no `<form>`) |
| `ProjectCard` | Presentational | `name, desc, metric, tags[]` | Pure display, no state |
| `StackBadge` | Presentational | `name` | Pill with accent color |

All section components read translations via `useTranslation()` — no prop drilling of translation data.

---

## Data Flow

```
navigator.language
      │
      ▼
RootRedirect ──navigate──► /en or /es
                                 │
                    Layout (Header + Footer)
                                 │
                          LocaleRoot
                       (Helmet + sections)
                                 │
                    i18next resource bundle
                    (en.json / es.json)
                                 │
              ┌──────────────────┼───────────────────┐
              ▼                  ▼                   ▼
         HeroSection       AboutSection      StackSection
                                                      │
                                               StackBadge[]
              │
      ProjectsSection ──► ProjectCard[]
              │
      ContactSection (mailto + LinkedIn anchors)
```

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `pages/`, `layouts/`, `components/`, `server/`, `app.vue` | Delete | Nuxt 3 source removed |
| `nuxt.config.ts`, `tailwind.config.js` | Delete | Replaced by Vite + CSS-first Tailwind |
| `assets/` | Delete | Replaced by `src/` |
| `index.html` | Create | Vite HTML entry at root |
| `vite.config.ts` | Create | Vite + Tailwind v4 + alias config |
| `tsconfig.json` | Replace | React + path alias config |
| `package.json` | Replace | React 19, Vite, react-router-dom, react-i18next, react-helmet-async |
| `src/main.tsx` | Create | App entry with HelmetProvider |
| `src/App.tsx` | Create | RouterProvider mount |
| `src/index.css` | Create | Tailwind v4 CSS-first + @theme tokens |
| `src/router/index.tsx` | Create | Route tree |
| `src/i18n/index.ts` | Create | i18next init |
| `src/i18n/locales/en.json` | Create | English translations |
| `src/i18n/locales/es.json` | Create | Spanish translations |
| `src/components/*.tsx` (6 files) | Create | Layout, Header, Footer, LanguageSwitcher, ProjectCard, StackBadge |
| `src/sections/*.tsx` (5 files) | Create | HeroSection, AboutSection, StackSection, ProjectsSection, ContactSection |
| `src/pages/*.tsx` (2 files) | Create | LocaleRoot, RootRedirect |
| `src/types/i18n.ts` | Create | Translation key types |
| `scripts/post-build.sh` | Create | 404 trick + copy to docs/ + sitemap |
| `scripts/generate-sitemap.mjs` | Create | Static sitemap generator |
| `public/googleb16d2e2b5cd0da1f.html` | Preserve | Search Console verification |
| `docs/` | Replace | New static build output (cleaned each build) |

Total new files: ~21. Deleted: ~8 Nuxt files/dirs.

---

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `RootRedirect` language detection logic | Vitest + mock `navigator.language` |
| Unit | `useTranslation` key resolution in sections | Vitest + i18next test setup |
| Unit | `LanguageSwitcher` navigate call | Vitest + React Testing Library |
| Component | Each section renders without crash | RTL smoke tests |
| Integration | Route `/en` and `/es` render correct locale | RTL + MemoryRouter |
| Build | `docs/404.html` === `docs/index.html` | Post-build shell assertion |
| Build | `docs/sitemap.xml` contains both locale URLs | Post-build node assert |

---

## Threat Matrix

N/A — no routing shell commands, no subprocess VCS/PR automation, no executable-file classification, and no process-integration boundary. The only shell in this design is the post-build copy script (`post-build.sh`), which uses only safe POSIX `cp`/`rm` against known static paths with no user-controlled input.

---

## Migration / Rollout

1. Tag last working Nuxt commit: `git tag nuxt-last`
2. Delete all Nuxt source files in a single commit labeled `chore: remove nuxt source`
3. Scaffold new Vite app (`bun create vite`) in a follow-up commit
4. Implement incrementally: router → i18n → sections → SEO → deploy script
5. Freeze current `docs/` before any build that writes to `docs/`
6. Rollback: `git checkout nuxt-last -- .`

---

## Open Questions

- [ ] Final CV data (project names, metrics, descriptions) for `en.json` / `es.json` — placeholder content required for apply phase if not provided
- [ ] Owner's email and LinkedIn URL — needed for ContactSection anchor hrefs

---

## Design Tokens Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#1a1a2e` | Page background |
| `--color-accent-red` | `#e94560` | CTAs, highlights |
| `--color-accent-blue` | `#0f3460` | Cards, secondary accents |
| `--color-text` | `#eaeaea` | Body text |

> **Note on Pen.app design file**: `design.pen` already exists at the project root as a placeholder. The visual design pass (using the Pen.app MCP tool) will populate it with components matching the tokens above. The code implementation defined in this document should follow the token values here; visual specifications in `design.pen` complement but do not override these code-level decisions.
