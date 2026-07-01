import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function str(v: unknown, max = 240) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = str(body.name, 80);
  const email = str(body.email, 120);
  const subject = str(body.subject, 120);
  const message = str(body.message, 2000);

  // Boundary validation
  if (!name || name.length < 2)
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  if (!message || message.length < 5)
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/contact failed:", e);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }
}
