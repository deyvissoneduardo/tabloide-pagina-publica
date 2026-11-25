import { useEffect, type ReactNode } from 'react';
import '../estilos/documento-legal.css';
import { ehPendente } from './privacidade-conteudo';

export interface SecaoLegal {
  readonly id: string;
  readonly titulo: string;
}

/**
 * Layout comum da Política de Privacidade e dos Termos de Uso: topo, título, data de atualização,
 * introdução, sumário, seções e rodapé com os links entre os documentos.
 */
export function DocumentoLegal({
  titulo,
  atualizacao,
  introducao,
  secoes,
  children,
}: {
  titulo: string;
  atualizacao: string;
  introducao: ReactNode;
  secoes: readonly SecaoLegal[];
  children: ReactNode;
}) {
  useEffect(() => {
    document.title = `${titulo} — Tabloide Digital`;
  }, [titulo]);

  return (
    <div className="dl">
      <header className="dl-topo">
        <a className="dl-topo__marca" href="/">
          Tabloide <b>Digital</b>
        </a>
        <a className="dl-topo__voltar" href="/">
          Voltar ao início
        </a>
      </header>

      <main className="dl-conteudo">
        <h1>{titulo}</h1>
        <p className="dl-atualizacao">
          Última atualização: <Campo valor={atualizacao} />
        </p>

        {introducao}

        <nav className="dl-indice" aria-label="Sumário">
          <h2>Sumário</h2>
          <ol>
            {secoes.map((secao) => (
              <li key={secao.id}>
                <a href={`#${secao.id}`}>{secao.titulo}</a>
              </li>
            ))}
          </ol>
        </nav>

        {children}
      </main>

      <footer className="dl-rodape">
        <nav aria-label="Documentos">
          <a href="/termos">Termos de Uso</a>
          <a href="/privacidade">Política de Privacidade</a>
        </nav>
        <small>© {new Date().getFullYear()} Tabloide Digital.</small>
      </footer>
    </div>
  );
}

export function Secao({ secao, children }: { secao: SecaoLegal; children: ReactNode }) {
  return (
    <section id={secao.id} className="dl-secao" aria-labelledby={`${secao.id}-titulo`}>
      <h2 id={`${secao.id}-titulo`}>{secao.titulo}</h2>
      {children}
    </section>
  );
}

/** Valor do documento; pendente (entre colchetes) aparece destacado para não passar despercebido. */
export function Campo({ valor }: { valor: string }) {
  return ehPendente(valor) ? <mark className="dl-pendente">{valor}</mark> : <>{valor}</>;
}

export function Contato({ email }: { email: string }) {
  if (ehPendente(email)) return <Campo valor={email} />;
  return <a href={`mailto:${email}`}>{email}</a>;
}
