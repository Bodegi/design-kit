import type { Section } from './section';
import { copyControls } from './shared';

export const sidebarNavSection: Section = {
  html: `    <!-- Sidebar Nav Section -->
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
    </section>`,
};
