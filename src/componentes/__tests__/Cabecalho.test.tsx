import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { paginaEstrutura, respostaJson } from '../../../test/fixtures';
import App from '../../App';
import { Cabecalho, iniciais } from '../Cabecalho';

describe('Funcionalidade: Cabeçalho da página (RN28)', () => {
  it('Cenário: Dado logo, então a imagem tem alt "Logo de <nome>"', () => {
    const { lojista, filial } = paginaEstrutura();
    render(<Cabecalho lojista={lojista} filial={filial} />);
    const logo = screen.getByRole('img', { name: 'Logo de Mercado Bom Preço' });
    expect(logo).toHaveAttribute('src', lojista.logoUrl);
    expect(logo).toHaveAttribute('width', '48');
    expect(screen.getByRole('heading', { level: 1, name: 'Mercado Bom Preço' })).toBeInTheDocument();
  });

  it('Cenário: Dado sem logo, então aparecem as iniciais', () => {
    const { lojista, filial } = paginaEstrutura();
    render(<Cabecalho lojista={{ ...lojista, logoUrl: null }} filial={filial} />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('MP')).toBeInTheDocument();
  });

  it('Cenário: Dado nomes de tamanhos diferentes, então até 2 iniciais', () => {
    expect(iniciais('Mercado Bom Preço')).toBe('MP');
    expect(iniciais('  atacadão ')).toBe('A');
    expect(iniciais('')).toBe('');
  });

  it('Cenário: Dado endereço, então o endereço resumido aparece abaixo da filial', () => {
    const { lojista, filial } = paginaEstrutura();
    render(<Cabecalho lojista={lojista} filial={filial} />);
    expect(screen.getByText('Centro')).toBeInTheDocument();
    expect(screen.getByText('Avenida Paulista, 1000 - Bela Vista, São Paulo/SP')).toBeInTheDocument();
  });

  it('Cenário: Dado endereço null, então só o nome da filial', () => {
    const { lojista, filial } = paginaEstrutura();
    const { container } = render(<Cabecalho lojista={lojista} filial={{ ...filial, endereco: null }} />);
    expect(screen.getByText('Centro')).toBeInTheDocument();
    expect(container.querySelector('.cabecalho__endereco')).toBeNull();
  });

  it('Cenário: Dado a página carregada, então o title do documento é "<nome> — <filial>"', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(paginaEstrutura())));
    window.history.replaceState(null, '', '/f/k7Qm2xPa');
    render(<App />);
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });
    expect(document.title).toBe('Mercado Bom Preço — Centro');
  });
});
