import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Privacidade from '../Privacidade';
import { ehPendente, SECOES } from '../privacidade-conteudo';

describe('Funcionalidade: Política de Privacidade (LGPD)', () => {
  it('Cenário: Dado a página, então título, data de atualização e todas as seções do sumário', () => {
    render(<Privacidade />);
    expect(screen.getByRole('heading', { level: 1, name: 'Política de Privacidade' })).toBeInTheDocument();
    expect(screen.getByText(/Última atualização/)).toBeInTheDocument();
    const sumario = screen.getByRole('navigation', { name: 'Sumário' });
    for (const secao of SECOES) {
      expect(screen.getByRole('heading', { level: 2, name: secao.titulo })).toBeInTheDocument();
      expect(sumario.querySelector(`a[href="#${secao.id}"]`)).not.toBeNull();
      expect(document.getElementById(secao.id)).not.toBeNull();
    }
    expect(document.title).toContain('Política de Privacidade');
  });

  it('Cenário: Dado a página, então informa que o consumidor não tem dados guardados nem cookies (RN51)', () => {
    render(<Privacidade />);
    expect(screen.getByText(/não pede cadastro, não usa cookies/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'gov.br/anpd' })).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getAllByRole('link', { name: /Voltar ao início|Tabloide/ })[0]).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('Cenário: Dado campos não preenchidos, então aparecem destacados como pendência', () => {
    const { container } = render(<Privacidade />);
    const pendentes = container.querySelectorAll('mark.dl-pendente');
    expect(pendentes.length).toBeGreaterThan(0);
    for (const marca of pendentes) expect(ehPendente(marca.textContent ?? '')).toBe(true);
  });
});

describe('Funcionalidade: Valor pendente da política', () => {
  it.each([
    ['[CNPJ]', true],
    ['12.345.678/0001-90', false],
    ['[incompleto', false],
  ])('Cenário: Dado "%s", então pendente = %s', (valor, esperado) => {
    expect(ehPendente(valor)).toBe(esperado);
  });
});
