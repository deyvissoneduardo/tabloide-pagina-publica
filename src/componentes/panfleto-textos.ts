import type { PanfletoPublico } from '../api/tipos';
import { formatarDataCurta } from '../formatacao/data';

/** "Panfleto de ofertas" + " válido até dd/mm" quando há data limite. */
export function textoAlternativoPanfleto(panfleto: PanfletoPublico): string {
  return `Panfleto de ofertas${panfleto.validoAte ? ` válido até ${formatarDataCurta(panfleto.validoAte)}` : ''}`;
}
