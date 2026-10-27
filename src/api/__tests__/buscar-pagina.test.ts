import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { paginaEstrutura, respostaJson } from '../../../test/fixtures';
import { buscarPagina, ehPaginaPublica, TEMPO_LIMITE_MS } from '../buscar-pagina';

describe('Funcionalidade: Busca da página pública', () => {
  let fetchFalso: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchFalso = vi.fn();
    vi.stubGlobal('fetch', fetchFalso);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('Cenário: Dado 200 com o JSON do plano, então ok com a página', async () => {
    const pagina = paginaEstrutura();
    fetchFalso.mockResolvedValue(respostaJson(pagina));
    await expect(buscarPagina('k7Qm2xPa')).resolves.toEqual({ tipo: 'ok', pagina });
  });

  it('Cenário: Dado 404, então nao-encontrada', async () => {
    fetchFalso.mockResolvedValue(respostaJson({ codigo: 'RECURSO_NAO_ENCONTRADO' }, 404));
    await expect(buscarPagina('k7Qm2xPa')).resolves.toEqual({ tipo: 'nao-encontrada' });
  });

  it.each([429, 500, 503])('Cenário: Dado %i, então sem-conexao', async (status) => {
    fetchFalso.mockResolvedValue(respostaJson({}, status));
    await expect(buscarPagina('k7Qm2xPa')).resolves.toEqual({ tipo: 'sem-conexao' });
  });

  it('Cenário: Dado erro de rede, então sem-conexao', async () => {
    fetchFalso.mockRejectedValue(new TypeError('Failed to fetch'));
    await expect(buscarPagina('k7Qm2xPa')).resolves.toEqual({ tipo: 'sem-conexao' });
  });

  it('Cenário: Dado resposta acima de 10 s, então sem-conexao', async () => {
    vi.useFakeTimers();
    // AbortSignal.timeout é nativo e não obedece aos timers falsos: substituído por um equivalente.
    const timeout = vi.spyOn(AbortSignal, 'timeout').mockImplementation((ms: number) => {
      const controle = new AbortController();
      setTimeout(() => controle.abort(new DOMException('Tempo esgotado', 'TimeoutError')), ms);
      return controle.signal;
    });
    fetchFalso.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolver, rejeitar) => {
          init.signal?.addEventListener('abort', () => rejeitar(init.signal?.reason));
        }),
    );
    const resultado = buscarPagina('k7Qm2xPa');
    await vi.advanceTimersByTimeAsync(TEMPO_LIMITE_MS + 1);
    await expect(resultado).resolves.toEqual({ tipo: 'sem-conexao' });
    expect(timeout).toHaveBeenCalledWith(10_000);
  });

  it('Cenário: Dado JSON sem estrutura.categorias, então sem-conexao', async () => {
    const { estrutura: _estrutura, ...semEstrutura } = paginaEstrutura();
    fetchFalso.mockResolvedValue(respostaJson(semEstrutura));
    await expect(buscarPagina('k7Qm2xPa')).resolves.toEqual({ tipo: 'sem-conexao' });
  });

  it('Cenário: Dado corpo que não é JSON, então sem-conexao', async () => {
    fetchFalso.mockResolvedValue(new Response('<html>', { status: 200 }));
    await expect(buscarPagina('k7Qm2xPa')).resolves.toEqual({ tipo: 'sem-conexao' });
  });

  it('Cenário: Dado o código, então a URL chamada é VITE_API_URL + /publico/filiais/<codigo>', async () => {
    fetchFalso.mockResolvedValue(respostaJson(paginaEstrutura()));
    await buscarPagina('k7Qm2xPa');
    expect(fetchFalso).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/publico/filiais/k7Qm2xPa`,
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    );
  });

  it('Cenário: Dado sinal externo abortado, então sem-conexao', async () => {
    const controle = new AbortController();
    fetchFalso.mockImplementation((_url: string, init: RequestInit) =>
      init.signal?.aborted ? Promise.reject(init.signal.reason) : Promise.resolve(respostaJson({})),
    );
    controle.abort();
    await expect(buscarPagina('k7Qm2xPa', controle.signal)).resolves.toEqual({ tipo: 'sem-conexao' });
  });
});

describe('Funcionalidade: Validação mínima do JSON', () => {
  it('Cenário: Dado o fixture do plano, então é página pública', () => {
    expect(ehPaginaPublica(paginaEstrutura())).toBe(true);
  });

  it.each([
    ['nulo', null],
    ['array', []],
    ['sem lojista.nome', { ...paginaEstrutura(), lojista: {} }],
    ['sePanfleto texto', { ...paginaEstrutura(), sePanfleto: 'sim' }],
    ['categorias não array', { ...paginaEstrutura(), estrutura: { categorias: {} } }],
    ['panfleto texto', { ...paginaEstrutura(), panfleto: 'x' }],
    ['formato antigo (categorias na raiz)', { ...paginaEstrutura(), estrutura: undefined, categorias: [] }],
  ])('Cenário: Dado %s, então não é página pública', (_nome, dados) => {
    expect(ehPaginaPublica(dados)).toBe(false);
  });
});
