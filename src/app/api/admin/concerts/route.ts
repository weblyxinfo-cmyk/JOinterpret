import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanityClient, sanityWriteClient } from "@/lib/sanity";

export const dynamic = "force-dynamic";

// GET - list all concerts from Sanity
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const concerts = await sanityClient.fetch(
      `*[_type == "concert"] | order(date desc) { _id, title, slug, date, venue, city, description, ticketUrl, status }`
    );
    return NextResponse.json(concerts || []);
  } catch (error) {
    console.error("Concerts list error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// POST - create new concert in Sanity
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  if (!sanityWriteClient) {
    return NextResponse.json({ error: "Sanity write token není nakonfigurován." }, { status: 503 });
  }

  try {
    const { title, date, venue, city, description, ticketUrl, status } = await req.json();

    if (!title || !date || !venue || !city) {
      return NextResponse.json({ error: "Vyplňte povinná pole." }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const doc = await sanityWriteClient.create({
      _type: "concert",
      title,
      slug: { _type: "slug", current: slug },
      date,
      venue,
      city,
      description: description || "",
      ticketUrl: ticketUrl || "",
      status: status || "confirmed",
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    console.error("Concert create error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
