import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

const songs = [
  "Nemůžu zapomenout",
  "Hlavolam ft. Refew",
  "Šípková Růženka",
  "Kriminál",
  "Zmatená ft. Daniel Cina",
  "Vlny ft. Jakub Děkan",
  "Táta ft. Lola Oláh",
  "Lovestory",
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId") || "default";

    const votes = await prisma.setlistVote.groupBy({
      by: ["songTitle"],
      where: { eventId },
      _count: true,
    });

    const results = songs.map((song) => {
      const vote = votes.find((v) => v.songTitle === song);
      return { song, votes: vote?._count || 0 };
    });

    results.sort((a, b) => b.votes - a.votes);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Setlist error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { songs: votedSongs, eventId = "default", fingerprint } = await req.json();

    if (!votedSongs || !Array.isArray(votedSongs) || votedSongs.length > 5) {
      return NextResponse.json(
        { error: "Max 5 hlasů." },
        { status: 400 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const voterHash = crypto
      .createHash("sha256")
      .update(`${ip}-${fingerprint || "none"}`)
      .digest("hex");

    for (const song of votedSongs) {
      try {
        await prisma.setlistVote.create({
          data: { songTitle: song, eventId, voterHash },
        });
      } catch {
        // Unique constraint – already voted for this song
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
