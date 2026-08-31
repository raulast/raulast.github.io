# Proposal: Portfolio Rebuild — Nuxt 3 → React 19 + TypeScript

## Intent

The current site is a minimal Nuxt 3 stub with no real portfolio content, no bilingual support, and no SEO strategy. The owner is a Senior Full Stack Engineer & Tech Lead who needs a professional, bilingual (ES/EN) portfolio to attract international opportunities. The rebuild replaces the entire Nuxt codebase with a modern React 19 + TypeScript stack deployed as a static site on GitHub Pages.

## Scope

### In Scope
- Remove all Nuxt 3 source files (`pages/`, `layouts/`, `components/`, `server/`, `nuxt.config.ts`, `tailwind.config.js`, `app.vue`)
- Scaffold new Bun + Vite + React 19 + TypeScript project
- Tailwind CSS v4 (CSS-first, no `tailwind.config.js`)
- React Router v7 SPA with `/es/*` and `/en/*` locale routes
- Browser language detection → auto-redirect to `/es` or `/en`
- Single-page scroll layout: Hero → About → Stack → Projects → Contact
- react-i18next for all UI strings (ES + EN translation files)
- react-helmet-async: per-locale meta tags, hreflang, canonical
- Static sitemap (`sitemap.xml`)
- GitHub Pages deploy via `docs/` folder (`dist/` → `docs/`, `404.html` trick)
- Preserve `public/googleb16d2e2b5cd0da1f.html` (Search Console verification)
- Design tokens: `#1a1a2e` bg, `#e94560` red accent, `#0f3460` blue accent
- 3 featured project cards with real content from CV
- Tech stack showcase grouped by category
- Contact section: mailto + LinkedIn (no form)

### Out of Scope
- Backend or API layer
- Blog / CMS
- Contact form with server-side handling
- Authentication
- Analytics integration
- Dark/light mode toggle (dark-only)
- `design.pen` Pen.app file (created by design subagent in sdd-design phase)

## Capabilities

### New Capabilities
- `site-scaffold`: Bun + Vite + React 19 + TypeScript project structure replacing Nuxt 3
- `locale-routing`: `/es/*` and `/en/*` routes with browser language detection and redirect
- `i18n-content`: react-i18next translation system with ES/EN content files
- `portfolio-sections`: Hero, About, Stack, Projects, Contact UI components
- `seo-meta`: react-helmet-async per-locale meta, hreflang, canonical, sitemap
- `github-pages-deploy`: `docs/` folder static output with 404 trick and build scripts

### Modified Capabilities
- None (full replace — no existing specs to delta)

## Approach

Full greenfield replacement: delete Nuxt source, scaffold new Vite app with `bun create vite`. Implement locale routing via React Router v7 `<Route>` nesting under `/es` and `/en` path segments. Language detection runs at root route — `i18next-browser-languagedetector` reads `navigator.language` and redirects. Translations live in `src/i18n/locales/{es,en}.json`. All section components are presentational; no data fetching. Build script outputs to `dist/`, post-build copies to `docs/` and duplicates `index.html` as `404.html`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `pages/` | Removed | Nuxt pages replaced |
| `layouts/` | Removed | Nuxt layouts replaced |
| `components/` | Removed | Nuxt components replaced |
| `server/` | Removed | Nuxt server dir removed |
| `nuxt.config.ts` | Removed | Replaced by `vite.config.ts` |
| `tailwind.config.js` | Removed | Replaced by CSS-first Tailwind v4 |
| `app.vue` | Removed | Replaced by `src/main.tsx` + `src/App.tsx` |
| `package.json` | Modified | New dependency tree (Bun runtime) |
| `src/` | New | Entire React app source |
| `public/` | Preserved | Google Search Console file kept |
| `docs/` | Modified | New static build output |
| `index.html` | New | Vite HTML entry (root level) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Tailwind v4 CSS-first config breaking changes | Low | Follow v4 migration docs; no `tailwind.config.js` needed |
| React Router v7 SPA mode on GitHub Pages | Low | 404 trick (`cp dist/index.html dist/404.html`) handles routing |
| hreflang / SEO misconfiguration | Med | Validate with Google Search Console post-deploy |
| Nuxt `docs/` artifacts interfering | Low | Clean `docs/` before each build in script |

## Rollback Plan

The current Nuxt 3 source is committed to `main`. Tag the last working Nuxt commit (`git tag nuxt-last`) before starting apply. To revert: `git checkout nuxt-last -- .` and `git push --force-with-lease`. The `docs/` folder currently serves live — freeze it before any apply step that touches `docs/`.

## Dependencies

- Bun ≥ 1.1 (runtime and package manager)
- Node.js ≥ 20 (CI fallback)
- GitHub Pages: `docs/` folder must remain the publish source in repo settings

## Success Criteria

- [ ] `bun run dev` starts Vite dev server with no errors
- [ ] `/` redirects to `/es` or `/en` based on browser language
- [ ] All 5 sections render in both locales with correct translated strings
- [ ] `bun run build` produces `docs/index.html` + `docs/404.html`
- [ ] Site is live at `https://raulast.github.io` after push to `main`
- [ ] Google Search Console verification file resolves at `/googleb16d2e2b5cd0da1f.html`
- [ ] `bun tsc --noEmit` passes with zero errors
- [ ] hreflang tags present and valid for both locales
