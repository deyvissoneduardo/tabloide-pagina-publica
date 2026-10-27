import type { EnderecoPublico, FilialPublica, LojistaPublico } from '../api/tipos';

interface Props {
  lojista: LojistaPublico;
  filial: FilialPublica;
}

/** Até 2 letras: primeira e última palavra do nome. */
export function iniciais(nome: string): string {
  const palavras = nome.trim().split(/\s+/).filter(Boolean);
  const primeira = palavras[0]?.[0] ?? '';
  const ultima = palavras.length > 1 ? (palavras[palavras.length - 1]?.[0] ?? '') : '';
  return (primeira + ultima).toUpperCase();
}

/** "logradouro, numero - bairro, cidade/UF". */
export function enderecoResumido(e: EnderecoPublico): string {
  return `${e.logradouro}, ${e.numero} - ${e.bairro}, ${e.cidade}/${e.uf}`;
}

export function Cabecalho({ lojista, filial }: Props) {
  return (
    <header className="cabecalho">
      {lojista.logoUrl ? (
        <img
          className="cabecalho__logo"
          src={lojista.logoUrl}
          alt={`Logo de ${lojista.nome}`}
          width="48"
          height="48"
          decoding="async"
        />
      ) : (
        <span className="cabecalho__iniciais" aria-hidden="true">
          {iniciais(lojista.nome)}
        </span>
      )}
      <div className="cabecalho__textos">
        <h1 className="cabecalho__nome">{lojista.nome}</h1>
        <p className="cabecalho__filial">{filial.nome}</p>
        {filial.endereco && <p className="cabecalho__endereco">{enderecoResumido(filial.endereco)}</p>}
      </div>
    </header>
  );
}
