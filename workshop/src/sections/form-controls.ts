import type { Section } from './section';
import { copyControls } from './shared';

export const formControlsSection: Section = {
  html: `    <!-- Form Controls Section -->
    <section class="ws-section">
      <h2 class="ws-section-title">Form Controls (.ui-field, .ui-input, .ui-select, .ui-switch)</h2>
      <p class="ws-section-desc">Open UI compliant inputs, validation feedback, native toggle switches, and the Customizable Select picker where <code>appearance: base-select</code> is supported. Switches come two ways: <code>.ui-switch</code> draws a track and thumb from its own markup in every engine, and <code>.ui-switch-native</code> is the bare <code>&lt;input type="checkbox" switch&gt;</code> restyled through <code>::track</code> and <code>::thumb</code> inside <code>@supports selector(::thumb)</code> — Safari 17.4+ draws the switch, Chromium keeps it behind a flag, and every engine without the parts renders a working checkbox in the <code>.ui-checkbox</code> look.</p>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Input Fields & Select</span>
          ${copyControls('<div class="ui-field"><label class="ui-label" for="name">Label</label><div class="ui-control"><input class="ui-input" id="name" placeholder="Type here..." /></div></div>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-field">
            <label class="ui-label" for="ws-demo-name">User Profile Name</label>
            <div class="ui-control">
              <input class="ui-input" id="ws-demo-name" type="text" placeholder="e.g. Alex Morgan" />
            </div>
            <span class="ui-help-text">Visible on public workspace dashboards.</span>
          </div>

          <div class="ui-field">
            <label class="ui-label" for="ws-demo-role">Assigned Role</label>
            <div class="ui-control">
              <select class="ui-select" id="ws-demo-role">
                <option>Administrator</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
            </div>
          </div>

          <div class="ui-field">
            <label class="ui-label" for="ws-demo-err">API Endpoint (Error State)</label>
            <div class="ui-control">
              <input class="ui-input" id="ws-demo-err" type="text" value="https://invalid:port" data-state="error" />
            </div>
            <span class="ui-error-text">Please provide a valid URL endpoint format.</span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Customizable Select</span>
          ${copyControls('<div class="ui-control">\n  <select class="ui-select" id="target">\n    <button><selectedcontent></selectedcontent></button>\n    <optgroup>\n      <legend>Managed</legend>\n      <option value="prod"><span class="dot"></span>Production</option>\n      <option value="staging" selected><span class="dot"></span>Staging</option>\n    </optgroup>\n    <optgroup>\n      <legend>Self-hosted</legend>\n      <option value="legacy" disabled>Legacy box (retired)</option>\n    </optgroup>\n  </select>\n</div>\n\n<!-- Blink 135+ styles the picker; other engines keep the classic select -->')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <div class="ui-field">
            <label class="ui-label" for="ws-demo-target">Deploy Target</label>
            <div class="ui-control">
              <select class="ui-select" id="ws-demo-target">
                <button><selectedcontent></selectedcontent></button>
                <optgroup>
                  <legend>Managed</legend>
                  <option value="prod"><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-danger);"></span>Production</option>
                  <option value="staging" selected><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-warning);"></span>Staging</option>
                  <option value="preview"><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-success);"></span>Preview</option>
                </optgroup>
                <optgroup>
                  <legend>Self-hosted</legend>
                  <option value="edge"><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-info);"></span>Edge cluster</option>
                  <option value="legacy" disabled><span style="width: 8px; height: 8px; flex-shrink: 0; border-radius: var(--radius-full); background: var(--color-text-muted);"></span>Legacy box (retired)</option>
                </optgroup>
              </select>
            </div>
            <span class="ui-help-text">Blink (Chromium 135+) renders the styled picker; Firefox and Safari fall back to the classic control, which keeps the same closed-state look.</span>
          </div>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Checkboxes, Radios & Switches</span>
          ${copyControls('<label class="ui-switch"><input type="checkbox" /><span class="ui-switch-track"><span class="ui-switch-thumb"></span></span><span>Label</span></label>')}
        </div>
        <div class="ws-preview-canvas">
          <label class="ui-checkbox-label">
            <input type="checkbox" class="ui-checkbox" checked />
            <span>Enable telemetry</span>
          </label>

          <label class="ui-checkbox-label">
            <input type="checkbox" class="ui-checkbox" />
            <span>Auto-backup</span>
          </label>

          <label class="ui-radio-label">
            <input type="radio" name="ws-radio-demo" class="ui-radio" checked />
            <span>Standard Sync</span>
          </label>

          <label class="ui-radio-label">
            <input type="radio" name="ws-radio-demo" class="ui-radio" />
            <span>Turbo Sync</span>
          </label>

          <label class="ui-switch">
            <input type="checkbox" checked />
            <span class="ui-switch-track">
              <span class="ui-switch-thumb"></span>
            </span>
            <span>Live Monitoring</span>
          </label>
        </div>
      </div>

      <div class="ws-preview-block">
        <div class="ws-preview-header">
          <span class="ws-preview-title">Native Switch (.ui-switch-native)</span>
          ${copyControls('<label class="ui-checkbox-label"><input type="checkbox" switch class="ui-switch-native" checked /><span>Label</span></label>')}
        </div>
        <div class="ws-preview-canvas ws-canvas-col">
          <label class="ui-checkbox-label">
            <input type="checkbox" switch class="ui-switch-native" checked />
            <span>Live Monitoring (on)</span>
          </label>
          <label class="ui-checkbox-label">
            <input type="checkbox" switch class="ui-switch-native" />
            <span>Verbose logging (off)</span>
          </label>
          <label class="ui-checkbox-label">
            <input type="checkbox" switch class="ui-switch-native" checked disabled />
            <span>Managed by policy (disabled)</span>
          </label>
        </div>
      </div>
    </section>`,
};
