import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { paginaEstrutura, respostaJson } from '../../test/fixtures';
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

  it('Cenário: Dado qualquer estado, então não existe <footer>', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaEstrutura()));
    const { container } = abrir('/f/k7Qm2xPa');
    await screen.findByRole('heading', { level: 1, name: 'Mercado Bom Preço' });
    expect(container.querySelector('footer')).toBeNull();
  });
});
