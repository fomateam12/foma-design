# FomaPrint — B2B Unification & Production Polish — DECISIONS

Branch: `redesign/b2b-unify`. This log records the non-obvious calls made during the
autonomous pass and *why*, so the rationale survives the diff.

## Design system

- **Brass/gold → single earthy RUST.** (`f3c8571`) The brief called for a no-gold palette.
  `--rust #a8481e` is the only accent; `--metallic` was redefined from a gold-foil gradient to a
  rust gradient (`linear-gradient(135deg,#c0592a 0%,#a8481e 55%,#8e3a16 100%)`), and
  `.text-metallic` / `.rule-metallic` now resolve to rust. No gold hex survives anywhere in the
  app or the transactional email.
- **Last gold hex in the email template.** (`793d2fd`) The logo wordmark in `src/lib/email.ts`
  still hard-coded `#caa45a` (gold) after the CSS pivot — swapped to `#d2703c` (rust tint) so the
  HTML email matches the site. Email clients don't see CSS tokens, hence the literal hex.
- **Fonts:** Hanken Grotesk (headings) + Inter (body) via `next/font/google`.

## Home

- **Hero collage removed, hero centered.** (`e4144c1`) Per direct user feedback
  ("i dont want this banner here", red-circled around the right-side 2×2 product collage), the
  two-column hero was collapsed to a single centered column. Removed the now-unused `heroTiles`
  slice and the `ProductImage` import to keep lint clean.
- **§9 ProductBanner shows `from $X`.** (`9acb8c1`) The rest of the site gates price behind
  "Request pricing", but the signature banner shows a wholesale `from $X` per card. Decision:
  `basePrice` is the **wholesale floor** shown to prospective resellers, never a retail tag — the
  banner's whole job is to make margin legible at a glance. This is intentional, not a leak of the
  retail gate.
- **Curated SKUs stay as the default spec list.** (`9acb8c1`) Per explicit constraint
  ("dont change the SKUs they should be default and match from jds") the banner's `CURATED_SKUS`
  array is left exactly as specified. `gft1023` is genuinely absent from the JDS dataset, so rather
  than substitute a different SKU the list is filtered defensively
  (`.filter((p): p is Product => Boolean(p))`) — the spec list is preserved, the missing card is
  simply skipped.

## Cleanup

- **`/custom-order` → `/quote` as a 308, not a 301.** (`a0c33fc`) Used Next.js
  `redirects()` with `permanent: true`, which emits **308 Permanent Redirect** (method- and
  body-preserving) rather than 301. The old route accepted POSTs; 308 guarantees any in-flight
  non-GET requests aren't silently downgraded to GET on redirect.
- **Per-product "Bestseller/New" pill removed, Best Sellers *category* kept.** (`dfcabe1`)
  The pill was per-card noise; the curated Best Sellers category is a real navigational surface and
  stays.
- **Single `getProductCount()` source.** (`fe0b146`) Counts shown across the home/marketing copy
  were reconciled through one helper so they can't drift.

## Content pages

- **FAQ uses the existing chevron accordion, not the spec's rust +/× glyphs.** (`e48af86`)
  Reused the in-repo accordion primitive for consistency and a11y rather than hand-rolling the
  spec's bespoke +/× toggle. Visual parity is close; behaviour is the battle-tested component.

## Forms

- **Quote brief extended with sales channels + monthly volume.** (`793d2fd`) Channels are a
  checkbox-pill group (RHF collects multiple `register("channels")` into an array); volume is a
  select defaulting to `Not sure yet` (empty string). Both are **optional** in the Zod schema —
  a reseller who doesn't know their volume yet must not be blocked from requesting a quote. Both
  flow through validation → admin email → lead CSV/log.

## Process

- **Screenshots captured via the live preview tool, not saved to `/.redesign-shots/passN/`.**
  The preview tooling returns images inline for inspection but can't write them to disk, so the QA
  passes were verified live rather than archived as files. See BLOCKERS.md.
- **No merge to `main`, no production deploy.** By instruction. All 11 commits remain isolated on
  `redesign/b2b-unify`.
