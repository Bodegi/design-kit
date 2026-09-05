/* ==========================================================================
   Contrast math — WCAG 2.x ratios over composited colors.
   No DOM access: the browser token viewer and scripts/check-contrast.mjs both
   import this module, so the workshop panel and the CLI gate agree by
   construction. Node runs the .ts directly via its built-in type stripping.
   ========================================================================== */

export type Rgb = { r: number; g: number; b: number; a: number };

/** Parses the color literals our tokens use (#hex, #hexa, rgb(), rgba()). */
export function parseColor(value: string): Rgb | null {
  const v = value.trim();

  const hex = v.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3 || h.length === 4) {
      h = h.split('').map((c) => c + c).join('');
    }
    if (h.length !== 6 && h.length !== 8) return null;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
    };
  }

  const rgb = v.match(/^rgba?\(([^)]+)\)$/i);
  if (rgb) {
    const parts = rgb[1].split(/[,/\s]+/).filter(Boolean).map(parseFloat);
    if (parts.length >= 3 && parts.slice(0, 3).every((n) => !Number.isNaN(n))) {
      return { r: parts[0], g: parts[1], b: parts[2], a: parts[3] ?? 1 };
    }
  }

  return null;
}

export function toHex({ r, g, b, a }: Rgb): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const alpha = a < 1 ? h(a * 255) : '';
  return `#${h(r)}${h(g)}${h(b)}${alpha}`;
}

/** Source-over composite of a translucent color onto an opaque ground. */
export function over(fg: Rgb, bg: Rgb): Rgb {
  if (fg.a >= 1) return fg;
  const mix = (f: number, b: number) => f * fg.a + b * (1 - fg.a);
  return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), a: 1 };
}

/** Flattens a layer stack, top layer first, onto the bottom-most layer. */
export function flatten(layers: Rgb[]): Rgb {
  return layers.reduceRight((ground, layer) => over(layer, ground));
}

/** WCAG 2.x relative luminance. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(fg: Rgb, bg: Rgb): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/* --------------------------------------------------------------------------
   The pairing list — what "WCAG AA" means for this kit.
   -------------------------------------------------------------------------- */

export type Pairing = {
  label: string;
  /** Foreground token. Composited over the resolved background when translucent. */
  fg: string;
  /** Background layer stack, top layer first; each translucent layer composites
      onto the one below, and the last layer must be opaque. */
  bg: string[];
  /** Minimum ratio: 4.5 for body text, 3.0 for large text and UI shapes. */
  threshold: number;
};

const INTENTS = ['primary', 'accent', 'success', 'warning', 'danger', 'info'] as const;

export const PAIRINGS: Pairing[] = [
  { label: 'Main text on canvas', fg: '--color-text-main', bg: ['--color-bg-canvas'], threshold: 4.5 },
  { label: 'Muted text on canvas', fg: '--color-text-muted', bg: ['--color-bg-canvas'], threshold: 4.5 },
  { label: 'Dim text on canvas', fg: '--color-text-dim', bg: ['--color-bg-canvas'], threshold: 4.5 },
  { label: 'Main text on surface', fg: '--color-text-main', bg: ['--color-bg-surface', '--color-bg-canvas'], threshold: 4.5 },
  { label: 'Muted text on surface', fg: '--color-text-muted', bg: ['--color-bg-surface', '--color-bg-canvas'], threshold: 4.5 },
  { label: 'Dim text on surface', fg: '--color-text-dim', bg: ['--color-bg-surface', '--color-bg-canvas'], threshold: 4.5 },

  ...INTENTS.map((intent) => ({
    label: `${title(intent)} label on fill`,
    fg: `--color-${intent}-contrast`,
    bg: [`--color-${intent}`],
    threshold: 4.5,
  })),

  ...INTENTS.map((intent) => ({
    label: `${title(intent)} badge text on tint`,
    fg: `--color-${intent}`,
    bg: [`--color-${intent}-subtle`, '--color-bg-surface', '--color-bg-canvas'],
    threshold: 4.5,
  })),

  /* Outline and ghost buttons draw their label in the intent color straight on
     the surface, at the same 14px as body copy — so the ink is measured as text
     at 4.5, not as a UI shape at 3.0. */
  ...INTENTS.map((intent) => ({
    label: `${title(intent)} ink on surface`,
    fg: `--color-${intent}`,
    bg: ['--color-bg-surface', '--color-bg-canvas'],
    threshold: 4.5,
  })),

  { label: 'Focus ring on canvas', fg: '--color-border-focus', bg: ['--color-bg-canvas'], threshold: 3 },
  { label: 'Primary UI mark on surface', fg: '--color-primary', bg: ['--color-bg-surface', '--color-bg-canvas'], threshold: 3 },
];

function title(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export type PairingResult = {
  pairing: Pairing;
  /** null when a token is missing or is not a color literal we can parse. */
  ratio: number | null;
  pass: boolean;
};

/**
 * Measures every pairing against one theme. `resolve` returns the theme's value
 * for a token name — computed style in the browser, parsed CSS in the CLI.
 */
export function evaluatePairings(
  resolve: (token: string) => string,
  pairings: Pairing[] = PAIRINGS,
): PairingResult[] {
  return pairings.map((pairing) => {
    const fg = parseColor(resolve(pairing.fg));
    const layers = pairing.bg.map((token) => parseColor(resolve(token)));
    if (!fg || layers.some((layer) => layer === null)) {
      return { pairing, ratio: null, pass: false };
    }
    const bg = flatten(layers as Rgb[]);
    const ratio = contrastRatio(over(fg, bg), bg);
    return { pairing, ratio, pass: ratio >= pairing.threshold };
  });
}
