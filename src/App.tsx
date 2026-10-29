import { lazy, Suspense, useLayoutEffect } from 'react';
import type { PaginaPublica } from './api/tipos';
import { AreaPanfleto } from './componentes/AreaPanfleto';
import { Banner } from './componentes/Banner';
import { Cabecalho } from './componentes/Cabecalho';
import { Esqueleto } from './componentes/Esqueleto';
import { NaoEncontrada } from './componentes/NaoEncontrada';
import { PaginaMontada } from './componentes/PaginaMontada';
import { PanfletoImagem } from './componentes/PanfletoImagem';
import { SemConexao } from './componentes/SemConexao';
import { usePagina } from './hooks/use-pagina';
import { extrairCodigo } from './rota';
import { aplicarTema } from './tema/aplicar-tema';

/** pdf.js só é baixado quando o panfleto é PDF (orçamento do bundle inicial, R7/R8). */
const PanfletoPdf = lazy(() => import('./componentes/PanfletoPdf'));

function Pagina({ pagina }: { pagina: PaginaPublica }) {
  const { lojista, filial, panfleto, aparencia } = pagina;

  // Antes da pintura: as cores do lojista já aparecem no primeiro quadro.
  useLayoutEffect(() => {
    aplicarTema(aparencia.cores);
    document.title = `${lojista.nome} — ${filial.nome}`;
  }, [aparencia.cores, lojista.nome, filial.nome]);

  return (
    <>
      {/* A API já decidiu o banner (T2: null se desligado ou com panfleto); o cliente só o mostra. */}
      {aparencia.banner ? (
        <Banner banner={aparencia.banner} nomeLojista={lojista.nome} />
      ) : (
        <Cabecalho lojista={lojista} />
      )}
      <main className="conteudo">
        {/* A API já aplicou a regra de exibição (plano §4.8, T2): decide só por panfleto != null. */}
        {panfleto === null ? (
          <PaginaMontada
            categorias={pagina.estrutura.categorias}
            exibirNomeCategoria={aparencia.exibirNomeCategoria}
          />
        ) : panfleto.tipo === 'PDF' ? (
          <Suspense
            fallback={
              <section className="panfleto">
                <AreaPanfleto panfleto={panfleto}>
                  <Esqueleto variante="bloco" rotulo="Carregando panfleto" />
                </AreaPanfleto>
              </section>
            }
          >
            <PanfletoPdf panfleto={panfleto} />
          </Suspense>
        ) : (
          <PanfletoImagem panfleto={panfleto} />
        )}
      </main>
    </>
  );
}

export default function App() {
  const codigo = extrairCodigo(window.location.pathname);
  const { estado, tentarDeNovo } = usePagina(codigo);
  switch (estado.tipo) {
    case 'carregando':
      return <Esqueleto />;
    case 'nao-encontrada':
      return <NaoEncontrada />;
    case 'sem-conexao':
      return <SemConexao aoTentarDeNovo={tentarDeNovo} />;
    case 'ok':
      return <Pagina pagina={estado.pagina} />;
  }
}
