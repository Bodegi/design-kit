import type { Section } from './section';
import { copyControls } from './shared';

export const headerSection: Section = {
  html: `    <!-- Header Section -->
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
    </section>`,
};
