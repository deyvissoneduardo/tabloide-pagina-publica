import { useCallback, useEffect, useState } from 'react';
import { buscarPagina, type ResultadoPagina } from '../api/buscar-pagina';

export type EstadoPagina = { tipo: 'carregando' } | ResultadoPagina;

const NAO_ENCONTRADA: EstadoPagina = { tipo: 'nao-encontrada' };

export function usePagina(codigo: string | null): { estado: EstadoPagina; tentarDeNovo: () => void } {
  const [tentativa, setTentativa] = useState(0);
  const [resultado, setResultado] = useState<{ chave: string; estado: EstadoPagina } | null>(null);
  const chave = `${codigo ?? ''}#${tentativa}`;

  useEffect(() => {
    if (codigo === null) return;
    const controle = new AbortController();
    void buscarPagina(codigo, controle.signal).then((estado) => {
      if (!controle.signal.aborted) setResultado({ chave, estado });
    });
    return () => controle.abort();
  }, [codigo, chave]);

  const tentarDeNovo = useCallback(() => setTentativa((n) => n + 1), []);

  if (codigo === null) return { estado: NAO_ENCONTRADA, tentarDeNovo };
  const estado: EstadoPagina = resultado?.chave === chave ? resultado.estado : { tipo: 'carregando' };
  return { estado, tentarDeNovo };
}
