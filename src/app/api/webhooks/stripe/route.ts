import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata;

    if (meta?.type && (meta.type === "MEET_GREET" || meta.type === "BACKSTAGE")) {
      const qrCode = crypto.randomUUID();

      await prisma.vipOrder.create({
        data: {
          type: meta.type as "MEET_GREET" | "BACKSTAGE",
          name: meta.name || "",
          email: meta.email || "",
          phone: meta.phone || null,
          concertId: meta.concertId || null,
          persons: parseInt(meta.persons || "1"),
          stripePaymentId: session.payment_intent as string,
          status: "PAID",
          qrCode,
        },
      });

      // TODO: Send confirmation email with QR code
    }
  }

  return NextResponse.json({ received: true });
}
