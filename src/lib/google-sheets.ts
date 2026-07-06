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
