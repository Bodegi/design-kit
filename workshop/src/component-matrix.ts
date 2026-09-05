import { showToast } from './toast';

const BUTTON_VARIANTS = ['solid', 'outline', 'ghost'] as const;
const BUTTON_INTENTS = ['primary', 'accent', 'success', 'warning', 'danger', 'info'] as const;

export function renderComponentMatrix(container: HTMLElement) {
  container.innerHTML = `
    <!-- Buttons Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Buttons (.ui-btn)</h2>
      <p class="ws-section-desc">Open UI buttons with semantic variants, sizes, intents, and states. Every <code>data-intent</code> (primary / accent / success / warning / danger / info) is defined for every <code>data-variant</code> (solid / outline / ghost): the intent declares its ink once and each variant reads it, so all eighteen cells render. Solid keeps its fill through hover and answers with the glow and a 1px lift; outline and ghost hover onto the intent's tint. A press (toggle) button keys off <code>aria-pressed</code> — <code>true</code> reads as held down with an inset ring and no lift, <code>mixed</code> marks the leading edge — so a <code>.ui-btn-group</code> of them is a segmented control. Ships no runtime; the workshop moves <code>aria-pressed</code> for these demos.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents (Solid)</span>
          ${copyControls('<button class="ui-btn" data-intent="primary">Primary</button>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn">Default</button>
          <button class="ui-btn" data-intent="primary">Primary</button>
          <button class="ui-btn" data-intent="success">Success</button>
          <button class="ui-btn" data-intent="danger">Danger</button>
          <button class="ui-btn" disabled>Disabled</button>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Variants (Outline & Ghost)</span>
          ${copyControls('<button class="ui-btn" data-variant="outline" data-intent="primary">Outline Primary</button>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-variant="outline" data-intent="primary">Outline Primary</button>
          <button class="ui-btn" data-variant="outline" data-intent="danger">Outline Danger</button>
          <button class="ui-btn" data-variant="ghost">Ghost Neutral</button>
          <button class="ui-btn" data-variant="ghost" data-intent="primary">Ghost Primary</button>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intent × Variant Matrix (all 18 cells)</span>
          ${copyControls('<button class="ui-btn" data-variant="outline" data-intent="warning">Warning</button>')}
        </div>
        <div class="ws-preview-canvas ws-btn-matrix">
          ${BUTTON_VARIANTS.map(
            (variant) => `
            <div class="ws-btn-matrix-row">
              <span class="ws-btn-matrix-label">${variant}</span>
              ${BUTTON_INTENTS.map(
                (intent) =>
                  `<button class="ui-btn" type="button" data-variant="${variant}" data-intent="${intent}">${
                    intent.charAt(0).toUpperCase() + intent.slice(1)
                  }</button>`,
              ).join('')}
            </div>`,
          ).join('')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes & Button Groups</span>
          ${copyControls('<div class="ui-btn-group"><button class="ui-btn">Left</button><button class="ui-btn">Right</button></div>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-size="sm" data-intent="primary">Small (sm)</button>
          <button class="ui-btn" data-intent="primary">Medium (default)</button>
          <button class="ui-btn" data-size="lg" data-intent="primary">Large (lg)</button>
          <div class="ui-btn-group" role="group" aria-label="Granularity" data-ws-press="single">
            <button class="ui-btn" type="button" aria-pressed="false">Years</button>
            <button class="ui-btn" type="button" aria-pressed="true">Months</button>
            <button class="ui-btn" type="button" aria-pressed="false">Days</button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Press Buttons (aria-pressed)</span>
          ${copyControls('<button class="ui-btn" type="button" aria-pressed="true">Mute</button>')}
        </div>
        <div class="ws-preview-canvas ws-btn-matrix">
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">true</span>
            <button class="ui-btn" type="button" aria-pressed="true">Neutral</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="true">Solid</button>
            <button class="ui-btn" type="button" data-variant="outline" data-intent="danger" aria-pressed="true">Outline</button>
            <button class="ui-btn" type="button" data-variant="ghost" data-intent="success" aria-pressed="true">Ghost</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="true" disabled>Disabled</button>
          </div>
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">false</span>
            <button class="ui-btn" type="button" aria-pressed="false">Neutral</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="false">Solid</button>
            <button class="ui-btn" type="button" data-variant="outline" data-intent="danger" aria-pressed="false">Outline</button>
            <button class="ui-btn" type="button" data-variant="ghost" data-intent="success" aria-pressed="false">Ghost</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="false" disabled>Disabled</button>
          </div>
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">mixed</span>
            <button class="ui-btn" type="button" aria-pressed="mixed">Neutral</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="mixed">Solid</button>
            <button class="ui-btn" type="button" data-variant="outline" data-intent="danger" aria-pressed="mixed">Outline</button>
            <button class="ui-btn" type="button" data-variant="ghost" data-intent="success" aria-pressed="mixed">Ghost</button>
            <button class="ui-btn" type="button" data-intent="primary" aria-pressed="mixed" disabled>Disabled</button>
          </div>
          <div class="ws-btn-matrix-row">
            <span class="ws-btn-matrix-label">group</span>
            <div class="ui-btn-group" role="group" aria-label="Text alignment" data-ws-press="single">
              <button class="ui-btn" type="button" data-variant="outline" data-intent="primary" aria-pressed="true">Left</button>
              <button class="ui-btn" type="button" data-variant="outline" data-intent="primary" aria-pressed="false">Center</button>
              <button class="ui-btn" type="button" data-variant="outline" data-intent="primary" aria-pressed="false">Right</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Tabs (.ui-tabs)</h2>
      <p class="ws-section-desc">Open UI tabs: a <code>role="tablist"</code> of <code>.ui-tab</code> buttons over <code>.ui-tabpanel</code> regions. The selected tab is keyed off <code>aria-selected="true"</code>; panels toggle with the native <code>hidden</code> attribute. Ships no runtime — the workshop wires the switching for the demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Horizontal &amp; Active State</span>
          ${copyControls(tabsSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tabs" style="width: 100%;">
            <div class="ui-tablist" role="tablist" aria-label="Repository">
              <button class="ui-tab" role="tab" id="ws-tab-ov" aria-controls="ws-panel-ov" aria-selected="true">Overview</button>
              <button class="ui-tab" role="tab" id="ws-tab-act" aria-controls="ws-panel-act" aria-selected="false">Activity</button>
              <button class="ui-tab" role="tab" id="ws-tab-set" aria-controls="ws-panel-set" aria-selected="false">Settings <span class="ui-tab-trail">3</span></button>
              <button class="ui-tab" role="tab" aria-selected="false" disabled>Archived</button>
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-panel-ov" aria-labelledby="ws-tab-ov" tabindex="0">
              System resources operating within nominal parameters. Average CPU load 18%.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-panel-act" aria-labelledby="ws-tab-act" tabindex="0" hidden>
              12 deploys this week. Last push to <code>main</code> 4 minutes ago.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-panel-set" aria-labelledby="ws-tab-set" tabindex="0" hidden>
              3 pending configuration changes require review before the next release.
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Vertical (data-orientation)</span>
          ${copyControls('<div class="ui-tabs" data-orientation="vertical">\n  <div class="ui-tablist" role="tablist" aria-orientation="vertical">…</div>\n  <div class="ui-tabpanel" role="tabpanel">…</div>\n</div>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tabs" data-orientation="vertical" style="width: 100%;">
            <div class="ui-tablist" role="tablist" aria-orientation="vertical" aria-label="Account">
              <button class="ui-tab" role="tab" id="ws-vtab-prof" aria-controls="ws-vpanel-prof" aria-selected="true">Profile</button>
              <button class="ui-tab" role="tab" id="ws-vtab-sec" aria-controls="ws-vpanel-sec" aria-selected="false">Security</button>
              <button class="ui-tab" role="tab" id="ws-vtab-bill" aria-controls="ws-vpanel-bill" aria-selected="false">Billing</button>
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-vpanel-prof" aria-labelledby="ws-vtab-prof" tabindex="0">
              Display name, avatar, and public workspace handle.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-vpanel-sec" aria-labelledby="ws-vtab-sec" tabindex="0" hidden>
              Two-factor authentication and active session management.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-vpanel-bill" aria-labelledby="ws-vtab-bill" tabindex="0" hidden>
              Plan, invoices, and the payment method on file.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sidebar Nav Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Sidebar Nav (.ui-nav)</h2>
      <p class="ws-section-desc">Vertical navigation list. The current item is keyed off <code>aria-current="page"</code> and shows the inset primary bar over an elevated ground.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Nav List &amp; Active State</span>
          ${copyControls('<nav class="ui-nav">\n  <a class="ui-nav-item" href="#" aria-current="page">\n    <span class="ui-nav-icon">…</span>\n    <span class="ui-nav-label">Civilizations</span>\n  </a>\n  <a class="ui-nav-item" href="#"><span class="ui-nav-label">Category</span></a>\n</nav>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-nav" style="max-width: 260px; width: 100%;">
            <a class="ui-nav-item" href="#" aria-current="page">
              <span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span>
              <span class="ui-nav-label">Civilizations</span>
              <span class="ui-nav-trail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg></span>
            </a>
            <a class="ui-nav-item" href="#">
              <span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span>
              <span class="ui-nav-label">Category</span>
              <span class="ui-nav-trail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg></span>
            </a>
            <a class="ui-nav-item" href="#">
              <span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span>
              <span class="ui-nav-label">Mod</span>
              <span class="ui-nav-trail"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg></span>
            </a>
          </nav>
        </div>
      </div>
    </section>

    <!-- Breadcrumb Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Breadcrumb (.ui-breadcrumb)</h2>
      <p class="ws-section-desc">A <code>nav</code> wrapping an <code>ol.ui-breadcrumb-list</code> of <code>.ui-breadcrumb-item</code>. Separators are drawn by CSS on <code>li + li</code>, so the trail reads as a plain list to screen readers. The page you are on is a <code>span.ui-breadcrumb-link</code> with <code>aria-current="page"</code> — main text, not a link.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Trail, Current Page &amp; Sizes</span>
          ${copyControls('<nav class=\"ui-breadcrumb\" aria-label=\"Breadcrumb\">\n  <ol class=\"ui-breadcrumb-list\">\n    <li class=\"ui-breadcrumb-item\">\n      <a class=\"ui-breadcrumb-link\" href=\"#\"><span class=\"ui-breadcrumb-icon\">…</span>Home</a>\n    </li>\n    <li class=\"ui-breadcrumb-item\"><a class=\"ui-breadcrumb-link\" href=\"#\">Library</a></li>\n    <li class=\"ui-breadcrumb-item\"><a class=\"ui-breadcrumb-link\" href=\"#\">Civilizations</a></li>\n    <li class=\"ui-breadcrumb-item\">\n      <span class=\"ui-breadcrumb-link\" aria-current=\"page\">Bronze Age</span>\n    </li>\n  </ol>\n</nav>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb" data-size="sm">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Separators (chevron / slash / dot)</span>
          ${copyControls('<nav class=\"ui-breadcrumb\" aria-label=\"Breadcrumb\" data-separator=\"slash\">…</nav>\n<nav class=\"ui-breadcrumb\" aria-label=\"Breadcrumb\" data-separator=\"dot\">…</nav>\n<!-- no data-separator = chevron -->')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb" data-separator="slash">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb" data-separator="dot">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Collapsed Middle &amp; Long Labels</span>
          ${copyControls('<li class=\"ui-breadcrumb-item\">\n  <button type=\"button\" class=\"ui-breadcrumb-ellipsis\"\n          aria-expanded=\"false\" aria-label=\"Show 2 hidden levels\">…</button>\n</li>\n<li class=\"ui-breadcrumb-item\" hidden><a class=\"ui-breadcrumb-link\" href=\"#\">Library</a></li>\n\n<!-- long label: truncates at --ui-breadcrumb-label-max (20ch) -->\n<a class=\"ui-breadcrumb-link\" href=\"#\">The Late Bronze Age Collapse, Revisited</a>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><button type="button" class="ui-breadcrumb-ellipsis" aria-expanded="false" aria-label="Show 2 hidden levels">…</button></li>
            <li class="ui-breadcrumb-item" hidden><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item" hidden><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#" title="The Late Bronze Age Collapse, Revisited">The Late Bronze Age Collapse, Revisited</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Sea Peoples</span></li>
            </ol>
          </nav>
        </div>
      </div>
    </section>

    <!-- List Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">List (.ui-list)</h2>
      <p class="ws-section-desc">A native <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code> of <code>.ui-list-item</code> rows, each holding an optional <code>.ui-list-item-leading</code> slot, a <code>.ui-list-item-content</code> block (<code>-title</code> + <code>-description</code>), and a <code>.ui-list-item-trailing</code> slot. Rows are inert until you make them an <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code>. Selection keys off <code>aria-selected</code> / <code>aria-current</code>, so the same classes serve a <code>role="listbox"</code> — the workshop wires the option switching for the demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Plain &amp; nested</span>
          ${copyControls(listPlainSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" style="max-width: 420px; width: 100%;">
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Region: us-east-1</span></span></li>
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Region: eu-west-2</span></span></li>
            <li>
              <div class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Region: ap-south-1</span></span></div>
              <ul class="ui-list">
                <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Zone a</span></span></li>
                <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Zone b</span></span></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Divided — leading icon, description, trailing badge</span>
          ${copyControls(listDividedSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" data-variant="divided" style="max-width: 460px; width: 100%;">
            ${listRow(listIcons.server, 'edge-01', 'Uptime 41 days · 18% CPU', '<span class="ui-badge" data-intent="success">Healthy</span>')}
            ${listRow(listIcons.server, 'edge-02', 'Uptime 6 days · 74% CPU', '<span class="ui-badge" data-intent="warning">Degraded</span>')}
            ${listRow(listIcons.server, 'edge-03', 'Not answering pings', '<span class="ui-badge" data-intent="danger">Offline</span>')}
          </ul>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Inset &amp; interactive — current + disabled row</span>
          ${copyControls(listInsetSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" data-variant="inset" style="max-width: 320px; width: 100%;">
            <li><a class="ui-list-item" href="#" aria-current="true"><span class="ui-list-item-leading">${listIcons.layers}</span><span class="ui-list-item-content"><span class="ui-list-item-title">All Images</span></span><span class="ui-list-item-trailing">4,182</span></a></li>
            <li><a class="ui-list-item" href="#"><span class="ui-list-item-leading">${listIcons.heart}</span><span class="ui-list-item-content"><span class="ui-list-item-title">Favorites</span></span><span class="ui-list-item-trailing">231</span></a></li>
            <li><a class="ui-list-item" href="#"><span class="ui-list-item-leading">${listIcons.tag}</span><span class="ui-list-item-content"><span class="ui-list-item-title">Untagged</span></span><span class="ui-list-item-trailing">57</span></a></li>
            <li><button class="ui-list-item" type="button" disabled><span class="ui-list-item-leading">${listIcons.tag}</span><span class="ui-list-item-content"><span class="ui-list-item-title">Needs Review</span></span><span class="ui-list-item-trailing">0</span></button></li>
          </ul>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Compact (data-density) &amp; ordered</span>
          ${copyControls('<ul class="ui-list" data-variant="divided" data-density="compact">…</ul>\n<ol class="ui-list" data-density="compact">…</ol>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" data-variant="divided" data-density="compact" style="max-width: 460px; width: 100%;">
            ${listRow(listIcons.server, 'edge-01', '', '18% CPU')}
            ${listRow(listIcons.server, 'edge-02', '', '74% CPU')}
            ${listRow(listIcons.server, 'edge-03', '', '—')}
          </ul>
          <ol class="ui-list" data-density="compact" style="max-width: 460px; width: 100%;">
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Pull the release branch</span></span></li>
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Run the migration</span></span></li>
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Promote to production</span></span></li>
          </ol>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Listbox — single select via aria-selected</span>
          ${copyControls(listboxSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" role="listbox" aria-label="Deploy target" style="max-width: 320px; width: 100%;">
            <li class="ui-list-item" role="option" aria-selected="true" tabindex="0"><span class="ui-list-item-content"><span class="ui-list-item-title">Production</span></span></li>
            <li class="ui-list-item" role="option" aria-selected="false" tabindex="-1"><span class="ui-list-item-content"><span class="ui-list-item-title">Staging</span></span></li>
            <li class="ui-list-item" role="option" aria-selected="false" tabindex="-1"><span class="ui-list-item-content"><span class="ui-list-item-title">Preview</span></span></li>
            <li class="ui-list-item" role="option" aria-selected="false" aria-disabled="true"><span class="ui-list-item-content"><span class="ui-list-item-title">Sandbox (retired)</span></span></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Sidebar Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Sidebar (.ui-sidebar)</h2>
      <p class="ws-section-desc">The app-shell rail: a translucent <em>glass</em> panel (blurred surface + soft ambient shadow) that holds the nav. Pinned <code>header</code>/<code>footer</code> with a scrolling <code>body</code>; width via <code>--ui-sidebar-width</code>.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Glass Rail &amp; Anatomy</span>
          ${copyControls('<aside class="ui-sidebar">\n  <header class="ui-sidebar-header">…</header>\n  <div class="ui-sidebar-body">\n    <nav class="ui-nav">…</nav>\n  </div>\n  <footer class="ui-sidebar-footer">…</footer>\n</aside>')}
        </div>
        <div class="ws-preview-canvas" style="padding: 0; height: 380px; background-image: radial-gradient(circle at 30% 20%, var(--color-primary-subtle), transparent 45%), radial-gradient(circle at 80% 90%, var(--color-accent-subtle), transparent 40%);">
          <aside class="ui-sidebar" style="height: 100%;">
            <header class="ui-sidebar-header">
              <span class="ui-nav-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg></span>
              <strong style="font-size: var(--text-base); color: var(--color-text-main);">Design Kit</strong>
            </header>
            <div class="ui-sidebar-body">
              <nav class="ui-nav">
                <a class="ui-nav-item" href="#" aria-current="page">
                  <span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span>
                  <span class="ui-nav-label">Overview</span>
                </a>
                <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Components</span></a>
                <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Tokens</span></a>
                <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Icons</span></a>
                <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Themes</span></a>
              </nav>
            </div>
            <footer class="ui-sidebar-footer">
              <span class="ui-nav-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg></span>
              <span style="font-size: var(--text-sm); color: var(--color-text-muted);">Signed in</span>
            </footer>
          </aside>
        </div>
      </div>
    </section>

    <!-- Header Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Header (.ui-header)</h2>
      <p class="ws-section-desc">The app-shell top bar: a floating glass card sharing the sidebar's material. Brand at the leading edge (<code>.ui-header-brand</code>), actions at the trailing edge (<code>.ui-header-actions</code>).</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Glass Top Bar</span>
          ${copyControls('<header class="ui-header">\n  <div class="ui-header-brand">…</div>\n  <div class="ui-header-actions">…</div>\n</header>')}
        </div>
        <div class="ws-preview-canvas" style="padding: var(--space-6); background-image: radial-gradient(circle at 20% 20%, var(--color-primary-subtle), transparent 45%), radial-gradient(circle at 90% 80%, var(--color-accent-subtle), transparent 40%);">
          <header class="ui-header" style="width: 100%;">
            <div class="ui-header-brand">
              <a class="ui-logo" href="#">
                <span class="ui-logo-mark"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3.5 29 10 16 16.5 3 10Z" fill="currentColor"/><path d="M3 15 16 21.5 29 15" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.6"/><path d="M3 20 16 26.5 29 20" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.32"/></svg></span>
                <span class="ui-logo-text">Design Kit</span>
              </a>
            </div>
            <div class="ui-header-actions">
              <button class="ui-btn" data-variant="ghost">Docs</button>
              <button class="ui-btn" data-intent="primary">New</button>
            </div>
          </header>
        </div>
      </div>
    </section>

    <!-- App Shell Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">App Shell (.ui-app-shell)</h2>
      <p class="ws-section-desc">The full assembly: a header card above a body row of sidebar card + main content (<code>.ui-app-body</code> / <code>.ui-app-main</code>), floating on the canvas with even gutters. Layout-only — the cards carry their own glass.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Header + Sidebar + Main</span>
          ${copyControls('<div class="ui-app-shell">\n  <header class="ui-header">…</header>\n  <div class="ui-app-body">\n    <aside class="ui-sidebar">…</aside>\n    <main class="ui-app-main">…</main>\n  </div>\n</div>')}
        </div>
        <div class="ws-preview-canvas" style="padding: 0; height: 520px; background-image: radial-gradient(circle at 15% 15%, var(--color-primary-subtle), transparent 40%), radial-gradient(circle at 85% 85%, var(--color-accent-subtle), transparent 45%);">
          <div class="ui-app-shell" style="height: 100%;">
            <header class="ui-header">
              <div class="ui-header-brand">
                <a class="ui-logo" href="#" style="font-size: 0.9em;">
                  <span class="ui-logo-mark"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3.5 29 10 16 16.5 3 10Z" fill="currentColor"/><path d="M3 15 16 21.5 29 15" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.6"/><path d="M3 20 16 26.5 29 20" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.32"/></svg></span>
                  <span class="ui-logo-text">Design Kit</span>
                </a>
              </div>
              <div class="ui-header-actions">
                <button class="ui-btn" data-variant="ghost" data-size="sm">Docs</button>
                <button class="ui-btn" data-intent="primary" data-size="sm">New</button>
              </div>
            </header>
            <div class="ui-app-body">
              <aside class="ui-sidebar" style="--ui-sidebar-width: 220px;">
                <div class="ui-sidebar-body">
                  <nav class="ui-nav">
                    <a class="ui-nav-item" href="#" aria-current="page"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Overview</span></a>
                    <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Components</span></a>
                    <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Tokens</span></a>
                    <a class="ui-nav-item" href="#"><span class="ui-nav-icon"><svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg></span><span class="ui-nav-label">Themes</span></a>
                  </nav>
                </div>
                <footer class="ui-sidebar-footer">
                  <span class="ui-nav-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg></span>
                  <span style="font-size: var(--text-sm); color: var(--color-text-muted);">Signed in</span>
                </footer>
              </aside>
              <main class="ui-app-main">
                <div class="ui-panel" style="height: 100%;">
                  <div class="ui-panel-header"><h3 class="ui-panel-title">Overview</h3></div>
                  <div class="ui-panel-body">
                    <p style="margin: 0; color: var(--color-text-muted);">Main content sits in the workspace column beside the sidebar card. The header, sidebar, and this panel float on the glow canvas with matching glass and even gutters.</p>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Logo (.ui-logo)</h2>
      <p class="ws-section-desc">Brand lockup in three variants (<code>data-variant</code> full / emblem / wordmark). An app supplies its mark in <code>.ui-logo-mark</code> and name in <code>.ui-logo-text</code>; with no image the emblem falls back to a primary-tinted monogram and the wordmark to styled text.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Variants &amp; Graceful Fallback</span>
          ${copyControls('<a class="ui-logo" href="#">\n  <span class="ui-logo-mark"><svg>…</svg></span>\n  <span class="ui-logo-text">Design Kit</span>\n</a>\n\n<!-- no asset: monogram + text fallback -->\n<span class="ui-logo">\n  <span class="ui-logo-mark">D</span>\n  <span class="ui-logo-text">Design Kit</span>\n</span>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch; gap: var(--space-4);">
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-8); align-items: center;">
            <div style="display:flex; flex-direction:column; gap: var(--space-2);">
              <a class="ui-logo" href="#">
                <span class="ui-logo-mark"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3.5 29 10 16 16.5 3 10Z" fill="currentColor"/><path d="M3 15 16 21.5 29 15" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.6"/><path d="M3 20 16 26.5 29 20" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.32"/></svg></span>
                <span class="ui-logo-text">Design Kit</span>
              </a>
              <span style="font-size: var(--text-xs); color: var(--color-text-dim);">full (emblem + wordmark)</span>
            </div>
            <div style="display:flex; flex-direction:column; gap: var(--space-2);">
              <span class="ui-logo" data-variant="emblem">
                <span class="ui-logo-mark"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 3.5 29 10 16 16.5 3 10Z" fill="currentColor"/><path d="M3 15 16 21.5 29 15" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.6"/><path d="M3 20 16 26.5 29 20" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" opacity="0.32"/></svg></span>
              </span>
              <span style="font-size: var(--text-xs); color: var(--color-text-dim);">emblem</span>
            </div>
            <div style="display:flex; flex-direction:column; gap: var(--space-2);">
              <span class="ui-logo" data-variant="wordmark">
                <span class="ui-logo-text">Design Kit</span>
              </span>
              <span style="font-size: var(--text-xs); color: var(--color-text-dim);">wordmark</span>
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-8); align-items: center; border-top: 1px solid var(--color-border-subtle); padding-top: var(--space-4);">
            <div style="display:flex; flex-direction:column; gap: var(--space-2);">
              <span class="ui-logo">
                <span class="ui-logo-mark">D</span>
                <span class="ui-logo-text">Design Kit</span>
              </span>
              <span style="font-size: var(--text-xs); color: var(--color-text-dim);">fallback — no asset (monogram + text)</span>
            </div>
            <div style="display:flex; flex-direction:column; gap: var(--space-2);">
              <span class="ui-logo" data-variant="emblem">
                <span class="ui-logo-mark">D</span>
              </span>
              <span style="font-size: var(--text-xs); color: var(--color-text-dim);">fallback — monogram only</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Watermark Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Watermark (.ui-watermark)</h2>
      <p class="ws-section-desc">The emblem ghosted into a surface's empty space — one tokenized recipe (<code>--ui-watermark-*</code>) with <code>data-state</code> tuning (default / empty / modal). Opt-in: unset <code>--ui-watermark-image</code> and the surface simply skips it.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Empty-State Panel</span>
          ${copyControls('<div class="ui-panel ui-watermark" data-state="empty"\n     style="--ui-watermark-image: url(/logo-emblem.svg)">\n  <div class="ui-panel-body">Your library is empty…</div>\n</div>')}
        </div>
        <div class="ws-preview-canvas">
          <div class="ui-panel ui-watermark" data-state="empty" style="--ui-watermark-image: url('/logo-emblem.svg'); width: 100%; height: 260px;">
            <div class="ui-panel-body" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: var(--space-2);">
              <strong style="font-size: var(--text-lg); color: var(--color-text-main);">Nothing here yet</strong>
              <span style="color: var(--color-text-muted);">Your library is empty — the brand emblem ghosts in behind.</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toolbar Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Toolbar (.ui-toolbar)</h2>
      <p class="ws-section-desc">Flex alignment container grouping controls, with separators and a spacer to push actions apart.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Editor Toolbar</span>
          ${copyControls(toolbarSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-toolbar">
            <div class="ui-btn-group">
              <button class="ui-btn" data-size="sm" data-variant="ghost">Bold</button>
              <button class="ui-btn" data-size="sm" data-variant="ghost">Italic</button>
              <button class="ui-btn" data-size="sm" data-variant="ghost">Underline</button>
            </div>
            <span class="ui-toolbar-separator"></span>
            <button class="ui-btn" data-size="sm" data-variant="ghost">Link</button>
            <button class="ui-btn" data-size="sm" data-variant="ghost">Image</button>
            <span class="ui-toolbar-spacer"></span>
            <button class="ui-btn" data-size="sm" data-variant="outline">Preview</button>
            <button class="ui-btn" data-size="sm" data-intent="primary">Publish</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Controls Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Form Controls (.ui-field, .ui-input, .ui-select, .ui-switch)</h2>
      <p class="ws-section-desc">Open UI compliant inputs, validation feedback, native toggle switches, and the Customizable Select picker where <code>appearance: base-select</code> is supported. Switches come two ways: <code>.ui-switch</code> draws a track and thumb from its own markup in every engine, and <code>.ui-switch-native</code> is the bare <code>&lt;input type="checkbox" switch&gt;</code> restyled through <code>::track</code> and <code>::thumb</code> inside <code>@supports selector(::thumb)</code> — Safari 17.4+ draws the switch, Chromium keeps it behind a flag, and every engine without the parts renders a working checkbox in the <code>.ui-checkbox</code> look.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Input Fields & Select</span>
          ${copyControls('<div class="ui-field"><label class="ui-label" for="name">Label</label><div class="ui-control"><input class="ui-input" id="name" placeholder="Type here..." /></div></div>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-field">
            <label class="ui-label" for="ws-demo-name">User Profile Name</label>
            <div class="ui-control">
              <input class="ui-input" id="ws-demo-name" type="text" placeholder="e.g. Alex Morgan" />
            </div>
            <span class="ui-help-text">Visible on public workspace dashboards.</span>
          </div>

          <div class="ui-field">
            <label class="ui-label" for="ws-demo-role">Assigned Role</label>
            <div class="ui-control">
              <select class="ui-select" id="ws-demo-role">
                <option>Administrator</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>

          <div class="ui-field">
            <label class="ui-label" for="ws-demo-err">API Endpoint (Error State)</label>
            <div class="ui-control">
              <input class="ui-input" id="ws-demo-err" type="text" value="https://invalid:port" data-state="error" />
            </div>
            <span class="ui-error-text">Please provide a valid URL endpoint format.</span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Customizable Select</span>
          ${copyControls('<div class="ui-control">\n  <select class="ui-select" id="target">\n    <button><selectedcontent></selectedcontent></button>\n    <optgroup>\n      <legend>Managed</legend>\n      <option value="prod"><span class="dot"></span>Production</option>\n      <option value="staging" selected><span class="dot"></span>Staging</option>\n    </optgroup>\n    <optgroup>\n      <legend>Self-hosted</legend>\n      <option value="legacy" disabled>Legacy box (retired)</option>\n    </optgroup>\n  </select>\n</div>\n\n<!-- Blink 135+ styles the picker; other engines keep the classic select -->')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-field">
            <label class="ui-label" for="ws-demo-target">Deploy Target</label>
            <div class="ui-control">
              <select class="ui-select" id="ws-demo-target">
                <button><selectedcontent></selectedcontent></button>
                <optgroup>
                  <legend>Managed</legend>
                  <option value="prod"><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-danger);"></span>Production</option>
                  <option value="staging" selected><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-warning);"></span>Staging</option>
                  <option value="preview"><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-success);"></span>Preview</option>
                </optgroup>
                <optgroup>
                  <legend>Self-hosted</legend>
                  <option value="edge"><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-info);"></span>Edge cluster</option>
                  <option value="legacy" disabled><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-text-muted);"></span>Legacy box (retired)</option>
                </optgroup>
              </select>
            </div>
            <span class="ui-help-text">Blink (Chromium 135+) renders the styled picker; Firefox and Safari fall back to the classic control, which keeps the same closed-state look.</span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Checkboxes, Radios & Switches</span>
          ${copyControls('<label class="ui-switch"><input type="checkbox" /><span class="ui-switch-track"><span class="ui-switch-thumb"></span></span><span>Label</span></label>')}
        </div>
        <div class="ws-preview-canvas">
          <label class="ui-checkbox-label">
            <input type="checkbox" class="ui-checkbox" checked />
            <span>Enable telemetry</span>
          </label>

          <label class="ui-checkbox-label">
            <input type="checkbox" class="ui-checkbox" />
            <span>Auto-backup</span>
          </label>

          <label class="ui-radio-label">
            <input type="radio" name="ws-radio-demo" class="ui-radio" checked />
            <span>Standard Sync</span>
          </label>

          <label class="ui-radio-label">
            <input type="radio" name="ws-radio-demo" class="ui-radio" />
            <span>Turbo Sync</span>
          </label>

          <label class="ui-switch">
            <input type="checkbox" checked />
            <span class="ui-switch-track">
              <span class="ui-switch-thumb"></span>
            </span>
            <span>Live Monitoring</span>
          </label>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native Switch (.ui-switch-native)</span>
          ${copyControls('<label class="ui-checkbox-label"><input type="checkbox" switch class="ui-switch-native" checked /><span>Label</span></label>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <label class="ui-checkbox-label">
            <input type="checkbox" switch class="ui-switch-native" checked />
            <span>Live Monitoring (on)</span>
          </label>
          <label class="ui-checkbox-label">
            <input type="checkbox" switch class="ui-switch-native" />
            <span>Verbose logging (off)</span>
          </label>
          <label class="ui-checkbox-label">
            <input type="checkbox" switch class="ui-switch-native" checked disabled />
            <span>Managed by policy (disabled)</span>
          </label>
        </div>
      </div>
    </section>

    <!-- Slider Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Slider (.ui-slider)</h2>
      <p class="ws-section-desc">The native <code>&lt;input type="range"&gt;</code> restyled through its vendor pseudo-elements — no custom thumb markup, so keyboard, touch and screen-reader behavior stay native. Optional wrapper anatomy is <code>.ui-slider-field</code> &gt; <code>.ui-slider-header</code> (<code>.ui-slider-label</code> + an <code>&lt;output class="ui-slider-value"&gt;</code>) with <code>datalist.ui-slider-ticks</code> under the track. Firefox fills the track natively via <code>::-moz-range-progress</code>; WebKit has no such pseudo, so the fill is a gradient driven by the optional <code>--ui-slider-value</code> (a unitless 0–100 the app sets) — leave it unset and the WebKit track just reads unfilled. Ships no runtime; the workshop sets that property for the live demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Live Value & Ticks</span>
          ${copyControls('<div class="ui-slider-field">\n  <div class="ui-slider-header">\n    <label class="ui-slider-label" for="quality">Export Quality</label>\n    <output class="ui-slider-value" for="quality">72%</output>\n  </div>\n  <input class="ui-slider" type="range" id="quality" list="quality-ticks"\n         min="0" max="100" value="72" style="--ui-slider-value: 72" />\n  <datalist class="ui-slider-ticks" id="quality-ticks">\n    <option value="0" label="0"></option>\n    <option value="50" label="50"></option>\n    <option value="100" label="100"></option>\n  </datalist>\n</div>\n\n<!-- app keeps --ui-slider-value in sync for the WebKit fill -->\nel.style.setProperty(\'--ui-slider-value\', el.value);')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-slider-field">
            <div class="ui-slider-header">
              <label class="ui-slider-label" for="ws-slider-quality">Export Quality</label>
              <output class="ui-slider-value" for="ws-slider-quality">72%</output>
            </div>
            <input class="ui-slider" type="range" id="ws-slider-quality" list="ws-slider-ticks"
                   min="0" max="100" value="72" data-value-suffix="%" style="--ui-slider-value: 72" />
            <datalist class="ui-slider-ticks" id="ws-slider-ticks">
              <option value="0" label="0"></option>
              <option value="50" label="50"></option>
              <option value="100" label="100"></option>
            </datalist>
          </div>

          <div class="ui-slider-field">
            <div class="ui-slider-header">
              <label class="ui-slider-label" for="ws-slider-brush">Brush Width</label>
              <output class="ui-slider-value" for="ws-slider-brush">3 px</output>
            </div>
            <input class="ui-slider" type="range" id="ws-slider-brush" data-intent="accent"
                   min="1" max="12" value="3" data-value-suffix=" px" style="--ui-slider-value: 18" />
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents</span>
          ${copyControls('<input class="ui-slider" type="range" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="success" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="warning" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="danger" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="info" value="60" style="--ui-slider-value: 60" />')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <input class="ui-slider" type="range" aria-label="Primary" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Accent" data-intent="accent" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Success" data-intent="success" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Warning" data-intent="warning" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Danger" data-intent="danger" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Info" data-intent="info" min="0" max="100" value="60" style="--ui-slider-value: 60" />
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes & Disabled</span>
          ${copyControls('<input class="ui-slider" type="range" data-size="sm" />\n<input class="ui-slider" type="range" />\n<input class="ui-slider" type="range" data-size="lg" />\n<input class="ui-slider" type="range" disabled />')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <input class="ui-slider" type="range" aria-label="Small" data-size="sm" min="0" max="100" value="35" style="--ui-slider-value: 35" />
          <input class="ui-slider" type="range" aria-label="Medium" min="0" max="100" value="55" style="--ui-slider-value: 55" />
          <input class="ui-slider" type="range" aria-label="Large" data-size="lg" min="0" max="100" value="75" style="--ui-slider-value: 75" />
          <input class="ui-slider" type="range" aria-label="Disabled" min="0" max="100" value="40" disabled style="--ui-slider-value: 40" />
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Vertical</span>
          ${copyControls('<input class="ui-slider" type="range" data-orientation="vertical" value="45" style="--ui-slider-value: 45" />')}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-8); align-items: flex-end;">
          <input class="ui-slider" type="range" aria-label="Low" data-orientation="vertical" data-size="sm" min="0" max="100" value="25" style="--ui-slider-value: 25" />
          <input class="ui-slider" type="range" aria-label="Mid" data-orientation="vertical" min="0" max="100" value="45" style="--ui-slider-value: 45" />
          <input class="ui-slider" type="range" aria-label="High" data-orientation="vertical" data-size="lg" data-intent="success" min="0" max="100" value="80" style="--ui-slider-value: 80" />
        </div>
      </div>
    </section>

    <!-- Number Input Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Number Input (.ui-number)</h2>
      <p class="ws-section-desc">A native <code>&lt;input type="number"&gt;</code> inside a shell that also holds the stepper and any adornment, so the assembly reads as one field. Anatomy is <code>.ui-number</code> &gt; <code>.ui-number-prefix</code> + <code>input.ui-input</code> + <code>.ui-number-suffix</code> + <code>.ui-number-stepper</code> (<code>.ui-number-decrement</code> / <code>.ui-number-increment</code>). <code>data-layout="stacked"</code> (default) puts two chevrons at the trailing edge; <code>data-layout="split"</code> re-orders the same markup to − left / + right with the value centred. The native spin buttons are removed per engine and the glyphs are drawn in CSS, so they recolor with the theme and need no image asset. States are read off the input with <code>:has()</code> — the ring moves to the shell (the input's own ring is cleared, so there is exactly one), and <code>:user-invalid</code> / <code>[aria-invalid="true"]</code>, <code>:read-only</code> and <code>:disabled</code> all key off the control itself. Ships no runtime: the app calls <code>input.stepUp()</code> / <code>input.stepDown()</code> — the workshop wires that for these demos.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Stacked (default)</span>
          ${copyControls(numberStackedSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-field" style="margin: 0;">
            <label class="ui-label" for="ws-num-port">Server Port</label>
            ${numberField('ws-num-port', 'Server Port', 'min="1" max="65535" value="25565"', { width: '11rem' })}
          </div>
          <div class="ui-field" style="margin: 0;">
            <label class="ui-label" for="ws-num-slots">Max Players</label>
            ${numberField('ws-num-slots', 'Max Players', 'min="1" max="200" step="1" value="20"')}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Split (quantity)</span>
          ${copyControls(numberSplitSnippet)}
        </div>
        <div class="ws-preview-canvas">
          ${numberField('ws-num-qty', 'Quantity', 'min="0" max="99" value="3"', { layout: 'split', width: '8rem' })}
          ${numberField('ws-num-qty-sm', 'Quantity (small)', 'min="0" max="99" value="1"', { layout: 'split', size: 'sm', width: '7rem' })}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Adornments &amp; Sizes</span>
          ${copyControls(numberAdornmentSnippet)}
        </div>
        <div class="ws-preview-canvas">
          ${numberField('ws-num-price', 'Price', 'min="0" step="0.01" value="49.00"', { prefix: '$', width: '10rem' })}
          ${numberField('ws-num-stroke', 'Stroke width', 'min="1" max="12" value="3"', { suffix: 'px' })}
          ${numberField('ws-num-stroke-sm', 'Stroke width (small)', 'min="1" max="12" value="3"', { suffix: 'px', size: 'sm', width: '8rem' })}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Disabled, Read-only &amp; Invalid</span>
          ${copyControls(numberStatesSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-4);">
            ${numberField('ws-num-disabled', 'Disabled', 'value="8" disabled', { inertStepper: true })}
            ${numberField('ws-num-readonly', 'Read only', 'value="8" readonly', { inertStepper: true })}
            ${numberField('ws-num-invalid', 'Out of range', 'min="1" max="10" value="42" aria-invalid="true"')}
          </div>
          <p class="ui-error-text" style="margin: 0;">Out of range — enter a value between 1 and 10.</p>
        </div>
      </div>
    </section>

    <!-- Richer Text Field Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Richer Text Field (.ui-richtext)</h2>
      <p class="ws-section-desc">Open UI's Richer Text Fields explainer proposes extensions to the native fields — <code>OpaqueRange</code> over a value, CSS highlights over those ranges, ghost-text <code>::suggestion</code>, input masking — and only <code>OpaqueRange</code> has begun to ship, so there is no rich-text element to restyle. What the kit styles is the container anatomy an app already renders around a <code>[contenteditable]</code> or a <code>&lt;textarea&gt;</code>: <code>.ui-richtext</code> &gt; <code>.ui-richtext-toolbar</code> + <code>.ui-richtext-editor</code> + <code>.ui-richtext-footer</code> (<code>.ui-richtext-count</code>). Editing behavior — what Bold does, what the toolbar toggles — is the app's or its library's; the kit ships no JS, and the workshop wires these demos with <code>document.execCommand</code> purely as a demo. The toolbar composes with <code>.ui-toolbar</code> and holds <code>.ui-btn</code> press-buttons keyed off <code>aria-pressed</code>; the kit adds only the rule under it and the sticky padding. States are asserted on the field: <code>[aria-invalid="true"]</code> / <code>[data-state="error"]</code>, <code>[aria-readonly="true"]</code>, <code>[aria-disabled="true"]</code>, and the ring moves to the field when the editor takes focus.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Toolbar, editor &amp; count</span>
          ${copyControls(richtextSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="max-width: 46rem;">
          <div class="ui-richtext" style="width: 100%;">
            ${richtextToolbar()}
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Entry body" data-ws-count="ws-rt-count" data-ws-limit="600"
                 data-placeholder="Write the entry…">
              <h2>The Vault of Ninth Light</h2>
              <p>Beneath the archive floor the stair turns twice and stops at a door no key was cut for. The <strong>seal</strong> is older than the building, and the mason who set it left <em>no mark</em>.</p>
              <blockquote>Whatever is kept here was kept on purpose.</blockquote>
              <h3>Field notes</h3>
              <ul>
                <li>Air is dry; no salt bloom on the stone.</li>
                <li>The hinge pins read <code>ix-lumen-9</code>.</li>
              </ul>
              <p>See the <a href="#">survey of the lower archive</a> for the earlier measurements.</p>
            </div>
            <div class="ui-richtext-footer">
              <span>Draft — autosaved</span>
              <span class="ui-richtext-count" id="ws-rt-count">0 / 600</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Placeholder, small size &amp; autoresize</span>
          ${copyControls(richtextAutoresizeSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-richtext" data-size="sm" style="width: 100%; --ui-richtext-min-height: 5rem;">
            ${richtextToolbar('ws-rt-empty')}
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Empty entry" data-placeholder="Nothing written yet — start typing…"></div>
          </div>
          <div class="ui-richtext" data-autoresize style="width: 100%; --ui-richtext-min-height: 4rem;">
            <textarea class="ui-richtext-editor" aria-label="Autoresizing note"
                      placeholder="A &lt;textarea&gt; editor that grows with what is typed (field-sizing: content)."></textarea>
          </div>
          <textarea class="ui-textarea" data-autoresize aria-label="Bare autoresizing textarea"
                    placeholder="A bare textarea.ui-textarea[data-autoresize] — same one rule, no field chrome."></textarea>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Highlights</span>
          ${copyControls(richtextHighlightSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="max-width: 46rem;">
          <div class="ui-richtext" style="width: 100%; --ui-richtext-min-height: 0;">
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Reviewed passage" data-ws-highlight="true">
              <p>Ranges the app wraps itself are real <mark class="ui-richtext-highlight">marks</mark> — they stay in the accessibility tree and survive a copy. Each carries an intent: <mark class="ui-richtext-highlight" data-intent="accent">accent</mark>, <mark class="ui-richtext-highlight" data-intent="success">success</mark>, <mark class="ui-richtext-highlight" data-intent="warning">warning</mark>, <mark class="ui-richtext-highlight" data-intent="danger">danger</mark>, and <mark class="ui-richtext-highlight" data-intent="info">info</mark>.</p>
              <p>The other way is the Custom Highlight API: teh misspelled word and the "could of been" phrase below are painted through <code>::highlight(ui-spelling)</code> and <code>::highlight(ui-grammar)</code>, with nothing added to the DOM. It could of been flagged either way.</p>
            </div>
          </div>
          <p class="ui-help-text" style="margin: 0;">The wavy underlines need an engine with <code>CSS.highlights</code>; elsewhere the text simply renders plain.</p>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Read-only, disabled &amp; error</span>
          ${copyControls(richtextStatesSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-richtext" aria-readonly="true" style="width: 100%; --ui-richtext-min-height: 0;">
            <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-readonly="true"
                 aria-label="Read-only entry">
              <p>Read-only: still selectable, focusable and copyable, so the ink keeps full contrast — only the ground and border recede.</p>
            </div>
          </div>
          <div class="ui-richtext" aria-disabled="true" style="width: 100%; --ui-richtext-min-height: 0;">
            ${richtextToolbar('ws-rt-off', true)}
            <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-disabled="true"
                 aria-label="Disabled entry">
              <p>Disabled: a <code>contenteditable="false"</code> editor on a field the app has not marked read-only.</p>
            </div>
          </div>
          <div class="ui-richtext" aria-invalid="true" style="width: 100%; --ui-richtext-min-height: 0;">
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Over the limit" data-ws-count="ws-rt-count-error" data-ws-limit="40">
              <p>This entry is well past the limit it was given, so the field takes the danger ring and the count turns.</p>
            </div>
            <div class="ui-richtext-footer">
              <span class="ui-error-text" style="font-size: inherit;">Too long — trim it to 40 characters.</span>
              <span class="ui-richtext-count" id="ws-rt-count-error" data-state="error">0 / 40</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Panels / Cards Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Panels & Cards (.ui-panel)</h2>
      <p class="ws-section-desc">Structured surface containers with header, body, and action footer.</p>

      <div class="ws-grid">
        <div class="ui-panel" data-variant="raised">
          <div class="ui-panel-header">
            <h3 class="ui-panel-title">Server Metrics</h3>
            <span class="ui-badge" data-intent="success">Active</span>
          </div>
          <div class="ui-panel-body">
            <p style="margin: 0; color: var(--color-text-muted); font-size: var(--text-sm);">
              System resources operating within nominal parameters. Average CPU load 18%.
            </p>
          </div>
          <div class="ui-panel-footer">
            <button class="ui-btn" data-size="sm" data-variant="ghost">Dismiss</button>
            <button class="ui-btn" data-size="sm" data-intent="primary">View Logs</button>
          </div>
        </div>

        <div class="ui-panel">
          <div class="ui-panel-header">
            <h3 class="ui-panel-title">Repository Settings</h3>
            <span class="ui-badge" data-intent="info">Syncing</span>
          </div>
          <div class="ui-panel-body">
            <p style="margin: 0; color: var(--color-text-muted); font-size: var(--text-sm);">
              Connected to Git upstream repository on branch <code>main</code>.
            </p>
          </div>
          <div class="ui-panel-footer">
            <button class="ui-btn" data-size="sm" data-intent="primary">Configure</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Badges Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Badges & Status Chips (.ui-badge)</h2>
      <p class="ws-section-desc">Compact semantic tags for statuses and metadata.</p>
      <div class="ws-preview-canvas">
        <span class="ui-badge">Default</span>
        <span class="ui-badge" data-intent="primary">Primary</span>
        <span class="ui-badge" data-intent="success">Success / Healthy</span>
        <span class="ui-badge" data-intent="warning">Warning / Pending</span>
        <span class="ui-badge" data-intent="danger">Danger / Critical</span>
        <span class="ui-badge" data-intent="info">Info / Notice</span>
      </div>
    </section>

    <!-- Avatars Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Avatars (.ui-avatar)</h2>
      <p class="ws-section-desc">The portrait of a person or entity: an <code>img.ui-avatar-image</code> when there is a photo, a <code>.ui-avatar-fallback</code> of initials or a <code>.ui-avatar-icon</code> when there is not, plus an optional <code>.ui-avatar-status</code> dot. Round by default, <code>data-shape="square"</code> for <code>--radius-control</code>. Nothing clips — the image rounds itself with <code>border-radius: inherit</code>, so a <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> avatar keeps a whole focus ring. Initials are always <code>--color-text-main</code> over an elevated or lightly tinted ground, so they clear AA in every theme.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes (xs / sm / md / lg / xl)</span>
          ${copyControls('<span class="ui-avatar" data-size="lg">\n  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="Ada Lovelace" />\n</span>')}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-end; gap: var(--space-4);">
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="xs"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="sm"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="md"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="lg"')}
          ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="xl"')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Photo, Initials &amp; Icon</span>
          ${copyControls(avatarSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-4);">
          ${photoAvatar('Grace Hopper', 145, 190, ' data-size="lg"')}
          <span class="ui-avatar" data-size="lg" role="img" aria-label="Ada Lovelace"><span class="ui-avatar-fallback">AL</span></span>
          <span class="ui-avatar" data-size="lg" data-intent="primary" role="img" aria-label="Grace Hopper"><span class="ui-avatar-fallback">GH</span></span>
          <span class="ui-avatar" data-size="lg" data-intent="accent" role="img" aria-label="Katherine Johnson"><span class="ui-avatar-fallback">KJ</span></span>
          <span class="ui-avatar" data-size="lg" role="img" aria-label="Unassigned"><span class="ui-avatar-icon">${avatarUserIcon}</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intent Grounds</span>
          ${copyControls('<span class="ui-avatar" data-intent="success" role="img" aria-label="Grace Hopper">\n  <span class="ui-avatar-fallback">GH</span>\n</span>')}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-3);">
          <span class="ui-avatar" role="img" aria-label="Neutral"><span class="ui-avatar-fallback">NE</span></span>
          <span class="ui-avatar" data-intent="primary" role="img" aria-label="Primary"><span class="ui-avatar-fallback">PR</span></span>
          <span class="ui-avatar" data-intent="accent" role="img" aria-label="Accent"><span class="ui-avatar-fallback">AC</span></span>
          <span class="ui-avatar" data-intent="success" role="img" aria-label="Success"><span class="ui-avatar-fallback">SU</span></span>
          <span class="ui-avatar" data-intent="warning" role="img" aria-label="Warning"><span class="ui-avatar-fallback">WA</span></span>
          <span class="ui-avatar" data-intent="danger" role="img" aria-label="Danger"><span class="ui-avatar-fallback">DA</span></span>
          <span class="ui-avatar" data-intent="info" role="img" aria-label="Info"><span class="ui-avatar-fallback">IN</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Status Dot &amp; Square Shape</span>
          ${copyControls(avatarStatusSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-4);">
          <span class="ui-avatar" data-size="lg">
            <img class="ui-avatar-image" src="${portraitSrc(205, 255)}" alt="Ada Lovelace" />
            <span class="ui-avatar-status" data-intent="success" role="img" aria-label="Online"></span>
          </span>
          <span class="ui-avatar" data-size="lg">
            <img class="ui-avatar-image" src="${portraitSrc(145, 190)}" alt="Grace Hopper" />
            <span class="ui-avatar-status" data-intent="warning" role="img" aria-label="Away"></span>
          </span>
          <span class="ui-avatar" data-size="lg">
            <img class="ui-avatar-image" src="${portraitSrc(20, 340)}" alt="Katherine Johnson" />
            <span class="ui-avatar-status" data-intent="danger" role="img" aria-label="Do not disturb"></span>
          </span>
          <span class="ui-avatar" data-size="lg" role="img" aria-label="Alan Turing, offline">
            <span class="ui-avatar-fallback">AT</span>
            <span class="ui-avatar-status"></span>
          </span>
          <span class="ui-avatar" data-size="lg" data-shape="square">
            <img class="ui-avatar-image" src="${portraitSrc(265, 205)}" alt="Radia Perlman" />
            <span class="ui-avatar-status" data-intent="success" role="img" aria-label="Online"></span>
          </span>
          <span class="ui-avatar" data-size="lg" data-shape="square" data-intent="info" role="img" aria-label="Build agent"><span class="ui-avatar-icon">${avatarUserIcon}</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Group with Overflow</span>
          ${copyControls(avatarGroupSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-6);">
          <div class="ui-avatar-group">
            ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="sm"')}
            ${photoAvatar('Grace Hopper', 145, 190, ' data-size="sm"')}
            ${photoAvatar('Katherine Johnson', 20, 340, ' data-size="sm"')}
            <span class="ui-avatar ui-avatar-more" data-size="sm" role="img" aria-label="3 more people">+3</span>
          </div>
          <div class="ui-avatar-group">
            ${photoAvatar('Ada Lovelace', 205, 255, ' data-size="lg"')}
            <span class="ui-avatar" data-size="lg" data-intent="primary" role="img" aria-label="Grace Hopper"><span class="ui-avatar-fallback">GH</span></span>
            ${photoAvatar('Katherine Johnson', 20, 340, ' data-size="lg"')}
            <span class="ui-avatar ui-avatar-more" data-size="lg" role="img" aria-label="12 more people">+12</span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Interactive (hover ring, focus ring — tab to it)</span>
          ${copyControls(avatarInteractiveSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-4);">
          <button type="button" class="ui-avatar" data-size="md" aria-label="Account menu">
            <img class="ui-avatar-image" src="${portraitSrc(205, 255)}" alt="" />
          </button>
          <a class="ui-avatar" data-size="md" data-intent="primary" href="#avatars" aria-label="Grace Hopper"><span class="ui-avatar-fallback">GH</span></a>
          <button type="button" class="ui-avatar" data-size="md" data-shape="square" aria-label="Add a collaborator"><span class="ui-avatar-icon">${avatarUserIcon}</span></button>
          <button type="button" class="ui-avatar" data-size="md" aria-label="Unavailable" disabled><span class="ui-avatar-fallback">AT</span></button>
          <div class="ui-avatar-group">
            <button type="button" class="ui-avatar" data-size="md" aria-label="Ada Lovelace">
              <img class="ui-avatar-image" src="${portraitSrc(205, 255)}" alt="" />
            </button>
            <button type="button" class="ui-avatar" data-size="md" aria-label="Grace Hopper">
              <img class="ui-avatar-image" src="${portraitSrc(145, 190)}" alt="" />
            </button>
            <button type="button" class="ui-avatar" data-size="md" aria-label="Katherine Johnson">
              <img class="ui-avatar-image" src="${portraitSrc(20, 340)}" alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tags Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Tags (.ui-tag)</h2>
      <p class="ws-section-desc">The interactive counterpart to <code>.ui-badge</code>: a token the reader selects, follows, or removes. Anatomy is <code>.ui-tag-icon</code> / <code>.ui-tag-label</code> / <code>.ui-tag-remove</code> inside a <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, or <code>&lt;button&gt;</code>, wrapped in a <code>.ui-tag-group</code>. Selection keys off <code>aria-pressed</code> (or <code>aria-selected</code>); the label is always <code>--color-text-main</code> over a tint of the intent so it clears AA in every theme. Ships no runtime — the workshop wires the removal and the filter toggles.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents (subtle fill)</span>
          ${copyControls(tagSnippet)}
        </div>
        <div class="ws-preview-canvas">
          <div class="ui-tag-group">
            <span class="ui-tag"><span class="ui-tag-label">Neutral</span></span>
            <span class="ui-tag" data-intent="primary"><span class="ui-tag-label">Primary</span></span>
            <span class="ui-tag" data-intent="accent"><span class="ui-tag-label">Accent</span></span>
            <span class="ui-tag" data-intent="success"><span class="ui-tag-label">Success</span></span>
            <span class="ui-tag" data-intent="warning"><span class="ui-tag-label">Warning</span></span>
            <span class="ui-tag" data-intent="danger"><span class="ui-tag-label">Danger</span></span>
            <span class="ui-tag" data-intent="info"><span class="ui-tag-label">Info</span></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Outline Variant &amp; Leading Icon</span>
          ${copyControls('<span class="ui-tag" data-variant="outline" data-intent="success">\n  <span class="ui-tag-icon">…</span>\n  <span class="ui-tag-label">Verified</span>\n</span>')}
        </div>
        <div class="ws-preview-canvas">
          <div class="ui-tag-group">
            <span class="ui-tag" data-variant="outline"><span class="ui-tag-label">Neutral</span></span>
            <span class="ui-tag" data-variant="outline" data-intent="primary"><span class="ui-tag-label">Primary</span></span>
            <span class="ui-tag" data-variant="outline" data-intent="danger"><span class="ui-tag-label">Danger</span></span>
            <span class="ui-tag" data-variant="outline" data-intent="success">${tagIcon}<span class="ui-tag-label">Verified</span></span>
            <span class="ui-tag" data-intent="info">${tagIcon}<span class="ui-tag-label">With icon</span></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes (sm &amp; md)</span>
          ${copyControls('<span class="ui-tag" data-size="sm" data-intent="primary"><span class="ui-tag-label">Small</span></span>')}
        </div>
        <div class="ws-preview-canvas">
          <span class="ui-tag" data-size="sm"><span class="ui-tag-label">Small neutral</span></span>
          <span class="ui-tag" data-size="sm" data-intent="primary"><span class="ui-tag-label">Small primary</span></span>
          <span class="ui-tag" data-size="sm" data-intent="warning"><span class="ui-tag-label">tiff</span><button class="ui-tag-remove" type="button" aria-label="Remove tiff"></button></span>
          <span class="ui-tag" data-size="md" data-intent="primary"><span class="ui-tag-label">Medium (default)</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Removable (.ui-tag-remove)</span>
          ${copyControls(tagRemoveSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tag-group" id="ws-tag-removable">
            <span class="ui-tag" data-intent="info"><span class="ui-tag-label">render:draft</span><button class="ui-tag-remove" type="button" aria-label="Remove render:draft"></button></span>
            <span class="ui-tag" data-intent="success"><span class="ui-tag-label">approved</span><button class="ui-tag-remove" type="button" aria-label="Remove approved"></button></span>
            <span class="ui-tag" data-intent="warning"><span class="ui-tag-label">needs-alt-text</span><button class="ui-tag-remove" type="button" aria-label="Remove needs-alt-text"></button></span>
            <span class="ui-tag"><span class="ui-tag-label">archive-1998</span><button class="ui-tag-remove" type="button" aria-label="Remove archive-1998"></button></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Selectable Filter Group (aria-pressed)</span>
          ${copyControls(tagFilterSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tag-group" role="group" aria-label="Filter by tag">
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="true"><span class="ui-tag-label">Landscape</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false"><span class="ui-tag-label">Portrait</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="true"><span class="ui-tag-label">Monochrome</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false"><span class="ui-tag-label">Long exposure</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false"><span class="ui-tag-label">Film scan</span></button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Link Tag &amp; Disabled</span>
          ${copyControls('<a class="ui-tag" href="#" data-intent="accent"><span class="ui-tag-label">#tectonics</span></a>\n<button class="ui-tag" type="button" disabled><span class="ui-tag-label">Locked</span></button>')}
        </div>
        <div class="ws-preview-canvas">
          <a class="ui-tag" href="#" data-intent="accent"><span class="ui-tag-label">#tectonics</span></a>
          <a class="ui-tag" href="#"><span class="ui-tag-label">#field-notes</span></a>
          <button class="ui-tag" type="button" disabled><span class="ui-tag-label">Locked</span></button>
          <span class="ui-tag" data-intent="danger" aria-disabled="true"><span class="ui-tag-label">quarantined</span><button class="ui-tag-remove" type="button" aria-label="Remove quarantined"></button></span>
        </div>
      </div>
    </section>

    <!-- Toast Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Toast (.ui-toast)</h2>
      <p class="ws-section-desc">Transient notification cards that stack in a fixed <code>.ui-toast-region</code> anchored to a viewport corner. Intent rides the leading edge and the icon. Ships no runtime — apps add/remove toasts; CSS provides the entrance animation and a <code>data-state="closing"</code> hook for the exit.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents</span>
          ${copyControls(toastSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch;">
          ${staticToast('success', 'Deployment complete', 'All 12 service nodes are live on the new release.')}
          ${staticToast('info', 'Sync in progress', 'Fetching upstream changes from origin/main.')}
          ${staticToast('warning', 'Storage almost full', 'You have used 92% of your workspace quota.')}
          ${staticToast('danger', 'Upload failed', 'The connection was reset before the file finished.')}
          ${staticToast('', 'Draft saved', 'Your changes are saved locally.')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Live — spawn into a region (bottom-end)</span>
          ${copyControls('<div class="ui-toast-region" data-position="bottom-end"></div>\n<!-- app appends .ui-toast nodes here, then removes them -->')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-intent="success" data-toast="success">Show success</button>
          <button class="ui-btn" data-variant="outline" data-intent="danger" data-toast="danger">Show error</button>
          <button class="ui-btn" data-variant="outline" data-toast="info">Show info</button>
        </div>
      </div>
    </section>

    <!-- Alert / Callout Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Alert / Callout (.ui-alert)</h2>
      <p class="ws-section-desc">Persistent, inline message blocks — the standing counterpart to the transient toast. Intent tints the fill and border and colors the icon. Holds a title, message, optional <code>.ui-alert-actions</code>, and an optional <code>.ui-alert-close</code>. Apps add <code>role="alert"</code> / <code>aria-live</code> when an alert is injected in response to an action.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents</span>
          ${copyControls(alertSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch;">
          ${staticAlert('info', 'Scheduled maintenance', 'The workspace will be read-only on Sunday 02:00–03:00 UTC.')}
          ${staticAlert('success', 'Backup complete', 'Your last snapshot finished 4 minutes ago.')}
          ${staticAlert('warning', 'Storage almost full', 'You have used 92% of your workspace quota.')}
          ${staticAlert('danger', 'Deployment failed', 'The production cluster rejected the release — no nodes were updated.')}
          ${staticAlert('', 'Draft mode', 'Changes are private until you publish.')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">With actions &amp; dismiss</span>
          ${copyControls(alertActionsSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch;">
          ${staticAlert('warning', 'Storage almost full', 'You have used 92% of your workspace quota. Upgrade to keep syncing.', {
            actions: '<button class="ui-btn" data-size="sm" data-intent="primary">Upgrade plan</button><button class="ui-btn" data-size="sm" data-variant="ghost">Manage storage</button>',
            dismiss: true,
          })}
          ${staticAlert('', 'Cookie preferences', 'We use essential cookies only. You can review the details any time.', { dismiss: true })}
        </div>
      </div>
    </section>

    <!-- Progress Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Progress (progress.ui-progress)</h2>
      <p class="ws-section-desc">The native <code>&lt;progress&gt;</code> element, restyled. Determinate bars fill to <code>value</code>; omit <code>value</code> for an indeterminate sweep. <code>data-intent</code> recolors either state and <code>data-size</code> sets the height. A label and percentage are app-composed around the bar.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Determinate &amp; intents</span>
          ${copyControls(progressSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <progress class="ui-progress" value="25" max="100"></progress>
          <progress class="ui-progress" data-intent="success" value="100" max="100"></progress>
          <progress class="ui-progress" data-intent="warning" value="60" max="100"></progress>
          <progress class="ui-progress" data-intent="danger" value="88" max="100"></progress>
          <progress class="ui-progress" data-intent="info" value="45" max="100"></progress>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Labeled (with percentage)</span>
          ${copyControls(progressLabeledSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <div style="display: flex; justify-content: space-between; font-size: var(--text-sm);">
              <span style="color: var(--color-text-main); font-weight: var(--font-medium);">Packing textures…</span>
              <span style="color: var(--color-text-muted);">72%</span>
            </div>
            <progress class="ui-progress" value="72" max="100"></progress>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes &amp; indeterminate</span>
          ${copyControls('<progress class="ui-progress" data-size="sm" value="40" max="100"></progress>\n<progress class="ui-progress" data-size="lg" value="40" max="100"></progress>\n<!-- no value = indeterminate sweep -->\n<progress class="ui-progress"></progress>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <progress class="ui-progress" data-size="sm" value="40" max="100"></progress>
          <progress class="ui-progress" value="40" max="100"></progress>
          <progress class="ui-progress" data-size="lg" value="40" max="100"></progress>
          <progress class="ui-progress" aria-label="Loading"></progress>
          <progress class="ui-progress" data-intent="success" aria-label="Loading"></progress>
        </div>
      </div>
    </section>

    <!-- File Input Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">File Input (.ui-file)</h2>
      <p class="ws-section-desc">The native <code>&lt;input type="file"&gt;</code> in two forms sharing one class family. The <em>button form</em> is a <code>&lt;label class="ui-file"&gt;</code> around a visually hidden input, a <code>.ui-file-trigger</code> that borrows <code>.ui-btn</code> for its look, and a <code>.ui-file-name</code> the app fills. The <em>native form</em> (<code>.ui-file-native</code>) needs no wrapper — its built-in button is restyled through <code>::file-selector-button</code>. <code>data-variant="dropzone"</code> turns the label into a dashed drop target with <code>.ui-file-icon</code> and <code>.ui-file-hint</code>. CSS cannot observe a drag, so the app sets <code>data-state="dragover"</code> from its own handlers; <code>data-state="error"</code> and <code>aria-invalid</code> take the danger edge. Ships no runtime — the workshop wires the filename readout and the drag states.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Button form (label + hidden input)</span>
          ${copyControls(fileButtonSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <label class="ui-file">
            <input type="file" id="ws-file-a">
            <span class="ui-btn ui-file-trigger" data-variant="outline">Choose file</span>
            <span class="ui-file-name">No file chosen</span>
          </label>
          <label class="ui-file" data-size="sm">
            <input type="file" id="ws-file-b" multiple>
            <span class="ui-btn ui-file-trigger" data-variant="outline" data-size="sm">Add images</span>
            <span class="ui-file-name">No file chosen</span>
          </label>
          <label class="ui-file">
            <input type="file" disabled>
            <span class="ui-btn ui-file-trigger" data-variant="outline">Choose file</span>
            <span class="ui-file-name">Uploads are locked</span>
          </label>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native form (::file-selector-button)</span>
          ${copyControls(fileNativeSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <input type="file" class="ui-file-native" aria-label="Attachment">
          <input type="file" class="ui-file-native" data-size="sm" aria-label="Small attachment">
          <input type="file" class="ui-file-native" aria-label="Rejected attachment" aria-invalid="true">
          <input type="file" class="ui-file-native" aria-label="Locked attachment" disabled>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Dropzone — live (drag a file over it)</span>
          ${copyControls(fileDropzoneSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <label class="ui-file" data-variant="dropzone">
            <input type="file" id="ws-file-drop" multiple>
            <span class="ui-file-icon">${fileUploadIcon}</span>
            <p class="ui-file-hint">Drag images here, or</p>
            <span class="ui-btn ui-file-trigger" data-variant="outline">Browse files</span>
            <p class="ui-file-hint">PNG, JPG or WebP — up to 10 MB each</p>
          </label>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Dropzone states (dragover, error, disabled)</span>
          ${copyControls('<label class="ui-file" data-variant="dropzone" data-state="dragover">…</label>\n<label class="ui-file" data-variant="dropzone" data-state="error">…</label>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          ${staticDropzone('dragover', 'Release to add 3 files', 'Drop anywhere in this area')}
          ${staticDropzone('error', 'sunset.tiff is not a supported format', 'PNG, JPG or WebP — up to 10 MB each')}
          ${staticDropzone('disabled', 'Uploads are paused', 'The library is being re-indexed')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Small dropzone with a chosen-file list</span>
          ${copyControls(fileListSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div>
            <label class="ui-file" data-variant="dropzone" data-size="sm">
              <input type="file" id="ws-file-drop-sm" multiple>
              <span class="ui-file-icon">${fileUploadIcon}</span>
              <span class="ui-btn ui-file-trigger" data-variant="outline" data-size="sm">Add more</span>
              <p class="ui-file-hint">3 files selected</p>
            </label>
            <ul class="ui-file-list">
              ${fileToken('dune-ridge.png')}
              ${fileToken('basalt-column.jpg')}
              ${fileToken('scan-0142.webp')}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Meter / Gauge Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Meter / Gauge (meter.ui-meter)</h2>
      <p class="ws-section-desc">The native <code>&lt;meter&gt;</code> — a scalar measurement in a known range. Unlike progress, the browser picks the color from where <code>value</code> sits among <code>low</code>/<code>high</code>/<code>optimum</code>, so the same markup reads green/amber/red by meaning. Set <code>optimum</code> low and a high value is "bad" (a usage meter); set it high and a low value is "bad" (a health bar).</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Usage meter — high is bad (optimum low)</span>
          ${copyControls(meterSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          ${labeledMeter('Disk usage', '40%', 'min="0" max="100" low="60" high="85" optimum="20" value="40"')}
          ${labeledMeter('Disk usage', '72%', 'min="0" max="100" low="60" high="85" optimum="20" value="72"')}
          ${labeledMeter('Disk usage', '93%', 'min="0" max="100" low="60" high="85" optimum="20" value="93"')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Health bar — low is bad (optimum high)</span>
          ${copyControls('<meter class="ui-meter"\n  min="0" max="100" low="25" high="60" optimum="100"\n  value="82" aria-label="Hull integrity 82%"></meter>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          ${labeledMeter('Hull integrity', '82%', 'min="0" max="100" low="25" high="60" optimum="100" value="82"')}
          ${labeledMeter('Hull integrity', '45%', 'min="0" max="100" low="25" high="60" optimum="100" value="45"')}
          ${labeledMeter('Hull integrity', '14%', 'min="0" max="100" low="25" high="60" optimum="100" value="14"')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes</span>
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <meter class="ui-meter" data-size="sm" min="0" max="100" low="60" high="85" optimum="20" value="55" aria-label="55 percent"></meter>
          <meter class="ui-meter" min="0" max="100" low="60" high="85" optimum="20" value="55" aria-label="55 percent"></meter>
          <meter class="ui-meter" data-size="lg" min="0" max="100" low="60" high="85" optimum="20" value="55" aria-label="55 percent"></meter>
        </div>
      </div>
    </section>

    <!-- Skeleton Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Skeleton (.ui-skeleton)</h2>
      <p class="ws-section-desc">A loading placeholder shaped like the content that is still arriving. <code>data-shape</code> picks text / rect / circle, <code>data-size</code> sets the font-size every shape is measured against, and <code>data-animation</code> chooses shimmer (default), pulse, or none. The app marks the loading region <code>aria-busy="true"</code> and the skeletons themselves are <code>aria-hidden="true"</code> — they announce nothing.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Shapes</span>
          ${copyControls(skeletonSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <span class="ui-skeleton" data-shape="text" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes (text lines &amp; circles)</span>
          ${copyControls('<span class="ui-skeleton" data-shape="text" data-size="sm" aria-hidden="true"></span>\n<span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <span class="ui-skeleton" data-shape="text" data-size="sm" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="text" data-size="md" aria-hidden="true"></span>
          <span class="ui-skeleton" data-shape="text" data-size="lg" aria-hidden="true"></span>
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <span class="ui-skeleton" data-shape="circle" data-size="sm" aria-hidden="true"></span>
            <span class="ui-skeleton" data-shape="circle" data-size="md" aria-hidden="true"></span>
            <span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Text block — last line runs short</span>
          ${copyControls(skeletonTextSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-skeleton-text" aria-hidden="true">
            <span class="ui-skeleton"></span>
            <span class="ui-skeleton"></span>
            <span class="ui-skeleton"></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Animations — shimmer / pulse / none</span>
          ${copyControls('<span class="ui-skeleton" data-animation="shimmer" aria-hidden="true"></span>\n<span class="ui-skeleton" data-animation="pulse" aria-hidden="true"></span>\n<span class="ui-skeleton" data-animation="none" aria-hidden="true"></span>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          ${skeletonAnimationRow('shimmer')}
          ${skeletonAnimationRow('pulse')}
          ${skeletonAnimationRow('none')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Composed card — loading beside loaded</span>
          ${copyControls(skeletonCardSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: stretch;">
          <div class="ui-panel" style="flex: 1 1 260px;" aria-busy="true">
            <div class="ui-panel-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>
                <div class="ui-skeleton-text" style="flex: 1;" aria-hidden="true">
                  <span class="ui-skeleton" data-size="md"></span>
                  <span class="ui-skeleton" data-size="sm"></span>
                </div>
              </div>
              <span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
            </div>
          </div>
          <div class="ui-panel" style="flex: 1 1 260px;">
            <div class="ui-panel-body" style="display: flex; flex-direction: column; gap: var(--space-4);">
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <span style="width: 2.5rem; height: 2.5rem; flex-shrink: 0; border-radius: var(--radius-full); background-color: var(--color-primary-subtle); color: var(--color-primary); font-weight: var(--font-semibold); display: inline-flex; align-items: center; justify-content: center;">P</span>
                <div>
                  <p style="margin: 0; font-weight: var(--font-medium);">Pangaea Atlas</p>
                  <p style="margin: 0; font-size: var(--text-sm); color: var(--color-text-muted);">Updated 4 minutes ago</p>
                </div>
              </div>
              <p style="margin: 0; color: var(--color-text-muted); font-size: var(--text-sm);">Continental drift reconstructions from 250 Ma to present, rendered from the shared plate model.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Image (.ui-image)</h2>
      <p class="ws-section-desc">A framed picture and the things that hang off it. <code>data-fit</code> crops or letterboxes, <code>data-ratio</code> (or the <code>--ui-image-ratio</code> knob) sets the box, <code>data-shape</code> picks the rounding, and <code>data-variant="thumbnail"</code> is the contact-sheet scale. <code>aria-busy="true"</code> runs the loading shimmer; an <code>&lt;img&gt;</code> with no <code>src</code> — or <code>data-state="error"</code> after a failed load — reveals <code>.ui-image-fallback</code>. The pictures below are canvas-drawn PNG data URIs, not files.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Fit — cover / contain / fill in a 16:9 box</span>
          ${copyControls(imageFitSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          ${(['cover', 'contain', 'fill'] as const)
            .map(
              (fit) => `
            <figure class="ui-image" data-fit="${fit}" data-ratio="16:9" style="flex: 1 1 200px;">
              <img src="${wsPhoto('#1d4ed8', '#a21caf')}" alt="Abstract gradient study">
              <figcaption class="ui-image-caption">data-fit="${fit}"</figcaption>
            </figure>`,
            )
            .join('')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Ratio &amp; shape</span>
          ${copyControls(imageRatioSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          ${(['1:1', '4:3', '3:2', '16:9'] as const)
            .map(
              (ratio) => `
            <figure class="ui-image" data-ratio="${ratio}" style="flex: 1 1 160px;">
              <img src="${wsPhoto('#0f766e', '#22d3ee')}" alt="Abstract gradient study">
              <figcaption class="ui-image-caption">${ratio}</figcaption>
            </figure>`,
            )
            .join('')}
          <figure class="ui-image" data-shape="circle" style="flex: 0 0 120px;">
            <img src="${wsPhoto('#7c2d12', '#f59e0b')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption" style="text-align: center;">circle</figcaption>
          </figure>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Caption — below, and on the scrim</span>
          ${copyControls(imageCaptionSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          <figure class="ui-image" data-ratio="4:3" style="flex: 1 1 240px;">
            <img src="${wsPhoto('#312e81', '#c084fc')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption">Plate reconstruction, 250 Ma — muted ink under the picture.</figcaption>
          </figure>
          <figure class="ui-image" data-ratio="4:3" data-caption="overlay" style="flex: 1 1 240px;">
            <img src="${wsPhoto('#f8fafc', '#fde68a')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption">On the scrim — solid under the words, fading above them, so a pale picture cannot wash the text out.</figcaption>
          </figure>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Thumbnail grid with badges</span>
          ${copyControls(imageGridSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-image-grid" style="width: 100%;">
            ${[
              ['#0369a1', '#38bdf8', 'RAW', 'info'],
              ['#166534', '#4ade80', 'New', 'success'],
              ['#7e22ce', '#e879f9', '4K', 'accent'],
              ['#9a3412', '#fb923c', 'Dup', 'warning'],
              ['#1e3a8a', '#93c5fd', 'HDR', 'primary'],
            ]
              .map(
                ([from, to, label, intent]) => `
              <button class="ui-image" type="button" data-variant="thumbnail" data-ratio="1:1">
                <img src="${wsPhoto(from, to)}" alt="Library item ${label}">
                <span class="ui-image-badge" data-position="end"><span class="ui-tag" data-intent="${intent}">${label}</span></span>
              </button>`,
              )
              .join('')}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Loading &amp; error states</span>
          ${copyControls(imageStateSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          <figure class="ui-image" id="ws-image-busy" data-ratio="4:3" aria-busy="true" style="flex: 1 1 200px;">
            <img src="${WS_PENDING_PIXEL}" data-src="${wsPhoto('#155e75', '#67e8f9')}" alt="Abstract gradient study">
            <figcaption class="ui-image-caption">aria-busy — toggle it</figcaption>
          </figure>
          <figure class="ui-image" data-ratio="4:3" data-state="error" style="flex: 1 1 200px;">
            <img alt="">
            <span class="ui-image-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 4 4 3-3 4 4"/><path d="m3 3 18 18"/></svg>
              Image unavailable
            </span>
            <figcaption class="ui-image-caption">data-state="error"</figcaption>
          </figure>
          <figure class="ui-image" data-ratio="4:3" style="flex: 1 1 200px;">
            <img alt="">
            <span class="ui-image-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m4 17 5-5 4 4 3-3 4 4"/><path d="m3 3 18 18"/></svg>
              No source yet
            </span>
            <figcaption class="ui-image-caption">img:not([src])</figcaption>
          </figure>
          <div style="flex: 0 0 auto; align-self: center;">
            <button class="ui-btn" data-variant="outline" type="button" id="ws-image-busy-toggle">Toggle loading</button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Interactive — hover zooms, tab shows the ring</span>
          ${copyControls(imageInteractiveSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-5); align-items: flex-start;">
          <a class="ui-image" href="#image" data-ratio="3:2" style="flex: 1 1 220px;">
            <img src="${wsPhoto('#134e4a', '#5eead4')}" alt="Open the plate atlas">
            <span class="ui-image-badge"><span class="ui-badge" data-intent="info">Atlas</span></span>
          </a>
          <button class="ui-image" type="button" data-ratio="3:2" style="flex: 1 1 220px;">
            <img src="${wsPhoto('#4c1d95', '#a78bfa')}" alt="Expand the render">
          </button>
        </div>
      </div>
    </section>

    <!-- Tooltip Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Tooltip (.ui-tooltip)</h2>
      <p class="ws-section-desc">Pure-CSS supplementary label revealed on hover <em>and</em> keyboard focus. Wire the trigger to the content with <code>aria-describedby</code>. Four placements via <code>data-placement</code>. It can't be dismissed with Escape (WCAG 1.4.13) in pure CSS — when that's required, use the click-triggered toggletip on a native <code>[popover]</code> (see Popover below), which dismisses on Escape natively.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Placements — hover or tab to a button</span>
          ${copyControls(tooltipSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-8); padding-block: var(--space-12); justify-content: center;">
          <span class="ui-tooltip" data-placement="top">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-top">Top</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-top">Tooltip above the trigger</span>
          </span>
          <span class="ui-tooltip" data-placement="bottom">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-bottom">Bottom</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-bottom">Tooltip below the trigger</span>
          </span>
          <span class="ui-tooltip" data-placement="left">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-left">Left</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-left">Tooltip to the left</span>
          </span>
          <span class="ui-tooltip" data-placement="right">
            <button class="ui-btn" data-variant="outline" aria-describedby="ws-tt-right">Right</button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-right">Tooltip to the right</span>
          </span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">On an icon-only control (with a longer hint)</span>
        </div>
        <div class="ws-preview-canvas" style="padding-block: var(--space-10); justify-content: center;">
          <span class="ui-tooltip" data-placement="top">
            <button class="ui-btn" data-variant="ghost" aria-describedby="ws-tt-icon" aria-label="Copy link">
              ${copyIcon}
            </button>
            <span class="ui-tooltip-content" role="tooltip" id="ws-tt-icon">Copies a shareable link to this workspace to your clipboard.</span>
          </span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Hint popover — <code>interestfor</code> + <code>popover="hint"</code></span>
          ${copyControls(hintTooltipSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-8); padding-block: var(--space-12); justify-content: center;">
          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-top">Top</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-top" data-placement="top">Opened by interest, dismissed by Escape</div>

          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-bottom">Bottom</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-bottom" data-placement="bottom">Anchored below the invoker</div>

          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-left">Left</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-left" data-placement="left">Anchored to the left</div>

          <button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="ws-hint-right">Right</button>
          <div class="ui-tooltip" popover="hint" id="ws-hint-right" data-placement="right">Anchored to the right</div>
        </div>
        <p class="ws-section-desc" style="margin-top: var(--space-3);">Hover, or tab to a button, and the hint appears after <code>interest-delay-start</code> (0.35s from <code>.ui-tooltip-trigger</code>); Escape or a click outside dismisses it. Chromium and Edge only — <code>popover="hint"</code> since 133, <code>interestfor</code> since 142. Firefox and Safari render nothing here, which is why the four buttons above still carry the CSS tooltip.</p>
      </div>
    </section>

    <!-- Carousel Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Carousel (.ui-carousel)</h2>
      <p class="ws-section-desc">A <code>.ui-carousel-track</code> scroller of <code>.ui-carousel-item</code> slides held in place by <code>scroll-snap</code> — dragging, flicking, keyboard scrolling and momentum are the browser's, so the baseline needs no script at all. <code>data-variant</code> picks the shape of the strip (<code>peek</code> centres a wide slide with its neighbours showing, <code>full</code> gives one slide the whole width) and <code>data-size</code> sets the default strip's item width. Where Chromium 135+ supports them, an <code>@supports selector(::scroll-marker)</code> block grows the arrows and dots straight off the track — <code>::scroll-button(inline-start)</code> / <code>(inline-end)</code>, one <code>::scroll-marker</code> per item with the current one matched by <code>:target-current</code>, collected in a <code>::scroll-marker-group</code> below — so nothing is rendered for them. For engines without those pseudos the app renders <code>.ui-carousel-prev</code> / <code>-next</code> (composed with <code>.ui-btn</code>) and a <code>.ui-carousel-markers</code> row of <code>button[aria-current]</code>, and wires them; the kit ships no runtime, so the workshop does that here. <code>data-controls="app"</code> suppresses the generated pair on a supporting engine, so the two sets never both appear.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Card strip, <code>data-variant="peek"</code> — drag or flick; neighbours show at both edges</span>
          ${copyControls(carouselPeekSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <div class="ui-carousel" data-variant="peek">
            <div class="ui-carousel-track" role="group" aria-label="Featured collections">
              ${carouselCards.map((card, i) => `
                <div class="ui-carousel-item">
                  <div class="ui-panel">
                    <div class="ws-carousel-thumb" style="--ws-carousel-hue: ${card.token}" aria-hidden="true">${i + 1}</div>
                    <div class="ui-panel-body">
                      <strong>${card.title}</strong>
                      <p style="margin: var(--space-1) 0 0; color: var(--color-text-muted); font-size: var(--text-sm);">${card.meta}</p>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Full-width, class-based buttons &amp; dots — for engines without the scroll pseudos</span>
          ${copyControls(carouselFullSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <div class="ui-carousel" data-variant="full" data-controls="app" id="ws-carousel-full">
            <div class="ui-carousel-track" role="group" aria-label="Release screenshots">
              ${carouselSlides.map((slide, i) => `
                <div class="ui-carousel-item" id="ws-carousel-slide-${i}">
                  <div class="ws-carousel-photo" data-tone="${slide.tone}">${slide.label}</div>
                </div>`).join('')}
            </div>
            <button class="ui-btn ui-carousel-prev" data-variant="ghost" data-size="icon" type="button" aria-label="Previous slide">${carouselChevron('left')}</button>
            <button class="ui-btn ui-carousel-next" data-variant="ghost" data-size="icon" type="button" aria-label="Next slide">${carouselChevron('right')}</button>
            <div class="ui-carousel-markers" role="group" aria-label="Choose slide">
              ${carouselSlides.map((slide, i) => `
                <button class="ui-carousel-marker" type="button" aria-current="${i === 0 ? 'true' : 'false'}"
                        aria-label="Go to ${slide.label}" data-target="ws-carousel-slide-${i}"></button>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native <code>::scroll-button()</code> and <code>::scroll-marker</code> — same markup, no controls rendered</span>
          ${copyControls(carouselNativeSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <p class="ws-section-desc" style="margin-top: 0;">Below is a track and its items and nothing else. In Chromium 135+ the arrows and the dot row you see are the browser's, drawn from the track; the arrow at an end disables itself and the dots track the scroll position without a line of app code. In Firefox, Safari and older Chromium the same markup is a plain snapping strip — swipe it, or render the class-based controls above.</p>
          <div class="ui-carousel" data-variant="peek">
            <div class="ui-carousel-track" role="group" aria-label="Native carousel">
              ${carouselSlides.map((slide) => `
                <div class="ui-carousel-item">
                  <div class="ws-carousel-photo" data-tone="${slide.tone}">${slide.label}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes &amp; <code>data-orientation="vertical"</code></span>
          ${copyControls(carouselSizesSnippet)}
        </div>
        <div class="ws-preview-canvas" style="display: block;">
          <div class="ui-carousel" data-size="sm" style="margin-bottom: var(--space-6);">
            <div class="ui-carousel-track" role="group" aria-label="Small strip">
              ${carouselCards.map((card, i) => `
                <div class="ui-carousel-item">
                  <div class="ws-carousel-thumb" style="--ws-carousel-hue: ${card.token}" aria-hidden="true">${i + 1}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="ui-carousel" data-orientation="vertical" style="--ui-carousel-viewport: 220px; max-width: 320px;">
            <div class="ui-carousel-track" role="group" aria-label="Vertical strip">
              ${carouselCards.map((card, i) => `
                <div class="ui-carousel-item">
                  <div class="ws-carousel-thumb" style="--ws-carousel-hue: ${card.token}" aria-hidden="true">${i + 1}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popover Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Popover & Menu (.ui-popover)</h2>
      <p class="ws-section-desc">Native <code>[popover]</code> toggled by <code>popovertarget</code> — no JavaScript — holding a <code>.ui-menu</code>.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Account Menu</span>
          ${copyControls(popoverSnippet)}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-variant="outline" popovertarget="ws-demo-popover">Account ▾</button>
          <div id="ws-demo-popover" popover class="ui-popover">
            <ul class="ui-menu">
              <li><a class="ui-menu-item">View Profile</a></li>
              <li><a class="ui-menu-item">Workspace Settings</a></li>
              <li class="ui-menu-divider"></li>
              <li><a class="ui-menu-item">Sign Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Combobox Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Combobox (.ui-combobox)</h2>
      <p class="ws-section-desc">A text field that filters a listbox. Open UI's explainer proposes a native <code>&lt;input list&gt;</code> + <code>&lt;datalist&gt;</code> with <code>:active-option</code> and <code>:filtered</code>; until that ships this is the ARIA pattern with the same anatomy — an <code>.ui-input</code> carrying <code>role="combobox"</code>, an optional <code>.ui-combobox-clear</code> and <code>.ui-combobox-trigger</code> over it, and a <code>.ui-combobox-listbox</code> on a native <code>[popover]</code> (so Escape and light-dismiss are the browser's). Because <code>aria-activedescendant</code> keeps focus in the input, the highlighted option is marked with <code>data-active</code> rather than <code>:focus</code>. Ships no runtime — the workshop does the filtering, the arrow keys, and the popover toggling.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Filterable Select — type, arrow, Enter</span>
          ${copyControls(comboboxSnippet)}
        </div>
        <div class="ws-preview-canvas" style="min-height: 300px; align-items: flex-start;">
          <div class="ui-combobox" id="ws-combobox">
            <input class="ui-input" id="ws-combobox-input" role="combobox" aria-expanded="false"
              aria-controls="ws-combobox-listbox" aria-autocomplete="list" aria-label="Deploy region"
              autocomplete="off" placeholder="Search regions…">
            <button class="ui-combobox-clear" type="button" aria-label="Clear region" hidden></button>
            <button class="ui-combobox-trigger" type="button" aria-label="Show regions" tabindex="-1"></button>
            <div class="ui-combobox-listbox" id="ws-combobox-listbox" popover role="listbox" aria-label="Deploy region"></div>
          </div>
          <div class="ui-combobox" data-size="sm">
            <input class="ui-input" role="combobox" aria-expanded="false" aria-autocomplete="list"
              aria-label="Small combobox" autocomplete="off" placeholder="data-size=&quot;sm&quot;" disabled>
            <button class="ui-combobox-trigger" type="button" aria-label="Show options" tabindex="-1" disabled></button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Option States, Groups &amp; Match Highlight</span>
          ${copyControls(comboboxListboxSnippet)}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-start;">
          <div class="ui-combobox-listbox" role="listbox" aria-label="Option states" style="width: 280px;">
            <div class="ui-combobox-group" role="group" aria-labelledby="ws-cb-grp-a">
              <span class="ui-combobox-group-label" id="ws-cb-grp-a">Americas</span>
              <div class="ui-combobox-option" role="option" aria-selected="true"><span class="ui-combobox-option-label">us-<mark>east</mark>-1</span><span class="ui-combobox-option-meta">42</span></div>
              <div class="ui-combobox-option" role="option" aria-selected="false" data-active><span class="ui-combobox-option-label">us-w<mark>est</mark>-2</span><span class="ui-combobox-option-meta">18</span></div>
              <div class="ui-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ui-combobox-option-label">sa-east-1</span><span class="ui-combobox-option-meta">0</span></div>
            </div>
            <div class="ui-combobox-group" role="group" aria-labelledby="ws-cb-grp-b">
              <span class="ui-combobox-group-label" id="ws-cb-grp-b">Europe</span>
              <div class="ui-combobox-option" role="option" aria-selected="false"><span class="ui-combobox-option-label">eu-w<mark>est</mark>-1</span><span class="ui-combobox-option-meta">27</span></div>
            </div>
          </div>
          <div class="ui-combobox-listbox" data-size="sm" role="listbox" aria-label="No matches" style="width: 280px;">
            <span class="ui-combobox-empty">No regions match “zz”.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Datepicker Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Datepicker (.ui-datepicker)</h2>
      <p class="ws-section-desc">No browser ships a stylable native date picker — the calendar behind <code>input[type="date"]</code> is a UA popup closed to CSS in every engine — so the kit styles the calendar anatomy <em>the app renders</em> and the app owns all the behavior: month math, keyboard navigation, selection, range logic. Open UI has only a research page for the datepicker, so the parts follow its vocabulary (header, title, previous/next, grid, day, footer) over a native <code>&lt;table role="grid"&gt;</code>. Every day state rides ARIA state on the <code>button.ui-datepicker-day</code>: <code>aria-selected="true"</code> fills, <code>aria-current="date"</code> rings today without filling it, <code>:disabled</code> is out of range, <code>[data-outside]</code> is an adjacent month, and <code>[data-range="start|middle|end"]</code> spans a range. The kit styles calendar anatomy only and the host markup supplies the surface by composition: <code>class="ui-panel ui-datepicker"</code> inline, <code>class="ui-popover ui-datepicker" popover</code> floating (which also brings the anchor positioning under the invoker). Ships no runtime — the workshop moves <code>aria-selected</code> for these demos.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Single Month — today, selected, disabled, outside days</span>
          ${copyControls(datepickerSnippet)}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-start;">
          <div class="ui-panel ui-datepicker" id="ws-datepicker">
            ${datepickerHeader('September 2026', true)}
            ${datepickerGrid({
              label: 'September 2026',
              lead: [30, 31],
              days: 30,
              trail: [1, 2, 3],
              today: 5,
              selected: 17,
              disabled: [1, 2, 3, 4],
            })}
            <div class="ui-datepicker-footer">
              <button class="ui-btn" data-variant="ghost" data-size="sm" type="button">Clear</button>
              <button class="ui-btn" data-variant="outline" data-size="sm" type="button">Today</button>
            </div>
          </div>
          <div class="ui-panel ui-datepicker" data-size="sm">
            ${datepickerHeader('September 2026', false)}
            ${datepickerGrid({
              label: 'September 2026, compact',
              lead: [30, 31],
              days: 30,
              trail: [1, 2, 3],
              today: 5,
              selected: 5,
            })}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Range &amp; Quick-range Presets</span>
          ${copyControls(datepickerRangeSnippet)}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-start;">
          <div class="ui-panel ui-datepicker">
            <ul class="ui-datepicker-presets">
              <li><button class="ui-datepicker-preset" type="button" aria-pressed="false">Last 7 days</button></li>
              <li><button class="ui-datepicker-preset" type="button" aria-pressed="true">This month</button></li>
              <li><button class="ui-datepicker-preset" type="button" aria-pressed="false">This quarter</button></li>
            </ul>
            ${datepickerHeader('September 2026', true)}
            ${datepickerGrid({
              label: 'September 2026 range',
              lead: [30, 31],
              days: 30,
              trail: [1, 2, 3],
              today: 5,
              range: [8, 16],
            })}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native Trigger Field &amp; Popover Panel</span>
          ${copyControls('<input class="ui-input" type="date" value="2026-09-17">')}
        </div>
        <div class="ws-preview-canvas" style="min-height: 400px; align-items: flex-start; gap: var(--space-4);">
          <label class="ui-field" style="max-width: 200px;">
            <span class="ui-label">Ship date</span>
            <input class="ui-input" type="date" value="2026-09-17">
          </label>
          <label class="ui-field" style="max-width: 200px;">
            <span class="ui-label">Locked</span>
            <input class="ui-input" type="date" value="2026-09-17" disabled>
          </label>
          <div>
            <button class="ui-btn" data-variant="outline" popovertarget="ws-datepicker-popover" type="button">Pick a date</button>
            <div id="ws-datepicker-popover" popover class="ui-popover ui-datepicker">
              ${datepickerHeader('September 2026', true)}
              ${datepickerGrid({
                label: 'September 2026 popover',
                lead: [30, 31],
                days: 30,
                trail: [1, 2, 3],
                today: 5,
                selected: 17,
              })}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Table Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Table (.ui-table)</h2>
      <p class="ws-section-desc">The native <code>&lt;table&gt;</code> styled to Open UI's table parts (title, header, column, row, cell, footer). Sorting is keyed off <code>aria-sort</code> on the header cell, selection off <code>aria-selected</code> on the row; density and stripes/borders come from <code>data-density</code> and <code>data-variant</code>. Wide tables scroll inside <code>.ui-table-wrap</code>. Ships no runtime — the workshop cycles the sort state for the demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sortable Header, Selected Row &amp; Numeric Column</span>
          ${copyControls(tableSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap">
            <table class="ui-table">
              <caption>Active sessions</caption>
              <thead>
                <tr>
                  <th aria-sort="ascending"><button class="ui-table-sort">Player</button></th>
                  <th aria-sort="none"><button class="ui-table-sort">World</button></th>
                  <th aria-sort="none"><button class="ui-table-sort">Status</button></th>
                  <th data-type="number" aria-sort="none"><button class="ui-table-sort">Playtime (h)</button></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>ashenmoor</td><td>overworld</td><td><span class="ui-badge" data-intent="success">online</span></td><td data-type="number">128.4</td></tr>
                <tr aria-selected="true"><td>quillfeather</td><td>the_nether</td><td><span class="ui-badge" data-intent="success">online</span></td><td data-type="number">96.0</td></tr>
                <tr><td>redgrave</td><td>overworld</td><td><span class="ui-badge" data-intent="warning">idle</span></td><td data-type="number">41.75</td></tr>
                <tr><td>tinwright</td><td>the_end</td><td><span class="ui-badge">offline</span></td><td data-type="number">7.2</td></tr>
              </tbody>
              <tfoot>
                <tr><td colspan="3">4 players</td><td data-type="number">273.35</td></tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Striped, Bordered &amp; Compact Density</span>
          ${copyControls('<table class="ui-table" data-variant="striped bordered" data-density="compact">…</table>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap">
            <table class="ui-table" data-variant="striped bordered" data-density="compact">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th data-type="number">Line</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>level-name</td><td>world</td><td data-type="number">12</td></tr>
                <tr><td>max-players</td><td>20</td><td data-type="number">18</td></tr>
                <tr aria-selected="true"><td>difficulty</td><td>hard</td><td data-type="number">24</td></tr>
                <tr><td>view-distance</td><td>10</td><td data-type="number">31</td></tr>
                <tr><td>online-mode</td><td>true</td><td data-type="number">47</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sticky Header &amp; Horizontal Scroll</span>
          ${copyControls(tableStickySnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap" style="max-height: 240px;">
            <table class="ui-table" data-sticky-header data-density="compact" style="min-width: 1240px;">
              <thead>
                <tr>
                  <th aria-sort="descending"><button class="ui-table-sort">Timestamp</button></th>
                  <th>Node</th>
                  <th>Region</th>
                  <th>Profile</th>
                  <th>Event</th>
                  <th>Actor</th>
                  <th>Detail</th>
                  <th>Result</th>
                  <th data-type="number">Duration (ms)</th>
                </tr>
              </thead>
              <tbody>
                ${stickyRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Empty State</span>
          ${copyControls('<tbody>\n  <tr><td class="ui-table-empty" colspan="3">Nobody online.</td></tr>\n</tbody>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap">
            <table class="ui-table">
              <thead>
                <tr><th>Player</th><th>World</th><th data-type="number">Playtime (h)</th></tr>
              </thead>
              <tbody>
                <tr><td class="ui-table-empty" colspan="3">Nobody online.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Native Dialog Modal & Accordion -->
    <section class="ws-section">
      <h2 class="ws-section-title">Native HTML Primitives (Modal & Accordion)</h2>
      <p class="ws-section-desc">Built directly on native browser &lt;dialog&gt; and &lt;details&gt;.</p>

      <div class="ws-preview-canvas">
        <button id="ws-open-dialog-btn" class="ui-btn" data-intent="primary">
          Open Native &lt;dialog&gt; Modal
        </button>
      </div>

      <!-- Native Dialog Element -->
      <dialog id="ws-demo-dialog" class="ui-dialog">
        <div class="ui-dialog-header">
          <h3 class="ui-dialog-title">Confirm Deployment</h3>
          <button id="ws-close-dialog-x" class="ui-btn" data-size="sm" data-variant="ghost">✕</button>
        </div>
        <div class="ui-dialog-body">
          <p style="margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: var(--leading-relaxed);">
            You are about to push this release to the production cluster. This action will update all live service nodes.
          </p>
        </div>
        <div class="ui-dialog-footer">
          <button id="ws-close-dialog-btn" class="ui-btn" data-variant="ghost">Cancel</button>
          <button id="ws-confirm-dialog-btn" class="ui-btn" data-intent="primary">Deploy Now</button>
        </div>
      </dialog>

      <div class="ws-preview-block" style="margin-top: var(--space-4);">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Independent Disclosures</span>
          ${copyControls(accordionSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <details class="ui-accordion">
            <summary class="ui-accordion-summary">How does theme inheritance work?</summary>
            <div class="ui-accordion-content">
              Components reference Tier 2 semantic variables. When an application imports a theme preset (Tier 3), all variables cascade automatically into every component.
            </div>
          </details>
          <details class="ui-accordion">
            <summary class="ui-accordion-summary">Are JavaScript runtimes required?</summary>
            <div class="ui-accordion-content">
              No. The styling library is 100% pure CSS and native HTML standards, making it completely framework-agnostic.
            </div>
          </details>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Exclusive Accordion (&lt;details name&gt;)</span>
          ${copyControls(accordionGroupSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-accordion-group">
            <details class="ui-accordion" name="ws-accordion-demo" open>
              <summary class="ui-accordion-summary">Tokens</summary>
              <div class="ui-accordion-content">
                Primitives feed semantic contracts, which themes override. Open one of the other panels and this one closes itself — the shared <code>name</code> does it, no script.
              </div>
            </details>
            <details class="ui-accordion" name="ws-accordion-demo">
              <summary class="ui-accordion-summary">Components</summary>
              <div class="ui-accordion-content">
                Every component reads Tier 2 tokens only, and keys its states off native or ARIA state so the visual never drifts from the accessibility state.
              </div>
            </details>
            <details class="ui-accordion" name="ws-accordion-demo">
              <summary class="ui-accordion-summary">Browser support</summary>
              <div class="ui-accordion-content">
                <code>&lt;details name&gt;</code> ships in Chrome/Edge 120, Safari 17.2 and Firefox 130. Older engines ignore the attribute and the panels open independently; the kit ships no shim for that.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach code copy listeners (HTML verbatim, or transformed to JSX)
  container.querySelectorAll<HTMLButtonElement>('.ws-copy-code-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const snippet = btn.dataset.snippet;
      if (!snippet) return;
      const jsx = btn.dataset.format === 'jsx';
      navigator.clipboard.writeText(jsx ? htmlToJsx(snippet) : snippet);
      showToast(jsx ? 'Copied JSX to clipboard!' : 'Copied HTML markup to clipboard!');
    });
  });

  // Wire up the tab and toast demos (the kit ships no runtime; this drives the previews).
  wirePressButtons(container);
  wireTabs(container);
  wireBreadcrumbs(container);
  wireToasts(container);
  wireAlerts(container);
  wireImageStates(container);
  wireTableSort(container);
  wireSliders(container);
  wireNumberInputs(container);
  wireRichText(container);
  wireTags(container);
  wireFileInputs(container);
  wireListbox(container);
  wireCarousels(container);
  wireCombobox(container);
  wireDatepicker(container);

  // Attach dialog triggers
  const dialog = document.getElementById('ws-demo-dialog') as HTMLDialogElement | null;
  const openBtn = document.getElementById('ws-open-dialog-btn');
  const closeX = document.getElementById('ws-close-dialog-x');
  const closeBtn = document.getElementById('ws-close-dialog-btn');
  const confirmBtn = document.getElementById('ws-confirm-dialog-btn');

  if (dialog && openBtn) {
    openBtn.addEventListener('click', () => dialog.showModal());
    closeX?.addEventListener('click', () => dialog.close());
    closeBtn?.addEventListener('click', () => dialog.close());
    confirmBtn?.addEventListener('click', () => {
      dialog.close();
      showToast('Deployment confirmed!');
    });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }
}

const toolbarSnippet = `<div class="ui-toolbar">
  <div class="ui-btn-group">
    <button class="ui-btn" data-size="sm" data-variant="ghost">Bold</button>
    <button class="ui-btn" data-size="sm" data-variant="ghost">Italic</button>
    <button class="ui-btn" data-size="sm" data-variant="ghost">Underline</button>
  </div>
  <span class="ui-toolbar-separator"></span>
  <button class="ui-btn" data-size="sm" data-variant="ghost">Link</button>
  <button class="ui-btn" data-size="sm" data-variant="ghost">Image</button>
  <span class="ui-toolbar-spacer"></span>
  <button class="ui-btn" data-size="sm" data-variant="outline">Preview</button>
  <button class="ui-btn" data-size="sm" data-intent="primary">Publish</button>
</div>`;

const tabsSnippet = `<div class="ui-tabs">
  <div class="ui-tablist" role="tablist" aria-label="Repository">
    <button class="ui-tab" role="tab" id="tab-ov" aria-controls="panel-ov" aria-selected="true">Overview</button>
    <button class="ui-tab" role="tab" id="tab-act" aria-controls="panel-act" aria-selected="false">Activity</button>
    <button class="ui-tab" role="tab" id="tab-set" aria-controls="panel-set" aria-selected="false">Settings <span class="ui-tab-trail">3</span></button>
    <button class="ui-tab" role="tab" aria-selected="false" disabled>Archived</button>
  </div>
  <div class="ui-tabpanel" role="tabpanel" id="panel-ov" aria-labelledby="tab-ov" tabindex="0">Overview content…</div>
  <div class="ui-tabpanel" role="tabpanel" id="panel-act" aria-labelledby="tab-act" tabindex="0" hidden>Activity content…</div>
  <div class="ui-tabpanel" role="tabpanel" id="panel-set" aria-labelledby="tab-set" tabindex="0" hidden>Settings content…</div>
</div>`;

const svg = (paths: string) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const toastIcons: Record<string, string> = {
  success: svg('<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>'),
  info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  warning: svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  danger: svg('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'),
  '': svg('<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'),
};

const toastCloseIcon = svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');

// Renders one static .ui-toast card for the intent gallery (intent "" = neutral).
function staticToast(intent: string, title: string, message: string): string {
  const icon = toastIcons[intent] ?? toastIcons[''];
  return `<div class="ui-toast"${intent ? ` data-intent="${intent}"` : ''} role="status">
            <span class="ui-toast-icon">${icon}</span>
            <div class="ui-toast-content">
              <p class="ui-toast-title">${title}</p>
              <p class="ui-toast-message">${message}</p>
            </div>
            <button class="ui-toast-close" aria-label="Dismiss">${toastCloseIcon}</button>
          </div>`;
}

const toastSnippet = `<div class="ui-toast" data-intent="success" role="status">
  <span class="ui-toast-icon"><svg>…</svg></span>
  <div class="ui-toast-content">
    <p class="ui-toast-title">Deployment complete</p>
    <p class="ui-toast-message">All 12 service nodes are live on the new release.</p>
  </div>
  <button class="ui-toast-close" aria-label="Dismiss">✕</button>
</div>`;

// Renders one static .ui-alert (intent "" = neutral). Shares the toast icon set.
function staticAlert(
  intent: string,
  title: string,
  message: string,
  opts: { actions?: string; dismiss?: boolean } = {},
): string {
  const icon = toastIcons[intent] ?? toastIcons[''];
  return `<div class="ui-alert"${intent ? ` data-intent="${intent}"` : ''}>
            <span class="ui-alert-icon">${icon}</span>
            <div class="ui-alert-content">
              <p class="ui-alert-title">${title}</p>
              <p class="ui-alert-message">${message}</p>
              ${opts.actions ? `<div class="ui-alert-actions">${opts.actions}</div>` : ''}
            </div>
            ${opts.dismiss ? `<button class="ui-alert-close" aria-label="Dismiss">${toastCloseIcon}</button>` : ''}
          </div>`;
}

// Stand-in portrait for the avatar demos: an inline SVG data URI (gradient
// ground + head-and-shoulders silhouette), so the workshop needs no network.
function portraitSrc(hueA: number, hueB: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">`
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">`
    + `<stop offset="0" stop-color="hsl(${hueA} 62% 60%)"/>`
    + `<stop offset="1" stop-color="hsl(${hueB} 55% 34%)"/>`
    + `</linearGradient></defs>`
    + `<rect width="80" height="80" fill="url(#g)"/>`
    + `<circle cx="40" cy="31" r="14" fill="rgba(255,255,255,0.88)"/>`
    + `<path d="M11 80c0-16.5 13-27 29-27s29 10.5 29 27z" fill="rgba(255,255,255,0.88)"/>`
    + `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// One .ui-avatar showing a portrait, for the size / group / status demos.
function photoAvatar(name: string, hueA: number, hueB: number, attrs = ''): string {
  return `<span class="ui-avatar"${attrs}>`
    + `<img class="ui-avatar-image" src="${portraitSrc(hueA, hueB)}" alt="${name}" />`
    + `</span>`;
}

const avatarUserIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"></path></svg>`;

const avatarSnippet = `<!-- photo -->
<span class="ui-avatar" data-size="md">
  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="Ada Lovelace" />
</span>

<!-- initials fallback -->
<span class="ui-avatar" data-size="md" role="img" aria-label="Ada Lovelace">
  <span class="ui-avatar-fallback">AL</span>
</span>

<!-- icon fallback -->
<span class="ui-avatar" data-size="md" role="img" aria-label="Unassigned">
  <span class="ui-avatar-icon"><svg>…</svg></span>
</span>`;

const avatarStatusSnippet = `<span class="ui-avatar" data-size="lg">
  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="Ada Lovelace" />
  <span class="ui-avatar-status" data-intent="success" role="img" aria-label="Online"></span>
</span>

<!-- square: --radius-control instead of --radius-full -->
<span class="ui-avatar" data-size="lg" data-shape="square">…</span>`;

const avatarGroupSnippet = `<div class="ui-avatar-group">
  <span class="ui-avatar" data-size="sm">…</span>
  <span class="ui-avatar" data-size="sm">…</span>
  <span class="ui-avatar" data-size="sm">…</span>
  <span class="ui-avatar ui-avatar-more" data-size="sm">+3</span>
</div>

<!-- on the canvas rather than a panel, retint the separation ring -->
<div class="ui-avatar-group" style="--ui-avatar-ring-color: var(--color-bg-canvas)">…</div>`;

const avatarInteractiveSnippet = `<button type="button" class="ui-avatar" data-size="md" aria-label="Account menu">
  <img class="ui-avatar-image" src="/avatars/ada.jpg" alt="" />
</button>

<a class="ui-avatar" data-size="md" data-intent="primary" href="/people/ada" aria-label="Ada Lovelace">
  <span class="ui-avatar-fallback">AL</span>
</a>`;

const alertSnippet = `<div class="ui-alert" data-intent="info">
  <span class="ui-alert-icon"><svg>…</svg></span>
  <div class="ui-alert-content">
    <p class="ui-alert-title">Scheduled maintenance</p>
    <p class="ui-alert-message">The workspace will be read-only on Sunday 02:00–03:00 UTC.</p>
  </div>
</div>`;

const alertActionsSnippet = `<div class="ui-alert" data-intent="warning">
  <span class="ui-alert-icon"><svg>…</svg></span>
  <div class="ui-alert-content">
    <p class="ui-alert-title">Storage almost full</p>
    <p class="ui-alert-message">You have used 92% of your workspace quota.</p>
    <div class="ui-alert-actions">
      <button class="ui-btn" data-size="sm" data-intent="primary">Upgrade plan</button>
      <button class="ui-btn" data-size="sm" data-variant="ghost">Manage storage</button>
    </div>
  </div>
  <button class="ui-alert-close" aria-label="Dismiss">✕</button>
</div>`;

// Renders a meter with a label row + percentage above it (app-level composition).
function labeledMeter(label: string, valueText: string, attrs: string): string {
  return `<div style="display: flex; flex-direction: column; gap: var(--space-2);">
            <div style="display: flex; justify-content: space-between; font-size: var(--text-sm);">
              <span style="color: var(--color-text-main); font-weight: var(--font-medium);">${label}</span>
              <span style="color: var(--color-text-muted);">${valueText}</span>
            </div>
            <meter class="ui-meter" ${attrs} aria-label="${label} ${valueText}"></meter>
          </div>`;
}

const meterSnippet = `<meter class="ui-meter"
  min="0" max="100" low="60" high="85" optimum="20"
  value="72" aria-label="Disk usage 72%"></meter>`;

// Labels one skeleton with the animation it is demonstrating (workshop-only chrome).
function skeletonAnimationRow(animation: string): string {
  return `<div style="display: flex; align-items: center; gap: var(--space-4);">
            <span style="min-width: 5rem; font-size: var(--text-sm); color: var(--color-text-muted);">${animation}</span>
            <span class="ui-skeleton" data-animation="${animation}" style="flex: 1;" aria-hidden="true"></span>
          </div>`;
}

const skeletonSnippet = `<span class="ui-skeleton" data-shape="text" aria-hidden="true"></span>
<span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
<span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>`;

const skeletonTextSnippet = `<div class="ui-skeleton-text" aria-hidden="true">
  <span class="ui-skeleton"></span>
  <span class="ui-skeleton"></span>
  <span class="ui-skeleton"></span>
</div>`;

const skeletonCardSnippet = `<div class="ui-panel" aria-busy="true">
  <div class="ui-panel-body">
    <span class="ui-skeleton" data-shape="circle" data-size="lg" aria-hidden="true"></span>
    <div class="ui-skeleton-text" aria-hidden="true">
      <span class="ui-skeleton" data-size="md"></span>
      <span class="ui-skeleton" data-size="sm"></span>
    </div>
    <span class="ui-skeleton" data-shape="rect" aria-hidden="true"></span>
  </div>
</div>`;

const progressSnippet = `<progress class="ui-progress" value="25" max="100"></progress>
<progress class="ui-progress" data-intent="success" value="100" max="100"></progress>
<progress class="ui-progress" data-intent="warning" value="60" max="100"></progress>`;

const progressLabeledSnippet = `<div class="progress-field">
  <div class="progress-field-head">
    <span>Packing textures…</span>
    <span>72%</span>
  </div>
  <progress class="ui-progress" value="72" max="100"></progress>
</div>`;

const listIcons: Record<string, string> = {
  server: svg('<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>'),
  layers: svg('<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>'),
  heart: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
  tag: svg('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42Z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'),
};

// One divided-list row: leading icon, title (+ optional description), trailing slot.
function listRow(icon: string, title: string, description: string, trailing: string): string {
  return `
    <li class="ui-list-item">
      <span class="ui-list-item-leading">${icon}</span>
      <span class="ui-list-item-content">
        <span class="ui-list-item-title">${title}</span>
        ${description ? `<span class="ui-list-item-description">${description}</span>` : ''}
      </span>
      <span class="ui-list-item-trailing">${trailing}</span>
    </li>`;
}

const listPlainSnippet = `<ul class="ui-list">
  <li class="ui-list-item">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Region: us-east-1</span></span>
  </li>
  <li>
    <div class="ui-list-item">
      <span class="ui-list-item-content"><span class="ui-list-item-title">Region: ap-south-1</span></span>
    </div>
    <ul class="ui-list">
      <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Zone a</span></span></li>
    </ul>
  </li>
</ul>`;

const listDividedSnippet = `<ul class="ui-list" data-variant="divided">
  <li class="ui-list-item">
    <span class="ui-list-item-leading"><svg width="18" height="18">…</svg></span>
    <span class="ui-list-item-content">
      <span class="ui-list-item-title">edge-01</span>
      <span class="ui-list-item-description">Uptime 41 days &#183; 18% CPU</span>
    </span>
    <span class="ui-list-item-trailing"><span class="ui-badge" data-intent="success">Healthy</span></span>
  </li>
</ul>`;

const listInsetSnippet = `<ul class="ui-list" data-variant="inset">
  <li>
    <a class="ui-list-item" href="#" aria-current="true">
      <span class="ui-list-item-leading"><svg width="18" height="18">…</svg></span>
      <span class="ui-list-item-content"><span class="ui-list-item-title">All Images</span></span>
      <span class="ui-list-item-trailing">4,182</span>
    </a>
  </li>
  <li><button class="ui-list-item" type="button" disabled>…</button></li>
</ul>`;

const listboxSnippet = `<ul class="ui-list" role="listbox" aria-label="Deploy target">
  <li class="ui-list-item" role="option" aria-selected="true" tabindex="0">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Production</span></span>
  </li>
  <li class="ui-list-item" role="option" aria-selected="false" tabindex="-1">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Staging</span></span>
  </li>
  <li class="ui-list-item" role="option" aria-selected="false" aria-disabled="true">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Sandbox (retired)</span></span>
  </li>
</ul>`;

type CarouselCard = { title: string; meta: string; token: string };

const carouselCards: CarouselCard[] = [
  { title: 'Bronze Age', meta: '24 entries', token: 'var(--color-primary)' },
  { title: 'Cartography', meta: '11 entries', token: 'var(--color-accent)' },
  { title: 'Field Notes', meta: '38 entries', token: 'var(--color-success)' },
  { title: 'Marginalia', meta: '7 entries', token: 'var(--color-warning)' },
  { title: 'Reference', meta: '52 entries', token: 'var(--color-info)' },
];

const carouselSlides = [
  { label: 'Slide 1', tone: 'a' },
  { label: 'Slide 2', tone: 'b' },
  { label: 'Slide 3', tone: 'a' },
  { label: 'Slide 4', tone: 'b' },
];

const carouselChevron = (direction: 'left' | 'right') =>
  svg(direction === 'left' ? '<path d="m15 18-6-6 6-6"/>' : '<path d="m9 18 6-6-6-6"/>');

const carouselPeekSnippet = `<div class="ui-carousel" data-variant="peek">
  <div class="ui-carousel-track" role="group" aria-label="Featured collections">
    <div class="ui-carousel-item"><div class="ui-panel">&#8230;</div></div>
    <div class="ui-carousel-item"><div class="ui-panel">&#8230;</div></div>
  </div>
</div>`;

const carouselFullSnippet = `<div class="ui-carousel" data-variant="full" data-controls="app">
  <div class="ui-carousel-track" role="group" aria-label="Release screenshots">
    <div class="ui-carousel-item" id="slide-0"><img src="/1.jpg" alt="&#8230;"></div>
    <div class="ui-carousel-item" id="slide-1"><img src="/2.jpg" alt="&#8230;"></div>
  </div>

  <!-- data-controls="app" suppresses the generated controls where they exist,
       so these are the only ones in every engine -->
  <button class="ui-btn ui-carousel-prev" data-variant="ghost" data-size="icon"
          type="button" aria-label="Previous slide">&#8230;</button>
  <button class="ui-btn ui-carousel-next" data-variant="ghost" data-size="icon"
          type="button" aria-label="Next slide">&#8230;</button>
  <div class="ui-carousel-markers" role="group" aria-label="Choose slide">
    <button class="ui-carousel-marker" type="button" aria-current="true" aria-label="Go to slide 1"></button>
    <button class="ui-carousel-marker" type="button" aria-current="false" aria-label="Go to slide 2"></button>
  </div>
</div>

<!-- app wiring: click a control -> el.scrollIntoView({ inline: 'center', block: 'nearest' }),
     and an IntersectionObserver on the track moves aria-current as you scroll -->`;

const carouselNativeSnippet = `<!-- Chromium 135+: the arrows and dots come from the track itself -->
<div class="ui-carousel" data-variant="peek">
  <div class="ui-carousel-track" role="group" aria-label="Gallery">
    <div class="ui-carousel-item"><img src="/1.jpg" alt="&#8230;"></div>
    <div class="ui-carousel-item"><img src="/2.jpg" alt="&#8230;"></div>
  </div>
</div>`;

const carouselSizesSnippet = `<div class="ui-carousel" data-size="sm">&#8230;</div>
<div class="ui-carousel">&#8230;</div>
<div class="ui-carousel" data-size="lg">&#8230;</div>

<div class="ui-carousel" data-orientation="vertical" style="--ui-carousel-viewport: 220px">
  <div class="ui-carousel-track">&#8230;</div>
</div>`;

const copyIcon = svg('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');

const tooltipSnippet = `<span class="ui-tooltip" data-placement="top">
  <button class="ui-btn" data-variant="outline" aria-describedby="tt-1">Hover or focus me</button>
  <span class="ui-tooltip-content" role="tooltip" id="tt-1">Supplementary help text</span>
</span>`;

const hintTooltipSnippet = `<button class="ui-btn ui-tooltip-trigger" data-variant="outline" interestfor="tt-2">Hover or focus me</button>
<div class="ui-tooltip" popover="hint" id="tt-2" data-placement="top">Supplementary help text</div>`;

const popoverSnippet = `<button class="ui-btn" data-variant="outline" popovertarget="account-menu">Account &#9662;</button>
<div id="account-menu" popover class="ui-popover">
  <ul class="ui-menu">
    <li><a class="ui-menu-item">View Profile</a></li>
    <li><a class="ui-menu-item">Workspace Settings</a></li>
    <li class="ui-menu-divider"></li>
    <li><a class="ui-menu-item">Sign Out</a></li>
  </ul>
</div>`;

const tagIcon =
  '<span class="ui-tag-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41 12 22l-9-9V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/></svg></span>';

const tagSnippet = `<div class="ui-tag-group">
  <span class="ui-tag" data-intent="primary"><span class="ui-tag-label">Primary</span></span>
  <span class="ui-tag" data-intent="success"><span class="ui-tag-label">Success</span></span>
</div>`;

const tagRemoveSnippet = `<span class="ui-tag" data-intent="info">
  <span class="ui-tag-label">render:draft</span>
  <button class="ui-tag-remove" type="button" aria-label="Remove render:draft"></button>
</span>`;

const tagFilterSnippet = `<div class="ui-tag-group" role="group" aria-label="Filter by tag">
  <button class="ui-tag" type="button" data-intent="primary" aria-pressed="true">
    <span class="ui-tag-label">Landscape</span>
  </button>
  <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false">
    <span class="ui-tag-label">Portrait</span>
  </button>
</div>`;

// Renders paired copy buttons; both carry the same HTML snippet and the JSX
// button transforms it on click, so there is a single source per preview.
function copyControls(snippet: string): string {
  const enc = escapeAttr(snippet);
  return `
    <div class="ws-copy-controls">
      <button class="ws-copy-code-btn" data-format="html" data-snippet="${enc}">Copy HTML</button>
      <button class="ws-copy-code-btn" data-format="jsx" data-snippet="${enc}">Copy JSX</button>
    </div>`;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Minimal HTML->JSX for the attributes our snippets use. class/for are the only
// reserved-word renames; void elements are already self-closed in the source.
function htmlToJsx(html: string): string {
  return html.replace(/\bclass=/g, 'className=').replace(/\bfor=/g, 'htmlFor=');
}

const comboboxSnippet = `<div class="ui-combobox">
  <input class="ui-input" role="combobox" aria-expanded="false"
    aria-controls="region-listbox" aria-autocomplete="list"
    aria-label="Deploy region" autocomplete="off" placeholder="Search regions&#8230;">
  <button class="ui-combobox-clear" type="button" aria-label="Clear region" hidden></button>
  <button class="ui-combobox-trigger" type="button" aria-label="Show regions" tabindex="-1"></button>
  <div class="ui-combobox-listbox" id="region-listbox" popover role="listbox" aria-label="Deploy region">
    <div class="ui-combobox-group" role="group" aria-labelledby="grp-americas">
      <span class="ui-combobox-group-label" id="grp-americas">Americas</span>
      <div class="ui-combobox-option" role="option" id="opt-use1" aria-selected="true">
        <span class="ui-combobox-option-label">us-east-1</span>
        <span class="ui-combobox-option-meta">42</span>
      </div>
    </div>
  </div>
</div>`;

const comboboxListboxSnippet = `<div class="ui-combobox-listbox" role="listbox" aria-label="Regions">
  <div class="ui-combobox-option" role="option" aria-selected="true"><span class="ui-combobox-option-label">us-<mark>east</mark>-1</span></div>
  <div class="ui-combobox-option" role="option" aria-selected="false" data-active><span class="ui-combobox-option-label">us-w<mark>est</mark>-2</span></div>
  <div class="ui-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ui-combobox-option-label">sa-east-1</span></div>
  <span class="ui-combobox-empty">No regions match.</span>
</div>`;

type ComboboxRegion = { group: string; value: string; count: number; disabled?: boolean };

const comboboxRegions: ComboboxRegion[] = [
  { group: 'Americas', value: 'us-east-1', count: 42 },
  { group: 'Americas', value: 'us-west-2', count: 18 },
  { group: 'Americas', value: 'sa-east-1', count: 0, disabled: true },
  { group: 'Europe', value: 'eu-west-1', count: 27 },
  { group: 'Europe', value: 'eu-central-1', count: 12 },
  { group: 'Europe', value: 'eu-north-1', count: 5 },
  { group: 'Asia Pacific', value: 'ap-southeast-2', count: 9 },
  { group: 'Asia Pacific', value: 'ap-northeast-1', count: 21 },
];

// Splits a label around the typed query so the matched run can be wrapped in a
// <mark>. Returns the three pieces rather than HTML, so the caller can set them
// as text and never build markup out of user input.
function comboboxSplitMatch(label: string, query: string): [string, string, string] {
  if (!query) return [label, '', ''];
  const at = label.toLowerCase().indexOf(query.toLowerCase());
  if (at < 0) return [label, '', ''];
  return [label.slice(0, at), label.slice(at, at + query.length), label.slice(at + query.length)];
}

// Drives the combobox demo: filtering, the popover, the data-active cursor the
// app owns (aria-activedescendant keeps DOM focus in the input), and selection.
// The kit ships no runtime — all of this belongs to the consuming app.
function wireCombobox(root: HTMLElement) {
  const combobox = root.querySelector<HTMLElement>('#ws-combobox');
  const input = root.querySelector<HTMLInputElement>('#ws-combobox-input');
  const listbox = root.querySelector<HTMLElement>('#ws-combobox-listbox');
  if (!combobox || !input || !listbox) return;

  const trigger = combobox.querySelector<HTMLButtonElement>('.ui-combobox-trigger');
  const clear = combobox.querySelector<HTMLButtonElement>('.ui-combobox-clear');
  let selected = 'us-east-1';
  let activeIndex = 0;

  const enabledOptions = () =>
    Array.from(listbox.querySelectorAll<HTMLElement>('.ui-combobox-option:not([aria-disabled="true"])'));

  const render = (query: string) => {
    const matches = comboboxRegions.filter((r) => r.value.toLowerCase().includes(query.toLowerCase()));
    listbox.textContent = '';

    if (!matches.length) {
      const empty = document.createElement('span');
      empty.className = 'ui-combobox-empty';
      empty.textContent = `No regions match “${query}”.`;
      listbox.append(empty);
      input.removeAttribute('aria-activedescendant');
      return;
    }

    let currentGroup = '';
    let group: HTMLElement | null = null;
    matches.forEach((region, index) => {
      if (region.group !== currentGroup) {
        currentGroup = region.group;
        group = document.createElement('div');
        group.className = 'ui-combobox-group';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', region.group);
        const label = document.createElement('span');
        label.className = 'ui-combobox-group-label';
        label.textContent = region.group;
        group.append(label);
        listbox.append(group);
      }

      const option = document.createElement('div');
      option.className = 'ui-combobox-option';
      option.id = `ws-combobox-opt-${index}`;
      option.setAttribute('role', 'option');
      option.dataset.value = region.value;
      option.setAttribute('aria-selected', region.value === selected ? 'true' : 'false');
      if (region.disabled) option.setAttribute('aria-disabled', 'true');

      const optionLabel = document.createElement('span');
      optionLabel.className = 'ui-combobox-option-label';
      const [before, hit, after] = comboboxSplitMatch(region.value, query);
      optionLabel.append(before);
      if (hit) {
        const mark = document.createElement('mark');
        mark.textContent = hit;
        optionLabel.append(mark, after);
      }
      option.append(optionLabel);

      const meta = document.createElement('span');
      meta.className = 'ui-combobox-option-meta';
      meta.textContent = String(region.count);
      option.append(meta);

      if (!region.disabled) {
        // Keep DOM focus in the input: a mousedown inside the listbox would
        // otherwise blur it and close the popover before the click lands.
        option.addEventListener('mousedown', (e) => e.preventDefault());
        option.addEventListener('click', () => choose(region.value));
      }
      group?.append(option);
    });

    setActive(0);
  };

  const setActive = (index: number) => {
    const options = enabledOptions();
    if (!options.length) return;
    activeIndex = (index + options.length) % options.length;
    options.forEach((o, i) => o.toggleAttribute('data-active', i === activeIndex));
    const active = options[activeIndex];
    input.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  };

  const open = () => {
    if (listbox.matches(':popover-open')) return;
    listbox.showPopover();
    input.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    if (listbox.matches(':popover-open')) listbox.hidePopover();
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };

  const choose = (value: string) => {
    selected = value;
    input.value = value;
    syncClear();
    render(value);
    close();
    input.focus();
  };

  const syncClear = () => {
    if (clear) clear.hidden = input.value === '';
  };

  input.addEventListener('input', () => {
    syncClear();
    render(input.value);
    open();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!listbox.matches(':popover-open')) {
        render(input.value);
        open();
        return;
      }
      setActive(activeIndex + (e.key === 'ArrowDown' ? 1 : -1));
    } else if (e.key === 'Home' || e.key === 'End') {
      if (!listbox.matches(':popover-open')) return;
      e.preventDefault();
      setActive(e.key === 'Home' ? 0 : enabledOptions().length - 1);
    } else if (e.key === 'Enter') {
      const active = enabledOptions()[activeIndex];
      if (listbox.matches(':popover-open') && active) {
        e.preventDefault();
        choose(active.dataset.value ?? '');
      }
    }
  });

  // The UA closes the popover on Escape and on a click outside; mirror that
  // back onto aria-expanded so the chevron and the a11y state stay in step.
  listbox.addEventListener('toggle', (e) => {
    input.setAttribute('aria-expanded', (e as ToggleEvent).newState === 'open' ? 'true' : 'false');
  });

  trigger?.addEventListener('click', () => {
    if (listbox.matches(':popover-open')) {
      close();
    } else {
      render(input.value);
      open();
    }
    input.focus();
  });

  clear?.addEventListener('click', () => {
    input.value = '';
    syncClear();
    render('');
    input.focus();
  });

  input.value = selected;
  syncClear();
  render('');
}

// Select a tab within its group: sync aria-selected, toggle panel visibility,
// and move roving focus. Mirrors the Open UI tabs interaction (click + arrows).
function wireTabs(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-tabs').forEach((group) => {
    const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>('.ui-tab[role="tab"]'));

    const select = (tab: HTMLButtonElement, focus = false) => {
      if (tab.disabled) return;
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
        const panelId = t.getAttribute('aria-controls');
        const panel = panelId ? group.querySelector<HTMLElement>(`#${panelId}`) : null;
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    };

    const vertical = group.getAttribute('data-orientation') === 'vertical';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';

    tabs.forEach((tab) => {
      tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const enabled = tabs.filter((t) => !t.disabled);
        const pos = enabled.indexOf(tab);
        let target: HTMLButtonElement | undefined;
        if (e.key === nextKey) target = enabled[(pos + 1) % enabled.length];
        else if (e.key === prevKey) target = enabled[(pos - 1 + enabled.length) % enabled.length];
        else if (e.key === 'Home') target = enabled[0];
        else if (e.key === 'End') target = enabled[enabled.length - 1];
        if (target) {
          e.preventDefault();
          select(target, true);
        }
      });
    });
  });
}

// Expands a collapsed breadcrumb: reveal the items the ellipsis stands for and
// retire the button. The kit ships no runtime — the app owns this toggle.
function wireBreadcrumbs(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-breadcrumb-ellipsis').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest<HTMLElement>('.ui-breadcrumb-item');
      const list = button.closest<HTMLElement>('.ui-breadcrumb-list');
      if (!item || !list) return;
      list.querySelectorAll<HTMLElement>('.ui-breadcrumb-item[hidden]').forEach((hiddenItem) => {
        hiddenItem.hidden = false;
      });
      button.setAttribute('aria-expanded', 'true');
      item.hidden = true;
    });
  });
}

const fileUploadIcon = svg('<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>');

// One dropzone frozen in a state the app owns (drag, rejection, or a disabled
// input), for the state gallery.
function staticDropzone(state: string, headline: string, hint: string): string {
  const attrs = state === 'disabled' ? '' : ` data-state="${state}"`;
  const input = state === 'disabled' ? '<input type="file" disabled>' : '<input type="file" tabindex="-1">';
  return `<label class="ui-file" data-variant="dropzone"${attrs}>
            ${input}
            <span class="ui-file-icon">${fileUploadIcon}</span>
            <p class="ui-file-hint">${headline}</p>
            <span class="ui-btn ui-file-trigger" data-variant="outline">Browse files</span>
            <p class="ui-file-hint">${hint}</p>
          </label>`;
}

// A chosen file, as the .ui-tag token the .ui-file-list is built from.
function fileToken(name: string): string {
  return `<li><span class="ui-tag" data-size="sm"><span class="ui-tag-label">${name}</span>` +
    `<button class="ui-tag-remove" type="button" aria-label="Remove ${name}"></button></span></li>`;
}

const fileButtonSnippet = `<label class="ui-file">
  <input type="file">
  <span class="ui-btn ui-file-trigger" data-variant="outline">Choose file</span>
  <span class="ui-file-name">No file chosen</span>
</label>`;

const fileNativeSnippet = `<input type="file" class="ui-file-native" aria-label="Attachment">
<input type="file" class="ui-file-native" data-size="sm" aria-label="Attachment">
<input type="file" class="ui-file-native" aria-invalid="true" aria-label="Attachment">`;

const fileDropzoneSnippet = `<label class="ui-file" data-variant="dropzone">
  <input type="file" multiple>
  <span class="ui-file-icon">…</span>
  <p class="ui-file-hint">Drag images here, or</p>
  <span class="ui-btn ui-file-trigger" data-variant="outline">Browse files</span>
  <p class="ui-file-hint">PNG, JPG or WebP — up to 10 MB each</p>
</label>`;

const fileListSnippet = `<ul class="ui-file-list">
  <li>
    <span class="ui-tag" data-size="sm">
      <span class="ui-tag-label">dune-ridge.png</span>
      <button class="ui-tag-remove" type="button" aria-label="Remove dune-ridge.png"></button>
    </span>
  </li>
</ul>`;

// Drives the file previews: the filename readout after a pick, and the dragover
// state on the live dropzone (CSS cannot see a drag). The kit ships no runtime;
// this is the wiring a consuming app would write.
function wireFileInputs(root: HTMLElement) {
  root.querySelectorAll<HTMLLabelElement>('label.ui-file').forEach((label) => {
    const input = label.querySelector<HTMLInputElement>('input[type="file"]');
    if (!input || input.disabled) return;

    const name = label.querySelector<HTMLElement>('.ui-file-name');
    if (name) {
      const empty = name.textContent;
      input.addEventListener('change', () => {
        const files = Array.from(input.files ?? []);
        name.textContent = files.length === 0 ? empty
          : files.length === 1 ? files[0].name
          : `${files.length} files selected`;
      });
    }

    if (label.dataset.variant !== 'dropzone' || label.dataset.state) return;

    // dragover has to be cancelled as well, or the browser rejects the drop.
    let depth = 0;
    const clear = () => { depth = 0; label.removeAttribute('data-state'); };
    label.addEventListener('dragenter', (e) => {
      e.preventDefault();
      depth += 1;
      label.setAttribute('data-state', 'dragover');
    });
    label.addEventListener('dragover', (e) => e.preventDefault());
    // dragleave fires for every child the pointer crosses, so the count decides
    // when the drag has really left the zone.
    label.addEventListener('dragleave', () => { depth -= 1; if (depth <= 0) clear(); });
    label.addEventListener('drop', (e) => {
      e.preventDefault();
      clear();
      const dropped = Array.from(e.dataTransfer?.files ?? []);
      if (name && dropped.length) {
        name.textContent = dropped.length === 1 ? dropped[0].name : `${dropped.length} files selected`;
      }
      const hint = label.querySelector<HTMLElement>('.ui-file-hint');
      if (hint && dropped.length) hint.textContent = `Dropped ${dropped.length} file${dropped.length === 1 ? '' : 's'}`;
    });
  });
}

// Drives the toast previews: dismissing the static cards, and spawning live
// toasts (auto-dismissing after 4s) into a shared bottom-end region.
/* --- Richer Text Field --------------------------------------------------- */

const richtextIcons: Record<string, string> = {
  bold: svg('<path d="M6 4h6a4 4 0 0 1 0 8H6z"/><path d="M6 12h7a4 4 0 0 1 0 8H6z"/>'),
  italic: svg('<path d="M15 4H9"/><path d="M14 4 10 20"/><path d="M15 20H9"/>'),
  underline: svg('<path d="M7 4v6a5 5 0 0 0 10 0V4"/><path d="M5 20h14"/>'),
  list: svg('<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4.5 6h.01"/><path d="M4.5 12h.01"/><path d="M4.5 18h.01"/>'),
  quote: svg('<path d="M10 7H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3"/><path d="M20 7h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3"/>'),
  link: svg('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>'),
};

// The toolbar rail: .ui-toolbar composed with .ui-richtext-toolbar, holding
// ghost icon press-buttons. Bold/Italic carry data-ws-cmd, so the demo wiring
// can run the matching execCommand; the rest only move aria-pressed.
function richtextToolbar(idPrefix = 'ws-rt', inert = false): string {
  const off = inert ? ' disabled' : '';
  const btn = (name: string, label: string, cmd = '') =>
    `<button class="ui-btn" type="button" data-ws-rt-btn data-variant="ghost" data-size="icon-sm"` +
    `${cmd ? ` data-ws-cmd="${cmd}"` : ''} aria-pressed="false" aria-label="${escapeAttr(label)}"${off}>` +
    `${richtextIcons[name]}</button>`;
  return `
    <div class="ui-toolbar ui-richtext-toolbar" role="toolbar" aria-label="Formatting" id="${idPrefix}-toolbar">
      <div class="ui-btn-group">
        ${btn('bold', 'Bold', 'bold')}
        ${btn('italic', 'Italic', 'italic')}
        ${btn('underline', 'Underline', 'underline')}
      </div>
      <span class="ui-toolbar-separator"></span>
      ${btn('list', 'Bulleted list')}
      ${btn('quote', 'Block quote')}
      ${btn('link', 'Link')}
    </div>`;
}

const richtextSnippet = `<div class="ui-richtext">
  <div class="ui-toolbar ui-richtext-toolbar" role="toolbar" aria-label="Formatting">
    <div class="ui-btn-group">
      <button class="ui-btn" type="button" data-variant="ghost" data-size="icon-sm" aria-pressed="false" aria-label="Bold">…</button>
      <button class="ui-btn" type="button" data-variant="ghost" data-size="icon-sm" aria-pressed="false" aria-label="Italic">…</button>
    </div>
    <span class="ui-toolbar-separator"></span>
    <button class="ui-btn" type="button" data-variant="ghost" data-size="icon-sm" aria-pressed="false" aria-label="Link">…</button>
  </div>
  <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
       aria-label="Entry body" data-placeholder="Write the entry…">
    <h2>The Vault of Ninth Light</h2>
    <p>The <strong>seal</strong> is older than the building.</p>
    <blockquote>Whatever is kept here was kept on purpose.</blockquote>
  </div>
  <div class="ui-richtext-footer">
    <span>Draft — autosaved</span>
    <span class="ui-richtext-count">128 / 400</span>
  </div>
</div>`;

const richtextAutoresizeSnippet = `<!-- Small size; the placeholder comes from data-placeholder on an empty editor -->
<div class="ui-richtext" data-size="sm" style="--ui-richtext-min-height: 5rem;">
  <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
       aria-label="Empty entry" data-placeholder="Nothing written yet — start typing…"></div>
</div>

<!-- Grows with what is typed, via field-sizing: content -->
<div class="ui-richtext" data-autoresize>
  <textarea class="ui-richtext-editor" aria-label="Note"></textarea>
</div>

<!-- Same rule on a bare textarea, no field chrome -->
<textarea class="ui-textarea" data-autoresize aria-label="Note"></textarea>`;

const richtextHighlightSnippet = `<!-- Ranges the app wraps: real <mark> elements, one intent each -->
<p>A <mark class="ui-richtext-highlight">match</mark> and a
   <mark class="ui-richtext-highlight" data-intent="danger">conflict</mark>.</p>

<!-- Ranges nothing wraps: the Custom Highlight API. The app registers them; the
     kit styles ::highlight(ui-spelling) and ::highlight(ui-grammar). -->
<script>
  const misspelled = new Highlight(rangeA, rangeB);
  CSS.highlights.set('ui-spelling', misspelled);
</script>`;

const richtextStatesSnippet = `<!-- Read-only: still selectable and focusable, so the ink keeps full contrast -->
<div class="ui-richtext" aria-readonly="true">
  <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-readonly="true" aria-label="Entry">…</div>
</div>

<!-- Disabled -->
<div class="ui-richtext" aria-disabled="true">
  <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-disabled="true" aria-label="Entry">…</div>
</div>

<!-- Error: the danger ring, and the count turns with it -->
<div class="ui-richtext" aria-invalid="true">
  <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Entry">…</div>
  <div class="ui-richtext-footer">
    <span class="ui-error-text">Too long — trim it to 40 characters.</span>
    <span class="ui-richtext-count" data-state="error">62 / 40</span>
  </div>
</div>`;

// Drives the rich-text previews. Three jobs, all of them the app's in real use:
// the count follows the editor's text and turns warning past 90% and error past
// the limit; the toolbar buttons move their own aria-pressed, which is the only
// state the CSS reads; and Bold/Italic additionally call document.execCommand,
// which is deprecated and demo-only — a real app drives a proper editing model.
// The spelling/grammar ranges are registered through the Custom Highlight API,
// which is exactly how ::highlight(ui-spelling) is meant to be fed.
function wireRichText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-ws-count]').forEach((editor) => {
    const readout = document.getElementById(editor.dataset.wsCount || '');
    const limit = Number(editor.dataset.wsLimit) || 0;
    if (!readout || !limit) return;

    const update = () => {
      const length = (editor.textContent || '').trim().length;
      readout.textContent = `${length} / ${limit}`;
      const state = length > limit ? 'error' : length > limit * 0.9 ? 'warning' : '';
      if (state) readout.setAttribute('data-state', state);
      else readout.removeAttribute('data-state');
    };

    editor.addEventListener('input', update);
    update();
  });

  // aria-pressed is already moved by wirePressButtons — every .ui-btn carrying
  // the attribute goes through it — so this only adds the editing side.
  root.querySelectorAll<HTMLButtonElement>('[data-ws-rt-btn]').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => e.preventDefault()); // keep the selection
    const command = btn.dataset.wsCmd;
    if (command) btn.addEventListener('click', () => document.execCommand(command));
  });

  wireRichTextHighlights(root);
}

