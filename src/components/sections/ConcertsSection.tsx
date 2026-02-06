"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const concerts = [
  {
    day: "15",
    month: "BŘE 2025",
    venue: "Lucerna Music Bar",
    city: "Praha",
    desc: "Křest nového alba",
    status: "live" as const,
  },
  {
    day: "22",
    month: "BŘE 2025",
    venue: "Stará Pekárna",
    city: "Brno",
    desc: "Lovestory Tour",
    status: "live" as const,
  },
  {
    day: "05",
    month: "DUB 2025",
    venue: "Majestic Music Club",
    city: "Bratislava",
    desc: "Special Guest",
    status: "sold" as const,
  },
  {
    day: "19",
    month: "DUB 2025",
    venue: "Korunní Pevnůstka",
    city: "Olomouc",
    desc: "R&B Night",
    status: "live" as const,
  },
];

export default function ConcertsSection() {
  return (
    <section
      className="bg-white py-[100px] px-6 md:px-12 border-t border-b border-[#ddd]"
      id="concerts"
    >
      <ScrollReveal>
        <div className="mb-12">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray mb-3">
            {"// KONCERTY"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none">
            KDE MĚ <span className="text-gold">UVIDÍTE</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div>
          {concerts.map((concert, i) => (
            <div
              key={i}
              className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr_auto] items-center gap-4 md:gap-10 py-8 border-b border-[#eee] first:border-t cursor-pointer transition-all duration-300 hover:pl-4 hover:border-b-gold group"
            >
              <div className="font-heading">
                <div className="text-[2.8rem] font-black leading-none tracking-[-0.04em]">
                  {concert.day}
                </div>
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-gray mt-1">
                  {concert.month}
                </div>
              </div>

              <div>
                <h3 className="font-heading text-[1.1rem] font-bold tracking-[-0.02em]">
                  {concert.venue}
                </h3>
                <p className="text-[0.85rem] text-gray mt-1">
                  {concert.city} · {concert.desc}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-4">
                {concert.status === "live" ? (
                  <>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] px-3.5 py-1.5 bg-gold/[0.08] text-gold border border-gold/30">
                      Potvrzeno
                    </span>
                    <a
                      href="#"
                      className="font-heading text-[0.7rem] text-gold font-bold transition-[letter-spacing] duration-300 group-hover:tracking-[0.05em]"
                    >
                      LÍSTKY &rarr;
                    </a>
                  </>
                ) : (
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] px-3.5 py-1.5 bg-[#f5f5f0] text-gray border border-[#ddd] line-through">
                    Vyprodáno
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
