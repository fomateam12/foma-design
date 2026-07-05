import printifyPricesRaw from "@/data/printify-prices.json";

/**
 * Authoritative wholesale prices from the operator's Printify price list
 * (FomaPrint-Product-List xlsx): per-SKU blank price plus flat engraving
 * fees. SKUs absent from that list are quoted individually — the scraped
 * feed's price field is NOT a real price and is never shown on the
 * partner catalog.
 */
export interface PartnerPrice {
  blank: number;
  front: number;
  back: number;
  other: number;
  total: number;
}

const partnerPrices = new Map<string, PartnerPrice>(
  Object.entries(printifyPricesRaw as Record<string, PartnerPrice>),
);

export function partnerPriceFor(sku: string): PartnerPrice | undefined {
  return partnerPrices.get(sku.toUpperCase());
}

export function pricedSkuCount(): number {
  return partnerPrices.size;
}

/** Flat decoration fees, in USD — mirror the xlsx so copy stays in sync. */
export const ENGRAVING_FEES = { front: 4, back: 2, handling: 1 } as const;

/** SKUs the operator pulled from the partner catalog only (2026-07-05):
 *  the Brushed Silver / White 30 oz tumbler color cards stay on the
 *  storefront but are not offered to partners. */
const PARTNER_EXCLUDED_SKUS = new Set(["STM631", "STM632"]);

/** Partner-catalog visibility filter. Sublimation blanks and the excluded
 *  SKUs above are hidden from the partner catalog, PDF and downloadable
 *  price list (operator decisions, 2026-07-05) while remaining live on the
 *  storefront. */
export function inPartnerCatalog(p: { name: string; sku: string }): boolean {
  return (
    !/sublimat/i.test(p.name) && !PARTNER_EXCLUDED_SKUS.has(p.sku.toUpperCase())
  );
}
