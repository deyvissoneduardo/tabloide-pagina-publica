import { describe, expect, it } from 'vitest';
import { contraste, corDeTexto, PRIMARIA_PADRAO, SECUNDARIA_PADRAO } from '../cores';

/** Tabela obrigatória do plano §4.7: idêntica à do teste do Flutter (T10). */
const CASOS: [string | null, string, string][] = [
  ['#C8102E', '#1565C0', '#C8102E'],
  ['#FFD100', '#FFB300', '#8A7100'],
  [null, '#1565C0', '#1565C0'],
  [null, '#FFB300', '#996B00'],
  ['#FFFFFF', '#1565C0', '#757575'],
  ['#000000', '#1565C0', '#000000'],
  ['#00FF00', '#1565C0', '#008A00'],
  ['#1565C0', '#1565C0', '#1565C0'],
  ['#ffd100', '#FFB300', '#996B00'],
];

describe('Funcionalidade: Cor de texto da página (plano §4.7)', () => {
  it.each(CASOS)('Cenário: Dado %s com padrão %s, então %s', (entrada, padrao, esperado) => {
    expect(corDeTexto(entrada, padrao)).toBe(esperado);
  });

  it('Cenário: Dado qualquer caso da tabela, então a saída tem contraste ≥ 4,5 com #FFFFFF', () => {
    for (const [entrada, padrao] of CASOS) {
      expect(contraste(corDeTexto(entrada, padrao), '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('Cenário: Dado cores claras de vários matizes, então a saída tem contraste ≥ 4,5 com #FFFFFF', () => {
    for (const cor of ['#FF0000', '#FFFF00', '#00FFFF', '#0000FF', '#FF00FF', '#FFEEDD', '#F0F0F0']) {
      expect(contraste(corDeTexto(cor, PRIMARIA_PADRAO), '#FFFFFF')).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('Cenário: Dado #FFFFFF e #000000, então o contraste é 21', () => {
    expect(contraste('#FFFFFF', '#000000')).toBe(21);
  });

  it('Cenário: Dado os padrões, então são as cores do Tabloide', () => {
    expect(PRIMARIA_PADRAO).toBe('#1565C0');
    expect(SECUNDARIA_PADRAO).toBe('#FFB300');
  });
});
