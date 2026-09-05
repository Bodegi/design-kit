import type { Section } from './section';
import { copyControls } from './shared';

const tagIcon =
  '<span class="ui-tag-icon"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41 12 22l-9-9V3h10l7.59 7.59a2 2 0 0 1 0 2.82Z"/><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor"/></svg></span>';

const tagSnippet = `<div class="ui-tag-group">
  <span class="ui-tag" data-intent="primary"><span class="ui-tag-label">Primary</span></span>
  <span class="ui-tag" data-intent="success"><span class="ui-tag-label">Success</span></span>
</div>`;

const tagRemoveSnippet = `<span class="ui-tag" data-intent="info">
  <span class="ui-tag-label">render:draft</span>
  <button class="ui-tag-remove" type="button" aria-label="Remove render:draft"></button>
</span>`;

const tagFilterSnippet = `<div class="ui-tag-group" role="group" aria-label="Filter by tag">
  <button class="ui-tag" type="button" data-intent="primary" aria-pressed="true">
    <span class="ui-tag-label">Landscape</span>
  </button>
  <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false">
    <span class="ui-tag-label">Portrait</span>
  </button>
</div>`;

// Drives the tag previews: the remove button drops its tag, and a filter tag
// toggles its own aria-pressed. The kit ships no runtime; this is demo wiring.
function wireTags(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-tag-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.closest('.ui-tag')?.remove();
    });
  });

  root.querySelectorAll<HTMLButtonElement>('button.ui-tag[aria-pressed]').forEach((tag) => {
    tag.addEventListener('click', () => {
      tag.setAttribute('aria-pressed', tag.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
}

export const tagsSection: Section = {
  id: 'tags',
  title: 'Tags (.ui-tag)',
  html: `    <!-- Tags Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Tags (.ui-tag)</h2>
      <p class="ws-section-desc">The interactive counterpart to <code>.ui-badge</code>: a token the reader selects, follows, or removes. Anatomy is <code>.ui-tag-icon</code> / <code>.ui-tag-label</code> / <code>.ui-tag-remove</code> inside a <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, or <code>&lt;button&gt;</code>, wrapped in a <code>.ui-tag-group</code>. Selection keys off <code>aria-pressed</code> (or <code>aria-selected</code>); the label is always <code>--color-text-main</code> over a tint of the intent so it clears AA in every theme. Ships no runtime — the workshop wires the removal and the filter toggles.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents (subtle fill)</span>
          ${copyControls(tagSnippet)}
        </div>
        <div class="ws-preview-canvas">
          <div class="ui-tag-group">
            <span class="ui-tag"><span class="ui-tag-label">Neutral</span></span>
            <span class="ui-tag" data-intent="primary"><span class="ui-tag-label">Primary</span></span>
            <span class="ui-tag" data-intent="accent"><span class="ui-tag-label">Accent</span></span>
            <span class="ui-tag" data-intent="success"><span class="ui-tag-label">Success</span></span>
            <span class="ui-tag" data-intent="warning"><span class="ui-tag-label">Warning</span></span>
            <span class="ui-tag" data-intent="danger"><span class="ui-tag-label">Danger</span></span>
            <span class="ui-tag" data-intent="info"><span class="ui-tag-label">Info</span></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Outline Variant &amp; Leading Icon</span>
          ${copyControls('<span class="ui-tag" data-variant="outline" data-intent="success">\n  <span class="ui-tag-icon">…</span>\n  <span class="ui-tag-label">Verified</span>\n</span>')}
        </div>
        <div class="ws-preview-canvas">
          <div class="ui-tag-group">
            <span class="ui-tag" data-variant="outline"><span class="ui-tag-label">Neutral</span></span>
            <span class="ui-tag" data-variant="outline" data-intent="primary"><span class="ui-tag-label">Primary</span></span>
            <span class="ui-tag" data-variant="outline" data-intent="danger"><span class="ui-tag-label">Danger</span></span>
            <span class="ui-tag" data-variant="outline" data-intent="success">${tagIcon}<span class="ui-tag-label">Verified</span></span>
            <span class="ui-tag" data-intent="info">${tagIcon}<span class="ui-tag-label">With icon</span></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sizes (sm &amp; md)</span>
          ${copyControls('<span class="ui-tag" data-size="sm" data-intent="primary"><span class="ui-tag-label">Small</span></span>')}
        </div>
        <div class="ws-preview-canvas">
          <span class="ui-tag" data-size="sm"><span class="ui-tag-label">Small neutral</span></span>
          <span class="ui-tag" data-size="sm" data-intent="primary"><span class="ui-tag-label">Small primary</span></span>
          <span class="ui-tag" data-size="sm" data-intent="warning"><span class="ui-tag-label">tiff</span><button class="ui-tag-remove" type="button" aria-label="Remove tiff"></button></span>
          <span class="ui-tag" data-size="md" data-intent="primary"><span class="ui-tag-label">Medium (default)</span></span>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Removable (.ui-tag-remove)</span>
          ${copyControls(tagRemoveSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tag-group" id="ws-tag-removable">
            <span class="ui-tag" data-intent="info"><span class="ui-tag-label">render:draft</span><button class="ui-tag-remove" type="button" aria-label="Remove render:draft"></button></span>
            <span class="ui-tag" data-intent="success"><span class="ui-tag-label">approved</span><button class="ui-tag-remove" type="button" aria-label="Remove approved"></button></span>
            <span class="ui-tag" data-intent="warning"><span class="ui-tag-label">needs-alt-text</span><button class="ui-tag-remove" type="button" aria-label="Remove needs-alt-text"></button></span>
            <span class="ui-tag"><span class="ui-tag-label">archive-1998</span><button class="ui-tag-remove" type="button" aria-label="Remove archive-1998"></button></span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Selectable Filter Group (aria-pressed)</span>
          ${copyControls(tagFilterSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tag-group" role="group" aria-label="Filter by tag">
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="true"><span class="ui-tag-label">Landscape</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false"><span class="ui-tag-label">Portrait</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="true"><span class="ui-tag-label">Monochrome</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false"><span class="ui-tag-label">Long exposure</span></button>
            <button class="ui-tag" type="button" data-intent="primary" aria-pressed="false"><span class="ui-tag-label">Film scan</span></button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Link Tag &amp; Disabled</span>
          ${copyControls('<a class="ui-tag" href="#" data-intent="accent"><span class="ui-tag-label">#tectonics</span></a>\n<button class="ui-tag" type="button" disabled><span class="ui-tag-label">Locked</span></button>')}
        </div>
        <div class="ws-preview-canvas">
          <a class="ui-tag" href="#" data-intent="accent"><span class="ui-tag-label">#tectonics</span></a>
          <a class="ui-tag" href="#"><span class="ui-tag-label">#field-notes</span></a>
          <button class="ui-tag" type="button" disabled><span class="ui-tag-label">Locked</span></button>
          <span class="ui-tag" data-intent="danger" aria-disabled="true"><span class="ui-tag-label">quarantined</span><button class="ui-tag-remove" type="button" aria-label="Remove quarantined"></button></span>
        </div>
      </div>
    </section>`,
  wire: wireTags,
};
