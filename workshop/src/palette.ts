/* ==========================================================================
   Palette tab — live-edit the semantic color tokens with the contrast gate
   wired in. Seed from a theme (or the semantic baseline), edit any token with a
   .ui-colorpicker, watch the sample components and the WCAG table repaint as you
   type, then export a theme file that already passes the gate.

   Edits are applied as inline custom properties on <html>, which outrank a
   [data-theme] rule, so the whole page (samples and the measured contrast, both
   read from computed style) reflects them with no re-render of the components.
   The kit ships no runtime; this is workshop tooling built entirely on the
   public token contract and the shared color-picker wiring.
   ========================================================================== */
import { createColorPicker, colorPickerMarkup, type ColorPicker } from './color-picker';
import { parseColor } from './contrast';
import { contrastListHtml, contrastSummaryHtml, failingTokens } from './token-viewer';
import { showToast } from './toast';

type TokenGroup = { title: string; tokens: string[] };

const SEED_THEMES = [
  'default-dark',
  'default-light',
  'server-panel',
  'codex',
  'tectonic',
  'image-hoard',
  'chalkout',
];

/** The editable semantic color set, grouped as the Token panel groups it.
    Derived tokens (--color-bg-current, --shadow-current-bar, --focus-ring), the
    fixed cross-theme constants (--color-switch-thumb, --color-scrim, its ink),
    and every non-color constant are out of scope — system constants by design. */
const INTENTS: { name: string; active: boolean }[] = [
  { name: 'primary', active: true }, // only primary carries an -active in the baseline
  { name: 'accent', active: false },
  { name: 'success', active: false },
  { name: 'warning', active: false },
  { name: 'danger', active: false },
  { name: 'info', active: false },
];

const GROUPS: TokenGroup[] = [
  {
    title: 'Surfaces & Canvas',
    tokens: [
      '--color-bg-canvas',
      '--color-bg-surface',
      '--color-bg-elevated',
      '--color-bg-overlay',
      '--color-bg-muted',
      '--color-bg-hover',
      '--color-bg-active',
      '--color-bg-glass',
    ],
  },
  {
    title: 'Text',
    tokens: ['--color-text-main', '--color-text-muted', '--color-text-dim', '--color-text-inverse'],
  },
  {
    title: 'Borders',
    tokens: ['--color-border-subtle', '--color-border-strong', '--color-border-focus'],
  },
  ...INTENTS.map((intent) => ({
    title: title(intent.name),
    tokens: [
      `--color-${intent.name}`,
      `--color-${intent.name}-hover`,
      ...(intent.active ? [`--color-${intent.name}-active`] : []),
      `--color-${intent.name}-contrast`,
      `--color-${intent.name}-subtle`,
    ],
  })),
];

const ALL_TOKENS = GROUPS.flatMap((group) => group.tokens);

const root = document.documentElement;
const computed = (token: string) => getComputedStyle(root).getPropertyValue(token).trim();

/** A color canonicalized to compare edits against the baseline regardless of
    literal form (#abc vs rgb() vs rgba with the same channels). */
function canon(value: string): string {
  const c = parseColor(value);
  return c ? `${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)},${Math.round(c.a * 1000) / 1000}` : value.trim();
}

