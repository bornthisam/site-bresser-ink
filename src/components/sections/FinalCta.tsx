import { Clock, MapPin, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackground, blobPresets, gradients } from "@/components/ui/SectionBackground";
import { QuoteForm } from "./QuoteForm";

export function FinalCta() {
  const hours = site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ");

  return (
    <section id="contato" className="relative isolate overflow-hidden py-20 sm:py-28">
      <SectionBackground gradient={gradients.spotlight} blobs={blobPresets.hero} />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <h2 className="text-4xl leading-[1.02] font-extrabold sm:text-5xl">
              Manda a arte agora e <span className="text-gradient-cmyk">imprime hoje</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="measure mt-5 text-lg text-muted">
              Arte enviada até as {site.cutoff} imprime no mesmo dia. Orçamento na hora pelo WhatsApp, ou
              deixe seu contato que a gente chama você.
            </p>
            <p className="mt-2 font-mono text-[0.65rem] text-faint">
              *Dependendo do tamanho do arquivo e da fila de produção.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-7">
            <WhatsAppButton href={whatsappUrl("Olá! Quero imprimir DTF hoje.")}>
              Falar agora no WhatsApp
            </WhatsAppButton>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={site.phone.href} className="hover:text-ink">
                  {site.phone.label}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{hours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  {site.address}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <QuoteForm withDetails={false} className="p-5" />
        </Reveal>
      </div>
    </section>
  );
}
