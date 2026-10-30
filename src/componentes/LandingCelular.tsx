import { PRODUTOS_FICTICIOS } from './landing-conteudo';

/** "Print" fictício da página pública aberta no celular do consumidor. A lista rola sozinha em loop. */
export function LandingCelular() {
  // Duplicada para o loop da rolagem não ter emenda.
  const produtos = [...PRODUTOS_FICTICIOS, ...PRODUTOS_FICTICIOS];
  return (
    <div className="lp-celular" role="img" aria-label="Exemplo da página de ofertas aberta no celular">
      <div className="lp-celular__moldura" aria-hidden="true">
        <span className="lp-celular__notch" />
        <div className="lp-celular__tela">
          <div className="lp-celular__banner">
            <span className="lp-celular__logo">MB</span>
            <div>
              <strong className="lp-celular__loja">Mercado Bom Preço</strong>
              <span className="lp-celular__campanha">Semana do Cliente 🔥</span>
            </div>
          </div>
          <div className="lp-celular__rolagem">
            <div className="lp-celular__lista">
              <span className="lp-celular__categoria">Ofertas da semana</span>
              <div className="lp-celular__grade">
                {produtos.map((produto, i) => (
                  <div className="lp-produto" key={i}>
                    {produto.desconto && <span className="lp-produto__selo">{produto.desconto}</span>}
                    <span className="lp-produto__foto">{produto.emoji}</span>
                    <span className="lp-produto__nome">{produto.nome}</span>
                    <span className="lp-produto__qtd">{produto.quantidade}</span>
                    {produto.precoOriginal && (
                      <span className="lp-produto__de">R$ {produto.precoOriginal}</span>
                    )}
                    <span className="lp-produto__preco">R$ {produto.preco}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
