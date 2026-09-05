import { sections } from './sections';
import { htmlToJsx, wirePressButtons } from './sections/shared';
import { showToast } from './toast';

export function renderComponentMatrix(container: HTMLElement) {
  container.innerHTML = `\n${sections.map((section) => section.html).join('\n\n')}\n  `;

  // Attach code copy listeners (HTML verbatim, or transformed to JSX)
  container.querySelectorAll<HTMLButtonElement>('.ws-copy-code-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const snippet = btn.dataset.snippet;
      if (!snippet) return;
      const jsx = btn.dataset.format === 'jsx';
      navigator.clipboard.writeText(jsx ? htmlToJsx(snippet) : snippet);
      showToast(jsx ? 'Copied JSX to clipboard!' : 'Copied HTML markup to clipboard!');
    });
  });

  // Every section carrying aria-pressed buttons gets them from one pass here, so
  // a section's own wiring only adds what the press toggle does not already do.
  wirePressButtons(container);

  for (const section of sections) section.wire?.(container);
}
