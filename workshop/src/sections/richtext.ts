import type { Section } from './section';
import { copyControls, escapeAttr, svg } from './shared';

const richtextIcons: Record<string, string> = {
  bold: svg('<path d="M6 4h6a4 4 0 0 1 0 8H6z"/><path d="M6 12h7a4 4 0 0 1 0 8H6z"/>'),
  italic: svg('<path d="M15 4H9"/><path d="M14 4 10 20"/><path d="M15 20H9"/>'),
  underline: svg('<path d="M7 4v6a5 5 0 0 0 10 0V4"/><path d="M5 20h14"/>'),
  list: svg('<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4.5 6h.01"/><path d="M4.5 12h.01"/><path d="M4.5 18h.01"/>'),
  quote: svg('<path d="M10 7H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3"/><path d="M20 7h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3"/>'),
  link: svg('<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>'),
};

// The toolbar rail: .ui-toolbar composed with .ui-richtext-toolbar, holding
// ghost icon press-buttons. Bold/Italic carry data-ws-cmd, so the demo wiring
// can run the matching execCommand; the rest only move aria-pressed.
function richtextToolbar(idPrefix = 'ws-rt', inert = false): string {
  const off = inert ? ' disabled' : '';
  const btn = (name: string, label: string, cmd = '') =>
    `<button class="ui-btn" type="button" data-ws-rt-btn data-variant="ghost" data-size="icon-sm"` +
    `${cmd ? ` data-ws-cmd="${cmd}"` : ''} aria-pressed="false" aria-label="${escapeAttr(label)}"${off}>` +
    `${richtextIcons[name]}</button>`;
  return `
    <div class="ui-toolbar ui-richtext-toolbar" role="toolbar" aria-label="Formatting" id="${idPrefix}-toolbar">
      <div class="ui-btn-group">
        ${btn('bold', 'Bold', 'bold')}
        ${btn('italic', 'Italic', 'italic')}
        ${btn('underline', 'Underline', 'underline')}
      </div>
      <span class="ui-toolbar-separator"></span>
      ${btn('list', 'Bulleted list')}
      ${btn('quote', 'Block quote')}
      ${btn('link', 'Link')}
    </div>`;
}

const richtextSnippet = `<div class="ui-richtext">
  <div class="ui-toolbar ui-richtext-toolbar" role="toolbar" aria-label="Formatting">
    <div class="ui-btn-group">
      <button class="ui-btn" type="button" data-variant="ghost" data-size="icon-sm" aria-pressed="false" aria-label="Bold">…</button>
      <button class="ui-btn" type="button" data-variant="ghost" data-size="icon-sm" aria-pressed="false" aria-label="Italic">…</button>
    </div>
    <span class="ui-toolbar-separator"></span>
    <button class="ui-btn" type="button" data-variant="ghost" data-size="icon-sm" aria-pressed="false" aria-label="Link">…</button>
  </div>
  <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
       aria-label="Entry body" data-placeholder="Write the entry…">
    <h2>The Vault of Ninth Light</h2>
    <p>The <strong>seal</strong> is older than the building.</p>
    <blockquote>Whatever is kept here was kept on purpose.</blockquote>
  </div>
  <div class="ui-richtext-footer">
    <span>Draft — autosaved</span>
    <span class="ui-richtext-count">128 / 400</span>
  </div>
</div>`;

const richtextAutoresizeSnippet = `<!-- Small size; the placeholder comes from data-placeholder on an empty editor -->
<div class="ui-richtext" data-size="sm" style="--ui-richtext-min-height: 5rem;">
  <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
       aria-label="Empty entry" data-placeholder="Nothing written yet — start typing…"></div>
</div>

<!-- Grows with what is typed, via field-sizing: content -->
<div class="ui-richtext" data-autoresize>
  <textarea class="ui-richtext-editor" aria-label="Note"></textarea>
</div>

<!-- Same rule on a bare textarea, no field chrome -->
<textarea class="ui-textarea" data-autoresize aria-label="Note"></textarea>`;

const richtextHighlightSnippet = `<!-- Ranges the app wraps: real <mark> elements, one intent each -->
<p>A <mark class="ui-richtext-highlight">match</mark> and a
   <mark class="ui-richtext-highlight" data-intent="danger">conflict</mark>.</p>

<!-- Ranges nothing wraps: the Custom Highlight API. The app registers them; the
     kit styles ::highlight(ui-spelling) and ::highlight(ui-grammar). -->
<script>
  const misspelled = new Highlight(rangeA, rangeB);
  CSS.highlights.set('ui-spelling', misspelled);
</script>`;

