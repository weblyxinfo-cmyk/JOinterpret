"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { sanityClient } from "@/lib/sanity";

type SongItem = {
  _id?: string;
  songTitle: string;
  slug?: { current: string };
};

const fallbackSongs = [
  "Nemůžu zapomenout",
  "Hlavolam ft. Refew",
  "Šípková Růženka",
  "Kriminál",
  "Zmatená ft. Daniel Cina",
  "Vlny ft. Jakub Děkan",
  "Táta ft. Lola Oláh",
];

export default function LyricsSection() {
  const [songs, setSongs] = useState<SongItem[]>(
    fallbackSongs.map((s) => ({ songTitle: s }))
  );

  useEffect(() => {
    sanityClient
      .fetch<SongItem[]>(`*[_type == "lyrics"] | order(_createdAt desc) { _id, songTitle, slug }`)
      .then((data) => {
        if (data && data.length > 0) setSongs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      className="bg-black text-white py-16 md:py-[100px] px-6 md:px-12 relative overflow-hidden"
      id="lyrics"
    >
      {/* Big quote ghost */}
      <div className="absolute top-[-60px] left-[-15px] md:top-[-120px] md:left-[-30px] font-heading text-[10rem] md:text-[40rem] text-[#1a1a1a] leading-none pointer-events-none select-none">
        &ldquo;
      </div>

      <ScrollReveal>
        <div className="mb-12 relative z-[2]">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-light mb-3">
            {"// TEXTY"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none text-white">
            SLOVA, CO <span className="text-gold">ZŮSTANOU</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20">
          <div>
            <div className="font-heading text-[clamp(1.4rem,2.5vw,2rem)] font-light leading-[1.8] text-[#555]">
              <span className="text-white font-medium cursor-pointer hover:text-gold transition-colors group">
                Nemůžu zapomenout na tebe,
                <span className="inline-block text-[0.6em] opacity-0 -translate-y-1 transition-all ml-1 group-hover:opacity-50">
                  &#8599;
                </span>
              </span>
              <br />
              každej den se budím
              <br />
              a přemejšlím,
              <br />
              <span className="text-white font-medium cursor-pointer hover:text-gold transition-colors group">
                jestli jsi ta pravá,
                <span className="inline-block text-[0.6em] opacity-0 -translate-y-1 transition-all ml-1 group-hover:opacity-50">
                  &#8599;
                </span>
              </span>
              <br />
              co mi chybí ve snech...
            </div>
            <div className="font-mono text-[0.7rem] text-gray mt-8 tracking-[0.05em]">
              — NEMŮŽU ZAPOMENOUT
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {songs.map((song, i) => {
              const slug = song.slug?.current || song.songTitle.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
              return (
                <Link
                  key={song._id || i}
                  href={`/lyrics/${slug}`}
                  className="flex justify-between items-center px-5 py-4 border border-[#222] cursor-pointer transition-all duration-300 hover:border-gold hover:pl-7 hover:bg-gold/[0.04] group"
                >
                  <span className="font-heading text-[0.8rem] font-medium">
                    {song.songTitle}
                  </span>
                  <span className="font-mono text-[0.65rem] text-gray">
                    LYRICS &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
