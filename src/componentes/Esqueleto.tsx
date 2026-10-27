interface Props {
  /** "pagina": cabeçalho + 2 faixas de cartões; "bloco": preenche a área do pai (panfleto). */
  variante?: 'pagina' | 'bloco';
  rotulo?: string;
}

/** Blocos cinza estáticos (sem animação). */
export function Esqueleto({ variante = 'pagina', rotulo = 'Carregando ofertas' }: Props) {
  if (variante === 'bloco') {
    return (
      <div className="esqueleto esqueleto--bloco" aria-busy="true" role="status">
        <span className="visualmente-oculto">{rotulo}</span>
      </div>
    );
  }
  return (
    <div className="esqueleto" aria-busy="true" role="status">
      <span className="visualmente-oculto">{rotulo}</span>
      <div className="esqueleto__cabecalho" aria-hidden="true">
        <div className="esqueleto__logo" />
        <div className="esqueleto__linhas">
          <div className="esqueleto__linha esqueleto__linha--larga" />
          <div className="esqueleto__linha" />
        </div>
      </div>
      {[0, 1].map((faixa) => (
        <div className="esqueleto__faixa" aria-hidden="true" key={faixa}>
          <div className="esqueleto__linha esqueleto__titulo" />
          <div className="esqueleto__cartoes">
            {[0, 1, 2].map((cartao) => (
              <div className="esqueleto__cartao" key={cartao} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