// Registers the two named highlights over the demo passage. Engines without the
// Custom Highlight API skip this and the text renders plain, which is the same
// fallback the CSS's @supports guard gives.
function wireRichTextHighlights(root: HTMLElement) {
  const editor = root.querySelector<HTMLElement>('[data-ws-highlight]');
  if (!editor || typeof Highlight === 'undefined' || !CSS.highlights) return;

  const ranges: Record<string, Range[]> = { 'ui-spelling': [], 'ui-grammar': [] };
  const phrases: Array<[string, string]> = [
    ['ui-spelling', 'teh'],
    ['ui-grammar', 'could of been'],
  ];
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent || '';
    for (const [name, phrase] of phrases) {
      for (let i = text.indexOf(phrase); i !== -1; i = text.indexOf(phrase, i + phrase.length)) {
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + phrase.length);
        ranges[name].push(range);
      }
    }
  }

  for (const [name, list] of Object.entries(ranges)) {
    if (list.length) CSS.highlights.set(name, new Highlight(...list));
  }
}

function wireToasts(root: HTMLElement) {
  const dismiss = (toast: HTMLElement) => {
    if (toast.getAttribute('data-state') === 'closing') return;
    toast.setAttribute('data-state', 'closing');
    const remove = () => toast.remove();
    toast.addEventListener('animationend', remove, { once: true });
    setTimeout(remove, 400); // fallback when reduced-motion cancels the animation
  };

  root.querySelectorAll<HTMLButtonElement>('.ui-toast-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      const toast = btn.closest<HTMLElement>('.ui-toast');
      if (toast) dismiss(toast);
    });
  });

  // Scoped to the matrix root so switching tabs (which replaces the root's
  // markup) takes the region and any live toasts with it.
  const region = document.createElement('div');
  region.className = 'ui-toast-region';
  region.setAttribute('data-position', 'bottom-end');
  root.appendChild(region);

  const copy: Record<string, { title: string; message: string }> = {
    success: { title: 'Saved', message: 'Your changes have been published.' },
    danger: { title: 'Something went wrong', message: 'The request failed — please retry.' },
    info: { title: 'Heads up', message: 'A new version of the workspace is available.' },
  };

  root.querySelectorAll<HTMLButtonElement>('[data-toast]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const intent = btn.dataset.toast || '';
      const { title, message } = copy[intent] ?? { title: 'Notification', message: 'Something happened.' };
      const toast = document.createElement('div');
      toast.className = 'ui-toast';
      if (intent) toast.setAttribute('data-intent', intent);
      toast.setAttribute('role', intent === 'danger' ? 'alert' : 'status');
      toast.innerHTML =
        `<span class="ui-toast-icon">${toastIcons[intent] ?? toastIcons['']}</span>` +
        `<div class="ui-toast-content"><p class="ui-toast-title">${title}</p>` +
        `<p class="ui-toast-message">${message}</p></div>` +
        `<button class="ui-toast-close" aria-label="Dismiss">${toastCloseIcon}</button>`;
      region.appendChild(toast);
      toast.querySelector('.ui-toast-close')?.addEventListener('click', () => dismiss(toast));
      setTimeout(() => { if (toast.isConnected) dismiss(toast); }, 4000);
    });
  });
}

