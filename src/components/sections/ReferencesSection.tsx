"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const refTags = [
  "I AM FIGHTER",
  "GOOUT",
  "LUCERNA MUSIC BAR",
  "SUPERSTAR CZ/SK",
  "BLAKKWOOD RECORDS",
  "ČESKÉ BUDĚJOVICE",
  "REFEW TOUR",
];

const events = [
  {
    date: "2024 · ČESKÉ BUDĚJOVICE",
    title: "Budějovický Budvar Event",
    desc: "Headliner · 500+ lidí",
  },
  {
    date: "2023 · PRAHA",
    title: "Křest alba Lovestory",
    desc: "Sold out · Live band",
  },
  {
    date: "2022 · PRAHA",
    title: "IAF 3 – MMA Debut",
    desc: "Kongresové centrum",
  },
];

export default function ReferencesSection() {
  return (
    <section className="bg-cream py-[100px] px-6 md:px-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray mb-3">
            {"// REFERENCE"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none">
            KDE UŽ <span className="text-gold">VYSTUPOVAL</span>
          </h2>
        </div>
      </ScrollReveal>

      {/* Marquee */}
      <ScrollReveal>
        <div className="overflow-hidden border-t border-b border-[#ccc] py-6 mb-12">
          <div className="flex animate-ticker-slow whitespace-nowrap">
            {[...refTags, ...refTags].map((tag, i) => (
              <span
                key={i}
                className="font-heading text-[1.2rem] font-bold px-10 text-gray-light flex-shrink-0 hover:text-black transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Events grid */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="border border-[#ddd] bg-white p-7 transition-all duration-300 hover:border-gold"
            >
              <div className="font-mono text-[0.6rem] text-gray tracking-[0.1em] uppercase">
                {event.date}
              </div>
              <h4 className="font-heading text-[0.9rem] font-bold mt-2.5 tracking-[-0.02em]">
                {event.title}
              </h4>
              <p className="text-[0.8rem] text-gray mt-1.5">{event.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
