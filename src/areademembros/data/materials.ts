export type Material = {
  id: string;
  title: string;
  description: string;
  duration: string;
  cover: string;
  type: 'main' | 'bonus';
  tag?: string;
};

export const MAIN_MATERIALS: Material[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: Fundamentos do X-Bolo',
    description: 'Entenda o conceito, o diferencial e por que o X-Bolo é a tendência do momento.',
    duration: '45 min',
    cover: '/imgs/1.webp',
    type: 'main',
    tag: 'Introdução',
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: Receitas Exclusivas',
    description: 'Mais de 25 receitas de bolos gourmet que vendem rápido e geram lucro real.',
    duration: '1h 20 min',
    cover: '/imgs/2.webp',
    type: 'main',
    tag: 'Receitas',
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Técnicas de Recheio',
    description: 'Domine os recheios mais populares e crie combinações irresistíveis.',
    duration: '55 min',
    cover: '/imgs/3.webp',
    type: 'main',
    tag: 'Técnicas',
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Precificação e Lucro',
    description: 'Aprenda a precificar corretamente para garantir margem de lucro saudável.',
    duration: '40 min',
    cover: '/imgs/4.webp',
    type: 'main',
    tag: 'Negócio',
  },
  {
    id: 'mod-5',
    title: 'Módulo 5: Vendas e Marketing',
    description: 'Estratégias práticas para divulgar, atrair clientes e fechar pedidos.',
    duration: '1h 05 min',
    cover: '/imgs/5.webp',
    type: 'main',
    tag: 'Marketing',
  },
  {
    id: 'mod-6',
    title: 'Módulo 6: Empreendendo em Casa',
    description: 'Como montar sua mini-confeitaria, legalizar e escalar o negócio.',
    duration: '50 min',
    cover: '/imgs/6.webp',
    type: 'main',
    tag: 'Empreender',
  },
];

export const BONUS_MATERIALS: Material[] = [
  {
    id: 'bonus-1',
    title: '+10 Modelos de Posts Prontos',
    description: 'Templates de posts para Instagram e WhatsApp prontos para usar e vender.',
    duration: 'Imediato',
    cover: '/imgs/7.webp',
    type: 'bonus',
    tag: 'Bônus',
  },
  {
    id: 'bonus-2',
    title: 'Calculadora de Custos',
    description: 'App integrado para calcular custo e lucro de cada bolo em segundos.',
    duration: 'Imediato',
    cover: '/imgs/8.webp',
    type: 'bonus',
    tag: 'Bônus',
  },
  {
    id: 'bonus-3',
    title: 'Guia de Embalagens Lucrativas',
    description: 'Saiba quais embalagens usar para valorizar e aumentar o preço do produto.',
    duration: 'Imediato',
    cover: '/imgs/9.webp',
    type: 'bonus',
    tag: 'Bônus',
  },
  {
    id: 'bonus-4',
    title: 'Design Comercial e Etiquetas',
    description: 'Modelos prontos de etiquetas e identidade visual para sua confeitaria.',
    duration: 'Imediato',
    cover: '/imgs/10.webp',
    type: 'bonus',
    tag: 'Bônus',
  },
  {
    id: 'bonus-5',
    title: 'Apostila: 15 Recheios Extras',
    description: 'Apostila especial com 15 receitas de recheios exclusivos e diferenciados.',
    duration: 'Imediato',
    cover: '/imgs/11.webp',
    type: 'bonus',
    tag: 'Bônus',
  },
];

export const ALL_MATERIALS = [...MAIN_MATERIALS, ...BONUS_MATERIALS];
