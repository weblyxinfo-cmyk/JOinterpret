"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { sanityClient } from "@/lib/sanity";

type EpkItem = {
  _id?: string;
  title: string;
  type?: string;
  description?: string;
};

const fallbackItems: EpkItem[] = [
  { title: "Press fotky", description: "Profi fotografie v tiskové kvalitě" },
  { title: "Bio & Rider", description: "Oficiální bio, tech rider, stage plot" },
  { title: "Logo & Branding", description: "Logotyp ve všech formátech" },
  { title: "Stats & Numbers", description: "Aktuální čísla ze Spotify a socek" },
];

const iconMap: Record<string, string> = {
  photo: "📸",
  document: "📄",
  logo: "🎨",
  stats: "📊",
};

export default function EpkSection() {
  const [items, setItems] = useState<EpkItem[]>(fallbackItems);

  useEffect(() => {
    sanityClient
      .fetch<EpkItem[]>(`*[_type == "epkMaterial"] { _id, title, type, description }`)
      .then((data) => {
        if (data && data.length > 0) setItems(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      className="bg-white py-16 md:py-[100px] px-6 md:px-12 border-t border-[#ddd]"
      id="epk"
    >
      <ScrollReveal>
        <div className="mb-12">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray mb-3">
            {"// PRO PROMOTÉRY"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none">
            ELECTRONIC <span className="text-gold">PRESS KIT</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {items.map((item, i) => (
            <div
              key={item._id || i}
              className="border border-[#ddd] p-7 px-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer hover:border-gold hover:-translate-y-[3px]"
            >
              <div className="text-[2rem]">
                {iconMap[item.type || ""] || ["📸", "📄", "🎨", "📊"][i % 4]}
              </div>
              <h4 className="font-heading text-[0.85rem] font-bold">
                {item.title}
              </h4>
              <p className="text-[0.75rem] text-gray">{item.description}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="text-center">
          <Link
            href="/epk"
            className="bg-gold text-black px-8 py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
          >
            &#11015; STÁHNOUT KOMPLETNÍ EPK
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
