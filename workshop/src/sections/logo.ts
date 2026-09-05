import type { Section } from './section';
import { copyControls } from './shared';

export const logoSection: Section = {
  id: 'logo',
  title: 'Logo (.ui-logo)',
  html: `    <!-- Logo Section -->
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
    </section>`,
};
