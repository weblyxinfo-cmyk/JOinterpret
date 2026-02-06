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
    const booking = await prisma.bookingRequest.findUnique({
      where: { id: params.id },
      include: { notes: { orderBy: { createdAt: "desc" } } },
    });

    if (!booking) {
      return NextResponse.json({ error: "Nenalezeno." }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking detail error:", error);
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
    const { status, stripePaymentLink, isPaid, addToReferences, note } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (stripePaymentLink !== undefined) updateData.stripePaymentLink = stripePaymentLink;
    if (isPaid !== undefined) updateData.isPaid = isPaid;
    if (addToReferences !== undefined) updateData.addToReferences = addToReferences;

    const booking = await prisma.bookingRequest.update({
      where: { id: params.id },
      data: updateData,
    });

    if (note) {
      await prisma.bookingNote.create({
        data: {
          bookingId: params.id,
          content: note.content,
          author: note.author || "Admin",
        },
      });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Booking update error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
