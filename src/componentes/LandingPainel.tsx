import { useEffect, useState } from 'react';
import {
  CATEGORIAS_PAINEL,
  FILIAIS_FICTICIAS,
  PRODUTOS_FICTICIOS,
  TELAS_PAINEL,
  type ProdutoFicticio,
  type TelaPainel,
} from './landing-conteudo';
import { LandingIcone, type NomeIcone } from './LandingIcone';
import { LandingQrCode } from './LandingQrCode';

const INTERVALO_TELA_MS = 5000;

/** Menu lateral do painel Flutter, na mesma ordem; só as telas de TELAS_PAINEL são clicáveis. */
const MENU: { rotulo: string; icone: NomeIcone; iconeAtivo: NomeIcone }[] = [
  { rotulo: 'Início', icone: 'home_outlined', iconeAtivo: 'home' },
  { rotulo: 'Filiais', icone: 'storefront_outlined', iconeAtivo: 'storefront_outlined' },
  { rotulo: 'Panfletos', icone: 'photo_library_outlined', iconeAtivo: 'photo_library' },
  { rotulo: 'Produtos', icone: 'sell_outlined', iconeAtivo: 'sell' },
  { rotulo: 'Página', icone: 'web', iconeAtivo: 'web' },
];

const ehTela = (rotulo: string): rotulo is TelaPainel => (TELAS_PAINEL as readonly string[]).includes(rotulo);

const produtosDa = (categoria: string) => PRODUTOS_FICTICIOS.filter((p) => p.categoria === categoria);

const totalProdutos = (n: number) => (n === 1 ? '1 produto' : `${n} produtos`);

/** "Print" fictício do painel do lojista, fiel às telas do front. As telas giram sozinhas até alguém tocar no menu. */
export function LandingPainel() {
  const [tela, setTela] = useState<TelaPainel>('Início');
  const [automatico, setAutomatico] = useState(true);

  useEffect(() => {
    if (!automatico) return;
    const id = window.setInterval(() => {
      setTela((atual) => TELAS_PAINEL[(TELAS_PAINEL.indexOf(atual) + 1) % TELAS_PAINEL.length] ?? 'Início');
    }, INTERVALO_TELA_MS);
    return () => window.clearInterval(id);
  }, [automatico]);

  const linhaAtiva = MENU.findIndex((item) => item.rotulo === tela);

  return (
    <div className="lp-painel">
      <div className="lp-painel__barra" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>adm-tabloide.vercel.app</em>
      </div>
      <div className="lp-painel__corpo">
        <nav className="lp-painel__menu" role="tablist" aria-label="Telas do painel">
          <span className="lp-painel__marca" aria-hidden="true">
            <span className="lp-painel__logo">
              T<i />
            </span>
            <span className="lp-painel__marca-nome">Tabloide Digital</span>
          </span>
          {MENU.map((item) => {
            const ativo = item.rotulo === tela;
            const conteudo = (
              <>
                <span className="lp-painel__indicador">
                  <LandingIcone nome={ativo ? item.iconeAtivo : item.icone} />
                </span>
                <span className="lp-painel__rotulo">{item.rotulo}</span>
              </>
            );
            const rotulo = item.rotulo;
            if (!ehTela(rotulo)) {
              return (
                <span key={rotulo} className="lp-painel__item" aria-hidden="true">
                  {conteudo}
                </span>
              );
            }
            return (
              <button
                key={rotulo}
                type="button"
                role="tab"
                aria-selected={ativo}
                aria-label={rotulo}
                className={`lp-painel__item${ativo ? ' lp-painel__item--ativo' : ''}`}
                onClick={() => {
                  setAutomatico(false);
                  setTela(rotulo);
                }}
              >
                {conteudo}
              </button>
            );
          })}
          <span className="lp-painel__perfil" aria-hidden="true">
            <LandingIcone nome="person_outline" />
            <span className="lp-painel__rotulo">Perfil</span>
          </span>
          {automatico && (
            <span
              className="lp-painel__cursor"
              style={{ ['--linha' as string]: linhaAtiva }}
              aria-hidden="true"
            >
              <span className="lp-painel__clique" key={tela} />
              <svg viewBox="0 0 24 24">
                <path d="M5 3l14 8-6.2 1.4L16 19l-2.6 1.3-3.2-6.6L5 18z" />
              </svg>
            </span>
          )}
        </nav>
        <div className="lp-painel__janela">
          <div
            className={`lp-painel__tela lp-painel__tela--${tela === 'Início' ? 'inicio' : tela === 'Produtos' ? 'produtos' : 'pagina'}`}
            role="tabpanel"
            aria-label={tela}
            key={tela}
          >
            {tela === 'Início' && <TelaInicio />}
            {tela === 'Produtos' && <TelaProdutos />}
            {tela === 'Página' && <TelaPagina />}
          </div>
        </div>
      </div>
    </div>
  );
}

function FotoProduto({ produto, className }: { produto: ProdutoFicticio; className: string }) {
  return (
    <span className={className} aria-hidden="true">
      {produto.emoji}
    </span>
  );
}

