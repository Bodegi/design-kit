# design-kit

A framework-agnostic CSS design system and Open UI component library. Ships pure CSS (no runtime), a curated SVG icon suite, and a Vite-powered visual workshop deployed to GitHub Pages.

## Architecture

Three tiers of design tokens, each layer consuming the one above:

1. **Primitives** (`src/tokens/primitives.css`) — raw scales on `:root`: spacing, type, radii, motion, shadow. No colors.
2. **Semantic contracts** (`src/tokens/semantic.css`) — intent tokens (`--color-primary`, `--color-bg-surface`, …) with a dark baseline on `:root` that acts as the fallback when a theme leaves a token unset.
3. **Theme presets** (`src/themes/*.css`) — concrete palettes scoped to `[data-theme="…"]` (and `:root[data-theme="…"]` for specificity over the baseline). A theme overrides only the tokens it changes; everything else cascades from the semantic baseline.

Components (`src/components/*.css`) style Open UI anatomy classes (`.ui-btn`, `.ui-field`, `.ui-panel`, native `<dialog>`, `[popover]`, `<details>`) and read only Tier 2 tokens — never raw primitives or hex. Variants are driven by `data-*` attributes (`data-variant`, `data-size`, `data-intent`, `data-state`).

`src/index.css` is the entry point: it `@import`s tokens then components, and adds the reset, base `body`, and focus-ring rule.

## Build & run

- `npm run dev` — Vite dev server for the workshop (`workshop/`).
- `npm run build:css` — `scripts/build-css.mjs` copies `src/` → `dist/` verbatim (relative `@import`s resolve inside `dist/`). No bundling or minification.
- `npm run build:workshop` — `vite build workshop` → `dist/workshop/`.
- `npm run build` — both, in that order. CI (`.github/workflows/deploy-workshop.yml`) runs this on push to `main` and publishes `dist/workshop/` to Pages.

`dist/` and `workshop/dist/` are gitignored; the workshop dev/build reads `src/` directly, not `dist/`.

## Icons

Icon path data currently lives in three hand-maintained places that must stay in sync:

- `scripts/generate-icons.mjs` — writes `src/icons/svg/*.svg` and `src/icons/sprite.svg`. Run it manually (`node scripts/generate-icons.mjs`); it is not wired into `npm run build`.
- `workshop/src/icon-gallery.ts` — its own `iconDefs` copy, used to render the gallery inline.
- The committed `src/icons/svg/*.svg` and `src/icons/sprite.svg` outputs.

Editing an icon means updating the generator, re-running it, and updating the gallery copy. Consolidating to a single source is a known improvement (see the audit / tracker).

## Workshop

`workshop/index.html` links each theme stylesheet and boots `src/main.ts`, which renders three tabs from separate modules: `token-viewer.ts`, `component-matrix.ts`, `icon-gallery.ts`. Theme switching sets `data-theme` on `<html>` and re-renders the token view.

## Consuming projects

Installed via Git reference (`"design-kit": "github:Bodegi/design-kit#main"`). Consumers `@import "design-kit/dist/index.css"` plus one `dist/themes/*.css`, then optionally override tokens in a later `:root` block. Public API is the token names and `.ui-*` class/anatomy contract — keep both stable across changes.

## Conventions

- **Open UI owns naming and anatomy.** Class names (`.ui-*`), `data-*` variants, and element structure follow the Open UI component-anatomy model (open-ui.org) — it is the sole authority for *how components are named and structured*. No individual app dictates names; apps contribute visuals (color, spacing, states, feel) only. Open UI publishes living explainers, not numbered releases, so we track its anatomy conventions rather than pinning a version. For components Open UI does not cover (app shell, sidebar nav, logo/watermark slots), extend the same conventions rather than inventing a new naming style.
- **WCAG AA is a hard gate.** No theme ships if any pairing fails the workshop's contrast check (body text 4.5:1; large text / UI 3.0:1). Derive `-contrast` and accent shades to pass rather than lifting an app color verbatim when it fails.
- Components reference semantic tokens only; add a new token to Tier 2 before using it in a component.
- **Shape (corner radius) is a system constant, not a theme knob.** It lives in the Tier-1 `--radius-*` scale and the Tier-2 roles `--radius-nav` (6px) / `--radius-control` (10px, buttons & inputs) / `--radius-base` (12px, panels & cards). Themes set **color tokens only** and must not override radius, so every app shares one shape and differs by color alone.
- New theme: scope to both `[data-theme="x"]` and `:root[data-theme="x"]`, and define the full intent set (`success`/`warning`/`danger`/`info` and their `-subtle`/`-contrast`) so it reads correctly against its own surfaces rather than falling back to the dark baseline.
- Keep files UTF-8 without BOM.
