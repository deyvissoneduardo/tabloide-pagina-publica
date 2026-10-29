/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Lido do disco: o Vitest não processa CSS (import de .css/?raw chega vazio).
const css = readFileSync(`${process.cwd()}/src/estilos/global.css`, 'utf8');

/** Declarações de cada seletor simples (junta as regras em que ele aparece, fora de @media). */
function declaracoes(seletor: string): string {
  const semComentarios = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let resultado = '';
  for (const [, seletores, corpo] of semComentarios.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (seletores?.split(',').some((s) => s.trim() === seletor)) resultado += corpo;
  }
  return resultado;
}

/** Tabela elemento → variável de plano_pagina_publica_melhorias/plano.md §4.4 (T10). */
const MAPEAMENTO: [string, string, string][] = [
  ['.cabecalho', 'background', '--cor-primaria'],
  ['.cabecalho__iniciais', 'color', '--cor-primaria'],
  ['.cartao-produto__nome', 'color', '--cor-primaria'],
  ['.cartao-produto__preco', 'color', '--cor-primaria'],
  ['.botao', 'background', '--cor-primaria'],
  ['.panfleto__abrir', 'background', '--cor-primaria'],
  [':focus-visible', 'outline', '--cor-primaria'],
  ['.categoria__nome', 'border-left', '--cor-secundaria'],
  ['.cartao-produto__selo', 'background', '--cor-secundaria'],
  ['.cartao-produto__corpo', 'color', '--cor-secundaria'],
  ['.panfleto__validade', 'color', '--cor-secundaria'],
  ['.sem-ofertas', 'color', '--cor-texto'],
  ['.cartao-produto__validade', 'color', '--cor-texto'],
  ['body', 'color', '--cor-texto'],
  ['.categoria__total', 'color', '--cor-texto-suave'],
  ['.cartao-produto__quantidade', 'color', '--cor-texto-suave'],
  ['.cartao-produto__preco-original', 'color', '--cor-texto-suave'],
  ['.cartao-produto__sem-foto', 'color', '--cor-texto-suave'],
  ['.cartao-produto', 'background', '--cor-fundo'],
  ['.sem-ofertas', 'background', '--cor-fundo'],
  ['.panfleto__area', 'background', '--cor-fundo'],
  ['.panfleto__validade', 'background', '--cor-fundo'],
  ['body', 'background', '--cor-fundo-pagina'],
  ['.cartao-produto__sem-foto', 'background', '--cor-neutra'],
  ['.cartao-produto__validade', 'background', '--cor-neutra'],
  ['.esqueleto__cabecalho', 'background', '--cor-neutra'],
  ['.cabecalho', 'color', '--cor-sobre-cor'],
  ['.banner', 'color', '--cor-sobre-cor'],
  ['.cabecalho__marca', 'background', '--cor-sobre-cor'],
  ['.banner__marca', 'background', '--cor-sobre-cor'],
  ['.cartao-produto__selo', 'color', '--cor-sobre-cor'],
  ['.botao', 'color', '--cor-sobre-cor'],
  ['.panfleto__abrir', 'color', '--cor-sobre-cor'],
  ['.banner', 'background', '--cor-fundo-banner'],
  ['.categoria__nome', 'color', '--cor-categoria'],
];

describe('Funcionalidade: Cores por elemento (RN48, §4.4)', () => {
  it.each(MAPEAMENTO)('Cenário: Dado %s, então %s usa var(%s)', (seletor, propriedade, variavel) => {
    const regra = new RegExp(`(^|[;\\s])${propriedade}\\s*:[^;]*var\\(${variavel}\\)`);
    expect(declaracoes(seletor)).toMatch(regra);
  });

  it('Cenário: Dado o CSS, então nenhuma cor branca fixa fora dos padrões do :root', () => {
    const fora = css.replace(/:root\s*\{[^}]*\}/, '');
    expect(fora).not.toMatch(/#fff(fff)?\b/i);
  });

  it('Cenário: Dado até 420 px, então a grade tem 2 colunas', () => {
    expect(declaracoes('.grade-produtos')).toMatch(/grid-template-columns:\s*repeat\(2,/);
  });
});
