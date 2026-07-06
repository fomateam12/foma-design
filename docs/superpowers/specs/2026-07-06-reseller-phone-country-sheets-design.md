# Reseller form: phone country-code selector + Google Sheets automation

Date: 2026-07-06
Status: Approved

## Summary

Two additions to the reseller application form (`/sell`, `SellerApplicationForm`):

1. A country-code selector for the phone field, limited to 5 countries.
2. Every valid submission is also appended as a row to a Google Sheet,
   in parallel with the existing email dispatch.

Scope is the reseller application form only. The quote form's phone field
and its separate `LEAD_WEBHOOK_URL` mechanism are untouched.

## 1. Phone country-code selector

### Country list

`src/data/phone-countries.ts` — a fixed array, not user-extensible from the UI:

```ts
export interface PhoneCountry {
  iso2: string;      // "US"
  name: string;       // "United States"
  dialCode: string;   // "1"
  flag: string;       // "🇺🇸"
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso2: "US", name: "United States", dialCode: "1", flag: "🇺🇸" }, // default
  { iso2: "TR", name: "Turkey",        dialCode: "90", flag: "🇹🇷" },
  { iso2: "DE", name: "Germany",       dialCode: "49", flag: "🇩🇪" },
  { iso2: "BE", name: "Belgium",       dialCode: "32", flag: "🇧🇪" },
  { iso2: "NL", name: "Netherlands",   dialCode: "31", flag: "🇳🇱" },
];

export const DEFAULT_PHONE_COUNTRY = PHONE_COUNTRIES[0]; // US
```

### Component

`src/components/phone-input.tsx` — a single controlled component:

- Props: `value: string`, `onChange: (value: string) => void`, `onBlur`,
  `id`, `aria-invalid`, `className` — shaped to drop into react-hook-form's
  `Controller` render prop, matching how the rest of the form already
  registers fields.
- Internal state: `selectedCountry` (`PhoneCountry`, default
  `DEFAULT_PHONE_COUNTRY`) and the raw national-number text.
- On mount, if `value` already contains a recognized dial code prefix
  (e.g. loaded from a draft), parse it into `selectedCountry` + national
  number; otherwise start from the default country with an empty number.
- Layout: a `Select` (reusing `src/components/ui/select.tsx`) as a compact
  trigger showing `{flag} +{dialCode}`, `SelectContent` listing all 5
  countries as `{flag} {name} (+{dialCode})`, positioned directly to the
  left of a `type="tel"` `Input` for the national number. Both sit inside
  one bordered group so they read as a single field (matches the
  `┌ 🇹🇷 +90 ▾ │ 5xx xxx xx xx ┐` mock approved earlier).
- On either the country selection or the number text changing, emit the
  combined value up via `onChange` as `+{dialCode} {nationalNumber}`
  (single space-joined string, national number trimmed of non-digit/space/
  dash characters beyond what the user typed — no aggressive reformatting,
  just strip characters that would break the combined string like
  newlines, which `noBreaks` already guards server-side).
- No new validation rules: the existing zod field (`phone: string, min 7,
  max 40`) already accepts the combined string comfortably. No schema
  change needed.

### Form wiring

`seller-application-form.tsx`:
- Add `control` to the `useForm` destructure (already available from
  `useForm`, just not currently pulled out).
- Replace the raw `<Input type="tel" {...register("phone")} />` block
  with:
  ```tsx
  <Controller
    control={control}
    name="phone"
    render={({ field }) => (
      <PhoneInput
        id="se-phone"
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        aria-invalid={!!errors.phone}
      />
    )}
  />
  ```
- `defaultValues.phone` stays `""` — the component treats an empty string
  as "no country parsed yet" and falls back to the default country for
  display, without writing anything into the form until the user types.

## 2. Google Sheets automation

### Why `google-auth-library` + `fetch` over `googleapis`

The `googleapis` npm package bundles every Google API's client, which is
multi-megabyte and slows serverless cold starts for no benefit here — we
only need one REST call. `google-auth-library` alone handles the JWT
service-account auth flow; the actual append is a single `fetch` to the
Sheets v4 REST endpoint. This keeps the same lean-dependency posture as
the rest of the codebase (nodemailer/resend are the only "SDK-shaped"
deps today).

### New file: `src/lib/google-sheets.ts`

