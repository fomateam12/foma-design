/**
 * Central brand + contact configuration for FomaPrint.
 * Keep all public brand strings here so pages, emails and metadata stay in sync.
 */
export const site = {
  name: "FomaPrint",
  legalName: "FOMA FAMILY LLC",
  /** Year the parent company was founded — used in trust copy and the footer. */
  foundedYear: 2021,
  /** Short display form (city, state) — see `address` for the full street address. */
  location: "Alpharetta, GA",
  /** Physical business address — used in structured data and business-detail UI. */
  address: {
    street: "9370 Industrial Trce",
    city: "Alpharetta",
    state: "GA",
    country: "US",
  },
  tagline: "Print-on-demand & laser engraving for resellers",
  description:
    "FomaPrint is a U.S. print-on-demand and laser-engraving partner for online resellers. You sell — we personalize, produce and blind-ship drinkware, gifts and décor under your brand. Made to order in the USA by FOMA FAMILY LLC.",
  /** One-line positioning used in heroes and OG copy. */
  positioning: "You sell it. We engrave, make and ship it — under your brand.",
  madeIn: "Made to order in the USA",
  /** Public contact mailbox on the fomaprint.com domain. Single source — used
   *  in the footer, contact page, forms and email backend (Resend `to`). */
  email: "info@fomaprint.com",
  phoneDisplay: "(404) 934-8917",
  phoneHref: "tel:+14049348917",
  /** WhatsApp business line — same number, click-to-chat. */
  whatsappDisplay: "(404) 934-8917",
  whatsappHref: "https://wa.me/14049348917",
  /** Public site URL. Overridden in production via NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fomaprint.com",
  /**
   * Social profiles. Only verified, live channels should be listed here so the
   * footer never renders a dead link.
   */
  social: [
    { label: "Facebook", href: "https://www.facebook.com/fomafamily/" },
    { label: "Instagram", href: "https://www.instagram.com/foma.family/" },
  ] as { label: string; href: string }[],
} as const;

export const legalLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Request a quote", href: "/quote" },
  { label: "Apply to sell", href: "/sell" },
] as const;
