/** Contrato de GET /v1/publico/filiais/:codigo (plano_pagina_publica/plano.md §4.1). */

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

export interface PaginaPublica {
  lojista: LojistaPublico;
  sePanfleto: boolean;
  filial: FilialPublica;
  panfleto: PanfletoPublico | null;
  estrutura: EstruturaPublica;
  hoje: DataISO;
  geradoEm?: string;
}
