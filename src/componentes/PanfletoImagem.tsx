import { useState } from 'react';
import type { PanfletoPublico } from '../api/tipos';
import { formatarDataCurta } from '../formatacao/data';
import { textoAlternativoPanfleto } from './panfleto-textos';

interface Props {
  panfleto: PanfletoPublico;
}

function comTentativa(url: string, tentativa: number): string {
  if (tentativa === 0) return url;
  return `${url}${url.includes('?') ? '&' : '?'}r=${tentativa}`;
}

/** Zoom: pinça nativa do navegador (RNF01). width/height reservam o espaço (sem salto de layout). */
export function PanfletoImagem({ panfleto }: Props) {
  const [tentativa, setTentativa] = useState(0);
  const [falhou, setFalhou] = useState(false);

  return (
    <section className="panfleto">
      {falhou ? (
        <div className="panfleto__falha">
          <p>Não foi possível abrir o panfleto</p>
          <button
            type="button"
            className="botao"
            onClick={() => {
              setFalhou(false);
              setTentativa((n) => n + 1);
            }}
          >
            Tentar de novo
          </button>
        </div>
      ) : (
        <img
          className="panfleto__imagem"
          src={comTentativa(panfleto.arquivoUrl, tentativa)}
          width={panfleto.largura}
          height={panfleto.altura}
          alt={textoAlternativoPanfleto(panfleto)}
          decoding="async"
          fetchPriority="high"
          onError={() => setFalhou(true)}
        />
      )}
      {panfleto.validoAte && (
        <p className="panfleto__validade">Válido até {formatarDataCurta(panfleto.validoAte)}</p>
      )}
    </section>
  );
}
