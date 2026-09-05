import type { Section } from './section';
import { copyControls, toastCloseIcon, toastIcons } from './shared';

// Renders one static .ui-toast card for the intent gallery (intent "" = neutral).
function staticToast(intent: string, title: string, message: string): string {
  const icon = toastIcons[intent] ?? toastIcons[''];
  return `<div class="ui-toast"${intent ? ` data-intent="${intent}"` : ''} role="status">
            <span class="ui-toast-icon">${icon}</span>
            <div class="ui-toast-content">
              <p class="ui-toast-title">${title}</p>
              <p class="ui-toast-message">${message}</p>
            </div>
            <button class="ui-toast-close" aria-label="Dismiss">${toastCloseIcon}</button>
          </div>`;
}

const toastSnippet = `<div class="ui-toast" data-intent="success" role="status">
  <span class="ui-toast-icon"><svg>…</svg></span>
  <div class="ui-toast-content">
    <p class="ui-toast-title">Deployment complete</p>
    <p class="ui-toast-message">All 12 service nodes are live on the new release.</p>
  </div>
  <button class="ui-toast-close" aria-label="Dismiss">✕</button>
</div>`;

// Drives the toast previews: dismissing the static cards, and spawning live
// toasts (auto-dismissing after 4s) into a shared bottom-end region.
function wireToasts(root: HTMLElement) {
  const dismiss = (toast: HTMLElement) => {
    if (toast.getAttribute('data-state') === 'closing') return;
    toast.setAttribute('data-state', 'closing');
    const remove = () => toast.remove();
    toast.addEventListener('animationend', remove, { once: true });
    setTimeout(remove, 400); // fallback when reduced-motion cancels the animation
  };

  root.querySelectorAll<HTMLButtonElement>('.ui-toast-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      const toast = btn.closest<HTMLElement>('.ui-toast');
      if (toast) dismiss(toast);
    });
  });

  // Scoped to the matrix root so switching tabs (which replaces the root's
  // markup) takes the region and any live toasts with it.
  const region = document.createElement('div');
  region.className = 'ui-toast-region';
  region.setAttribute('data-position', 'bottom-end');
  root.appendChild(region);

  const copy: Record<string, { title: string; message: string }> = {
    success: { title: 'Saved', message: 'Your changes have been published.' },
    danger: { title: 'Something went wrong', message: 'The request failed — please retry.' },
    info: { title: 'Heads up', message: 'A new version of the workspace is available.' },
  };

  root.querySelectorAll<HTMLButtonElement>('[data-toast]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const intent = btn.dataset.toast || '';
      const { title, message } = copy[intent] ?? { title: 'Notification', message: 'Something happened.' };
      const toast = document.createElement('div');
      toast.className = 'ui-toast';
      if (intent) toast.setAttribute('data-intent', intent);
      toast.setAttribute('role', intent === 'danger' ? 'alert' : 'status');
      toast.innerHTML =
        `<span class="ui-toast-icon">${toastIcons[intent] ?? toastIcons['']}</span>` +
        `<div class="ui-toast-content"><p class="ui-toast-title">${title}</p>` +
        `<p class="ui-toast-message">${message}</p></div>` +
        `<button class="ui-toast-close" aria-label="Dismiss">${toastCloseIcon}</button>`;
      region.appendChild(toast);
      toast.querySelector('.ui-toast-close')?.addEventListener('click', () => dismiss(toast));
      setTimeout(() => { if (toast.isConnected) dismiss(toast); }, 4000);
    });
  });
}

export const toastSection: Section = {
  html: `    <!-- Toast Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Toast (.ui-toast)</h2>
      <p class="ws-section-desc">Transient notification cards that stack in a fixed <code>.ui-toast-region</code> anchored to a viewport corner. Intent rides the leading edge and the icon. Ships no runtime — apps add/remove toasts; CSS provides the entrance animation and a <code>data-state="closing"</code> hook for the exit.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents</span>
          ${copyControls(toastSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch;">
          ${staticToast('success', 'Deployment complete', 'All 12 service nodes are live on the new release.')}
          ${staticToast('info', 'Sync in progress', 'Fetching upstream changes from origin/main.')}
          ${staticToast('warning', 'Storage almost full', 'You have used 92% of your workspace quota.')}
          ${staticToast('danger', 'Upload failed', 'The connection was reset before the file finished.')}
          ${staticToast('', 'Draft saved', 'Your changes are saved locally.')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Live — spawn into a region (bottom-end)</span>
          ${copyControls('<div class="ui-toast-region" data-position="bottom-end"></div>\n<!-- app appends .ui-toast nodes here, then removes them -->')}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-intent="success" data-toast="success">Show success</button>
          <button class="ui-btn" data-variant="outline" data-intent="danger" data-toast="danger">Show error</button>
          <button class="ui-btn" data-variant="outline" data-toast="info">Show info</button>
        </div>
      </div>
    </section>`,
  wire: wireToasts,
};
