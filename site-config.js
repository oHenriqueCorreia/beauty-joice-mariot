const SITE_CONFIG = {
  brand: "Beauty Joice Mariot",
  instagram: "https://www.instagram.com/beauty.joicemariot/",
  // Preencha com o número internacional, somente dígitos, quando confirmado.
  whatsapp: "",
  bookingUrl: "",
  // Campos vazios mantêm o texto padrão da página ("Valor a confirmar", etc.).
  course: {
    online: {
      price: "", // ex.: "R$ 497" ou "US$ 197"
      installments: "", // ex.: "ou 12x de R$ 49,70"
      // Link do checkout (Hotmart, Kiwify, Stripe...). Vazio = abre o WhatsApp.
      checkoutUrl: "",
    },
    presencial: {
      price: "",
      installments: "",
      dates: "", // ex.: "15 e 16 de novembro"
      location: "",
    },
  },
  cityRegion: "A confirmar com a Joice",
  // Preencha com o endereço completo para mostrar o link "Ver no mapa".
  address: "",
  hours: "A confirmar com a Joice",
  budgetPolicy: "Consulte valores e disponibilidade pelo canal de agendamento.",
  credentials: "Licença profissional na Flórida",
  // Adicione aqui apenas fotos próprias/autorizadas e textos descritivos aprovados.
  photos: [
    {
      src: "assets/portfolio/portfolio-loiro-01.jpg",
      category: "loiros",
      alt: "Joice apresenta o cabelo loiro iluminado de uma cliente no salão.",
      caption: "Loiro iluminado",
    },
    {
      src: "assets/portfolio/portfolio-loiro-02.jpg",
      category: "loiros",
      alt: "Joice mostra o resultado de mechas loiras em uma cliente.",
      caption: "Mechas loiras",
    },
    {
      src: "assets/portfolio/portfolio-loiro-03.jpg",
      category: "loiros",
      alt: "Cabelo loiro claro longo com ondas suaves.",
      caption: "Loiro claro com ondas",
    },
    {
      src: "assets/portfolio/portfolio-loiro-04.jpg",
      category: "loiros",
      alt: "Cabelo loiro platinado com mechas e ondas.",
      caption: "Loiro platinado",
    },
    {
      src: "assets/portfolio/portfolio-loiro-05.jpg",
      category: "loiros",
      alt: "Cabelo loiro bege em atendimento com Joice.",
      caption: "Loiro bege",
    },
    {
      src: "assets/portfolio/portfolio-loiro-06.jpg",
      category: "loiros",
      alt: "Cabelo loiro iluminado com ondas compridas.",
      caption: "Loiro iluminado com ondas",
    },
    {
      src: "assets/portfolio/portfolio-morena-01.jpg",
      category: "morenas",
      alt: "Cabelo castanho longo com ondas e mechas caramelo.",
      caption: "Morena iluminada caramelo",
    },
    {
      src: "assets/portfolio/portfolio-morena-02.jpg",
      category: "morenas",
      alt: "Cabelo castanho longo com ondas e camadas.",
      caption: "Castanho longo em camadas",
    },
    {
      src: "assets/portfolio/portfolio-morena-03.jpg",
      category: "morenas",
      alt: "Cabelo castanho iluminado de comprimento médio.",
      caption: "Morena iluminada",
    },
  ],
  // Adicione apenas depoimentos reais com autorização de publicação.
  // A seção de depoimentos só aparece no site quando houver pelo menos um.
  // Formato: { name: "Nome da aluna", role: "Cabeleireira em ...", text: "Depoimento..." }
  testimonials: [],
};

window.SITE_CONFIG = SITE_CONFIG;

