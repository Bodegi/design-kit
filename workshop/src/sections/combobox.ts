import type { Section } from './section';
import { copyControls } from './shared';

const comboboxSnippet = `<div class="ui-combobox">
  <input class="ui-input" role="combobox" aria-expanded="false"
    aria-controls="region-listbox" aria-autocomplete="list"
    aria-label="Deploy region" autocomplete="off" placeholder="Search regions&#8230;">
  <button class="ui-combobox-clear" type="button" aria-label="Clear region" hidden></button>
  <button class="ui-combobox-trigger" type="button" aria-label="Show regions" tabindex="-1"></button>
  <div class="ui-combobox-listbox" id="region-listbox" popover role="listbox" aria-label="Deploy region">
    <div class="ui-combobox-group" role="group" aria-labelledby="grp-americas">
      <span class="ui-combobox-group-label" id="grp-americas">Americas</span>
      <div class="ui-combobox-option" role="option" id="opt-use1" aria-selected="true">
        <span class="ui-combobox-option-label">us-east-1</span>
        <span class="ui-combobox-option-meta">42</span>
      </div>
    </div>
  </div>
</div>`;

const comboboxListboxSnippet = `<div class="ui-combobox-listbox" role="listbox" aria-label="Regions">
  <div class="ui-combobox-option" role="option" aria-selected="true"><span class="ui-combobox-option-label">us-<mark>east</mark>-1</span></div>
  <div class="ui-combobox-option" role="option" aria-selected="false" data-active><span class="ui-combobox-option-label">us-w<mark>est</mark>-2</span></div>
  <div class="ui-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ui-combobox-option-label">sa-east-1</span></div>
  <span class="ui-combobox-empty">No regions match.</span>
</div>`;

type ComboboxRegion = { group: string; value: string; count: number; disabled?: boolean };

const comboboxRegions: ComboboxRegion[] = [
  { group: 'Americas', value: 'us-east-1', count: 42 },
  { group: 'Americas', value: 'us-west-2', count: 18 },
  { group: 'Americas', value: 'sa-east-1', count: 0, disabled: true },
  { group: 'Europe', value: 'eu-west-1', count: 27 },
  { group: 'Europe', value: 'eu-central-1', count: 12 },
  { group: 'Europe', value: 'eu-north-1', count: 5 },
  { group: 'Asia Pacific', value: 'ap-southeast-2', count: 9 },
  { group: 'Asia Pacific', value: 'ap-northeast-1', count: 21 },
];

// Splits a label around the typed query so the matched run can be wrapped in a
// <mark>. Returns the three pieces rather than HTML, so the caller can set them
// as text and never build markup out of user input.
function comboboxSplitMatch(label: string, query: string): [string, string, string] {
  if (!query) return [label, '', ''];
  const at = label.toLowerCase().indexOf(query.toLowerCase());
  if (at < 0) return [label, '', ''];
  return [label.slice(0, at), label.slice(at, at + query.length), label.slice(at + query.length)];
}

