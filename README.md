# ✦ Design-Kit

A lightweight, framework-agnostic design system and component styling library built on **W3C Open UI** principles and native web standards.

* **100% Pure CSS**: Zero JavaScript runtime dependencies. Works in Vanilla JS, React, Vue, Svelte, and Tauri desktop applications.
* **Three-Tier Token System**: Global primitives → Semantic component contracts → Application theme presets.
* **Open UI Anatomy**: Standardized component parts (`.ui-field`, `.ui-dialog`, `.ui-panel`, etc.) leveraging native `<dialog>`, `[popover]`, `<details>`, `<table>`, `<progress>`, `<meter>`, `<select>`, `<textarea>`, and `<input>` in its `range`, `file`, `number`, `date`, and `checkbox switch` forms.
* **Curated SVG Icon Suite**: 38 essential UI vector icons packaged as an SVG sprite and standalone SVGs.
* **Vite Visual Workshop**: Fast component/token preview catalog deployable to GitHub Pages.

---

## Installation

Install directly in your project via Git reference in `package.json`:

```json
{
  "dependencies": {
    "design-kit": "github:Bodegi/design-kit#main"
  }
}
```

---

## Quick Start

### 1. Import Base Styles & Theme Preset
In your application root stylesheet (or JavaScript entrypoint):

```css
/* Import core tokens & Open UI component classes */
@import "design-kit/dist/index.css";

/* Import your project theme preset */
@import "design-kit/dist/themes/server-panel.css";
```

### 2. Available Theme Presets
* `design-kit/dist/themes/default-dark.css`
* `design-kit/dist/themes/default-light.css`
* `design-kit/dist/themes/server-panel.css` (Near-black neutral / grass green)
* `design-kit/dist/themes/codex.css` (Navy / amber gold)
* `design-kit/dist/themes/tectonic.css` (Obsidian / magma amber)
* `design-kit/dist/themes/image-hoard.css` (Navy / indigo)
* `design-kit/dist/themes/image-annotate.css` (Blue slate / light blue)

### 3. Optional Local Overrides (Escape Hatch)
To customize colors locally within your application, add a `:root` block after your theme import:

```css
@import "design-kit/dist/index.css";
@import "design-kit/dist/themes/server-panel.css";

/* Optional local overrides */
:root {
  --color-primary: #10b981;
  --color-primary-contrast: #052e16;
}
```

Corner radius is a system constant, not a per-app knob: the `--radius-*` scale and the `--radius-inline` / `--radius-nav` / `--radius-control` / `--radius-base` roles are shared by every app so they differ by color alone.

---

## Basic Usage

Components are plain HTML with an Open UI `.ui-*` anatomy class; variants are driven by `data-*` attributes:

```html
<button class="ui-btn" data-variant="outline" data-intent="primary" data-size="md">
  Save Changes
</button>
```

Because the kit ships **no JavaScript**, interactive components provide the styling and state hooks — your app supplies the behavior by toggling the relevant state. Style keys off native or ARIA state, so wiring it correctly also keeps it accessible.

Browse the full component catalog — every variant, state, and copyable HTML/JSX snippet — in the **[live workshop](https://bodegi.github.io/design-kit/)** (or run it locally with `npm run dev`).

---

## Driving components without JavaScript

The kit ships no JavaScript, and where the platform provides a declarative driver, using it means your app writes none either.

| Component | What the app toggles | What the kit styles | Native driver |
| --- | --- | --- | --- |
| Dialog | nothing — `showModal()` / `close()` set `[open]` | the open `dialog.ui-dialog` and its `::backdrop` | `<dialog>` |
| Popover and Menu | nothing when a `popovertarget` or `commandfor` button opens it | the open `[popover].ui-popover` and the `.ui-menu` inside it | `popovertarget`, or `commandfor` + `command="show-popover" / "toggle-popover" / "hide-popover"` |
| Accordion and Exclusive Accordion | nothing — `<summary>` toggles `[open]` | `details.ui-accordion[open]`, plus shared radii and dividers in `.ui-accordion-group` | `<details>`, and `<details name>` for one-at-a-time |
| Tabs | `aria-selected` on the `.ui-tab`, `hidden` on the panel | the selected tab's ink and its indicator edge | — |
| Press buttons and Tag filters | `aria-pressed` (a tag also accepts `aria-selected`) | the pressed ground per variant and intent, including `aria-pressed="mixed"` | — |
| Nav, List and Breadcrumb current item | `aria-current` | the current row or crumb's tint and ink | — |
| Table sort and selection | `aria-sort` on the `th`, `aria-selected` on the `tr` | the sort indicator direction and the selected row's tint | — |
| Combobox | `aria-expanded` on the input, `data-active` and `aria-selected` on options; `data-state="error"` or `aria-invalid` for the error ring | the chevron flip, the active-descendant highlight, the chosen option's check | `[popover]` on the listbox — Escape and light-dismiss are the UA's |
| Datepicker | `aria-selected`, `aria-current="date"`, `data-range` on days | today's ring, the selection fill, and the range span | `[popover]` on the panel — Escape, light-dismiss and anchoring are the UA's |
| Progress and Meter | the `value` attribute | the fill, and the sweep when `<progress>` has no value; `<meter>` recolors by threshold | `<progress>`, `<meter>` |
| Slider | nothing; optionally `--ui-slider-value` as a percent | the track, the filled portion, and the thumb | `<input type="range">` |
| Number | wire the stepper buttons to the input's `stepUp()` / `stepDown()`; `data-state="error"` or `aria-invalid` for the error ring | the field shell, adornments, and stepper buttons | `<input type="number">` |
| File | `data-state="dragover"` during a drag; `data-state="error"` or `aria-invalid` | the drop zone's active ring and the rejected state | `<input type="file">`, restyled through `::file-selector-button` |
| Skeleton and Image loading | `aria-busy="true"` on the region or frame, removed when content arrives | the shimmer placeholder; `data-state="error"` swaps in the image fallback | — |
| Carousel | nothing where `::scroll-marker` is supported; otherwise `aria-current` on `.ui-carousel-marker` | scroll-snap, the markers, and the current dot | scroll-snap plus `::scroll-marker` |
| Switch | nothing — the control's own `:checked` state | the track and thumb, in both the wrapper and single-element renderings | `<input type="checkbox" switch>` |
| Toast | add and remove `.ui-toast`; `data-state="closing"` before removal | the corner stack, the entrance, and the exit | — |
| Alert dismiss | remove the element | the standing message block and its `.ui-alert-close` | — |
| Richer Text | `aria-pressed` on toolbar buttons; `aria-invalid` or `data-state="error"` on the field | the field chrome, the toolbar rail, and the error ring | — |
| Tooltip | nothing on the hint path; `aria-describedby` once on the CSS-tooltip path | the shared tooltip surface, arrow, and `data-placement` | `interestfor` on the trigger + `popover="hint"` on the target (Chromium); the CSS `:hover` / `:focus-within` tooltip everywhere else |

---

## Workshop Development

To run the local visual workshop and inspect tokens, components, and icons in real time:

```bash
npm install
npm run dev
```

To compile CSS and workshop production bundles:

```bash
npm run build
```

`npm run build` type-checks the workshop and then runs the WCAG AA contrast
gate (`npm run check:contrast`) over every theme before it emits anything, so a
failing color pairing fails the build. The workshop's Token panel shows the
same measurements per pairing for the theme you are looking at.
