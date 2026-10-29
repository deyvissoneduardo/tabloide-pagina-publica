# CLAUDE.md

## Visão do Projeto
Página pública do Tabloide Digital: o consumidor lê o QR Code da filial, abre `/f/<codigo>` e vê o panfleto (imagem/PDF) ou a página montada do lojista. Otimiza carregamento no celular (orçamento de bundle) e privacidade. Contrato da API: `../plano_pagina_publica/plano.md` §4 + `../docs/plano_pagina_publica_melhorias/plano.md` §4 (`aparencia`; fora deste repo).

## Stack
- React 18.3.1 + TypeScript 6 (`strict`, `noUncheckedIndexedAccess`) + Vite 8; SPA estática, sem SSR. Node ≥ 22 (`.nvmrc`), npm (`package-lock.json`).
- Testes: Vitest + Testing Library (jsdom). Deploy: Vercel (`vercel.json`).
- Dependências de runtime: só `react`, `react-dom`, `pdfjs-dist`.
- NÃO adicionar dependência (router, state, schema, CSS-in-JS, UI kit, utilitários) sem aprovação. Roteamento é `src/rota.ts`; validação de resposta é `ehPaginaPublica` em `src/api/buscar-pagina.ts`.

## Como rodar
- Install: `npm ci` · Dev: `npm run dev` (precisa de `.env` a partir de `.env.example` e da API em `localhost:3000`)
- Lint: `npm run lint` · Typecheck: `npm run typecheck` · Testes: `npm run test` / `npm run test:cov`
- Build: `npm run build` (inclui `scripts/verificar-bundle.mjs`: JS inicial ≤ 60 kB gzip sem pdf.js, CSS ≤ 10 kB gzip)

## Regras de comportamento (não negocie)
1. **Incerteza → leia o arquivo ou rode `grep`. Nunca chute.** Se não achou (função, campo, API, arquivo), diga que não achou.
2. **Menor delta possível.** Resolva só o pedido. Oportunidade de melhoria fora do escopo → reporte separado, não execute sem pedir.
3. **Não toque em código fora do escopo sem autorização explícita.** Viu algo errado → sinalize, não conserte por conta própria.
4. **"Funciona" só com evidência.** Ao afirmar que algo funciona, mostre o output do comando/teste. Não rodou → diga "não rodei".
5. **Ações destrutivas exigem confirmação prévia.** Migração de schema, delete em massa, mudança de CI/auth → confirme antes de executar.

## Convenções
- Identificadores, comentários e textos em pt-BR (`buscarPagina`, `aoTentarDeNovo`).
- Named exports. Exceções: `App.tsx` e componentes carregados com `lazy()` (hoje `PanfletoPdf.tsx`).
- NÃO reordenar, filtrar nem reaplicar a regra `sePanfleto` no cliente: a ordem de categorias/produtos é a do JSON e a exibição decide só por `panfleto != null`; o topo decide só por `aparencia.banner != null` (banner × cabeçalho).
- A filial (nome/endereço) NÃO aparece no corpo da página (U9); `filial.nome` só no `document.title`.
- NÃO importar `pdfjs-dist` fora do chunk lazy de `PanfletoPdf`; o build falha se ele entrar no bundle inicial.
- NÃO usar analytics, cookies, `localStorage`/`sessionStorage`, nem colocar segredo em `VITE_*` (vai embutido no bundle).
- `fetch` só em `src/api/`; estados de erro seguem `ResultadoPagina` (`nao-encontrada` só para 404; o resto é `sem-conexao`).

## Onde coisas novas vão
- Componentes: `src/componentes/PascalCase.tsx`. Demais módulos: kebab-case (`src/hooks/use-*.ts`, `src/formatacao/`, `src/tema/`).
- Tipos do contrato da API: `src/api/tipos.ts`. Estilos: `src/estilos/global.css`, classes BEM (`bloco__elemento`).
- Cores do lojista só via as 10 variáveis de `aplicarTema(aparencia.cores)`: `--cor-primaria`, `--cor-secundaria`, `--cor-texto`, `--cor-texto-suave`, `--cor-fundo` (fundoCartao), `--cor-fundo-pagina`, `--cor-neutra`, `--cor-sobre-cor`, `--cor-fundo-banner`, `--cor-categoria`. Cor **exata** como veio da API (sem ajuste de contraste; `corDeTexto` foi removido). NÃO hardcodar cor (nem `#fff`); o mapeamento elemento → variável segue a tabela §4.4 e é conferido em `src/estilos/__tests__/global.test.ts`.
- Medidas e tipografia espelham a prévia Flutter (`front/packages/core/lib/src/widgets/app_previa_*.dart`); mudou lá → porte aqui.
- Prefira editar um componente/estado existente (`SemConexao`, `Esqueleto`…) a criar um quase-duplicado.

## Testing & Quality Bar
- "Feito" = `lint`, `typecheck`, `test:cov` (≥ 90% em `src/`) e `build` passando.
- Teste em `__tests__/` ao lado do módulo; `describe('Funcionalidade: … (RNxx)')` e `it('Cenário: Dado …, então …')`.
- Dados da API vêm de `test/fixtures/` (atualize o fixture, não monte JSON solto); `fetch` via `vi.stubGlobal`; pdf.js é mockado.

## Safe-Change Rules
- NÃO mudar a rota `/f/:codigo` nem `CODIGO_PUBLICO_REGEX` (`src/rota.ts`): espelham a API e os QR Codes impressos.
- `vercel.json` (rewrites, cache, CSP) e o orçamento em `scripts/verificar-bundle.mjs`: confirme antes de alterar.

<!-- Itere este arquivo: erro que estava neste contrato → fortaleça a regra existente;
     erro que NÃO estava → adicione uma regra nova. O arquivo cresce com o uso, não de uma vez. -->
