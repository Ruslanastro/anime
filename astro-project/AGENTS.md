# AGENTS.md — AI Assistant Reference

## Project Identity

- **Name:** Аниме Топ 2026
- **Stack:** Astro v5 + Tailwind CSS v4 (static SPA)
- **Language:** Russian (UI, data, comments)
- **Entry:** `src/pages/index.astro` → single page app

## Build & Dev Commands

```bash
npm run dev      # astro dev (local server with HMR)
npm run build    # astro build → static dist/
npm run preview  # astro preview (serve built dist/)
```

## Project Structure

```
astro-project/
├── src/
│   ├── components/   # 12 .astro components
│   ├── data/         # Static data (animeData.js, lnData.js, characters/*.js)
│   ├── layouts/      # BaseLayout.astro
│   ├── pages/        # index.astro (sole page)
│   ├── scripts/      # 9 client JS modules (theme, tabs, search, detail, etc.)
│   └── styles/       # global.css (Tailwind v4 + custom styles)
├── public/
│   ├── images/posters/   # 55 anime posters
│   ├── images/characters/ # 26 character images
│   └── images/ln/        # 20 light novel covers
├── astro.config.mjs   # static output, Tailwind Vite plugin
└── package.json       # 3 deps: astro, tailwindcss, @tailwindcss/vite
```

## Architecture Rules

- **No JS framework** — All interactivity is vanilla JS in `src/scripts/`
- **SSG only** — `output: 'static'`, no SSR
- **Data at both sides** — `src/data/*.js` is imported by Astro (build) and client JS (runtime via import)
- **Tailwind v4** — Uses `@import "tailwindcss"` in CSS (no `tailwind.config.js`)
- **Russian language** — All visible text is in Russian

## Conventions

### Astro Components
- Use `class:list={[...]}` for dynamic classes (not `class="... {var}"`)
- Use backtick style for dynamic styles: `style={`width: ${val}%`}`
- No `set:html` — use proper Astro template syntax for context
- No `!important` in CSS — use doubled selectors (`.cls.cls:hover`) for specificity

### CSS
- Custom properties in `:root` (dark) and `.light` (light theme)
- No bare `!important` — prefer `.selector.selector:hover` doubling
- `will-change: transform` only on `.poster` (the only animated element)

### JS
- `localStorage` calls must be wrapped in `try/catch` (lsGet/lsSet helpers in theme.js)
- No `alert()` — use modal or DOM-based notifications
- Debounced search: 200ms via `setTimeout`/`clearTimeout`
- Module entry point: `src/scripts/main.js` → calls all `init*()` functions
- Character lookup: `map?.[ch.name]` (never use the map object as the character)
- Detail chrome: only stable ids — `#popularity-header`, `#popularity-sort`, `#search-row-popularity`, `#grid-popularity`, `#anime-detail-view` via `setPopularityChromeVisible` / `closeAnimeDetail` in `detail.js`
- Modal close: single `closeCharacterDetail` from `detail.js` (Escape in tabs imports it)
- Buttons: `#detail-back-btn`, `#char-modal-close` (never `querySelector('… button')`)

### Accessibility
- Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `tabindex`
- Tab panels: `role="tabpanel"`, `aria-labelledby`, `aria-hidden`
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Search: `aria-label` on input
- Clickable divs: `tabindex="0"`, `role="button"`, Enter/Space handler

### Images
- 55 posters in `/images/posters/` — referenced as `/images/posters/filename.jpg`
- Character images in `/images/characters/`
- LN covers in `/images/ln/`

## Key Data Structures

### Anime (animeData.js)
```js
{
  id: Number, rank: Number, title: String, members: String,
  score: String, poster: String, genre: String,
  shortDescription: String, description: String,
  _cozy: { score: Number, reason: String } | null,
  details: { seasons, episodes, source, volumes, studio, aired, status, type, malUrl, mainCharacters[] }
}
```

### InfoCard types
- `type="imba"` — hero card (name, anime, level, desc, power)
- `type="characters"` — character card (name, anime, desc, love%)
- `type="ecchi"` — ecchi card (title, reason, level, note, ring for #1)
- `type="cute"` — cute card (title, reason, cute score, note)

## Tab System
Six tabs: `popularity`, `imba`, `characters`, `ecchi`, `cute`, `ln`
Content containers: `id="content-{tab}"` with class `hidden` (except popularity)

## Session / Context Reset

On a new session, BEFORE doing anything else:
1. **Read this file** — understand conventions and rules
2. **Read `docs/CHANGELOG.md`** — know what was already changed
3. **Read `docs/PLANS.md`** — understand roadmap priorities
4. **Update `docs/CHANGELOG.md`** after making any changes
5. **Update `AGENTS.md`** if conventions, structure, or data shapes changed
6. **Update `docs/PLANS.md`** if a planned item is completed or a new idea emerges

All 4 doc files must stay in sync with the actual codebase.

## Session History
See `docs/CHANGELOG.md` for a complete record of changes.
