# TODO(david) — UI/UX elevation pass

Open decisions and content gaps from the elevation work on
`claude/ui-elevation-2026-20260629`. Nothing here blocks the preview; these are
yours to supply or confirm.

## Decisions I made autonomously (change if you disagree)
- **Container width** → widened the site shell from 1280px to **1440px**
  (`--container-wide` in `globals.css`, applied via `.container-px`), gutters
  scale 16 → 24 → 40px. Product grids gain a 5th column at ≥1536px.
- **Primary CTA** standardized to **"Apply to sell"** everywhere (was a mix of
  "Become a Seller" / "Apply to Sell"); the lighter path is **"Request a quote"**
  (the header quote icon, now with a tooltip + aria-label).
- **Shipping wording** standardized through `lib/site-copy.ts` →
  `DISPATCH_NOTE` ("Same-day dispatch on orders before 2pm ET — transit time
  additional"), used on product pages; the Shipping page uses the same
  `ORDER_CUTOFF`. Change the cutoff in one place.
- **Card elevation** refined globally (`--shadow-soft/-card` are now tighter,
  hairline-first) instead of the old uniform soft shadow.

## Needs your input
- **Social profiles** — `site.social` is empty, so the footer renders no icons
  (no placeholder links, per the brief). Supply real Instagram / Facebook /
  Pinterest / TikTok URLs to turn them on, in `src/lib/site.ts`.
- **Real testimonials** — the anonymous quotes were removed and not replaced.
  If you have genuine ones (first name + shop type), send them and I'll add a
  testimonials slot back.
- **Same-day wording** — confirm `DISPATCH_NOTE` reads how you want, or give the
  exact phrasing and I'll update the one constant.

## Deferred (not built this pass — say the word)
- **Sticky "Add to quote"** on the product page as you scroll (the inline
  Add-to-quote button stays).
- **Margin calculator / quote builder** (explicitly deferred in the brief).
- **Per-SKU transit estimate** on product pages — currently products show the
  same-day dispatch line, not a per-product day range. Reintroduce once the
  dispatch/transit wording above is locked.
- **Lighthouse before/after numbers** — run on the preview; current changes are
  token/markup level and should hold or improve scores.
