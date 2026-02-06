import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation, sendBookingNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, eventDate, location, budget, description } = body;

    if (!name || !email || !type || !eventDate) {
      return NextResponse.json(
        { error: "Vyplňte prosím povinná pole." },
        { status: 400 }
      );
    }

    const validTypes = ["CLUB", "FESTIVAL", "PRIVATE", "CORPORATE"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Neplatný typ akce." }, { status: 400 });
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        type,
        name,
        email,
        phone: phone || null,
        eventDate: new Date(eventDate),
        location: location || null,
        budget: budget || null,
        description: description || null,
      },
    });

    // Send emails (non-blocking)
    try {
      await Promise.all([
        sendBookingConfirmation({ name, email, type, eventDate }),
        sendBookingNotification({ name, email, type, eventDate, location, budget, id: booking.id }),
      ]);
    } catch (emailErr) {
      console.error("Email send error (non-critical):", emailErr);
    }

    return NextResponse.json({ success: true, id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (type) where.type = type;

    const bookings = await prisma.bookingRequest.findMany({
      where,
      include: { notes: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Booking list error:", error);
    return NextResponse.json(
      { error: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
