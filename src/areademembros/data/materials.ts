export type Material = {
  id: string;
  title: string;
  description: string;
  duration: string;
  cover: string;
  type: 'main' | 'bonus';
  tag?: string;
  pdfUrl?: string;
  images?: string[];
  mediaType?: 'pdf' | 'images' | 'calculator';
};

export const MAIN_MATERIALS: Material[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: O Início Lucrativo',
    description: 'A mentalidade de renda extra rápida, utensílios baratos e higiene essencial para começar na cozinha de casa.',
    duration: '45 min',
    cover: '/imgs/1.webp',
    type: 'main',
    tag: 'Introdução',
    pdfUrl: '/entregaveis/MÓDULO 1 O INÍCIO LUCRATIVO.pdf',
    mediaType: 'pdf'
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: Massas e Estruturas Perfeitas',
    description: "O segredo por trás do 'Hamburgão' doce de alta durabilidade e visual impecável.",
    duration: '1h 20 min',
    cover: '/imgs/2.webp',
    type: 'main',
    tag: 'Massas',
    pdfUrl: '/entregaveis/MÓDULO 2 MASSAS E ESTRUTURA.pdf',
    mediaType: 'pdf'
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Recheios & Caldas de Alto Desejo',
    description: 'Brigadeiros gourmet imitando carne de hambúrguer, fatias de queijo e molhos artesanais doces.',
    duration: '55 min',
    cover: '/imgs/3.webp',
    type: 'main',
    tag: 'Recheios',
    pdfUrl: '/entregaveis/MÓDULO 3 RECHEIOS E CALDAS.pdf',
    mediaType: 'pdf'
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Montagem Prática e Rápida',
    description: 'O fluxo de produção em escala para montar 30 unidades por hora sem complicação.',
    duration: '40 min',
    cover: '/imgs/4.webp',
    type: 'main',
    tag: 'Montagem',
    pdfUrl: '/entregaveis/MÓDULO 4 MONTAGEM E PRODUÇÃO.pdf',
    mediaType: 'pdf'
  },
  {
    id: 'mod-5',
    title: 'Módulo 5: Marketing de Atração e Divulgação',
    description: 'Estratégia simples sem gastar 1 real com anúncios para lotar sua agenda.',
    duration: '1h 05 min',
    cover: '/imgs/5.webp',
    type: 'main',
    tag: 'Marketing',
    pdfUrl: '/entregaveis/MÓDULO 5 MARKETING E VENDAS.pdf',
    mediaType: 'pdf'
  },
];

export const BONUS_MATERIALS: Material[] = [
  {
    id: 'bonus-1',
    title: '+10 Modelos de Posts Prontos',
    description: 'Arquivos prontos para você postar e atrair encomendas instantâneas nas redes sociais.',
    duration: 'Imediato',
    cover: '/imgs/7.webp',
    type: 'bonus',
    tag: 'Bônus',
    mediaType: 'images',
    images: [
      '/entregaveis/+10 Modelos de Posts Prontos/arte1.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte2.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte3.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte4.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte5.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte6.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte7.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte8.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte9.png',
      '/entregaveis/+10 Modelos de Posts Prontos/arte10.png'
    ]
  },
  {
    id: 'bonus-2',
    title: 'Ferramenta: Calculadora de Custos',
    description: 'Um aplicativo interativo dentro da área de membros para calcular custos e lucro exato automaticamente.',
    duration: 'Imediato',
    cover: '/imgs/8.webp',
    type: 'bonus',
    tag: 'Bônus',
    mediaType: 'calculator'
  },
  {
    id: 'bonus-3',
    title: 'Guia de Embalagens Lucrativas',
    description: 'Como montar uma apresentação premium de hambúrguer doce que valoriza o produto.',
    duration: 'Imediato',
    cover: '/imgs/9.webp',
    type: 'bonus',
    tag: 'Bônus',
    pdfUrl: '/entregaveis/BÔNUS 2 GUIA DE EMBALAGENS LUCRATIVAS.pdf',
    mediaType: 'pdf'
  },
  {
    id: 'bonus-4',
    title: 'Design Comercial e Etiquetas',
    description: 'Etiquetas profissionais para imprimir em casa e colar nas suas caixas.',
    duration: 'Imediato',
    cover: '/imgs/10.webp',
    type: 'bonus',
    tag: 'Bônus',
    mediaType: 'images',
    images: [
      '/entregaveis/Design Comercial e Etiquetas/adesivo1.png',
      '/entregaveis/Design Comercial e Etiquetas/adesivo2.png',
      '/entregaveis/Design Comercial e Etiquetas/adesivo3.png'
    ]
  },
  {
    id: 'bonus-5',
    title: 'Apostila com 15 Recheios Extras',
    description: 'Receitas secretas adicionais de trufas e cremes para diversificar seu cardápio.',
    duration: 'Imediato',
    cover: '/imgs/11.webp',
    type: 'bonus',
    tag: 'Bônus',
    pdfUrl: '/entregaveis/BÔNUS 1 APOSTILA COM 15 RECHEIOS EXTRAS.pdf',
    mediaType: 'pdf'
  },
];

export const ALL_MATERIALS = [...MAIN_MATERIALS, ...BONUS_MATERIALS];
