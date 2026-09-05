import type { Section } from './section';
import { copyControls, escapeAttr } from './shared';

const numberStackedSnippet = `<div class="ui-number">
  <input class="ui-input" type="number" id="port" min="1" max="65535" value="25565" />
  <div class="ui-number-stepper">
    <button class="ui-number-increment" type="button" aria-label="Increase port"></button>
    <button class="ui-number-decrement" type="button" aria-label="Decrease port"></button>
  </div>
</div>

<!-- app wiring: the kit ships no JS -->
inc.addEventListener('click', () => {
  input.stepUp();
  input.dispatchEvent(new Event('input', { bubbles: true }));
});`;

const numberSplitSnippet = `<!-- same markup order; data-layout re-orders the buttons -->
<div class="ui-number" data-layout="split" style="--ui-number-width: 8rem">
  <input class="ui-input" type="number" id="qty" min="0" max="99" value="3" />
  <div class="ui-number-stepper">
    <button class="ui-number-decrement" type="button" aria-label="One fewer"></button>
    <button class="ui-number-increment" type="button" aria-label="One more"></button>
  </div>
</div>`;

const numberAdornmentSnippet = `<div class="ui-number">
  <span class="ui-number-prefix">$</span>
  <input class="ui-input" type="number" min="0" step="0.01" value="49.00" />
  <div class="ui-number-stepper">…</div>
</div>

<div class="ui-number" data-size="sm">
  <input class="ui-input" type="number" min="1" max="12" value="3" />
  <span class="ui-number-suffix">px</span>
  <div class="ui-number-stepper">…</div>
</div>`;

const numberStatesSnippet = `<!-- the shell reads each state off the input it wraps -->
<div class="ui-number"><input class="ui-input" type="number" value="8" disabled />…</div>
<div class="ui-number"><input class="ui-input" type="number" value="8" readonly />…</div>
<div class="ui-number">
  <input class="ui-input" type="number" min="1" max="10" value="42" aria-invalid="true" />…
</div>`;

type NumberFieldOptions = {
  layout?: 'split';
  size?: 'sm';
  prefix?: string;
  suffix?: string;
  width?: string;
  // Disabled/read-only fields still show the stepper, but it must not act.
  inertStepper?: boolean;
};

// Builds one .ui-number preview. Markup order is always prefix → input →
// suffix → stepper; data-layout decides where the buttons land.
function numberField(
  id: string,
  label: string,
  attrs: string,
  options: NumberFieldOptions = {},
): string {
  const { layout, size, prefix, suffix, width, inertStepper } = options;
  const disabled = inertStepper ? ' disabled' : '';
  return `
    <div class="ui-number"${layout ? ` data-layout="${layout}"` : ''}${
    size ? ` data-size="${size}"` : ''
  }${width ? ` style="--ui-number-width: ${width}"` : ''}>
      ${prefix ? `<span class="ui-number-prefix">${prefix}</span>` : ''}
      <input class="ui-input" type="number" id="${id}" aria-label="${escapeAttr(label)}" ${attrs} />
      ${suffix ? `<span class="ui-number-suffix">${suffix}</span>` : ''}
      <div class="ui-number-stepper">
        <button class="ui-number-decrement" type="button"${disabled} aria-label="Decrease ${escapeAttr(
    label,
  )}"></button>
        <button class="ui-number-increment" type="button"${disabled} aria-label="Increase ${escapeAttr(
    label,
  )}"></button>
      </div>
    </div>`;
}

