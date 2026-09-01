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
To customize tokens locally within your application, add a `:root` block after your theme import:

```css
@import "design-kit/dist/index.css";
@import "design-kit/dist/themes/server-panel.css";

/* Optional local overrides */
:root {
  --color-primary: #10b981;
  --radius-base: 6px;
}
```

---

## Component Taxonomy

### Buttons (`.ui-btn`)
```html
<!-- Variants: solid (default), outline, ghost -->
<!-- Intents: primary, danger, success -->
<!-- Sizes: sm, md (default), lg, icon -->
<button class="ui-btn" data-intent="primary" data-size="md">
  Save Changes
</button>

<button class="ui-btn" data-variant="outline" data-intent="danger">
  Delete Project
</button>
```

### Form Controls (`.ui-field`, `.ui-input`, `.ui-switch`)
```html
<div class="ui-field">
  <label class="ui-label" for="username">Username</label>
  <div class="ui-control">
    <input class="ui-input" id="username" type="text" placeholder="Enter username..." />
  </div>
  <span class="ui-help-text">Visible to workspace members.</span>
</div>

<!-- Toggle Switch -->
<label class="ui-switch">
  <input type="checkbox" checked />
  <span class="ui-switch-track"><span class="ui-switch-thumb"></span></span>
  <span>Enable Feature</span>
</label>
```

### Panels & Cards (`.ui-panel`)
```html
<div class="ui-panel" data-variant="raised">
  <div class="ui-panel-header">
    <h3 class="ui-panel-title">Panel Title</h3>
  </div>
  <div class="ui-panel-body">
    Panel content goes here.
  </div>
  <div class="ui-panel-footer">
    <button class="ui-btn" data-size="sm" data-intent="primary">Action</button>
  </div>
</div>
```

### Icons (`.ui-icon`)
```html
<svg class="ui-icon" data-size="md" aria-hidden="true">
  <use href="design-kit/dist/icons/sprite.svg#search"></use>
</svg>
```

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
