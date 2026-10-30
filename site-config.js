const SITE_CONFIG = {
  brand: "Beauty Joice Mariot",
  instagram: "https://www.instagram.com/joice_s_mariot/",
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
  // Fotos da seção "Resultados reais". Adicione apenas fotos próprias/autorizadas.
  // Formato: { src: "assets/portfolio/arquivo.jpg", category: "loiros" | "morenas", alt: "Descrição", caption: "Legenda" }
  photos: [
    {
      src: "assets/FOTOS%20REAIS%20CLIENTES/SaveClip.App_806280689_18628941727041478_3970941238336861141_n.jpg",
      category: "loiros",
      alt: "Cliente com cabelo loiro iluminado longo e ondulado, enquanto Joice ajeita as mechas.",
      caption: "Loiro iluminado com ondas",
    },
    {
      src: "assets/FOTOS%20REAIS%20CLIENTES/SaveClip.App_806453601_18627752509041478_1304444304344620590_n.jpg",
      category: "loiros",
      alt: "Cliente com cabelo loiro claro em ondas volumosas, enquanto Joice ajeita as mechas.",
      caption: "Loiro claro volumoso",
    },
    {
      src: "assets/FOTOS%20REAIS%20CLIENTES/SaveClip.App_841956553_18637627762041478_2987152098160786593_n.jpg",
      category: "loiros",
      alt: "Cliente com cabelo médio em camadas e mechas loiras sobre base escura.",
      caption: "Mechas em camadas",
    },
    {
      src: "assets/FOTOS%20REAIS%20CLIENTES/SaveClip.App_858985238_18641497384041478_42878379784386297_n.jpg",
      category: "loiros",
      alt: "Cliente com cabelo longo em tons de mel e loiro dourado.",
      caption: "Loiro mel dourado",
    },
  ],
  // Artigos do blog (técnicas de mechas). Remova todos para esconder a seção.
  posts: [
    {
      "title": "Balayage",
      "summary": "Mechas pintadas à mão, com transição suave e crescimento natural.",
      "body": "No balayage o pó descolorante é aplicado à mão, sem papel alumínio, concentrando o clareamento nas pontas e no comprimento. O resultado é um degradê macio, sem linha de raiz marcada.",
      "tips": [
        "Ideal para quem quer manutenção espaçada.",
        "Defina antes o tom final desejado.",
        "A tonalização completa o resultado."
      ]
    },
    {
      "title": "Babylights",
      "summary": "Fios finíssimos para um brilho discreto, como o sol natural.",
      "body": "Os babylights usam mechas bem finas e próximas, criando iluminação delicada e uniforme. Funcionam bem para quem quer mudar o tom sem contraste forte.",
      "tips": [
        "Boa porta de entrada para o loiro.",
        "Pede precisão na separação das mechas.",
        "Combina com bases claras e médias."
      ]
    },
    {
      "title": "Morena iluminada",
      "summary": "Reflexos em tons de caramelo e mel sobre base castanha.",
      "body": "Na morena iluminada o clareamento é controlado para não abrir demais a base, preservando profundidade. A tonalização define se o reflexo será dourado, caramelo ou neutro.",
      "tips": [
        "Evite clarear além do necessário.",
        "Escolha o reflexo conforme o tom de pele.",
        "Use produtos de manutenção pós-química."
      ]
    },
    {
      "title": "Money piece",
      "summary": "Mechas mais claras emoldurando o rosto.",
      "body": "O money piece ilumina apenas as mechas da frente, que contornam o rosto. É uma forma de renovar o visual com pouco clareamento e fácil retoque.",
      "tips": [
        "Funciona em loiras e morenas.",
        "Ajuda a valorizar o formato do rosto.",
        "Pode ser combinado com outras técnicas."
      ]
    },
    {
      "title": "Mechas com papel alumínio",
      "summary": "Clareamento mais intenso e uniforme, da raiz às pontas.",
      "body": "O papel alumínio isola cada mecha e retém calor, o que permite chegar a tons mais claros com uniformidade. É a base de muitos loiros platinados.",
      "tips": [
        "Indicada para grandes mudanças de tom.",
        "Exige diagnóstico prévio dos fios.",
        "Planeje a frequência de retoque."
      ]
    },
    {
      "title": "Matização e tonalização",
      "summary": "A etapa que define a cor final depois das mechas.",
      "body": "Após o clareamento, a tonalização neutraliza fundos amarelados ou alaranjados e entrega o tom planejado. É o que separa um loiro bonito de um mal acabado.",
      "tips": [
        "Escolha o matizador conforme o fundo de clareamento.",
        "Repita a manutenção em casa.",
        "Evite lavar com água muito quente."
      ]
    }
  ],
  // Adicione apenas depoimentos reais com autorização de publicação.
  // A seção de depoimentos só aparece no site quando houver pelo menos um.
  // Formato: { name: "Nome da aluna", role: "Cabeleireira em ...", text: "Depoimento..." }
  testimonials: [],
};

window.SITE_CONFIG = SITE_CONFIG;

