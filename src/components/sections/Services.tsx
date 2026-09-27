import { CircleCheck } from "lucide-react";
import { services, whatsappUrl } from "@/lib/site";
import { DtfWord } from "@/components/ui/Brand";
import { WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Services() {
  return (
    <Section
      id="servicos"
      heading={{
        eyebrow: "O que fazemos",
        title: (
          <>
            Dois serviços, <span className="text-gradient-cmyk">um fornecedor só</span>
          </>
        ),
        lead: "Se o seu cliente pede camiseta e copo no mesmo pedido, dá para resolver tudo aqui.",
      }}
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 100}>
            <article className="card flex h-full flex-col p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-extrabold">
                  <DtfWord /> <span className="text-ink">{s.name}</span>
                </h3>
                <span className="font-mono text-[0.68rem] tracking-[0.12em] text-faint uppercase">
                  {s.width}
                </span>
              </div>
              <p className="mt-1 font-display text-lg font-semibold">
                <span className="text-gradient-cmyk">{s.tagline}</span>
              </p>
              <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-muted">
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <WhatsAppButton
                  href={whatsappUrl(`Olá! Quero um orçamento de DTF ${s.name}.`)}
                  size="md"
                  className="w-full sm:w-auto"
                >
                  Orçar DTF {s.name}
                </WhatsAppButton>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
