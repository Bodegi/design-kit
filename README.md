# ✦ Design-Kit

A lightweight, framework-agnostic design system and component styling library built on **W3C Open UI** principles and native web standards.

* **100% Pure CSS**: Zero JavaScript runtime dependencies. Works in Vanilla JS, React, Vue, Svelte, and Tauri desktop applications.
* **Three-Tier Token System**: Global primitives $\to$ Semantic component contracts $\to$ Application theme presets.
* **Open UI Anatomy**: Standardized component parts (`.ui-field`, `.ui-dialog`, `.ui-panel`, etc.) leveraging native `<dialog>`, `[popover]`, and `<details>`.
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
* `design-kit/dist/themes/server-panel.css` (Industrial zinc / blue)
* `design-kit/dist/themes/codex.css` (Warm parchment / amber)
* `design-kit/dist/themes/tectonic.css` (Obsidian / violet)
* `design-kit/dist/themes/image-hoard.css` (Media dark / emerald)
* `design-kit/dist/themes/image-annotate.css` (High-contrast / orange)

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

Corner radius is a system constant, not a per-app knob: the `--radius-*` scale and the `--radius-nav` / `--radius-control` / `--radius-base` roles are shared by every app so they differ by color alone.

---

## Basic Usage

Components are plain HTML with an Open UI `.ui-*` anatomy class; variants are driven by `data-*` attributes:

```html
<button class="ui-btn" data-variant="outline" data-intent="primary" data-size="md">
  Save Changes
</button>
```

Because the kit ships **no JavaScript**, interactive components provide the styling and state hooks — your app supplies the behavior by toggling the relevant state. Style keys off native or ARIA state, so wiring it correctly also keeps it accessible: set `aria-selected` on a `.ui-tab`, add or remove a `.ui-toast`, toggle `[data-state]`. Native elements (`<dialog>`, `[popover]`, `<progress>`, `<meter>`) work through their own built-in APIs.

Browse the full component catalog — every variant, state, and copyable HTML/JSX snippet — in the **[live workshop](https://bodegi.github.io/design-kit/)** (or run it locally with `npm run dev`).

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
