import type { Section } from './section';
import { copyControls } from './shared';

export const watermarkSection: Section = {
  id: 'watermark',
  title: 'Watermark (.ui-watermark)',
  html: `    <!-- Watermark Section -->
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
    </section>`,
};
