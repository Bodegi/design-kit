import { showToast } from './toast';

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
    <section class="ws-section">
      <h2 class="ws-section-title">Contrast Ratios (WCAG AA)</h2>
      <p class="ws-section-desc">Computed for the active theme. AA needs 4.5:1 for body text, 3.0:1 for large text and UI.</p>
      <div class="ws-contrast-list">
        ${renderContrastRow('Main text on canvas', '--color-text-main', '--color-bg-canvas')}
        ${renderContrastRow('Muted text on canvas', '--color-text-muted', '--color-bg-canvas')}
        ${renderContrastRow('Main text on surface', '--color-text-main', '--color-bg-surface')}
        ${renderContrastRow('Muted text on surface', '--color-text-muted', '--color-bg-surface')}
        ${renderContrastRow('Primary label on fill', '--color-primary-contrast', '--color-primary')}
        ${renderContrastRow('Accent label on fill', '--color-accent-contrast', '--color-accent')}
        ${renderContrastRow('Success label on fill', '--color-success-contrast', '--color-success')}
        ${renderContrastRow('Warning label on fill', '--color-warning-contrast', '--color-warning')}
        ${renderContrastRow('Danger label on fill', '--color-danger-contrast', '--color-danger')}
        ${renderContrastRow('Info label on fill', '--color-info-contrast', '--color-info')}
      </div>
    </section>

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

function renderContrastRow(label: string, fgToken: string, bgToken: string) {
  const fg = parseColor(computedValue(fgToken));
  const bg = parseColor(computedValue(bgToken));

  let ratioText = 'n/a';
  let badge = '';
  if (fg && bg) {
    const ratio = contrastRatio(fg, bg);
    ratioText = `${ratio.toFixed(2)}:1`;
    const level = ratio >= 4.5 ? 'pass' : ratio >= 3 ? 'large' : 'fail';
    const badgeText = level === 'pass' ? 'AA' : level === 'large' ? 'AA Large' : 'Fail';
    badge = `<span class="ws-contrast-badge" data-level="${level}">${badgeText}</span>`;
  }

  return `
    <div class="ws-contrast-row">
      <div class="ws-contrast-sample" style="background-color: var(${bgToken}); color: var(${fgToken});">Aa</div>
      <div class="ws-contrast-info">
        <div class="ws-contrast-label">${label}</div>
        <div class="ws-contrast-tokens">${fgToken} on ${bgToken}</div>
      </div>
      <div class="ws-contrast-result">
        <span class="ws-contrast-ratio">${ratioText}</span>
        ${badge}
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

type Rgb = { r: number; g: number; b: number; a: number };

// Resolved value of a custom property on :root for the active theme.
function computedValue(token: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
}

// Parses the color literals our tokens use (#hex, #hexa, rgb(), rgba()).
// Returns null for anything else (e.g. a non-color token) so callers fall back.
function parseColor(value: string): Rgb | null {
  const v = value.trim();

  const hex = v.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) {
      h = h.split('').map((c) => c + c).join('');
    }
    if (h.length !== 6 && h.length !== 8) return null;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
    };
  }

  const rgb = v.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(/[,/\s]+/).filter(Boolean).map(parseFloat);
    if (parts.length >= 3 && parts.slice(0, 3).every((n) => !Number.isNaN(n))) {
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
    }
  }

  return null;
}

function toHex({ r, g, b, a }: Rgb): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const alpha = a < 1 ? h(a * 255) : '';
  return `#${h(r)}${h(g)}${h(b)}${alpha}`;
}

// WCAG 2.x relative luminance.
function relativeLuminance({ r, g, b }: Rgb): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(fg: Rgb, bg: Rgb): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