// Moves aria-selected within a listbox demo (click + arrows/Home/End), keeping
// a roving tabindex. The kit ships no runtime; the app owns this in real use.
function wireListbox(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-list[role="listbox"]').forEach((listbox) => {
    const options = Array.from(listbox.querySelectorAll<HTMLElement>('[role="option"]'));
    const enabled = options.filter((o) => o.getAttribute('aria-disabled') !== 'true');

    const select = (option: HTMLElement, focus = false) => {
      options.forEach((o) => {
        const selected = o === option;
        o.setAttribute('aria-selected', selected ? 'true' : 'false');
        if (o.getAttribute('aria-disabled') !== 'true') o.tabIndex = selected ? 0 : -1;
      });
      if (focus) option.focus();
    };

    enabled.forEach((option) => {
      option.addEventListener('click', () => select(option));
      option.addEventListener('keydown', (e) => {
        const pos = enabled.indexOf(option);
        let target: HTMLElement | undefined;
        if (e.key === 'ArrowDown') target = enabled[(pos + 1) % enabled.length];
        else if (e.key === 'ArrowUp') target = enabled[(pos - 1 + enabled.length) % enabled.length];
        else if (e.key === 'Home') target = enabled[0];
        else if (e.key === 'End') target = enabled[enabled.length - 1];
        else if (e.key === ' ' || e.key === 'Enter') target = option;
        if (target) {
          e.preventDefault();
          select(target, true);
        }
      });
    });
  });
}

