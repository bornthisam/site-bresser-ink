import { Printer, Shirt, Smile, Upload } from "lucide-react";
import { steps, whatsappUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { blobPresets, gradients } from "@/components/ui/SectionBackground";

const flow = [
  { icon: Upload, label: "Envia a arte" },
  { icon: Printer, label: "Imprime" },
  { icon: Shirt, label: "Aplica" },
  { icon: Smile, label: "Cliente feliz" },
];

/** Faixa ilustrada com os quatro passos (no original é uma animação em canvas). */
function FlowStrip() {
  return (
    <div
      role="img"
      aria-label="Os quatro passos: enviar a arte, imprimir, aplicar e cliente satisfeito"
      className="relative flex w-full items-center justify-between overflow-hidden rounded-[18px] bg-surface-2 px-6 sm:px-12"
      style={{ aspectRatio: "2.727" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-12 top-1/2 h-0.5 -translate-y-1/2 sm:inset-x-24"
        style={{
          background:
            "linear-gradient(90deg, var(--color-cyan), var(--color-magenta), var(--color-yellow), var(--color-brand))",
        }}
      />
      {flow.map(({ icon: Icon, label }, i) => (
        <div key={label} className="relative flex flex-col items-center gap-3">
          <span
            className="inline-flex h-14 w-14 animate-float-slow items-center justify-center rounded-2xl border border-line-2 bg-surface text-accent shadow-[var(--shadow-card)] sm:h-20 sm:w-20"
            style={{ animationDelay: `${-i * 4}s` }}
          >
            <Icon className="h-6 w-6 sm:h-9 sm:w-9" />
          </span>
          <span className="hidden font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase sm:block">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function HowItWorks() {
  return (
    <Section
      id="como-funciona"
      gradient={gradients.cool}
      blobs={blobPresets.steps}
      heading={{
        eyebrow: "Como funciona",
        title: "Quatro passos e a estampa está na peça",
        lead: "Você não precisa ter impressora DTF. Manda a arte, a gente produz e você só aplica.",
      }}
    >
      <Reveal delay={100} className="mt-10">
        <div className="card overflow-hidden p-2 sm:p-4">
          <FlowStrip />
        </div>
      </Reveal>

      <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 80} className="card p-6">
            <p className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={200} className="mt-10 text-center">
        <WhatsAppButton href={whatsappUrl("Olá! Quero mandar minha arte para impressão.")}>
          Mandar minha arte agora
        </WhatsAppButton>
      </Reveal>
    </Section>
  );
}
