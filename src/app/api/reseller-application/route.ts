import { NextResponse } from "next/server";
import { resellerApplicationSchema } from "@/lib/validation";
import { sendResellerApplicationEmails } from "@/lib/reseller-email";

export const runtime = "nodejs";

/** Minimum time (ms) a real person needs to fill the form. Faster = bot. */
const MIN_FILL_MS = 2500;

type ApiResponse = { ok: true } | { ok: false; error: string };

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = resellerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Spam gate 1 — honeypot. A filled `fax` field means a bot. Pretend success
  // and send nothing, so the bot gets no signal it was caught.
  if (data.fax && data.fax.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Spam gate 2 — minimum fill time. Submissions faster than a human could
  // plausibly type are dropped silently (same fake-success response).
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  try {
    const result = await sendResellerApplicationEmails(data);
    if (!result.ok) {
      // Log the detailed reason server-side only; never leak it to the client.
      console.error("[reseller-application] not sent:", result.error);
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn't submit your application. Please email us directly.",
        },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("[reseller-application] handler threw:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't submit your application. Please email us directly.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