// Drives the class-based carousel controls: a click jumps the scroller to a
// slide, and an IntersectionObserver over the track moves aria-current as the
// scroll position changes (whether the move came from a button, a dot, a drag
// or the keyboard). The kit ships no runtime; on Chromium 135+ the browser's
// own ::scroll-button()/::scroll-marker replace all of this.
function wireCarousels(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-carousel').forEach((carousel) => {
    const track = carousel.querySelector<HTMLElement>('.ui-carousel-track');
    const markers = Array.from(carousel.querySelectorAll<HTMLButtonElement>('.ui-carousel-marker'));
    const prev = carousel.querySelector<HTMLButtonElement>('.ui-carousel-prev');
    const next = carousel.querySelector<HTMLButtonElement>('.ui-carousel-next');
    if (!track) return;

    const items = Array.from(track.querySelectorAll<HTMLElement>('.ui-carousel-item'));
    if (!items.length) return;

    const show = (index: number) => {
      const item = items[Math.max(0, Math.min(index, items.length - 1))];
      item?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };

    let current = 0;
    const setCurrent = (index: number) => {
      current = index;
      markers.forEach((marker, i) => marker.setAttribute('aria-current', i === index ? 'true' : 'false'));
      prev?.toggleAttribute('disabled', index === 0);
      next?.toggleAttribute('disabled', index === items.length - 1);
    };

    markers.forEach((marker, i) => marker.addEventListener('click', () => show(i)));
    prev?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));

    if (markers.length || prev || next) {
      setCurrent(0);
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          const index = items.indexOf(visible.target as HTMLElement);
          if (index >= 0 && index !== current) setCurrent(index);
        },
        { root: track, threshold: [0.5, 0.75, 1] },
      );
      items.forEach((item) => observer.observe(item));
    }
  });
}

