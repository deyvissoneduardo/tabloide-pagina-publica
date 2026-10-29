import type { CoresPublicas } from '../api/tipos';

/** Variável CSS de cada cor (plano_pagina_publica_melhorias/plano.md §4.4). */
const VARIAVEIS: Record<keyof CoresPublicas, string> = {
  primaria: '--cor-primaria',
  secundaria: '--cor-secundaria',
  texto: '--cor-texto',
  textoSuave: '--cor-texto-suave',
  fundoCartao: '--cor-fundo',
  fundoPagina: '--cor-fundo-pagina',
  neutra: '--cor-neutra',
  sobreCor: '--cor-sobre-cor',
  fundoBanner: '--cor-fundo-banner',
  categoria: '--cor-categoria',
};

/** Cor exata recebida (U13): a API já resolveu os padrões; nenhum ajuste de contraste aqui. */
export function aplicarTema(cores: CoresPublicas): void {
  const raiz = document.documentElement;
  for (const [chave, variavel] of Object.entries(VARIAVEIS) as [keyof CoresPublicas, string][]) {
    raiz.style.setProperty(variavel, cores[chave]);
  }
}