// Drives the number-input previews: the stepper buttons call the input's own
// stepUp/stepDown, which is exactly what a consuming app does. stepUp throws
// when the current value cannot be stepped (out of range, or non-numeric), so
// the call is guarded and the value snapped back into range instead. The kit
// ships no runtime; this is demo wiring.
function wireNumberInputs(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-number').forEach((field) => {
    const input = field.querySelector<HTMLInputElement>('input[type="number"]');
    if (!input) return;

    const step = (direction: 1 | -1) => {
      if (input.disabled || input.readOnly) return;
      try {
        if (direction === 1) input.stepUp();
        else input.stepDown();
      } catch {
        const min = input.min === '' ? -Infinity : Number(input.min);
        const max = input.max === '' ? Infinity : Number(input.max);
        input.value = String(Math.min(Math.max(Number(input.value) || 0, min), max));
      }
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };

    field
      .querySelector<HTMLButtonElement>('.ui-number-increment')
      ?.addEventListener('click', () => step(1));
    field
      .querySelector<HTMLButtonElement>('.ui-number-decrement')
      ?.addEventListener('click', () => step(-1));
  });
}

export const numberInputSection: Section = {
  html: `    <!-- Number Input Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Number Input (.ui-number)</h2>
      <p class="ws-section-desc">A native <code>&lt;input type="number"&gt;</code> inside a shell that also holds the stepper and any adornment, so the assembly reads as one field. Anatomy is <code>.ui-number</code> &gt; <code>.ui-number-prefix</code> + <code>input.ui-input</code> + <code>.ui-number-suffix</code> + <code>.ui-number-stepper</code> (<code>.ui-number-decrement</code> / <code>.ui-number-increment</code>). <code>data-layout="stacked"</code> (default) puts two chevrons at the trailing edge; <code>data-layout="split"</code> re-orders the same markup to − left / + right with the value centred. The native spin buttons are removed per engine and the glyphs are drawn in CSS, so they recolor with the theme and need no image asset. States are read off the input with <code>:has()</code> — the ring moves to the shell (the input's own ring is cleared, so there is exactly one), and <code>:user-invalid</code> / <code>[aria-invalid="true"]</code>, <code>:read-only</code> and <code>:disabled</code> all key off the control itself. Ships no runtime: the app calls <code>input.stepUp()</code> / <code>input.stepDown()</code> — the workshop wires that for these demos.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Stacked (default)</span>
          ${copyControls(numberStackedSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-field" style="margin: 0;">
            <label class="ui-label" for="ws-num-port">Server Port</label>
            ${numberField('ws-num-port', 'Server Port', 'min="1" max="65535" value="25565"', { width: '11rem' })}
          </div>
          <div class="ui-field" style="margin: 0;">
            <label class="ui-label" for="ws-num-slots">Max Players</label>
            ${numberField('ws-num-slots', 'Max Players', 'min="1" max="200" step="1" value="20"')}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Split (quantity)</span>
          ${copyControls(numberSplitSnippet)}
        </div>
        <div class="ws-preview-canvas">
          ${numberField('ws-num-qty', 'Quantity', 'min="0" max="99" value="3"', { layout: 'split', width: '8rem' })}
          ${numberField('ws-num-qty-sm', 'Quantity (small)', 'min="0" max="99" value="1"', { layout: 'split', size: 'sm', width: '7rem' })}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Adornments &amp; Sizes</span>
          ${copyControls(numberAdornmentSnippet)}
        </div>
        <div class="ws-preview-canvas">
          ${numberField('ws-num-price', 'Price', 'min="0" step="0.01" value="49.00"', { prefix: '$', width: '10rem' })}
          ${numberField('ws-num-stroke', 'Stroke width', 'min="1" max="12" value="3"', { suffix: 'px' })}
          ${numberField('ws-num-stroke-sm', 'Stroke width (small)', 'min="1" max="12" value="3"', { suffix: 'px', size: 'sm', width: '8rem' })}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Disabled, Read-only &amp; Invalid</span>
          ${copyControls(numberStatesSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-4);">
            ${numberField('ws-num-disabled', 'Disabled', 'value="8" disabled', { inertStepper: true })}
            ${numberField('ws-num-readonly', 'Read only', 'value="8" readonly', { inertStepper: true })}
            ${numberField('ws-num-invalid', 'Out of range', 'min="1" max="10" value="42" aria-invalid="true"')}
          </div>
          <p class="ui-error-text" style="margin: 0;">Out of range — enter a value between 1 and 10.</p>
        </div>
      </div>
    </section>`,
  wire: wireNumberInputs,
};
