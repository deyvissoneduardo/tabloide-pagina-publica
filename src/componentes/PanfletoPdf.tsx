import { AnnotationMode, getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { useEffect, useRef, useState } from 'react';
import type { PanfletoPublico } from '../api/tipos';
import { formatarDataCurta } from '../formatacao/data';
import { AreaPanfleto } from './AreaPanfleto';
import { Esqueleto } from './Esqueleto';
import { textoAlternativoPanfleto } from './panfleto-textos';

GlobalWorkerOptions.workerSrc = workerUrl;

/** Teto do lado maior do canvas (memória de celular). */
export const LADO_MAXIMO_CANVAS = 4096;

interface Props {
  panfleto: PanfletoPublico;
}

type Situacao = 'carregando' | 'pronto' | 'falha';

/**
 * Escala do canvas: largura do container × DPR (até 2) × 2, para o texto continuar nítido no zoom de
 * pinça nativo; limitada para o lado maior não passar de LADO_MAXIMO_CANVAS.
 */
export function calcularEscala(
  larguraContainer: number,
  pagina: { width: number; height: number },
  dpr: number,
): number {
  const escala = (larguraContainer / pagina.width) * Math.min(dpr, 2) * 2;
  const teto = LADO_MAXIMO_CANVAS / Math.max(pagina.width, pagina.height);
  return Math.min(escala, teto);
}

/** Desenha só a página 1, sem camada de texto, anotações ou formulários: nada do PDF executa (D3). */
export default function PanfletoPdf({ panfleto }: Props) {
  const area = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [tentativa, setTentativa] = useState(0);
  const [situacao, setSituacao] = useState<Situacao>('carregando');
  const rotulo = textoAlternativoPanfleto(panfleto);

  useEffect(() => {
    let ativo = true;
    // isEvalSupported não existe mais no pdf.js 6 (que não usa eval); fica explícito por segurança.
    const opcoes = {
      url: panfleto.arquivoUrl,
      isEvalSupported: false,
      enableXfa: false,
      disableAutoFetch: false,
      withCredentials: false,
    };
    const tarefa = getDocument(opcoes);

    async function desenhar(): Promise<void> {
      const pdf = await tarefa.promise;
      const pagina = await pdf.getPage(1);
      const elemento = canvas.current;
      if (!ativo || !elemento) return;
      const base = pagina.getViewport({ scale: 1 });
      const larguraContainer = area.current?.clientWidth || base.width;
      const viewport = pagina.getViewport({
        scale: calcularEscala(larguraContainer, base, window.devicePixelRatio || 1),
      });
      elemento.width = Math.floor(viewport.width);
      elemento.height = Math.floor(viewport.height);
      await pagina.render({ canvas: elemento, viewport, annotationMode: AnnotationMode.DISABLE }).promise;
      if (ativo) setSituacao('pronto');
    }

    desenhar().catch(() => {
      if (ativo) setSituacao('falha');
    });

    return () => {
      ativo = false;
      void tarefa.destroy();
    };
  }, [panfleto.arquivoUrl, tentativa]);

  const linkAbrir = (
    <a className="panfleto__abrir" href={panfleto.arquivoUrl} target="_blank" rel="noopener">
      Abrir PDF
    </a>
  );

  return (
    <section className="panfleto">
      {situacao === 'falha' ? (
        <div className="panfleto__falha">
          <p>Não foi possível abrir o panfleto</p>
          <button
            type="button"
            className="botao"
            onClick={() => {
              setSituacao('carregando');
              setTentativa((n) => n + 1);
            }}
          >
            Tentar de novo
          </button>
          {linkAbrir}
        </div>
      ) : (
        <>
          <div ref={area}>
            <AreaPanfleto panfleto={panfleto}>
              {situacao === 'carregando' && <Esqueleto variante="bloco" rotulo="Carregando panfleto" />}
              <canvas
                ref={canvas}
                className="panfleto__canvas"
                role="img"
                aria-label={rotulo}
                hidden={situacao !== 'pronto'}
              />
            </AreaPanfleto>
          </div>
          {panfleto.validoAte && (
            <p className="panfleto__validade">Válido até {formatarDataCurta(panfleto.validoAte)}</p>
          )}
          {linkAbrir}
        </>
      )}
    </section>
  );
}
