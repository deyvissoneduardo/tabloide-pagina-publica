/**
 * Contrato de GET /v1/publico/filiais/:codigo (plano_pagina_publica/plano.md §4.1),
 * com `aparencia` de plano_pagina_publica_melhorias/plano.md §4.5.
 */

/** Data sem hora, "AAAA-MM-DD". */
export type DataISO = string;

export interface LojistaPublico {
  nome: string;
  logoUrl: string | null;
  corPrimaria: string | null;
  corSecundaria: string | null;
}

export interface EnderecoPublico {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface FilialPublica {
  nome: string;
  endereco: EnderecoPublico | null;
}

export interface PanfletoPublico {
  tipo: 'IMAGEM' | 'PDF';
  arquivoUrl: string;
  /** IMAGEM: px; PDF: pontos da página 1, arredondados. */
  largura: number;
  altura: number;
  validoAte?: DataISO;
}

export interface ProdutoPublico {
  nome: string;
  quantidade?: string;
  descricao?: string;
  observacao?: string;
  precoPromocionalCentavos: number;
  precoOriginalCentavos?: number;
  fotoUrl?: string;
  validoAte?: DataISO;
}

export interface CategoriaPublica {
  nome: string;
  produtos: ProdutoPublico[];
}

export interface EstruturaPublica {
  categorias: CategoriaPublica[];
}

/** As 10 cores da página, já resolvidas pela API (padrões aplicados), em "#RRGGBB". */
export interface CoresPublicas {
  primaria: string;
  secundaria: string;
  texto: string;
  textoSuave: string;
  fundoCartao: string;
  fundoPagina: string;
  neutra: string;
  sobreCor: string;
  fundoBanner: string;
  categoria: string;
}

export type CampanhaPublica = { tipo: 'FOTO'; fotoUrl: string } | { tipo: 'DESCRICAO'; descricao: string };

/** Campos ausentes = não mostrar (sem fallback, U4). */
export interface BannerPublico {
  nome?: string;
  logoUrl?: string;
  campanha?: CampanhaPublica;
}

export interface AparenciaPublica {
  cores: CoresPublicas;
  exibirNomeCategoria: boolean;
  /** null: banner desligado ou panfleto em exibição (a API decide, T2). */
  banner: BannerPublico | null;
}

export interface PaginaPublica {
  /** corPrimaria/corSecundaria seguem no JSON (T4), mas a página usa `aparencia.cores`. */
  lojista: LojistaPublico;
  sePanfleto: boolean;
  /** Não exibida na página (U9); `nome` só no título da aba. */
  filial: FilialPublica;
  panfleto: PanfletoPublico | null;
  estrutura: EstruturaPublica;
  aparencia: AparenciaPublica;
  hoje: DataISO;
  geradoEm?: string;
}
