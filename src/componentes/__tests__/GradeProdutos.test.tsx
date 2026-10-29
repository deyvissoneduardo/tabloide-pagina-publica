import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { paginaSemNomeCategoria, respostaJson } from '../../../test/fixtures';
import App from '../../App';
import { GradeProdutos } from '../GradeProdutos';

describe('Funcionalidade: Grade sem nome de categoria (RN47)', () => {
  it('Cenário: Dado exibirNomeCategoria false, então uma grade única na ordem do JSON achatado e sem h2', async () => {
    const pagina = paginaSemNomeCategoria();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(pagina)));
    window.history.replaceState(null, '', '/f/k7Qm2xPa');
    const { container } = render(<App />);
    const grade = await screen.findByRole('list', { name: 'Ofertas' });
    expect(grade).toHaveClass('grade-produtos');
    const esperado = pagina.estrutura.categorias.flatMap((c) => c.produtos.map((p) => p.nome));
    const nomes = within(grade)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(nomes).toEqual(esperado);
    expect(nomes).toEqual([
      'Banana prata',
      'Tomate italiano',
      'Alface crespa',
      'Suco de uva integral',
      'Água mineral',
      'Picanha',
    ]);
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
    expect(container.querySelector('.categoria, .categoria__total')).toBeNull();
  });

  it('Cenário: Dado a grade, então cada produto é um item e só os 2 primeiros carregam sem lazy', () => {
    const { container } = render(
      <GradeProdutos categorias={paginaSemNomeCategoria().estrutura.categorias} />,
    );
    expect(container.querySelectorAll('li.grade-produtos__item')).toHaveLength(6);
    expect(screen.getByRole('img', { name: 'Foto de Banana prata' })).toHaveAttribute('loading', 'eager');
    expect(screen.getByRole('img', { name: 'Foto de Tomate italiano' })).toHaveAttribute('loading', 'eager');
  });

  it('Cenário: Dado estrutura vazia com a grade, então "Nenhuma oferta no momento."', async () => {
    const pagina = paginaSemNomeCategoria();
    pagina.estrutura.categorias = [];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(pagina)));
    window.history.replaceState(null, '', '/f/k7Qm2xPa');
    render(<App />);
    expect(await screen.findByText('Nenhuma oferta no momento.')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Ofertas' })).toBeNull();
  });
});
