export function renderComponentMatrix(container: HTMLElement) {
  container.innerHTML = `
    <!-- Buttons Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Buttons (.ui-btn)</h2>
      <p class="ws-section-desc">Open UI buttons with semantic variants, sizes, intents, and states.</p>

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
          <span class="ws-preview-title">Sizes & Button Groups</span>
          ${copyControls('<div class="ui-btn-group"><button class="ui-btn">Left</button><button class="ui-btn">Right</button></div>')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-size="sm" data-intent="primary">Small (sm)</button>
          <button class="ui-btn" data-intent="primary">Medium (default)</button>
          <button class="ui-btn" data-size="lg" data-intent="primary">Large (lg)</button>
          <div class="ui-btn-group">
            <button class="ui-btn">Years</button>
            <button class="ui-btn" data-intent="primary">Months</button>
            <button class="ui-btn">Days</button>
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
      <h2 class="ws-section-title">Form Controls (.ui-field, .ui-input, .ui-switch)</h2>
      <p class="ws-section-desc">Open UI compliant inputs, validation feedback, and native toggle switches.</p>

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

      <div style="margin-top: var(--space-4);">
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

const popoverSnippet = `<button class="ui-btn" data-variant="outline" popovertarget="account-menu">Account &#9662;</button>
<div id="account-menu" popover class="ui-popover">
  <ul class="ui-menu">
    <li><a class="ui-menu-item">View Profile</a></li>
    <li><a class="ui-menu-item">Workspace Settings</a></li>
    <li class="ui-menu-divider"></li>
    <li><a class="ui-menu-item">Sign Out</a></li>
  </ul>
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

function showToast(message: string) {
  const toast = document.getElementById('ws-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.setAttribute('data-visible', 'true');
  setTimeout(() => {
    toast.setAttribute('data-visible', 'false');
  }, 2000);
}
