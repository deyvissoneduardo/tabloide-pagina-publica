import { lazy, Suspense, useLayoutEffect } from 'react';
import type { PaginaPublica } from './api/tipos';
import { AreaPanfleto } from './componentes/AreaPanfleto';
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
  const { lojista, filial, panfleto } = pagina;

  // Antes da pintura: as cores do lojista já aparecem no primeiro quadro.
  useLayoutEffect(() => {
    aplicarTema(lojista);
    document.title = `${lojista.nome} — ${filial.nome}`;
  }, [lojista, filial.nome]);

  return (
    <>
      <Cabecalho lojista={lojista} filial={filial} />
      <main className="conteudo">
        {/* A API já aplicou a regra de exibição (plano §4.8, T2): decide só por panfleto != null. */}
        {panfleto === null ? (
          <PaginaMontada categorias={pagina.estrutura.categorias} />
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
