"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const fanCards = [
  {
    icon: "📋",
    title: "Build Your Setlist",
    desc: "Hlasuj, co chceš slyšet na dalším koncertě.",
    cta: "HLASOVAT →",
    href: "/setlist",
  },
  {
    icon: "🎯",
    title: "Která písnička jsi?",
    desc: "Quiz – odpověz na pár otázek a sdílej výsledek!",
    cta: "SPUSTIT →",
    href: "/quiz",
  },
  {
    icon: "🛒",
    title: "Merch & Shop",
    desc: "Trička, podepsané CD, limitky z Blakkwood shopu.",
    cta: "DO SHOPU →",
    href: "https://blakk.market",
  },
];

export default function FanZone() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubscribed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba při přihlášení.");
    }
    setLoading(false);
  };

  return (
    <section className="bg-cream py-[100px] px-6 md:px-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray mb-3">
            {"// FAN ZÓNA"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none">
            BUĎ <span className="text-gold">SOUČÁSTÍ</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {fanCards.map((card, i) => (
            <a
              key={i}
              href={card.href}
              className="bg-white border border-[#ddd] p-9 px-7 transition-all duration-500 cursor-pointer hover:border-gold hover:-translate-y-1 block"
            >
              <div className="text-[2.5rem] mb-5">{card.icon}</div>
              <h3 className="font-heading text-[1rem] font-bold tracking-[-0.02em] mb-2">
                {card.title}
              </h3>
              <p className="text-[0.85rem] text-gray leading-[1.6] mb-5">
                {card.desc}
              </p>
              <span className="text-black border border-[#ccc] px-6 py-3 font-heading text-[0.75rem] font-medium uppercase tracking-[0.05em] inline-block hover:border-black transition-colors">
                {card.cta}
              </span>
            </a>
          ))}
        </div>
      </ScrollReveal>

      {/* Newsletter */}
      <ScrollReveal>
        <div className="bg-gold text-black p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div>
            <h3 className="font-heading text-[1.3rem] font-black tracking-[-0.02em] mb-2">
              BUĎ PRVNÍ, KDO SE DOZVÍ
            </h3>
            <p className="text-[0.85rem] opacity-80">
              Předprodej lístků, nová hudba, exkluzivní obsah.
            </p>
          </div>
          {subscribed ? (
            <p className="font-heading font-bold text-center">
              Odběr aktivován! &#10003;
            </p>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col md:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tvuj@email.cz"
                required
                className="flex-1 p-3.5 px-4 bg-black/10 border border-black/25 text-black font-body text-[0.9rem] outline-none focus:border-black placeholder:text-black/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-cream px-7 py-3.5 font-heading text-[0.7rem] font-bold uppercase tracking-[0.05em] hover:-translate-y-0.5 transition-all whitespace-nowrap disabled:opacity-50"
              >
                {loading ? "..." : "ODEBÍRAT"}
              </button>
              {error && (
                <p className="text-red-700 text-[0.75rem] mt-1">{error}</p>
              )}
            </form>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