function TelaInicio() {
  const resumo: { icone: NomeIcone; rotulo: string; valor: number }[] = [
    { icone: 'storefront_outlined', rotulo: 'Filiais', valor: FILIAIS_FICTICIAS.length },
    { icone: 'photo_library', rotulo: 'Panfletos no ar', valor: 1 },
    { icone: 'sell', rotulo: 'Produtos no ar', valor: PRODUTOS_FICTICIOS.length },
  ];
  return (
    <>
      <ul className="lp-pn-resumo">
        {resumo.map((item, i) => (
          <li key={item.rotulo} className="lp-pn-entrar" style={{ ['--ordem' as string]: i }}>
            <LandingIcone nome={item.icone} />
            <span>{item.rotulo}</span>
            <b>{item.valor}</b>
          </li>
        ))}
      </ul>
      <h4 className="lp-pn-titulo">Suas páginas</h4>
      <div className="lp-pn-filiais">
        {FILIAIS_FICTICIAS.map((filial, i) => (
          <article
            key={filial.nome}
            className="lp-pn-filial lp-pn-entrar"
            style={{ ['--ordem' as string]: i + 3 }}
          >
            <strong>{filial.nome}</strong>
            <span className="lp-pn-filial__status">
              <LandingIcone
                nome={filial.situacao === 'produtos' ? 'sell_outlined' : 'photo_library_outlined'}
              />
              {filial.situacao === 'produtos'
                ? `No ar: ${totalProdutos(PRODUTOS_FICTICIOS.length)}`
                : 'No ar: panfleto'}
            </span>
            <small>https://tabloide-digital.vercel.app/f/{filial.codigo}</small>
            <span className="lp-pn-filial__qr">
              <LandingQrCode rotulo={`QR Code da ${filial.nome}`} escanear={false} />
            </span>
            <span className="lp-pn-filial__acoes" aria-hidden="true">
              <span className="lp-pn-contorno">
                <LandingIcone nome="open_in_new" /> Abrir página
              </span>
              <span className="lp-pn-contorno">
                <LandingIcone nome="copy_outlined" /> Copiar link
              </span>
              <span className="lp-pn-contorno">
                <LandingIcone nome="share_outlined" /> Compartilhar link
              </span>
            </span>
          </article>
        ))}
      </div>
    </>
  );
}

function TelaProdutos() {
  let ordem = 0;
  return (
    <>
      <span className="lp-pn-botao">Novo produto</span>
      <span className="lp-pn-contorno lp-pn-contorno--largo">
        <LandingIcone nome="category_outlined" /> Categorias
      </span>
      {CATEGORIAS_PAINEL.map((categoria) => (
        <section key={categoria} className="lp-pn-grupo">
          <h4 className="lp-pn-titulo">{categoria}</h4>
          {produtosDa(categoria).map((produto) => (
            <div
              key={produto.nome}
              className="lp-pn-produto lp-pn-entrar"
              style={{ ['--ordem' as string]: ordem++ }}
            >
              <FotoProduto produto={produto} className="lp-pn-produto__foto" />
              <span className="lp-pn-produto__texto">
                <span>{produto.nome}</span>
                <span>
                  {produto.precoOriginal
                    ? `de R$ ${produto.precoOriginal} por R$ ${produto.preco}`
                    : `R$ ${produto.preco}`}
                </span>
                <span>
                  Vigente · {produto.validade ? `válido até ${produto.validade}` : 'sem data limite'}
                </span>
              </span>
              <LandingIcone nome="more_horiz" className="lp-pn-produto__mais" />
            </div>
          ))}
        </section>
      ))}
    </>
  );
}

function TelaPagina() {
  const previa = PRODUTOS_FICTICIOS.filter((p) => p.desconto);
  return (
    <>
      <span className="lp-pn-botao lp-pn-botao--desabilitado">Publicar</span>
      <div className="lp-pn-pagina">
        <div className="lp-pn-montar">
          <div className="lp-pn-abas" aria-hidden="true">
            <span className="lp-pn-abas__ativa">Montar</span>
            <span>Aparência</span>
          </div>
          {CATEGORIAS_PAINEL.slice(0, 3).map((categoria, i) => {
            const produtos = produtosDa(categoria);
            return (
              <div key={categoria} className="lp-pn-bloco lp-pn-entrar" style={{ ['--ordem' as string]: i }}>
                <div className="lp-pn-bloco__topo">
                  <LandingIcone nome="drag_indicator" />
                  <span>
                    <b>{categoria}</b>
                    <small>{totalProdutos(produtos.length)}</small>
                  </span>
                </div>
                <div className="lp-pn-bloco__itens">
                  {produtos.map((produto, j) => (
                    <div
                      key={produto.nome}
                      className={`lp-pn-mini${i === 0 && j === 0 ? ' lp-pn-mini--arrastando' : ''}`}
                    >
                      <span className="lp-pn-mini__topo">
                        <FotoProduto produto={produto} className="lp-pn-mini__foto" />
                        <LandingIcone nome="drag_indicator" />
                      </span>
                      <span className="lp-pn-mini__nome">{produto.nome}</span>
                      <span className="lp-pn-mini__preco">R$ {produto.preco}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="lp-pn-previa">
          <div className="lp-pn-previa__banner">
            <span className="lp-pn-previa__topo">
              <span className="lp-pn-previa__logo" aria-hidden="true">
                🛒
              </span>
              <b>Promoção de Novembro</b>
            </span>
            <span className="lp-pn-previa__campanha" aria-hidden="true">
              {['🍚', '☕', '🥩', '🥖', '🍌', '🥤'].map((emoji) => (
                <span key={emoji}>{emoji}</span>
              ))}
              <em>até 25% OFF</em>
            </span>
          </div>
          <div className="lp-pn-previa__grade">
            {previa.map((produto, i) => (
              <div
                key={produto.nome}
                className="lp-pn-cartao lp-pn-entrar"
                style={{ ['--ordem' as string]: i + 2 }}
              >
                <span className="lp-pn-cartao__foto" aria-hidden="true">
                  {produto.emoji}
                  <i>{produto.desconto}</i>
                </span>
                <span className="lp-pn-cartao__corpo">
                  <span className="lp-pn-cartao__nome">{produto.nome}</span>
                  <s>de R$ {produto.precoOriginal}</s>
                  <b>R$ {produto.preco}</b>
                  {produto.validade && <small>válido até {produto.validade}</small>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
