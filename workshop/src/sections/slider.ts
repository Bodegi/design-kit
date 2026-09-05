import type { Section } from './section';
import { copyControls } from './shared';

// Drives the slider previews: keeps --ui-slider-value (the WebKit fill
// percentage) and the paired <output> in step with the input. The kit ships no
// runtime; this is demo wiring.
function wireSliders(root: HTMLElement) {
  root.querySelectorAll<HTMLInputElement>('input.ui-slider').forEach((slider) => {
    const output = slider.id
      ? root.querySelector<HTMLOutputElement>(`output.ui-slider-value[for="${slider.id}"]`)
      : null;
    const suffix = slider.dataset.valueSuffix ?? '';

    const sync = () => {
      const min = Number(slider.min || 0);
      const max = Number(slider.max || 100);
      const percent = max === min ? 0 : ((Number(slider.value) - min) / (max - min)) * 100;
      slider.style.setProperty('--ui-slider-value', String(percent));
      if (output) output.value = `${slider.value}${suffix}`;
    };

    slider.addEventListener('input', sync);
    sync();
  });
}

export const sliderSection: Section = {
  html: `    <!-- Slider Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Slider (.ui-slider)</h2>
      <p class="ws-section-desc">The native <code>&lt;input type="range"&gt;</code> restyled through its vendor pseudo-elements — no custom thumb markup, so keyboard, touch and screen-reader behavior stay native. Optional wrapper anatomy is <code>.ui-slider-field</code> &gt; <code>.ui-slider-header</code> (<code>.ui-slider-label</code> + an <code>&lt;output class="ui-slider-value"&gt;</code>) with <code>datalist.ui-slider-ticks</code> under the track. Firefox fills the track natively via <code>::-moz-range-progress</code>; WebKit has no such pseudo, so the fill is a gradient driven by the optional <code>--ui-slider-value</code> (a unitless 0–100 the app sets) — leave it unset and the WebKit track just reads unfilled. Ships no runtime; the workshop sets that property for the live demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Live Value & Ticks</span>
          ${copyControls('<div class="ui-slider-field">\n  <div class="ui-slider-header">\n    <label class="ui-slider-label" for="quality">Export Quality</label>\n    <output class="ui-slider-value" for="quality">72%</output>\n  </div>\n  <input class="ui-slider" type="range" id="quality" list="quality-ticks"\n         min="0" max="100" value="72" style="--ui-slider-value: 72" />\n  <datalist class="ui-slider-ticks" id="quality-ticks">\n    <option value="0" label="0"></option>\n    <option value="50" label="50"></option>\n    <option value="100" label="100"></option>\n  </datalist>\n</div>\n\n<!-- app keeps --ui-slider-value in sync for the WebKit fill -->\nel.style.setProperty(\'--ui-slider-value\', el.value);')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-slider-field">
            <div class="ui-slider-header">
              <label class="ui-slider-label" for="ws-slider-quality">Export Quality</label>
              <output class="ui-slider-value" for="ws-slider-quality">72%</output>
            </div>
            <input class="ui-slider" type="range" id="ws-slider-quality" list="ws-slider-ticks"
                   min="0" max="100" value="72" data-value-suffix="%" style="--ui-slider-value: 72" />
            <datalist class="ui-slider-ticks" id="ws-slider-ticks">
              <option value="0" label="0"></option>
              <option value="50" label="50"></option>
              <option value="100" label="100"></option>
            </datalist>
          </div>

          <div class="ui-slider-field">
            <div class="ui-slider-header">
              <label class="ui-slider-label" for="ws-slider-brush">Brush Width</label>
              <output class="ui-slider-value" for="ws-slider-brush">3 px</output>
            </div>
            <input class="ui-slider" type="range" id="ws-slider-brush" data-intent="accent"
                   min="1" max="12" value="3" data-value-suffix=" px" style="--ui-slider-value: 18" />
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents</span>
          ${copyControls('<input class="ui-slider" type="range" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="success" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="warning" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="danger" value="60" style="--ui-slider-value: 60" />\n<input class="ui-slider" type="range" data-intent="info" value="60" style="--ui-slider-value: 60" />')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <input class="ui-slider" type="range" aria-label="Primary" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Accent" data-intent="accent" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Success" data-intent="success" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Warning" data-intent="warning" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Danger" data-intent="danger" min="0" max="100" value="60" style="--ui-slider-value: 60" />
          <input class="ui-slider" type="range" aria-label="Info" data-intent="info" min="0" max="100" value="60" style="--ui-slider-value: 60" />
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes & Disabled</span>
          ${copyControls('<input class="ui-slider" type="range" data-size="sm" />\n<input class="ui-slider" type="range" />\n<input class="ui-slider" type="range" data-size="lg" />\n<input class="ui-slider" type="range" disabled />')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <input class="ui-slider" type="range" aria-label="Small" data-size="sm" min="0" max="100" value="35" style="--ui-slider-value: 35" />
          <input class="ui-slider" type="range" aria-label="Medium" min="0" max="100" value="55" style="--ui-slider-value: 55" />
          <input class="ui-slider" type="range" aria-label="Large" data-size="lg" min="0" max="100" value="75" style="--ui-slider-value: 75" />
          <input class="ui-slider" type="range" aria-label="Disabled" min="0" max="100" value="40" disabled style="--ui-slider-value: 40" />
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Vertical</span>
          ${copyControls('<input class="ui-slider" type="range" data-orientation="vertical" value="45" style="--ui-slider-value: 45" />')}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-8); align-items: flex-end;">
          <input class="ui-slider" type="range" aria-label="Low" data-orientation="vertical" data-size="sm" min="0" max="100" value="25" style="--ui-slider-value: 25" />
          <input class="ui-slider" type="range" aria-label="Mid" data-orientation="vertical" min="0" max="100" value="45" style="--ui-slider-value: 45" />
          <input class="ui-slider" type="range" aria-label="High" data-orientation="vertical" data-size="lg" data-intent="success" min="0" max="100" value="80" style="--ui-slider-value: 80" />
        </div>
      </div>
    </section>`,
  wire: wireSliders,
};
