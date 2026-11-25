import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Termos from '../Termos';
import { SECOES_TERMOS } from '../termos-conteudo';

describe('Funcionalidade: Termos de Uso', () => {
  it('Cenário: Dado a página, então título, data de atualização e todas as seções do sumário', () => {
    render(<Termos />);
    expect(screen.getByRole('heading', { level: 1, name: 'Termos de Uso' })).toBeInTheDocument();
    expect(screen.getByText(/Última atualização/)).toBeInTheDocument();
    const sumario = screen.getByRole('navigation', { name: 'Sumário' });
    for (const secao of SECOES_TERMOS) {
      expect(screen.getByRole('heading', { level: 2, name: secao.titulo })).toBeInTheDocument();
      expect(sumario.querySelector(`a[href="#${secao.id}"]`)).not.toBeNull();
    }
    expect(document.title).toBe('Termos de Uso — Tabloide Digital');
  });

  it('Cenário: Dado a página, então remete à Política de Privacidade e o rodapé liga os dois documentos', () => {
    render(<Termos />);
    const privacidade = screen.getAllByRole('link', { name: 'Política de Privacidade' });
    for (const link of privacidade) expect(link).toHaveAttribute('href', '/privacidade');
    const rodape = screen.getByRole('navigation', { name: 'Documentos' });
    expect(within(rodape).getByRole('link', { name: 'Termos de Uso' })).toHaveAttribute('href', '/termos');
  });

  it('Cenário: Dado o contato preenchido, então o e-mail vira link mailto', () => {
    render(<Termos />);
    const email = screen.getByRole('link', { name: /@/ });
    expect(email.getAttribute('href')).toMatch(/^mailto:/);
  });
});
