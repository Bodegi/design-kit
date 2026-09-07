# design-kit

A framework-agnostic CSS design system and Open UI component library. Ships pure CSS (no runtime), a curated SVG icon suite, and a Vite-powered visual workshop deployed to GitHub Pages. `CONTRIBUTING.md` holds the procedure for changing it; this file holds the architecture and the rules.

## Architecture

Three tiers of design tokens, each layer consuming the one above:

1. **Primitives** (`src/tokens/primitives.css`) — raw scales on `:root`: spacing, type, radii, motion, shadow. No colors.
2. **Semantic contracts** (`src/tokens/semantic.css`) — intent tokens (`--color-primary`, `--color-bg-surface`, …) with a dark baseline on `:root` that acts as the fallback when a theme leaves a token unset.
3. **Theme presets** (`src/themes/*.css`) — concrete palettes scoped to `[data-theme="…"]` (and `:root[data-theme="…"]` for specificity over the baseline). A theme overrides only the tokens it changes; everything else cascades from the semantic baseline.

Components (`src/components/*.css`) style Open UI anatomy classes (`.ui-btn`, `.ui-field`, `.ui-panel`) and native elements (`<dialog>`, `[popover]`, `<details>`, `<progress>`, `<meter>`, `<table>`, `<select>`, `<input type="range">`, `<input type="file">`, `<input type="checkbox" switch>`) and read only Tier 2 tokens — never raw primitives or hex. Variants are driven by `data-*` attributes (`data-variant`, `data-size`, `data-intent`, `data-state`). Native elements are restyled through their vendor pseudo-elements, so those rules are duplicated per engine; where an engine has no pseudo for a part, the component falls back to a gradient driven by an optional `--ui-*` property the app sets, and reads correctly with it unset. Where a new stylable part exists only in some engines (`::picker(select)`, `::scroll-marker`, `::thumb`, `::highlight()`, CSS anchor positioning), the classic styling is the baseline and the enhancement sits inside `@supports`; each component's header states which.

`src/index.css` is the entry point: it `@import`s tokens then components, and adds the reset, base `body`, and focus-ring rule.

## Build & run

- `npm run dev` — Vite dev server for the workshop (`workshop/`).
- `npm run typecheck` — `tsc --noEmit` over `workshop/`.
- `npm run check:contrast` — `scripts/check-contrast.mjs` runs the WCAG AA gate over every `src/themes/*.css` and exits 1 on a failure (see WCAG below).
- `npm run build:icons` — `scripts/generate-icons.mjs` regenerates `src/icons/svg/*.svg` and `sprite.svg` from `src/icons/icon-data.js` (see Icons).
- `npm run build:css` — `scripts/build-css.mjs` copies `src/` → `dist/` verbatim (relative `@import`s resolve inside `dist/`). No bundling or minification.
- `prepare` — runs `build:css`. npm runs it after `npm install` here and when a consumer installs the kit from its Git URL, so `dist/` exists in the installed copy without being committed. It uses Node built-ins only, so it needs none of the devDependencies.
- `npm run build:workshop` — `vite build workshop` → `dist/workshop/`.
- `npm run build` — typecheck, contrast gate, icons, css, workshop, in that order, so a type error or a failing pairing stops the build before anything is emitted. CI (`.github/workflows/deploy-workshop.yml`) runs this on push to `main` under Node 24 (`.nvmrc`, `engines.node`) and publishes `dist/workshop/` to Pages.

`dist/` and `workshop/dist/` are gitignored; the workshop dev/build reads `src/` directly, not `dist/`. Consumers get `dist/` from the `prepare` script at install time.

## Icons

`src/icons/icon-data.js` is the single source of icon path data (`name → SVG inner markup`). Both consumers read it directly, so the copies can't drift:

- `scripts/generate-icons.mjs` (the `build:icons` script) imports it and writes `src/icons/svg/*.svg` and `src/icons/sprite.svg`.
- `workshop/src/icon-gallery.ts` imports it to render the gallery inline.

`build:icons` runs inside `npm run build`, so the committed `svg/` and `sprite.svg` outputs regenerate from the source and can't silently drift. To add or edit an icon, change `icon-data.js` alone — the standalone SVGs, the sprite, and the workshop gallery all follow from that one edit.

## Workshop

