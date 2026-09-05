import type { Section } from './section';
import { copyControls } from './shared';

export const sidebarSection: Section = {
  id: 'sidebar',
  title: 'Sidebar (.ui-sidebar)',
  html: `    <!-- Sidebar Section -->
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
    </section>`,
};
