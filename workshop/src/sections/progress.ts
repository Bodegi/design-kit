import type { Section } from './section';
import { copyControls } from './shared';

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

export const progressSection: Section = {
  html: `    <!-- Progress Section -->
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
    </section>`,
};
