import type { CSSProperties } from "react";

// Fundo decorativo das seções: gradiente + blobs flutuantes + grade + ruído.

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const MASK = "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)";

export const gradients = {
  spotlight:
    "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-brand) 28%, var(--bg)) 0%, var(--bg) 70%)",
  soft: "linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)",
  warm: "linear-gradient(180deg, color-mix(in oklab, var(--bg) 92%, var(--color-brand)) 0%, var(--bg) 60%, var(--bg2) 100%)",
  cool: "linear-gradient(180deg, color-mix(in oklab, var(--bg) 93%, var(--color-brand-2)) 0%, var(--bg2) 100%)",
};

export type Blob = {
  color: "a" | "b" | "c";
  delay?: number;
  style: CSSProperties;
};

export const blobPresets: Record<string, Blob[]> = {
  hero: [
    { color: "a", style: { top: "-20%", left: "20%", width: "60%", height: "70%" } },
    { color: "b", delay: -8, style: { bottom: "-30%", right: "-10%", width: "40%", height: "60%" } },
    { color: "c", delay: -4, style: { top: "30%", left: "-15%", width: "35%", height: "45%" } },
  ],
  corners: [
    { color: "b", style: { top: "-15%", left: "-10%", width: "40%", height: "50%", opacity: 0.6 } },
    { color: "a", delay: -8, style: { bottom: "-20%", right: "-12%", width: "40%", height: "55%", opacity: 0.5 } },
  ],
  pricing: [
    { color: "a", style: { top: "-12%", left: "-8%", width: "44%", height: "60%" } },
    { color: "c", delay: -8, style: { bottom: "-20%", right: "-6%", width: "38%", height: "55%" } },
  ],
  steps: [
    { color: "b", style: { top: "-10%", right: "-8%", width: "42%", height: "58%" } },
    { color: "a", delay: -8, style: { bottom: "-25%", left: "-10%", width: "36%", height: "50%" } },
  ],
};

export function SectionBackground({
  gradient = gradients.soft,
  blobs = blobPresets.corners,
  grid = true,
}: {
  gradient?: string;
  blobs?: Blob[];
  grid?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: gradient }}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute animate-float-slow rounded-full blur-3xl"
          style={{
            background: `var(--blob-${b.color})`,
            animationDelay: b.delay ? `${b.delay}s` : undefined,
            ...b.style,
          }}
        />
      ))}
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        />
      )}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{ backgroundImage: NOISE, opacity: "var(--noise-opacity)" }}
      />
    </div>
  );
}
