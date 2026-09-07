/* ==========================================================================
   Workshop wiring for the kit's .ui-colorpicker component.

   The kit ships the styled anatomy and no runtime; this is the pointer/keyboard
   driving that a consuming app supplies. It is a workshop module (not part of
   the shipped kit) shared by the color-picker demo section and the Palette tab,
   so the HSV math lives in exactly one place. Promoted, with an alpha channel
   added, from the bespoke picker in the Chalkout app.
   ========================================================================== */
import { parseColor } from './contrast';

export type ColorFormat = 'auto' | 'hex' | 'rgba';

export interface ColorPicker {
  /** Current color as a CSS string — #rrggbb when opaque, rgba(…) when not
      (or per the `format` option). */
  get(): string;
  /** Seed the picker from any hex/rgb/rgba string the kit's tokens use. */
  set(css: string): void;
  /** Register a listener fired on every user edit (not on `set`). */
  onChange(cb: (css: string) => void): void;
}

export interface ColorPickerOptions {
  /** Show the alpha track and allow translucent output. Default: true. */
  alpha?: boolean;
  /** Output shape. 'auto' (default) emits hex when fully opaque, else rgba. */
  format?: ColorFormat;
}

/** The .ui-colorpicker anatomy as markup, so the demo section and the Palette
    tab render an identical control. Pass alpha:false to drop the alpha track. */
export function colorPickerMarkup(opts: { alpha?: boolean; label?: string } = {}): string {
  const label = opts.label ?? 'Color';
  const alphaTrack =
    opts.alpha === false
      ? ''
      : `\n      <input class="ui-colorpicker-alpha" type="range" min="0" max="100" value="100" aria-label="${label} opacity">`;
  return `<div class="ui-colorpicker">
      <div class="ui-colorpicker-area"><div class="ui-colorpicker-area-thumb"></div></div>
      <input class="ui-colorpicker-hue" type="range" min="0" max="360" value="210" aria-label="${label} hue">${alphaTrack}
      <div class="ui-colorpicker-fields">
        <div class="ui-colorpicker-swatch"></div>
        <input class="ui-input" type="text" spellcheck="false" autocomplete="off" aria-label="${label} value">
      </div>
    </div>`;
}

/* --- HSV <-> RGB, and formatting -------------------------------------------- */

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h / 60), f = h / 60 - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const [r, g, b] = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][i % 6];
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) {
    if (mx === r) h = ((g - b) / d) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (h * 60 + 360) % 360;
  }
  return { h, s: mx ? d / mx : 0, v: mx };
}

const hex2 = (n: number) => Math.round(n).toString(16).padStart(2, '0');
const solidHex = (r: number, g: number, b: number) => `#${hex2(r)}${hex2(g)}${hex2(b)}`;

/** Rounds alpha to 3 decimals and trims trailing zeros, matching how the kit's
    theme files write rgba() literals. */
function alphaStr(a: number): string {
  return String(Math.round(a * 1000) / 1000);
}

/* --- Controller ------------------------------------------------------------- */

export function createColorPicker(el: HTMLElement, opts: ColorPickerOptions = {}): ColorPicker {
  const useAlpha = opts.alpha !== false;
  const format = opts.format ?? 'auto';

  const area = el.querySelector<HTMLElement>('.ui-colorpicker-area');
  const areaThumb = el.querySelector<HTMLElement>('.ui-colorpicker-area-thumb');
  const hue = el.querySelector<HTMLInputElement>('.ui-colorpicker-hue');
  const alpha = el.querySelector<HTMLInputElement>('.ui-colorpicker-alpha');
  const hexInput = el.querySelector<HTMLInputElement>('.ui-input');

  // HSV + alpha is the source of truth; every surface is painted from it.
  let h = 210, s = 0, v = 1, a = 1;
  const listeners: ((css: string) => void)[] = [];

  const output = (): string => {
    const [r, g, b] = hsvToRgb(h, s, v);
    if (format === 'hex') return solidHex(r, g, b);
    if (format === 'rgba') return `rgba(${r}, ${g}, ${b}, ${alphaStr(a)})`;
    return a >= 1 ? solidHex(r, g, b) : `rgba(${r}, ${g}, ${b}, ${alphaStr(a)})`;
  };

  const paint = () => {
    const [r, g, b] = hsvToRgb(h, s, v);
    const solid = solidHex(r, g, b);
    el.style.setProperty('--ui-colorpicker-hue', String(h));
    el.style.setProperty('--ui-colorpicker-solid', solid);
    el.style.setProperty('--ui-colorpicker-color', a >= 1 ? solid : `rgba(${r}, ${g}, ${b}, ${alphaStr(a)})`);
    if (areaThumb) {
      areaThumb.style.left = `${s * 100}%`;
      areaThumb.style.top = `${(1 - v) * 100}%`;
    }
    if (hue) hue.value = String(Math.round(h));
    if (alpha) alpha.value = String(Math.round(a * 100));
    if (hexInput && document.activeElement !== hexInput) hexInput.value = output();
  };

  const emit = () => {
    paint();
    const css = output();
    for (const cb of listeners) cb(css);
  };

  // Seed HSV+alpha from any css string; returns false if unparseable.
  const seed = (css: string): boolean => {
    const rgb = parseColor(css);
    if (!rgb) return false;
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    // Preserve the current hue when the color is greyscale (rgbToHsv reports 0).
    h = hsv.s === 0 ? h : hsv.h;
    s = hsv.s;
    v = hsv.v;
    a = useAlpha ? rgb.a : 1;
    return true;
  };

  /* --- Interactions --------------------------------------------------------- */

  const pointFromArea = (e: PointerEvent) => {
    if (!area) return;
    const rect = area.getBoundingClientRect();
    if (!rect.width || !rect.height) return; // not laid out (e.g. hidden)
    s = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    v = 1 - Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    emit();
  };

  area?.addEventListener('pointerdown', (e) => {
    area.setPointerCapture(e.pointerId);
    pointFromArea(e);
    const move = (ev: PointerEvent) => pointFromArea(ev);
    const up = () => {
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerup', up);
    };
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerup', up);
  });

  hue?.addEventListener('input', () => { h = Number(hue.value); emit(); });
  alpha?.addEventListener('input', () => { a = Number(alpha.value) / 100; emit(); });

  hexInput?.addEventListener('change', () => {
    if (seed(hexInput.value.trim())) emit();
    else paint(); // revert an unparseable entry to the current color
  });

  return {
    get: output,
    set(css: string) { if (seed(css)) paint(); },
    onChange(cb) { listeners.push(cb); },
  };
}
