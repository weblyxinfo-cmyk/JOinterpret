"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const bentoCards = [
  {
    type: "image",
    span: "col-span-2",
    bg: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80') center/cover",
    minH: "min-h-[300px]",
    tag: "Zpěvák & Rapper",
    tagStyle: "text-white bg-black/50 inline-block px-3 py-1",
  },
  {
    type: "stat",
    variant: "dark",
    tag: "Monthly listeners",
    number: "250K+",
    desc: "Spotify listeners měsíčně",
  },
  {
    type: "stat",
    variant: "dark",
    tag: "Music videos",
    number: "17",
    desc: "Videoklipů na YouTube",
  },
  {
    type: "text",
    tag: "Příběh",
    text: "Český R&B zpěvák a rapper romského původu. Proslavil se v SuperStar, od té doby vydal album Lovestory a řadu hitů atakujících milionová přehrání.",
    arrow: true,
  },
  {
    type: "highlight",
    variant: "gold",
    tag: "Fighter",
    title: "11 boxerských zápasů + MMA debut",
    desc: "10 let tréninku v Anglii",
  },
  {
    type: "text",
    tag: "Label",
    title: "Blakkwood Records",
    desc: "Podcast · Barber · Multitalent",
    arrow: true,
  },
  {
    type: "text",
    tag: "Spolupráce",
    title: "Refew · Majself · Jakub Děkan · Daniel Cina",
    arrow: true,
  },
];

export default function BentoAbout() {
  return (
    <section className="py-[100px] px-6 md:px-12 bg-cream" id="about">
      <ScrollReveal>
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-heading text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none">
            O MNĚ{" "}
            <span className="font-mono font-normal text-[0.6em] text-gray">
              / about
            </span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[240px] gap-4">
          {bentoCards.map((card, i) => {
            if (card.type === "image") {
              return (
                <div
                  key={i}
                  className={`${card.span} border border-[#ddd] p-7 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between cursor-pointer hover:border-gold hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${card.minH}`}
                  style={{ background: card.bg }}
                >
                  <span
                    className={`font-mono text-[0.6rem] uppercase tracking-[0.15em] ${card.tagStyle}`}
                  >
                    {card.tag}
                  </span>
                </div>
              );
            }

            if (card.type === "stat") {
              return (
                <div
                  key={i}
                  className="bg-black text-white border border-dark p-7 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] opacity-50">
                    {card.tag}
                  </span>
                  <div>
                    <div className="font-heading text-[3.5rem] font-black leading-none tracking-[-0.04em] text-gold">
                      {card.number}
                    </div>
                    <p className="text-[0.85rem] opacity-70 mt-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            }

            if (card.type === "highlight") {
              return (
                <div
                  key={i}
                  className="bg-gold text-black border border-gold p-7 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-black/50">
                    {card.tag}
                  </span>
                  <div>
                    <h3 className="font-heading text-[1.2rem] font-bold tracking-[-0.02em] leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[0.85rem] mt-2 opacity-70">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="bg-white border border-[#ddd] p-7 relative overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] group"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] opacity-50">
                  {card.tag}
                </span>
                <div>
                  {card.title && (
                    <h3 className="font-heading text-[1.2rem] font-bold tracking-[-0.02em] leading-tight">
                      {card.title}
                    </h3>
                  )}
                  {card.text && (
                    <p className="text-[0.85rem] opacity-70 leading-[1.5]">
                      {card.text}
                    </p>
                  )}
                  {card.desc && (
                    <p className="text-[0.85rem] opacity-70 mt-2">
                      {card.desc}
                    </p>
                  )}
                </div>
                {card.arrow && (
                  <span className="absolute bottom-5 right-5 text-[1.2rem] opacity-0 translate-x-[-8px] translate-y-[8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                    &rarr;
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
