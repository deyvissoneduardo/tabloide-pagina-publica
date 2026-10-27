/** Mesmo formato da API (api/src/modules/publico/domain/codigo-publico.ts): 8 caracteres, sem 0 1 i l o I O. */
export const CODIGO_PUBLICO_REGEX = /^[23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{8}$/;

const ROTA_FILIAL = /^\/f\/([^/]+)\/?$/;

/** "/f/k7Qm2xPa" ou "/f/k7Qm2xPa/" → "k7Qm2xPa"; qualquer outra coisa → null. */
export function extrairCodigo(pathname: string): string | null {
  const codigo = ROTA_FILIAL.exec(pathname)?.[1];
  if (codigo === undefined || !CODIGO_PUBLICO_REGEX.test(codigo)) return null;
  return codigo;
}
