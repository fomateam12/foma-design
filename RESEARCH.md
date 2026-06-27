# FomaPrint — B2B Unification & Production Polish — RESEARCH

What the codebase actually is, and the findings that shaped the redesign. Captured so the next
session doesn't have to re-derive it.

## Stack (as found)

- **Next.js 16.2.9** — App Router, TypeScript, `src/`, Turbopack. React 19.2.4.
- **Tailwind CSS v4** — CSS-first config via `@theme` in `src/index`-style globals (no JS config
  for tokens). Accent/surface colors are CSS custom properties (oklch + hex).
- **shadcn/ui on `@base-ui/react`** — local UI primitives in `src/components/ui/*`
  (`skeleton.tsx`, accordion, etc.).
- **Framer Motion 12** — `Reveal`, `StatCounter`, `Marquee` wrappers.
- **React Hook Form + Zod** — form state + `src/lib/validation.ts` schemas.
- **Nodemailer** — transactional mail in `src/lib/email.ts`.
- Supporting: `lucide-react`, `next/font/google`, `next/image`, Cloudinary for product imagery.

## Data model

- Products are resolved by `getProduct(id)` where **`id` = lowercased SKU**. The JDS catalog drives
  the set; the build statically generates **1621 pages (1543 products)**.
- `formatPrice(value)` (`src/lib/format.ts`) =
  `Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value)` → `$X.XX`.
- `getProductCount()` is the single source for catalog counts surfaced in marketing copy.
- `getFeaturedProducts(n)` returns curated featured SKUs.

## Findings that shaped decisions

- **Gold lived in two places**, not one: the CSS token layer *and* a hard-coded `#caa45a` in the
  email HTML. The pivot wasn't complete until the email literal was changed too (see DECISIONS).
- **`from $X` vs "Request pricing":** the site gates retail price behind a request flow, but
  `basePrice` exists per product and reads as a wholesale floor — appropriate to surface on the
  B2B banner, inappropriate as a retail tag. This tension is intentional, not a bug.
- **RSC text splitting:** a grep for `from \$[0-9]+\.[0-9]{2}` came back empty even though prices
  render, because React Server Components emit "from " and the formatted price as separate text
  nodes. Verification has to query the DOM, not the raw HTML stream — a recurring gotcha for this
  app.
- **`gft1023` is not in the JDS dataset.** Confirmed by lookup, not assumed. Drove the defensive
  filter rather than a SKU swap.
- **RHF checkbox arrays:** multiple `register("channels")` calls sharing the name, each with a
  distinct `value=`, collect checked values into a single array — no custom onChange needed.
- **Existing production states were already on-brand:** `error.tsx`, `not-found.tsx`, the
  `/login` and `/seller` "FomaFlow · Coming soon" placeholders, and the quote empty/loading
  screens needed no rework. The gap was *route-level loading skeletons* for category / subcategory
  / product — added via App Router `loading.tsx` + a reusable `ProductGridSkeleton`.

## Verification approach

- **DOM-query evals over screenshots.** Preview screenshots lagged and occasionally landed on the
  wrong route ("Inspected target navigated or closed" on `location.href` evals). Authoritative
  checks were DOM queries returning `path` + element assertions, plus `curl` for HTTP status.
- **End-to-end quote check:** seeded `localStorage` cart `fomaprint.quote.v1`, confirmed 7 channel
  checkboxes + `#q-volume` on `/quote`; API POST with `channels:["Etsy","Shopify"]` +
  `monthlyVolume:"51–200 items"` → `{"ok":true}` 200; invalid channel → 422 with the correct Zod
  enum error.
- **Responsive:** no horizontal overflow at 1440 (scrollWidth 1425 < 1440); hero/banner/quote
  reflow cleanly at 390 / 768 / 1280 / 1440.
- **Build:** `npm run build` green — 1621 static pages, TypeScript clean, ESLint 0/0.
