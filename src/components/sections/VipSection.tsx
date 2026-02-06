"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const vipPackages = [
  {
    num: "01",
    title: "Meet & Greet",
    desc: "Osobní setkání před nebo po koncertě. Společná fotka, podpis a krátký rozhovor.",
  },
  {
    num: "02",
    title: "Backstage Pass",
    desc: "Exkluzivní přístup do zákulisí. Soundcheck, příprava a atmosféra, kterou vidí jen nejbližší.",
  },
];

export default function VipSection() {
  return (
    <section className="bg-cream-dark py-[100px] px-6 md:px-12" id="vip">
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray mb-3">
            {"// VIP EXPERIENCE"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em]">
            ZÁŽITKY <span className="text-gold">NA MÍRU</span>
          </h2>
          <p className="text-gray max-w-[500px] mx-auto mt-4 text-[0.95rem]">
            Exkluzivní setkání, zákulisí a osobní pozdrav přímo od Járy.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {vipPackages.map((pkg) => (
            <div
              key={pkg.num}
              className="bg-white border border-[#ddd] p-9 px-7 transition-all duration-500 relative hover:border-gold hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.06)] group"
            >
              <span className="absolute top-7 right-7 text-[1.2rem] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                &rarr;
              </span>
              <div className="font-heading text-[3rem] font-black text-gold leading-none mb-5 opacity-20">
                {pkg.num}
              </div>
              <h3 className="font-heading text-[1.1rem] font-bold tracking-[-0.02em] mb-2">
                {pkg.title}
              </h3>
              <p className="text-[0.85rem] text-gray leading-[1.6] mb-6">
                {pkg.desc}
              </p>
              <button className="w-full bg-gold text-black py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark transition-all flex items-center justify-center gap-2">
                OBJEDNAT &rarr;
              </button>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
