# TODO(david) — SECURITY (platform/account tasks Claude can't do)

These require dashboard/account access. **Do the URGENT ones first.**

## 🔴 URGENT
- [ ] **Rotate the Resend API key** (was pasted in chat — treat as compromised). New key → Vercel env only, then redeploy. Old key → delete in Resend.
- [ ] **Change the `info@fomaprint.com` mailbox password** (Namecheap Private Email) — also exposed.
- [ ] **MFA on everything** (authenticator app or hardware key, **not SMS**): GitHub, Vercel, Cloudflare, Namecheap, Resend, Google/email, Etsy, Amazon.

## DNS / mail (do NOT let code touch these — manual only)
- [ ] **DMARC ramp:** currently `p=none`. After ~2 clean weeks → `p=quarantine`, then `p=reject`.
- [ ] **Registrar lock + DNSSEC** re-enabled on each domain after any Cloudflare transfer completes.
- [ ] **Parked brand domains** (`fomaprint.net/.org`, `fomafamily.*`): add null-MX + SPF `-all` + DMARC `p=reject` so they can't be spoofed.
- [ ] Keep mail records (MX/DKIM/SPF/DMARC) **DNS-only** in Cloudflare (never proxied).

## Cloudflare (edge shield)
- [ ] SSL/TLS = **Full (strict)** for any proxied web record (or keep web DNS-only and let Vercel do SSL).
- [ ] WAF managed rules **ON**, Bot Fight Mode **ON**, rate-limiting rules on `/api/quote` + `/api/reseller-application`.
- [ ] Create **Turnstile** keys → give me the site key + set the secret key in Vercel env; I'll wire the widget into both forms.
- [ ] "Under Attack Mode" = emergency only.

## Platform
- [ ] **GitHub:** branch protection on `main` (require PR review), enable **secret scanning + push protection**, review collaborators / deploy keys / OAuth apps.
- [ ] **Vercel:** set **spend/usage caps** (DDoS-of-wallet protection), protect production, review team access.
- [ ] Add **Upstash Redis** (Vercel marketplace) for per-IP rate limiting → set its env vars; I'll add `@upstash/ratelimit` to the form routes.
- [ ] Run a full **gitleaks**/**trufflehog** history scan (I did a pattern scan — clean — but the full tools are more thorough). Rotate anything found.
- [ ] Stand up **monitoring**: Sentry (errors) + an uptime monitor with alerts.

## N/A for this project (noted so they're not chased)
- Supabase / RLS — **not used** (no database).
- "Allow only Cloudflare IPs at origin" — origin is Vercel-managed, N/A.
- Next.js upgrade — already on **16.2.9** (patched/supported).

---

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
