import { describe, expect, it } from 'vitest';
import { aplicarTema } from '../aplicar-tema';

const variavel = (nome: string) => document.documentElement.style.getPropertyValue(nome);

describe('Funcionalidade: Tema do lojista', () => {
  it('Cenário: Dado cores do lojista, então as variáveis CSS recebem as cores calculadas', () => {
    aplicarTema({ nome: 'X', logoUrl: null, corPrimaria: '#FFD100', corSecundaria: '#C8102E' });
    expect(variavel('--cor-primaria')).toBe('#8A7100');
    expect(variavel('--cor-secundaria')).toBe('#C8102E');
  });

  it('Cenário: Dado sem cor, então as variáveis recebem os padrões ajustados', () => {
    aplicarTema({ nome: 'X', logoUrl: null, corPrimaria: null, corSecundaria: null });
    expect(variavel('--cor-primaria')).toBe('#1565C0');
    expect(variavel('--cor-secundaria')).toBe('#996B00');
  });
});