```ts
export interface SheetAppendResult {
  ok: boolean;
  error?: string;
}

export async function appendResellerApplicationRow(
  data: ResellerApplicationInput,
  meta: { traceId?: string; submittedAt: string },
): Promise<SheetAppendResult>
```

- Reads `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`,
  `GOOGLE_SHEETS_SPREADSHEET_ID` at call time (not module load, so a
  missing env in dev never throws at import time — same pattern as
  `reseller-email.ts`). `GOOGLE_SHEETS_TAB_NAME` is optional, defaults to
  `"Reseller Applications"`.
- If any required env is missing: log via `log.error({ event:
  "reseller.sheets_not_configured", missing })` and return
  `{ ok: false, error: ... }` — never throws, never blocks the caller.
- `GOOGLE_SHEETS_PRIVATE_KEY` is stored with literal `\n` (standard for
  pasting a PEM into an env var); the function replaces `\\n` with real
  newlines before use.
- Auth: build a JWT (`google-auth-library`'s `JWT` class) scoped to
  `https://www.googleapis.com/auth/spreadsheets`, call `.authorize()` to
  get an access token.
- Append: `POST
  https://sheets.googleapis.com/v4/spreadsheets/{id}/values/{tab}!A:M:append?valueInputOption=USER_ENTERED`
  with `Authorization: Bearer {token}`, body `{ values: [[...row]] }`.
- Row shape (13 columns, matches the internal notification email's field
  order for easy side-by-side reading):
  `[submittedAt, name, businessName, email, phone, website, businessType,
  monthlyVolume, products, hearAboutUs, hearAboutUsOther, about, traceId]`
  — empty/undefined optional fields become `""`.
- Non-2xx response: read the error body, log
  `event: "reseller.sheets_append_failed"` with status + body, return
  `{ ok: false }`.

### Route wiring

`src/app/api/reseller-application/route.ts`:
- After the existing spam gates (honeypot / fill-time / Turnstile /
  idempotency) pass, run the email dispatch and the sheet append
  concurrently:
  ```ts
  const [emailResult, sheetResult] = await Promise.allSettled([
    sendResellerApplicationEmails(data, { traceId }),
    appendResellerApplicationRow(data, { traceId, submittedAt: nyTimestamp() }),
  ]);
  ```
  (`nyTimestamp` currently lives in `reseller-email.ts` as a private
  helper — it moves to a small shared spot, e.g. exported from
  `reseller-email.ts` or a new `src/lib/time.ts`, so both call sites use
  the same "America/New_York, medium/short" formatting without
  duplication.)
- The route's success/failure response is governed by `emailResult`
  exactly as today — a Sheets failure is logged
  (`reseller.sheets_append_failed` or the not-configured event) but never
  changes the HTTP status or the applicant-facing message. Sheets is a
  best-effort side channel, matching how the applicant-confirmation email
  already degrades independently of the internal notification.

## Environment variables

Added to `ENV.md` under server-only secrets:

| Name | Purpose |
|---|---|
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Service-account email (from the GCP JSON key) |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Service-account private key, `\n`-escaped |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Target spreadsheet ID (from its URL) |
| `GOOGLE_SHEETS_TAB_NAME` | Optional, defaults to `Reseller Applications` |

`ENV.md` also gets a short numbered setup walkthrough (create GCP
project → enable Sheets API → create service account + JSON key → share
the target sheet with the service-account email as Editor → copy the
three values into Vercel). This is operator-run, not part of the code
change.

## Testing plan

- `npm run build` must pass (existing gate).
- Manual: `npm run dev`, open `/sell`, confirm the country selector
  renders with US default, switching countries updates the visible
  prefix, typing a number produces a plausible combined value, and the
  existing zod min-length validation still fires correctly for a
  too-short number.
- Manual: with Sheets env vars unset, submit the form locally and confirm
  in logs that `reseller.sheets_not_configured` fires once and the
  submission still succeeds end-to-end (email still sends, applicant
  still sees the success screen).
- Once the operator provisions real Sheets credentials (post-code, done
  together), one live submission is checked against the actual sheet row
  before calling this feature done.

## Out of scope

- Quote form phone field (unchanged).
- Quote form's `LEAD_WEBHOOK_URL` mechanism (unchanged, separate feature).
- Any country beyond the fixed 5.
- Editing/deleting sheet rows, or reading them back into the app.
