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

  // Wire up the tab and toast demos (the kit ships no runtime; this drives the previews).
  wireTabs(container);
  wireToasts(container);
  wireAlerts(container);

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

const copyIcon = svg('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>');

const tooltipSnippet = `<span class="ui-tooltip" data-placement="top">
  <button class="ui-btn" data-variant="outline" aria-describedby="tt-1">Hover or focus me</button>
  <span class="ui-tooltip-content" role="tooltip" id="tt-1">Supplementary help text</span>
</span>`;

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

    tabs.forEach((tab, i) => {
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

// Drives the toast previews: dismissing the static cards, and spawning live
// toasts (auto-dismissing after 4s) into a shared bottom-end region.
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

  // Region is shared across re-renders — reuse it if one already exists.
  let region = document.querySelector<HTMLElement>('.ui-toast-region[data-position="bottom-end"]');
  if (!region) {
    region = document.createElement('div');
    region.className = 'ui-toast-region';
    region.setAttribute('data-position', 'bottom-end');
    document.body.appendChild(region);
  }

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
      region!.appendChild(toast);
      toast.querySelector('.ui-toast-close')?.addEventListener('click', () => dismiss(toast));
      setTimeout(() => { if (toast.isConnected) dismiss(toast); }, 4000);
    });
  });
}

// Dismisses inline alerts in the demo — alerts are persistent, so this is a
// hard remove (no exit animation, unlike toasts).
function wireAlerts(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-alert-close').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.ui-alert')?.remove());
  });
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
