// Helpers and snippets used by more than one section module.

export const svg = (paths: string) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const toastIcons: Record<string, string> = {
  success: svg('<path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/>'),
  info: svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  warning: svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>'),
  danger: svg('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'),
  '': svg('<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'),
};

export const toastCloseIcon = svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');

// Renders paired copy buttons; both carry the same HTML snippet and the JSX
// button transforms it on click, so there is a single source per preview.
export function copyControls(snippet: string): string {
  const enc = escapeAttr(snippet);
  return `
    <div class="ws-copy-controls">
      <button class="ws-copy-code-btn" data-format="html" data-snippet="${enc}">Copy HTML</button>
      <button class="ws-copy-code-btn" data-format="jsx" data-snippet="${enc}">Copy JSX</button>
    </div>`;
}

export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Minimal HTML->JSX for the attributes our snippets use. class/for are the only
// reserved-word renames; void elements are already self-closed in the source.
export function htmlToJsx(html: string): string {
  return html.replace(/\bclass=/g, 'className=').replace(/\bfor=/g, 'htmlFor=');
}

// Drives the press-button previews by moving aria-pressed, which is the only
// state the CSS reads. A standalone button cycles its own value (a mixed one
// resolves to true first, as a tri-state toggle does); a group marked
// data-ws-press="single" behaves like a segmented control — the clicked button
// becomes the pressed one and its siblings are released. The kit ships no
// runtime; this is demo wiring.
export function wirePressButtons(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('button.ui-btn[aria-pressed]').forEach((btn) => {
    const group = btn.closest<HTMLElement>('[data-ws-press="single"]');

    btn.addEventListener('click', () => {
      if (group) {
        group
          .querySelectorAll<HTMLButtonElement>('button.ui-btn[aria-pressed]')
          .forEach((sibling) => sibling.setAttribute('aria-pressed', String(sibling === btn)));
        return;
      }
      btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
}