// Dismisses inline alerts in the demo — alerts are persistent, so this is a
// hard remove (no exit animation, unlike toasts).
function wireAlerts(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-alert-close').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.ui-alert')?.remove());
  });
}

// A transparent pixel standing in for bytes that have not arrived: the frame's
// shimmer shows straight through it.
const WS_PENDING_PIXEL = (() => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/png');
})();

// Swaps the pending pixel for the real picture and flips aria-busy with it, so
// the shimmer can be seen starting and stopping. The kit ships no runtime; the
// app owns that attribute.
function wireImageStates(root: HTMLElement) {
  const frame = root.querySelector<HTMLElement>('#ws-image-busy');
  const picture = frame?.querySelector('img');
  root.querySelector<HTMLButtonElement>('#ws-image-busy-toggle')?.addEventListener('click', () => {
    if (!frame || !picture) return;
    const busy = frame.getAttribute('aria-busy') === 'true';
    frame.setAttribute('aria-busy', busy ? 'false' : 'true');
    picture.src = busy ? (picture.dataset.src ?? '') : WS_PENDING_PIXEL;
  });
}

// Stand-in photographs, drawn on a canvas and handed over as PNG data URIs, so
// the workshop pulls nothing from the network. A raster rather than an inline
// SVG on purpose: an SVG fits itself to whatever box it is given, which makes
// data-fit="cover" / "contain" / "fill" render identically.
function wsPhoto(from: string, to: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const gradient = ctx.createLinearGradient(0, 0, 300, 400);
  gradient.addColorStop(0, from);
  gradient.addColorStop(1, to);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 400);

  ctx.globalAlpha = 0.45;
  ctx.fillStyle = to;
  ctx.beginPath();
  ctx.arc(210, 110, 64, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.55;
  ctx.fillStyle = from;
  ctx.beginPath();
  ctx.moveTo(0, 320);
  [[110, 210], [200, 300], [300, 190], [300, 400], [0, 400]].forEach(([x, y]) => ctx.lineTo(x, y));
  ctx.closePath();
  ctx.fill();

  return canvas.toDataURL('image/png');
}

