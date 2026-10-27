import type { CategoriaPublica } from '../api/tipos';
import { Categoria } from './Categoria';
import { SemOfertas } from './SemOfertas';

interface Props {
  categorias: CategoriaPublica[];
}

/** Exibe na ordem recebida: a API já ordenou (plano §4.6); o cliente nunca reordena. */
export function PaginaMontada({ categorias }: Props) {
  if (categorias.length === 0) return <SemOfertas />;
  return (
    <div className="pagina-montada">
      {categorias.map((categoria, indice) => (
        <Categoria categoria={categoria} primeira={indice === 0} key={indice} />
      ))}
    </div>
  );
}
