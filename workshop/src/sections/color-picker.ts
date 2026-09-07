import type { Section } from './section';
import { copyControls } from './shared';
import { colorPickerMarkup, createColorPicker } from '../color-picker';

const panelSnippet = `<div class="ui-panel" style="width: 232px;">
  <div class="ui-colorpicker">
    <div class="ui-colorpicker-area"><div class="ui-colorpicker-area-thumb"></div></div>
    <input class="ui-colorpicker-hue" type="range" min="0" max="360" value="210" aria-label="Hue">
    <input class="ui-colorpicker-alpha" type="range" min="0" max="100" value="100" aria-label="Opacity">
    <div class="ui-colorpicker-fields">
      <div class="ui-colorpicker-swatch"></div>
      <input class="ui-input" type="text" spellcheck="false" autocomplete="off" aria-label="Color value">
    </div>
  </div>
</div>`;

const popoverSnippet = `<button class="ui-btn" popovertarget="cp-pop" aria-label="Pick a color">
  <span class="ui-colorpicker-swatch" style="width:16px;height:16px;"></span>
</button>
<div id="cp-pop" class="ui-popover" popover>
  <div class="ui-colorpicker"><!-- area, hue, (alpha,) fields --></div>
</div>`;

function wireColorPickerDemo(root: HTMLElement) {
  const panel = root.querySelector<HTMLElement>('#ws-cp-panel');
  const output = root.querySelector<HTMLElement>('#ws-cp-output');
  if (panel && output) {
    const picker = createColorPicker(panel);
    picker.onChange((css) => { output.textContent = css; });
    picker.set('#38bdf8');
    output.textContent = picker.get();
  }

  const opaque = root.querySelector<HTMLElement>('#ws-cp-opaque');
  const opaqueOut = root.querySelector<HTMLElement>('#ws-cp-opaque-output');
  if (opaque && opaqueOut) {
    const picker = createColorPicker(opaque, { alpha: false });
    picker.onChange((css) => { opaqueOut.textContent = css; });
    picker.set('#f5a742');
    opaqueOut.textContent = picker.get();
  }

  const pop = root.querySelector<HTMLElement>('#ws-cp-popover');
  const popSwatch = root.querySelector<HTMLElement>('#ws-cp-trigger-swatch');
  if (pop && popSwatch) {
    const picker = createColorPicker(pop);
    const sync = (css: string) => { popSwatch.style.setProperty('--ui-colorpicker-color', css); };
    picker.onChange(sync);
    picker.set('#b577ff');
    sync(picker.get());
  }
}

export const colorPickerSection: Section = {
  html: `    <!-- Color Picker Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Color Picker (.ui-colorpicker)</h2>
      <p class="ws-section-desc">An HSV picker — a saturation/value plane, a hue track, an optional alpha track, and a hex/rgba field with a live swatch over a transparency check. The native <code>&lt;input type="color"&gt;</code> opens unthemeable OS chrome and has no alpha channel; Open UI doesn't cover a color picker, so this follows the same <code>.ui-*</code> conventions. Like <code>.ui-datepicker</code> it composes a host surface rather than shipping one — drop it in a <code>.ui-panel</code> or an anchored <code>.ui-popover</code>. Ships no runtime: the plane's pointer drag, the sliders and the hex parsing are workshop wiring (shared with the Palette tab), reading and writing three <code>--ui-colorpicker-*</code> custom properties.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">In a panel — drag the plane, sliders, or type a value</span>
          ${copyControls(panelSnippet)}
        </div>
        <div class="ws-preview-canvas" style="gap: var(--space-6); align-items: flex-start;">
          <div class="ui-panel" style="width: 232px;">
            <div id="ws-cp-panel">${colorPickerMarkup({ label: 'Brand' })}</div>
          </div>
          <div>
            <p class="ws-preview-title" style="margin: 0 0 var(--space-2);">Opaque only (<code>alpha:false</code>)</p>
            <div class="ui-panel" style="width: 232px;">
              <div id="ws-cp-opaque">${colorPickerMarkup({ alpha: false, label: 'Accent' })}</div>
            </div>
            <p style="margin: var(--space-3) 0 0; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-text-muted);">
              <span id="ws-cp-output"></span> &nbsp;·&nbsp; <span id="ws-cp-opaque-output"></span>
            </p>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">In a popover — the swatch trigger reflects the pick</span>
          ${copyControls(popoverSnippet)}
        </div>
        <div class="ws-preview-canvas" style="min-height: 320px; align-items: flex-start;">
          <button class="ui-btn" popovertarget="ws-cp-pop" aria-label="Pick a color">
            <span class="ui-colorpicker-swatch" id="ws-cp-trigger-swatch" style="width: 16px; height: 16px; border-radius: var(--radius-inline);"></span>
            <span>Custom color</span>
          </button>
          <div id="ws-cp-pop" class="ui-popover" popover style="padding: var(--space-3);">
            <div id="ws-cp-popover">${colorPickerMarkup({ label: 'Custom' })}</div>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireColorPickerDemo,
};
