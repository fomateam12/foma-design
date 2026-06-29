# FomaPrint — Security Audit & Hardening Report

Branch: `claude/security-hardening-20260629`. Defensive hardening of a live
Next.js 16 / Vercel marketing + lead-gen site. Staged & reversible (CSP ships
report-only; no DNS/mail changes).

## Stack reality vs. the brief
| Brief assumed | Actual | Impact |
|---|---|---|
| Next.js 14.x (past support) | **Next.js 16.2.9** (verified in `node_modules`) | Already on a supported, patched major — **no upgrade needed**; the 14.x RCE/CVE concerns don't apply. |
| Supabase (Postgres/auth + RLS) | **Not used** — no `@supabase/*`, no client, no tables | §5 (RLS) is **N/A**. |
| Possible orphaned FomaFlow auth/admin routes | **None** — only `/api/{reseller-application,quote,search}` | Login/seller pages are 308 redirects; no dead auth endpoints. |

## Findings → severity → fix → file
| # | Finding | Severity | Fix | File |
|---|---|---|---|---|
| 1 | No security headers (no CSP/HSTS/XFO/etc.) | **High** | Added full header set; CSP **report-only** first | `next.config.ts` |
| 2 | `X-Powered-By: Next.js` exposed | Low | `poweredByHeader: false` | `next.config.ts` |
| 3 | POST routes had no CSRF/origin check | Medium | Same-origin guard rejects cross-site POSTs (403) | `src/lib/security.ts`, both API routes |
| 4 | JSON-LD via `dangerouslySetInnerHTML` (catalog data) | Low | Escape `<` → `<` to prevent `</script>` breakout | `src/app/product/[id]/page.tsx` |
| 5 | `npm audit`: postcss `</style>` XSS via Next's bundled copy | Moderate (build-time) | Accepted — fix lands in a future Next patch; the `audit fix --force` "fix" force-downgrades Next to 9.x (regression). No high/critical. | (transitive) |
| 6 | No `security.txt` | Low | Added RFC 9116 contact file | `public/.well-known/security.txt` |
| 7 | Exposed Resend key + mailbox password (pasted in chat earlier) | **High** | **Rotation required — David** (cannot be done from code) | `TODO-david.md` |

## Controls verified already-safe
- **Secrets:** all 3 `NEXT_PUBLIC_*` vars are non-secret (R2 URL, Cloudinary name, site URL). Resend/SMTP keys are server-only (`process.env` in route/lib, never `NEXT_PUBLIC_`). Git-history pattern scan (re_/sk_live_/AKIA/JWT) — **clean**.
- **Input validation:** every POST route validates server-side with **Zod** (`safeParse`) and rejects malformed/oversized payloads. Client validation is never trusted.
- **Email-header injection:** Resend (HTTP API, not raw SMTP) and nodemailer both receive `to`/`from` **hard-set server-side**; user input only fills `replyTo`/body and is Zod-validated as an email — no header-injection / spam-relay path.
- **Spam/abuse:** honeypot field + minimum fill-time gate on both forms (bots that fill everything or submit instantly get a fake 200, nothing sent).
- **XSS:** React auto-escaping throughout; the only `dangerouslySetInnerHTML` is the (now-escaped) JSON-LD.
- **Error leakage:** API routes return generic client messages; detailed reasons are logged server-side only.

## Headers shipped (report-only CSP)
`Content-Security-Policy-Report-Only`, `Strict-Transport-Security: max-age=86400`
(no preload, no includeSubDomains yet), `X-Content-Type-Options: nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy` (camera/mic/geo/usb/payment/topics denied),
`Cross-Origin-Opener-Policy: same-origin`.

## Next steps (in order)
1. Push branch → review CSP-Report-Only violations in the browser console on Preview.
2. Once clean, switch the header name `Content-Security-Policy-Report-Only` →
   `Content-Security-Policy` (and tighten `script-src` to nonce/hash, dropping
   `'unsafe-inline'`).
3. After a clean prod window, ramp HSTS `max-age` to 1 year + `includeSubDomains`
   (still no preload until intentional).
4. Rate limiting (Upstash) + Cloudflare Turnstile on the forms — needs infra/keys
   (see `TODO-david.md`).
5. Monitoring (Sentry/uptime) + incident runbook.

## Rollback
Vercel keeps prior deployments. To roll back: Vercel dashboard → Deployments →
the last-good production deployment → **Promote to Production** (or
`vercel rollback <url>`). All changes here are additive headers + guards; reverting
the merge fully restores prior behavior.
