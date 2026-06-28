/**
 * Shared catalog types. This module is intentionally free of any data import
 * so client components can import types/helpers without pulling the full
 * product dataset into the browser bundle.
 */

export type IconKey =
  | "gift"
  | "cup-soda"
  | "coffee"
  | "frame"
  | "notebook"
  | "award";

export type PersonalizationType = "text" | "select";

export interface PersonalizationOption {
  id: string;
  label: string;
  type: PersonalizationType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  maxLength?: number;
  options?: string[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  size: string | null;
  /** Internal wholesale reference price. Never rendered as a retail tag —
   *  B2B pricing is gated behind "Request pricing" / "Add to quote". */
  basePrice: number;
  image: string;
  imageFull: string;
  /** Ordered gallery of additional view URLs (primary first, BLANK variants
   *  last). Optional — undefined when no curated gallery has been bound for
   *  this SKU. The single `image` / `imageFull` fields above remain the
   *  primary references and stay populated regardless. */
  images?: string[];
  /** Item weight in pounds (from FOMA's master list — raw xlsx value
   *  divided by 1000). Used to render the "Weight" line on the product
   *  detail page and appended to the description text. Optional —
   *  undefined when the supplier hasn't shipped a weight yet. */
  weightLb?: number;
  /** Shipping/carton weight in pounds (per product type, from the supplier's
   *  Ürün Kargo bilgileri.xlsx). Distinct from `weightLb` (item weight from
   *  the FOMA master list) — buyers usually want both numbers when planning
   *  freight. */
  shippingWeightLb?: number;
  /** Product dimensions in inches, formatted as "L × W × H in". Per product
   *  type from the supplier shipping master. */
  dimensions?: string;
  /** Engraving area in mm — either a single dimension ("87.6 mm") or
   *  rectangular ("63 × 55 mm"). Only populated when the supplier ships a
   *  value. */
  engravingArea?: string;
  /** Bucket label that mapped this SKU to a shipping row. Useful for the
   *  spec-card label and for QA when reviewing the bucket join. */
  shippingType?: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  subcategorySlug: string;
  subcategoryName: string;
  description: string;
  longDescription: string;
  badges: string[];
  leadTimeDays: number;
  personalization: PersonalizationOption[];
}

export interface Subcategory {
  slug: string;
  name: string;
  blurb: string;
  productCount: number;
}

export interface Category {
  slug: string;
  name: string;
  blurb: string;
  icon: IconKey;
  subcategories: Subcategory[];
  productCount: number;
}

export interface SearchResult {
  id: string;
  name: string;
  categoryName: string;
  subcategoryName: string;
  categorySlug: string;
  subcategorySlug: string;
  basePrice: number;
  image: string;
}
