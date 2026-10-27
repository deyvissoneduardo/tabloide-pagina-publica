const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 499 → "R$ 4,99" (com espaço não separável depois de "R$"). */
export const formatarDinheiro = (centavos: number): string => reais.format(centavos / 100);