// Drives the combobox demo: filtering, the popover, the data-active cursor the
// app owns (aria-activedescendant keeps DOM focus in the input), and selection.
// The kit ships no runtime — all of this belongs to the consuming app.
function wireCombobox(root: HTMLElement) {
  const combobox = root.querySelector<HTMLElement>('#ws-combobox');
  const input = root.querySelector<HTMLInputElement>('#ws-combobox-input');
  const listbox = root.querySelector<HTMLElement>('#ws-combobox-listbox');
  if (!combobox || !input || !listbox) return;

  const trigger = combobox.querySelector<HTMLButtonElement>('.ui-combobox-trigger');
  const clear = combobox.querySelector<HTMLButtonElement>('.ui-combobox-clear');
  let selected = 'us-east-1';
  let activeIndex = 0;

  const enabledOptions = () =>
    Array.from(listbox.querySelectorAll<HTMLElement>('.ui-combobox-option:not([aria-disabled="true"])'));

  const render = (query: string) => {
    const matches = comboboxRegions.filter((r) => r.value.toLowerCase().includes(query.toLowerCase()));
    listbox.textContent = '';

    if (!matches.length) {
      const empty = document.createElement('span');
      empty.className = 'ui-combobox-empty';
      empty.textContent = `No regions match “${query}”.`;
      listbox.append(empty);
      input.removeAttribute('aria-activedescendant');
      return;
    }

    let currentGroup = '';
    let group: HTMLElement | null = null;
    matches.forEach((region, index) => {
      if (region.group !== currentGroup) {
        currentGroup = region.group;
        group = document.createElement('div');
        group.className = 'ui-combobox-group';
        group.setAttribute('role', 'group');
        group.setAttribute('aria-label', region.group);
        const label = document.createElement('span');
        label.className = 'ui-combobox-group-label';
        label.textContent = region.group;
        group.append(label);
        listbox.append(group);
      }

      const option = document.createElement('div');
      option.className = 'ui-combobox-option';
      option.id = `ws-combobox-opt-${index}`;
      option.setAttribute('role', 'option');
      option.dataset.value = region.value;
      option.setAttribute('aria-selected', region.value === selected ? 'true' : 'false');
      if (region.disabled) option.setAttribute('aria-disabled', 'true');

      const optionLabel = document.createElement('span');
      optionLabel.className = 'ui-combobox-option-label';
      const [before, hit, after] = comboboxSplitMatch(region.value, query);
      optionLabel.append(before);
      if (hit) {
        const mark = document.createElement('mark');
        mark.textContent = hit;
        optionLabel.append(mark, after);
      }
      option.append(optionLabel);

      const meta = document.createElement('span');
      meta.className = 'ui-combobox-option-meta';
      meta.textContent = String(region.count);
      option.append(meta);

      if (!region.disabled) {
        // Keep DOM focus in the input: a mousedown inside the listbox would
        // otherwise blur it and close the popover before the click lands.
        option.addEventListener('mousedown', (e) => e.preventDefault());
        option.addEventListener('click', () => choose(region.value));
      }
      group?.append(option);
    });

    setActive(0);
  };

  const setActive = (index: number) => {
    const options = enabledOptions();
    if (!options.length) return;
    activeIndex = (index + options.length) % options.length;
    options.forEach((o, i) => o.toggleAttribute('data-active', i === activeIndex));
    const active = options[activeIndex];
    input.setAttribute('aria-activedescendant', active.id);
    active.scrollIntoView({ block: 'nearest' });
  };

  const open = () => {
    if (listbox.matches(':popover-open')) return;
    listbox.showPopover();
    input.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    if (listbox.matches(':popover-open')) listbox.hidePopover();
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };

  const choose = (value: string) => {
    selected = value;
    input.value = value;
    syncClear();
    render(value);
    close();
    input.focus();
  };

  const syncClear = () => {
    if (clear) clear.hidden = input.value === '';
  };

  input.addEventListener('input', () => {
    syncClear();
    render(input.value);
    open();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!listbox.matches(':popover-open')) {
        render(input.value);
        open();
        return;
      }
      setActive(activeIndex + (e.key === 'ArrowDown' ? 1 : -1));
    } else if (e.key === 'Home' || e.key === 'End') {
      if (!listbox.matches(':popover-open')) return;
      e.preventDefault();
      setActive(e.key === 'Home' ? 0 : enabledOptions().length - 1);
    } else if (e.key === 'Enter') {
      const active = enabledOptions()[activeIndex];
      if (listbox.matches(':popover-open') && active) {
        e.preventDefault();
        choose(active.dataset.value ?? '');
      }
    }
  });

  // The UA closes the popover on Escape and on a click outside; mirror that
  // back onto aria-expanded so the chevron and the a11y state stay in step.
  listbox.addEventListener('toggle', (e) => {
    input.setAttribute('aria-expanded', (e as ToggleEvent).newState === 'open' ? 'true' : 'false');
  });

  trigger?.addEventListener('click', () => {
    if (listbox.matches(':popover-open')) {
      close();
    } else {
      render(input.value);
      open();
    }
    input.focus();
  });

  clear?.addEventListener('click', () => {
    input.value = '';
    syncClear();
    render('');
    input.focus();
  });

  input.value = selected;
  syncClear();
  render('');
}

