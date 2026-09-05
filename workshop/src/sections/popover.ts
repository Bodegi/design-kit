import type { Section } from './section';
import { copyControls } from './shared';

const popoverSnippet = `<button class="ui-btn" data-variant="outline" popovertarget="account-menu">Account &#9662;</button>
<div id="account-menu" popover class="ui-popover">
  <ul class="ui-menu">
    <li><a class="ui-menu-item">View Profile</a></li>
    <li><a class="ui-menu-item">Workspace Settings</a></li>
    <li class="ui-menu-divider"></li>
    <li><a class="ui-menu-item">Sign Out</a></li>
  </ul>
</div>`;

export const popoverSection: Section = {
  html: `    <!-- Popover Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Popover & Menu (.ui-popover)</h2>
      <p class="ws-section-desc">Native <code>[popover]</code> toggled by <code>popovertarget</code> — no JavaScript — holding a <code>.ui-menu</code>.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Account Menu</span>
          ${copyControls(popoverSnippet)}
        </div>
        <div class="ws-preview-canvas">
          <button class="ui-btn" data-variant="outline" popovertarget="ws-demo-popover">Account ▾</button>
          <div id="ws-demo-popover" popover class="ui-popover">
            <ul class="ui-menu">
              <li><a class="ui-menu-item">View Profile</a></li>
              <li><a class="ui-menu-item">Workspace Settings</a></li>
              <li class="ui-menu-divider"></li>
              <li><a class="ui-menu-item">Sign Out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`,
};
