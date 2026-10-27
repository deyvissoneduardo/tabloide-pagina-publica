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

function IconeLocal() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

export function Cabecalho({ lojista, filial }: Props) {
  return (
    <header className="cabecalho">
      <div className="cabecalho__marca">
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
      </div>
      <div className="cabecalho__textos">
        <h1 className="cabecalho__nome">{lojista.nome}</h1>
        <p className="cabecalho__filial">{filial.nome}</p>
        {filial.endereco && (
          <p className="cabecalho__endereco">
            <IconeLocal />
            {enderecoResumido(filial.endereco)}
          </p>
        )}
      </div>
    </header>
  );
}