export const comboboxSection: Section = {
  html: `    <!-- Combobox Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Combobox (.ui-combobox)</h2>
      <p class="ws-section-desc">A text field that filters a listbox. Open UI's explainer proposes a native <code>&lt;input list&gt;</code> + <code>&lt;datalist&gt;</code> with <code>:active-option</code> and <code>:filtered</code>; until that ships this is the ARIA pattern with the same anatomy — an <code>.ui-input</code> carrying <code>role="combobox"</code>, an optional <code>.ui-combobox-clear</code> and <code>.ui-combobox-trigger</code> over it, and a <code>.ui-combobox-listbox</code> on a native <code>[popover]</code> (so Escape and light-dismiss are the browser's). Because <code>aria-activedescendant</code> keeps focus in the input, the highlighted option is marked with <code>data-active</code> rather than <code>:focus</code>. Ships no runtime — the workshop does the filtering, the arrow keys, and the popover toggling.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Filterable Select — type, arrow, Enter</span>
          ${copyControls(comboboxSnippet)}
        </div>
        <div class="ws-preview-canvas" style="min-height: 300px; align-items: flex-start;">
          <div class="ui-combobox" id="ws-combobox">
            <input class="ui-input" id="ws-combobox-input" role="combobox" aria-expanded="false"
              aria-controls="ws-combobox-listbox" aria-autocomplete="list" aria-label="Deploy region"
              autocomplete="off" placeholder="Search regions…">
            <button class="ui-combobox-clear" type="button" aria-label="Clear region" hidden></button>
            <button class="ui-combobox-trigger" type="button" aria-label="Show regions" tabindex="-1"></button>
            <div class="ui-combobox-listbox" id="ws-combobox-listbox" popover role="listbox" aria-label="Deploy region"></div>
          </div>
          <div class="ui-combobox" data-size="sm">
            <input class="ui-input" role="combobox" aria-expanded="false" aria-autocomplete="list"
              aria-label="Small combobox" autocomplete="off" placeholder="data-size=&quot;sm&quot;" disabled>
            <button class="ui-combobox-trigger" type="button" aria-label="Show options" tabindex="-1" disabled></button>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Option States, Groups &amp; Match Highlight</span>
          ${copyControls(comboboxListboxSnippet)}
        </div>
        <div class="ws-preview-canvas" style="align-items: flex-start;">
          <div class="ui-combobox-listbox" role="listbox" aria-label="Option states" style="width: 280px;">
            <div class="ui-combobox-group" role="group" aria-labelledby="ws-cb-grp-a">
              <span class="ui-combobox-group-label" id="ws-cb-grp-a">Americas</span>
              <div class="ui-combobox-option" role="option" aria-selected="true"><span class="ui-combobox-option-label">us-<mark>east</mark>-1</span><span class="ui-combobox-option-meta">42</span></div>
              <div class="ui-combobox-option" role="option" aria-selected="false" data-active><span class="ui-combobox-option-label">us-w<mark>est</mark>-2</span><span class="ui-combobox-option-meta">18</span></div>
              <div class="ui-combobox-option" role="option" aria-selected="false" aria-disabled="true"><span class="ui-combobox-option-label">sa-east-1</span><span class="ui-combobox-option-meta">0</span></div>
            </div>
            <div class="ui-combobox-group" role="group" aria-labelledby="ws-cb-grp-b">
              <span class="ui-combobox-group-label" id="ws-cb-grp-b">Europe</span>
              <div class="ui-combobox-option" role="option" aria-selected="false"><span class="ui-combobox-option-label">eu-w<mark>est</mark>-1</span><span class="ui-combobox-option-meta">27</span></div>
            </div>
          </div>
          <div class="ui-combobox-listbox" data-size="sm" role="listbox" aria-label="No matches" style="width: 280px;">
            <span class="ui-combobox-empty">No regions match “zz”.</span>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireCombobox,
};
