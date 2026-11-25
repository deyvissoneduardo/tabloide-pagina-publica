export const POLITICA = {
  ultimaAtualizacao: '25/11/2026',
  controlador: {
    nome: 'Deyvisson Eduardo',
    cnpj: '38.381.289/0001-09',
    cidadeUf: 'Brasilia/DF',
  },
  encarregado: {
    nome: 'Deyvisson Eduardo',
    email: 'dev.deyvissoneduardo@gmail.com',
  },
  /** Região do projeto Supabase (banco de dados e arquivos). */
  regiaoSupabase: 'America do Sul',
  /** Prazo de guarda dos registros técnicos de acesso (Marco Civil, art. 15: mínimo de 6 meses). */
  prazoLogs: '6 meses',
  /** Prazo de guarda dos dados após o encerramento da conta. */
  prazoAposEncerramento: '6 meses',
} as const;

/** Valor ainda não preenchido (entre colchetes). */
export function ehPendente(valor: string): boolean {
  return valor.startsWith('[') && valor.endsWith(']');
}

export const SECOES = [
  { id: 'quem-somos', titulo: '1. Quem somos e a quem esta política se aplica' },
  { id: 'definicoes', titulo: '2. Definições' },
  { id: 'dados-coletados', titulo: '3. Quais dados tratamos' },
  { id: 'finalidades', titulo: '4. Para que usamos os dados e com qual base legal' },
  { id: 'compartilhamento', titulo: '5. Com quem compartilhamos' },
  { id: 'transferencia', titulo: '6. Transferência internacional' },
  { id: 'cookies', titulo: '7. Cookies e armazenamento no navegador' },
  { id: 'retencao', titulo: '8. Por quanto tempo guardamos' },
  { id: 'seguranca', titulo: '9. Como protegemos os dados' },
  { id: 'direitos', titulo: '10. Seus direitos como titular' },
  { id: 'lojista', titulo: '11. Responsabilidades do lojista' },
  { id: 'menores', titulo: '12. Crianças e adolescentes' },
  { id: 'alteracoes', titulo: '13. Alterações desta política' },
  { id: 'contato', titulo: '14. Encarregado e contato' },
] as const;
