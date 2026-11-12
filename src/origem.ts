/**
 * `?origem=painel`: o lojista abriu a própria página pelo botão do painel e o acesso não conta (RN50).
 * A origem vive só na memória do carregamento atual (nada de localStorage/sessionStorage).
 */
export type Origem = 'painel';

const PARAMETRO = 'origem';

/** Lê a origem da query string. Só 'painel' é reconhecido; o resto é ignorado. */
export function extrairOrigem(search: string): Origem | undefined {
  return new URLSearchParams(search).get(PARAMETRO) === 'painel' ? 'painel' : undefined;
}

/**
 * Remove `origem` da barra de endereço sem recarregar nem criar entrada no histórico,
 * para o lojista não copiar o link com o parâmetro e mandar a clientes.
 */
export function limparOrigemDaUrl(): void {
  const url = new URL(window.location.href);
  if (!url.searchParams.has(PARAMETRO)) return;
  url.searchParams.delete(PARAMETRO);
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}
