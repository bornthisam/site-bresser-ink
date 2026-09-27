import type { Product } from "./site";

export const GAP_CM = 1;

/** Quantas artes (w×h) cabem numa área (areaW×areaH), testando as duas orientações. */
export function fitCount(w: number, h: number, areaW: number, areaH: number) {
  const fit = (aw: number, ah: number) =>
    Math.floor((areaW + GAP_CM) / (aw + GAP_CM)) * Math.floor((areaH + GAP_CM) / (ah + GAP_CM));
  return Math.max(fit(w, h), fit(h, w));
}

export type Option = {
  label: string;
  detail: string;
  total: number;
  kind: "metro" | "folha";
};

export type Estimate =
  | { ok: false; reason: string }
  | { ok: true; best: Option; alternatives: Option[]; perPiece: number };

export function estimate(product: Product, w: number, h: number, pieces: number): Estimate {
  if (!(w > 0 && h > 0 && pieces > 0)) {
    return { ok: false, reason: "Preencha largura, altura e quantidade." };
  }
  if (Math.min(w, h) > product.filmWidth) {
    return {
      ok: false,
      reason: `A arte passa da largura máxima do filme (${product.filmWidth} cm).`,
    };
  }

  const options: Option[] = [];

  const perMeter = fitCount(w, h, product.filmWidth, 100);
  if (perMeter > 0) {
    const meters = Math.ceil(pieces / perMeter);
    const tier =
      product.tiers.find((t) => meters <= t.max) ?? product.tiers[product.tiers.length - 1];
    options.push({
      kind: "metro",
      label: `DTF ${product.name} por metro`,
      detail: `${meters} ${meters === 1 ? "metro" : "metros"} · ${perMeter} artes por metro`,
      total: meters * tier.price,
    });
  }

  for (const sheet of product.sheets) {
    const perSheet = fitCount(w, h, sheet.w, sheet.h);
    if (perSheet === 0) continue;
    const count = Math.ceil(pieces / perSheet);
    options.push({
      kind: "folha",
      label: `DTF ${product.name} ${sheet.name}`,
      detail: `${count} ${count === 1 ? "folha" : "folhas"}`,
      total: count * sheet.price,
    });
  }

  if (options.length === 0) {
    return { ok: false, reason: "Essa arte não cabe em nenhum formato disponível." };
  }

  options.sort((a, b) => a.total - b.total);
  const [best, ...alternatives] = options;
  return { ok: true, best, alternatives, perPiece: best.total / pieces };
}