const richtextStatesSnippet = `<!-- Read-only: still selectable and focusable, so the ink keeps full contrast -->
<div class="ui-richtext" aria-readonly="true">
  <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-readonly="true" aria-label="Entry">…</div>
</div>

<!-- Disabled -->
<div class="ui-richtext" aria-disabled="true">
  <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-disabled="true" aria-label="Entry">…</div>
</div>

<!-- Error: the danger ring, and the count turns with it -->
<div class="ui-richtext" aria-invalid="true">
  <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Entry">…</div>
  <div class="ui-richtext-footer">
    <span class="ui-error-text">Too long — trim it to 40 characters.</span>
    <span class="ui-richtext-count" data-state="error">62 / 40</span>
  </div>
</div>`;

// Drives the rich-text previews. Three jobs, all of them the app's in real use:
// the count follows the editor's text and turns warning past 90% and error past
// the limit; the toolbar buttons move their own aria-pressed, which is the only
// state the CSS reads; and Bold/Italic additionally call document.execCommand,
// which is deprecated and demo-only — a real app drives a proper editing model.
// The spelling/grammar ranges are registered through the Custom Highlight API,
// which is exactly how ::highlight(ui-spelling) is meant to be fed.
function wireRichText(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('[data-ws-count]').forEach((editor) => {
    const readout = document.getElementById(editor.dataset.wsCount || '');
    const limit = Number(editor.dataset.wsLimit) || 0;
    if (!readout || !limit) return;

    const update = () => {
      const length = (editor.textContent || '').trim().length;
      readout.textContent = `${length} / ${limit}`;
      const state = length > limit ? 'error' : length > limit * 0.9 ? 'warning' : '';
      if (state) readout.setAttribute('data-state', state);
      else readout.removeAttribute('data-state');
    };

    editor.addEventListener('input', update);
    update();
  });

  // The composer's shared press-button pass already moves aria-pressed on every
  // .ui-btn carrying it, so this only adds the editing side.
  root.querySelectorAll<HTMLButtonElement>('[data-ws-rt-btn]').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => e.preventDefault()); // keep the selection
    const command = btn.dataset.wsCmd;
    if (command) btn.addEventListener('click', () => document.execCommand(command));
  });

  wireRichTextHighlights(root);
}

// Registers the two named highlights over the demo passage. Engines without the
// Custom Highlight API skip this and the text renders plain, which is the same
// fallback the CSS's @supports guard gives.
function wireRichTextHighlights(root: HTMLElement) {
  const editor = root.querySelector<HTMLElement>('[data-ws-highlight]');
  if (!editor || typeof Highlight === 'undefined' || !CSS.highlights) return;

  const ranges: Record<string, Range[]> = { 'ui-spelling': [], 'ui-grammar': [] };
  const phrases: Array<[string, string]> = [
    ['ui-spelling', 'teh'],
    ['ui-grammar', 'could of been'],
  ];
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent || '';
    for (const [name, phrase] of phrases) {
      for (let i = text.indexOf(phrase); i !== -1; i = text.indexOf(phrase, i + phrase.length)) {
        const range = document.createRange();
        range.setStart(node, i);
        range.setEnd(node, i + phrase.length);
        ranges[name].push(range);
      }
    }
  }

  for (const [name, list] of Object.entries(ranges)) {
    if (list.length) CSS.highlights.set(name, new Highlight(...list));
  }
}

