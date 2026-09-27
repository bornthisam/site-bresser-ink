// Conteúdo e configuração central do site. Edite aqui para trocar textos, preços e contatos.

export const site = {
  name: "Bresser INK",
  company: "38.359.752 LTDA",
  cnpj: "38.359.752/0001-16",
  phone: { label: "(11) 2366-3044", href: "tel:+551123663044" },
  whatsapp: { label: "(11) 2366-3044", number: "551123663044" },
  email: "print@bresser.ink",
  instagram: { handle: "bresser.ink", href: "https://instagram.com/bresser.ink" },
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
  { href: "#servicos", label: "O que fazemos" },
  { href: "#precos", label: "Preços" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
];

export const quoteOptions = [
  "DTF Têxtil (camiseta, moletom, boné)",
  "DTF UV (copo, garrafa, acrílico)",
  "Os dois",
  "Ainda não sei, quero entender",
];

export const stats = [
  { value: "15+", label: "anos no mercado de personalização" },
  { value: "24h", label: "prazo máximo de produção" },
  { value: "58 cm", label: "largura do filme têxtil" },
  { value: "Sem", label: "pedido mínimo para começar" },
];

export const services = [
  {
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
];

// ---------------------------------------------------------------- Preços

export type Sheet = { name: string; w: number; h: number; price: number };
export type Tier = { min: number; max: number; price: number };
export type Product = {
  id: "textil" | "uv";
  name: string;
  filmWidth: number;
  sheets: Sheet[];
  tiers: Tier[];
};

export const products: Product[] = [
  {
    id: "textil",
    name: "Têxtil",
    filmWidth: 58,
    sheets: [
      { name: "A3", w: 29, h: 42, price: 24.9 },
      { name: "meio metro", w: 58, h: 50, price: 29.9 },
    ],
    tiers: [
      { min: 1, max: 6, price: 59.9 },
      { min: 6, max: 10, price: 49.9 },
      { min: 11, max: 20, price: 44.9 },
      { min: 21, max: 50, price: 39.9 },
    ],
  },
  {
    id: "uv",
    name: "UV",
    filmWidth: 30,
    sheets: [
      { name: "A4", w: 21, h: 29.7, price: 24.9 },
      { name: "A3", w: 29, h: 42, price: 36.9 },
      { name: "meio metro", w: 30, h: 50, price: 44.9 },
    ],
    tiers: [
      { min: 1, max: 6, price: 84.9 },
      { min: 6, max: 10, price: 79.9 },
      { min: 11, max: 29, price: 74.9 },
      { min: 30, max: 50, price: 69.9 },
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
    text: "PNG com fundo transparente, 300 dpi, no tamanho final. Pelo WhatsApp mesmo. Se tiver dúvida no arquivo, a gente confere antes de imprimir, sem cobrar nada.",
  },
  {
    title: "A gente imprime",
    text: "Arte aprovada até as 14h sai no mesmo dia, dependendo do tamanho do arquivo. No máximo em até 24h.",
  },
  {
    title: "Retira ou recebe",
    text: "Retirada na Rua Bresser, no Brás, motoboy que você chama, ou Correios para todo o Brasil.",
  },
  {
    title: "Aplica e vende",
    text: "Têxtil: prensa a 150 °C por 15 segundos, com peel frio. UV: descola, posiciona e pressiona. Sem máquina cara, sem desperdício.",
  },
];

export const features = [
  {
    icon: "clock",
    title: "Mesmo dia até as 14h",
    text: "Arte enviada até as 14h imprime no mesmo dia, dependendo do tamanho do arquivo. Nunca passa de 24h.",
  },
  {
    icon: "ruler",
    title: "58 cm de largura",
    text: "Filme largo para encaixar mais artes por metro e derrubar o custo por peça.",
  },
  {
    icon: "layers",
    title: "Têxtil e UV no mesmo lugar",
    text: "Camiseta, moletom, boné, copo, garrafa e acrílico. Um fornecedor só para tudo que você personaliza.",
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
    q: "Qual a diferença entre DTF Têxtil e DTF UV?",
    a: "O DTF Têxtil é para tecidos e aplica com calor. O DTF UV é um adesivo de alta definição para superfícies rígidas (copos, garrafas, acrílico, vidro, madeira, metal) e aplica sem calor: descola, posiciona e pressiona.",
  },
  {
    q: "Qual é o prazo de entrega?",
    a: "Arte enviada até as 14h imprime no mesmo dia, dependendo do tamanho do arquivo. No máximo em até 24h. A gente avisa no WhatsApp assim que ficar pronto.",
  },
  {
    q: "Tem pedido mínimo?",
    a: "Sem pedido mínimo. Dá para pedir uma folha A4 ou A3 para testar a qualidade e depois fechar metragem maior.",
  },
  {
    q: "Como devo enviar a arte?",
    a: "PNG com fundo transparente, 300 dpi, no tamanho final de aplicação. Também aceitamos PDF, AI e CDR. Manda pelo WhatsApp que a gente confere antes de imprimir, sem custo.",
  },
  {
    q: "Como aplico o DTF Têxtil?",
    a: "Prensa térmica a 150 °C por 15 segundos, com pressão média. Deixe esfriar e puxe o filme (peel frio). Para fixar melhor, prense mais 5 segundos com papel manteiga por cima.",
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