`workshop/index.html` boots `src/main.ts`, which imports the kit CSS and every theme stylesheet through Vite (not `<link>` tags — cross-root `<link>` CSS parsed to zero rules in dev) and renders four tabs from separate modules: `token-viewer.ts`, `component-matrix.ts`, `palette.ts`, `icon-gallery.ts`. The Palette tab live-edits the semantic color tokens with the WCAG gate wired in (seed a theme, edit any token with a `.ui-colorpicker`, watch sample components and the contrast table repaint, export a gate-passing theme file); its picker driving and the color-picker demo share `workshop/src/color-picker.ts`, and the shared contrast markup is exported from `token-viewer.ts`. Each component section is its own module under `workshop/src/sections/` exporting a `Section` (`html`, optional `wire`) with its own snippets and demo wiring — `sections/index.ts` lists them in display order, `sections/shared.ts` holds the helpers more than one uses, and `component-matrix.ts` composes them: it concatenates every `html`, attaches the copy buttons and the shared press-button pass, then runs each `wire`. Theme switching sets `data-theme` on `<html>` and re-renders the token view.

## Consuming projects

Installed via Git reference, pinned to a release tag (`"design-kit": "github:Bodegi/design-kit#v1.0.0"`). Consumers `@import "design-kit/dist/index.css"` plus one `dist/themes/*.css`, then optionally override color tokens in a later `:root` block. Public API is the token names and `.ui-*` class/anatomy contract; semantic versioning applies from v1.0.0, so renaming either is a major bump.

## Conventions

- **Open UI owns naming and anatomy.** Class names (`.ui-*`), `data-*` variants, and element structure follow the Open UI component-anatomy model (open-ui.org) — it is the sole authority for *how components are named and structured*. No individual app dictates names; apps contribute visuals (color, spacing, states, feel) only. Open UI publishes living explainers, not numbered releases, so we track its anatomy conventions rather than pinning a version. For components Open UI does not cover (app shell, sidebar nav, logo/watermark slots), extend the same conventions rather than inventing a new naming style.
- **WCAG AA is a hard gate.** No theme ships if any pairing fails the contrast check — body text 4.5:1, large text and UI parts 3.0:1.
  - *Where it runs.* `workshop/src/contrast.ts` holds the pairing list and the color math. The workshop's Token panel measures the active theme from computed styles and shows threshold, ratio and PASS/FAIL per row. `npm run check:contrast` runs the same pairings over every theme file and exits 1 on any failure; `npm run build` runs it, so a failing pairing fails the build and the CI deploy with it.
  - *What is measured.* The three text levels (`main`, `muted`, `dim`) on canvas and on surface; each intent's `-contrast` label on its fill; each intent as text on surface and as badge text on its own `-subtle` tint; `--color-border-focus` on canvas; `--color-primary` on surface; `--color-border-strong` on surface and on canvas at 3.0, because it draws the boundary of every field and a field sits on either ground. `--color-border-subtle` draws decorative dividers and is not gated. Translucent tokens are composited first — an alpha foreground over its resolved background, an alpha background over the ground beneath it — so a ratio reflects what the eye sees.
  - *What that forces on a theme.* `-contrast` and intent shades are derived to pass rather than lifted from an app verbatim. Text on a tinted intent surface is `--color-text-main`, with the intent carried by the border; the `-subtle` tints hold 4.5:1 under the intent color as badge text while staying at least 1.15:1 against surface. Text over a picture is measured against `--color-scrim`, an opaque band that `.ui-image[data-caption="overlay"]` keeps solid where the words sit.
