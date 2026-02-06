import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { generateQRDataUrl } from "@/lib/qr";
import { sendVipConfirmation } from "@/lib/email";
import Stripe from "stripe";
import crypto from "crypto";

export const dynamic = "force-dynamic";

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

      const order = await prisma.vipOrder.create({
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

      // Generate QR code and send email
      try {
        const qrDataUrl = await generateQRDataUrl(
          `VIP:${order.id}:${qrCode}`
        );
        await sendVipConfirmation({
          name: meta.name || "",
          email: meta.email || "",
          type: meta.type,
          qrCodeDataUrl: qrDataUrl,
          concertId: meta.concertId,
        });
      } catch (emailErr) {
        console.error("VIP email error (non-critical):", emailErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
