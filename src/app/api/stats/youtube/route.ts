import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchChannelStats, fetchLatestVideos } from "@/lib/youtube";

export const dynamic = "force-dynamic";

const STATS_CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours
const VIDEOS_CACHE_TTL = 30 * 60 * 1000; // 30 minutes

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
    const type = searchParams.get("type") || "stats";

    if (type === "stats") {
      const cached = await getCached("youtube", "channel");
      if (cached) return NextResponse.json(cached);

      const stats = await fetchChannelStats();
      if (stats) {
        await setCache("youtube", "channel", stats, STATS_CACHE_TTL);
        return NextResponse.json(stats);
      }

      return NextResponse.json({ error: "YouTube API unavailable" }, { status: 503 });
    }

    if (type === "videos") {
      const cached = await getCached("youtube", "videos");
      if (cached) return NextResponse.json(cached);

      const videos = await fetchLatestVideos(10);
      if (videos.length > 0) {
        await setCache("youtube", "videos", videos, VIDEOS_CACHE_TTL);
        return NextResponse.json(videos);
      }

      return NextResponse.json({ error: "YouTube API unavailable" }, { status: 503 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error("YouTube stats error:", error);
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
