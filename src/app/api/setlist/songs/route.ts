import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - public: returns active songs for voting
export async function GET() {
  try {
    const songs = await prisma.setlistSong.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(songs);
  } catch (error) {
    console.error("Setlist songs error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// POST - admin: create new song
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { title } = await req.json();
    if (!title?.trim()) {
      return NextResponse.json({ error: "Název písně je povinný." }, { status: 400 });
    }

    const maxOrder = await prisma.setlistSong.aggregate({ _max: { sortOrder: true } });
    const song = await prisma.setlistSong.create({
      data: { title: title.trim(), sortOrder: (maxOrder._max.sortOrder ?? -1) + 1 },
    });

    return NextResponse.json(song, { status: 201 });
  } catch (error) {
    console.error("Create song error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// PATCH - admin: update song (toggle active, reorder)
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { id, isActive, sortOrder, title } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID je povinné." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (isActive !== undefined) updateData.isActive = isActive;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    if (title !== undefined) updateData.title = title;

    const song = await prisma.setlistSong.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(song);
  } catch (error) {
    console.error("Update song error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// DELETE - admin: remove song
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

    await prisma.setlistSong.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete song error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
