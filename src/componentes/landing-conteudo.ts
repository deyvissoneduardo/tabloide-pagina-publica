/** Textos e dados fictícios da landing institucional (rota "/"). */

// TODO: trocar pelo WhatsApp comercial (só dígitos, com DDI 55 + DDD).
export const WHATSAPP_NUMERO = '5500000000000';

export const WHATSAPP_MENSAGEM = 'Olá! Quero colocar as ofertas da minha loja no Tabloide Digital.';

export const LINK_WHATSAPP = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

export const SEGMENTOS_DIGITADOS = ['mercado', 'atacado', 'drogaria', 'hortifrúti', 'padaria'];

export const SEGMENTOS = [
  'Supermercados',
  'Atacarejos',
  'Drogarias',
  'Hortifrútis',
  'Padarias',
  'Açougues',
  'Pet shops',
  'Lojas de conveniência',
  'Empórios',
  'Materiais de construção',
];

export interface Passo {
  numero: string;
  titulo: string;
  texto: string;
  icone: 'painel' | 'qr' | 'celular';
}

export const PASSOS: Passo[] = [
  {
    numero: '01',
    titulo: 'Cadastre suas ofertas',
    texto:
      'Suba a foto ou o PDF do panfleto, ou monte a página com produtos, preços e categorias pelo app ou pela web.',
    icone: 'painel',
  },
  {
    numero: '02',
    titulo: 'Imprima o QR Code',
    texto: 'Cada filial ganha um QR Code próprio. Cole na entrada, no caixa, nas gôndolas ou no carrinho.',
    icone: 'qr',
  },
  {
    numero: '03',
    titulo: 'O cliente aponta a câmera',
    texto: 'As ofertas abrem na hora no celular: sem baixar aplicativo, sem cadastro, sem login.',
    icone: 'celular',
  },
];

export interface Funcionalidade {
  titulo: string;
  texto: string;
  icone: string;
  destaque?: boolean;
}

export const FUNCIONALIDADES: Funcionalidade[] = [
  {
    titulo: 'Panfleto em imagem ou PDF',
    texto: 'Já tem o encarte pronto? Envie a foto ou o PDF e ele vira uma página leve, com zoom e validade.',
    icone: '🗞️',
    destaque: true,
  },
  {
    titulo: 'Página montada por categoria',
    texto: 'Produtos com foto, quantidade, preço “de/por” e selo de desconto calculado automaticamente.',
    icone: '🛒',
    destaque: true,
  },
  {
    titulo: 'Agende e esqueça',
    texto: 'Defina início e fim. A oferta entra e sai do ar sozinha, no fuso horário de cada filial.',
    icone: '⏱️',
  },
  {
    titulo: 'Várias filiais',
    texto: 'Cada loja com sua vitrine, seu QR Code e suas promoções, tudo no mesmo login.',
    icone: '🏬',
  },
  {
    titulo: 'A cara da sua marca',
    texto: 'Banner com logo e campanha, 10 cores personalizáveis e prévia ao vivo antes de publicar.',
    icone: '🎨',
  },
  {
    titulo: 'Você decide a ordem',
    texto: 'Arraste categorias e produtos para mostrar primeiro o que mais vende.',
    icone: '↕️',
  },
  {
    titulo: 'Painel no celular e na web',
    texto: 'Atualize um preço do corredor da loja pelo app ou do escritório pelo computador.',
    icone: '📱',
  },
  {
    titulo: 'Privacidade de verdade',
    texto: 'Sem cookies, sem rastreadores. O cliente só vê ofertas, e o endereço da filial fica protegido.',
    icone: '🔒',
  },
];

export interface Vantagem {
  titulo: string;
  texto: string;
}

