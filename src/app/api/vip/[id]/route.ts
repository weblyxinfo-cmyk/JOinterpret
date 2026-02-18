import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const order = await prisma.vipOrder.findUnique({
      where: { id: params.id },
    });

    if (!order) {
      return NextResponse.json({ error: "Nenalezeno." }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("VIP detail error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status } = body;

    const validStatuses = ["PAID", "USED", "CANCELLED", "REFUNDED"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Neplatný status." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;

    const order = await prisma.vipOrder.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("VIP update error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
