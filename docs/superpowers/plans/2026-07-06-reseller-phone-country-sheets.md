# Reseller Phone Country Selector + Google Sheets Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 5-country phone country-code selector to the reseller application form, and forward every valid reseller application to a Google Sheet in parallel with the existing email dispatch.

**Architecture:** A small presentational `PhoneInput` component (native `<select>` + `<input type="tel">`, matching this form's existing native-select pattern) combines a locally-held country choice with the existing `register("phone")` field; the combined `+{dialCode} {number}` string is assembled just before the fetch call, so the zod schema and both email templates need zero changes. On the server, a new `src/lib/google-sheets.ts` helper authenticates as a Google service account and appends one row per application via the Sheets v4 REST API, called concurrently with the existing email dispatch from `route.ts` via `Promise.allSettled` — a Sheets failure is logged but never changes the HTTP response the applicant sees.

**Tech Stack:** Next.js 16 (App Router, `runtime = "nodejs"` on this route), react-hook-form + zod, `google-auth-library` (new dependency) for service-account JWT auth, native `fetch` for the Sheets REST call.

## Global Constraints

- Customer-facing copy stays in English (per `AGENTS.md`).
- This repo has **no test runner configured** (no jest/vitest — verified: zero `*.test.*` files, no test deps in `package.json`). Verification per task therefore uses `npx tsc --noEmit` (typecheck), `npm run build`, and manual `npm run dev` checks — this matches the repo's existing convention documented in `AGENTS.md`'s "Verify" step (build must pass, log lines/curl are the smoke tests), not a project-wide test suite.
- Follow the existing native-`<select>` pattern already used by `businessType` / `monthlyVolume` / `hearAboutUs` in `seller-application-form.tsx` — do **not** introduce the unused `src/components/ui/select.tsx` (base-ui) component; grep-confirmed zero existing usages, and adding the first one here would mix UI paradigms in the same form for no benefit.
- Scope is the reseller application form and its API route only. Do not touch `quote-request.tsx`, `src/lib/email.ts`, or `LEAD_WEBHOOK_URL`.
- Never log raw applicant PII (name/email/phone) — follow `src/lib/log.ts`'s existing masking convention; only log field *names* (e.g. which env var is missing) or third-party API status/error text, never the applicant's own data.
- Commit after each task.

---

### Task 1: Phone country data

**Files:**
- Create: `src/data/phone-countries.ts`

**Interfaces:**
- Produces: `PhoneCountry` (interface: `{ iso2: string; name: string; dialCode: string; flag: string }`), `PHONE_COUNTRIES: PhoneCountry[]`, `DEFAULT_PHONE_COUNTRY: PhoneCountry` — consumed by Task 2 (`phone-input.tsx`) and Task 3 (`seller-application-form.tsx`).

- [ ] **Step 1: Create the data file**

```ts
// src/data/phone-countries.ts

export interface PhoneCountry {
  iso2: string;
  name: string;
  dialCode: string;
  flag: string;
}

/**
 * Fixed list — not user-extensible from the UI. Add a country here (and only
 * here) if the business starts serving a new market's resellers directly.
 */
export const PHONE_COUNTRIES: PhoneCountry[] = [
  { iso2: "US", name: "United States", dialCode: "1", flag: "🇺🇸" },
  { iso2: "TR", name: "Turkey", dialCode: "90", flag: "🇹🇷" },
  { iso2: "DE", name: "Germany", dialCode: "49", flag: "🇩🇪" },
  { iso2: "BE", name: "Belgium", dialCode: "32", flag: "🇧🇪" },
  { iso2: "NL", name: "Netherlands", dialCode: "31", flag: "🇳🇱" },
];

export const DEFAULT_PHONE_COUNTRY: PhoneCountry = PHONE_COUNTRIES[0];
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors (this file has no dependents yet, so this just confirms the file itself parses and typechecks cleanly).

- [ ] **Step 3: Commit**

```bash
git add src/data/phone-countries.ts
git commit -m "$(cat <<'EOF'
Add fixed phone country-code list (US, TR, DE, BE, NL)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: `PhoneInput` component

**Files:**
- Create: `src/components/phone-input.tsx`

**Interfaces:**
- Consumes: `PHONE_COUNTRIES` from `@/data/phone-countries` (Task 1); `Input` from `@/components/ui/input`; `cn` from `@/lib/utils`.
- Produces: `PhoneInput` component with props `{ id: string; countryIso2: string; onCountryChange: (iso2: string) => void; numberInputProps: UseFormRegisterReturn; ariaInvalid?: boolean; className?: string }` — consumed by Task 3.

- [ ] **Step 1: Create the component**

```tsx
// src/components/phone-input.tsx
"use client";

import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PHONE_COUNTRIES } from "@/data/phone-countries";

const COUNTRY_SELECT =
  "h-11 w-[108px] shrink-0 rounded-lg border border-input bg-transparent px-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

interface PhoneInputProps {
  id: string;
  countryIso2: string;
  onCountryChange: (iso2: string) => void;
  numberInputProps: UseFormRegisterReturn;
  ariaInvalid?: boolean;
  className?: string;
}

export function PhoneInput({
  id,
  countryIso2,
  onCountryChange,
  numberInputProps,
  ariaInvalid,
  className,
}: PhoneInputProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <select
        aria-label="Phone country code"
        className={COUNTRY_SELECT}
        value={countryIso2}
        onChange={(e) => onCountryChange(e.target.value)}
      >
        {PHONE_COUNTRIES.map((c) => (
          <option key={c.iso2} value={c.iso2}>
            {c.flag} {c.iso2} +{c.dialCode}
          </option>
        ))}
      </select>
      <Input
        id={id}
        type="tel"
        aria-invalid={ariaInvalid}
        className="h-11 flex-1"
        {...numberInputProps}
      />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/phone-input.tsx
git commit -m "$(cat <<'EOF'
Add PhoneInput: country-code select + number field

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Wire `PhoneInput` into the reseller form

**Files:**
- Modify: `src/components/seller-application-form.tsx`

**Interfaces:**
- Consumes: `PhoneInput` (Task 2), `PHONE_COUNTRIES`, `DEFAULT_PHONE_COUNTRY` (Task 1).
- Produces: the form now sends `phone` to `/api/reseller-application` as the combined `"+{dialCode} {number}"` string — this is what Task 6's server-side code and the existing email templates receive; no other consumer changes.

- [ ] **Step 1: Add imports and local state**

In `src/components/seller-application-form.tsx`, add to the top imports:

```tsx
import { PhoneInput } from "@/components/phone-input";
import { PHONE_COUNTRIES, DEFAULT_PHONE_COUNTRY } from "@/data/phone-countries";
```

Then, directly below the existing `const [submitError, setSubmitError] = useState<string | null>(null);` line, add:

```tsx
  const [phoneCountryIso2, setPhoneCountryIso2] = useState<string>(
    DEFAULT_PHONE_COUNTRY.iso2,
  );
```

- [ ] **Step 2: Combine the country prefix into the submitted phone value**

Replace the current `onSubmit` body:

```tsx
  async function onSubmit(values: ResellerApplicationInput) {
    setSubmitError(null);
    const started = mountedAt.current;
    const elapsedMs = started > 0 ? Date.now() - started : undefined;
    try {
      const res = await fetch("/api/reseller-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          elapsedMs,
          cfTurnstileToken: turnstileToken ?? undefined,
        }),
      });
