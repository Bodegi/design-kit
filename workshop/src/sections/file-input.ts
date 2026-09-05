import type { Section } from './section';
import { copyControls, svg } from './shared';

const fileUploadIcon = svg('<path d="M12 13v8"/><path d="m8 17 4-4 4 4"/><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>');

// One dropzone frozen in a state the app owns (drag, rejection, or a disabled
// input), for the state gallery.
function staticDropzone(state: string, headline: string, hint: string): string {
  const attrs = state === 'disabled' ? '' : ` data-state="${state}"`;
  const input = state === 'disabled' ? '<input type="file" disabled>' : '<input type="file" tabindex="-1">';
  return `<label class="ui-file" data-variant="dropzone"${attrs}>
            ${input}
            <span class="ui-file-icon">${fileUploadIcon}</span>
            <p class="ui-file-hint">${headline}</p>
            <span class="ui-btn ui-file-trigger" data-variant="outline">Browse files</span>
            <p class="ui-file-hint">${hint}</p>
          </label>`;
}

// A chosen file, as the .ui-tag token the .ui-file-list is built from.
function fileToken(name: string): string {
  return `<li><span class="ui-tag" data-size="sm"><span class="ui-tag-label">${name}</span>` +
    `<button class="ui-tag-remove" type="button" aria-label="Remove ${name}"></button></span></li>`;
}

const fileButtonSnippet = `<label class="ui-file">
  <input type="file">
  <span class="ui-btn ui-file-trigger" data-variant="outline">Choose file</span>
  <span class="ui-file-name">No file chosen</span>
</label>`;

const fileNativeSnippet = `<input type="file" class="ui-file-native" aria-label="Attachment">
<input type="file" class="ui-file-native" data-size="sm" aria-label="Attachment">
<input type="file" class="ui-file-native" aria-invalid="true" aria-label="Attachment">`;

const fileDropzoneSnippet = `<label class="ui-file" data-variant="dropzone">
  <input type="file" multiple>
  <span class="ui-file-icon">…</span>
  <p class="ui-file-hint">Drag images here, or</p>
  <span class="ui-btn ui-file-trigger" data-variant="outline">Browse files</span>
  <p class="ui-file-hint">PNG, JPG or WebP — up to 10 MB each</p>
</label>`;

const fileListSnippet = `<ul class="ui-file-list">
  <li>
    <span class="ui-tag" data-size="sm">
      <span class="ui-tag-label">dune-ridge.png</span>
      <button class="ui-tag-remove" type="button" aria-label="Remove dune-ridge.png"></button>
    </span>
  </li>
</ul>`;

// Drives the file previews: the filename readout after a pick, and the dragover
// state on the live dropzone (CSS cannot see a drag). The kit ships no runtime;
// this is the wiring a consuming app would write.
function wireFileInputs(root: HTMLElement) {
  root.querySelectorAll<HTMLLabelElement>('label.ui-file').forEach((label) => {
    const input = label.querySelector<HTMLInputElement>('input[type="file"]');
    if (!input || input.disabled) return;

    const name = label.querySelector<HTMLElement>('.ui-file-name');
    if (name) {
      const empty = name.textContent;
      input.addEventListener('change', () => {
        const files = Array.from(input.files ?? []);
        name.textContent = files.length === 0 ? empty
          : files.length === 1 ? files[0].name
          : `${files.length} files selected`;
      });
    }

    if (label.dataset.variant !== 'dropzone' || label.dataset.state) return;

    // dragover has to be cancelled as well, or the browser rejects the drop.
    let depth = 0;
    const clear = () => { depth = 0; label.removeAttribute('data-state'); };
    label.addEventListener('dragenter', (e) => {
      e.preventDefault();
      depth += 1;
      label.setAttribute('data-state', 'dragover');
    });
    label.addEventListener('dragover', (e) => e.preventDefault());
    // dragleave fires for every child the pointer crosses, so the count decides
    // when the drag has really left the zone.
    label.addEventListener('dragleave', () => { depth -= 1; if (depth <= 0) clear(); });
    label.addEventListener('drop', (e) => {
      e.preventDefault();
      clear();
      const dropped = Array.from(e.dataTransfer?.files ?? []);
      if (name && dropped.length) {
        name.textContent = dropped.length === 1 ? dropped[0].name : `${dropped.length} files selected`;
      }
      const hint = label.querySelector<HTMLElement>('.ui-file-hint');
      if (hint && dropped.length) hint.textContent = `Dropped ${dropped.length} file${dropped.length === 1 ? '' : 's'}`;
    });
  });
}

