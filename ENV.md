# Environment variables

Names only — **never commit values**. Set these in Vercel (Production + Preview)
and in `.env.local` for local dev. `.env*` is gitignored.

## Public (safe — exposed to the browser, baked at build time)
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_R2_BASE_URL` | Cloudflare R2 origin for product images |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary fallback cloud name |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata / sitemap / OG) |

## Server-only secrets (NEVER `NEXT_PUBLIC_`, never in the client bundle)
| Name | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key — reseller-application emails |
| `RESELLER_FROM_EMAIL` | Verified sender, e.g. `FomaPrint <noreply@fomaprint.com>` |
| `RESELLER_NOTIFICATION_EMAIL` | Lead destination (`info@fomaprint.com`) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `SMTP_SECURE` | Quote-form email (nodemailer) |
| `EMAIL_FROM` / `EMAIL_TO` | Quote sender / recipient (default to SMTP_USER / site email) |
| `LEAD_WEBHOOK_URL` | Optional — POST each lead to a sheet/CSV endpoint |

## Notes
- The codebase reads only the names above (verified via `grep process.env`).
- No Supabase keys (the project does not use Supabase).
- Rotate any secret that was ever pasted into chat, a PR, or committed — assume
  it is public.
