import type { Section } from './section';
import { copyControls } from './shared';

// The kit ships no runtime, so the workshop builds one static month of markup
// and moves aria-selected on click. No month math: the demos never change
// month, which is enough to show every day state the CSS reads.
const DATEPICKER_WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type DatepickerMonth = {
  label: string;
  /** Trailing days of the previous month that fill the first row. */
  lead: number[];
  days: number;
  /** Leading days of the next month that fill the last row. */
  trail: number[];
  today?: number;
  selected?: number;
  disabled?: number[];
  /** Inclusive [start, end] day numbers of a selected range. */
  range?: [number, number];
};

function datepickerHeader(title: string, titleIsButton: boolean): string {
  const heading = titleIsButton
    ? `<button class="ui-datepicker-title" type="button" aria-label="Choose month and year">${title}</button>`
    : `<span class="ui-datepicker-title">${title}</span>`;
  return `
    <div class="ui-datepicker-header">
      <button class="ui-btn ui-datepicker-prev" data-variant="ghost" data-size="icon-sm" type="button" aria-label="Previous month">&lsaquo;</button>
      ${heading}
      <button class="ui-btn ui-datepicker-next" data-variant="ghost" data-size="icon-sm" type="button" aria-label="Next month">&rsaquo;</button>
    </div>`;
}

function datepickerGrid(month: DatepickerMonth): string {
  const cells = [
    ...month.lead.map((day) => datepickerDay(day, month, true)),
    ...Array.from({ length: month.days }, (_, i) => datepickerDay(i + 1, month, false)),
    ...month.trail.map((day) => datepickerDay(day, month, true)),
  ];

  const rows: string[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(`<tr>${cells.slice(i, i + 7).join('')}</tr>`);
  }

  return `
    <table class="ui-datepicker-grid" role="grid" aria-label="${month.label}">
      <thead><tr>${DATEPICKER_WEEKDAYS.map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
      <tbody>${rows.join('')}</tbody>
    </table>`;
}

function datepickerDay(day: number, month: DatepickerMonth, outside: boolean): string {
  const attrs: string[] = [];
  if (outside) attrs.push('data-outside');
  if (!outside && month.disabled?.includes(day)) attrs.push('disabled');
  if (!outside && month.today === day) attrs.push('aria-current="date"');
  if (!outside && month.selected === day) attrs.push('aria-selected="true"');

  if (!outside && month.range) {
    const [start, end] = month.range;
    if (day === start) attrs.push('data-range="start"');
    else if (day === end) attrs.push('data-range="end"');
    else if (day > start && day < end) attrs.push('data-range="middle"');
  }

  return `<td><button class="ui-datepicker-day" type="button" ${attrs.join(' ')}>${day}</button></td>`;
}