```

with:

```tsx
  async function onSubmit(values: ResellerApplicationInput) {
    setSubmitError(null);
    const started = mountedAt.current;
    const elapsedMs = started > 0 ? Date.now() - started : undefined;
    const phoneCountry =
      PHONE_COUNTRIES.find((c) => c.iso2 === phoneCountryIso2) ??
      DEFAULT_PHONE_COUNTRY;
    const phone = `+${phoneCountry.dialCode} ${values.phone}`.trim();
    try {
      const res = await fetch("/api/reseller-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone,
          elapsedMs,
          cfTurnstileToken: turnstileToken ?? undefined,
        }),
      });
```

(Everything after this — the response handling, `catch` block — stays exactly as-is.)

- [ ] **Step 3: Replace the raw phone `<Input>` with `<PhoneInput>`**

Replace:

```tsx
        <div>
          <Label htmlFor="se-phone">Phone *</Label>
          <Input
            id="se-phone"
            type="tel"
            className={cn(FIELD, "mt-1.5")}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <ErrorText msg={errors.phone?.message} />
        </div>
```

with:

```tsx
        <div>
          <Label htmlFor="se-phone">Phone *</Label>
          <PhoneInput
            id="se-phone"
            className="mt-1.5"
            countryIso2={phoneCountryIso2}
            onCountryChange={setPhoneCountryIso2}
            numberInputProps={register("phone")}
            ariaInvalid={!!errors.phone}
          />
          <ErrorText msg={errors.phone?.message} />
        </div>
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. (If `FIELD` becomes unused elsewhere in the file, it will still be referenced by other fields like name/business/website — confirm with `grep -n "FIELD" src/components/seller-application-form.tsx` that it still has other call sites before assuming it's dead.)

- [ ] **Step 5: Manual browser verification**

Run: `npm run dev`, then open `http://localhost:3000/sell` in a browser.
Expected:
- The phone field shows a compact country select (default `🇺🇸 US +1`) directly to the left of the number input.
- Switching the select to e.g. `🇹🇷 TR +90` updates the visible selection immediately.
- Typing a short number (e.g. `123`) and submitting shows the existing "Enter a valid phone number" validation error (proves client-side zod validation still runs against the typed digits).
- Typing a full number (e.g. `5551234567`), filling every other required field, waiting a couple seconds (anti-spam fill-time gate), and submitting reaches the "Application received" success screen.

- [ ] **Step 6: Commit**

```bash
git add src/components/seller-application-form.tsx
git commit -m "$(cat <<'EOF'
Wire phone country-code selector into reseller application form

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Extract shared `nyTimestamp` helper

**Files:**
- Create: `src/lib/time.ts`
- Modify: `src/lib/reseller-email.ts`

**Interfaces:**
- Produces: `nyTimestamp(): string` exported from `src/lib/time.ts` — consumed by `reseller-email.ts` (this task) and by `route.ts` + `google-sheets.ts` call site in Task 6.
- Consumes (in `reseller-email.ts`): the new `nyTimestamp` import; `sendResellerApplicationEmails`'s `ctx` param grows an optional `submittedAt` field so the caller (Task 6) can supply one shared timestamp for both the email and the sheet row.

- [ ] **Step 1: Create `src/lib/time.ts`**

```ts
// src/lib/time.ts

/** "Jul 6, 2026, 3:45 PM" style timestamp in the business's operating timezone. */
export function nyTimestamp(): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}
```

- [ ] **Step 2: Remove the local copy from `reseller-email.ts` and import the shared one**

In `src/lib/reseller-email.ts`, delete this block:

```ts
function nyTimestamp(): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}
```

Add to the top imports:

```ts
import { nyTimestamp } from "@/lib/time";
```

- [ ] **Step 3: Let the caller supply a shared timestamp**

Replace the function signature and its first two lines:

```ts
export async function sendResellerApplicationEmails(
  data: ResellerApplicationInput,
  ctx?: { traceId?: string },
): Promise<ResellerEmailResult> {
  const traceId = ctx?.traceId;
```

with:

```ts
export async function sendResellerApplicationEmails(
  data: ResellerApplicationInput,
  ctx?: { traceId?: string; submittedAt?: string },
): Promise<ResellerEmailResult> {
  const traceId = ctx?.traceId;
```

Then replace:

```ts
  const resend = new Resend(apiKey);
  const submittedAt = nyTimestamp();
```

with:

```ts
  const resend = new Resend(apiKey);
  const submittedAt = ctx?.submittedAt ?? nyTimestamp();
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/time.ts src/lib/reseller-email.ts
git commit -m "$(cat <<'EOF'
Extract nyTimestamp into a shared helper

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Google Sheets append helper

**Files:**
- Modify: `package.json` (add dependency)
- Create: `src/lib/google-sheets.ts`

**Interfaces:**
- Consumes: `ResellerApplicationInput` from `@/lib/validation`; `log` from `@/lib/log`; `JWT` from `google-auth-library`.
- Produces: `appendResellerApplicationRow(data: ResellerApplicationInput, meta: { traceId?: string; submittedAt: string }): Promise<{ ok: boolean; error?: string }>` — consumed by Task 6 (`route.ts`).

- [ ] **Step 1: Add the dependency**

Run: `npm install "google-auth-library@^10.9.0"`
Expected: `package.json` gains `"google-auth-library": "^10.9.0"` under `dependencies` (alphabetically between `framer-motion` and `lucide-react`), and `package-lock.json` updates.

- [ ] **Step 2: Create `src/lib/google-sheets.ts`**

```ts
// src/lib/google-sheets.ts
import { JWT } from "google-auth-library";
import type { ResellerApplicationInput } from "@/lib/validation";
import { log } from "@/lib/log";

/**
 * Forwards every reseller application to a Google Sheet as a supplementary,
 * best-effort record — the email dispatch in reseller-email.ts is the
 * primary channel. A Sheets failure is logged and never blocks or fails
 * the applicant's request.
 *
 * Required env (set in Vercel / .env.local by the operator):
 *   - GOOGLE_SHEETS_CLIENT_EMAIL     service-account email
 *   - GOOGLE_SHEETS_PRIVATE_KEY      service-account private key, \n-escaped
 *   - GOOGLE_SHEETS_SPREADSHEET_ID   target spreadsheet ID (from its URL)
 *   - GOOGLE_SHEETS_TAB_NAME         optional, defaults to "Reseller Applications"
 */

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const DEFAULT_TAB_NAME = "Reseller Applications";

export interface SheetAppendResult {
  ok: boolean;
  error?: string;
}

function resolvePrivateKey(raw: string): string {
  return raw.replace(/\\n/g, "\n");
}

export async function appendResellerApplicationRow(
  data: ResellerApplicationInput,
  meta: { traceId?: string; submittedAt: string },
): Promise<SheetAppendResult> {
  const { traceId } = meta;
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const tabName = process.env.GOOGLE_SHEETS_TAB_NAME || DEFAULT_TAB_NAME;

  if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
    const missing = [
      !clientEmail && "GOOGLE_SHEETS_CLIENT_EMAIL",
      !privateKeyRaw && "GOOGLE_SHEETS_PRIVATE_KEY",
      !spreadsheetId && "GOOGLE_SHEETS_SPREADSHEET_ID",
    ]
      .filter(Boolean)
      .join(", ");
    log.error({ traceId, event: "reseller.sheets_not_configured", missing });
    return { ok: false, error: `Sheets not configured: missing ${missing}.` };
  }

  const row = [
    meta.submittedAt,
    data.name,
    data.businessName,
    data.email,
    data.phone,
    data.website ?? "",
    data.businessType,
    data.monthlyVolume,
    data.products,
    data.hearAboutUs ?? "",
    data.hearAboutUsOther ?? "",
    data.about ?? "",
    traceId ?? "",
  ];

  try {
    const client = new JWT({
      email: clientEmail,
      key: resolvePrivateKey(privateKeyRaw),
      scopes: [SHEETS_SCOPE],
    });
    const { access_token: accessToken } = await client.authorize();
    if (!accessToken) {
      log.error({ traceId, event: "reseller.sheets_auth_failed" });
      return { ok: false, error: "Sheets auth returned no access token." };
    }

    const range = encodeURIComponent(`${tabName}!A:M`);
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [row] }),
      },
    );

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      log.error({
        traceId,
        event: "reseller.sheets_append_failed",
        status: res.status,
        body: body.slice(0, 500),
      });
      return { ok: false, error: `Sheets API returned ${res.status}.` };
    }

    return { ok: true };
  } catch (err) {
    log.error({
      traceId,
      event: "reseller.sheets_append_threw",
      message: err instanceof Error ? err.message : String(err),
    });
    return { ok: false, error: "Sheets append threw an exception." };
  }
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json src/lib/google-sheets.ts
git commit -m "$(cat <<'EOF'
Add Google Sheets append helper for reseller applications

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Wire Sheets append into the API route

**Files:**
- Modify: `src/app/api/reseller-application/route.ts`

**Interfaces:**
- Consumes: `appendResellerApplicationRow` (Task 5), `nyTimestamp` (Task 4), existing `sendResellerApplicationEmails`.
- Produces: no change to the route's public response shape (`ApiResponse` stays `{ ok: true; deduplicated?: boolean } | { ok: false; error: string }`); Sheets failures only affect logs.

- [ ] **Step 1: Add imports**

Add to the top imports of `src/app/api/reseller-application/route.ts`:

```ts
import { appendResellerApplicationRow } from "@/lib/google-sheets";
import { nyTimestamp } from "@/lib/time";
```

- [ ] **Step 2: Replace the dispatch block**

Replace this entire block (from the idempotency check's closing brace through the final `return`):

```ts
  try {
    const result = await sendResellerApplicationEmails(data, { traceId });
    if (!result.ok) {
      log.error({
        traceId,
        event: "reseller.dispatch_failed",
        reason: result.error,
        internalSent: result.internalSent,
        applicantSent: result.applicantSent,
      });
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't submit your application. Please email us directly.",
        },
        { status: 500, headers },
      );
    }
    log.info({
      traceId,
      event: "reseller.dispatched",
      internalSent: result.internalSent,
      applicantSent: result.applicantSent,
    });
  } catch (err) {
    log.error({
      traceId,
      event: "reseller.handler_threw",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't submit your application. Please email us directly.",
      },
      { status: 500, headers },
    );
  }

  return NextResponse.json({ ok: true }, { headers });
