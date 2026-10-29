import type { CategoriaPublica } from '../api/tipos';
import { Categoria } from './Categoria';
import { GradeProdutos } from './GradeProdutos';
import { SemOfertas } from './SemOfertas';

interface Props {
  categorias: CategoriaPublica[];
  /** false: grade única sem título, contador nem barra (RN47). */
  exibirNomeCategoria: boolean;
}

/** Exibe na ordem recebida: a API já ordenou (plano §4.6); o cliente nunca reordena. */
export function PaginaMontada({ categorias, exibirNomeCategoria }: Props) {
  if (categorias.length === 0) return <SemOfertas />;
  if (!exibirNomeCategoria) return <GradeProdutos categorias={categorias} />;
  return (
    <div className="pagina-montada">
      {categorias.map((categoria, indice) => (
        <Categoria categoria={categoria} primeira={indice === 0} key={indice} />
      ))}
    </div>
  );
}
