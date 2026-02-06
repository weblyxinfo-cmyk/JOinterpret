"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { sanityClient } from "@/lib/sanity";

type LyricsDetail = {
  songTitle: string;
  album?: string;
  year?: number;
  featuredArtists?: string[];
  lyricsText?: string[];
  spotifyTrackId?: string;
};

const fallbackLyrics: LyricsDetail = {
  songTitle: "Nemůžu zapomenout",
  album: "Lovestory",
  year: 2023,
  featuredArtists: [],
  lyricsText: [
    "Nemůžu zapomenout na tebe",
    "každej den se budím",
    "a přemejšlím",
    "jestli jsi ta pravá",
    "co mi chybí ve snech",
    "",
    "Baby, tell me why",
    "proč jsi odešla",
    "nechala mě tady",
    "se srdcem rozbitým",
    "",
    "Nemůžu zapomenout",
    "na tvůj smích, na tvůj hlas",
    "na to jak jsme spolu byli",
    "naposledy zas a zas",
  ],
  spotifyTrackId: "",
};

export default function LyricsDetailPage() {
  const { slug } = useParams();
  const [lyrics, setLyrics] = useState<LyricsDetail>(fallbackLyrics);
  const [copiedLine, setCopiedLine] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<LyricsDetail>(
        `*[_type == "lyrics" && slug.current == $slug][0] { songTitle, album, year, featuredArtists, lyricsText, spotifyTrackId }`,
        { slug }
      )
      .then((data) => {
        if (data) setLyrics(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const shareLine = (line: string, index: number) => {
    if (!line.trim()) return;
    navigator.clipboard.writeText(`"${line}" — Jaroslav Oláh`);
    setCopiedLine(index);
    setTimeout(() => setCopiedLine(null), 2000);
  };

  const lines = lyrics.lyricsText || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="font-mono text-sm text-gray">Načítám...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="pt-24 pb-12 px-6 md:px-12">
        <Link
          href="/#lyrics"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-6 inline-block"
        >
          &larr; Zpět na texty
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold mb-2">
              {lyrics.album} · {lyrics.year}
            </div>
            <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em]">
              {lyrics.songTitle}
            </h1>
            {lyrics.featuredArtists && lyrics.featuredArtists.length > 0 && (
              <p className="text-gray-light text-sm mt-2">
                ft. {lyrics.featuredArtists.join(", ")}
              </p>
            )}
          </div>
          <div className="font-mono text-[0.65rem] text-gray">
            Klikni na řádek pro sdílení
          </div>
        </div>
      </div>

      {/* Lyrics */}
      <div className="px-6 md:px-12 pb-24 max-w-3xl">
        {lines.map((line, i) =>
          line.trim() === "" ? (
            <div key={i} className="h-8" />
          ) : (
            <div
              key={i}
              onClick={() => shareLine(line, i)}
              className="py-3 px-4 -mx-4 cursor-pointer text-lg leading-relaxed transition-all duration-300 hover:bg-gold/[0.08] hover:text-gold border-l-2 border-transparent hover:border-gold group relative"
            >
              {line}
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.65rem] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedLine === i ? "Zkopírováno!" : "↗ Sdílet"}
              </span>
            </div>
          )
        )}
      </div>

      {/* Spotify embed */}
      <div className="px-6 md:px-12 pb-24">
        <div className="max-w-3xl">
          {lyrics.spotifyTrackId ? (
            <iframe
              src={`https://open.spotify.com/embed/track/${lyrics.spotifyTrackId}`}
              width="100%"
              height="80"
              allow="encrypted-media"
              className="border-0"
            />
          ) : (
            <div className="bg-dark border border-[#333] p-8">
              <div className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-2">
                Poslechnout na Spotify
              </div>
              <div className="font-heading text-lg font-bold">
                {lyrics.songTitle}
              </div>
              <p className="text-gray text-sm mt-2">
                Spotify embed se zobrazí po zadání Track ID v Sanity CMS.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