export const VANTAGENS: Vantagem[] = [
  { titulo: 'Menos papel, menos custo', texto: 'Mude um preço sem reimprimir nenhum encarte.' },
  { titulo: 'Atualização instantânea', texto: 'Salvou no painel, o cliente já vê na próxima leitura.' },
  { titulo: 'Zero atrito para o cliente', texto: 'Nada para instalar. Abre direto na câmera do celular.' },
  { titulo: 'Leve até no 4G fraco', texto: 'Página otimizada para abrir rápido dentro da loja.' },
  { titulo: 'QR Code que não vence', texto: 'Renomeou a filial? O QR impresso continua valendo.' },
  { titulo: 'Oferta vencida some sozinha', texto: 'Nada de cliente reclamando de preço que acabou.' },
];

export interface Numero {
  alvo: number;
  prefixo?: string;
  sufixo?: string;
  rotulo: string;
}

export const NUMEROS: Numero[] = [
  { alvo: 0, rotulo: 'apps para o cliente instalar' },
  { alvo: 1, rotulo: 'QR Code exclusivo por filial' },
  { alvo: 10, rotulo: 'cores para personalizar' },
  { alvo: 24, sufixo: 'h', rotulo: 'suas ofertas no ar' },
];

export interface ProdutoFicticio {
  nome: string;
  quantidade: string;
  preco: string;
  precoOriginal?: string;
  desconto?: string;
  emoji: string;
  /** Categoria do painel fictício (minúscula, como o lojista cadastra). */
  categoria: string;
  /** "dd/mm" da data limite; sem ela, "sem data limite". */
  validade?: string;
}

export const PRODUTOS_FICTICIOS: ProdutoFicticio[] = [
  {
    nome: 'Arroz Tipo 1',
    quantidade: '5 kg',
    preco: '21,90',
    precoOriginal: '27,90',
    desconto: '-22%',
    emoji: '🍚',
    categoria: 'mercearia',
  },
  {
    nome: 'Café Torrado',
    quantidade: '500 g',
    preco: '14,49',
    precoOriginal: '18,99',
    desconto: '-24%',
    emoji: '☕',
    categoria: 'mercearia',
    validade: '31/10',
  },
  { nome: 'Leite Integral', quantidade: '1 L', preco: '4,79', emoji: '🥛', categoria: 'mercearia' },
  {
    nome: 'Banana Prata',
    quantidade: 'kg',
    preco: '5,99',
    precoOriginal: '7,49',
    desconto: '-20%',
    emoji: '🍌',
    categoria: 'hortifrúti',
  },
  {
    nome: 'Picanha Bovina',
    quantidade: 'kg',
    preco: '59,90',
    precoOriginal: '79,90',
    desconto: '-25%',
    emoji: '🥩',
    categoria: 'açougue',
  },
  { nome: 'Sabão em Pó', quantidade: '1,6 kg', preco: '17,90', emoji: '🧼', categoria: 'limpeza' },
  {
    nome: 'Pão Francês',
    quantidade: 'kg',
    preco: '12,90',
    precoOriginal: '15,90',
    desconto: '-19%',
    emoji: '🥖',
    categoria: 'padaria',
    validade: '31/10',
  },
  {
    nome: 'Refrigerante',
    quantidade: '2 L',
    preco: '7,49',
    precoOriginal: '9,99',
    desconto: '-25%',
    emoji: '🥤',
    categoria: 'bebidas',
    validade: '31/10',
  },
];

export const TELAS_PAINEL = ['Início', 'Produtos', 'Página'] as const;
export type TelaPainel = (typeof TELAS_PAINEL)[number];

/** Ordem das categorias no painel fictício (como o lojista arrastou). */
export const CATEGORIAS_PAINEL = ['mercearia', 'açougue', 'bebidas', 'hortifrúti', 'padaria', 'limpeza'];

export const FILIAIS_FICTICIAS = [
  { nome: 'Filial Centro', situacao: 'produtos', codigo: 'ea3sC7Ej' },
  { nome: 'Filial Jardim América', situacao: 'panfleto', codigo: '9GzaHx4e' },
] as const;
