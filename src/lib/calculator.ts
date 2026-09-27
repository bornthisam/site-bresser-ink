import { brl, type DtfProduct, type PatchProduct, type Product } from "./site";

export const GAP_CM = 1;

/** Comprimento de filme (cm) para `pieces` artes w×h numa largura `filmWidth`, na melhor orientação. */
export function filmLengthCm(w: number, h: number, filmWidth: number, pieces: number) {
  let best = Infinity;
  for (const [aw, ah] of [
    [w, h],
    [h, w],
  ]) {
    const perRow = Math.floor((filmWidth + GAP_CM) / (aw + GAP_CM));
    if (perRow === 0) continue;
    const rows = Math.ceil(pieces / perRow);
    best = Math.min(best, rows * (ah + GAP_CM) - GAP_CM);
  }
  return best;
}

/** Preço de `meters` metros de DTF: meio metro tem preço fechado; acima disso, metros × preço da faixa. */
export function dtfPrice(product: DtfProduct, meters: number) {
  if (meters <= 0.5) return { total: product.halfMeterPrice, perMeter: null };
  const tier = product.meterTiers.findLast((t) => meters >= t.from) ?? product.meterTiers[0];
  return { total: meters * tier.price, perMeter: tier.price };
}

const fmtMeters = (m: number) =>
  m === 0.5 ? "Meio metro" : m === 1 ? "1 metro" : `${String(m).replace(".", ",")} metros`;

export type Option = {
  label: string;
  detail: string;
  total: number;
  kind: "metro" | "unidade";
};

export type Estimate =
  | { ok: false; reason: string }
  | { ok: true; best: Option; alternatives: Option[]; perPiece: number };

export function estimate(product: Product, w: number, h: number, pieces: number): Estimate {
  if (!(w > 0 && h > 0 && pieces > 0)) {
    return { ok: false, reason: "Preencha largura, altura e quantidade." };
  }
  return product.kind === "patch"
    ? estimatePatch(product, w, h, pieces)
    : estimateDtf(product, w, h, pieces);
}

/**
 * Patch 3D TPU: preço por unidade conforme a faixa de quantidade (tiers em site.ts),
 * proporcional à área. Patches até o tamanho de referência pagam o preço cheio da faixa.
 */
function estimatePatch(product: PatchProduct, w: number, h: number, pieces: number): Estimate {
  if (Math.max(w, h) > product.maxSize) {
    return {
      ok: false,
      reason: `O patch pode ter no máximo ${product.maxSize} × ${product.maxSize} cm.`,
    };
  }
  if (pieces < product.minQty) {
    return { ok: false, reason: `O pedido mínimo de ${product.name} é de ${product.minQty} unidades.` };
  }

  const tier =
    product.tiers.find((t) => pieces <= t.max) ?? product.tiers[product.tiers.length - 1];
  const sizeFactor = Math.max(1, (w * h) / (product.refSize * product.refSize));
  const unitPrice = tier.price * sizeFactor;

  const best: Option = {
    kind: "unidade",
    label: `${product.name} ${w}×${h} cm`,
    detail: `${pieces} unidades · ${brl(unitPrice)} cada`,
    total: pieces * unitPrice,
  };
  return { ok: true, best, alternatives: [], perPiece: unitPrice };
}

function estimateDtf(product: DtfProduct, w: number, h: number, pieces: number): Estimate {
  if (Math.min(w, h) > product.filmWidth) {
    return {
      ok: false,
      reason: `A arte passa da largura máxima do filme (${product.filmWidth} cm).`,
    };
  }

  // Comprimento necessário, arredondado para cima em múltiplos de 0,5 m.
  const meters = Math.max(0.5, Math.ceil(filmLengthCm(w, h, product.filmWidth, pieces) / 50) / 2);

  const option = (m: number, prefix = ""): Option => {
    const { total, perMeter } = dtfPrice(product, m);
    return {
      kind: "metro",
      label: `${prefix}${fmtMeters(m)} de DTF ${product.name}`,
      detail: perMeter ? `${brl(perMeter)} por metro` : "preço fechado",
      total,
    };
  };

  // Às vezes subir para a próxima faixa sai mais barato (ex.: 9,5 m × R$ 65 > 10 m × R$ 60).
  const options = [
    option(meters),
    ...product.meterTiers
      .filter((t) => t.from > meters)
      .map((t) => option(t.from, "Levando "))
      .filter((o) => o.total < option(meters).total),
  ];

  options.sort((a, b) => a.total - b.total);
  const [best, ...alternatives] = options;
  return { ok: true, best, alternatives, perPiece: best.total / pieces };
}