const imageFitSnippet = `<figure class="ui-image" data-fit="contain" data-ratio="16:9">
  <img src="study.jpg" alt="Abstract gradient study">
  <figcaption class="ui-image-caption">Letterboxed against --color-bg-muted</figcaption>
</figure>`;

// Any ratio the four data-ratio values miss goes through the knob:
// style="--ui-image-ratio: 21 / 9".
const imageRatioSnippet = `<figure class="ui-image" data-ratio="4:3">
  <img src="study.jpg" alt="Abstract gradient study">
</figure>
<figure class="ui-image" data-shape="circle">
  <img src="portrait.jpg" alt="Site lead">
</figure>`;

const imageCaptionSnippet = `<figure class="ui-image" data-ratio="4:3" data-caption="overlay">
  <img src="study.jpg" alt="Abstract gradient study">
  <figcaption class="ui-image-caption">On the scrim, whatever the picture is doing.</figcaption>
</figure>`;

const imageGridSnippet = `<div class="ui-image-grid" style="--ui-image-grid-min: 160px;">
  <button class="ui-image" type="button" data-variant="thumbnail" data-ratio="1:1">
    <img src="item.jpg" alt="Library item RAW">
    <span class="ui-image-badge" data-position="end"><span class="ui-tag" data-intent="info">RAW</span></span>
  </button>
</div>`;

