# design-kit

A framework-agnostic CSS design system and Open UI component library. Ships pure CSS (no runtime), a curated SVG icon suite, and a Vite-powered visual workshop deployed to GitHub Pages.

## Architecture

Three tiers of design tokens, each layer consuming the one above:

1. **Primitives** (`src/tokens/primitives.css`) — raw scales on `:root`: spacing, type, radii, motion, shadow. No colors.
2. **Semantic contracts** (`src/tokens/semantic.css`) — intent tokens (`--color-primary`, `--color-bg-surface`, …) with a dark baseline on `:root` that acts as the fallback when a theme leaves a token unset.
3. **Theme presets** (`src/themes/*.css`) — concrete palettes scoped to `[data-theme="…"]` (and `:root[data-theme="…"]` for specificity over the baseline). A theme overrides only the tokens it changes; everything else cascades from the semantic baseline.

Components (`src/components/*.css`) style Open UI anatomy classes (`.ui-btn`, `.ui-field`, `.ui-panel`) and native elements (`<dialog>`, `[popover]`, `<details>`, `<progress>`, `<meter>`, `<table>`) and read only Tier 2 tokens — never raw primitives or hex. Variants are driven by `data-*` attributes (`data-variant`, `data-size`, `data-intent`, `data-state`). Native form/status elements are restyled through their vendor pseudo-elements (`::-webkit-progress-value`, `::-moz-meter-bar`, …), so those rules are duplicated per engine.

`src/index.css` is the entry point: it `@import`s tokens then components, and adds the reset, base `body`, and focus-ring rule.

## Build & run

- `npm run dev` — Vite dev server for the workshop (`workshop/`).
- `npm run build:icons` — `scripts/generate-icons.mjs` regenerates `src/icons/svg/*.svg` and `sprite.svg` from `src/icons/icon-data.js` (see Icons).
- `npm run build:css` — `scripts/build-css.mjs` copies `src/` → `dist/` verbatim (relative `@import`s resolve inside `dist/`). No bundling or minification.
- `npm run build:workshop` — `vite build workshop` → `dist/workshop/`.
- `npm run build` — icons, then css, then workshop, in that order. CI (`.github/workflows/deploy-workshop.yml`) runs this on push to `main` and publishes `dist/workshop/` to Pages.

`dist/` and `workshop/dist/` are gitignored; the workshop dev/build reads `src/` directly, not `dist/`.

## Icons

`src/icons/icon-data.js` is the single source of icon path data (`name → SVG inner markup`). Both consumers read it directly, so the copies can't drift:

- `scripts/generate-icons.mjs` (the `build:icons` script) imports it and writes `src/icons/svg/*.svg` and `src/icons/sprite.svg`.
- `workshop/src/icon-gallery.ts` imports it to render the gallery inline.

`build:icons` runs as the first step of `npm run build`, so the committed `svg/` and `sprite.svg` outputs regenerate from the source and can't silently drift. To add or edit an icon, change `icon-data.js` alone — the standalone SVGs, the sprite, and the workshop gallery all follow from that one edit.

## Workshop

`workshop/index.html` boots `src/main.ts`, which imports the kit CSS and every theme stylesheet through Vite (not `<link>` tags — cross-root `<link>` CSS parsed to zero rules in dev) and renders three tabs from separate modules: `token-viewer.ts`, `component-matrix.ts`, `icon-gallery.ts`. Theme switching sets `data-theme` on `<html>` and re-renders the token view.

## Consuming projects

Installed via Git reference (`"design-kit": "github:Bodegi/design-kit#main"`). Consumers `@import "design-kit/dist/index.css"` plus one `dist/themes/*.css`, then optionally override tokens in a later `:root` block. Public API is the token names and `.ui-*` class/anatomy contract — keep both stable across changes.

## Conventions

- **Open UI owns naming and anatomy.** Class names (`.ui-*`), `data-*` variants, and element structure follow the Open UI component-anatomy model (open-ui.org) — it is the sole authority for *how components are named and structured*. No individual app dictates names; apps contribute visuals (color, spacing, states, feel) only. Open UI publishes living explainers, not numbered releases, so we track its anatomy conventions rather than pinning a version. For components Open UI does not cover (app shell, sidebar nav, logo/watermark slots), extend the same conventions rather than inventing a new naming style.
- **WCAG AA is a hard gate.** No theme ships if any pairing fails the workshop's contrast check (body text 4.5:1; large text / UI 3.0:1). Derive `-contrast` and accent shades to pass rather than lifting an app color verbatim when it fails. Text on a tinted intent surface is `--color-text-main`, with the intent carried by the border (a 3.0:1 UI part) — the intent color on its own `-subtle` tint falls under 4.5:1 in several themes. `.ui-tag` is the model here; `.ui-badge` still colors its label with the intent.
- Components reference semantic tokens only; add a new token to Tier 2 before using it in a component.
- **No runtime — state keys off native/ARIA state.** The kit ships zero JS. Interactive components style their states from native or accessibility state (`aria-selected`, `aria-current`, `[open]`, `:indeterminate`, `[data-state]`) so the consuming app drives behavior by toggling that state — the visual and a11y state can never drift apart. Demos in the workshop supply their own wiring; the shipped CSS never does.
- **A flex row is not a list item.** A component that lays its rows out with `display: flex` stops generating the native `::marker`, so an ordered variant (`ol.ui-list`) numbers its rows from a CSS counter drawn in a `::before` inside the row.
- **A component that sets `display` has to restore `[hidden]`.** A part an app shows and hides with the `hidden` attribute (`.ui-combobox-clear`) needs its own `[hidden] { display: none }` rule, because the component's `display` declaration outranks the UA stylesheet's.
- **Motion respects `prefers-reduced-motion`.** Any component with an entrance/loop/transition (toast, tooltip, progress, meter, …) neutralizes or stills it under `@media (prefers-reduced-motion: reduce)`.
- **Shape (corner radius) is a system constant, not a theme knob.** It lives in the Tier-1 `--radius-*` scale and the Tier-2 roles `--radius-nav` (6px) / `--radius-control` (10px, buttons & inputs) / `--radius-base` (12px, panels & cards). Themes set **color tokens only** and must not override radius, so every app shares one shape and differs by color alone.
- New theme: scope to both `[data-theme="x"]` and `:root[data-theme="x"]`, and define the full intent set (`success`/`warning`/`danger`/`info` and their `-subtle`/`-contrast`) so it reads correctly against its own surfaces rather than falling back to the dark baseline.
- **Code is the ground truth; keep docs and trackers honest.** Docs (this file included), comments, and issues all drift from reality independently — a claim silently outdated by finished work, or an issue closed with its checkboxes never ticked (so done work reads as undone). When any of them disagrees with the code, the code wins: verify the mechanism a claim names against the repo before trusting it — "no open tracker" doesn't prove a claim still holds, and a "closed issue with unchecked boxes" doesn't prove the work is missing. Fix the stale artifact when you find it, and tick tracker boxes / update these docs as work lands so the next reader isn't misled.
- Keep files UTF-8 without BOM.
