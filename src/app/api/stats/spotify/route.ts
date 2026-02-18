import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchArtistData, fetchArtistAlbums } from "@/lib/spotify";

export const dynamic = "force-dynamic";

const ARTIST_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
const ALBUMS_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

async function getCached(service: string, key: string) {
  const cached = await prisma.apiStatCache.findUnique({
    where: { service_key: { service, key } },
  });
  if (cached && new Date(cached.expiresAt) > new Date()) {
    return cached.value;
  }
  return null;
}

async function setCache(service: string, key: string, value: unknown, ttlMs: number) {
  await prisma.apiStatCache.upsert({
    where: { service_key: { service, key } },
    update: { value: value as never, expiresAt: new Date(Date.now() + ttlMs) },
    create: { service, key, value: value as never, expiresAt: new Date(Date.now() + ttlMs) },
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "artist";

    if (type === "artist") {
      const cached = await getCached("spotify", "artist");
      if (cached) return NextResponse.json(cached);

      const artist = await fetchArtistData();
      if (artist) {
        const data = {
          name: artist.name,
          followers: artist.followers.total,
          popularity: artist.popularity,
          image: artist.images[0]?.url || null,
          genres: artist.genres,
        };
        await setCache("spotify", "artist", data, ARTIST_CACHE_TTL);
        return NextResponse.json(data);
      }

      return NextResponse.json({ error: "Spotify API unavailable" }, { status: 503 });
    }

    if (type === "albums") {
      const cached = await getCached("spotify", "albums");
      if (cached) return NextResponse.json(cached);

      const albums = await fetchArtistAlbums();
      if (albums.length > 0) {
        const data = albums.map((a) => ({
          id: a.id,
          name: a.name,
          releaseDate: a.release_date,
          albumType: a.album_type,
          totalTracks: a.total_tracks,
          cover: a.images[0]?.url || null,
          spotifyUrl: a.external_urls.spotify,
        }));
        await setCache("spotify", "albums", data, ALBUMS_CACHE_TTL);
        return NextResponse.json(data);
      }

      return NextResponse.json({ error: "Spotify API unavailable" }, { status: 503 });
    }

    if (type === "monthlyListeners") {
      const cached = await getCached("spotify", "monthlyListeners");
      if (cached) return NextResponse.json(cached);
      return NextResponse.json({ value: "91K+" });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Spotify stats error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}

// POST - admin: save manual overrides (monthly listeners)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Neautorizováno." }, { status: 401 });
  }

  try {
    const { type, value } = await req.json();

    if (type === "monthlyListeners" && value) {
      const YEAR_TTL = 365 * 24 * 60 * 60 * 1000;
      await setCache("spotify", "monthlyListeners", { value }, YEAR_TTL);
      return NextResponse.json({ success: true, value });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("Spotify stats save error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
