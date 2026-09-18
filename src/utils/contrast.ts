/** WCAG 2.2 relative luminance and contrast ratio.
 *  Used both by the ContrastAudit page (resolving live computed values) and by
 *  the static pair table, so a documented figure and a rendered figure can
 *  never disagree. */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Accepts #rgb, #rrggbb, rgb()/rgba(). Returns null for anything unparseable
 *  (e.g. `transparent`, `currentColor`) so callers can skip rather than guess. */
export function parseColor(input: string): Rgb | null {
  const value = input.trim().toLowerCase();
  if (!value || value === 'transparent' || value === 'currentcolor' || value === 'none') return null;

  if (value.startsWith('#')) {
    const hex = value.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16)
      };
    }
    if (hex.length === 6 || hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
      };
    }
    return null;
  }

  const match = value.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (match) {
    return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
  }
  return null;
}

function channel(v: number): number {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance({ r, g, b }: Rgb): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast ratio, 1–21. Returns null if either colour cannot be parsed. */
export function contrastRatio(foreground: string, background: string): number | null {
  const fg = parseColor(foreground);
  const bg = parseColor(background);
  if (!fg || !bg) return null;
  const lf = relativeLuminance(fg);
  const lb = relativeLuminance(bg);
  const lighter = Math.max(lf, lb);
  const darker = Math.min(lf, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export type ContrastTarget = 'text' | 'large-text' | 'non-text';

export const targetRatio: Record<ContrastTarget, number> = {
  /** WCAG 2.2 1.4.3 — normal-size text. In this system 11px counts as normal. */
  text: 4.5,
  /** 18.66px bold or 24px regular and above. */
  'large-text': 3,
  /** 1.4.11 — UI component boundaries, focus rings, glyph marks. */
  'non-text': 3
};

export function passes(ratio: number | null, target: ContrastTarget): boolean {
  if (ratio === null) return false;
  return ratio >= targetRatio[target];
}

export function formatRatio(ratio: number | null): string {
  return ratio === null ? '—' : `${ratio.toFixed(2)}:1`;
}

/** Resolves a CSS custom property against a live element so the audit reflects
 *  the theme currently applied to the document, not a hardcoded table. */
export function resolveToken(token: string, el: Element = document.documentElement): string {
  return getComputedStyle(el).getPropertyValue(token).trim();
}