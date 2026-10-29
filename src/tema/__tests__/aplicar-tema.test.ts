import { describe, expect, it } from 'vitest';
import { paginaBannerFoto, paginaPanfletoPdf } from '../../../test/fixtures';
import { aplicarTema } from '../aplicar-tema';

const variavel = (nome: string) => document.documentElement.style.getPropertyValue(nome);

describe('Funcionalidade: Tema do lojista (RN48)', () => {
  it('Cenário: Dado as 10 cores do fixture, então cada variável CSS recebe a cor exata', () => {
    aplicarTema(paginaBannerFoto().aparencia.cores);
    expect(variavel('--cor-primaria')).toBe('#C8102E');
    expect(variavel('--cor-secundaria')).toBe('#FFD100');
    expect(variavel('--cor-texto')).toBe('#112233');
    expect(variavel('--cor-texto-suave')).toBe('#445566');
    expect(variavel('--cor-fundo')).toBe('#FFF8E1');
    expect(variavel('--cor-fundo-pagina')).toBe('#E8F5E9');
    expect(variavel('--cor-neutra')).toBe('#E0E0E0');
    expect(variavel('--cor-sobre-cor')).toBe('#FFFDE7');
    expect(variavel('--cor-fundo-banner')).toBe('#0B3D91');
    expect(variavel('--cor-categoria')).toBe('#0B8043');
  });

  it('Cenário: Dado primária #FFD100 (baixo contraste), então continua #FFD100 sem ajuste (U13)', () => {
    aplicarTema(paginaPanfletoPdf().aparencia.cores);
    expect(variavel('--cor-primaria')).toBe('#FFD100');
  });
});
