import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { CircleCheck, Clock, RefreshCcw, Target, Truck } from "lucide-react";
import { deliveryOptions, products, site, whatsappUrl } from "@/lib/site";
import { LinkButton, WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { SectionBackground, blobPresets, gradients } from "@/components/ui/SectionBackground";

export const metadata: Metadata = {
  title: `Políticas da empresa — ${site.name}`,
  description: `Missão, prazos de produção, retirada e entrega, trocas e devoluções da ${site.name}.`,
};

// Data exibida no topo da página: atualize sempre que mudar alguma política.
const LAST_UPDATED = "27 de setembro de 2026";

const patch = products.find((p) => p.kind === "patch");
const hours = site.hours.map((h) => `${h.days}, das ${h.time}`).join("; ");

type Block = { title: string; items: string[] };
type Policy = { id: string; icon: LucideIcon; label: string; title: string; intro: string; blocks: Block[] };

const policies: Policy[] = [
  {
    id: "missao",
    icon: Target,
    label: "Quem somos",
    title: "Missão, visão e valores",
    intro: `A ${site.name} produz DTF Têxtil, DTF UV e Patch 3D TPU para quem vive de personalização. Você vende, a gente produz.`,
    blocks: [
      {
        title: "Missão",
        items: [
          "Entregar impressão e acabamento de qualidade, no prazo combinado, para estamparias, confecções, lojas de brindes e marcas venderem mais e com menos risco.",
        ],
      },
      {
        title: "Visão",
        items: [
          "Ser o fornecedor de referência em personalização de São Paulo: o lugar onde o cliente resolve camiseta, copo e patch num pedido só.",
        ],
      },
      {
        title: "Valores",
        items: [
          "Prazo é compromisso: o que a gente combina, a gente cumpre.",
          "Preço na mesa: tabela pública, sem letra miúda.",
          "Atendimento humano, com quem está na máquina.",
          "Qualidade conferida antes de cada entrega.",
          "Parceria de longo prazo: o seu negócio crescendo é o nosso crescendo.",
        ],
      },
    ],
  },
  {
    id: "prazos",
    icon: Clock,
    label: "Produção",
    title: "Prazos de produção e envio de arquivos",
    intro: "O prazo começa a contar a partir da aprovação da arte e da confirmação do pagamento.",
    blocks: [
      {
        title: "Prazos de produção",
        items: [
          `DTF Têxtil e DTF UV: arte aprovada até as ${site.cutoff} sai no mesmo dia, dependendo do tamanho do arquivo e da fila de produção. No máximo em até 24h.`,
          `Patch 3D TPU: prazo informado no orçamento, conforme a quantidade e o tamanho${patch ? ` (pedido mínimo de ${patch.minQty} unidades)` : ""}.`,
          `Horário de produção e atendimento: ${hours}. Pedidos aprovados fora desse horário entram na fila do próximo dia útil.`,
        ],
      },
      {
        title: "Como enviar a arte",
        items: [
          "DTF: PNG com fundo transparente, 300 dpi, no tamanho final de aplicação. Também aceitamos PDF, AI e CDR.",
          "Patch 3D TPU: de preferência a logo em vetor (PDF, AI ou CDR).",
          "Envio pelo WhatsApp ou por e-mail. A gente confere o arquivo antes de produzir, sem custo.",
          "Fontes convertidas em curvas e cores definidas evitam retrabalho e atrasos.",
        ],
      },
      {
        title: "Aprovação",
        items: [
          "Antes de produzir, confirmamos com você tamanho, quantidade e valor. A produção só começa depois da sua aprovação.",
          "A ortografia, as cores e o conteúdo da arte são responsabilidade do cliente. Revise tudo antes de aprovar.",
          "Você declara ter o direito de uso das marcas, logos e imagens enviadas.",
        ],
      },
    ],
  },
  {
    id: "entrega",
    icon: Truck,
    label: "Logística",
    title: "Diretrizes de retirada e entrega",
    intro: "Avisamos pelo WhatsApp assim que o pedido estiver pronto.",
    blocks: [
      {
        title: "Formas de entrega",
        items: deliveryOptions.map((d) => `${d.title} (${d.tag}): ${d.text}`),
      },
      {
        title: "Retirada",
        items: [
          `Endereço: ${site.address}.`,
          `Horário de retirada: ${hours}.`,
          "Informe o nome do cliente ou o número do pedido no balcão.",
          "Pedidos prontos ficam guardados por até 30 dias. Depois desse prazo, fale com a gente para combinar a retirada.",
        ],
      },
      {
        title: "Motoboy e Correios",
        items: [
          `Motoboy: o frete é acertado direto entre você e o entregador. A responsabilidade da ${site.name} passa ao entregador no momento da retirada.`,
          "Correios: o valor do frete sai pelo CEP e é confirmado antes da postagem. Enviamos o código de rastreio pelo WhatsApp.",
          "Confira o pacote ao receber. Se houver avaria na embalagem, registre fotos e fale com a gente.",
        ],
      },
    ],
  },
  {
    id: "trocas",
    icon: RefreshCcw,
    label: "Garantia",
    title: "Trocas e devoluções",
    intro:
      "DTF e Patch 3D TPU são produtos personalizados, feitos sob encomenda a partir da sua arte. Por isso, as trocas seguem regras próprias, sempre respeitando o Código de Defesa do Consumidor.",
    blocks: [
      {
        title: "Quando refazemos ou devolvemos o valor",
        items: [
          "Defeito de produção: falha de impressão, cor diferente do arquivo aprovado, falta de adesão ou patch com defeito de acabamento.",
          "Pedido entregue diferente do que foi aprovado (tamanho, quantidade ou arte).",
          "Nesses casos, refazemos o pedido sem custo ou devolvemos o valor, à sua escolha.",
        ],
      },
      {
        title: "Quando não há troca",
        items: [
          "Erros na arte aprovada pelo cliente (ortografia, cores, baixa resolução, tamanho).",
          "Aplicação feita fora das orientações de temperatura, tempo e pressão informadas.",
          "Desgaste por uso, lavagem inadequada ou aplicação em material não indicado.",
          "Desistência depois que a produção começou, já que o produto é feito exclusivamente para você.",
        ],
      },
      {
        title: "Como solicitar",
        items: [
          "Fale com a gente pelo WhatsApp de preferência em até 7 dias após o recebimento, com fotos do produto e o número do pedido. Isso não reduz os prazos garantidos por lei.",
          "Guarde o material sem aplicar até a análise, sempre que possível.",
          "Respondemos a análise em até 2 dias úteis.",
        ],
      },
    ],
  },
];

export default function PoliticasPage() {
  return (
    <>
      <section className="sempre-escuro relative isolate overflow-hidden">
        <SectionBackground gradient={gradients.spotlight} blobs={blobPresets.hero} />
        <div className="shell relative pt-12 pb-14 sm:pt-16 sm:pb-20">
          <Eyebrow>Políticas da empresa</Eyebrow>
          <h1 className="max-w-3xl text-[2.4rem] leading-[1.02] font-extrabold sm:text-5xl lg:text-6xl">
            Regras claras, <span className="text-gradient-cmyk">sem letra miúda</span>
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-muted">
            Como a {site.name} trabalha: prazos, envio de arquivos, retirada e entrega, trocas e
            devoluções dos produtos personalizados.
          </p>
          <p className="mt-4 font-mono text-[0.68rem] tracking-[0.12em] text-faint uppercase">
            Última atualização: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <section className="relative isolate py-14 sm:py-20">
        <SectionBackground gradient={gradients.soft} blobs={blobPresets.corners} />
        <div className="shell relative grid gap-10 lg:grid-cols-[15rem_1fr]">
          <nav aria-label="Nesta página" className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow className="mb-3">Nesta página</Eyebrow>
            <ol className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {policies.map((p, i) => (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-2 text-sm text-muted transition hover:border-line-2 hover:text-ink lg:border-transparent lg:bg-transparent lg:px-3"
                  >
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-6">
            {policies.map(({ id, icon: Icon, label, title, intro, blocks }, i) => (
              <Reveal key={id} delay={i * 60}>
                <article id={id} className="card scroll-mt-28 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/15 text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="eyebrow">
                      {String(i + 1).padStart(2, "0")} · {label}
                    </p>
                  </div>
                  <h2 className="mt-4 text-2xl leading-tight font-bold sm:text-3xl">{title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{intro}</p>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {blocks.map((b) => (
                      <div key={b.title} className={b.items.length > 3 ? "md:col-span-2" : ""}>
                        <h3 className="font-display text-lg font-semibold">
                          <span className="text-gradient-cmyk">{b.title}</span>
                        </h3>
                        <ul className="mt-3 space-y-2.5 text-sm">
                          {b.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5 leading-relaxed text-muted">
                              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 className="text-xl font-bold">Ficou alguma dúvida?</h2>
                  <p className="mt-1 text-sm text-muted">
                    Chama no WhatsApp ou escreve para {site.email}.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <WhatsAppButton href={whatsappUrl("Olá! Tenho uma dúvida sobre as políticas.")} size="md">
                    Falar no WhatsApp
                  </WhatsAppButton>
                  <LinkButton href="/" variant="ghost" size="md">
                    Voltar ao site
                  </LinkButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
