import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { paginaEstrutura, paginaPanfletoImagem, respostaJson } from '../../test/fixtures';
import App from '../App';

function abrir(caminho: string) {
  window.history.replaceState(null, '', caminho);
  return render(<App />);
}

describe('Funcionalidade: Estados da página', () => {
  let fetchFalso: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchFalso = vi.fn();
    vi.stubGlobal('fetch', fetchFalso);
  });

  it('Cenário: Dado carregando, então o esqueleto com "Carregando ofertas"', () => {
    fetchFalso.mockReturnValue(new Promise(() => {}));
    abrir('/f/k7Qm2xPa');
    expect(screen.getByText('Carregando ofertas')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
  });

  it('Cenário: Dado "/", então a landing e nenhum fetch', async () => {
    abrir('/');
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('no celular do cliente');
    expect(screen.queryByText('Página não encontrada')).not.toBeInTheDocument();
    expect(fetchFalso).not.toHaveBeenCalled();
  });

  it('Cenário: Dado rota inválida, então "Página não encontrada" e nenhum fetch', () => {
    abrir('/x/k7Qm2xPa');
    expect(screen.getByRole('heading', { name: 'Página não encontrada' })).toBeInTheDocument();
    expect(screen.getByText('Confira o QR Code ou o endereço e tente de novo.')).toBeInTheDocument();
    expect(fetchFalso).not.toHaveBeenCalled();
  });

  it('Cenário: Dado 404, então "Página não encontrada"', async () => {
    fetchFalso.mockResolvedValue(respostaJson({}, 404));
    abrir('/f/k7Qm2xPa');
    expect(await screen.findByRole('heading', { name: 'Página não encontrada' })).toBeInTheDocument();
  });

  it('Cenário: Dado sem conexão, quando toco em "Tentar de novo", então busca de novo', async () => {
    fetchFalso.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    fetchFalso.mockResolvedValueOnce(respostaJson(paginaEstrutura()));
    abrir('/f/k7Qm2xPa');
    expect(await screen.findByText('Não foi possível carregar as ofertas')).toBeInTheDocument();
    expect(screen.getByText('Verifique a internet e tente de novo.')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Tentar de novo' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' })).toBeInTheDocument();
    expect(fetchFalso).toHaveBeenCalledTimes(2);
  });

  it('Cenário: Dado sair da página durante a busca, então a requisição é cancelada', async () => {
    let sinal: AbortSignal | undefined;
    fetchFalso.mockImplementation((_url: string, init: RequestInit) => {
      sinal = init.signal ?? undefined;
      return new Promise(() => {});
    });
    const { unmount } = abrir('/f/k7Qm2xPa');
    await waitFor(() => expect(sinal).toBeDefined());
    unmount();
    expect(sinal?.aborted).toBe(true);
  });

  it('Cenário: Dado "/f/<codigo>?origem=painel", quando carrega, então o fetch leva ?origem=painel e a barra fica "/f/<codigo>"', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaEstrutura()));
    abrir('/f/k7Qm2xPa?origem=painel');
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });
    expect(fetchFalso).toHaveBeenCalledTimes(1);
    expect(fetchFalso.mock.calls[0]?.[0]).toBe(
      `${import.meta.env.VITE_API_URL}/publico/filiais/k7Qm2xPa?origem=painel`,
    );
    expect(`${window.location.pathname}${window.location.search}`).toBe('/f/k7Qm2xPa');
  });

  it('Cenário: Dado origem painel e falha de conexão, quando toco em "Tentar de novo", então a segunda chamada também leva ?origem=painel', async () => {
    fetchFalso.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    fetchFalso.mockResolvedValueOnce(respostaJson(paginaEstrutura()));
    abrir('/f/k7Qm2xPa?origem=painel');
    await userEvent.click(await screen.findByRole('button', { name: 'Tentar de novo' }));
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });
    expect(fetchFalso).toHaveBeenCalledTimes(2);
    for (const [url] of fetchFalso.mock.calls) expect(url).toMatch(/\?origem=painel$/);
  });

  it('Cenário: Dado "/f/<codigo>" sem origem, quando carrega, então o fetch vai sem query', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaEstrutura()));
    abrir('/f/k7Qm2xPa');
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });
    expect(fetchFalso.mock.calls[0]?.[0]).toBe(`${import.meta.env.VITE_API_URL}/publico/filiais/k7Qm2xPa`);
  });

  it('Cenário: Dado qualquer estado, então não existe <footer>', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaEstrutura()));
    const { container } = abrir('/f/k7Qm2xPa');
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });
    expect(container.querySelector('footer')).toBeNull();
  });
});

describe('Funcionalidade: Uma chamada à API por carregamento (RN50)', () => {
  let fetchFalso: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchFalso = vi.fn();
    vi.stubGlobal('fetch', fetchFalso);
  });

  it('Cenário: Dado uma filial válida, quando a página carrega e re-renderiza por estado interno, então fetch foi chamado exatamente 1 vez', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaPanfletoImagem()));
    const { container, rerender } = abrir('/f/k7Qm2xPa');
    await waitFor(() => expect(container.querySelector('.panfleto__imagem')).not.toBeNull());

    // Troca de estado interno: a imagem falha e o consumidor toca em "Tentar de novo" do panfleto.
    const imagem = container.querySelector('.panfleto__imagem');
    if (!imagem) throw new Error('imagem do panfleto ausente');
    fireEvent.error(imagem);
    await userEvent.click(await screen.findByRole('button', { name: 'Tentar de novo' }));
    await waitFor(() => expect(container.querySelector('.panfleto__imagem')).not.toBeNull());
    rerender(<App />);

    expect(fetchFalso).toHaveBeenCalledTimes(1);
  });

  it('Cenário: Dado a página carregada, quando a aba perde e volta a ter foco, então nenhuma nova chamada é feita', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaEstrutura()));
    abrir('/f/k7Qm2xPa');
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });

    act(() => {
      document.dispatchEvent(new Event('visibilitychange'));
      window.dispatchEvent(new Event('blur'));
      window.dispatchEvent(new Event('focus'));
      window.dispatchEvent(new Event('online'));
    });

    expect(fetchFalso).toHaveBeenCalledTimes(1);
  });
});
