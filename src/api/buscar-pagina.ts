import type { PaginaPublica } from './tipos';

export type ResultadoPagina =
  { tipo: 'ok'; pagina: PaginaPublica } | { tipo: 'nao-encontrada' } | { tipo: 'sem-conexao' };

export const TEMPO_LIMITE_MS = 10_000;

const ehObjeto = (valor: unknown): valor is Record<string, unknown> =>
  typeof valor === 'object' && valor !== null && !Array.isArray(valor);

/** Validação mínima do formato (sem biblioteca de schema). */
export function ehPaginaPublica(dados: unknown): dados is PaginaPublica {
  if (!ehObjeto(dados)) return false;
  const { lojista, sePanfleto, estrutura, panfleto, aparencia } = dados;
  return (
    ehObjeto(lojista) &&
    typeof lojista.nome === 'string' &&
    typeof sePanfleto === 'boolean' &&
    ehObjeto(estrutura) &&
    Array.isArray(estrutura.categorias) &&
    (panfleto === null || ehObjeto(panfleto)) &&
    ehObjeto(aparencia) &&
    ehObjeto(aparencia.cores) &&
    typeof aparencia.exibirNomeCategoria === 'boolean' &&
    (aparencia.banner === null || ehObjeto(aparencia.banner))
  );
}

function combinarSinais(sinal: AbortSignal | undefined): AbortSignal {
  const limite = AbortSignal.timeout(TEMPO_LIMITE_MS);
  return sinal ? AbortSignal.any([sinal, limite]) : limite;
}

/**
 * 404 → nao-encontrada (RN35: inexistente e lojista não ativo respondem igual).
 * 429, 5xx, rede, tempo limite ou JSON fora do formato → sem-conexao.
 * ETag/304 e stale-while-revalidate ficam com o cache HTTP do navegador.
 */
export async function buscarPagina(codigo: string, sinal?: AbortSignal): Promise<ResultadoPagina> {
  try {
    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/publico/filiais/${codigo}`, {
      signal: combinarSinais(sinal),
      headers: { Accept: 'application/json' },
    });
    if (resposta.status === 404) return { tipo: 'nao-encontrada' };
    if (!resposta.ok) return { tipo: 'sem-conexao' };
    const dados: unknown = await resposta.json();
    return ehPaginaPublica(dados) ? { tipo: 'ok', pagina: dados } : { tipo: 'sem-conexao' };
  } catch {
    return { tipo: 'sem-conexao' };
  }
}
