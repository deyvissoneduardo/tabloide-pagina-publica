import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { paginaEstrutura, paginaVazia, respostaJson } from '../../../test/fixtures';
import type { CategoriaPublica, PaginaPublica, ProdutoPublico } from '../../api/tipos';
import App from '../../App';
import { CartaoProduto, percentualDesconto } from '../CartaoProduto';
import { PaginaMontada } from '../PaginaMontada';

async function abrirPagina(pagina: PaginaPublica) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(pagina)));
  window.history.replaceState(null, '', '/f/k7Qm2xPa');
  const resultado = render(<App />);
  await screen.findByRole('heading', { level: 1 });
  return resultado;
}

const produtoMinimo: ProdutoPublico = { nome: 'Arroz', precoPromocionalCentavos: 2190 };

describe('Funcionalidade: Página montada (RN29, RN30, RN31, RN32, RN41, RN45)', () => {
  it('Cenário: Dado o fixture pagina-estrutura, então as categorias aparecem na ordem do JSON', async () => {
    await abrirPagina(paginaEstrutura());
    const titulos = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titulos).toEqual(['Hortifrúti', 'Bebidas', 'Açougue']);
    expect(screen.getByRole('list', { name: 'Produtos de Hortifrúti' })).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Panfleto/ })).toBeNull();
  });

  it('Cenário: Dado produtos numa ordem não alfabética no JSON, então a ordem do JSON é mantida', () => {
    const { estrutura } = paginaEstrutura();
    render(<PaginaMontada categorias={estrutura.categorias} />);
    const lista = screen.getByRole('list', { name: 'Produtos de Hortifrúti' });
    const nomes = within(lista)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent);
    expect(nomes).toEqual(['Banana prata', 'Tomate italiano', 'Alface crespa']);
  });

  it('Cenário: Dado preço original, então "de R$ 6,99" riscado e "R$ 4,99"', () => {
    const banana = paginaEstrutura().estrutura.categorias[0]?.produtos[0] as ProdutoPublico;
    const { container } = render(<CartaoProduto produto={banana} />);
    const riscado = container.querySelector('s');
    expect(riscado).toHaveTextContent('de R$ 6,99');
    expect(container.querySelector('.cartao-produto__preco')).toHaveTextContent('R$ 4,99');
    expect(screen.getByText('de R$ 6,99 por R$ 4,99')).toHaveClass('visualmente-oculto');
  });

  it('Cenário: Dado sem preço original, então só o preço', () => {
    const { container } = render(<CartaoProduto produto={produtoMinimo} />);
    expect(container.querySelector('s')).toBeNull();
    expect(screen.getByText('R$ 21,90')).toBeInTheDocument();
  });

  it('Cenário: Dado validoAte "2026-11-20", então "válido até 20/11"', () => {
    render(<CartaoProduto produto={{ ...produtoMinimo, validoAte: '2026-11-20' }} />);
    expect(screen.getByText('válido até 20/11')).toBeInTheDocument();
  });

  it('Cenário: Dado foto, então <img> com alt, tamanho e lazy', () => {
    render(<CartaoProduto produto={{ ...produtoMinimo, fotoUrl: 'https://cdn/arroz.webp' }} />);
    const foto = screen.getByRole('img', { name: 'Foto de Arroz' });
    expect(foto).toHaveAttribute('loading', 'lazy');
    expect(foto).toHaveAttribute('width', '156');
    expect(foto).toHaveAttribute('height', '156');
  });

  it('Cenário: Dado a 1ª categoria, então só as 2 primeiras fotos carregam sem lazy', () => {
    const { estrutura } = paginaEstrutura();
    render(<PaginaMontada categorias={estrutura.categorias} />);
    expect(screen.getByRole('img', { name: 'Foto de Banana prata' })).toHaveAttribute('loading', 'eager');
    expect(screen.getByRole('img', { name: 'Foto de Tomate italiano' })).toHaveAttribute('loading', 'eager');
  });

  it('Cenário: Dado sem foto, então não há <img> no cartão', () => {
    const { container } = render(<CartaoProduto produto={produtoMinimo} />);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('.cartao-produto__sem-foto svg')).not.toBeNull();
  });

  it('Cenário: Dado campos opcionais ausentes, então nenhum elemento vazio é renderizado', () => {
    const { container } = render(<CartaoProduto produto={produtoMinimo} />);
    for (const classe of ['quantidade', 'descricao', 'observacao', 'validade', 'preco-original']) {
      expect(container.querySelector(`.cartao-produto__${classe}`)).toBeNull();
    }
    for (const elemento of container.querySelectorAll('p, h3, span, strong')) {
      expect(elemento.textContent?.trim()).not.toBe('');
    }
  });

  it('Cenário: Dado todos os campos, então quantidade, descrição e observação aparecem', () => {
    const banana = paginaEstrutura().estrutura.categorias[0]?.produtos[0] as ProdutoPublico;
    render(<CartaoProduto produto={banana} />);
    expect(screen.getByText('kg')).toHaveClass('cartao-produto__quantidade');
    expect(screen.getByText('Banana prata selecionada, direto do produtor.')).toBeInTheDocument();
    expect(screen.getByText('Limite 3 por cliente')).toBeInTheDocument();
  });

  it('Cenário: Dado preço original maior, então o selo mostra o desconto arredondado', () => {
    const banana = paginaEstrutura().estrutura.categorias[0]?.produtos[0] as ProdutoPublico;
    const { container } = render(<CartaoProduto produto={banana} />);
    expect(container.querySelector('.cartao-produto__selo')).toHaveTextContent('-29%');
  });

  it('Cenário: Dado preço original ausente, igual ou menor, então sem desconto', () => {
    expect(percentualDesconto(499)).toBeNull();
    expect(percentualDesconto(499, 499)).toBeNull();
    expect(percentualDesconto(499, 300)).toBeNull();
    expect(percentualDesconto(1000, 1001)).toBeNull();
    const { container } = render(<CartaoProduto produto={produtoMinimo} />);
    expect(container.querySelector('.cartao-produto__selo')).toBeNull();
  });

  it('Cenário: Dado categorias com 1 e com 3 produtos, então o total no singular/plural', () => {
    const { estrutura } = paginaEstrutura();
    const primeira = estrutura.categorias[0] as CategoriaPublica;
    render(<PaginaMontada categorias={[{ nome: 'Única', produtos: [produtoMinimo] }]} />);
    expect(screen.getByText('1 oferta')).toBeInTheDocument();
    render(<PaginaMontada categorias={[primeira]} />);
    expect(screen.getByText('3 ofertas')).toBeInTheDocument();
  });

  it('Cenário: Dado estrutura vazia, então "Nenhuma oferta no momento."', async () => {
    await abrirPagina(paginaVazia());
    expect(screen.getByText('Nenhuma oferta no momento.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  });

  it('Cenário: Dado corPrimaria #FFD100, então o nome do produto usa var(--cor-primaria) = #8A7100', async () => {
    const pagina = paginaEstrutura();
    pagina.lojista.corPrimaria = '#FFD100';
    await abrirPagina(pagina);
    expect(document.documentElement.style.getPropertyValue('--cor-primaria')).toBe('#8A7100');
    expect(screen.getByRole('heading', { level: 3, name: 'Banana prata' })).toHaveClass(
      'cartao-produto__nome',
    );
  });
});
