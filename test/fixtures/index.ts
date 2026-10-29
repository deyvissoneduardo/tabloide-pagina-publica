import type { PaginaPublica } from '../../src/api/tipos';
import bannerDescricao from './pagina-banner-descricao.json';
import bannerFoto from './pagina-banner-foto.json';
import estrutura from './pagina-estrutura.json';
import panfletoImagem from './pagina-panfleto-imagem.json';
import panfletoPdf from './pagina-panfleto-pdf.json';
import semNomeCategoria from './pagina-sem-nome-categoria.json';
import vazia from './pagina-vazia.json';

/** Cópia nova a cada chamada: os testes podem alterar sem vazar entre cenários. */
const copia = (dados: unknown): PaginaPublica => structuredClone(dados) as PaginaPublica;

export const paginaEstrutura = () => copia(estrutura);
export const paginaPanfletoImagem = () => copia(panfletoImagem);
export const paginaPanfletoPdf = () => copia(panfletoPdf);
export const paginaVazia = () => copia(vazia);
export const paginaBannerFoto = () => copia(bannerFoto);
export const paginaBannerDescricao = () => copia(bannerDescricao);
export const paginaSemNomeCategoria = () => copia(semNomeCategoria);

export function respostaJson(dados: unknown, status = 200): Response {
  return new Response(JSON.stringify(dados), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
