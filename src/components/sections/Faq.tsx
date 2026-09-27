import { faqs, whatsappUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Faq() {
  return (
    <Section id="duvidas">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading
            center={false}
            eyebrow="Dúvidas frequentes"
            title="O que perguntam antes do primeiro pedido"
            lead="Não achou a sua? Chama no WhatsApp que a gente responde rápido."
          />
          <div className="mt-6">
            <WhatsAppButton href={whatsappUrl("Olá! Tenho uma dúvida sobre DTF.")}>
              Tirar uma dúvida
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="card group px-5 py-4 open:border-line-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-faint transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
