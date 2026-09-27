import { brl, products, tierStyles, whatsappUrl, type Product } from "@/lib/site";
import { DtfWord } from "@/components/ui/Brand";
import { LinkButton, WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { blobPresets, gradients } from "@/components/ui/SectionBackground";

const fmtCm = (n: number) => String(n).replace(".", ",");

function PriceCard({ product }: { product: Product }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-end justify-between gap-4 px-6 pt-6">
        <div>
          <Eyebrow className="mb-1">Impressão</Eyebrow>
          <h3 className="font-display text-3xl leading-none font-extrabold">
            <DtfWord suffix={product.name} />
          </h3>
        </div>
        <p className="text-right font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
          {product.filmWidth} cm de largura máx.
        </p>
      </div>

      <ul className="mt-5 space-y-2 px-4 pb-4">
        {product.sheets.map((s) => (
          <li
            key={s.name}
            className="flex items-center justify-between gap-4 rounded-2xl bg-surface-2 px-5 py-3.5"
          >
            <span>
              <span className="block font-display text-lg leading-tight font-bold">{s.name}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.12em] text-faint uppercase">
                {fmtCm(s.w)} × {fmtCm(s.h)} cm
              </span>
            </span>
            <span className="font-display text-xl font-extrabold">{brl(s.price)}</span>
          </li>
        ))}
        {product.tiers.map((t, i) => (
          <li
            key={t.min}
            className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 ${tierStyles[i % tierStyles.length]}`}
          >
            <span>
              <span className="block font-display text-lg leading-tight font-bold uppercase">
                De {t.min} a {t.max} metros
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-80">
                {product.filmWidth} cm de largura máxima
              </span>
            </span>
            <span className="font-display text-xl font-extrabold whitespace-nowrap">
              {brl(t.price)}
              <span className="text-xs font-medium opacity-80"> /m</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-line px-6 py-4 text-center font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
        Seu DTF {product.name} pronto em até 24h
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <Section
      id="precos"
      gradient={gradients.warm}
      blobs={blobPresets.pricing}
      heading={{
        eyebrow: "Tabela de preços",
        title: (
          <>
            Preço na mesa, <span className="text-gradient-cmyk">sem enrolação</span>
          </>
        ),
        lead: "Folha para pedido pequeno, metro linear para produção. Quanto mais metros no mesmo pedido, menor o preço do metro.",
      }}
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            <PriceCard product={p} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-10 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsAppButton href={whatsappUrl("Olá! Quero fechar um pedido de DTF.")}>
            Fechar pedido no WhatsApp
          </WhatsAppButton>
          <LinkButton href="#calculadora" variant="ghost">
            Calcular minha metragem
          </LinkButton>
        </div>
        <p className="mt-4 font-mono text-[0.68rem] text-faint">
          Acima de 50 metros o preço é negociado. Chama que a gente faz um valor especial.
        </p>
      </Reveal>
    </Section>
  );
}