```

with:

```ts
  const submittedAt = nyTimestamp();
  let emailResult: Awaited<ReturnType<typeof sendResellerApplicationEmails>>;

  try {
    const [settledEmail, settledSheet] = await Promise.allSettled([
      sendResellerApplicationEmails(data, { traceId, submittedAt }),
      appendResellerApplicationRow(data, { traceId, submittedAt }),
    ]);

    if (settledSheet.status === "rejected") {
      log.error({
        traceId,
        event: "reseller.sheets_append_threw",
        message:
          settledSheet.reason instanceof Error
            ? settledSheet.reason.message
            : String(settledSheet.reason),
      });
    } else if (!settledSheet.value.ok) {
      log.warn({
        traceId,
        event: "reseller.sheets_append_not_ok",
        reason: settledSheet.value.error,
      });
    }

    if (settledEmail.status === "rejected") {
      throw settledEmail.reason;
    }
    emailResult = settledEmail.value;
  } catch (err) {
    log.error({
      traceId,
      event: "reseller.handler_threw",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't submit your application. Please email us directly.",
      },
      { status: 500, headers },
    );
  }

  if (!emailResult.ok) {
    log.error({
      traceId,
      event: "reseller.dispatch_failed",
      reason: emailResult.error,
      internalSent: emailResult.internalSent,
      applicantSent: emailResult.applicantSent,
    });
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't submit your application. Please email us directly.",
      },
      { status: 500, headers },
    );
  }

  log.info({
    traceId,
    event: "reseller.dispatched",
    internalSent: emailResult.internalSent,
    applicantSent: emailResult.applicantSent,
  });

  return NextResponse.json({ ok: true }, { headers });
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/reseller-application/route.ts
git commit -m "$(cat <<'EOF'
Append reseller applications to Google Sheets alongside email dispatch

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Document the new environment variables

