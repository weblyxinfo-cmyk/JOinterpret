import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const count = await prisma.subscriber.count();
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ count, subscribers });
  } catch (error) {
    console.error("Newsletter list error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