export const richtextSection: Section = {
  id: 'richtext',
  title: 'Richer Text Field (.ui-richtext)',
  html: `    <!-- Richer Text Field Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Richer Text Field (.ui-richtext)</h2>
      <p class="ws-section-desc">Open UI's Richer Text Fields explainer proposes extensions to the native fields — <code>OpaqueRange</code> over a value, CSS highlights over those ranges, ghost-text <code>::suggestion</code>, input masking — and only <code>OpaqueRange</code> has begun to ship, so there is no rich-text element to restyle. What the kit styles is the container anatomy an app already renders around a <code>[contenteditable]</code> or a <code>&lt;textarea&gt;</code>: <code>.ui-richtext</code> &gt; <code>.ui-richtext-toolbar</code> + <code>.ui-richtext-editor</code> + <code>.ui-richtext-footer</code> (<code>.ui-richtext-count</code>). Editing behavior — what Bold does, what the toolbar toggles — is the app's or its library's; the kit ships no JS, and the workshop wires these demos with <code>document.execCommand</code> purely as a demo. The toolbar composes with <code>.ui-toolbar</code> and holds <code>.ui-btn</code> press-buttons keyed off <code>aria-pressed</code>; the kit adds only the rule under it and the sticky padding. States are asserted on the field: <code>[aria-invalid="true"]</code> / <code>[data-state="error"]</code>, <code>[aria-readonly="true"]</code>, <code>[aria-disabled="true"]</code>, and the ring moves to the field when the editor takes focus.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Toolbar, editor &amp; count</span>
          ${copyControls(richtextSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="max-width: 46rem;">
          <div class="ui-richtext" style="width: 100%;">
            ${richtextToolbar()}
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Entry body" data-ws-count="ws-rt-count" data-ws-limit="600"
                 data-placeholder="Write the entry…">
              <h2>The Vault of Ninth Light</h2>
              <p>Beneath the archive floor the stair turns twice and stops at a door no key was cut for. The <strong>seal</strong> is older than the building, and the mason who set it left <em>no mark</em>.</p>
              <blockquote>Whatever is kept here was kept on purpose.</blockquote>
              <h3>Field notes</h3>
              <ul>
                <li>Air is dry; no salt bloom on the stone.</li>
                <li>The hinge pins read <code>ix-lumen-9</code>.</li>
              </ul>
              <p>See the <a href="#">survey of the lower archive</a> for the earlier measurements.</p>
            </div>
            <div class="ui-richtext-footer">
              <span>Draft — autosaved</span>
              <span class="ui-richtext-count" id="ws-rt-count">0 / 600</span>
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Placeholder, small size &amp; autoresize</span>
          ${copyControls(richtextAutoresizeSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-richtext" data-size="sm" style="width: 100%; --ui-richtext-min-height: 5rem;">
            ${richtextToolbar('ws-rt-empty')}
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Empty entry" data-placeholder="Nothing written yet — start typing…"></div>
          </div>
          <div class="ui-richtext" data-autoresize style="width: 100%; --ui-richtext-min-height: 4rem;">
            <textarea class="ui-richtext-editor" aria-label="Autoresizing note"
                      placeholder="A &lt;textarea&gt; editor that grows with what is typed (field-sizing: content)."></textarea>
          </div>
          <textarea class="ui-textarea" data-autoresize aria-label="Bare autoresizing textarea"
                    placeholder="A bare textarea.ui-textarea[data-autoresize] — same one rule, no field chrome."></textarea>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Highlights</span>
          ${copyControls(richtextHighlightSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="max-width: 46rem;">
          <div class="ui-richtext" style="width: 100%; --ui-richtext-min-height: 0;">
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Reviewed passage" data-ws-highlight="true">
              <p>Ranges the app wraps itself are real <mark class="ui-richtext-highlight">marks</mark> — they stay in the accessibility tree and survive a copy. Each carries an intent: <mark class="ui-richtext-highlight" data-intent="accent">accent</mark>, <mark class="ui-richtext-highlight" data-intent="success">success</mark>, <mark class="ui-richtext-highlight" data-intent="warning">warning</mark>, <mark class="ui-richtext-highlight" data-intent="danger">danger</mark>, and <mark class="ui-richtext-highlight" data-intent="info">info</mark>.</p>
              <p>The other way is the Custom Highlight API: teh misspelled word and the "could of been" phrase below are painted through <code>::highlight(ui-spelling)</code> and <code>::highlight(ui-grammar)</code>, with nothing added to the DOM. It could of been flagged either way.</p>
            </div>
          </div>
          <p class="ui-help-text" style="margin: 0;">The wavy underlines need an engine with <code>CSS.highlights</code>; elsewhere the text simply renders plain.</p>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Read-only, disabled &amp; error</span>
          ${copyControls(richtextStatesSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-richtext" aria-readonly="true" style="width: 100%; --ui-richtext-min-height: 0;">
            <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-readonly="true"
                 aria-label="Read-only entry">
              <p>Read-only: still selectable, focusable and copyable, so the ink keeps full contrast — only the ground and border recede.</p>
            </div>
          </div>
          <div class="ui-richtext" aria-disabled="true" style="width: 100%; --ui-richtext-min-height: 0;">
            ${richtextToolbar('ws-rt-off', true)}
            <div class="ui-richtext-editor" contenteditable="false" role="textbox" aria-disabled="true"
                 aria-label="Disabled entry">
              <p>Disabled: a <code>contenteditable="false"</code> editor on a field the app has not marked read-only.</p>
            </div>
          </div>
          <div class="ui-richtext" aria-invalid="true" style="width: 100%; --ui-richtext-min-height: 0;">
            <div class="ui-richtext-editor" contenteditable="true" role="textbox" aria-multiline="true"
                 aria-label="Over the limit" data-ws-count="ws-rt-count-error" data-ws-limit="40">
              <p>This entry is well past the limit it was given, so the field takes the danger ring and the count turns.</p>
            </div>
            <div class="ui-richtext-footer">
              <span class="ui-error-text" style="font-size: inherit;">Too long — trim it to 40 characters.</span>
              <span class="ui-richtext-count" id="ws-rt-count-error" data-state="error">0 / 40</span>
            </div>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireRichText,
};
