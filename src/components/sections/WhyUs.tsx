import { Clock, Headset, Layers, MapPin, Palette, Ruler } from "lucide-react";
import { deliveryOptions, features, site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const icons = {
  clock: Clock,
  ruler: Ruler,
  layers: Layers,
  palette: Palette,
  headset: Headset,
  map: MapPin,
};

export function WhyUs() {
  return (
    <Section
      heading={{
        eyebrow: `Por que a ${site.name}`,
        title: "Feito para quem vende personalização",
        lead: "Estamparias, confecções, lojas de brindes, marcas e empreendedores que precisam de prazo curto e preço certo.",
      }}
    >
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = icons[f.icon];
          return (
            <Reveal as="li" key={f.title} delay={i * 60} className="card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/15 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </Reveal>
          );
        })}
      </ul>

      <Reveal delay={120} className="mt-10">
        <div className="card grid gap-5 p-6 sm:grid-cols-3 sm:p-7">
          {deliveryOptions.map((d) => (
            <div key={d.title}>
              <p className="font-display font-semibold">
                {d.title}
                <span className="ml-2 font-mono text-[0.68rem] font-normal text-accent">{d.tag}</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.text}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
