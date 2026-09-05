import type { Section } from './section';
import { copyControls } from './shared';

const tableSnippet = `<div class="ui-table-wrap">
  <table class="ui-table">
    <caption>Active sessions</caption>
    <thead>
      <tr>
        <th aria-sort="ascending"><button class="ui-table-sort">Player</button></th>
        <th aria-sort="none"><button class="ui-table-sort">World</button></th>
        <th data-type="number">Playtime (h)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>ashenmoor</td><td>overworld</td><td data-type="number">128.4</td></tr>
      <tr aria-selected="true"><td>quillfeather</td><td>the_nether</td><td data-type="number">96.0</td></tr>
    </tbody>
    <tfoot>
      <tr><td colspan="2">2 players</td><td data-type="number">224.4</td></tr>
    </tfoot>
  </table>
</div>`;

const tableStickySnippet = `<div class="ui-table-wrap" style="max-height: 240px;">
  <table class="ui-table" data-sticky-header data-density="compact" style="min-width: 1240px;">
    <thead>…</thead>
    <tbody>…</tbody>
  </table>
</div>`;

// Wide log rows for the sticky-header / horizontal-scroll preview.
const stickyRows = [
  ['12:04:51', 'node-a1', 'us-east-1', 'survival-main', 'snapshot', 'scheduler', 'world backup written to cold storage', 'ok', '1842'],
  ['12:04:38', 'node-a1', 'us-east-1', 'survival-main', 'chunk-load', 'engine', 'preloaded 128 chunks around spawn', 'ok', '311'],
  ['12:03:12', 'node-b2', 'eu-west-2', 'creative-flat', 'join', 'quillfeather', 'connected from the lobby', 'ok', '46'],
  ['12:02:55', 'node-b2', 'eu-west-2', 'creative-flat', 'gc', 'runtime', 'young generation collection completed', 'ok', '87'],
  ['12:01:07', 'node-c3', 'ap-south-1', 'hardcore-s4', 'restart', 'scheduler', 'scheduled maintenance window applied', 'ok', '9204'],
  ['11:59:44', 'node-c3', 'ap-south-1', 'hardcore-s4', 'config', 'redgrave', 'view-distance lowered to 10', 'ok', '12'],
]
  .map(
    (cells) =>
      '<tr>' +
      cells
        .map((v, i) => (i === cells.length - 1 ? `<td data-type="number">${v}</td>` : `<td>${v}</td>`))
        .join('') +
      '</tr>',
  )
  .join('\n                ');

// Cycles a sortable column through ascending -> descending -> none and resets
// its siblings. The kit ships no runtime; this drives the preview only.
function wireTableSort(root: HTMLElement) {
  const next: Record<string, string> = {
    none: 'ascending',
    ascending: 'descending',
    descending: 'none',
  };

  root.querySelectorAll<HTMLElement>('.ui-table thead').forEach((head) => {
    head.querySelectorAll<HTMLButtonElement>('.ui-table-sort').forEach((btn) => {
      const cell = btn.closest('th');
      if (!cell) return;
      btn.addEventListener('click', () => {
        const current = cell.getAttribute('aria-sort') ?? 'none';
        const value = next[current] ?? 'ascending';
        head.querySelectorAll('th[aria-sort]').forEach((other) => {
          if (other !== cell) other.setAttribute('aria-sort', 'none');
        });
        cell.setAttribute('aria-sort', value);
      });
    });
  });
}

export const tableSection: Section = {
  id: 'table',
  title: 'Table (.ui-table)',
  html: `    <!-- Table Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Table (.ui-table)</h2>
      <p class="ws-section-desc">The native <code>&lt;table&gt;</code> styled to Open UI's table parts (title, header, column, row, cell, footer). Sorting is keyed off <code>aria-sort</code> on the header cell, selection off <code>aria-selected</code> on the row; density and stripes/borders come from <code>data-density</code> and <code>data-variant</code>. Wide tables scroll inside <code>.ui-table-wrap</code>. Ships no runtime — the workshop cycles the sort state for the demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sortable Header, Selected Row &amp; Numeric Column</span>
          ${copyControls(tableSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap">
            <table class="ui-table">
              <caption>Active sessions</caption>
              <thead>
                <tr>
                  <th aria-sort="ascending"><button class="ui-table-sort">Player</button></th>
                  <th aria-sort="none"><button class="ui-table-sort">World</button></th>
                  <th aria-sort="none"><button class="ui-table-sort">Status</button></th>
                  <th data-type="number" aria-sort="none"><button class="ui-table-sort">Playtime (h)</button></th>
                </tr>
              </thead>
              <tbody>
                <tr><td>ashenmoor</td><td>overworld</td><td><span class="ui-badge" data-intent="success">online</span></td><td data-type="number">128.4</td></tr>
                <tr aria-selected="true"><td>quillfeather</td><td>the_nether</td><td><span class="ui-badge" data-intent="success">online</span></td><td data-type="number">96.0</td></tr>
                <tr><td>redgrave</td><td>overworld</td><td><span class="ui-badge" data-intent="warning">idle</span></td><td data-type="number">41.75</td></tr>
                <tr><td>tinwright</td><td>the_end</td><td><span class="ui-badge">offline</span></td><td data-type="number">7.2</td></tr>
              </tbody>
              <tfoot>
                <tr><td colspan="3">4 players</td><td data-type="number">273.35</td></tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Striped, Bordered &amp; Compact Density</span>
          ${copyControls('<table class="ui-table" data-variant="striped bordered" data-density="compact">…</table>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap">
            <table class="ui-table" data-variant="striped bordered" data-density="compact">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                  <th data-type="number">Line</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>level-name</td><td>world</td><td data-type="number">12</td></tr>
                <tr><td>max-players</td><td>20</td><td data-type="number">18</td></tr>
                <tr aria-selected="true"><td>difficulty</td><td>hard</td><td data-type="number">24</td></tr>
                <tr><td>view-distance</td><td>10</td><td data-type="number">31</td></tr>
                <tr><td>online-mode</td><td>true</td><td data-type="number">47</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Sticky Header &amp; Horizontal Scroll</span>
          ${copyControls(tableStickySnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap" style="max-height: 240px;">
            <table class="ui-table" data-sticky-header data-density="compact" style="min-width: 1240px;">
              <thead>
                <tr>
                  <th aria-sort="descending"><button class="ui-table-sort">Timestamp</button></th>
                  <th>Node</th>
                  <th>Region</th>
                  <th>Profile</th>
                  <th>Event</th>
                  <th>Actor</th>
                  <th>Detail</th>
                  <th>Result</th>
                  <th data-type="number">Duration (ms)</th>
                </tr>
              </thead>
              <tbody>
                ${stickyRows}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Empty State</span>
          ${copyControls('<tbody>\n  <tr><td class="ui-table-empty" colspan="3">Nobody online.</td></tr>\n</tbody>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-wide">
          <div class="ui-table-wrap">
            <table class="ui-table">
              <thead>
                <tr><th>Player</th><th>World</th><th data-type="number">Playtime (h)</th></tr>
              </thead>
              <tbody>
                <tr><td class="ui-table-empty" colspan="3">Nobody online.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireTableSort,
};
