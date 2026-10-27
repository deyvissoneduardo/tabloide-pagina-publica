import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import html from '../../../index.html?raw';
import { paginaPanfletoImagem, respostaJson } from '../../../test/fixtures';
import type { PanfletoPublico } from '../../api/tipos';
import App from '../../App';
import { PanfletoImagem } from '../PanfletoImagem';

const panfleto = () => paginaPanfletoImagem().panfleto as PanfletoPublico;

describe('Funcionalidade: Panfleto em imagem (RN13, RN29, RN44)', () => {
  it('Cenário: Dado o fixture pagina-panfleto-imagem, então há uma imagem com width/height da API e não há categorias', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(paginaPanfletoImagem())));
    window.history.replaceState(null, '', '/f/k7Qm2xPa');
    render(<App />);
    const imagem = await screen.findByRole('img', { name: /^Panfleto de ofertas/ });
    expect(imagem).toHaveAttribute('width', '1600');
    expect(imagem).toHaveAttribute('height', '2400');
    expect(imagem).toHaveAttribute('fetchpriority', 'high');
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(screen.queryByText('Nenhuma oferta no momento.')).toBeNull();
  });

  it('Cenário: Dado validoAte, então alt e legenda com "válido até dd/mm"', () => {
    render(<PanfletoImagem panfleto={panfleto()} />);
    expect(screen.getByRole('img', { name: 'Panfleto de ofertas válido até 20/11' })).toBeInTheDocument();
    expect(screen.getByText('Válido até 20/11')).toBeInTheDocument();
  });

  it('Cenário: Dado sem validoAte, então alt sem data e sem legenda', () => {
    const { validoAte: _validoAte, ...semData } = panfleto();
    render(<PanfletoImagem panfleto={semData} />);
    expect(screen.getByRole('img', { name: 'Panfleto de ofertas' })).toBeInTheDocument();
    expect(screen.queryByText(/Válido até/)).toBeNull();
  });

  it('Cenário: Dado erro da imagem, quando toco em "Tentar de novo", então o src muda', async () => {
    const original = panfleto().arquivoUrl;
    render(<PanfletoImagem panfleto={panfleto()} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Não foi possível abrir o panfleto')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', `${original}?r=1`);

    fireEvent.error(screen.getByRole('img'));
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', `${original}?r=2`);
  });

  it('Cenário: Dado URL com query, quando tento de novo, então o parâmetro é acrescentado com &', async () => {
    render(<PanfletoImagem panfleto={{ ...panfleto(), arquivoUrl: 'https://cdn/p.webp?v=3' }} />);
    fireEvent.error(screen.getByRole('img'));
    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://cdn/p.webp?v=3&r=1');
  });

  it('Cenário: Dado index.html, então o viewport não tem maximum-scale nem user-scalable=no', () => {
    const viewport = /<meta name="viewport" content="([^"]*)"/.exec(html)?.[1];
    expect(viewport).toBe('width=device-width, initial-scale=1');
    expect(html).not.toMatch(/maximum-scale|user-scalable/);
    expect(html).toContain('<html lang="pt-BR">');
  });
});
