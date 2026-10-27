# Tabloide Digital — página pública

Página que o consumidor abre ao ler o QR Code da filial: `https://<dominio>/f/<codigo>`. Mostra a identidade do lojista (logo, nome, cores) e, conforme a resposta da API, **só o panfleto** (imagem ou PDF de 1 página) ou **a página montada** (categorias na vertical, produtos em carrossel horizontal, na ordem definida pelo lojista).

> ⚠️ Adicionar screenshot da página montada e do panfleto em `docs/demo.png` (e referenciar aqui).

SPA estática (Vite + React + TypeScript), sem SSR, sem login, sem cookies e sem analytics. Plano completo em `../plano_pagina_publica/` (`plano.md` §4 é o contrato; `react.md` são as tarefas deste projeto).

## Como rodar

Pré-requisitos: Node 22 (`.nvmrc`) e a API rodando em `http://localhost:3000`.

```bash
nvm use
npm ci
cp .env.example .env
npm run dev          # http://localhost:5173/f/<codigo>
```

O `<codigo>` é o código público de 8 caracteres da filial (o mesmo do QR Code; `urlPublica` no painel). Com a API local, `PUBLIC_BASE_URL=http://localhost:5173` já aponta para cá.

## Variáveis

| Variável | Exemplo | Uso |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:3000/v1` | Base da API; a página chama `GET $VITE_API_URL/publico/filiais/:codigo` |
| `VITE_API_ORIGEM` | `http://localhost:3000` | `preconnect` do `index.html`. Se ficar vazia, é derivada de `VITE_API_URL` |

As variáveis são embutidas no build (são públicas: não coloque segredo aqui).

## Scripts

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento do Vite (porta 5173) |
| `npm run build` | `tsc -b`, `vite build` e `scripts/verificar-bundle.mjs` (orçamento: JS inicial ≤ 60 kB gzip **sem** pdf.js, CSS ≤ 10 kB gzip) |
| `npm run preview` | Serve o `dist/` (porta 4173) |
| `npm run lint` | ESLint (typescript-eslint strict + react-hooks) |
| `npm run typecheck` | TypeScript `strict` |
| `npm run test` / `test:cov` | Vitest + Testing Library (jsdom); cobertura mínima de 90% em `src/` |
| `npm run format` | Prettier |

## Como funciona

- **Rota:** só `/f/:codigo` (`src/rota.ts`, mesmo regex da API). Qualquer outro caminho mostra "Página não encontrada" sem chamar a API.
- **Estados:** carregando (esqueleto), `404` → "Página não encontrada" (inexistente e lojista não ativo respondem igual, RN35), `429`/`5xx`/rede/timeout de 10 s/JSON fora do formato → "Não foi possível carregar as ofertas" com "Tentar de novo".
- **Exibição:** decide só por `panfleto != null`; a API já aplicou a regra `sePanfleto` (plano §4.8). A ordem de categorias e produtos é a do JSON (o cliente nunca reordena).
- **Cores:** `src/tema/cores.ts` implementa o algoritmo do plano §4.7 (idêntico ao do Flutter); nome e preço na primária, o resto na secundária.
- **PDF:** `pdfjs-dist` e o worker ficam em chunks separados, baixados só quando o panfleto é PDF. Só a página 1 é desenhada num `<canvas>`, sem camada de texto, anotações ou formulários. Há sempre o link "Abrir PDF".
- **Zoom:** pinça nativa do navegador (o `viewport` não limita a escala).

## Testes

```bash
npm run test
npm run test:cov
```

Fixtures do contrato em `test/fixtures/` (página montada, panfleto imagem, panfleto PDF, página vazia). O pdf.js é mockado nos testes (o jsdom não desenha canvas).

## Deploy (Vercel)

1. API com os marcos M1 e M2 em produção.
2. **CORS do bucket `midia` do Supabase** (D5): liberar `GET`/`HEAD` para o domínio da página e para `http://localhost:5173`. Sem isso o PDF não abre (o pdf.js baixa o arquivo via `fetch`). Conferir com
   `curl -I -H "Origin: https://<dominio>" <urlArquivo de um PDF>` (deve voltar `Access-Control-Allow-Origin`).
3. Projeto novo na Vercel com *Root Directory* `tabloide-pagina-publica`, framework Vite, e as variáveis
   `VITE_API_URL=https://tabloide-api.vercel.app/v1` e `VITE_API_ORIGEM=https://tabloide-api.vercel.app`.
4. Em `vercel.json`, trocar `<api>` e `<projeto>` da `Content-Security-Policy` pelos domínios reais (API e Supabase) antes do primeiro deploy.
5. Domínio definitivo configurado.
6. Na API de produção: `PUBLIC_BASE_URL=https://<dominio-da-pagina>` (sem barra no fim). **Atenção:** isso muda o conteúdo de todos os QR Codes; os já impressos com o domínio antigo param de funcionar se ele não redirecionar `/f/*`. Confirmar com o responsável antes de trocar.
7. Abrir as 3 filiais de teste (página montada, panfleto imagem, panfleto PDF) no celular.

`vercel.json` reescreve `/f/:codigo` (e qualquer outro caminho fora de `/assets/`) para o `index.html`, aplica cache de 1 ano nos arquivos de `/assets/` (nomes com hash) e os cabeçalhos de segurança (`nosniff`, `Referrer-Policy`, CSP). O `index.html` fica sem cache longo (padrão da Vercel).

## Contribuindo

Antes de abrir um PR, rode a mesma sequência que valida o projeto:

```bash
npm run lint
npm run typecheck
npm run test:cov
npm run build
```

O `build` falha se o orçamento do bundle for estourado e o `test:cov` falha abaixo de 90% de cobertura.

## Licença

Software proprietário, de uso interno. Todos os direitos reservados.
