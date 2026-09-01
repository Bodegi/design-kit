import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const componentsDir = path.join(rootDir, 'src/components');
const svgDir = path.join(rootDir, 'src/icons/svg');

fs.mkdirSync(componentsDir, { recursive: true });
fs.mkdirSync(svgDir, { recursive: true });

// -------------------------------------------------------------
// 1. button.css
// -------------------------------------------------------------
const buttonCss = `/* ==========================================================================
   Open UI: Button Component (.ui-btn)
   ========================================================================== */

.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: inherit;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border-radius: var(--radius-control);
  border: 1px solid transparent;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast), opacity var(--transition-fast);
  padding: var(--space-2) var(--space-3);
  height: 36px;
  background-color: var(--color-bg-surface);
  color: var(--color-text-main);
  border-color: var(--color-border-strong);
}

.ui-btn:hover:not(:disabled) {
  background-color: var(--color-bg-hover);
  border-color: var(--color-border-focus);
}

.ui-btn:active:not(:disabled) {
  background-color: var(--color-bg-active);
  transform: translateY(1px);
}

.ui-btn:focus-visible {
  box-shadow: var(--focus-ring);
  outline: none;
}

.ui-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* --- Sizes --- */
.ui-btn[data-size="sm"] {
  height: 28px;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  gap: var(--space-1);
}

.ui-btn[data-size="lg"] {
  height: 44px;
  padding: var(--space-3) var(--space-5);
  font-size: var(--text-base);
  gap: var(--space-3);
}

.ui-btn[data-size="icon"] {
  width: 36px;
  height: 36px;
  padding: 0;
}

.ui-btn[data-size="icon"][data-size="sm"] {
  width: 28px;
  height: 28px;
}

/* --- Variants: Solid Intent --- */
.ui-btn[data-variant="solid"][data-intent="primary"],
.ui-btn[data-intent="primary"]:not([data-variant="outline"]):not([data-variant="ghost"]) {
  background-color: var(--color-primary);
  color: var(--color-primary-contrast);
  border-color: var(--color-primary);
}
.ui-btn[data-variant="solid"][data-intent="primary"]:hover:not(:disabled),
.ui-btn[data-intent="primary"]:not([data-variant="outline"]):not([data-variant="ghost"]):hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.ui-btn[data-variant="solid"][data-intent="danger"],
.ui-btn[data-intent="danger"]:not([data-variant="outline"]):not([data-variant="ghost"]) {
  background-color: var(--color-danger);
  color: var(--color-danger-contrast);
  border-color: var(--color-danger);
}
.ui-btn[data-variant="solid"][data-intent="danger"]:hover:not(:disabled),
.ui-btn[data-intent="danger"]:not([data-variant="outline"]):not([data-variant="ghost"]):hover:not(:disabled) {
  background-color: var(--color-danger-hover);
  border-color: var(--color-danger-hover);
}

.ui-btn[data-variant="solid"][data-intent="success"],
.ui-btn[data-intent="success"]:not([data-variant="outline"]):not([data-variant="ghost"]) {
  background-color: var(--color-success);
  color: var(--color-success-contrast);
  border-color: var(--color-success);
}
.ui-btn[data-variant="solid"][data-intent="success"]:hover:not(:disabled),
.ui-btn[data-intent="success"]:not([data-variant="outline"]):not([data-variant="ghost"]):hover:not(:disabled) {
  background-color: var(--color-success-hover);
  border-color: var(--color-success-hover);
}

/* --- Variants: Outline Intent --- */
.ui-btn[data-variant="outline"][data-intent="primary"] {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.ui-btn[data-variant="outline"][data-intent="primary"]:hover:not(:disabled) {
  background-color: var(--color-primary-subtle);
}

.ui-btn[data-variant="outline"][data-intent="danger"] {
  background-color: transparent;
  color: var(--color-danger);
  border-color: var(--color-danger);
}
.ui-btn[data-variant="outline"][data-intent="danger"]:hover:not(:disabled) {
  background-color: var(--color-danger-subtle);
}

/* --- Variants: Ghost --- */
.ui-btn[data-variant="ghost"] {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-text-main);
}
.ui-btn[data-variant="ghost"]:hover:not(:disabled) {
  background-color: var(--color-bg-hover);
}
.ui-btn[data-variant="ghost"][data-intent="primary"] {
  color: var(--color-primary);
}
.ui-btn[data-variant="ghost"][data-intent="primary"]:hover:not(:disabled) {
  background-color: var(--color-primary-subtle);
}

/* --- Button Group --- */
.ui-btn-group {
  display: inline-flex;
  border-radius: var(--radius-control);
  overflow: hidden;
}
.ui-btn-group > .ui-btn {
  border-radius: 0;
}
.ui-btn-group > .ui-btn:not(:last-child) {
  border-right-width: 0;
}
.ui-btn-group > .ui-btn:first-child {
  border-top-left-radius: var(--radius-control);
  border-bottom-left-radius: var(--radius-control);
}
.ui-btn-group > .ui-btn:last-child {
  border-top-right-radius: var(--radius-control);
  border-bottom-right-radius: var(--radius-control);
}
`;
fs.writeFileSync(path.join(componentsDir, 'button.css'), buttonCss, 'utf8');

