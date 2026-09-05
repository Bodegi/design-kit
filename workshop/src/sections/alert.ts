import type { Section } from './section';
import { copyControls, toastCloseIcon, toastIcons } from './shared';

// Renders one static .ui-alert (intent "" = neutral). Shares the toast icon set.
function staticAlert(
  intent: string,
  title: string,
  message: string,
  opts: { actions?: string; dismiss?: boolean } = {},
): string {
  const icon = toastIcons[intent] ?? toastIcons[''];
  return `<div class="ui-alert"${intent ? ` data-intent="${intent}"` : ''}>
            <span class="ui-alert-icon">${icon}</span>
            <div class="ui-alert-content">
              <p class="ui-alert-title">${title}</p>
              <p class="ui-alert-message">${message}</p>
              ${opts.actions ? `<div class="ui-alert-actions">${opts.actions}</div>` : ''}
            </div>
            ${opts.dismiss ? `<button class="ui-alert-close" aria-label="Dismiss">${toastCloseIcon}</button>` : ''}
          </div>`;
}

const alertSnippet = `<div class="ui-alert" data-intent="info">
  <span class="ui-alert-icon"><svg>…</svg></span>
  <div class="ui-alert-content">
    <p class="ui-alert-title">Scheduled maintenance</p>
    <p class="ui-alert-message">The workspace will be read-only on Sunday 02:00–03:00 UTC.</p>
  </div>
</div>`;

const alertActionsSnippet = `<div class="ui-alert" data-intent="warning">
  <span class="ui-alert-icon"><svg>…</svg></span>
  <div class="ui-alert-content">
    <p class="ui-alert-title">Storage almost full</p>
    <p class="ui-alert-message">You have used 92% of your workspace quota.</p>
    <div class="ui-alert-actions">
      <button class="ui-btn" data-size="sm" data-intent="primary">Upgrade plan</button>
      <button class="ui-btn" data-size="sm" data-variant="ghost">Manage storage</button>
    </div>
  </div>
  <button class="ui-alert-close" aria-label="Dismiss">✕</button>
</div>`;

// Dismisses inline alerts in the demo — alerts are persistent, so this is a
// hard remove (no exit animation, unlike toasts).
function wireAlerts(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-alert-close').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.ui-alert')?.remove());
  });
}

export const alertSection: Section = {
  id: 'alert',
  title: 'Alert / Callout (.ui-alert)',
  html: `    <!-- Alert / Callout Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Alert / Callout (.ui-alert)</h2>
      <p class="ws-section-desc">Persistent, inline message blocks — the standing counterpart to the transient toast. Intent tints the fill and border and colors the icon. Holds a title, message, optional <code>.ui-alert-actions</code>, and an optional <code>.ui-alert-close</code>. Apps add <code>role="alert"</code> / <code>aria-live</code> when an alert is injected in response to an action.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Intents</span>
          ${copyControls(alertSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch;">
          ${staticAlert('info', 'Scheduled maintenance', 'The workspace will be read-only on Sunday 02:00–03:00 UTC.')}
          ${staticAlert('success', 'Backup complete', 'Your last snapshot finished 4 minutes ago.')}
          ${staticAlert('warning', 'Storage almost full', 'You have used 92% of your workspace quota.')}
          ${staticAlert('danger', 'Deployment failed', 'The production cluster rejected the release — no nodes were updated.')}
          ${staticAlert('', 'Draft mode', 'Changes are private until you publish.')}
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">With actions &amp; dismiss</span>
          ${copyControls(alertActionsSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col" style="align-items: stretch;">
          ${staticAlert('warning', 'Storage almost full', 'You have used 92% of your workspace quota. Upgrade to keep syncing.', {
            actions: '<button class="ui-btn" data-size="sm" data-intent="primary">Upgrade plan</button><button class="ui-btn" data-size="sm" data-variant="ghost">Manage storage</button>',
            dismiss: true,
          })}
          ${staticAlert('', 'Cookie preferences', 'We use essential cookies only. You can review the details any time.', { dismiss: true })}
        </div>
      </div>
    </section>`,
  wire: wireAlerts,
};