function wireDatepicker(root: HTMLElement) {
  const panel = root.querySelector<HTMLElement>('#ws-datepicker');

  panel?.querySelectorAll<HTMLButtonElement>('.ui-datepicker-day').forEach((day) => {
    day.addEventListener('click', () => {
      if (day.disabled || day.hasAttribute('data-outside')) return;
      panel
        .querySelectorAll('.ui-datepicker-day[aria-selected="true"]')
        .forEach((prev) => prev.removeAttribute('aria-selected'));
      day.setAttribute('aria-selected', 'true');
    });
  });

  root.querySelectorAll<HTMLButtonElement>('.ui-datepicker-preset[aria-pressed]').forEach((preset) => {
    preset.addEventListener('click', () => {
      preset.setAttribute('aria-pressed', preset.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
  });
}

const datepickerSnippet = `<div class="ui-panel ui-datepicker">
  <div class="ui-datepicker-header">
    <button class="ui-btn ui-datepicker-prev" data-variant="ghost" data-size="icon-sm" aria-label="Previous month">‹</button>
    <button class="ui-datepicker-title">September 2026</button>
    <button class="ui-btn ui-datepicker-next" data-variant="ghost" data-size="icon-sm" aria-label="Next month">›</button>
  </div>
  <table class="ui-datepicker-grid" role="grid" aria-label="September 2026">
    <thead><tr><th scope="col">Su</th>…<th scope="col">Sa</th></tr></thead>
    <tbody>
      <tr>
        <td><button class="ui-datepicker-day" data-outside>30</button></td>
        <td><button class="ui-datepicker-day" disabled>1</button></td>
        <td><button class="ui-datepicker-day" aria-current="date">5</button></td>
        <td><button class="ui-datepicker-day" aria-selected="true">17</button></td>
      </tr>
    </tbody>
  </table>
  <div class="ui-datepicker-footer">
    <button class="ui-btn" data-variant="ghost" data-size="sm">Clear</button>
    <button class="ui-btn" data-variant="outline" data-size="sm">Today</button>
  </div>
</div>`;

const datepickerRangeSnippet = `<div class="ui-panel ui-datepicker">
  <ul class="ui-datepicker-presets">
    <li><button class="ui-datepicker-preset" aria-pressed="true">This month</button></li>
  </ul>
  <!-- header … -->
  <td><button class="ui-datepicker-day" data-range="start">8</button></td>
  <td><button class="ui-datepicker-day" data-range="middle">9</button></td>
  <td><button class="ui-datepicker-day" data-range="end">16</button></td>
</div>`;

export const datepickerSection: Section = {
  html: `    <!-- Datepicker Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Datepicker (.ui-datepicker)</h2>
      <p class="ws-section-desc">No browser ships a stylable native date picker — the calendar behind <code>input[type="date"]</code> is a UA popup closed to CSS in every engine — so the kit styles the calendar anatomy <em>the app renders</em> and the app owns all the behavior: month math, keyboard navigation, selection, range logic. Open UI has only a research page for the datepicker, so the parts follow its vocabulary (header, title, previous/next, grid, day, footer) over a native <code>&lt;table role="grid"&gt;</code>. Every day state rides ARIA state on the <code>button.ui-datepicker-day</code>: <code>aria-selected="true"</code> fills, <code>aria-current="date"</code> rings today without filling it, <code>:disabled</code> is out of range, <code>[data-outside]</code> is an adjacent month, and <code>[data-range="start|middle|end"]</code> spans a range. The kit styles calendar anatomy only and the host markup supplies the surface by composition: <code>class="ui-panel ui-datepicker"</code> inline, <code>class="ui-popover ui-datepicker" popover</code> floating (which also brings the anchor positioning under the invoker). Ships no runtime — the workshop moves <code>aria-selected</code> for these demos.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Single Month — today, selected, disabled, outside days</span>
          ${copyControls(datepickerSnippet)}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-start;">
          <div class="ui-panel ui-datepicker" id="ws-datepicker">
            ${datepickerHeader('September 2026', true)}
            ${datepickerGrid({
              label: 'September 2026',
              lead: [30, 31],
              days: 30,
              trail: [1, 2, 3],
              today: 5,
              selected: 17,
              disabled: [1, 2, 3, 4],
            })}
            <div class="ui-datepicker-footer">
              <button class="ui-btn" data-variant="ghost" data-size="sm" type="button">Clear</button>
              <button class="ui-btn" data-variant="outline" data-size="sm" type="button">Today</button>
            </div>
          </div>
          <div class="ui-panel ui-datepicker" data-size="sm">
            ${datepickerHeader('September 2026', false)}
            ${datepickerGrid({
              label: 'September 2026, compact',
              lead: [30, 31],
              days: 30,
              trail: [1, 2, 3],
              today: 5,
              selected: 5,
            })}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Range &amp; Quick-range Presets</span>
          ${copyControls(datepickerRangeSnippet)}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-start;">
          <div class="ui-panel ui-datepicker">
            <ul class="ui-datepicker-presets">
              <li><button class="ui-datepicker-preset" type="button" aria-pressed="false">Last 7 days</button></li>
              <li><button class="ui-datepicker-preset" type="button" aria-pressed="true">This month</button></li>
              <li><button class="ui-datepicker-preset" type="button" aria-pressed="false">This quarter</button></li>
            </ul>
            ${datepickerHeader('September 2026', true)}
            ${datepickerGrid({
              label: 'September 2026 range',
              lead: [30, 31],
              days: 30,
              trail: [1, 2, 3],
              today: 5,
              range: [8, 16],
            })}
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native Trigger Field &amp; Popover Panel</span>
          ${copyControls('<input class="ui-input" type="date" value="2026-09-17">')}
        </div>
        <div class="ws-preview-canvas" style="min-height: 400px; align-items: flex-start; gap: var(--space-4);">
          <label class="ui-field" style="max-width: 200px;">
            <span class="ui-label">Ship date</span>
            <input class="ui-input" type="date" value="2026-09-17">
          </label>
          <label class="ui-field" style="max-width: 200px;">
            <span class="ui-label">Locked</span>
            <input class="ui-input" type="date" value="2026-09-17" disabled>
          </label>
          <div>
            <button class="ui-btn" data-variant="outline" popovertarget="ws-datepicker-popover" type="button">Pick a date</button>
            <div id="ws-datepicker-popover" popover class="ui-popover ui-datepicker">
              ${datepickerHeader('September 2026', true)}
              ${datepickerGrid({
                label: 'September 2026 popover',
                lead: [30, 31],
                days: 30,
                trail: [1, 2, 3],
                today: 5,
                selected: 17,
              })}
            </div>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireDatepicker,
};
