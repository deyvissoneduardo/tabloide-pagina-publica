import type { LojistaPublico } from '../api/tipos';

interface Props {
  lojista: LojistaPublico;
}

/** Até 2 letras: primeira e última palavra do nome. */
export function iniciais(nome: string): string {
  const palavras = nome.trim().split(/\s+/).filter(Boolean);
  const primeira = palavras[0]?.[0] ?? '';
  const ultima = palavras.length > 1 ? (palavras[palavras.length - 1]?.[0] ?? '') : '';
  return (primeira + ultima).toUpperCase();
}

/** Igual ao cabeçalho da prévia Flutter: logo (ou iniciais) + nome fantasia, sem filial (U9). */
export function Cabecalho({ lojista }: Props) {
  return (
    <header className="cabecalho">
      <div className="cabecalho__marca">
        {lojista.logoUrl ? (
          <img
            className="cabecalho__logo"
            src={lojista.logoUrl}
            alt={`Logo de ${lojista.nome}`}
            width="56"
            height="56"
            decoding="async"
          />
        ) : (
          <span className="cabecalho__iniciais" aria-hidden="true">
            {iniciais(lojista.nome)}
          </span>
        )}
      </div>
      <h1 className="cabecalho__nome">{lojista.nome}</h1>
    </header>
  );
}