**Files:**
- Modify: `ENV.md`

- [ ] **Step 1: Add the new server-only secrets to the table**

In `ENV.md`, in the "Server-only secrets" table, add these four rows after the `LEAD_WEBHOOK_URL` row:

```markdown
| `GOOGLE_SHEETS_CLIENT_EMAIL` | Reseller-application Sheets sync — service-account email |
| `GOOGLE_SHEETS_PRIVATE_KEY` | Reseller-application Sheets sync — service-account private key, `\n`-escaped |
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Reseller-application Sheets sync — target spreadsheet ID (from its URL) |
| `GOOGLE_SHEETS_TAB_NAME` | Optional — sheet tab name, defaults to `Reseller Applications` |
```

- [ ] **Step 2: Add a setup walkthrough**

Append this new section at the end of `ENV.md`, after the existing "Notes" section:

```markdown

## Google Sheets sync setup (reseller applications)

One-time, operator-run setup to enable the automatic row-per-application sync:

1. In Google Cloud Console, create (or reuse) a project, then enable the
   **Google Sheets API** for it (APIs & Services → Enable APIs → search
   "Google Sheets API").
2. Create a service account (IAM & Admin → Service Accounts → Create).
   No project roles are needed — access is granted per-sheet in step 4.
3. Open the service account → Keys → Add key → JSON. Download the key
   file. From it:
   - `client_email` → `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` → `GOOGLE_SHEETS_PRIVATE_KEY` (paste as-is; the `\n`
     sequences in the JSON file are read literally by the app)
4. Create (or open) the destination Google Sheet, click **Share**, and
   share it with the service account's email (the `client_email` value)
   as **Editor**.
5. Copy the spreadsheet ID from its URL
   (`https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`) into
   `GOOGLE_SHEETS_SPREADSHEET_ID`.
6. Optionally rename the first tab (or add a new one) and set
   `GOOGLE_SHEETS_TAB_NAME` to match — otherwise the app writes to a tab
   literally named `Reseller Applications`, which must exist in the sheet.
7. Set all values in Vercel (Production + Preview) and in `.env.local` for
   local testing. Delete the downloaded JSON key file once the values are
   copied — don't leave it on disk.
```

