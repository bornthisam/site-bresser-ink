"use client";

import { Calculator as CalcIcon, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import { estimate } from "@/lib/calculator";
import { brl, products, whatsappUrl } from "@/lib/site";
import { WhatsAppButton } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { blobPresets, gradients } from "@/components/ui/SectionBackground";

const presets = [
  { label: "Logo de peito", w: 10, h: 10 },
  { label: "Estampa frontal", w: 25, h: 30 },
  { label: "Costas inteiras", w: 30, h: 40 },
  { label: "Logo de copo", w: 7, h: 7 },
];

export function Calculator() {
  const [productId, setProductId] = useState(products[0].id);
  const [w, setW] = useState("25");
  const [h, setH] = useState("30");
  const [qty, setQty] = useState("20");

  const product = products.find((p) => p.id === productId)!;
  const result = useMemo(
    () => estimate(product, Number(w), Number(h), Math.floor(Number(qty))),
    [product, w, h, qty],
  );

  const message = result.ok
    ? [
        `Olá! Fiz a simulação no site:`,
        `DTF ${product.name} · arte ${w}×${h} cm · ${qty} peças`,
        `Melhor opção: ${result.best.label} (${result.best.detail}) = ${brl(result.best.total)}`,
      ].join("\n")
    : `Olá! Quero um orçamento de DTF ${product.name}.`;

  return (
    <Section
      id="calculadora"
      gradient={gradients.spotlight}
      blobs={blobPresets.hero}
      heading={{
        eyebrow: "Calculadora de metragem",
        title: "Descubra quanto vai custar antes de pedir",
        lead: "Informe o tamanho da estampa e quantas peças vai fazer. A calculadora encaixa as artes no filme, compara folha e metro e já monta a mensagem do seu orçamento.",
      }}
    >
      <Reveal delay={120} className="mt-10">
        <div className="card overflow-hidden lg:grid lg:grid-cols-[1.1fr_1fr]">
          {/* Entradas */}
          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-accent">
                <CalcIcon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-bold">Calculadora de metragem</h3>
            </div>
            <p className="mt-2 text-sm text-muted">
              Diga o tamanho da arte e quantas peças você vai fazer. A gente encaixa no filme e mostra o
              formato mais barato.
            </p>

            <div className="mt-5 flex gap-2" role="tablist" aria-label="Tipo de DTF">
              {products.map((p) => {
                const active = p.id === productId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setProductId(p.id)}
                    className={`rounded-pill border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-transparent bg-gradient-cmyk text-on-brand [text-shadow:0_1px_2px_#0006]"
                        : "border-line bg-surface text-muted hover:text-ink"
                    }`}
                  >
                    DTF {p.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setW(String(p.w));
                    setH(String(p.h));
                  }}
                  className="rounded-pill border border-line bg-surface px-3 py-1 font-mono text-[0.68rem] text-muted transition hover:border-line-2 hover:text-ink"
                >
                  {p.label} · {p.w}×{p.h}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <FormField label="Largura (cm)">
                <input type="number" inputMode="decimal" min={1} className="field" value={w} onChange={(e) => setW(e.target.value)} />
              </FormField>
              <FormField label="Altura (cm)">
                <input type="number" inputMode="decimal" min={1} className="field" value={h} onChange={(e) => setH(e.target.value)} />
              </FormField>
              <FormField label="Peças">
                <input type="number" inputMode="numeric" min={1} className="field" value={qty} onChange={(e) => setQty(e.target.value)} />
              </FormField>
            </div>
            <p className="mt-2 font-mono text-[0.68rem] text-faint">
              Largura máxima do filme: {product.filmWidth} cm. Espaço de 1 cm entre artes.
            </p>
          </div>

          {/* Resultado */}
          <div className="border-t border-line bg-bg2/60 p-5 sm:p-7 lg:border-t-0 lg:border-l" aria-live="polite">
            {result.ok ? (
              <>
                <p className="eyebrow mb-3 flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5" /> Melhor opção
                </p>
                <p className="font-display text-2xl leading-tight font-bold">
                  {result.best.label}
                  <span className="block text-base font-medium text-muted">{result.best.detail}</span>
                </p>
                <p className="mt-3 font-display text-3xl font-bold">
                  <span className="text-gradient-cmyk">{brl(result.best.total)}</span>
                  <span className="ml-2 text-sm font-medium text-muted">≈ {brl(result.perPiece)} por peça</span>
                </p>
                {result.alternatives.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {result.alternatives.map((o) => (
                      <li key={o.label} className="flex items-center justify-between gap-3 text-muted">
                        <span>
                          {o.label} · {o.detail}
                        </span>
                        <span className="font-mono text-xs">{brl(o.total)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-muted">{result.reason}</p>
            )}

            <WhatsAppButton href={whatsappUrl(message)} className="mt-5 w-full">
              Pedir esse orçamento
            </WhatsAppButton>
            <p className="mt-3 font-mono text-[0.65rem] text-faint">
              Estimativa. A gente confere o encaixe real quando receber a arte.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
