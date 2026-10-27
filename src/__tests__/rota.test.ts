import { describe, expect, it } from 'vitest';
import { extrairCodigo } from '../rota';

describe('Funcionalidade: Leitura do código da rota', () => {
  it('Cenário: Dado "/f/k7Qm2xPa", quando extraio, então "k7Qm2xPa"', () => {
    expect(extrairCodigo('/f/k7Qm2xPa')).toBe('k7Qm2xPa');
  });

  it('Cenário: Dado "/f/k7Qm2xPa/", quando extraio, então "k7Qm2xPa"', () => {
    expect(extrairCodigo('/f/k7Qm2xPa/')).toBe('k7Qm2xPa');
  });

  it('Cenário: Dado "/f/k7Qm2xP" (7 caracteres), quando extraio, então null', () => {
    expect(extrairCodigo('/f/k7Qm2xP')).toBeNull();
  });

  it('Cenário: Dado "/f/k7Qm2xPa0" (caractere fora do alfabeto), quando extraio, então null', () => {
    expect(extrairCodigo('/f/k7Qm2xPa0')).toBeNull();
    expect(extrairCodigo('/f/k7Qm2xP0')).toBeNull();
  });

  it.each(['/', '/x/k7Qm2xPa', '/f/', '/f/k7Qm2xPa/extra'])(
    'Cenário: Dado "%s", quando extraio, então null',
    (caminho) => {
      expect(extrairCodigo(caminho)).toBeNull();
    },
  );
});
