import type { Section } from './section';
import { copyControls } from './shared';

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

export const meterSection: Section = {
  id: 'meter',
  title: 'Meter / Gauge (meter.ui-meter)',
  html: `    <!-- Meter / Gauge Section -->
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
    </section>`,
};
