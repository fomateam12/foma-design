import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { sendQuoteRequestEmails } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  // Honeypot tripped — silently accept so bots can't tell.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const result = await sendQuoteRequestEmails(parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { error: "We couldn't submit your request. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[quote] dispatch threw:", err);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
