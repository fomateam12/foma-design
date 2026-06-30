import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { sendQuoteRequestEmails } from "@/lib/email";
import { isSameOrigin } from "@/lib/security";
import { fingerprint, shouldProcess } from "@/lib/idempotency";
import { log } from "@/lib/log";
import { getTraceId, TRACE_HEADER } from "@/lib/trace";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const traceId = getTraceId(request);

  // CSRF: reject cross-site POSTs (browsers always send Origin on those).
  if (!isSameOrigin(request)) {
    log.warn({ traceId, event: "quote.csrf_rejected" });
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 403, headers: { [TRACE_HEADER]: traceId } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400, headers: { [TRACE_HEADER]: traceId } },
    );
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    log.info({
      traceId,
      event: "quote.validation_failed",
      issueCount: parsed.error.issues.length,
    });
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422, headers: { [TRACE_HEADER]: traceId } },
    );
  }

  // Honeypot tripped — silently accept so bots can't tell.
  if (parsed.data.company) {
    log.warn({ traceId, event: "quote.honeypot_tripped" });
    return NextResponse.json(
      { ok: true },
      { headers: { [TRACE_HEADER]: traceId } },
    );
  }

  // Idempotency — a retry within the dedup window resolves as success
  // without re-sending emails. The fingerprint excludes honeypot/`elapsedMs`
  // noise so functionally identical retries collapse cleanly.
  const fp = fingerprint({
    items: parsed.data.items,
    email: parsed.data.email,
    fullName: parsed.data.fullName,
  });
  if (!shouldProcess("quote", fp)) {
    log.info({ traceId, event: "quote.deduplicated", fp });
    return NextResponse.json(
      { ok: true, deduplicated: true },
      { headers: { [TRACE_HEADER]: traceId } },
    );
  }

  try {
    const result = await sendQuoteRequestEmails(parsed.data, { traceId });
    if (!result.ok) {
      log.error({
        traceId,
        event: "quote.dispatch_failed",
        reason: result.error ?? "unknown",
        channels: result.channels,
      });
      return NextResponse.json(
        { error: "We couldn't submit your request. Please email us directly." },
        { status: 500, headers: { [TRACE_HEADER]: traceId } },
      );
    }
    log.info({
      traceId,
      event: "quote.dispatched",
      channels: result.channels,
      itemCount: parsed.data.items.length,
    });
  } catch (err) {
    log.error({
      traceId,
      event: "quote.handler_threw",
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us directly." },
      { status: 500, headers: { [TRACE_HEADER]: traceId } },
    );
  }

  return NextResponse.json(
    { ok: true },
    { headers: { [TRACE_HEADER]: traceId } },
  );
}
