/** "2026-11-20" → "20/11", sem Date (sem fuso). */
export const formatarDataCurta = (iso: string): string => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
