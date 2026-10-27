import type { ProdutoPublico } from '../api/tipos';
import { formatarDataCurta } from '../formatacao/data';
import { formatarDinheiro } from '../formatacao/dinheiro';

interface Props {
  produto: ProdutoPublico;
  /** As 2 primeiras fotos da 1ª categoria carregam sem lazy (LCP). */
  prioritario?: boolean;
}

function IconeEtiqueta() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7c0 .55.22 1.05.59 1.42l9 9a2 2 0 0 0 2.82 0l7-7a2 2 0 0 0 0-2.84zM6.5 8A1.5 1.5 0 1 1 6.5 5a1.5 1.5 0 0 1 0 3z"
      />
    </svg>
  );
}

export function CartaoProduto({ produto, prioritario = false }: Props) {
  const preco = formatarDinheiro(produto.precoPromocionalCentavos);
  const original =
    produto.precoOriginalCentavos === undefined ? null : formatarDinheiro(produto.precoOriginalCentavos);

  return (
    <article className="cartao-produto">
      {produto.fotoUrl ? (
        <img
          className="cartao-produto__foto"
          src={produto.fotoUrl}
          alt={`Foto de ${produto.nome}`}
          width="156"
          height="156"
          loading={prioritario ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className="cartao-produto__sem-foto">
          <IconeEtiqueta />
        </div>
      )}
      <div className="cartao-produto__corpo">
        <h3 className="cartao-produto__nome">{produto.nome}</h3>
        {produto.quantidade && <p className="cartao-produto__quantidade">{produto.quantidade}</p>}
        <p className="cartao-produto__precos">
          {original && (
            <>
              <span className="visualmente-oculto">{`de ${original} por ${preco}`}</span>
              <s className="cartao-produto__preco-original" aria-hidden="true">
                de {original}
              </s>{' '}
            </>
          )}
          <strong className="cartao-produto__preco" aria-hidden={original ? true : undefined}>
            {preco}
          </strong>
        </p>
        {produto.descricao && <p className="cartao-produto__descricao">{produto.descricao}</p>}
        {produto.observacao && <p className="cartao-produto__observacao">{produto.observacao}</p>}
        {produto.validoAte && (
          <p className="cartao-produto__validade">válido até {formatarDataCurta(produto.validoAte)}</p>
        )}
      </div>
    </article>
  );
}
