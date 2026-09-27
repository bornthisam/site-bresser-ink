// Conteúdo e configuração central do site. Edite aqui para trocar textos, preços e contatos.

export const site = {
  name: "Bresser Ink",
  company: "38.359.752 LTDA",
  cnpj: "38.359.752/0001-16",
  phone: { label: "(11) 2366-3044", href: "tel:+551123663044" },
  whatsapp: { label: "(11) 2366-3044", number: "551123663044" },
  email: "print@bresser.ink",
  instagram: { handle: "bresser.ink", href: "https://instagram.com/bresser.ink" },
  tiktok: { handle: "bresser.ink", href: "https://www.tiktok.com/@bresser.ink" },
  address:
    "Rua Bresser, 1526 — Brás, São Paulo – SP, CEP 03053-000",
  mapsHref:
    "https://share.google/rVHQi3C44iXXceKtA",
  hours: [
    { days: "Segunda a sexta", time: "9h às 18h" },
    { days: "Sábado", time: "9h às 13h" },
  ],
  cutoff: "14h",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const navLinks = [
  // "/#…" em vez de "#…": os links também funcionam fora da home (ex.: /politicas).
  { href: "/#servicos", label: "O que fazemos" },
  { href: "/#precos", label: "Preços" },
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#duvidas", label: "Dúvidas" },
];

export const quoteOptions = [
  "DTF Têxtil (camiseta, moletom, boné)",
  "DTF UV (copo, garrafa, acrílico)",
  "Patch 3D TPU (emborrachado)",
  "Mais de um serviço",
  "Ainda não sei, quero entender",
];

export const stats = [
  { value: "15+", label: "anos no mercado de personalização" },
  { value: "3", label: "serviços: DTF Têxtil, DTF UV e Patch 3D TPU" },
  { value: "24h", label: "prazo máximo de produção do DTF" },
  { value: "3D", label: "patch emborrachado em alto relevo" },
];

export const services = [
  {
    brand: "dtf",
    name: "Têxtil",
    width: "58 cm de largura",
    tagline: "Para tudo que é tecido",
    description:
      "Camiseta, moletom, boné, bolsa, uniforme. Cor viva em peça clara ou escura, sem tela, sem mínimo por cor e sem restrição de tecido.",
    bullets: [
      "Algodão, poliéster, misto, nylon e couro sintético",
      "Branco de base incluso: firme em peça preta",
      "Aplica com prensa: 150 °C por 15 segundos",
      "Toque macio e elástico, aguenta lavagem",
    ],
  },
  {
    brand: "dtf",
    name: "UV",
    width: "30 cm de largura",
    tagline: "Para superfície rígida",
    description:
      "Copo, garrafa, acrílico, vidro, madeira, metal e plástico. Adesivo com relevo e alta definição que aplica sem calor nenhum.",
    bullets: [
      "Descola, posiciona e pressiona: pronto",
      "Não precisa de prensa nem de máquina",
      "Acabamento brilhante, com relevo no toque",
      "Perfeito para brinde personalizado em lote",
    ],
  },
  {
    brand: "patch",
    name: "Patch 3D TPU",
    width: "Até 15 × 15 cm",
    tagline: "Emborrachado em alto relevo",
    description:
      "Patch emborrachado em alto relevo com a sua logo ou arte. Acabamento premium para aplicar em camisetas, moletons, bonés, bolsas e acessórios.",
    bullets: [
      "Relevo 3D com toque emborrachado",
      "Feito sob medida com a sua logo ou arte",
      "Aplica com prensa em tecido, boné e acessórios",
      "Resistente à lavagem e ao uso diário",
    ],
  },
] as const;

// ---------------------------------------------------------------- Preços

export type Tier = { min: number; max: number; price: number };

/** Faixa de preço por metro: vale a partir de `from` metros (inclusive). */
export type MeterTier = { from: number; price: number };

/** DTF: vendido por metro linear de filme (meio metro para pedidos pequenos). */
export type DtfProduct = {
  kind: "dtf";
  id: "textil" | "uv";
  name: string;
  filmWidth: number;
  halfMeterPrice: number; // preço fechado de 0,5 m
  meterTiers: MeterTier[]; // em ordem crescente de `from`
};

/** Patch: vendido por unidade, com preço por faixa de quantidade. */
export type PatchProduct = {
  kind: "patch";
  id: "patch";
  name: string;
  maxSize: number; // lado máximo do patch, em cm
  refSize: number; // lado do patch de referência da tabela (refSize × refSize cm)
  minQty: number;
  tiers: Tier[]; // price = preço por unidade no tamanho de referência
};

export type Product = DtfProduct | PatchProduct;

export const productLabel = (p: Product) => (p.kind === "dtf" ? `DTF ${p.name}` : p.name);

export const products: Product[] = [
  {
    kind: "dtf",
    id: "textil",
    name: "Têxtil",
    filmWidth: 58,
    halfMeterPrice: 40,
    meterTiers: [
      { from: 1, price: 70 },
      { from: 5, price: 65 },
      { from: 10, price: 60 },
      { from: 25, price: 55 },
      { from: 50, price: 50 },
    ],
  },
  {
    kind: "dtf",
    id: "uv",
    name: "UV",
    filmWidth: 30,
    halfMeterPrice: 45,
    meterTiers: [
      { from: 1, price: 85 },
      { from: 10, price: 80 },
      { from: 25, price: 75 },
      { from: 50, price: 70 },
    ],
  },
  {
    kind: "patch",
    id: "patch",
    name: "Patch 3D TPU",
    maxSize: 15,
    refSize: 5,
    minQty: 50,
    // ⚠️ PREÇOS FICTÍCIOS (placeholder): troque os valores de `price` abaixo pelos preços reais.
    // `price` é o valor por unidade de um patch de 5 × 5 cm (refSize). Patches maiores são
    // calculados proporcionalmente à área em src/lib/calculator.ts (função estimatePatch).
    tiers: [
      { min: 50, max: 100, price: 6.9 },
      { min: 101, max: 500, price: 4.9 },
      { min: 501, max: 1000, price: 3.9 },
    ],
  },
];

// Faixas da tabela alternam as cores CMYK + preto
export const tierStyles = [
  "bg-cyan text-white",
  "bg-yellow text-[#1a1500]",
  "bg-magenta text-white",
  "bg-ink text-bg",
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ---------------------------------------------------------------- Como funciona / diferenciais

export const steps = [
  {
    title: "Manda a arte",
    text: "PNG com fundo transparente, 300 dpi, no tamanho final. Para patch, a sua logo em vetor ou PNG. Pelo WhatsApp mesmo: a gente confere o arquivo antes de produzir, sem cobrar nada.",
  },
  {
    title: "A gente produz",
    text: "DTF com arte aprovada até as 14h sai no mesmo dia, no máximo em até 24h. Patch 3D TPU com prazo combinado no orçamento.",
  },
  {
    title: "Retira ou recebe",
    text: "Retirada na Rua Bresser, no Brás, motoboy que você chama, ou Correios para todo o Brasil.",
  },
  {
    title: "Aplica e vende",
    text: "Têxtil: prensa a 150 °C por 15 segundos, com peel frio. UV: descola, posiciona e pressiona. Patch: aplica com prensa na peça. Sem máquina cara, sem desperdício.",
  },
];

export const features = [
  {
    icon: "clock",
    title: "DTF no mesmo dia até as 14h",
    text: "No DTF, arte enviada até as 14h imprime no mesmo dia, dependendo do tamanho do arquivo. Nunca passa de 24h.",
  },
  {
    icon: "ruler",
    title: "58 cm de largura",
    text: "Filme largo para encaixar mais artes por metro e derrubar o custo por peça.",
  },
  {
    icon: "layers",
    title: "Três serviços no mesmo lugar",
    text: "DTF Têxtil, DTF UV e Patch 3D TPU. Camiseta, boné, copo, garrafa e patch com a sua logo: um fornecedor só para tudo que você personaliza.",
  },
  {
    icon: "palette",
    title: "Cor viva com branco de base",
    text: "Impressão CMYK + branco: estampa forte em peça escura e clara, com toque macio e elástico.",
  },
  {
    icon: "headset",
    title: "Suporte com quem imprime",
    text: "Dúvida de arte, prazo ou aplicação? Você fala no WhatsApp com quem está na máquina, não com um robô.",
  },
  {
    icon: "map",
    title: "Na zona leste de São Paulo",
    text: "Endereço fixo na Rua Bresser, 1526, no Brás. Retire aqui, mande seu motoboy ou receba pelos Correios.",
  },
] as const;

export const deliveryOptions = [
  {
    title: "Retirada na loja",
    tag: "grátis",
    text: "Rua Bresser, 1526, Brás, São Paulo. A gente avisa no WhatsApp quando estiver pronto.",
  },
  {
    title: "Motoboy",
    tag: "você chama",
    text: "Você chama o motoboy da sua confiança e ele retira aqui na loja. O frete é acertado direto com ele.",
  },
  {
    title: "Correios",
    tag: "pelo CEP",
    text: "Enviamos para todo o Brasil. O valor sai pelo CEP e a gente confirma no WhatsApp antes de postar.",
  },
];

export const faqs = [
  {
    q: "O que é impressão DTF?",
    a: "DTF significa Direct to Film: a arte é impressa em um filme especial com tinta e pó adesivo. Você recebe o filme pronto e transfere para a peça com prensa térmica. Funciona em algodão, poliéster, misto, nylon e outros tecidos, em cores claras e escuras.",
  },
  {
    q: "Qual a diferença entre DTF Têxtil, DTF UV e Patch 3D TPU?",
    a: "O DTF Têxtil é uma estampa para tecidos e aplica com calor. O DTF UV é um adesivo de alta definição para superfícies rígidas (copos, garrafas, acrílico, vidro, madeira, metal) e aplica sem calor. O Patch 3D TPU é um patch emborrachado em alto relevo, feito com a sua logo ou arte, para aplicar em roupas, bonés e acessórios.",
  },
  {
    q: "O que é o Patch 3D TPU?",
    a: "É um patch emborrachado em TPU com relevo 3D, produzido sob medida com a sua logo ou arte. Dá um acabamento premium e marcante em camisetas, moletons, bonés, bolsas e acessórios, e aguenta lavagem e uso diário.",
  },
  {
    q: "Qual é o prazo de entrega?",
    a: "No DTF, arte enviada até as 14h imprime no mesmo dia, dependendo do tamanho do arquivo, e no máximo em até 24h. No Patch 3D TPU, o prazo depende da quantidade e é combinado no orçamento. A gente avisa no WhatsApp assim que ficar pronto.",
  },
  {
    q: "Tem pedido mínimo?",
    a: "No DTF, não: dá para pedir meio metro para testar a qualidade e depois fechar metragem maior. No Patch 3D TPU, o pedido mínimo é de 50 unidades.",
  },
  {
    q: "Como devo enviar a arte?",
    a: "Para DTF, PNG com fundo transparente, 300 dpi, no tamanho final de aplicação. Para patch, de preferência a logo em vetor (PDF, AI ou CDR). Manda pelo WhatsApp que a gente confere antes de produzir, sem custo.",
  },
  {
    q: "Como aplico o DTF Têxtil?",
    a: "Prensa térmica a 150 °C por 15 segundos, com pressão média. Deixe esfriar e puxe o filme (peel frio). Para fixar melhor, prense mais 5 segundos com papel manteiga por cima.",
  },
  {
    q: "Como aplico o Patch 3D TPU?",
    a: "O patch é aplicado com prensa térmica na roupa, no boné ou no acessório. Junto com o pedido, a gente passa a temperatura, o tempo e a pressão certos para o tecido da sua peça.",
  },
  {
    q: "Vocês entregam fora de São Paulo?",
    a: "Sim. Enviamos pelos Correios para todo o Brasil — o valor sai pelo CEP e a gente confirma no WhatsApp antes de postar. Em São Paulo, você também pode retirar na loja ou mandar seu motoboy.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Pix, cartão ou boleto. Pedidos maiores e clientes recorrentes a gente combina direto no WhatsApp.",
  },
];
