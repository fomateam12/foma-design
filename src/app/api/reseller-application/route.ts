import { NextResponse } from "next/server";
import { resellerApplicationSchema } from "@/lib/validation";
import { sendResellerApplicationEmails } from "@/lib/reseller-email";
import { isSameOrigin } from "@/lib/security";
import { fingerprint, shouldProcess } from "@/lib/idempotency";
import { log } from "@/lib/log";
import { getTraceId, TRACE_HEADER } from "@/lib/trace";

export const runtime = "nodejs";

/** Minimum time (ms) a real person needs to fill the form. Faster = bot. */
const MIN_FILL_MS = 2500;

type ApiResponse = { ok: true; deduplicated?: boolean } | { ok: false; error: string };

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  const traceId = getTraceId(request);
  const headers = { [TRACE_HEADER]: traceId };

  // CSRF: reject cross-site POSTs (browsers always send Origin on those).
  if (!isSameOrigin(request)) {
    log.warn({ traceId, event: "reseller.csrf_rejected" });
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 403, headers },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (err) {
    // Malformed JSON is the only way we hit this branch — surface it so
    // a sudden uptick in 400s on this endpoint shows up in log filters
    // instead of being silent.
    log.warn({
      traceId,
      event: "reseller.invalid_json",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400, headers },
    );
  }

  const parsed = resellerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    log.info({
      traceId,
      event: "reseller.validation_failed",
      issueCount: parsed.error.issues.length,
    });
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422, headers },
    );
  }

  const data = parsed.data;

  // Spam gate 1 — honeypot. A filled `fax` field means a bot. Pretend success
  // and send nothing, so the bot gets no signal it was caught.
  if (data.fax && data.fax.trim() !== "") {
    log.warn({ traceId, event: "reseller.honeypot_tripped" });
    return NextResponse.json({ ok: true }, { headers });
  }

  // Spam gate 2 — minimum fill time. Submissions faster than a human could
  // plausibly type are dropped silently (same fake-success response).
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_FILL_MS) {
    log.warn({
      traceId,
      event: "reseller.too_fast",
      elapsedMs: data.elapsedMs,
    });
    return NextResponse.json({ ok: true }, { headers });
  }

  // Idempotency — retry within 60s on the same fingerprint resolves as
  // success without re-sending emails. Fingerprint excludes ms-noisy fields
  // so a double-clicked submit collapses cleanly.
  const fp = fingerprint({
    email: data.email,
    businessName: data.businessName,
    products: data.products,
  });
  if (!shouldProcess("reseller", fp)) {
    log.info({ traceId, event: "reseller.deduplicated", fp });
    return NextResponse.json({ ok: true, deduplicated: true }, { headers });
  }

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
}
