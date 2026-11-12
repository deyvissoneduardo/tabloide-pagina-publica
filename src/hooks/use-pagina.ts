import { useCallback, useEffect, useState } from 'react';
import { buscarPagina, type ResultadoPagina } from '../api/buscar-pagina';
import type { Origem } from '../origem';

export type EstadoPagina = { tipo: 'carregando' } | ResultadoPagina;

const NAO_ENCONTRADA: EstadoPagina = { tipo: 'nao-encontrada' };

/**
 * Exatamente 1 chamada por carregamento (+1 por "Tentar de novo"): cada chamada conta um acesso (RN50).
 * `origem` é fixa durante o carregamento (lida uma vez no App) e não dispara nova busca.
 */
export function usePagina(
  codigo: string | null,
  origem?: Origem,
): { estado: EstadoPagina; tentarDeNovo: () => void } {
  const [tentativa, setTentativa] = useState(0);
  const [resultado, setResultado] = useState<{ chave: string; estado: EstadoPagina } | null>(null);
  const chave = `${codigo ?? ''}#${tentativa}`;

  useEffect(() => {
    if (codigo === null) return;
    const controle = new AbortController();
    void buscarPagina(codigo, controle.signal, origem).then((estado) => {
      if (!controle.signal.aborted) setResultado({ chave, estado });
    });
    return () => controle.abort();
  }, [codigo, chave, origem]);

  const tentarDeNovo = useCallback(() => setTentativa((n) => n + 1), []);

  if (codigo === null) return { estado: NAO_ENCONTRADA, tentarDeNovo };
  const estado: EstadoPagina = resultado?.chave === chave ? resultado.estado : { tipo: 'carregando' };
  return { estado, tentarDeNovo };
}
