"use client";

import { useState } from "react";
import Link from "next/link";

const demoLyrics = {
  title: "Nemůžu zapomenout",
  album: "Lovestory",
  year: 2023,
  featured: [],
  spotifyId: "",
  lines: [
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
};

export default function LyricsDetail() {
  const [copiedLine, setCopiedLine] = useState<number | null>(null);

  const shareLine = (line: string, index: number) => {
    if (!line.trim()) return;
    navigator.clipboard.writeText(`"${line}" — Jaroslav Oláh`);
    setCopiedLine(index);
    setTimeout(() => setCopiedLine(null), 2000);
  };

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
              {demoLyrics.album} · {demoLyrics.year}
            </div>
            <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em]">
              {demoLyrics.title}
            </h1>
          </div>
          <div className="font-mono text-[0.65rem] text-gray">
            Klikni na řádek pro sdílení
          </div>
        </div>
      </div>

      {/* Lyrics */}
      <div className="px-6 md:px-12 pb-24 max-w-3xl">
        {demoLyrics.lines.map((line, i) =>
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

      {/* Spotify embed placeholder */}
      <div className="px-6 md:px-12 pb-24">
        <div className="bg-dark border border-[#333] p-8 max-w-3xl">
          <div className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-2">
            Poslechnout na Spotify
          </div>
          <div className="font-heading text-lg font-bold">
            {demoLyrics.title}
          </div>
          <p className="text-gray text-sm mt-2">
            Spotify embed se zobrazí po zadání Track ID v Sanity CMS.
          </p>
        </div>
      </div>
    </div>
  );
}
