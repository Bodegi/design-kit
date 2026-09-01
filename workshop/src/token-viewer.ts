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

    <!-- 4. Spacing Scale -->
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

    <!-- 5. Typography Scale -->
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

    <!-- 6. Radii Scale -->
    <section class="ws-section">
      <h2 class="ws-section-title">Corner Radii Scale</h2>
      <p class="ws-section-desc">Corner curves across various component sizes and presets.</p>
      <div class="ws-grid">
        ${renderRadiiCard('--radius-sm', '2px (Small tags / crisp theme)')}
        ${renderRadiiCard('--radius-md', '4px (Buttons / Inputs)')}
        ${renderRadiiCard('--radius-lg', '8px (Cards / Panels)')}
        ${renderRadiiCard('--radius-xl', '12px (Modals / Codex preset)')}
        ${renderRadiiCard('--radius-2xl', '16px (Large dialogs)')}
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
  return `
    <div class="ws-card ws-swatch-card" data-token="${token}" title="Click to copy var(${token})">
      <div class="ws-swatch-preview" style="background-color: var(${token}); color: var(--color-text-main);">
        ${label}
      </div>
      <div class="ws-swatch-name">${name}</div>
      <div class="ws-swatch-token">${token}</div>
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

function showToast(message: string) {
  const toast = document.getElementById('ws-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.setAttribute('data-visible', 'true');
  setTimeout(() => {
    toast.setAttribute('data-visible', 'false');
  }, 2000);
}
