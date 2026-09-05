import type { Section } from './section';
import { copyControls, svg } from './shared';

const listIcons: Record<string, string> = {
  server: svg('<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>'),
  layers: svg('<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>'),
  heart: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
  tag: svg('<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42Z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>'),
};

// One divided-list row: leading icon, title (+ optional description), trailing slot.
function listRow(icon: string, title: string, description: string, trailing: string): string {
  return `
    <li class="ui-list-item">
      <span class="ui-list-item-leading">${icon}</span>
      <span class="ui-list-item-content">
        <span class="ui-list-item-title">${title}</span>
        ${description ? `<span class="ui-list-item-description">${description}</span>` : ''}
      </span>
      <span class="ui-list-item-trailing">${trailing}</span>
    </li>`;
}

const listPlainSnippet = `<ul class="ui-list">
  <li class="ui-list-item">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Region: us-east-1</span></span>
  </li>
  <li>
    <div class="ui-list-item">
      <span class="ui-list-item-content"><span class="ui-list-item-title">Region: ap-south-1</span></span>
    </div>
    <ul class="ui-list">
      <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Zone a</span></span></li>
    </ul>
  </li>
</ul>`;

const listDividedSnippet = `<ul class="ui-list" data-variant="divided">
  <li class="ui-list-item">
    <span class="ui-list-item-leading"><svg width="18" height="18">…</svg></span>
    <span class="ui-list-item-content">
      <span class="ui-list-item-title">edge-01</span>
      <span class="ui-list-item-description">Uptime 41 days &#183; 18% CPU</span>
    </span>
    <span class="ui-list-item-trailing"><span class="ui-badge" data-intent="success">Healthy</span></span>
  </li>
</ul>`;

const listInsetSnippet = `<ul class="ui-list" data-variant="inset">
  <li>
    <a class="ui-list-item" href="#" aria-current="true">
      <span class="ui-list-item-leading"><svg width="18" height="18">…</svg></span>
      <span class="ui-list-item-content"><span class="ui-list-item-title">All Images</span></span>
      <span class="ui-list-item-trailing">4,182</span>
    </a>
  </li>
  <li><button class="ui-list-item" type="button" disabled>…</button></li>
</ul>`;

const listboxSnippet = `<ul class="ui-list" role="listbox" aria-label="Deploy target">
  <li class="ui-list-item" role="option" aria-selected="true" tabindex="0">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Production</span></span>
  </li>
  <li class="ui-list-item" role="option" aria-selected="false" tabindex="-1">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Staging</span></span>
  </li>
  <li class="ui-list-item" role="option" aria-selected="false" aria-disabled="true">
    <span class="ui-list-item-content"><span class="ui-list-item-title">Sandbox (retired)</span></span>
  </li>
</ul>`;

// Moves aria-selected within a listbox demo (click + arrows/Home/End), keeping
// a roving tabindex. The kit ships no runtime; the app owns this in real use.
function wireListbox(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-list[role="listbox"]').forEach((listbox) => {
    const options = Array.from(listbox.querySelectorAll<HTMLElement>('[role="option"]'));
    const enabled = options.filter((o) => o.getAttribute('aria-disabled') !== 'true');

    const select = (option: HTMLElement, focus = false) => {
      options.forEach((o) => {
        const selected = o === option;
        o.setAttribute('aria-selected', selected ? 'true' : 'false');
        if (o.getAttribute('aria-disabled') !== 'true') o.tabIndex = selected ? 0 : -1;
      });
      if (focus) option.focus();
    };

    enabled.forEach((option) => {
      option.addEventListener('click', () => select(option));
      option.addEventListener('keydown', (e) => {
        const pos = enabled.indexOf(option);
        let target: HTMLElement | undefined;
        if (e.key === 'ArrowDown') target = enabled[(pos + 1) % enabled.length];
        else if (e.key === 'ArrowUp') target = enabled[(pos - 1 + enabled.length) % enabled.length];
        else if (e.key === 'Home') target = enabled[0];
        else if (e.key === 'End') target = enabled[enabled.length - 1];
        else if (e.key === ' ' || e.key === 'Enter') target = option;
        if (target) {
          e.preventDefault();
          select(target, true);
        }
      });
    });
  });
}