- **Components reference semantic tokens only**; a new token is added to Tier 2 before a component uses it. A glyph a component cannot draw from borders is a `mask-image` data URI carrying shape and no color, with `background-color` supplying the ink, so it recolors with the theme.
- **The focus ring stays whole and reachable.** A component rounds or clips its content rather than its focusable frame (`.ui-avatar`, `.ui-image`); where the component is itself the clipping container (`details.ui-accordion`) the ring is drawn inset; where cells stack a decoration behind them (`.ui-datepicker-grid td`) a `:has(:focus-visible)` rule lifts the focused cell above its siblings; a visually hidden native control is clipped to a pixel rather than `display: none` so it stays in the focus order, and the ring is drawn on the sibling affordance (`.ui-file`).
- **No runtime — state keys off native/ARIA state.** The kit ships zero JS. Interactive components style their states from native or accessibility state (`aria-selected`, `aria-current`, `aria-pressed`, `[open]`, `:checked`, `:user-invalid`, `[data-state]`) so the consuming app drives behavior by toggling that state and the visual and a11y state cannot drift apart. Where the platform has a declarative driver (`popovertarget`, `commandfor`, `interestfor`, `<details name>`), the kit styles the result and the app writes no JS either; the README's driver table maps each. Demos in the workshop supply their own wiring; the shipped CSS never does.
- **A wrapper reads its state off the control it wraps.** A shell around a native input (`.ui-number`, `.ui-combobox`, `.ui-richtext`, `.ui-file`) takes its focus, invalid, read-only and disabled states from `:has()` on that input and clears the input's own ring, leaving exactly one. Both halves sit behind `@supports selector(:has(*))`, so an engine without `:has()` keeps the control's own ring rather than none.
- **A component that sets `display` also restores `[hidden]`**, because its own `display` declaration outranks the UA stylesheet's `[hidden] { display: none }`. A `[popover]` wrapper class restates `display: none` for `:not(:popover-open)` for the same reason. `grep '\[hidden\]' src/components/` lists the current set.
- **A flex row is not a list item.** A row laid out with `display: flex` generates no `::marker`, so `ol.ui-list` numbers its rows from a CSS counter in a `::before`.
- **Motion respects `prefers-reduced-motion`.** Any component with an entrance, loop, or transition stills it under `@media (prefers-reduced-motion: reduce)`.
- **Shape (corner radius) is a system constant, not a theme knob.** It lives in the Tier-1 `--radius-*` scale and the Tier-2 roles `--radius-inline` (2px, marks at text scale: `<code>`, `<mark>`, the checkbox tick box) / `--radius-nav` (6px, rows, option cells, small buttons inside a field) / `--radius-control` (10px, buttons and inputs) / `--radius-base` (12px, panels, popovers, listboxes), alongside `--radius-full` for pills and dots. Components round to a role; the intermediate Tier-1 steps are the roles' raw material. Themes set color tokens only. Blur is likewise two constants: `--blur-glass` (16px) for shell surfaces, `--blur-scrim` (4px) for the dialog backdrop.
- **A treatment repeated across components is shared once**, by whichever mechanism the repetition allows, and the markup gains no extra class:
  - A repeated color or shadow becomes a Tier-2 token: `--color-bg-current` + `--shadow-current-bar` carry the current row for `.ui-nav`, `.ui-list`, `.ui-accordion-group`, and the bar alone for `.ui-table`.
  - Declarations two selectors can both carry become one rule with a selector list: `.ui-tooltip-content` and `.ui-tooltip[popover="hint"]` share one surface and arrow.
  - Geometry no selector list can join is shared as private properties with identical values at each site: the chevron (`--_chevron-size`/`-weight`/`-rotate`, md 8px/2px, sm 6px/1.5px), the × (`--_x-size`/`-weight`, md 9px, sm 7px), the check (`--_check-size`/`-weight`, 10px/2px), the icon-button inset, the carousel dot.
  - Where none fits, both sites name the canonical definition in a comment: `.ui-image`'s shimmer mirrors `.ui-skeleton`'s because a `@keyframes` name is global.
  - A surface is provided by the host, not duplicated: `.ui-datepicker` composes `.ui-popover` or `.ui-panel` in the markup for its chrome.
- **Private custom properties are component-scoped**: `--_<component>-<name>`, so nested components never collide.
- **New theme**: scope to both `[data-theme="x"]` and `:root[data-theme="x"]`, and define the full intent set (`success`/`warning`/`danger`/`info` with `-hover`/`-subtle`/`-contrast`) so it reads against its own surfaces rather than the dark baseline.
- **Code is the ground truth; docs, comments, and trackers are verified against it.** Each drifts independently: a claim outdated by finished work, an issue closed with its boxes unticked, a comment describing a rule that moved. When one disagrees with the code, the code wins, the stale artifact is fixed in the same change, and tracker boxes are ticked as work lands. `CONTRIBUTING.md` states what a comment earns its place by saying and which cross-references survive a refactor.
- Keep files UTF-8 without BOM.