- [ ] **Step 3: Commit**

```bash
git add ENV.md
git commit -m "$(cat <<'EOF'
Document Google Sheets env vars and service-account setup steps

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Full integration verification

**Files:** none (verification only).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: build succeeds with no type or lint errors.

- [ ] **Step 2: Confirm the Sheets "not configured" path fails closed end-to-end**

With `.env.local` **not** containing any `GOOGLE_SHEETS_*` variable, run `npm run dev`, then submit the reseller form at `http://localhost:3000/sell` with valid data (also requires working `RESEND_API_KEY` / `RESELLER_FROM_EMAIL` / `RESELLER_NOTIFICATION_EMAIL` in `.env.local`, or the email side will separately no-op the same way).

In the terminal running `npm run dev`, run:
```bash
# in a second terminal, tail the dev server's stdout, or just read it directly —
# confirm this exact event name appears after submitting:
```
Expected: a JSON log line containing `"event":"reseller.sheets_not_configured"` and `"missing":"GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, GOOGLE_SHEETS_SPREADSHEET_ID"` appears, **and** the browser still reaches the "Application received" success screen (proving the missing Sheets config never blocks the applicant).

- [ ] **Step 3: Confirm the phone selector's submitted value**

With the dev server still running, open browser devtools → Network tab, submit the form again with country set to `🇹🇷 TR +90` and number `5551234567`. Inspect the outgoing POST body to `/api/reseller-application`.
Expected: the JSON body's `"phone"` field reads `"+90 5551234567"`.

- [ ] **Step 4: Live Sheets check (once the operator has provisioned real credentials)**

After the operator completes the `ENV.md` setup walkthrough and sets real `GOOGLE_SHEETS_*` values in `.env.local`, restart `npm run dev`, submit one test application, and open the target Google Sheet.
Expected: a new row appears in the configured tab with the 13 columns in order (timestamp, name, business, email, phone, website, business type, monthly volume, products, heard-via, heard-via-other, about, trace ID), and the terminal shows no `reseller.sheets_append_failed` / `reseller.sheets_append_threw` log lines for that submission.

- [ ] **Step 5: Final commit (if Step 4 required any fixes)**

Only if Step 4 surfaces a bug requiring a code change: fix it, re-run Steps 1 and 4, then:

```bash
git add -A
git commit -m "$(cat <<'EOF'
Fix Sheets append issue found during live verification

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

If Step 4 passes cleanly with no changes needed, no commit is required for this task.
