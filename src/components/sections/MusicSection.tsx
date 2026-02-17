"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const albums = [
  {
    year: "2025",
    type: "ALBUM",
    title: "Lifestory",
    cover: "https://i.scdn.co/image/ab67616d0000b2737d81758deee97dc0c84c82b9",
    url: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR",
  },
  {
    year: "2024",
    type: "ALBUM · LIVE",
    title: "Secret Concert",
    cover: "https://i.scdn.co/image/ab67616d0000b273d967facc13d581272cd1b520",
    url: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR",
  },
  {
    year: "2023",
    type: "ALBUM",
    title: "Lovestory",
    cover: "https://i.scdn.co/image/ab67616d0000b273964ff5910e5959c8207b39f1",
    url: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR",
  },
  {
    year: "2021",
    type: "EP",
    title: "Nemůžu zapomenout",
    cover: "https://i.scdn.co/image/ab67616d0000b273d832ecf10c12d1e1623dcc28",
    url: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR",
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
            91K+ MONTHLY LISTENERS
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {albums.map((album, i) => (
            <a
              key={i}
              href={album.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative cursor-pointer group block"
            >
              <div className="aspect-square relative overflow-hidden mb-4">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url('${album.cover}')` }}
                />
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
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
