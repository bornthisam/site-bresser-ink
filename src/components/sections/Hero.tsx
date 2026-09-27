import { Check, Clock, Ruler, Sparkles } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import { LinkButton, WhatsAppButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { SectionBackground, blobPresets, gradients } from "@/components/ui/SectionBackground";
import { QuoteForm } from "./QuoteForm";

const chips = [
  { icon: Clock, label: "Pronto até 24h" },
  { icon: Ruler, label: "Filme de 58 cm" },
  { icon: Sparkles, label: "Sem pedido mínimo" },
];

const benefits = [
  "Orçamento na hora, sem formulário longo",
  "A gente confere sua arte antes de imprimir",
  "Retirada na zona leste ou envio para todo o Brasil",
  "Atendimento com quem está na máquina",
];

export function Hero() {
  return (
    <section className="sempre-escuro relative isolate overflow-hidden">
      <SectionBackground gradient={gradients.spotlight} blobs={blobPresets.hero} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 md:block"
        style={{ background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)" }}
      />

      <div className="shell relative grid items-start gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pt-16 lg:pb-20">
        <div>
          <Eyebrow>Impressão DTF em São Paulo · Têxtil e UV</Eyebrow>
          <h1 className="text-[2.6rem] leading-[0.98] font-extrabold sm:text-5xl lg:text-6xl">
            Impressão DTF por metro, <span className="text-gradient-cmyk">pronta no mesmo dia</span>
          </h1>
          <p className="measure mt-5 text-lg leading-relaxed text-muted sm:text-xl">
            Produção rápida para o seu negócio não parar. DTF Têxtil para camiseta, moletom e
            boné; DTF UV para copo, garrafa e acrílico. Você vende, a gente imprime.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {chips.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-pill border border-line bg-surface/70 px-3.5 py-2 text-sm text-ink backdrop-blur"
              >
                <Icon className="h-4 w-4 text-accent" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton href={whatsappUrl("Olá! Quero um orçamento de impressão DTF.")}>
              Pedir orçamento no WhatsApp
            </WhatsAppButton>
            <LinkButton href="#precos" variant="ghost">
              Ver tabela de preços
            </LinkButton>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pt-2">
          <QuoteForm id="orcamento" />
        </div>
      </div>
    </section>
  );
}
