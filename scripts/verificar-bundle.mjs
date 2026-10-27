// Orçamento do bundle (RNF02, react.md R7/R8): roda no fim do `npm run build`.
// Falha se o JS de entrada contiver o pdf.js ou passar de 60 kB gzip, ou se o CSS passar de 10 kB gzip.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';
const LIMITE_JS = 60 * 1024;
const LIMITE_CSS = 10 * 1024;

const html = readFileSync(join(DIST, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script[^>]+src="\/([^"]+\.js)"/g)].map((m) => m[1]);
const precarregados = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="\/([^"]+\.js)"/g)].map(
  (m) => m[1],
);
const estilos = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="\/([^"]+\.css)"/g)].map((m) => m[1]);

const gzip = (arquivo) => gzipSync(readFileSync(join(DIST, arquivo))).length;
const kb = (bytes) => `${(bytes / 1024).toFixed(2)} kB`;
const erros = [];

if (scripts.length === 0) erros.push('Nenhum <script> de entrada encontrado em dist/index.html.');

const iniciais = [...new Set([...scripts, ...precarregados])];
let totalJs = 0;
for (const arquivo of iniciais) {
  const conteudo = readFileSync(join(DIST, arquivo), 'utf8');
  if (/pdfjs|GlobalWorkerOptions|pdf\.worker/.test(conteudo)) {
    erros.push(`${arquivo} contém o pdf.js; ele deve ficar num chunk carregado sob demanda.`);
  }
  totalJs += gzip(arquivo);
}

const totalCss = estilos.reduce((soma, arquivo) => soma + gzip(arquivo), 0);

console.log(`JS inicial: ${kb(totalJs)} gzip (limite ${kb(LIMITE_JS)}) — ${iniciais.join(', ')}`);
console.log(`CSS: ${kb(totalCss)} gzip (limite ${kb(LIMITE_CSS)}) — ${estilos.join(', ')}`);

if (totalJs > LIMITE_JS) erros.push(`JS inicial acima do orçamento: ${kb(totalJs)} > ${kb(LIMITE_JS)}.`);
if (totalCss > LIMITE_CSS) erros.push(`CSS acima do orçamento: ${kb(totalCss)} > ${kb(LIMITE_CSS)}.`);

if (erros.length > 0) {
  for (const erro of erros) console.error(`✗ ${erro}`);
  process.exit(1);
}
console.log('✓ Orçamento do bundle respeitado.');
