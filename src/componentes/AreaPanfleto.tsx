import type { ReactNode } from 'react';
import type { PanfletoPublico } from '../api/tipos';

interface Props {
  panfleto: PanfletoPublico;
  children: ReactNode;
}

/** Reserva o espaço do panfleto pela proporção largura/altura (CLS baixo enquanto o PDF carrega). */
export function AreaPanfleto({ panfleto, children }: Props) {
  return (
    <div
      className="panfleto__area"
      data-testid="area-panfleto"
      style={{ aspectRatio: `${panfleto.largura} / ${panfleto.altura}` }}
    >
      {children}
    </div>
  );
}
