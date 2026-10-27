import type { LojistaPublico } from '../api/tipos';
import { corDeTexto, PRIMARIA_PADRAO, SECUNDARIA_PADRAO } from './cores';

export function aplicarTema(lojista: LojistaPublico): void {
  const raiz = document.documentElement;
  raiz.style.setProperty('--cor-primaria', corDeTexto(lojista.corPrimaria, PRIMARIA_PADRAO));
  raiz.style.setProperty('--cor-secundaria', corDeTexto(lojista.corSecundaria, SECUNDARIA_PADRAO));
}
