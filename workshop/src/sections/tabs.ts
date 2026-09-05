import type { Section } from './section';
import { copyControls } from './shared';

const tabsSnippet = `<div class="ui-tabs">
  <div class="ui-tablist" role="tablist" aria-label="Repository">
    <button class="ui-tab" role="tab" id="tab-ov" aria-controls="panel-ov" aria-selected="true">Overview</button>
    <button class="ui-tab" role="tab" id="tab-act" aria-controls="panel-act" aria-selected="false">Activity</button>
    <button class="ui-tab" role="tab" id="tab-set" aria-controls="panel-set" aria-selected="false">Settings <span class="ui-tab-trail">3</span></button>
    <button class="ui-tab" role="tab" aria-selected="false" disabled>Archived</button>
  </div>
  <div class="ui-tabpanel" role="tabpanel" id="panel-ov" aria-labelledby="tab-ov" tabindex="0">Overview content…</div>
  <div class="ui-tabpanel" role="tabpanel" id="panel-act" aria-labelledby="tab-act" tabindex="0" hidden>Activity content…</div>
  <div class="ui-tabpanel" role="tabpanel" id="panel-set" aria-labelledby="tab-set" tabindex="0" hidden>Settings content…</div>
</div>`;

// Select a tab within its group: sync aria-selected, toggle panel visibility,
// and move roving focus. Mirrors the Open UI tabs interaction (click + arrows).
function wireTabs(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>('.ui-tabs').forEach((group) => {
    const tabs = Array.from(group.querySelectorAll<HTMLButtonElement>('.ui-tab[role="tab"]'));

    const select = (tab: HTMLButtonElement, focus = false) => {
      if (tab.disabled) return;
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
        const panelId = t.getAttribute('aria-controls');
        const panel = panelId ? group.querySelector<HTMLElement>(`#${panelId}`) : null;
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    };

    const vertical = group.getAttribute('data-orientation') === 'vertical';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';

    tabs.forEach((tab) => {
      tab.tabIndex = tab.getAttribute('aria-selected') === 'true' ? 0 : -1;
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e) => {
        const enabled = tabs.filter((t) => !t.disabled);
        const pos = enabled.indexOf(tab);
        let target: HTMLButtonElement | undefined;
        if (e.key === nextKey) target = enabled[(pos + 1) % enabled.length];
        else if (e.key === prevKey) target = enabled[(pos - 1 + enabled.length) % enabled.length];
        else if (e.key === 'Home') target = enabled[0];
        else if (e.key === 'End') target = enabled[enabled.length - 1];
        if (target) {
          e.preventDefault();
          select(target, true);
        }
      });
    });
  });
}

export const tabsSection: Section = {
  html: `    <!-- Tabs Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Tabs (.ui-tabs)</h2>
      <p class="ws-section-desc">Open UI tabs: a <code>role="tablist"</code> of <code>.ui-tab</code> buttons over <code>.ui-tabpanel</code> regions. The selected tab is keyed off <code>aria-selected="true"</code>; panels toggle with the native <code>hidden</code> attribute. Ships no runtime — the workshop wires the switching for the demo.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Horizontal &amp; Active State</span>
          ${copyControls(tabsSnippet)}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tabs" style="width: 100%;">
            <div class="ui-tablist" role="tablist" aria-label="Repository">
              <button class="ui-tab" role="tab" id="ws-tab-ov" aria-controls="ws-panel-ov" aria-selected="true">Overview</button>
              <button class="ui-tab" role="tab" id="ws-tab-act" aria-controls="ws-panel-act" aria-selected="false">Activity</button>
              <button class="ui-tab" role="tab" id="ws-tab-set" aria-controls="ws-panel-set" aria-selected="false">Settings <span class="ui-tab-trail">3</span></button>
              <button class="ui-tab" role="tab" aria-selected="false" disabled>Archived</button>
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-panel-ov" aria-labelledby="ws-tab-ov" tabindex="0">
              System resources operating within nominal parameters. Average CPU load 18%.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-panel-act" aria-labelledby="ws-tab-act" tabindex="0" hidden>
              12 deploys this week. Last push to <code>main</code> 4 minutes ago.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-panel-set" aria-labelledby="ws-tab-set" tabindex="0" hidden>
              3 pending configuration changes require review before the next release.
            </div>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Vertical (data-orientation)</span>
          ${copyControls('<div class="ui-tabs" data-orientation="vertical">\n  <div class="ui-tablist" role="tablist" aria-orientation="vertical">…</div>\n  <div class="ui-tabpanel" role="tabpanel">…</div>\n</div>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-tabs" data-orientation="vertical" style="width: 100%;">
            <div class="ui-tablist" role="tablist" aria-orientation="vertical" aria-label="Account">
              <button class="ui-tab" role="tab" id="ws-vtab-prof" aria-controls="ws-vpanel-prof" aria-selected="true">Profile</button>
              <button class="ui-tab" role="tab" id="ws-vtab-sec" aria-controls="ws-vpanel-sec" aria-selected="false">Security</button>
              <button class="ui-tab" role="tab" id="ws-vtab-bill" aria-controls="ws-vpanel-bill" aria-selected="false">Billing</button>
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-vpanel-prof" aria-labelledby="ws-vtab-prof" tabindex="0">
              Display name, avatar, and public workspace handle.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-vpanel-sec" aria-labelledby="ws-vtab-sec" tabindex="0" hidden>
              Two-factor authentication and active session management.
            </div>
            <div class="ui-tabpanel" role="tabpanel" id="ws-vpanel-bill" aria-labelledby="ws-vtab-bill" tabindex="0" hidden>
              Plan, invoices, and the payment method on file.
            </div>
          </div>
        </div>
      </div>
    </section>`,
  wire: wireTabs,
};
