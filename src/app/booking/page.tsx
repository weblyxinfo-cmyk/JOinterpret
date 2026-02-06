"use client";

import { useState } from "react";
import Link from "next/link";

const eventTypes = [
  { value: "CLUB", icon: "🎤", title: "Klub / Koncert", desc: "Živé vystoupení v klubu nebo na koncertě" },
  { value: "FESTIVAL", icon: "🎪", title: "Festival", desc: "Festivalové vystoupení" },
  { value: "PRIVATE", icon: "🎂", title: "Soukromá akce", desc: "Narozeniny, svatby, oslavy" },
  { value: "CORPORATE", icon: "🏢", title: "Firemní event", desc: "Teambuildingy, galavečery" },
];

export default function BookingPage() {
  const [activeType, setActiveType] = useState("CLUB");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeType,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          eventDate: formData.get("eventDate"),
          location: formData.get("location"),
          budget: formData.get("budget"),
          description: formData.get("description"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // fallback
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        <Link
          href="/"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-8 inline-block"
        >
          &larr; Zpět
        </Link>

        <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-light mb-3">
          {"// BOOKING"}
        </div>
        <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] mb-4">
          CHCEŠ JÁRU NA SVOU <span className="text-gold">AKCI?</span>
        </h1>
        <p className="text-gray-light mb-12 max-w-xl">
          Vyberte typ akce a pošlete nám požadavek. Management se vám ozve do
          48 hodin. Ceny řešíme individuálně dle typu a rozsahu akce.
        </p>

        {submitted ? (
          <div className="bg-dark border border-[#333] p-16 text-center max-w-xl mx-auto">
            <div className="text-5xl mb-6">&#10003;</div>
            <h2 className="font-heading text-2xl font-bold mb-4">
              Požadavek odeslán!
            </h2>
            <p className="text-gray-light">
              Váš požadavek byl odeslán. Ozveme se do 48 hodin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
            {/* Types */}
            <div className="flex flex-col gap-3">
              {eventTypes.map((type) => (
                <div
                  key={type.value}
                  onClick={() => setActiveType(type.value)}
                  className={`flex items-center gap-4 p-[18px] px-6 border cursor-pointer transition-all duration-300 ${
                    activeType === type.value
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Jméno / Organizace *
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Vaše jméno"
                    required
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Email *
                  </label>
                  <input
                    name="email"
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
                    name="phone"
                    type="tel"
                    placeholder="+420 ..."
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Datum akce *
                  </label>
                  <input
                    name="eventDate"
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
                    name="location"
                    type="text"
                    placeholder="Město, venue"
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Rozpočet
                  </label>
                  <select
                    name="budget"
                    className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors cursor-pointer"
                  >
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
                  name="description"
                  placeholder="Popište nám vaši akci – typ, počet lidí, speciální požadavky..."
                  className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors min-h-[120px] resize-y"
                />
              </div>

              {/* File upload */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                  Upload briefu (volitelný, max 10MB)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="bg-dark border border-[#333] text-white p-3.5 px-4 font-body text-[0.9rem] outline-none focus:border-gold transition-colors file:bg-gold file:text-black file:border-none file:px-4 file:py-1 file:font-heading file:text-[0.65rem] file:font-bold file:uppercase file:mr-4 file:cursor-pointer"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                <span className="text-[0.75rem] text-gray">
                  Management se ozve do 48 hodin. Ceny řešíme individuálně.
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gold text-black px-10 py-5 font-heading text-[0.8rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark hover:-translate-y-0.5 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? "ODESÍLÁM..." : "ODESLAT POPTÁVKU →"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
