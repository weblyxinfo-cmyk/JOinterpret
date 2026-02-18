import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - public: returns visible social links
export async function GET() {
  try {
    const links = await prisma.socialLink.findMany({
      where: { isVisible: true },
      orderBy: { platform: "asc" },
    });
    return NextResponse.json(links);
  } catch (error) {
    console.error("Social links error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// PATCH - admin: update social link
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { id, url, followerCount, isVisible } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "ID je povinné." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (url !== undefined) updateData.url = url;
    if (followerCount !== undefined) updateData.followerCount = followerCount;
    if (isVisible !== undefined) updateData.isVisible = isVisible;

    const link = await prisma.socialLink.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Social link update error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// POST - admin: create new social link
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { platform, url, followerCount } = await req.json();
    if (!platform?.trim()) {
      return NextResponse.json({ error: "Platforma je povinná." }, { status: 400 });
    }

    const link = await prisma.socialLink.create({
      data: { platform: platform.toLowerCase().trim(), url, followerCount, isVisible: true },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Create social link error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
