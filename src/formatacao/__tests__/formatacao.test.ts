import { describe, expect, it } from 'vitest';
import { formatarDataCurta } from '../data';
import { formatarDinheiro } from '../dinheiro';

describe('Funcionalidade: Formatação', () => {
  it.each([
    [499, 'R$ 4,99'],
    [100000, 'R$ 1.000,00'],
    [99999999, 'R$ 999.999,99'],
  ])('Cenário: Dado %i centavos, então "%s"', (centavos, esperado) => {
    expect(formatarDinheiro(centavos)).toBe(esperado);
  });

  it('Cenário: Dado "2026-01-05", então "05/01"', () => {
    expect(formatarDataCurta('2026-01-05')).toBe('05/01');
  });
});
