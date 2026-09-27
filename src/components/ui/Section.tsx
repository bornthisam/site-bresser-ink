import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SectionBackground, type Blob } from "./SectionBackground";

export function Eyebrow({ children, className = "mb-4" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl leading-[1.05] font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      {lead && (
        <p className={`measure mt-5 text-lg leading-relaxed text-muted ${center ? "mx-auto" : ""}`}>
          {lead}
        </p>
      )}
    </div>
  );
}

/** Seção padrão: fundo decorativo + container + cabeçalho opcional com reveal. */
export function Section({
  id,
  gradient,
  blobs,
  heading,
  children,
  className = "",
}: {
  id?: string;
  gradient?: string;
  blobs?: Blob[];
  heading?: Parameters<typeof SectionHeading>[0];
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative isolate py-20 sm:py-28 ${className}`}>
      <SectionBackground gradient={gradient} blobs={blobs} />
      <div className="shell relative">
        {heading && (
          <Reveal>
            <SectionHeading {...heading} />
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