// -------------------------------------------------------------
// 2. form.css
// -------------------------------------------------------------
const formCss = `/* ==========================================================================
   Open UI: Form Controls (.ui-field, .ui-input, .ui-select, .ui-switch)
   ========================================================================== */

.ui-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
}

.ui-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-main);
  user-select: none;
}

.ui-control {
  position: relative;
  display: flex;
  align-items: center;
}

.ui-input,
.ui-textarea,
.ui-select {
  width: 100%;
  font-family: inherit;
  font-size: var(--text-sm);
  color: var(--color-text-main);
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-control);
  padding: var(--space-2) var(--space-3);
  height: 36px;
  outline: none;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.ui-textarea {
  height: auto;
  min-height: 80px;
  resize: vertical;
}

.ui-select {
  cursor: pointer;
  padding-right: var(--space-8);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
}

.ui-input:hover:not(:disabled),
.ui-textarea:hover:not(:disabled),
.ui-select:hover:not(:disabled) {
  border-color: var(--color-border-focus);
}

.ui-input:focus-visible,
.ui-textarea:focus-visible,
.ui-select:focus-visible {
  border-color: var(--color-border-focus);
  box-shadow: var(--focus-ring);
}

.ui-input:disabled,
.ui-textarea:disabled,
.ui-select:disabled {
  opacity: 0.5;
  background-color: var(--color-bg-muted);
  cursor: not-allowed;
}

/* Validation States */
.ui-input[data-state="error"],
.ui-textarea[data-state="error"],
.ui-select[data-state="error"] {
  border-color: var(--color-danger);
}
.ui-input[data-state="error"]:focus-visible {
  box-shadow: 0 0 0 2px var(--color-bg-canvas), 0 0 0 4px var(--color-danger);
}

.ui-help-text {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.ui-error-text {
  font-size: var(--text-xs);
  color: var(--color-danger);
}

/* --- Checkbox & Radio --- */
.ui-checkbox-label,
.ui-radio-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-main);
  cursor: pointer;
  user-select: none;
}

.ui-checkbox,
.ui-radio {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  background-color: var(--color-bg-surface);
  cursor: pointer;
  outline: none;
  display: grid;
  place-content: center;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
  margin: 0;
}

.ui-radio {
  border-radius: var(--radius-full);
}

.ui-checkbox:checked,
.ui-radio:checked {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.ui-checkbox:checked::before {
  content: "";
  width: 10px;
  height: 6px;
  border-left: 2px solid var(--color-primary-contrast);
  border-bottom: 2px solid var(--color-primary-contrast);
  transform: rotate(-45deg) translate(1px, -1px);
}

.ui-radio:checked::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary-contrast);
}

.ui-checkbox:focus-visible,
.ui-radio:focus-visible {
  box-shadow: var(--focus-ring);
}

/* --- Toggle Switch --- */
.ui-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
  font-size: var(--text-sm);
}

.ui-switch input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.ui-switch-track {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  background-color: var(--color-border-strong);
  border-radius: var(--radius-full);
  transition: background-color var(--transition-fast);
}

.ui-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: #ffffff;
  border-radius: var(--radius-full);
  transition: transform var(--transition-fast);
}

.ui-switch input:checked + .ui-switch-track {
  background-color: var(--color-primary);
}

.ui-switch input:checked + .ui-switch-track .ui-switch-thumb {
  transform: translateX(18px);
}

.ui-switch input:focus-visible + .ui-switch-track {
  box-shadow: var(--focus-ring);
}
`;
fs.writeFileSync(path.join(componentsDir, 'form.css'), formCss, 'utf8');

// -------------------------------------------------------------
// 3. panel.css
// -------------------------------------------------------------
const panelCss = `/* ==========================================================================
   Open UI: Panel / Card (.ui-panel)
   ========================================================================== */

.ui-panel {
  background-color: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-base);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.ui-panel[data-variant="raised"] {
  box-shadow: var(--shadow-md);
  border-color: var(--color-border-subtle);
}

.ui-panel[data-variant="flat"] {
  border: none;
  background-color: var(--color-bg-muted);
}

.ui-panel-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ui-panel-title {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  margin: 0;
}

.ui-panel-body {
  padding: var(--space-5);
  flex: 1;
}

.ui-panel-footer {
  padding: var(--space-3) var(--space-5);
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-muted);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
}
`;
fs.writeFileSync(path.join(componentsDir, 'panel.css'), panelCss, 'utf8');

