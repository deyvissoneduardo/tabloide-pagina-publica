import type { CategoriaPublica } from '../api/tipos';
import { CartaoProduto } from './CartaoProduto';

interface Props {
  categorias: CategoriaPublica[];
}

/** Sem nome de categoria (RN47): todos os produtos numa grade única, na ordem do JSON (categoria 1, 2…). */
export function GradeProdutos({ categorias }: Props) {
  const produtos = categorias.flatMap((categoria) => categoria.produtos);
  return (
    <ul className="grade-produtos" aria-label="Ofertas">
      {produtos.map((produto, indice) => (
        <li className="grade-produtos__item" key={indice}>
          <CartaoProduto produto={produto} prioritario={indice < 2} />
        </li>
      ))}
    </ul>
  );
}
