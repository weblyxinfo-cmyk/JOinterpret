"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const albums = [
  {
    year: "2025",
    type: "ALBUM",
    title: "Nové album",
    gradient: "linear-gradient(135deg, #C6A336, #8B7420)",
    emoji: "🔥",
  },
  {
    year: "2024",
    type: "ALBUM",
    title: "Album 2024",
    gradient: "linear-gradient(135deg, #1a0a2a, #3a1a5a)",
    emoji: "💜",
  },
  {
    year: "2023",
    type: "ALBUM",
    title: "Lovestory",
    gradient: "linear-gradient(135deg, #C9A84C, #8B6914)",
    emoji: "💛",
  },
  {
    year: "2021",
    type: "EP",
    title: "EP",
    gradient: "linear-gradient(135deg, #111, #333)",
    emoji: "🖤",
  },
];

export default function MusicSection() {
  return (
    <section className="bg-cream py-16 md:py-[100px] px-6 md:px-12" id="music">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em]">
            DISKOGRAFIE
          </h2>
          <div className="flex items-center gap-2 font-mono text-[0.7rem] text-[#1DB954] bg-[rgba(29,185,84,0.08)] px-4 py-2 border border-[rgba(29,185,84,0.2)]">
            <div className="w-2 h-2 bg-[#1DB954] rounded-full animate-pulse" />
            250K+ MONTHLY LISTENERS
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {albums.map((album, i) => (
            <div key={i} className="relative cursor-pointer group">
              <div className="aspect-square relative overflow-hidden mb-4">
                <div
                  className="w-full h-full flex items-center justify-center text-[4rem] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  style={{ background: album.gradient }}
                >
                  {album.emoji}
                </div>
                <div className="absolute inset-0 bg-gold/[0.88] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-heading text-[0.7rem] text-black font-bold uppercase tracking-[0.1em] border-2 border-black px-6 py-3">
                    PLAY
                  </div>
                </div>
              </div>
              <div className="font-mono text-[0.65rem] text-gray tracking-[0.08em]">
                {album.year} · {album.type}
              </div>
              <div className="font-heading text-[1.05rem] font-bold mt-1.5 tracking-[-0.02em]">
                {album.title}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