// -------------------------------------------------------------
// 4. badge.css
// -------------------------------------------------------------
const badgeCss = `/* ==========================================================================
   Open UI: Badge / Status Chip (.ui-badge)
   ========================================================================== */

.ui-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: 1;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  background-color: var(--color-bg-muted);
  color: var(--color-text-main);
  border: 1px solid var(--color-border-subtle);
}

.ui-badge[data-intent="primary"] {
  background-color: var(--color-primary-subtle);
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.ui-badge[data-intent="success"] {
  background-color: var(--color-success-subtle);
  color: var(--color-success);
  border-color: var(--color-success);
}

.ui-badge[data-intent="warning"] {
  background-color: var(--color-warning-subtle);
  color: var(--color-warning);
  border-color: var(--color-warning);
}

.ui-badge[data-intent="danger"] {
  background-color: var(--color-danger-subtle);
  color: var(--color-danger);
  border-color: var(--color-danger);
}

.ui-badge[data-intent="info"] {
  background-color: var(--color-info-subtle);
  color: var(--color-info);
  border-color: var(--color-info);
}
`;
fs.writeFileSync(path.join(componentsDir, 'badge.css'), badgeCss, 'utf8');

// -------------------------------------------------------------
// 5. dialog.css
// -------------------------------------------------------------
const dialogCss = `/* ==========================================================================
   Open UI: Native Dialog Modal (dialog.ui-dialog)
   ========================================================================== */

dialog.ui-dialog {
  padding: 0;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  background-color: var(--color-bg-surface);
  color: var(--color-text-main);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90vw;
  margin: auto;
  outline: none;
}

dialog.ui-dialog::backdrop {
  background-color: var(--color-bg-overlay);
  backdrop-filter: blur(4px);
}

.ui-dialog-header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ui-dialog-title {
  margin: 0;
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

.ui-dialog-body {
  padding: var(--space-5);
}

.ui-dialog-footer {
  padding: var(--space-3) var(--space-5);
  border-top: 1px solid var(--color-border-subtle);
  background-color: var(--color-bg-muted);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
`;
fs.writeFileSync(path.join(componentsDir, 'dialog.css'), dialogCss, 'utf8');

// -------------------------------------------------------------
// 6. popover.css
// -------------------------------------------------------------
const popoverCss = `/* ==========================================================================
   Open UI: Native Popover / Menu ([popover].ui-popover)
   ========================================================================== */

[popover].ui-popover {
  margin: 0;
  padding: var(--space-2);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-base);
  background-color: var(--color-bg-elevated);
  color: var(--color-text-main);
  box-shadow: var(--shadow-lg);
  outline: none;
}

.ui-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ui-menu-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  color: var(--color-text-main);
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: background-color var(--transition-fast);
}

.ui-menu-item:hover {
  background-color: var(--color-bg-hover);
  color: var(--color-primary);
}

.ui-menu-divider {
  height: 1px;
  background-color: var(--color-border-subtle);
  margin: var(--space-1) 0;
}
`;
fs.writeFileSync(path.join(componentsDir, 'popover.css'), popoverCss, 'utf8');

// -------------------------------------------------------------
// 7. accordion.css
// -------------------------------------------------------------
const accordionCss = `/* ==========================================================================
   Open UI: Native Accordion / Details (details.ui-accordion)
   ========================================================================== */

details.ui-accordion {
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-base);
  background-color: var(--color-bg-surface);
  overflow: hidden;
  margin-bottom: var(--space-2);
}

summary.ui-accordion-summary {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  cursor: pointer;
  user-select: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  transition: background-color var(--transition-fast);
}

summary.ui-accordion-summary::-webkit-details-marker {
  display: none;
}

summary.ui-accordion-summary:hover {
  background-color: var(--color-bg-hover);
}

summary.ui-accordion-summary:focus-visible {
  box-shadow: var(--focus-ring);
}

summary.ui-accordion-summary::after {
  content: "";
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--color-text-muted);
  border-bottom: 2px solid var(--color-text-muted);
  transform: rotate(-45deg);
  transition: transform var(--transition-fast);
}

details.ui-accordion[open] summary.ui-accordion-summary::after {
  transform: rotate(45deg);
}

.ui-accordion-content {
  padding: var(--space-4);
  border-top: 1px solid var(--color-border-subtle);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: var(--leading-relaxed);
}
`;
fs.writeFileSync(path.join(componentsDir, 'accordion.css'), accordionCss, 'utf8');

// -------------------------------------------------------------
// 8. icon.css
// -------------------------------------------------------------
const iconCss = `/* ==========================================================================
   Open UI: Icon Utility (.ui-icon)
   ========================================================================== */

.ui-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  stroke-width: 2;
  stroke: currentColor;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  vertical-align: middle;
  flex-shrink: 0;
}

.ui-icon[data-size="xs"] { width: 14px; height: 14px; }
.ui-icon[data-size="sm"] { width: 16px; height: 16px; }
.ui-icon[data-size="md"] { width: 20px; height: 20px; }
.ui-icon[data-size="lg"] { width: 24px; height: 24px; }
.ui-icon[data-size="xl"] { width: 32px; height: 32px; }
`;
fs.writeFileSync(path.join(componentsDir, 'icon.css'), iconCss, 'utf8');

console.log('✓ Successfully created all 8 component stylesheets.');
