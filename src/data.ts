export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

export interface RecipeItem {
  name: string;
  description: string;
  profitRatio: string;
}

export interface CourseModule {
  title: string;
  duration: string;
  description: string;
  items: string[];
}

export const steps: Step[] = [
  {
    id: "step-1",
    number: "01",
    title: "Acesse os Materiais Digitais",
    description: "Manuais práticos e diretos ao ponto, formatados para leitura rápida e fácil consulta direto do celular, na cozinha."
  },
  {
    id: "step-2",
    number: "02",
    title: "Monte Seus Primeiros Bolos",
    description: "Siga o passo a passo com a nossa lista de insumos calculada para o menor custo e desperdício zero na sua primeira fornada."
  },
  {
    id: "step-3",
    number: "03",
    title: "Venda na Sua Região",
    description: "Copie e cole nossas estratégias rápidas de divulgação orgânica e comece a receber pedidos via WhatsApp ainda na primeira semana."
  }
];

export const methods = [
  {
    title: "A Massa Secreta & Truques",
    desc: "Aprenda a fazer a massa 'pão de ló' redonda fofinha e úmida ideal para modelar como hambúrguer, sem desmoronar ou perder o ponto de corte."
  },
  {
    title: "O Ponto dos Brigadeiros",
    desc: "O recheio de brigadeiro gourmet no ponto ideal de consistência para simular a 'carne premium' e caldas brilhantes que parecem queijo derretido."
  },
  {
    title: "Embalagem & Envio WhatsApp",
    desc: "Como embalar o X-Bolo Gourmet de uma forma profissional que gera desejo visual instantâneo e faz os clientes postarem nas redes sociais de graça."
  }
];

export const whatYouWillReceive: CourseModule[] = [
  {
    title: "Módulo 1: O Início Lucrativo",
    duration: "Completo",
    description: "A mentalidade de renda extra rápida, utensílios baratos e higiene essencial para começar na cozinha de casa.",
    items: [
      "Como faturar seus primeiros R$ 1.000 em 15 dias",
      "Lista básica de utensílios (gasto menor que R$ 50)",
      "Adequação e cuidados de higiene em casa",
      "Como escolher os melhores e mais baratos insumos"
    ]
  },
  {
    title: "Módulo 2: Massas e Estruturas Perfeitas",
    duration: "Completo",
    description: "O segredo por trás do 'Hamburgão' doce de alta durabilidade e visual impecável.",
    items: [
      "Massa Neutra Especial para modelagem de hambúrguer",
      "Massa de Cacau Black intensa para a base burger gourmet",
      "O tempo ideal de forno para manter a umidade",
      "Cortes e nivelamento sem desperdício de rebarbas"
    ]
  },
  {
    title: "Módulo 3: Recheios & Caldas de Alto Desejo",
    duration: "Completo",
    description: "Brigadeiros gourmet imitando carne de hambúrguer, fatias de queijo e molhos artesanais doces.",
    items: [
      "Brigadeiro de Chocolate Belga no ponto de corte (A Carne)",
      "Creme de Maracujá Cremoso com textura aveludada (O Queijo Chester)",
      "Calda de Morango fresco brilhante (O Ketchup Artesanal)",
      "Ganache verde Pistache (O Molho Especial de Ervas)"
    ]
  },
  {
    title: "Módulo 4: Montagem Prática e Rápida",
    duration: "Completo",
    description: "O fluxo de produção em escala para montar 30 unidades por hora sem complicação.",
    items: [
      "Técnica de prensagem ultra-rápida no aro",
      "Finalização com chocolate branco ralado imitando gergelim",
      "Fixação de recheio para não ceder no transporte",
      "Controle de peso padrão para garantir seu lucro"
    ]
  },
  {
    title: "Módulo 5: Marketing de Atração e Divulgação",
    duration: "Completo",
    description: "Estratégia simples sem gastar 1 real com anúncios para lotar sua agenda.",
    items: [
      "Fotos que vendem usando apenas a luz natural da janela",
      "Script exato de vendas para enviar a amigos e vizinhos",
      "Como criar um perfil altamente desejável no Instagram",
      "Parcerias estratégicas locais para vendas corporativas"
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Carolina Mendes",
    role: "Mãe e Confeiteira Iniciante",
    avatar: "/imgs/depoimento1.jpg",
    rating: 5,
    comment: "Eu nunca tinha feito um bolo para vender na vida. Comecei na minha cozinha, comprei só os ingredientes básicos. Na primeira semana vendi 18 X-Bolos Gourmet para os vizinhos e os pais da escola do meu filho! O lucro pagou o curso e sobrou ótimo dinheiro.",
    location: "São Paulo - SP"
  },
  {
    name: "Mariana Souza",
    role: "Ex-Recepcionista",
    avatar: "/imgs/depoimento2.jpg",
    rating: 5,
    comment: "Estava desempregada há 4 meses e com medo do futuro. Entrei com o restinho do cartão de crédito. É impressionante como as pessoas amam a novidade! Todo mundo quer tirar foto do X-Bolo Lucrativo antes de comer. Renda de mais de R$ 2.400,00 no meu primeiro mês.",
    location: "Ribeirão Preto - SP"
  },
  {
    name: "Patrícia Albuquerque",
    role: "Confeiteira experiente",
    avatar: "/imgs/depoimento3.jpg",
    rating: 5,
    comment: "Eu já vendia bolos tradicionais, mas o mercado estava muito concorrido e meus lucros baixos. O X-Bolo Gourmet mudou meu jogo. É muito mais rápido de fazer, embalar e o lucro é quase três vezes maior. Meus clientes tradicionais ficaram loucos!",
    location: "Salvador - BA"
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "Preciso ter experiência prévia na cozinha?",
    answer: "Absolutamente não! O curso foi desenvolvido pensando em quem nunca acendeu um forno profissional. Mostramos desde como misturar os ingredientes até o acabamento de gergelim doce, de forma 100% visual e simples."
  },
  {
    question: "Quanto de dinheiro preciso para começar?",
    answer: "Tudo o que você precisa são utensílios básicos de cozinha que você provavelmente já tem (uma assadeira simples, faca de pão, tigelas e colher). Com menos de R$ 50 para os primeiros ingredientes (farinha, ovos, leite condensado e morangos), você já consegue fazer seus primeiros X-Bolos Gourmet e faturar."
  },
  {
    question: "Como vou receber o acesso ao material?",
    answer: "O acesso é imediato! Assim que seu pagamento for confirmado (no cartão ou PIX automático), você receberá um e-mail com seus dados de login para a nossa plataforma premium mobile-first. Você assiste de onde quiser."
  },
  {
    question: "O curso tem certificado inclusivo?",
    answer: "Sim! Ao concluir todas as vídeo-aulas da nossa área de membros, você receberá um lindo certificado digital de Especialista em X-Bolo Lucrativo diretamente na plataforma para imprimir e expor."
  },
  {
    question: "E se eu comprar e não gostar do curso?",
    answer: "Temos tanta certeza do método que oferecemos uma garantia incondicional de 30 dias. Se por qualquer motivo você achar que o curso não é para você, basta enviar um único e-mail ou mensagem e devolvemos 100% do seu dinheiro, sem perguntas."
  }
];
