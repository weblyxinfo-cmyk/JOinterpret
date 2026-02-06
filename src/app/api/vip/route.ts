import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, phone, concertId, persons } = body;

    if (!type || !name || !email) {
      return NextResponse.json(
        { error: "Vyplňte povinná pole." },
        { status: 400 }
      );
    }

    const validTypes = ["MEET_GREET", "BACKSTAGE"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Neplatný typ." }, { status: 400 });
    }

    // TODO: Get price from Sanity CMS vipPackage
    const priceMap: Record<string, number> = {
      MEET_GREET: 150000, // 1500 CZK in halere
      BACKSTAGE: 300000,  // 3000 CZK in halere
    };

    const unitAmount = priceMap[type] || 150000;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "czk",
            product_data: {
              name: type === "MEET_GREET" ? "Meet & Greet" : "Backstage Pass",
              description: `VIP Experience – Jaroslav Oláh (${persons || 1}x)`,
            },
            unit_amount: unitAmount,
          },
          quantity: persons || 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/vip/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/vip/${type.toLowerCase()}`,
      metadata: {
        type,
        name,
        email,
        phone: phone || "",
        concertId: concertId || "",
        persons: String(persons || 1),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("VIP order error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.vipOrder.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("VIP list error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
