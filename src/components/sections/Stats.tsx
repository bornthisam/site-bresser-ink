import { site, stats } from "@/lib/site";
import { SectionBackground, blobPresets, gradients } from "@/components/ui/SectionBackground";

export function Stats() {
  return (
    <section
      aria-label="Números da DTF Turbo"
      className="relative isolate z-10 overflow-hidden rounded-t-[2rem] border-b border-line md:-mt-[12vh] md:pt-[12vh] sm:rounded-t-[3rem]"
    >
      <SectionBackground gradient={gradients.soft} blobs={blobPresets.corners} grid={false} />
      <div className="shell relative grid grid-cols-2 gap-6 py-8 sm:py-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl leading-none font-extrabold text-ink sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="shell relative pb-8">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-faint uppercase">
          {site.company} · CNPJ {site.cnpj} · Empresa com endereço fixo em São Paulo
        </p>
      </div>
    </section>
  );
}
