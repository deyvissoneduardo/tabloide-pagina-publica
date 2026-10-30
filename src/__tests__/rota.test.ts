import { describe, expect, it } from 'vitest';
import { ehInicio, extrairCodigo } from '../rota';

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

describe('Funcionalidade: Rota da landing', () => {
  it.each(['/', ''])('Cenário: Dado "%s", quando verifico, então é a landing', (caminho) => {
    expect(ehInicio(caminho)).toBe(true);
  });

  it.each(['/f/k7Qm2xPa', '/x', '/index.html'])(
    'Cenário: Dado "%s", quando verifico, então não é a landing',
    (caminho) => {
      expect(ehInicio(caminho)).toBe(false);
    },
  );
});
