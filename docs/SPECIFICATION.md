# Design Specification: `design-kit`

`design-kit` is a lightweight, framework-agnostic design system and component styling library. It establishes a centralized source of truth for design tokens, implements component patterns aligned with W3C Open UI specifications, provides a curated SVG icon suite, and includes an interactive Vite-powered visual workshop deployed via GitHub Pages.

---

## 1. System Overview & Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Open UI Semantic & Anatomy Layer                         │
│    - Native HTML Primitives (<dialog>, popover, <details>)  │
│    - Standard Component Parts (.ui-field, .ui-label)        │
│    - Keyboard & Accessibility Contracts                     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Design Token & Variant Engine                            │
│    - Primitive Scales (Spacing, Typography, Motion)         │
│    - Semantic Variables (--color-surface, --color-primary)  │
│    - Attribute-Driven Variants (data-variant, data-size)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌───────────────────────────────────┐ ┌───────────────────────────────────┐
│ 3. Theme Presets (Stored in Kit)  │ │ 4. Local Cascading Overrides      │
│    themes/*.css                   │ │    Consumer application :root     │
│    (Server-Panel, Codex, etc.)    │ │    (Optional local customization) │
└───────────────────────────────────┘ └───────────────────────────────────┘
```

### Core Architecture Pillars
* **Native Web Standards**: Relies on modern HTML elements (`<dialog>`, `popover`, `<details>`, `<button>`) and standard CSS custom properties.
* **Open UI Anatomy**: All component structures and part naming follow W3C Open UI research and conventions.
* **Three-Tier Theming**: Separation between primitive values, semantic tokens, and application theme presets.
* **Standalone Workshop**: A custom Vite application providing live component inspection, dynamic token palettes, an icon gallery, and 1-click code copying.

---

## 2. Open UI Standards & Semantic Foundation

`design-kit` adopts W3C Open UI component anatomy and semantic naming conventions to ensure structural predictability and native accessibility.

### 2.1 Standard Component Anatomy
Components use structured sub-part selectors following Open UI models:

* **Field / Form Control**:
  * Root container: `.ui-field`
  * Label: `.ui-label`
  * Control wrapper: `.ui-control`
  * Input element: `.ui-input` / `.ui-select` / `.ui-textarea`
  * Helper description: `.ui-help-text`
  * Validation message: `.ui-error-text`
* **Dialog / Modal**:
  * Element: `<dialog class="ui-dialog">`
  * Backdrop: `::backdrop`
  * Header: `.ui-dialog-header`
  * Title: `.ui-dialog-title`
  * Body: `.ui-dialog-body`
  * Actions / Footer: `.ui-dialog-footer`
* **Popover / Menu**:
  * Element: `<div popover class="ui-popover">`
  * Menu list: `.ui-menu`
  * Menu item: `.ui-menu-item`
* **Panel / Card**:
  * Container: `.ui-panel`
  * Header: `.ui-panel-header`
  * Content: `.ui-panel-body`
  * Footer: `.ui-panel-footer`

---

## 3. Three-Tier Token Architecture

```
Tier 1: Global Primitives  ──>  Tier 2: Semantic Contracts  ──>  Tier 3: Theme Presets
(Raw Values & Scales)           (Component Intent & Tokens)       (Application Palettes)
```

### 3.1 Tier 1: Global Primitives (`tokens/primitives.css`)
* **Spacing Scale**: 4px baseline (`--space-1`: 4px, `--space-2`: 8px, `--space-3`: 12px, `--space-4`: 16px, `--space-6`: 24px, `--space-8`: 32px)
* **Typography Scale**: `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-lg` (18px), `--text-xl` (20px), `--text-2xl` (24px)
* **Font Stacks**: `--font-sans`, `--font-mono`
* **Radii Scale**: `--radius-none` (0px), `--radius-sm` (2px), `--radius-md` (4px), `--radius-lg` (8px), `--radius-full` (9999px)
* **Transitions**: `--transition-fast` (120ms ease), `--transition-base` (200ms ease)
* **Elevations / Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### 3.2 Tier 2: Semantic Contracts (`tokens/semantic.css`)
* **Surfaces**: `--color-bg-canvas`, `--color-bg-surface`, `--color-bg-elevated`, `--color-bg-overlay`
* **Text**: `--color-text-main`, `--color-text-muted`, `--color-text-dim`, `--color-text-inverse`
* **Borders**: `--color-border-subtle`, `--color-border-strong`, `--color-border-focus`
* **Intents**: `--color-primary`, `--color-accent`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info`

### 3.3 Tier 3: Application Theme Presets (`themes/*.css`)
Presets define concrete color palettes and aesthetic choices for specific applications or modes while consuming Tier 2 variable contracts:
* `themes/server-panel.css`: Dark industrial dashboard palette with crisp, compact radii.
* `themes/codex.css`: Warm, documentation/scholar palette with soft, rounded corners.
* `themes/tectonic.css`: High-productivity desktop utility palette.
* `themes/image-hoard.css`: Media-focused neutral dark palette.
* `themes/image-annotate.css`: High-contrast canvas overlay palette.
* `themes/default-dark.css` & `themes/default-light.css`: General baseline themes.

---

## 4. Component Inventory & Variant Convention

Component variants utilize HTML data attributes (`data-variant`, `data-size`, `data-intent`) for clean, declarative markup.

### 4.1 Component Catalog
| Component | Base Class | Open UI Element | Supported Variants |
| :--- | :--- | :--- | :--- |
| **Button** | `.ui-btn` | `<button>`, `<a>` | `data-variant="solid\|outline\|ghost"`<br>`data-size="sm\|md\|lg"`<br>`data-intent="primary\|danger\|success"` |
| **Input** | `.ui-input` | `<input>` | `data-size="sm\|md"`<br>`data-state="error\|valid"` |
| **Textarea** | `.ui-textarea` | `<textarea>` | `data-size="sm\|md"` |
| **Select** | `.ui-select` | `<select>` | `data-size="sm\|md"` |
| **Checkbox / Radio** | `.ui-checkbox`, `.ui-radio` | `<input type="checkbox\|radio">` | Standard interactive states |
| **Toggle Switch** | `.ui-switch` | `<label class="ui-switch"><input type="checkbox">` | Standard toggle state |
| **Panel / Card** | `.ui-panel` | `<section>`, `<div>` | `data-variant="flat\|raised\|bordered"` |
| **Badge / Chip** | `.ui-badge` | `<span>` | `data-intent="default\|info\|success\|warning\|danger"` |
| **Dialog Modal** | `.ui-dialog` | `<dialog>` | `data-size="sm\|md\|lg\|full"` |
| **Popover** | `.ui-popover` | `<div popover>` | Standard popover container |
| **Accordion** | `.ui-accordion` | `<details>`, `<summary>` | Standard collapsible container |
| **Toolbar / Group** | `.ui-toolbar`, `.ui-btn-group` | `<div>` | Flex alignment container |

---

## 5. Curated SVG Icon Suite

`design-kit` bundles a core collection of 38 standard application UI icons packaged as an SVG sprite (`dist/icons/sprite.svg`) and individual standalone SVGs.

### 5.1 Icon Inventory
* **Navigation**: `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`, `arrow-left`, `arrow-right`, `menu`, `close`, `external-link`, `more-vertical`, `more-horizontal`
* **Actions**: `search`, `filter`, `plus`, `minus`, `edit`, `trash`, `copy`, `check`, `refresh`, `download`, `upload`, `save`
* **Status**: `info`, `alert-triangle`, `alert-circle`, `check-circle`, `help-circle`
* **Chrome & Controls**: `settings`, `eye`, `eye-off`, `sun`, `moon`, `folder`, `file`, `image`, `zoom-in`, `zoom-out`

### 5.2 Icon Markup Pattern
```html
<svg class="ui-icon" data-size="sm" aria-hidden="true">
  <use href="design-kit/dist/icons/sprite.svg#search"></use>
</svg>
```

---

## 6. Repository Layout

```
design-kit/
├── src/
│   ├── index.css                   # Main bundle entry (tokens + base + components)
│   ├── tokens/
│   │   ├── primitives.css          # Tier 1 raw scales
│   │   └── semantic.css            # Tier 2 semantic variables
│   ├── components/
│   │   ├── button.css              # Open UI button styling
│   │   ├── form.css                # Field, input, select, checkbox, switch
│   │   ├── panel.css               # Card and panel containers
│   │   ├── badge.css               # Status chips
│   │   ├── dialog.css              # Native <dialog> and ::backdrop
│   │   ├── popover.css             # Native [popover] containers
│   │   ├── accordion.css           # Native <details> and <summary>
│   │   └── icon.css                # Icon sizing and alignment utilities
│   ├── icons/
│   │   ├── svg/                    # Individual optimized SVG source files
│   │   └── sprite.svg              # Compiled SVG sprite sheet
│   └── themes/
│       ├── server-panel.css
│       ├── codex.css
│       ├── tectonic.css
│       ├── image-hoard.css
│       ├── image-annotate.css
│       ├── default-dark.css
│       └── default-light.css
├── workshop/                       # Custom Vite Workshop Application
│   ├── index.html                  # Workshop single-page application
│   ├── src/
│   │   ├── main.ts                 # Catalog navigation and theme controller
│   │   ├── token-viewer.ts         # Visual color/spacing/type swatches
│   │   ├── component-matrix.ts     # Component state and variant showcases
│   │   ├── icon-gallery.ts         # Searchable icon grid with markup copy
│   │   └── workshop.css            # Workshop UI styles
│   └── vite.config.ts
├── .github/
│   └── workflows/
│       └── deploy-workshop.yml     # Auto-deploys workshop to GitHub Pages
├── package.json
└── README.md
```

---

## 7. Custom Vite Workshop & GitHub Pages

The visual catalog is a lightweight, zero-dependency Vite application deployed directly to GitHub Pages.

### 7.1 Key Workshop Features
* **Live Theme Switcher**: Global toolbar dropdown that dynamically applies any theme preset (`data-theme="..."`), updating all components and tokens in real time.
* **Token Inspector**: Interactive palette grids displaying rendered color swatches, computed hex values, contrast ratios, and copyable CSS variable names.
* **Component Matrix**: Side-by-side display of all component variants and states (*Default, Hover, Active, Focused, Disabled, Error*).
* **Icon Search Gallery**: Searchable grid of the 38 bundled icons with 1-click copy for both `<svg><use>` and inline SVG markup.
* **1-Click Markup Generator**: Generates and copies clean HTML and JSX code snippets for any rendered component.

### 7.2 Automated Deployment Workflow (`.github/workflows/deploy-workshop.yml`)
```yaml
name: Deploy Workshop

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: 'workshop/dist'
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## 8. Consumer Project Integration

### 8.1 Installation via Git Reference
Consumer projects declare `design-kit` directly via Git in `package.json`:

```json
{
  "dependencies": {
    "design-kit": "github:Bodegi/design-kit#main"
  }
}
```

### 8.2 Usage in Applications
1. **Importing Base & Theme Preset**:
   ```css
   /* In application root stylesheet */
   @import "design-kit/dist/index.css";
   @import "design-kit/dist/themes/server-panel.css";
   ```

2. **Optional Local Overrides**:
   Any variable defined in the consumer application stylesheet after the import takes precedence:
   ```css
   @import "design-kit/dist/index.css";
   @import "design-kit/dist/themes/server-panel.css";

   :root {
     --color-primary: #10b981;
     --radius-base: 6px;
   }
   ```

3. **Standard HTML Markup**:
   ```html
   <div class="ui-field">
     <label class="ui-label" for="profile-name">Profile Name</label>
     <div class="ui-control">
       <input class="ui-input" id="profile-name" type="text" placeholder="Enter name..." />
     </div>
     <span class="ui-help-text">Visible to team members.</span>
   </div>

   <button class="ui-btn" data-variant="solid" data-intent="primary" data-size="md">
     Save Changes
   </button>
   ```

---

## 9. Implementation Roadmap

```
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: Repository Foundation & Token Scales               │
│ - Initialize design-kit repository and build system         │
│ - Implement Tier 1 primitive tokens and Tier 2 semantics    │
│ - Define baseline application theme presets                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Open UI Component Library & Icon Suite             │
│ - Implement Open UI component styles and variant attributes │
│ - Assemble and compile 35-icon SVG suite and sprite         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Custom Vite Workshop & GitHub Pages CI/CD          │
│ - Build workshop UI (Theme switcher, token viewer, matrix)  │
│ - Implement icon search gallery and code snippet generators │
│ - Configure GitHub Pages deployment action                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 4: Consumer Application Verification                  │
│ - Verify Git dependency installation in a pilot application │
│ - Validate theme presets and cascading overrides            │
└─────────────────────────────────────────────────────────────┘
```
