# FomaPrint

Personalized & laser-engraved gifts storefront for **FOMA FAMILY LLC**. A fast,
SEO-friendly catalog (drinkware, cutting boards, frames, journals and more) with
custom-order and reseller-application flows that email the FomaPrint team.

## Tech stack

- **Next.js 16** (App Router, TypeScript, `src/`) with Turbopack
- **Tailwind CSS v4** (CSS-first `@theme`) + **shadcn/ui** on [`@base-ui/react`](https://base-ui.com)
- **lucide-react** icons, **sonner** toasts
- **react-hook-form** + **zod** for forms and validation
- **Resend** for transactional email
- Product imagery served from **Cloudinary** via `next/image`

## Getting started

```bash
npm install
cp .env.example .env.local   # optional — see below
npm run dev                  # http://localhost:3000
```

> **New machine?** See [`DEPLOY.md`](./DEPLOY.md) for the clone-to-deploy
> walkthrough, the env-var reference (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`,
> `RESEND_API_KEY`, …), and the curated image-library regeneration scripts.

Emails are a no-op until you add a `RESEND_API_KEY`, so every page and form
works end-to-end out of the box.

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (Turbopack)     |
| `npm run build` | Production build                     |
| `npm run start` | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Environment variables

All are optional in development (see [`.env.example`](.env.example)).

| Variable               | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| `RESEND_API_KEY`       | Resend key for sending email. When unset, emails are skipped (logged).  |
| `EMAIL_FROM`           | From address. Defaults to Resend's shared `onboarding@resend.dev`.      |
| `EMAIL_TO`             | Notification recipient. Defaults to the brand inbox.                     |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, robots and OG tags.                |

For production email you must verify a sending domain in Resend and set
`EMAIL_FROM` to an address on that domain.

## Project structure

```
src/
  app/                 Routes (home, categories, product, custom-order, sell,
                       about, contact, search, legal) + api/, sitemap, robots, OG
  components/          UI + layout (header nav, product grid, forms, shadcn/ui)
  data/                Catalog data layer (server-only) + shared types
  lib/                 site config, email (Resend), validation (zod), formatting
```

`src/data/catalog.ts` is **server-only** (it loads the full product dataset).
Client components import types from `@/data/types` and helpers from `@/lib/format`,
and fetch live results through `/api/search`.

## Forms & email

- **Custom order** — `POST /api/custom-order`
- **Reseller application** — `POST /api/seller-application`

Both validate with zod, guard against spam with a hidden honeypot field, email the
team via Resend, and send the customer a confirmation. Brand and contact strings
live in [`src/lib/site.ts`](src/lib/site.ts).

## Deploy

Deploy on [Vercel](https://vercel.com/new). Set `RESEND_API_KEY`, `EMAIL_FROM`,
`EMAIL_TO` and `NEXT_PUBLIC_SITE_URL` in the project's environment variables.
