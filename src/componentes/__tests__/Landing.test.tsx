import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Landing from '../Landing';
import { FUNCIONALIDADES, LINK_WHATSAPP, NUMEROS, SEGMENTOS_DIGITADOS } from '../landing-conteudo';

/** IntersectionObserver falso: guarda os callbacks para o teste disparar a entrada na tela. */
function stubObservador() {
  const callbacks: IntersectionObserverCallback[] = [];
  class ObservadorFalso {
    constructor(callback: IntersectionObserverCallback) {
      callbacks.push(callback);
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal('IntersectionObserver', ObservadorFalso);
  return {
    entrar(alvos: Element[]) {
      const entradas = alvos.map(
        (target) => ({ target, isIntersecting: true }) as unknown as IntersectionObserverEntry,
      );
      act(() => {
        for (const callback of callbacks) callback(entradas, {} as IntersectionObserver);
      });
    },
  };
}

describe('Funcionalidade: Landing institucional', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('Cenário: Dado a landing, então título, funcionalidades e CTA para o WhatsApp', () => {
    render(<Landing />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('no celular do cliente');
    for (const item of FUNCIONALIDADES) {
      expect(screen.getByRole('heading', { name: item.titulo })).toBeInTheDocument();
    }
    const contatos = screen.getAllByRole('link', { name: /Entre em contato/ });
    expect(contatos.length).toBeGreaterThan(0);
    for (const link of contatos) {
      expect(link).toHaveAttribute('href', LINK_WHATSAPP);
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
    expect(LINK_WHATSAPP).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(document.title).toContain('Tabloide Digital');
  });

  it('Cenário: Dado sem IntersectionObserver, então tudo é revelado e os números já vêm no valor final', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<Landing />);
    const alvos = container.querySelectorAll('[data-revelar]');
    expect(alvos.length).toBeGreaterThan(0);
    for (const alvo of alvos) expect(alvo).toHaveClass('lp-visivel');
    for (const numero of NUMEROS) {
      expect(screen.getByText(numero.rotulo).previousElementSibling).toHaveTextContent(
        `${numero.prefixo ?? ''}${numero.alvo}${numero.sufixo ?? ''}`,
      );
    }
  });

  it('Cenário: Dado um bloco entrando na tela, então ele é revelado e o contador anima até o alvo', () => {
    vi.useFakeTimers();
    const observador = stubObservador();
    const { container } = render(<Landing />);
    const alvo = container.querySelector('[data-revelar]');
    expect(alvo).not.toHaveClass('lp-visivel');

    const valores = [...container.querySelectorAll('.lp-numero__valor')];
    observador.entrar([alvo as Element, ...valores]);
    expect(alvo).toHaveClass('lp-visivel');

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    const ultimo = NUMEROS[NUMEROS.length - 1];
    expect(screen.getByText(ultimo?.rotulo ?? '').previousElementSibling).toHaveTextContent(
      `${ultimo?.alvo}${ultimo?.sufixo ?? ''}`,
    );
  });

  it('Cenário: Dado o menu no celular, quando toco nele, então abre e fecha ao escolher um link', async () => {
    render(<Landing />);
    const botao = screen.getByRole('button', { name: 'Abrir menu' });
    await userEvent.click(botao);
    expect(botao).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('link', { name: 'Funcionalidades' }));
    expect(botao).toHaveAttribute('aria-expanded', 'false');
  });

  it('Cenário: Dado o tempo passando, então a palavra do título e a tela do painel giram sozinhas', () => {
    vi.useFakeTimers();
    const { container } = render(<Landing />);
    expect(container.querySelector('.lp-digitada')).toHaveTextContent(SEGMENTOS_DIGITADOS[0] ?? '');
    expect(screen.getByRole('tab', { name: 'Início' })).toHaveAttribute('aria-selected', 'true');
    expect(within(screen.getByRole('tabpanel')).getByText('Suas páginas')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2400);
    });
    expect(container.querySelector('.lp-digitada')).toHaveTextContent(SEGMENTOS_DIGITADOS[1] ?? '');

    act(() => {
      vi.advanceTimersByTime(2600);
    });
    expect(screen.getByRole('tab', { name: 'Produtos' })).toHaveAttribute('aria-selected', 'true');
    const produtos = within(screen.getByRole('tabpanel'));
    expect(produtos.getByText('Novo produto')).toBeInTheDocument();
    expect(produtos.getByText('de R$ 79,90 por R$ 59,90')).toBeInTheDocument();
    expect(produtos.getAllByText('Vigente · válido até 31/10').length).toBeGreaterThan(0);

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('tab', { name: 'Página' })).toHaveAttribute('aria-selected', 'true');
    const pagina = within(screen.getByRole('tabpanel'));
    expect(pagina.getByText('Publicar')).toBeInTheDocument();
    expect(pagina.getByText('Promoção de Novembro')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole('tab', { name: 'Início' })).toHaveAttribute('aria-selected', 'true');
  });

  it('Cenário: Dado que toco num item do menu do painel, então a tela fica e a rotação para', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { container } = render(<Landing />);
    expect(container.querySelector('.lp-painel__cursor')).not.toBeNull();
    await userEvent.click(screen.getByRole('tab', { name: 'Página' }));
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    expect(screen.getByRole('tab', { name: 'Página' })).toHaveAttribute('aria-selected', 'true');
    expect(container.querySelector('.lp-painel__cursor')).toBeNull();

    await userEvent.click(screen.getByRole('tab', { name: 'Início' }));
    expect(screen.getByRole('img', { name: 'QR Code da Filial Jardim América' })).toBeInTheDocument();
    expect(screen.getByText('No ar: panfleto')).toBeInTheDocument();
  });
});