function title(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function slugify(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'my-theme';
}

export function renderPalette(container: HTMLElement) {
  // Baseline = the semantic :root values (no theme), captured with data-theme
  // cleared so the export can emit only the tokens a theme actually changes.
  const priorTheme = root.getAttribute('data-theme');
  const priorOverrides = new Map<string, string>();
  for (const token of ALL_TOKENS) {
    const inline = root.style.getPropertyValue(token);
    if (inline) priorOverrides.set(token, inline);
    root.style.removeProperty(token);
  }
  root.removeAttribute('data-theme');
  const baseline = new Map(ALL_TOKENS.map((token) => [token, computed(token)]));
  // Restore whatever was active before entering the tab.
  if (priorTheme) root.setAttribute('data-theme', priorTheme);
  for (const [token, value] of priorOverrides) root.style.setProperty(token, value);

  container.innerHTML = `
    <section class="ws-section">
      <h2 class="ws-section-title">Palette Playground</h2>
      <p class="ws-section-desc">
        Seed from a theme or the semantic baseline, then edit any of the ${ALL_TOKENS.length}
        semantic color tokens. The samples and the WCAG table below update as you type; the
        export emits only the tokens that differ from the baseline, scoped for a theme file
        that already passes <code>npm run check:contrast</code>. Shape, spacing, motion and the
        derived tokens are system constants and aren't editable here.
      </p>

      <div class="ws-pal-toolbar">
        <label class="ws-pal-field">
          <span>Seed from</span>
          <select id="ws-pal-seed" class="ui-select">
            <option value="">Semantic baseline</option>
            ${SEED_THEMES.map((t) => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </label>
        <label class="ws-pal-field">
          <span>Theme name</span>
          <input id="ws-pal-name" class="ui-input" type="text" value="My Theme" spellcheck="false" autocomplete="off">
        </label>
        <div class="ws-pal-summary" id="ws-pal-summary">${contrastSummaryHtml()}</div>
      </div>
    </section>

    <div class="ws-pal-grid">
      <section class="ws-section ws-pal-editors">
        ${GROUPS.map(renderGroup).join('')}
      </section>

      <aside class="ws-pal-rail">
        <section class="ws-section">
          <h3 class="ws-section-title">Live samples</h3>
          <div class="ws-pal-samples">${sampleMarkup()}</div>
        </section>

        <section class="ws-section">
          <h3 class="ws-section-title">Contrast (WCAG AA)</h3>
          <div id="ws-pal-contrast">${contrastListHtml()}</div>
        </section>

        <section class="ws-section">
          <h3 class="ws-section-title">Export</h3>
          <p class="ws-section-desc">Only tokens that differ from the baseline. Copy into <code>src/themes/&lt;name&gt;.css</code>.</p>
          <textarea id="ws-pal-export" class="ui-textarea ws-pal-io" readonly spellcheck="false" rows="10"></textarea>
          <div class="ws-pal-actions">
            <button id="ws-pal-copy" class="ui-btn" data-variant="primary" data-size="sm">Copy CSS</button>
          </div>
          <h3 class="ws-section-title" style="margin-top: var(--space-4);">Import</h3>
          <p class="ws-section-desc">Paste a theme file's body to keep editing it.</p>
          <textarea id="ws-pal-import" class="ui-textarea ws-pal-io" spellcheck="false" rows="6" placeholder="--color-primary: #…;"></textarea>
          <div class="ws-pal-actions">
            <button id="ws-pal-load" class="ui-btn" data-size="sm">Load</button>
          </div>
        </section>
      </aside>
    </div>
  `;

  wirePalette(container, baseline);
}

function renderGroup(group: TokenGroup): string {
  return `
    <fieldset class="ws-pal-group">
      <legend class="ws-pal-group-title">${group.title}</legend>
      ${group.tokens.map(renderRow).join('')}
    </fieldset>
  `;
}

function renderRow(token: string): string {
  const popId = `ws-pal-pop-${token.replace(/[^\w-]/g, '')}`;
  return `
    <div class="ws-pal-row" data-token="${token}">
      <button class="ws-pal-trigger" type="button" popovertarget="${popId}" aria-label="Edit ${token}">
        <span class="ui-colorpicker-swatch ws-pal-swatch"></span>
      </button>
      <span class="ws-pal-token">${token}</span>
      <span class="ws-pal-value" data-role="value"></span>
      <span class="ws-pal-warn" data-role="warn" hidden title="This token is in a failing pairing">▲</span>
      <div id="${popId}" class="ui-popover ws-pal-popover" popover>
        ${colorPickerMarkup({ label: token })}
      </div>
    </div>
  `;
}

function wirePalette(container: HTMLElement, baseline: Map<string, string>) {
  const nameInput = container.querySelector<HTMLInputElement>('#ws-pal-name');
  const seedSelect = container.querySelector<HTMLSelectElement>('#ws-pal-seed');
  const exportArea = container.querySelector<HTMLTextAreaElement>('#ws-pal-export');
  const importArea = container.querySelector<HTMLTextAreaElement>('#ws-pal-import');
  const summaryBox = container.querySelector<HTMLElement>('#ws-pal-summary');
  const contrastBox = container.querySelector<HTMLElement>('#ws-pal-contrast');

  const rows = new Map<string, { picker: ColorPicker; swatch: HTMLElement; value: HTMLElement; warn: HTMLElement }>();

  const refreshDisplay = (token: string) => {
    const row = rows.get(token);
    if (!row) return;
    const css = row.picker.get();
    row.swatch.style.setProperty('--ui-colorpicker-color', css);
    row.value.textContent = css;
  };

  const buildExport = (): string => {
    const name = nameInput?.value ?? 'My Theme';
    const slug = slugify(name);
    const lines: string[] = [];
    for (const token of ALL_TOKENS) {
      const cur = rows.get(token)?.picker.get() ?? '';
      const base = baseline.get(token) ?? '';
      if (cur && canon(cur) !== canon(base)) lines.push(`  ${token}: ${cur};`);
    }
    const bar = '='.repeat(74);
    const header = `/* ${bar}\n   Theme: ${name}\n   ${bar} */`;
    if (!lines.length) {
      return `${header}\n:root[data-theme="${slug}"],\n[data-theme="${slug}"] {\n  /* No tokens differ from the baseline yet. */\n}\n`;
    }
    return `${header}\n:root[data-theme="${slug}"],\n[data-theme="${slug}"] {\n${lines.join('\n')}\n}\n`;
  };

  // Re-measure the gate and repaint the summary, table, and per-token warnings.
  const reevaluate = () => {
    if (summaryBox) summaryBox.innerHTML = contrastSummaryHtml();
    if (contrastBox) contrastBox.innerHTML = contrastListHtml();
    const failing = failingTokens();
    for (const [token, row] of rows) row.warn.hidden = !failing.has(token);
  };

  const sync = () => {
    if (exportArea) exportArea.value = buildExport();
    reevaluate();
  };

  // Wire every row's picker.
  container.querySelectorAll<HTMLElement>('.ws-pal-row').forEach((rowEl) => {
    const token = rowEl.dataset.token;
    if (!token) return;
    const pickerEl = rowEl.querySelector<HTMLElement>('.ui-colorpicker');
    const swatch = rowEl.querySelector<HTMLElement>('.ws-pal-swatch');
    const value = rowEl.querySelector<HTMLElement>('[data-role="value"]');
    const warn = rowEl.querySelector<HTMLElement>('[data-role="warn"]');
    if (!pickerEl || !swatch || !value || !warn) return;

    const picker = createColorPicker(pickerEl);
    rows.set(token, { picker, swatch, value, warn });

    picker.set(computed(token));
    refreshDisplay(token);

    picker.onChange((css) => {
      root.style.setProperty(token, css);
      refreshDisplay(token);
      sync();
    });
  });

  // Seed from a theme (or baseline): drop all overrides, read the theme's values
  // back into every picker, and re-measure.
  const seed = (theme: string) => {
    for (const token of ALL_TOKENS) root.style.removeProperty(token);
    if (theme) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    for (const [token, row] of rows) {
      row.picker.set(computed(token));
      refreshDisplay(token);
    }
    sync();
  };

  seedSelect?.addEventListener('change', () => seed(seedSelect.value));
  nameInput?.addEventListener('input', () => { if (exportArea) exportArea.value = buildExport(); });

  container.querySelector<HTMLButtonElement>('#ws-pal-copy')?.addEventListener('click', () => {
    if (!exportArea) return;
    navigator.clipboard.writeText(exportArea.value);
    showToast('Copied theme CSS to clipboard!');
  });

  container.querySelector<HTMLButtonElement>('#ws-pal-load')?.addEventListener('click', () => {
    const text = importArea?.value ?? '';
    let loaded = 0;
    for (const [, token, rawValue] of text.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      const row = rows.get(token);
      if (!row) continue;
      row.picker.set(rawValue.trim());
      root.style.setProperty(token, row.picker.get());
      refreshDisplay(token);
      loaded += 1;
    }
    sync();
    showToast(loaded ? `Loaded ${loaded} token${loaded === 1 ? '' : 's'}.` : 'No editable tokens found.');
  });

  sync();
}

/** A compact spread of components that exercise the edited tokens, so an edit's
    effect is visible without leaving the tab. They read the same custom
    properties, so the inline overrides repaint them with no re-render. */
function sampleMarkup(): string {
  return `
    <div class="ws-pal-sample-row">
      <button class="ui-btn" data-variant="primary">Primary</button>
      <button class="ui-btn" data-variant="secondary">Secondary</button>
      <button class="ui-btn" data-variant="ghost" data-intent="danger">Danger</button>
    </div>
    <div class="ws-pal-sample-row">
      <span class="ui-badge" data-intent="success">Success</span>
      <span class="ui-badge" data-intent="warning">Warning</span>
      <span class="ui-badge" data-intent="info">Info</span>
      <span class="ui-badge" data-intent="accent">Accent</span>
    </div>
    <div class="ui-field">
      <label class="ui-label" for="ws-pal-demo-input">Field label</label>
      <input class="ui-input" id="ws-pal-demo-input" type="text" placeholder="Placeholder text" value="Editable value">
    </div>
    <div class="ui-alert" data-intent="warning" role="status">
      <div class="ui-alert-content">
        <p class="ui-alert-title">Heads up</p>
        <p class="ui-alert-text">Muted body copy sits on the surface behind this alert.</p>
      </div>
    </div>
    <p style="color: var(--color-text-muted); font-size: var(--text-sm); margin: 0;">
      Muted text — <a href="#" style="color: var(--color-primary);" onclick="return false">a primary link</a> and
      <span style="color: var(--color-text-dim);">dim metadata</span>.
    </p>
  `;
}
