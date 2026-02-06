import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Neplatný email." }, { status: 400 });
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Již odebíráte." });
    }

    await prisma.subscriber.create({
      data: { email, source: source || "website" },
    });

    // TODO: Add to Mailchimp list

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
