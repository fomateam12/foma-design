import { NextResponse } from "next/server";
import { customOrderSchema } from "@/lib/validation";
import { sendCustomOrderEmails } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = customOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot: bots fill hidden field — silently accept without sending.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const result = await sendCustomOrderEmails(parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { error: "We couldn't send your request. Please email us directly." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[custom-order] dispatch threw:", err);
    return NextResponse.json(
      { error: "We couldn't send your request. Please email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
