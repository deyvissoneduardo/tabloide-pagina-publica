/** Cor de texto da página (plano_pagina_publica/plano.md §4.7). Idêntico ao Flutter: não trocar por biblioteca. */

export const PRIMARIA_PADRAO = '#1565C0';
export const SECUNDARIA_PADRAO = '#FFB300';

const HEX_VALIDO = /^#[0-9A-F]{6}$/;
const CONTRASTE_MINIMO = 4.5;
const BRANCO = '#FFFFFF';

type Rgb = [number, number, number];

function hexParaRgb(hex: string): Rgb {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
}

function rgbParaHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function canalLinear(canal: number): number {
  const c = canal / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminancia(hex: string): number {
  const [r, g, b] = hexParaRgb(hex);
  return 0.2126 * canalLinear(r) + 0.7152 * canalLinear(g) + 0.0722 * canalLinear(b);
}

/** Contraste WCAG 2 entre duas cores #RRGGBB. */
export function contraste(a: string, b: string): number {
  const la = luminancia(a);
  const lb = luminancia(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** RGB (0–255) → HSL com h em graus [0, 360), s e l em [0, 1]. */
function rgbParaHsl([r8, g8, b8]: Rgb): [number, number, number] {
  const r = r8 / 255;
  const g = g8 / 255;
  const b = b8 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const delta = max - min;
  if (delta === 0) return [0, 0, l];
  const s = delta / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h *= 60;
  if (h < 0) h += 360;
  return [h, s, l];
}

/** HSL → RGB com cada canal = round(valor * 255). */
function hslParaRgb(h: number, s: number, l: number): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let rgb: [number, number, number];
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  return rgb.map((v) => Math.round((v + m) * 255)) as Rgb;
}

/** Cor legível sobre branco: mantém a cor se o contraste já é ≥ 4,5; senão escurece pelo L do HSL. */
export function corDeTexto(hex: string | null, padrao: string): string {
  let cor = hex !== null && HEX_VALIDO.test(hex) ? hex : padrao;
  if (contraste(cor, BRANCO) >= CONTRASTE_MINIMO) return cor.toUpperCase();
  const [h, s, l] = rgbParaHsl(hexParaRgb(cor));
  let L = Math.round(l * 100);
  do {
    L -= 1;
    cor = rgbParaHex(hslParaRgb(h, s, L / 100));
  } while (contraste(cor, BRANCO) < CONTRASTE_MINIMO && L > 0);
  return cor;
}
