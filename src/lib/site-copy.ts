/**
 * Canonical customer-facing copy strings.
 *
 * Single source of truth for the printing / shipping turnaround promise so the
 * homepage, shipping page, reseller pages and confirmation emails never drift
 * out of sync again. If David wants to drop the cutoff entirely (a flat
 * "same-day printing & shipping"), edit ORDER_CUTOFF and the two promise
 * strings below — nothing else needs to change.
 */

/** The daily order-by time. The single place to change or remove the cutoff. */
export const ORDER_CUTOFF = "2pm ET";

/** Full printing promise — used in body copy and value props. */
export const PRINTING_PROMISE = `Same-day printing on orders placed before ${ORDER_CUTOFF}`;

/** Full shipping promise — used in body copy and value props. */
export const SHIPPING_PROMISE = `Same-day shipping on orders placed before ${ORDER_CUTOFF}`;

/** Compact version for hero eyebrows, chips and badges. */
export const TURNAROUND_SHORT = "Same-day printing & shipping";

/** Canonical dispatch-vs-transit line. Single source for the standardized
 *  shipping wording used on the Shipping page and product pages so the
 *  production/dispatch promise and the delivery window never contradict. */
export const DISPATCH_NOTE = `Same-day dispatch on orders before ${ORDER_CUTOFF} — transit time additional`;
