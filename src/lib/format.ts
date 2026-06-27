/** Pure formatting helpers — safe to import from client components. */

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/**
 * Render a weight (pounds) as a human-friendly string.
 *   - 0.5 lb     → "0.5 lb"
 *   - 1 lb       → "1 lb"
 *   - 12.34 lb   → "12.3 lb"
 *
 * The supplier sheet ships weights as pounds (after dividing the
 * raw xlsx value by 1000). US B2B buyers default to imperial, so
 * lb is the primary unit shown on the detail page and in the
 * appended description sentence.
 */
export function formatWeight(lb: number): string {
  if (!Number.isFinite(lb) || lb <= 0) return "—";
  // Pound precision: 2 decimals under 1 lb (the 0.16 vs 0.2 delta on a
  // 1000-unit pallet is a real freight number for wholesale buyers),
  // 1 decimal between 1 and 10, whole pounds above that.
  const lbPlaces = lb < 1 ? 2 : lb < 10 ? 1 : 0;
  // Ounce precision: 1 decimal under 10 oz, whole ounces above.
  const oz = lb * 16;
  const ozPlaces = oz < 10 ? 1 : 0;
  return `${lb.toFixed(lbPlaces)} lb (${oz.toFixed(ozPlaces)} oz)`;
}

/**
 * Rewrites a supplier Cloudinary URL's transformation segment so we can request
 * the exact size/quality we need. Source URLs look like:
 *   https://res.cloudinary.com/business-products/image/upload/<transform>/v123/products/images/large/SKU--hash.png
 */
export function cloudinary(
  url: string,
  { width = 600, pad = true }: { width?: number; pad?: number | boolean } = {},
): string {
  const t = [
    "f_auto",
    "q_auto",
    `w_${width}`,
    `h_${width}`,
    "c_pad",
    "b_transparent",
  ];
  if (!pad) {
    t.splice(4, 2, "c_fit");
  }
  return url.replace(/\/upload\/[^/]+\//, `/upload/${t.join(",")}/`);
}
