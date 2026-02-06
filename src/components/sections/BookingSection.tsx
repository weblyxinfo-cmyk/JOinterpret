"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const eventTypes = [
  { icon: "🎤", title: "Klub / Koncert", desc: "Živé vystoupení v klubu nebo na koncertě" },
  { icon: "🎪", title: "Festival", desc: "Festivalové vystoupení" },
  { icon: "🎂", title: "Soukromá akce", desc: "Narozeniny, svatby, oslavy" },
  { icon: "🏢", title: "Firemní event", desc: "Teambuildingy, galavečery" },
];

export default function BookingSection() {
  const [activeType, setActiveType] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: API call
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      className="bg-black text-white py-[100px] px-6 md:px-12 relative"
      id="booking"
    >
      {/* Ghost text */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-heading text-[clamp(10rem,20vw,22rem)] font-black ghost-text tracking-[-0.05em] select-none">
        BOOK
      </div>

      <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
        <ScrollReveal>
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-light mb-3">
              {"// BOOKING"}
            </div>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-black tracking-[-0.04em] leading-[0.95] mb-6">
              CHCEŠ JÁRU NA
              <br />
              SVOU <span className="text-gold">AKCI?</span>
            </h2>
            <p className="text-gray-light text-[0.95rem] leading-[1.7] mb-10">
              Vyberte typ akce a pošlete nám požadavek. Management se vám ozve
              do 48 hodin.
            </p>

            <div className="flex flex-col gap-3">
              {eventTypes.map((type, i) => (
                <div
                  key={i}
                  onClick={() => setActiveType(i)}
                  className={`flex items-center gap-4 p-[18px] px-6 border cursor-pointer transition-all duration-300 ${
                    activeType === i
                      ? "border-gold pl-8 bg-gold/[0.08]"
                      : "border-[#333] hover:border-gold hover:pl-8"
                  }`}
                >
                  <div className="text-2xl">{type.icon}</div>
                  <div>
                    <h4 className="font-heading text-[0.85rem] font-bold">
                      {type.title}
                    </h4>
                    <p className="text-[0.75rem] text-gray mt-0.5">
                      {type.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {submitted ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-5xl mb-6">&#10003;</div>
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Požadavek odeslán!
                </h3>
                <p className="text-gray-light">
                  Váš požadavek byl odeslán. Ozveme se do 48 hodin.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Jméno / Organizace
                  </label>
                  <input
                    type="text"
                    placeholder="Vaše jméno"
                    required
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="vas@email.cz"
                    required
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+420 ..."
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Datum akce
                  </label>
                  <input
                    type="date"
                    required
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Místo konání
                  </label>
                  <input
                    type="text"
                    placeholder="Město, venue"
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Rozpočet
                  </label>
                  <select className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors cursor-pointer">
                    <option>Nechci uvádět</option>
                    <option>do 30 000 Kč</option>
                    <option>30 000 – 60 000 Kč</option>
                    <option>60 000 – 100 000 Kč</option>
                    <option>100 000+ Kč</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                  Popis akce
                </label>
                <textarea
                  placeholder="Popište nám vaši akci – typ, počet lidí, speciální požadavky..."
                  className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors min-h-[100px] resize-y"
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-[0.75rem] text-gray">
                  Management se ozve do 48 hodin.
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold text-black px-8 py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  {loading ? "ODESÍLÁM..." : "ODESLAT POPTÁVKU →"}
                </button>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