export const fileInputSection: Section = {
  html: `    <!-- File Input Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">File Input (.ui-file)</h2>
      <p class="ws-section-desc">The native <code>&lt;input type="file"&gt;</code> in two forms sharing one class family. The <em>button form</em> is a <code>&lt;label class="ui-file"&gt;</code> around a visually hidden input, a <code>.ui-file-trigger</code> that borrows <code>.ui-btn</code> for its look, and a <code>.ui-file-name</code> the app fills. The <em>native form</em> (<code>.ui-file-native</code>) needs no wrapper — its built-in button is restyled through <code>::file-selector-button</code>. <code>data-variant="dropzone"</code> turns the label into a dashed drop target with <code>.ui-file-icon</code> and <code>.ui-file-hint</code>. CSS cannot observe a drag, so the app sets <code>data-state="dragover"</code> from its own handlers; <code>data-state="error"</code> and <code>aria-invalid</code> take the danger edge. Ships no runtime — the workshop wires the filename readout and the drag states.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Button form (label + hidden input)</span>
          ${copyControls(fileButtonSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <label class="ui-file">
            <input type="file" id="ws-file-a">
            <span class="ui-btn ui-file-trigger" data-variant="outline">Choose file</span>
            <span class="ui-file-name">No file chosen</span>
          </label>
          <label class="ui-file" data-size="sm">
            <input type="file" id="ws-file-b" multiple>
            <span class="ui-btn ui-file-trigger" data-variant="outline" data-size="sm">Add images</span>
            <span class="ui-file-name">No file chosen</span>
          </label>
          <label class="ui-file">
            <input type="file" disabled>
            <span class="ui-btn ui-file-trigger" data-variant="outline">Choose file</span>
            <span class="ui-file-name">Uploads are locked</span>
          </label>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native form (::file-selector-button)</span>
          ${copyControls(fileNativeSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <input type="file" class="ui-file-native" aria-label="Attachment">
          <input type="file" class="ui-file-native" data-size="sm" aria-label="Small attachment">
          <input type="file" class="ui-file-native" aria-label="Rejected attachment" aria-invalid="true">
          <input type="file" class="ui-file-native" aria-label="Locked attachment" disabled>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Dropzone — live (drag a file over it)</span>
          ${copyControls(fileDropzoneSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <label class="ui-file" data-variant="dropzone">
            <input type="file" id="ws-file-drop" multiple>
            <span class="ui-file-icon">${fileUploadIcon}</span>
            <p class="ui-file-hint">Drag images here, or</p>
            <span class="ui-btn ui-file-trigger" data-variant="outline">Browse files</span>
            <p class="ui-file-hint">PNG, JPG or WebP — up to 10 MB each</p>
          </label>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Dropzone states (dragover, error, disabled)</span>
          ${copyControls('<label class="ui-file" data-variant="dropzone" data-state="dragover">…</label>\n<label class="ui-file" data-variant="dropzone" data-state="error">…</label>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          ${staticDropzone('dragover', 'Release to add 3 files', 'Drop anywhere in this area')}
          ${staticDropzone('error', 'sunset.tiff is not a supported format', 'PNG, JPG or WebP — up to 10 MB each')}
          ${staticDropzone('disabled', 'Uploads are paused', 'The library is being re-indexed')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Small dropzone with a chosen-file list</span>
          ${copyControls(fileListSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div>
            <label class="ui-file" data-variant="dropzone" data-size="sm">
              <input type="file" id="ws-file-drop-sm" multiple>
              <span class="ui-file-icon">${fileUploadIcon}</span>
              <span class="ui-btn ui-file-trigger" data-variant="outline" data-size="sm">Add more</span>
              <p class="ui-file-hint">3 files selected</p>
            </label>
            <ul class="ui-file-list">
              ${fileToken('dune-ridge.png')}
              ${fileToken('basalt-column.jpg')}
              ${fileToken('scan-0142.webp')}
            </ul>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireFileInputs,
};
