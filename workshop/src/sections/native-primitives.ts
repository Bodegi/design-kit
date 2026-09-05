import type { Section } from './section';
import { copyControls } from './shared';
import { showToast } from '../toast';

const accordionSnippet = `<details class="ui-accordion">
  <summary class="ui-accordion-summary">How does theme inheritance work?</summary>
  <div class="ui-accordion-content">Components reference Tier 2 semantic variables.</div>
</details>`;

// Exclusive accordion: the shared name attribute is the whole mechanism — the
// group class only collapses the radii and dividers into one card.
const accordionGroupSnippet = `<div class="ui-accordion-group">
  <details class="ui-accordion" name="docs" open>
    <summary class="ui-accordion-summary">Tokens</summary>
    <div class="ui-accordion-content">Primitives feed semantic contracts, which themes override.</div>
  </details>
  <details class="ui-accordion" name="docs">
    <summary class="ui-accordion-summary">Components</summary>
    <div class="ui-accordion-content">Every component reads Tier 2 tokens only.</div>
  </details>
  <details class="ui-accordion" name="docs">
    <summary class="ui-accordion-summary">Browser support</summary>
    <div class="ui-accordion-content">Chrome/Edge 120, Safari 17.2, Firefox 130.</div>
  </details>
</div>`;

// The dialog demo's open/close buttons and light-dismiss. `showModal()` and the
// close button's form method are native; the workshop adds the triggers because
// the kit ships no runtime.
function wireDialog() {
  const dialog = document.getElementById('ws-demo-dialog') as HTMLDialogElement | null;
  const openBtn = document.getElementById('ws-open-dialog-btn');
  const closeX = document.getElementById('ws-close-dialog-x');
  const closeBtn = document.getElementById('ws-close-dialog-btn');
  const confirmBtn = document.getElementById('ws-confirm-dialog-btn');

  if (dialog && openBtn) {
    openBtn.addEventListener('click', () => dialog.showModal());
    closeX?.addEventListener('click', () => dialog.close());
    closeBtn?.addEventListener('click', () => dialog.close());
    confirmBtn?.addEventListener('click', () => {
      dialog.close();
      showToast('Deployment confirmed!');
    });
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }
}

export const nativePrimitivesSection: Section = {
  id: 'native-primitives',
  title: 'Native HTML Primitives (Modal & Accordion)',
  html: `    <!-- Native Dialog Modal & Accordion -->
    <section class="ws-section">
      <h2 class="ws-section-title">Native HTML Primitives (Modal & Accordion)</h2>
      <p class="ws-section-desc">Built directly on native browser &lt;dialog&gt; and &lt;details&gt;.</p>

      <div class="ws-preview-canvas">
        <button id="ws-open-dialog-btn" class="ui-btn" data-intent="primary">
          Open Native &lt;dialog&gt; Modal
        </button>
      </div>

      <!-- Native Dialog Element -->
      <dialog id="ws-demo-dialog" class="ui-dialog">
        <div class="ui-dialog-header">
          <h3 class="ui-dialog-title">Confirm Deployment</h3>
          <button id="ws-close-dialog-x" class="ui-btn" data-size="sm" data-variant="ghost">✕</button>
        </div>
        <div class="ui-dialog-body">
          <p style="margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: var(--leading-relaxed);">
            You are about to push this release to the production cluster. This action will update all live service nodes.
          </p>
        </div>
        <div class="ui-dialog-footer">
          <button id="ws-close-dialog-btn" class="ui-btn" data-variant="ghost">Cancel</button>
          <button id="ws-confirm-dialog-btn" class="ui-btn" data-intent="primary">Deploy Now</button>
        </div>
      </dialog>

      <div class="ws-preview-block" style="margin-top: var(--space-4);">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Independent Disclosures</span>
          ${copyControls(accordionSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <details class="ui-accordion">
            <summary class="ui-accordion-summary">How does theme inheritance work?</summary>
            <div class="ui-accordion-content">
              Components reference Tier 2 semantic variables. When an application imports a theme preset (Tier 3), all variables cascade automatically into every component.
            </div>
          </details>
          <details class="ui-accordion">
            <summary class="ui-accordion-summary">Are JavaScript runtimes required?</summary>
            <div class="ui-accordion-content">
              No. The styling library is 100% pure CSS and native HTML standards, making it completely framework-agnostic.
            </div>
          </details>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Exclusive Accordion (&lt;details name&gt;)</span>
          ${copyControls(accordionGroupSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-accordion-group">
            <details class="ui-accordion" name="ws-accordion-demo" open>
              <summary class="ui-accordion-summary">Tokens</summary>
              <div class="ui-accordion-content">
                Primitives feed semantic contracts, which themes override. Open one of the other panels and this one closes itself — the shared <code>name</code> does it, no script.
              </div>
            </details>
            <details class="ui-accordion" name="ws-accordion-demo">
              <summary class="ui-accordion-summary">Components</summary>
              <div class="ui-accordion-content">
                Every component reads Tier 2 tokens only, and keys its states off native or ARIA state so the visual never drifts from the accessibility state.
              </div>
            </details>
            <details class="ui-accordion" name="ws-accordion-demo">
              <summary class="ui-accordion-summary">Browser support</summary>
              <div class="ui-accordion-content">
                <code>&lt;details name&gt;</code> ships in Chrome/Edge 120, Safari 17.2 and Firefox 130. Older engines ignore the attribute and the panels open independently; the kit ships no shim for that.
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireDialog,
};
