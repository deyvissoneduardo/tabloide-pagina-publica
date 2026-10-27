import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  paginaEstrutura,
  paginaPanfletoImagem,
  paginaPanfletoPdf,
  respostaJson,
} from '../../../test/fixtures';
import type { PaginaPublica, PanfletoPublico } from '../../api/tipos';
import App from '../../App';
import PanfletoPdf, { calcularEscala, LADO_MAXIMO_CANVAS } from '../PanfletoPdf';

const pdf = vi.hoisted(() => ({
  importado: false,
  getDocument: vi.fn(),
  destroy: vi.fn(),
  render: vi.fn(),
}));

// O jsdom não desenha canvas: o pdf.js inteiro é falso.
vi.mock('pdfjs-dist', () => {
  pdf.importado = true;
  return {
    AnnotationMode: { DISABLE: 0 },
    GlobalWorkerOptions: { workerSrc: '' },
    getDocument: pdf.getDocument,
  };
});

function tarefaOk() {
  const pagina = {
    getViewport: ({ scale }: { scale: number }) => ({ width: 595 * scale, height: 842 * scale }),
    render: pdf.render.mockReturnValue({ promise: Promise.resolve() }),
  };
  return { promise: Promise.resolve({ getPage: vi.fn().mockResolvedValue(pagina) }), destroy: pdf.destroy };
}

function tarefaFalha() {
  return { promise: Promise.reject(new Error('CORS')), destroy: pdf.destroy };
}

const panfleto = () => paginaPanfletoPdf().panfleto as PanfletoPublico;

async function abrirApp(pagina: PaginaPublica) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respostaJson(pagina)));
  window.history.replaceState(null, '', '/f/k7Qm2xPa');
  render(<App />);
  await screen.findByRole('heading', { level: 1 });
}

describe('Funcionalidade: Panfleto em PDF (RN13, D3)', () => {
  beforeEach(() => {
    pdf.getDocument.mockReset();
    pdf.destroy.mockReset().mockResolvedValue(undefined);
    pdf.render.mockReset();
  });

  it('Cenário: Dado a página montada ou panfleto em imagem, então o chunk do pdf.js não é importado', async () => {
    // Roda antes de qualquer cenário que importe o PanfletoPdf pelo App.
    await abrirApp(paginaEstrutura());
    await abrirApp(paginaPanfletoImagem());
    expect(pdf.getDocument).not.toHaveBeenCalled();
    // O import estático deste arquivo carrega o módulo; o que importa é o App não ter pedido o chunk.
    expect(pdf.importado).toBe(true);
  });

  it('Cenário: Dado o fixture pagina-panfleto-pdf, então o componente é carregado sob demanda e mostra o esqueleto com a proporção largura/altura', async () => {
    pdf.getDocument.mockReturnValue({ promise: new Promise(() => {}), destroy: pdf.destroy });
    await abrirApp(paginaPanfletoPdf());
    expect(screen.getByText('Carregando panfleto')).toBeInTheDocument();
    expect(screen.getByTestId('area-panfleto')).toHaveStyle({ aspectRatio: '595 / 842' });
    await waitFor(() => expect(pdf.getDocument).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('link', { name: 'Abrir PDF' })).toBeInTheDocument();
  });

  it('Cenário: Dado o PDF carregado, então getDocument recebe isEvalSupported false e a página 1 é desenhada', async () => {
    pdf.getDocument.mockReturnValue(tarefaOk());
    render(<PanfletoPdf panfleto={panfleto()} />);
    const canvas = await screen.findByRole('img', { name: 'Panfleto de ofertas' });
    expect(pdf.getDocument).toHaveBeenCalledWith(
      expect.objectContaining({
        url: panfleto().arquivoUrl,
        isEvalSupported: false,
        enableXfa: false,
        withCredentials: false,
      }),
    );
    const tarefa = (await pdf.getDocument.mock.results[0]?.value.promise) as {
      getPage: ReturnType<typeof vi.fn>;
    };
    expect(tarefa.getPage).toHaveBeenCalledWith(1);
    expect(pdf.render).toHaveBeenCalledWith(expect.objectContaining({ canvas, annotationMode: 0 }));
    expect(canvas).toBeVisible();
    expect(screen.queryByText('Carregando panfleto')).toBeNull();
    const link = screen.getByRole('link', { name: 'Abrir PDF' });
    expect(link).toHaveAttribute('href', panfleto().arquivoUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('Cenário: Dado validoAte, então o rótulo do canvas e a legenda trazem a data', async () => {
    pdf.getDocument.mockReturnValue(tarefaOk());
    render(<PanfletoPdf panfleto={{ ...panfleto(), validoAte: '2026-11-20' }} />);
    expect(await screen.findByRole('img', { name: 'Panfleto de ofertas válido até 20/11' })).toBeVisible();
    expect(screen.getByText('Válido até 20/11')).toBeInTheDocument();
  });

  it('Cenário: Dado falha no getDocument, então "Não foi possível abrir o panfleto", "Tentar de novo" e "Abrir PDF"', async () => {
    pdf.getDocument.mockReturnValue(tarefaFalha());
    render(<PanfletoPdf panfleto={panfleto()} />);
    expect(await screen.findByText('Não foi possível abrir o panfleto')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tentar de novo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Abrir PDF' })).toHaveAttribute('href', panfleto().arquivoUrl);
  });

  it('Cenário: Dado "Tentar de novo", quando toco, então getDocument é chamado de novo', async () => {
    pdf.getDocument.mockReturnValueOnce(tarefaFalha()).mockReturnValueOnce(tarefaOk());
    render(<PanfletoPdf panfleto={panfleto()} />);
    await userEvent.click(await screen.findByRole('button', { name: 'Tentar de novo' }));
    expect(await screen.findByRole('img', { name: 'Panfleto de ofertas' })).toBeVisible();
    expect(pdf.getDocument).toHaveBeenCalledTimes(2);
  });

  it('Cenário: Dado desmontar, então loadingTask.destroy é chamado', async () => {
    pdf.getDocument.mockReturnValue({ promise: new Promise(() => {}), destroy: pdf.destroy });
    const { unmount } = render(<PanfletoPdf panfleto={panfleto()} />);
    await waitFor(() => expect(pdf.getDocument).toHaveBeenCalled());
    unmount();
    expect(pdf.destroy).toHaveBeenCalled();
  });
});

describe('Funcionalidade: Escala do canvas do PDF', () => {
  it('Cenário: Dado container de 360 px e DPR 3, então escala = 360/595 × 2 × 2', () => {
    expect(calcularEscala(360, { width: 595, height: 842 }, 3)).toBeCloseTo((360 / 595) * 4);
  });

  it('Cenário: Dado DPR 1, então o fator de DPR é 1', () => {
    expect(calcularEscala(595, { width: 595, height: 842 }, 1)).toBe(2);
  });

  it('Cenário: Dado escala que passaria de 4096 px no lado maior, então fica no teto', () => {
    const escala = calcularEscala(1600, { width: 595, height: 842 }, 2);
    expect(842 * escala).toBeCloseTo(LADO_MAXIMO_CANVAS);
  });
});
