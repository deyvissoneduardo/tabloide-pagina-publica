import type { CategoriaPublica } from '../api/tipos';
import { CartaoProduto } from './CartaoProduto';

interface Props {
  categoria: CategoriaPublica;
  primeira?: boolean;
}

/** Carrossel horizontal com rolagem por toque nativa (scroll-snap), sem setas nem biblioteca. */
export function Categoria({ categoria, primeira = false }: Props) {
  const total = categoria.produtos.length;
  return (
    <section className="categoria">
      <div className="categoria__topo">
        <h2 className="categoria__nome">{categoria.nome}</h2>
        <span className="categoria__total">{total === 1 ? '1 oferta' : `${total} ofertas`}</span>
      </div>
      <ul className="categoria__produtos" aria-label={`Produtos de ${categoria.nome}`}>
        {categoria.produtos.map((produto, indice) => (
          <li className="categoria__item" key={indice}>
            <CartaoProduto produto={produto} prioritario={primeira && indice < 2} />
          </li>
        ))}
      </ul>
    </section>
  );
}