const imageStateSnippet = `<figure class="ui-image" data-ratio="4:3" aria-busy="true">
  <img src="study.jpg" alt="Abstract gradient study">
</figure>

<figure class="ui-image" data-ratio="4:3" data-state="error">
  <img alt="">
  <span class="ui-image-fallback">
    <svg viewBox="0 0 24 24" aria-hidden="true">…</svg>
    Image unavailable
  </span>
</figure>`;

const imageInteractiveSnippet = `<a class="ui-image" href="/atlas" data-ratio="3:2">
  <img src="study.jpg" alt="Open the plate atlas">
  <span class="ui-image-badge"><span class="ui-badge" data-intent="info">Atlas</span></span>
</a>`;

const accordionSnippet = `<details class="ui-accordion">
  <summary class="ui-accordion-summary">How does theme inheritance work?</summary>
  <div class="ui-accordion-content">Components reference Tier 2 semantic variables.</div>
</details>`;

// Exclusive accordion: the shared name attribute is the whole mechanism — the
// group class only collapses the radii and dividers into one card.
const accordionGroupSnippet = `<div class="ui-accordion-group">
  <details class="ui-accordion" name="docs" open>
    <summary class="ui-accordion-summary">Tokens</summary>
    <div class="ui-accordion-content">Primitives feed semantic contracts, which themes override.</div>
  </details>
  <details class="ui-accordion" name="docs">
    <summary class="ui-accordion-summary">Components</summary>
    <div class="ui-accordion-content">Every component reads Tier 2 tokens only.</div>
  </details>
  <details class="ui-accordion" name="docs">
    <summary class="ui-accordion-summary">Browser support</summary>
    <div class="ui-accordion-content">Chrome/Edge 120, Safari 17.2, Firefox 130.</div>
  </details>
</div>`;

