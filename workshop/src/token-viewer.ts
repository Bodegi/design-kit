import { showToast } from './toast';
import {
  evaluatePairings,
  flatten,
  over,
  parseColor,
  toHex,
  type PairingResult,
  type Rgb,
} from './contrast';

export function renderTokenViewer(container: HTMLElement) {
  container.innerHTML = `
    <!-- 1. Semantic Surfaces -->
    <section class="ws-section">
      <h2 class="ws-section-title">Surface & Canvas Tokens</h2>
      <p class="ws-section-desc">Background and elevation layers defined for the active theme. Click to copy token.</p>
      <div class="ws-grid">
        ${renderSwatchCard('Canvas Background', '--color-bg-canvas', 'Canvas')}
        ${renderSwatchCard('Surface Container', '--color-bg-surface', 'Surface')}
        ${renderSwatchCard('Elevated Floating', '--color-bg-elevated', 'Elevated')}
        ${renderSwatchCard('Muted Layer', '--color-bg-muted', 'Muted')}
        ${renderSwatchCard('Hover State', '--color-bg-hover', 'Hover')}
        ${renderSwatchCard('Active State', '--color-bg-active', 'Active')}
      </div>
    </section>

    <!-- 2. Semantic Intents -->
    <section class="ws-section">
      <h2 class="ws-section-title">Intent & Brand Tokens</h2>
      <p class="ws-section-desc">Action colors, feedback states, and semantic meanings. Click to copy token.</p>
      <div class="ws-grid">
        ${renderSwatchCard('Primary Brand', '--color-primary', 'Primary')}
        ${renderSwatchCard('Accent', '--color-accent', 'Accent')}
        ${renderSwatchCard('Success', '--color-success', 'Success')}
        ${renderSwatchCard('Warning', '--color-warning', 'Warning')}
        ${renderSwatchCard('Danger', '--color-danger', 'Danger')}
        ${renderSwatchCard('Info', '--color-info', 'Info')}
      </div>
    </section>

    <!-- 3. Text & Borders -->
    <section class="ws-section">
      <h2 class="ws-section-title">Text & Border Levels</h2>
      <p class="ws-section-desc">Hierarchy for typography and structural dividers.</p>
      <div class="ws-grid">
        ${renderSwatchCard('Main Text', '--color-text-main', 'Text Main')}
        ${renderSwatchCard('Muted Text', '--color-text-muted', 'Text Muted')}
        ${renderSwatchCard('Dim Text', '--color-text-dim', 'Text Dim')}
        ${renderSwatchCard('Subtle Border', '--color-border-subtle', 'Border Subtle')}
        ${renderSwatchCard('Strong Border', '--color-border-strong', 'Border Strong')}
        ${renderSwatchCard('Focus Border', '--color-border-focus', 'Border Focus')}
      </div>
    </section>

    <!-- 4. Contrast Ratios -->
    ${renderContrastSection()}

    <!-- 5. Spacing Scale -->
    <section class="ws-section">
      <h2 class="ws-section-title">Spacing Scale (4px Baseline)</h2>
      <p class="ws-section-desc">Consistent linear spacing for margins, padding, and gaps.</p>
      <div class="ws-spacing-list">
        ${renderSpacingRow('--space-1', '4px (0.25rem)')}
        ${renderSpacingRow('--space-2', '8px (0.5rem)')}
        ${renderSpacingRow('--space-3', '12px (0.75rem)')}
        ${renderSpacingRow('--space-4', '16px (1.0rem)')}
        ${renderSpacingRow('--space-5', '20px (1.25rem)')}
        ${renderSpacingRow('--space-6', '24px (1.5rem)')}
        ${renderSpacingRow('--space-8', '32px (2.0rem)')}
        ${renderSpacingRow('--space-10', '40px (2.5rem)')}
        ${renderSpacingRow('--space-12', '48px (3.0rem)')}
        ${renderSpacingRow('--space-16', '64px (4.0rem)')}
      </div>
    </section>

    <!-- 6. Typography Scale -->
    <section class="ws-section">
      <h2 class="ws-section-title">Typography Scale</h2>
      <p class="ws-section-desc">Type scale with responsive line-heights and font stacks.</p>
      <div class="ws-type-list">
        ${renderTypeRow('--text-3xl', 'The quick brown fox jumps over the lazy dog', '30px / 1.875rem')}
        ${renderTypeRow('--text-2xl', 'The quick brown fox jumps over the lazy dog', '24px / 1.5rem')}
        ${renderTypeRow('--text-xl', 'The quick brown fox jumps over the lazy dog', '20px / 1.25rem')}
        ${renderTypeRow('--text-lg', 'The quick brown fox jumps over the lazy dog', '18px / 1.125rem')}
        ${renderTypeRow('--text-base', 'The quick brown fox jumps over the lazy dog', '16px / 1.0rem (Default Body)')}
        ${renderTypeRow('--text-sm', 'The quick brown fox jumps over the lazy dog', '14px / 0.875rem (Captions / Inputs)')}
        ${renderTypeRow('--text-xs', 'The quick brown fox jumps over the lazy dog', '12px / 0.75rem (Badges / Metadata)')}
      </div>
    </section>

    <!-- 7. Radii Scale -->
    <section class="ws-section">
      <h2 class="ws-section-title">Corner Radii Scale</h2>
      <p class="ws-section-desc">Corner curves across various component sizes and presets.</p>
      <div class="ws-grid">
        ${renderRadiiCard('--radius-xs', '2px (Checkboxes / menu items)')}
        ${renderRadiiCard('--radius-sm', '4px')}
        ${renderRadiiCard('--radius-md', '6px (Nav rows)')}
        ${renderRadiiCard('--radius-lg', '8px')}
        ${renderRadiiCard('--radius-xl', '10px (Buttons / Inputs)')}
        ${renderRadiiCard('--radius-2xl', '12px (Panels / Cards)')}
        ${renderRadiiCard('--radius-3xl', '16px')}
        ${renderRadiiCard('--radius-full', '9999px (Pills / Avatars)')}
      </div>
    </section>
  `;

  // Attach copy listeners
  container.querySelectorAll<HTMLElement>('.ws-swatch-card').forEach((card) => {
    card.addEventListener('click', () => {
      const token = card.dataset.token;
      if (token) {
        navigator.clipboard.writeText(`var(${token})`);
        showToast(`Copied var(${token}) to clipboard!`);
      }
    });
  });
}

