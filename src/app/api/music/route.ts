import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - public: returns visible albums
export async function GET() {
  try {
    const albums = await prisma.albumOverride.findMany({
      where: { isVisible: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(albums);
  } catch (error) {
    console.error("Music list error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// POST - admin: create new album
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { title, year, type, coverUrl, spotifyUrl, spotifyId } = await req.json();
    if (!title || !year) {
      return NextResponse.json({ error: "Název a rok jsou povinné." }, { status: 400 });
    }

    const maxOrder = await prisma.albumOverride.aggregate({ _max: { sortOrder: true } });
    const album = await prisma.albumOverride.create({
      data: {
        title,
        year,
        type: type || "ALBUM",
        coverUrl: coverUrl || null,
        spotifyUrl: spotifyUrl || null,
        spotifyId: spotifyId || null,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
        isVisible: true,
      },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error("Create album error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// PATCH - admin: update album
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { id, ...fields } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID je povinné." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updateData[key] = value;
    }

    const album = await prisma.albumOverride.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error("Update album error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// DELETE - admin: delete album
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID je povinné." }, { status: 400 });
    }

    await prisma.albumOverride.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete album error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
