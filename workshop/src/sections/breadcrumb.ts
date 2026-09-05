import type { Section } from './section';
import { copyControls } from './shared';

// Expands a collapsed breadcrumb: reveal the items the ellipsis stands for and
// retire the button. The kit ships no runtime — the app owns this toggle.
function wireBreadcrumbs(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('.ui-breadcrumb-ellipsis').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest<HTMLElement>('.ui-breadcrumb-item');
      const list = button.closest<HTMLElement>('.ui-breadcrumb-list');
      if (!item || !list) return;
      list.querySelectorAll<HTMLElement>('.ui-breadcrumb-item[hidden]').forEach((hiddenItem) => {
        hiddenItem.hidden = false;
      });
      button.setAttribute('aria-expanded', 'true');
      item.hidden = true;
    });
  });
}

export const breadcrumbSection: Section = {
  html: `    <!-- Breadcrumb Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Breadcrumb (.ui-breadcrumb)</h2>
      <p class="ws-section-desc">A <code>nav</code> wrapping an <code>ol.ui-breadcrumb-list</code> of <code>.ui-breadcrumb-item</code>. Separators are drawn by CSS on <code>li + li</code>, so the trail reads as a plain list to screen readers. The page you are on is a <code>span.ui-breadcrumb-link</code> with <code>aria-current="page"</code> — main text, not a link.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Trail, Current Page &amp; Sizes</span>
          ${copyControls('<nav class=\"ui-breadcrumb\" aria-label=\"Breadcrumb\">\n  <ol class=\"ui-breadcrumb-list\">\n    <li class=\"ui-breadcrumb-item\">\n      <a class=\"ui-breadcrumb-link\" href=\"#\"><span class=\"ui-breadcrumb-icon\">…</span>Home</a>\n    </li>\n    <li class=\"ui-breadcrumb-item\"><a class=\"ui-breadcrumb-link\" href=\"#\">Library</a></li>\n    <li class=\"ui-breadcrumb-item\"><a class=\"ui-breadcrumb-link\" href=\"#\">Civilizations</a></li>\n    <li class=\"ui-breadcrumb-item\">\n      <span class=\"ui-breadcrumb-link\" aria-current=\"page\">Bronze Age</span>\n    </li>\n  </ol>\n</nav>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb" data-size="sm">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Separators (chevron / slash / dot)</span>
          ${copyControls('<nav class=\"ui-breadcrumb\" aria-label=\"Breadcrumb\" data-separator=\"slash\">…</nav>\n<nav class=\"ui-breadcrumb\" aria-label=\"Breadcrumb\" data-separator=\"dot\">…</nav>\n<!-- no data-separator = chevron -->')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb" data-separator="slash">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb" data-separator="dot">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Collapsed Middle &amp; Long Labels</span>
          ${copyControls('<li class=\"ui-breadcrumb-item\">\n  <button type=\"button\" class=\"ui-breadcrumb-ellipsis\"\n          aria-expanded=\"false\" aria-label=\"Show 2 hidden levels\">…</button>\n</li>\n<li class=\"ui-breadcrumb-item\" hidden><a class=\"ui-breadcrumb-link\" href=\"#\">Library</a></li>\n\n<!-- long label: truncates at --ui-breadcrumb-label-max (20ch) -->\n<a class=\"ui-breadcrumb-link\" href=\"#\">The Late Bronze Age Collapse, Revisited</a>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><button type="button" class="ui-breadcrumb-ellipsis" aria-expanded="false" aria-label="Show 2 hidden levels">…</button></li>
            <li class="ui-breadcrumb-item" hidden><a class="ui-breadcrumb-link" href="#">Library</a></li>
            <li class="ui-breadcrumb-item" hidden><a class="ui-breadcrumb-link" href="#">Civilizations</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Bronze Age</span></li>
            </ol>
          </nav>
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <ol class="ui-breadcrumb-list">
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#"><span class="ui-breadcrumb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/></svg></span>Home</a></li>
            <li class="ui-breadcrumb-item"><a class="ui-breadcrumb-link" href="#" title="The Late Bronze Age Collapse, Revisited">The Late Bronze Age Collapse, Revisited</a></li>
            <li class="ui-breadcrumb-item"><span class="ui-breadcrumb-link" aria-current="page">Sea Peoples</span></li>
            </ol>
          </nav>
        </div>
      </div>
    </section>`,
  wire: wireBreadcrumbs,
};