function renderSwatchCard(name: string, token: string, label: string) {
  const raw = computedValue(token);
  const rgb = parseColor(raw);
  const value = rgb ? toHex(rgb) : raw;
  return `
    <div class="ws-card ws-swatch-card" data-token="${token}" title="Click to copy var(${token})">
      <div class="ws-swatch-preview" style="background-color: var(${token}); color: var(--color-text-main);">
        ${label}
      </div>
      <div class="ws-swatch-name">${name}</div>
      <div class="ws-swatch-token">${token}</div>
      <div class="ws-swatch-value">${value}</div>
    </div>
  `;
}

function renderContrastSection() {
  return `
    <section class="ws-section">
      <h2 class="ws-section-title">Contrast Ratios (WCAG AA)</h2>
      ${contrastSummaryHtml()}
      <p class="ws-section-desc">
        Measured for the active theme, with translucent tokens composited over the
        ground beneath them. Body text needs 4.5:1; large text and UI shapes need 3.0:1.
      </p>
      ${contrastListHtml()}
    </section>
  `;
}

/** The pass/fail summary line for the active theme, measured off computed style.
    Shared with the Palette tab so the two read the same gate. */
export function contrastSummaryHtml(): string {
  const results = evaluatePairings(computedValue);
  const failed = results.filter((result) => !result.pass).length;
  const level = failed === 0 ? 'pass' : 'fail';
  const text =
    failed === 0 ? `All ${results.length} pairings pass` : `${failed} of ${results.length} pairings fail`;
  return `<p class="ws-contrast-summary" data-level="${level}">${text}</p>`;
}

/** The full pairing table for the active theme. Shared with the Palette tab. */
export function contrastListHtml(): string {
  const results = evaluatePairings(computedValue);
  return `<div class="ws-contrast-list">${results.map(renderContrastRow).join('')}</div>`;
}

/** Tokens that appear in at least one failing pairing, so an editor touching one
    can be flagged. */
export function failingTokens(): Set<string> {
  const tokens = new Set<string>();
  for (const { pairing, pass } of evaluatePairings(computedValue)) {
    if (pass) continue;
    tokens.add(pairing.fg);
    for (const bg of pairing.bg) tokens.add(bg);
  }
  return tokens;
}

function renderContrastRow({ pairing, ratio, pass }: PairingResult) {
  const bgLayers = pairing.bg.map((token) => parseColor(computedValue(token)));
  const bg = bgLayers.every((layer) => layer !== null) ? flatten(bgLayers as Rgb[]) : null;
  const fgRaw = parseColor(computedValue(pairing.fg));
  const fg = fgRaw && bg ? over(fgRaw, bg) : fgRaw;

  const sampleStyle = bg && fg ? `background-color: ${toHex(bg)}; color: ${toHex(fg)};` : '';
  const ratioText = ratio === null ? 'n/a' : `${ratio.toFixed(2)}:1`;
  const level = ratio === null ? 'fail' : pass ? 'pass' : 'fail';
  const badgeText = ratio === null ? 'N/A' : pass ? 'PASS' : 'FAIL';
  const stack = [pairing.fg, ...pairing.bg].join(' on ');

  return `
    <div class="ws-contrast-row">
      <div class="ws-contrast-sample" style="${sampleStyle}">Aa</div>
      <div class="ws-contrast-info">
        <div class="ws-contrast-label">${pairing.label}</div>
        <div class="ws-contrast-tokens">${stack}</div>
      </div>
      <div class="ws-contrast-result">
        <span class="ws-contrast-ratio">${ratioText}</span>
        <span class="ws-contrast-badge" data-level="${level}">${badgeText}</span>
        <span class="ws-contrast-threshold">needs ${pairing.threshold.toFixed(1)}:1</span>
      </div>
    </div>
  `;
}

function renderSpacingRow(token: string, sizeLabel: string) {
  return `
    <div class="ws-spacing-row">
      <div class="ws-spacing-label">${token} (${sizeLabel})</div>
      <div class="ws-spacing-bar-container">
        <div class="ws-spacing-bar" style="width: var(${token});"></div>
      </div>
    </div>
  `;
}

function renderTypeRow(token: string, sampleText: string, meta: string) {
  return `
    <div class="ws-type-row">
      <div style="font-size: var(${token}); font-weight: var(--font-medium);">${sampleText}</div>
      <div class="ws-type-meta">${token} — ${meta}</div>
    </div>
  `;
}

function renderRadiiCard(token: string, label: string) {
  return `
    <div class="ws-card">
      <div class="ws-radii-box" style="border-radius: var(${token});">
        var(${token})
      </div>
      <div class="ws-swatch-token">${token} (${label})</div>
    </div>
  `;
}

// Resolved value of a custom property on :root for the active theme.
function computedValue(token: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}
