import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanityWriteClient } from "@/lib/sanity";

export const dynamic = "force-dynamic";

// PATCH - update concert in Sanity
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  if (!sanityWriteClient) {
    return NextResponse.json({ error: "Sanity write token není nakonfigurován." }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { title, date, venue, city, description, ticketUrl, status } = body;

    let patch = sanityWriteClient.patch(params.id);
    if (title !== undefined) patch = patch.set({ title });
    if (date !== undefined) patch = patch.set({ date });
    if (venue !== undefined) patch = patch.set({ venue });
    if (city !== undefined) patch = patch.set({ city });
    if (description !== undefined) patch = patch.set({ description });
    if (ticketUrl !== undefined) patch = patch.set({ ticketUrl });
    if (status !== undefined) patch = patch.set({ status });

    const doc = await patch.commit();
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Concert update error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// DELETE - delete concert from Sanity
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  if (!sanityWriteClient) {
    return NextResponse.json({ error: "Sanity write token není nakonfigurován." }, { status: 503 });
  }

  try {
    await sanityWriteClient.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Concert delete error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
