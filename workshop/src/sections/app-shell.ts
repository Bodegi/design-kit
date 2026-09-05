import type { Section } from './section';
import { copyControls } from './shared';

export const appShellSection: Section = {
  id: 'app-shell',
  title: 'App Shell (.ui-app-shell)',
  html: `    <!-- App Shell Section -->
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
    </section>`,
};
