import { z } from "zod";

export const BUSINESS_TYPES = [
  "Retail store",
  "Online shop",
  "Corporate / promotional",
  "Event planner",
  "Other",
] as const;

export const MONTHLY_VOLUMES = [
  "1–50 items",
  "51–200 items",
  "201–1,000 items",
  "1,000+ items",
] as const;

export const HEAR_ABOUT_US = [
  "Google / search",
  "Instagram",
  "Facebook",
  "TikTok",
  "Etsy or Amazon",
  "Referral / word of mouth",
  "Trade show",
  "Other",
] as const;

export const resellerApplicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  businessName: z.string().trim().min(2, "Please enter your business name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(40),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  businessType: z.enum(BUSINESS_TYPES, {
    message: "Select your business type.",
  }),
  monthlyVolume: z.enum(MONTHLY_VOLUMES, {
    message: "Select an estimated volume.",
  }),
  products: z
    .string()
    .trim()
    .min(2, "Which products are you interested in?")
    .max(400),
  about: z.string().trim().max(4000).optional().or(z.literal("")),
  hearAboutUs: z.enum(HEAR_ABOUT_US, {
    message: "Let us know how you found us.",
  }),
  hearAboutUsOther: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please agree so we can follow up with you.",
  }),
  // Honeypot — must stay empty. A bot that fills every field trips this.
  fax: z.string().optional(),
  // Anti-spam: ms the form was on screen before submit. The handler rejects
  // suspiciously fast submissions. Optional so a missing value never blocks a
  // real applicant.
  elapsedMs: z.number().nonnegative().optional(),
});

export type ResellerApplicationInput = z.infer<typeof resellerApplicationSchema>;

/* ------------------------------ quote (RFQ) ------------------------------- */

export const SHIP_MODELS = [
  "Blind drop-ship to my customers",
  "Bulk ship to me / my warehouse",
  "Not sure yet — advise me",
] as const;

/** Sales channels a reseller might list our products on. */
export const SALES_CHANNELS = [
  "Etsy",
  "Shopify",
  "Amazon",
  "eBay",
  "Own website",
  "In person / retail",
  "Other",
] as const;

/** A single line on a request-for-quote. */
export const quoteItemSchema = z.object({
  sku: z.string().trim().min(1).max(60),
  name: z.string().trim().min(1).max(200),
  quantity: z
    .number({ message: "Enter a quantity." })
    .int("Whole numbers only.")
    .min(1, "Quantity must be at least 1.")
    .max(100000, "That's a big order — email us directly."),
  note: z.string().trim().max(500).optional().or(z.literal("")),
});

/** Contact + brief fields collected by the on-page form (no line items). */
export const quoteFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name."),
  businessName: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  channels: z.array(z.enum(SALES_CHANNELS)).max(SALES_CHANNELS.length).optional(),
  monthlyVolume: z.enum(MONTHLY_VOLUMES).optional().or(z.literal("")),
  shipModel: z.enum(SHIP_MODELS, { message: "Choose a fulfillment model." }),
  deadline: z.string().trim().max(60).optional().or(z.literal("")),
  artworkUrl: z.string().trim().max(300).optional().or(z.literal("")),
  notes: z.string().trim().max(4000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please agree so we can send you a quote.",
  }),
  // Honeypot — must stay empty.
  company: z.string().optional(),
});

/** Full payload sent to the API: contact brief + the line items from the cart. */
export const quoteSchema = quoteFormSchema.extend({
  items: z
    .array(quoteItemSchema)
    .min(1, "Add at least one product to your quote.")
    .max(100, "That's a lot of lines — email us your list directly."),
});

export type QuoteItemInput = z.infer<typeof quoteItemSchema>;
export type QuoteFormInput = z.infer<typeof quoteFormSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
