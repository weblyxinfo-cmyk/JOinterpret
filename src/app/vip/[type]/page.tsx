"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const packages = {
  meet_greet: {
    title: "Meet & Greet",
    desc: "Osobní setkání před nebo po koncertě. Společná fotka, podpis a krátký rozhovor s Járou.",
    includes: [
      "Osobní setkání (15 min)",
      "Společná fotka",
      "Podpis na merch / CD",
      "Exkluzivní laminátka",
    ],
  },
  backstage: {
    title: "Backstage Pass",
    desc: "Exkluzivní přístup do zákulisí. Soundcheck, příprava a atmosféra, kterou vidí jen nejbližší.",
    includes: [
      "Přístup do backstage",
      "Účast na soundchecku",
      "Meet & Greet s celou kapelou",
      "Backstage catering",
      "Exkluzivní merch balíček",
      "Společná fotka",
    ],
  },
};

export default function VipDetail() {
  const params = useParams();
  const typeKey = (params.type as string) || "meet_greet";
  const pkg = packages[typeKey as keyof typeof packages] || packages.meet_greet;
  const [loading, setLoading] = useState(false);

  const handleOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/vip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: typeKey === "backstage" ? "BACKSTAGE" : "MEET_GREET",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          concertId: formData.get("concert"),
          persons: parseInt(formData.get("persons") as string) || 1,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Chyba při zpracování. Zkuste to prosím znovu.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/#vip"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-8 inline-block"
        >
          &larr; Zpět na VIP
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12">
          {/* Info */}
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold mb-3">
              VIP Experience
            </div>
            <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] mb-4">
              {pkg.title}
            </h1>
            <p className="text-gray leading-relaxed mb-8">{pkg.desc}</p>

            <h3 className="font-heading text-sm font-bold mb-4">Co zahrnuje:</h3>
            <ul className="space-y-3 mb-8">
              {pkg.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">&#10003;</span>
                  <span className="text-[0.9rem]">{item}</span>
                </li>
              ))}
            </ul>

            {/* Gallery placeholder */}
            <h3 className="font-heading text-sm font-bold mb-4">
              Fotky z minulých {pkg.title}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-cream-dark border border-[#ddd] flex items-center justify-center text-2xl opacity-30"
                >
                  📸
                </div>
              ))}
            </div>
          </div>

          {/* Order form */}
          <div>
            <div className="bg-white border border-[#ddd] p-8">
              <h2 className="font-heading text-lg font-bold mb-6">
                Objednat {pkg.title}
              </h2>
              <form onSubmit={handleOrder} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Jméno *
                  </label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Vaše jméno"
                    className="border border-[#ddd] p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="vas@email.cz"
                    className="border border-[#ddd] p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Telefon
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+420 ..."
                    className="border border-[#ddd] p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Koncert *
                  </label>
                  <select
                    name="concert"
                    required
                    className="border border-[#ddd] p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    <option value="">Vyberte koncert</option>
                    <option value="lucerna-2025">
                      15.3.2025 – Lucerna Music Bar, Praha
                    </option>
                    <option value="pekarna-2025">
                      22.3.2025 – Stará Pekárna, Brno
                    </option>
                    <option value="olomouc-2025">
                      19.4.2025 – Korunní Pevnůstka, Olomouc
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
                    Počet osob
                  </label>
                  <select
                    name="persons"
                    className="border border-[#ddd] p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors cursor-pointer"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "osoba" : n < 5 ? "osoby" : "osob"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black py-4 font-heading text-[0.8rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark transition-all mt-4 disabled:opacity-50"
                >
                  {loading ? "ZPRACOVÁVÁM..." : "POKRAČOVAT K PLATBĚ →"}
                </button>

                <p className="text-[0.7rem] text-gray text-center">
                  Budete přesměrováni na zabezpečenou platební bránu Stripe.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
