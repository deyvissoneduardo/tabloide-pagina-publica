import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  paginaBannerDescricao,
  paginaBannerFoto,
  paginaEstrutura,
  paginaPanfletoImagem,
  respostaJson,
} from '../../../test/fixtures';
import type { BannerPublico, PaginaPublica } from '../../api/tipos';
import App from '../../App';
import { Banner } from '../Banner';

async function abrirPagina(pagina: PaginaPublica) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(pagina)));
  window.history.replaceState(null, '', '/f/k7Qm2xPa');
  const resultado = render(<App />);
  await screen.findByRole('heading', { level: 1 });
  return resultado;
}

const bannerDe = (pagina: PaginaPublica) => pagina.aparencia.banner as BannerPublico;

describe('Funcionalidade: Banner da página (RN46)', () => {
  it('Cenário: Dado banner com logo, nome e foto, então substitui o cabeçalho', async () => {
    const { container } = await abrirPagina(paginaBannerFoto());
    expect(container.querySelector('header.banner')).not.toBeNull();
    expect(container.querySelector('.cabecalho')).toBeNull();
    expect(screen.getByRole('heading', { level: 1, name: 'Semana do Hortifrúti' })).toHaveClass(
      'banner__nome',
    );
    expect(screen.getByRole('img', { name: 'Logo de Semana do Hortifrúti' })).toHaveAttribute(
      'src',
      'https://projeto.supabase.co/storage/v1/object/public/midia/t1/logo/banner-logo.webp',
    );
    // As categorias continuam abaixo do banner.
    expect(screen.getByRole('heading', { level: 2, name: 'Hortifrúti' })).toBeInTheDocument();
  });

  it('Cenário: Dado campanha FOTO, então <img> 16:9 reservado, prioritário e com alt "Campanha de <nome>"', () => {
    render(<Banner banner={bannerDe(paginaBannerFoto())} nomeLojista="Mercado Bom Preço" />);
    const foto = screen.getByRole('img', { name: 'Campanha de Semana do Hortifrúti' });
    expect(foto).toHaveClass('banner__foto');
    expect(foto).toHaveAttribute('width', '1600');
    expect(foto).toHaveAttribute('height', '900');
    expect(foto).toHaveAttribute('fetchpriority', 'high');
    expect(foto).not.toHaveAttribute('loading', 'lazy');
    expect(document.querySelector('.banner__descricao')).toBeNull();
  });

  it('Cenário: Dado campanha DESCRICAO, então o texto aparece abaixo do nome e não há foto', () => {
    const { container } = render(
      <Banner banner={bannerDe(paginaBannerDescricao())} nomeLojista="Mercado Bom Preço" />,
    );
    const descricao = container.querySelector('.banner__descricao');
    expect(descricao?.textContent).toBe('Frutas e verduras fresquinhas.\nSó até domingo!');
    expect(container.querySelector('.banner__foto')).toBeNull();
    // Sem logo do banner: não há caixa de logo (sem fallback para o logo de identidade, U4).
    expect(container.querySelector('.banner__marca')).toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('Cenário: Dado banner sem logo, nome nem campanha, então só a faixa e um h1 oculto com o nome fantasia', () => {
    const { container } = render(<Banner banner={{}} nomeLojista="Mercado Bom Preço" />);
    const banner = container.querySelector('header.banner');
    expect(banner?.children).toHaveLength(1);
    expect(container.querySelector('.banner__topo')).toBeNull();
    expect(screen.getByRole('heading', { level: 1, name: 'Mercado Bom Preço' })).toHaveClass(
      'visualmente-oculto',
    );
  });

  it('Cenário: Dado logo e foto sem nome, então alt "Logo"/"Campanha" e h1 oculto com o nome fantasia', () => {
    render(
      <Banner
        banner={{ logoUrl: 'https://cdn/l.webp', campanha: { tipo: 'FOTO', fotoUrl: 'https://cdn/f.webp' } }}
        nomeLojista="Mercado Bom Preço"
      />,
    );
    expect(screen.getByRole('img', { name: 'Logo' })).toHaveClass('banner__logo');
    expect(screen.getByRole('img', { name: 'Campanha' })).toHaveClass('banner__foto');
    expect(screen.getByRole('heading', { level: 1, name: 'Mercado Bom Preço' })).toHaveClass(
      'visualmente-oculto',
    );
  });

  it('Cenário: Dado banner null, então o cabeçalho de identidade aparece', async () => {
    const { container } = await abrirPagina(paginaEstrutura());
    expect(container.querySelector('.banner')).toBeNull();
    expect(screen.getByRole('heading', { level: 1, name: 'Mercado Bom Preço' })).toHaveClass(
      'cabecalho__nome',
    );
  });

  it('Cenário: Dado panfleto em exibição (API manda banner null), então cabeçalho + panfleto', async () => {
    const { container } = await abrirPagina(paginaPanfletoImagem());
    expect(container.querySelector('.banner')).toBeNull();
    expect(container.querySelector('.cabecalho')).not.toBeNull();
    expect(screen.getByRole('img', { name: /Panfleto de ofertas/ })).toBeInTheDocument();
  });
});
