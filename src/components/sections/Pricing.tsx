import {
  brl,
  products,
  tierStyles,
  whatsappUrl,
  type DtfProduct,
  type PatchProduct,
} from "@/lib/site";
import { DtfWord } from "@/components/ui/Brand";
import { LinkButton, WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { blobPresets, gradients } from "@/components/ui/SectionBackground";

const fmtM = (n: number) => String(n).replace(".", ",");

function DtfPriceCard({ product }: { product: DtfProduct }) {
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
        <li className="flex items-center justify-between gap-4 rounded-2xl bg-surface-2 px-5 py-3.5">
          <span>
            <span className="block font-display text-lg leading-tight font-bold">0,5 metro</span>
            <span className="font-mono text-[0.65rem] tracking-[0.12em] text-faint uppercase">
              {product.filmWidth} × 50 cm · preço fechado
            </span>
          </span>
          <span className="font-display text-xl font-extrabold">{brl(product.halfMeterPrice)}</span>
        </li>
        {product.meterTiers.map((t, i, all) => {
          const next = all[i + 1];
          return (
            <li
              key={t.from}
              className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 ${tierStyles[i % tierStyles.length]}`}
            >
              <span>
                <span className="block font-display text-lg leading-tight font-bold uppercase">
                  {t.from === 1 ? "1 metro" : `+${t.from} metros`}
                </span>
                <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-80">
                  {next ? `De ${t.from} a ${fmtM(next.from - 0.5)} m` : `A partir de ${t.from} m`}
                </span>
              </span>
              <span className="font-display text-xl font-extrabold whitespace-nowrap">
                {brl(t.price)}
                <span className="text-xs font-medium opacity-80"> /m</span>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="border-t border-line px-6 py-4 text-center font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
        Seu DTF {product.name} pronto em até 24h
      </div>
    </div>
  );
}

function PatchPriceCard({ product }: { product: PatchProduct }) {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-end justify-between gap-4 px-6 pt-6">
        <div>
          <Eyebrow className="mb-1">Emborrachado</Eyebrow>
          <h3 className="font-display text-3xl leading-none font-extrabold">{product.name}</h3>
        </div>
        <p className="text-right font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
          Pedido mín. {product.minQty} un.
        </p>
      </div>

      <ul className="mt-5 space-y-2 px-4 pb-4">
        {product.tiers.map((t, i) => (
          <li
            key={t.min}
            className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 ${tierStyles[i % tierStyles.length]}`}
          >
            <span>
              <span className="block font-display text-lg leading-tight font-bold uppercase">
                De {t.min} a {t.max} un.
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase opacity-80">
                Patch de {product.refSize} × {product.refSize} cm
              </span>
            </span>
            <span className="font-display text-xl font-extrabold whitespace-nowrap">
              {brl(t.price)}
              <span className="text-xs font-medium opacity-80"> /un.</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="px-6 pb-4 font-mono text-[0.65rem] text-faint">
        Tamanhos maiores (até {product.maxSize} × {product.maxSize} cm) são calculados pela área.
      </p>

      <div className="border-t border-line px-6 py-4 text-center font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
        Seu patch com a sua logo em alto relevo
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
        lead: "Meio metro para testar, metro linear para produção. Quanto mais metros no mesmo pedido, menor o preço do metro. Patch 3D TPU por unidade.",
      }}
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={i * 120}>
            {p.kind === "patch" ? <PatchPriceCard product={p} /> : <DtfPriceCard product={p} />}
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-10 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <WhatsAppButton href={whatsappUrl("Olá! Quero fechar um pedido.")}>
            Fechar pedido no WhatsApp
          </WhatsAppButton>
          <LinkButton href="#calculadora" variant="ghost">
            Calcular meu orçamento
          </LinkButton>
        </div>
        <p className="mt-4 font-mono text-[0.68rem] text-faint">
          Acima de 1000 patches o preço é negociado. Chama que a gente faz um valor especial.
        </p>
      </Reveal>
    </Section>
  );
}
