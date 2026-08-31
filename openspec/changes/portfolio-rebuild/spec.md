# Spec: Portfolio Rebuild

**Change**: portfolio-rebuild  
**Artifact Store**: hybrid  
**Date**: 2026-08-31  
**Status**: complete

---

## Coverage Summary

| Domain | Type | Requirements | Scenarios |
|--------|------|-------------|-----------|
| i18n-routing | New | 4 | 6 |
| hero-section | New | 3 | 5 |
| about-section | New | 2 | 4 |
| stack-section | New | 2 | 4 |
| projects-section | New | 4 | 6 |
| contact-section | New | 3 | 5 |
| seo-meta | New | 4 | 8 |
| github-pages-deploy | New | 4 | 7 |
| **Totals** | — | **26** | **45** |

---

## Spec Files

```
openspec/changes/portfolio-rebuild/specs/
├── i18n-routing/spec.md         — Locale routes, browser detection, language switcher, 404 trick
├── hero-section/spec.md         — Name + title, value prop, dual CTA (projects + contact)
├── about-section/spec.md        — Profile summary, 3 highlight cards
├── stack-section/spec.md        — Categorized tech badges, translated category labels
├── projects-section/spec.md     — 3 project cards with metrics and tech tags
├── contact-section/spec.md      — Mailto CTA, LinkedIn CTA, no server form
├── seo-meta/spec.md             — Per-locale meta, hreflang, canonical, sitemap.xml
└── github-pages-deploy/spec.md  — docs/ output, 404.html copy, Google SC file, build scripts
```

---

## Requirement Highlights

### i18n-routing
- All routes under `/es/*` and `/en/*`; root `/` redirects based on `navigator.language`
- Language switcher preserves context, navigates without reload
- `docs/404.html` identical to `docs/index.html` for GitHub Pages SPA routing

### hero-section
- Owner name + locale-translated title
- Locale-translated value proposition (1–2 sentences)
- Two CTA buttons: "View Work" → Projects scroll, "Contact" → Contact scroll

### about-section
- Locale-translated profile summary (no hard-coded strings)
- Exactly 3 highlight cards, each with icon, title, and description — all translated

### stack-section
- Badges grouped by categories; category labels translated, tech names are proper nouns (not translated)
- Section heading translated per locale

### projects-section
- Exactly 3 project cards; each has name, locale-translated description, at least one metric, and tech tags
- Project names and metrics NOT translated; descriptions ARE translated
- Section heading translated per locale

### contact-section
- Email via `mailto:` — no backend; CTA label translated
- LinkedIn link opens in new tab — CTA label translated
- No `<form>` element permitted in the section

### seo-meta
- Per-locale `<title>`, `<meta name="description">`, and OG tags via react-helmet-async
- `hreflang` alternate links for `en`, `es`, and `x-default` (→ `/en`) on every page
- `<link rel="canonical">` matching the current locale URL
- `docs/sitemap.xml` with both locale URLs generated at build time

### github-pages-deploy
- Vite `outDir` set to `docs/`; `docs/` cleaned before every build
- Post-build: `docs/404.html` = copy of `docs/index.html`
- `public/googleb16d2e2b5cd0da1f.html` preserved in output
- `bun run dev` starts Vite dev server; `bun run build` exits 0 with complete output

---

## Coverage Assessment

- **Happy paths**: ✅ Covered for all 8 domains
- **Edge cases**: ✅ Covered — locale fallback, GitHub Pages 404, non-Spanish browser languages, stale docs/ cleanup
- **Error states**: ⚠️ Partially covered — no specs for network failures or i18n key missing (not in scope per proposal); SEO validation handled post-deploy via Google Search Console

---

## Next Step

Ready for `sdd-design`. Design phase should address:
1. React Router v7 nested route tree structure
2. i18next + `i18next-browser-languagedetector` configuration
3. Tailwind v4 CSS-first token setup (`#1a1a2e`, `#e94560`, `#0f3460`)
4. Component hierarchy (atomic design recommended)
5. Build script (`bun run build` + post-build hooks)
6. Sitemap generation strategy (static template vs. script)