const tableSnippet = `<div class="ui-table-wrap">
  <table class="ui-table">
    <caption>Active sessions</caption>
    <thead>
      <tr>
        <th aria-sort="ascending"><button class="ui-table-sort">Player</button></th>
        <th aria-sort="none"><button class="ui-table-sort">World</button></th>
        <th data-type="number">Playtime (h)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>ashenmoor</td><td>overworld</td><td data-type="number">128.4</td></tr>
      <tr aria-selected="true"><td>quillfeather</td><td>the_nether</td><td data-type="number">96.0</td></tr>
    </tbody>
    <tfoot>
      <tr><td colspan="2">2 players</td><td data-type="number">224.4</td></tr>
    </tfoot>
  </table>
</div>`;

const tableStickySnippet = `<div class="ui-table-wrap" style="max-height: 240px;">
  <table class="ui-table" data-sticky-header data-density="compact" style="min-width: 1240px;">
    <thead>…</thead>
    <tbody>…</tbody>
  </table>
</div>`;

// Wide log rows for the sticky-header / horizontal-scroll preview.
const stickyRows = [
  ['12:04:51', 'node-a1', 'us-east-1', 'survival-main', 'snapshot', 'scheduler', 'world backup written to cold storage', 'ok', '1842'],
  ['12:04:38', 'node-a1', 'us-east-1', 'survival-main', 'chunk-load', 'engine', 'preloaded 128 chunks around spawn', 'ok', '311'],
  ['12:03:12', 'node-b2', 'eu-west-2', 'creative-flat', 'join', 'quillfeather', 'connected from the lobby', 'ok', '46'],
  ['12:02:55', 'node-b2', 'eu-west-2', 'creative-flat', 'gc', 'runtime', 'young generation collection completed', 'ok', '87'],
  ['12:01:07', 'node-c3', 'ap-south-1', 'hardcore-s4', 'restart', 'scheduler', 'scheduled maintenance window applied', 'ok', '9204'],
  ['11:59:44', 'node-c3', 'ap-south-1', 'hardcore-s4', 'config', 'redgrave', 'view-distance lowered to 10', 'ok', '12'],
]
  .map(
    (cells) =>
      '<tr>' +
      cells
        .map((v, i) => (i === cells.length - 1 ? `<td data-type="number">${v}</td>` : `<td>${v}</td>`))
        .join('') +
      '</tr>',
  )
  .join('\n                ');

// Cycles a sortable column through ascending -> descending -> none and resets
// its siblings. The kit ships no runtime; this drives the preview only.
function wireTableSort(root: HTMLElement) {
  const next: Record<string, string> = {
    none: 'ascending',
    ascending: 'descending',
    descending: 'none',
  };

  root.querySelectorAll<HTMLElement>('.ui-table thead').forEach((head) => {
    head.querySelectorAll<HTMLButtonElement>('.ui-table-sort').forEach((btn) => {
      const cell = btn.closest('th');
      if (!cell) return;
      btn.addEventListener('click', () => {
        const current = cell.getAttribute('aria-sort') ?? 'none';
        const value = next[current] ?? 'ascending';
        head.querySelectorAll('th[aria-sort]').forEach((other) => {
          if (other !== cell) other.setAttribute('aria-sort', 'none');
        });
        cell.setAttribute('aria-sort', value);
      });
    });
  });
}

// Drives the slider previews: keeps --ui-slider-value (the WebKit fill
// percentage) and the paired <output> in step with the input. The kit ships no
// runtime; this is demo wiring.
function wireSliders(root: HTMLElement) {
  root.querySelectorAll<HTMLInputElement>('input.ui-slider').forEach((slider) => {
    const output = slider.id
      ? root.querySelector<HTMLOutputElement>(`output.ui-slider-value[for="${slider.id}"]`)
      : null;
    const suffix = slider.dataset.valueSuffix ?? '';

    const sync = () => {
      const min = Number(slider.min || 0);
      const max = Number(slider.max || 100);
      const percent = max === min ? 0 : ((Number(slider.value) - min) / (max - min)) * 100;
      slider.style.setProperty('--ui-slider-value', String(percent));
      if (output) output.value = `${slider.value}${suffix}`;
    };

    slider.addEventListener('input', sync);
    sync();
  });
}

const numberStackedSnippet = `<div class="ui-number">
  <input class="ui-input" type="number" id="port" min="1" max="65535" value="25565" />
  <div class="ui-number-stepper">
    <button class="ui-number-increment" type="button" aria-label="Increase port"></button>
    <button class="ui-number-decrement" type="button" aria-label="Decrease port"></button>
  </div>
</div>

<!-- app wiring: the kit ships no JS -->
inc.addEventListener('click', () => {
  input.stepUp();
  input.dispatchEvent(new Event('input', { bubbles: true }));
});`;

const numberSplitSnippet = `<!-- same markup order; data-layout re-orders the buttons -->
<div class="ui-number" data-layout="split" style="--ui-number-width: 8rem">
  <input class="ui-input" type="number" id="qty" min="0" max="99" value="3" />
  <div class="ui-number-stepper">
    <button class="ui-number-decrement" type="button" aria-label="One fewer"></button>
    <button class="ui-number-increment" type="button" aria-label="One more"></button>
  </div>
</div>`;

const numberAdornmentSnippet = `<div class="ui-number">
  <span class="ui-number-prefix">$</span>
  <input class="ui-input" type="number" min="0" step="0.01" value="49.00" />
  <div class="ui-number-stepper">…</div>
</div>

<div class="ui-number" data-size="sm">
  <input class="ui-input" type="number" min="1" max="12" value="3" />
  <span class="ui-number-suffix">px</span>
  <div class="ui-number-stepper">…</div>
</div>`;

const numberStatesSnippet = `<!-- the shell reads each state off the input it wraps -->
<div class="ui-number"><input class="ui-input" type="number" value="8" disabled />…</div>
<div class="ui-number"><input class="ui-input" type="number" value="8" readonly />…</div>
<div class="ui-number">
  <input class="ui-input" type="number" min="1" max="10" value="42" aria-invalid="true" />…
</div>`;

type NumberFieldOptions = {
  layout?: 'split';
  size?: 'sm';
  prefix?: string;
  suffix?: string;
  width?: string;
  // Disabled/read-only fields still show the stepper, but it must not act.
  inertStepper?: boolean;
};

// Builds one .ui-number preview. Markup order is always prefix → input →
// suffix → stepper; data-layout decides where the buttons land.
function numberField(
  id: string,
  label: string,
  attrs: string,
  options: NumberFieldOptions = {},
): string {
  const { layout, size, prefix, suffix, width, inertStepper } = options;
  const disabled = inertStepper ? ' disabled' : '';
  return `
    <div class="ui-number"${layout ? ` data-layout="${layout}"` : ''}${
    size ? ` data-size="${size}"` : ''
  }${width ? ` style="--ui-number-width: ${width}"` : ''}>
      ${prefix ? `<span class="ui-number-prefix">${prefix}</span>` : ''}
      <input class="ui-input" type="number" id="${id}" aria-label="${escapeAttr(label)}" ${attrs} />
      ${suffix ? `<span class="ui-number-suffix">${suffix}</span>` : ''}
      <div class="ui-number-stepper">
        <button class="ui-number-decrement" type="button"${disabled} aria-label="Decrease ${escapeAttr(
    label,
  )}"></button>
        <button class="ui-number-increment" type="button"${disabled} aria-label="Increase ${escapeAttr(
    label,
  )}"></button>
      </div>
    </div>`;
}

// Drives the number-input previews: the stepper buttons call the input's own
// stepUp/stepDown, which is exactly what a consuming app does. stepUp throws
// when the current value cannot be stepped (out of range, or non-numeric), so
// the call is guarded and the value snapped back into range instead. The kit
// ships no runtime; this is demo wiring.
function wireNumberInputs(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-number').forEach((field) => {
    const input = field.querySelector<HTMLInputElement>('input[type="number"]');
    if (!input) return;

    const step = (direction: 1 | -1) => {
      if (input.disabled || input.readOnly) return;
      try {
        if (direction === 1) input.stepUp();
        else input.stepDown();
      } catch {
        const min = input.min === '' ? -Infinity : Number(input.min);
        const max = input.max === '' ? Infinity : Number(input.max);
        input.value = String(Math.min(Math.max(Number(input.value) || 0, min), max));
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };

    field
      .querySelector<HTMLButtonElement>('.ui-number-increment')
      ?.addEventListener('click', () => step(1));
    field
      .querySelector<HTMLButtonElement>('.ui-number-decrement')
      ?.addEventListener('click', () => step(-1));
  });
}

// Drives the press-button previews by moving aria-pressed, which is the only
// state the CSS reads. A standalone button cycles its own value (a mixed one
// resolves to true first, as a tri-state toggle does); a group marked
// data-ws-press="single" behaves like a segmented control — the clicked button
// becomes the pressed one and its siblings are released. The kit ships no
// runtime; this is demo wiring.
function wirePressButtons(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('button.ui-btn[aria-pressed]').forEach((btn) => {
    const group = btn.closest<HTMLElement>('[data-ws-press="single"]');

    btn.addEventListener('click', () => {
      if (group) {
        group
          .querySelectorAll<HTMLButtonElement>('button.ui-btn[aria-pressed]')
          .forEach((sibling) => sibling.setAttribute('aria-pressed', String(sibling === btn)));
        return;
      }
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
}

// Drives the tag previews: the remove button drops its tag, and a filter tag
// toggles its own aria-pressed. The kit ships no runtime; this is demo wiring.
function wireTags(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-tag-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.closest('.ui-tag')?.remove();
    });
  });

  root.querySelectorAll<HTMLButtonElement>('button.ui-tag[aria-pressed]').forEach((tag) => {
    tag.addEventListener('click', () => {
      tag.setAttribute('aria-pressed', tag.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
}

/* --- Datepicker demo -----------------------------------------------------
   The kit ships no runtime, so the workshop builds one static month of markup
   and moves aria-selected on click. No month math: the demos never change
   month, which is enough to show every day state the CSS reads.
   ------------------------------------------------------------------------ */

const DATEPICKER_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type DatepickerMonth = {
  label: string;
  /** Trailing days of the previous month that fill the first row. */
  lead: number[];
  days: number;
  /** Leading days of the next month that fill the last row. */
  trail: number[];
  today?: number;
  selected?: number;
  disabled?: number[];
  /** Inclusive [start, end] day numbers of a selected range. */
  range?: [number, number];
};

function datepickerHeader(title: string, titleIsButton: boolean): string {
  const heading = titleIsButton
    ? `<button class="ui-datepicker-title" type="button" aria-label="Choose month and year">${title}</button>`
    : `<span class="ui-datepicker-title">${title}</span>`;
  return `
    <div class="ui-datepicker-header">
      <button class="ui-btn ui-datepicker-prev" data-variant="ghost" data-size="sm" type="button" aria-label="Previous month">&lsaquo;</button>
      ${heading}
      <button class="ui-btn ui-datepicker-next" data-variant="ghost" data-size="sm" type="button" aria-label="Next month">&rsaquo;</button>
    </div>`;
}

function datepickerGrid(month: DatepickerMonth): string {
  const cells = [
    ...month.lead.map((day) => datepickerDay(day, month, true)),
    ...Array.from({ length: month.days }, (_, i) => datepickerDay(i + 1, month, false)),
    ...month.trail.map((day) => datepickerDay(day, month, true)),
  ];

  const rows: string[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(`<tr>${cells.slice(i, i + 7).join('')}</tr>`);
  }

  return `
    <table class="ui-datepicker-grid" role="grid" aria-label="${month.label}">
      <thead><tr>${DATEPICKER_WEEKDAYS.map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
      <tbody>${rows.join('')}</tbody>
    </table>`;
}

function datepickerDay(day: number, month: DatepickerMonth, outside: boolean): string {
  const attrs: string[] = [];
  if (outside) attrs.push('data-outside');
  if (!outside && month.disabled?.includes(day)) attrs.push('disabled');
  if (!outside && month.today === day) attrs.push('aria-current="date"');
  if (!outside && month.selected === day) attrs.push('aria-selected="true"');

  if (!outside && month.range) {
    const [start, end] = month.range;
    if (day === start) attrs.push('data-range="start"');
    else if (day === end) attrs.push('data-range="end"');
    else if (day > start && day < end) attrs.push('data-range="middle"');
  }

  return `<td><button class="ui-datepicker-day" type="button" ${attrs.join(' ')}>${day}</button></td>`;
}

function wireDatepicker(root: HTMLElement) {
  const panel = root.querySelector<HTMLElement>('#ws-datepicker');

  panel?.querySelectorAll<HTMLButtonElement>('.ui-datepicker-day').forEach((day) => {
    day.addEventListener('click', () => {
      if (day.disabled || day.hasAttribute('data-outside')) return;
      panel
        .querySelectorAll('.ui-datepicker-day[aria-selected="true"]')
        .forEach((prev) => prev.removeAttribute('aria-selected'));
      day.setAttribute('aria-selected', 'true');
    });
  });

  root.querySelectorAll<HTMLButtonElement>('.ui-datepicker-preset[aria-pressed]').forEach((preset) => {
    preset.addEventListener('click', () => {
      preset.setAttribute('aria-pressed', preset.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
}

const datepickerSnippet = `<div class="ui-panel ui-datepicker">
  <div class="ui-datepicker-header">
    <button class="ui-btn ui-datepicker-prev" data-variant="ghost" data-size="sm" aria-label="Previous month">‹</button>
    <button class="ui-datepicker-title">September 2026</button>
    <button class="ui-btn ui-datepicker-next" data-variant="ghost" data-size="sm" aria-label="Next month">›</button>
  </div>
  <table class="ui-datepicker-grid" role="grid" aria-label="September 2026">
    <thead><tr><th scope="col">Su</th>…<th scope="col">Sa</th></tr></thead>
    <tbody>
      <tr>
        <td><button class="ui-datepicker-day" data-outside>30</button></td>
        <td><button class="ui-datepicker-day" disabled>1</button></td>
        <td><button class="ui-datepicker-day" aria-current="date">5</button></td>
        <td><button class="ui-datepicker-day" aria-selected="true">17</button></td>
      </tr>
    </tbody>
  </table>
  <div class="ui-datepicker-footer">
    <button class="ui-btn" data-variant="ghost" data-size="sm">Clear</button>
    <button class="ui-btn" data-variant="outline" data-size="sm">Today</button>
  </div>
</div>`;

const datepickerRangeSnippet = `<div class="ui-panel ui-datepicker">
  <ul class="ui-datepicker-presets">
    <li><button class="ui-datepicker-preset" aria-pressed="true">This month</button></li>
  </ul>
  <!-- header … -->
  <td><button class="ui-datepicker-day" data-range="start">8</button></td>
  <td><button class="ui-datepicker-day" data-range="middle">9</button></td>
  <td><button class="ui-datepicker-day" data-range="end">16</button></td>
</div>`;
