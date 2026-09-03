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
