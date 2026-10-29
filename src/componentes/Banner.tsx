import type { BannerPublico } from '../api/tipos';

interface Props {
  banner: BannerPublico;
  /** Título acessível quando o banner não tem nome próprio (não há fallback visual, U4). */
  nomeLojista: string;
}

/**
 * Substitui o cabeçalho (U3, plano §4.6): linha [logo] [nome] e, abaixo, a foto 16:9 ou a descrição.
 * Sem logo nem nome, a linha some; sem nada, é só a faixa de cor.
 */
export function Banner({ banner, nomeLojista }: Props) {
  const { nome, logoUrl, campanha } = banner;
  return (
    <header className="banner">
      {(logoUrl || nome) && (
        <div className="banner__topo">
          {logoUrl && (
            <div className="banner__marca">
              <img
                className="banner__logo"
                src={logoUrl}
                alt={nome ? `Logo de ${nome}` : 'Logo'}
                width="56"
                height="56"
                decoding="async"
              />
            </div>
          )}
          {nome && <h1 className="banner__nome">{nome}</h1>}
        </div>
      )}
      {!nome && <h1 className="visualmente-oculto">{nomeLojista}</h1>}
      {campanha?.tipo === 'FOTO' && (
        <img
          className="banner__foto"
          src={campanha.fotoUrl}
          alt={nome ? `Campanha de ${nome}` : 'Campanha'}
          width="1600"
          height="900"
          decoding="async"
          fetchPriority="high"
        />
      )}
      {campanha?.tipo === 'DESCRICAO' && <p className="banner__descricao">{campanha.descricao}</p>}
    </header>
  );
}