export const listSection: Section = {
  html: `    <!-- List Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">List (.ui-list)</h2>
      <p class="ws-section-desc">A native <code>&lt;ul&gt;</code>/<code>&lt;ol&gt;</code> of <code>.ui-list-item</code> rows, each holding an optional <code>.ui-list-item-leading</code> slot, a <code>.ui-list-item-content</code> block (<code>-title</code> + <code>-description</code>), and a <code>.ui-list-item-trailing</code> slot. Rows are inert until you make them an <code>&lt;a&gt;</code> or <code>&lt;button&gt;</code>. Selection keys off <code>aria-selected</code> / <code>aria-current</code>, so the same classes serve a <code>role="listbox"</code> — the workshop wires the option switching for the demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Plain &amp; nested</span>
          ${copyControls(listPlainSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" style="max-width: 420px; width: 100%;">
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Region: us-east-1</span></span></li>
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Region: eu-west-2</span></span></li>
            <li>
              <div class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Region: ap-south-1</span></span></div>
              <ul class="ui-list">
                <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Zone a</span></span></li>
                <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Zone b</span></span></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Divided — leading icon, description, trailing badge</span>
          ${copyControls(listDividedSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" data-variant="divided" style="max-width: 460px; width: 100%;">
            ${listRow(listIcons.server, 'edge-01', 'Uptime 41 days · 18% CPU', '<span class="ui-badge" data-intent="success">Healthy</span>')}
            ${listRow(listIcons.server, 'edge-02', 'Uptime 6 days · 74% CPU', '<span class="ui-badge" data-intent="warning">Degraded</span>')}
            ${listRow(listIcons.server, 'edge-03', 'Not answering pings', '<span class="ui-badge" data-intent="danger">Offline</span>')}
          </ul>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Inset &amp; interactive — current + disabled row</span>
          ${copyControls(listInsetSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" data-variant="inset" style="max-width: 320px; width: 100%;">
            <li><a class="ui-list-item" href="#" aria-current="true"><span class="ui-list-item-leading">${listIcons.layers}</span><span class="ui-list-item-content"><span class="ui-list-item-title">All Images</span></span><span class="ui-list-item-trailing">4,182</span></a></li>
            <li><a class="ui-list-item" href="#"><span class="ui-list-item-leading">${listIcons.heart}</span><span class="ui-list-item-content"><span class="ui-list-item-title">Favorites</span></span><span class="ui-list-item-trailing">231</span></a></li>
            <li><a class="ui-list-item" href="#"><span class="ui-list-item-leading">${listIcons.tag}</span><span class="ui-list-item-content"><span class="ui-list-item-title">Untagged</span></span><span class="ui-list-item-trailing">57</span></a></li>
            <li><button class="ui-list-item" type="button" disabled><span class="ui-list-item-leading">${listIcons.tag}</span><span class="ui-list-item-content"><span class="ui-list-item-title">Needs Review</span></span><span class="ui-list-item-trailing">0</span></button></li>
          </ul>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Compact (data-density) &amp; ordered</span>
          ${copyControls('<ul class="ui-list" data-variant="divided" data-density="compact">…</ul>\n<ol class="ui-list" data-density="compact">…</ol>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" data-variant="divided" data-density="compact" style="max-width: 460px; width: 100%;">
            ${listRow(listIcons.server, 'edge-01', '', '18% CPU')}
            ${listRow(listIcons.server, 'edge-02', '', '74% CPU')}
            ${listRow(listIcons.server, 'edge-03', '', '—')}
          </ul>
          <ol class="ui-list" data-density="compact" style="max-width: 460px; width: 100%;">
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Pull the release branch</span></span></li>
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Run the migration</span></span></li>
            <li class="ui-list-item"><span class="ui-list-item-content"><span class="ui-list-item-title">Promote to production</span></span></li>
          </ol>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Listbox — single select via aria-selected</span>
          ${copyControls(listboxSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <ul class="ui-list" role="listbox" aria-label="Deploy target" style="max-width: 320px; width: 100%;">
            <li class="ui-list-item" role="option" aria-selected="true" tabindex="0"><span class="ui-list-item-content"><span class="ui-list-item-title">Production</span></span></li>
            <li class="ui-list-item" role="option" aria-selected="false" tabindex="-1"><span class="ui-list-item-content"><span class="ui-list-item-title">Staging</span></span></li>
            <li class="ui-list-item" role="option" aria-selected="false" tabindex="-1"><span class="ui-list-item-content"><span class="ui-list-item-title">Preview</span></span></li>
            <li class="ui-list-item" role="option" aria-selected="false" aria-disabled="true"><span class="ui-list-item-content"><span class="ui-list-item-title">Sandbox (retired)</span></span></li>
          </ul>
        </div>
      </div>
    </section>`,
  wire: wireListbox,
};
