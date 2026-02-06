"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { value: "11", label: "Box zápasů" },
  { value: "1", label: "MMA zápas" },
  { value: "10", label: "Let v UK" },
  { value: "3", label: "Tréninkové kempy" },
];

export default function MmaSection() {
  return (
    <section className="bg-black text-white py-[100px] px-6 md:px-12" id="mma">
      <ScrollReveal>
        <div className="mb-12">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-light mb-3">
            {"// FIGHTER"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none text-white">
            MMA <span className="text-gold">JOURNEY</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center">
          {/* Video box */}
          <div className="aspect-video bg-dark border border-[#333] flex items-center justify-center cursor-pointer transition-colors hover:border-gold relative overflow-hidden group">
            <div className="font-heading text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white border-2 border-gold px-7 py-3.5 transition-all group-hover:bg-gold group-hover:text-black">
              &#9654; PŘEHRÁT
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="border border-[#333] p-6 transition-colors hover:border-gold"
              >
                <div className="font-heading text-[2.5rem] font-black text-gold tracking-[-0.04em]">
                  {stat.value}
                </div>
                <div className="font-mono text-[0.6rem] text-gray uppercase tracking-[0.1em] mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
