import { afterEach, describe, expect, it, vi } from 'vitest';
import { extrairOrigem, limparOrigemDaUrl } from '../origem';

describe('Funcionalidade: Leitura da origem (RN50)', () => {
  it('Cenário: Dado "?origem=painel", quando extraio, então "painel"', () => {
    expect(extrairOrigem('?origem=painel')).toBe('painel');
  });

  it.each([
    ['outra origem', '?origem=outra'],
    ['sem query', ''],
    ['nome em maiúsculas', '?ORIGEM=painel'],
  ])('Cenário: Dado %s, quando extraio, então undefined', (_nome, search) => {
    expect(extrairOrigem(search)).toBeUndefined();
  });
});

describe('Funcionalidade: Limpeza da origem na barra de endereço (RN50)', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Cenário: Dado "?origem=painel&x=1#topo", quando limpo, então fica "?x=1#topo"', () => {
    window.history.replaceState(null, '', '/f/k7Qm2xPa?origem=painel&x=1#topo');
    limparOrigemDaUrl();
    expect(`${window.location.pathname}${window.location.search}${window.location.hash}`).toBe(
      '/f/k7Qm2xPa?x=1#topo',
    );
  });

  it('Cenário: Dado só "?origem=painel", quando limpo, então fica só o caminho', () => {
    window.history.replaceState(null, '', '/f/k7Qm2xPa?origem=painel');
    limparOrigemDaUrl();
    expect(`${window.location.pathname}${window.location.search}`).toBe('/f/k7Qm2xPa');
  });

  it('Cenário: Dado URL sem o parâmetro, quando limpo, então não mexe no histórico', () => {
    window.history.replaceState(null, '', '/f/k7Qm2xPa?x=1');
    const substituir = vi.spyOn(window.history, 'replaceState');
    limparOrigemDaUrl();
    expect(substituir).not.toHaveBeenCalled();
  });
});
