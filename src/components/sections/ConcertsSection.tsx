"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { sanityClient } from "@/lib/sanity";

type Concert = {
  _id?: string;
  title: string;
  slug?: { current: string };
  date: string;
  venue: string;
  city: string;
  description?: string;
  ticketUrl?: string;
  status: string;
};

const fallbackConcerts: Concert[] = [
  { title: "Lucerna Music Bar", date: "2025-03-15", venue: "Lucerna Music Bar", city: "Praha", description: "Křest nového alba", status: "confirmed" },
  { title: "Stará Pekárna", date: "2025-03-22", venue: "Stará Pekárna", city: "Brno", description: "Lovestory Tour", status: "confirmed" },
  { title: "Majestic Music Club", date: "2025-04-05", venue: "Majestic Music Club", city: "Bratislava", description: "Special Guest", status: "soldout" },
  { title: "Korunní Pevnůstka", date: "2025-04-19", venue: "Korunní Pevnůstka", city: "Olomouc", description: "R&B Night", status: "confirmed" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["LED", "ÚNO", "BŘE", "DUB", "KVĚ", "ČER", "ČEC", "SRP", "ZÁŘ", "ŘÍJ", "LIS", "PRO"];
  return { day, month: `${months[d.getMonth()]} ${d.getFullYear()}` };
}

export default function ConcertsSection() {
  const [concerts, setConcerts] = useState<Concert[]>(fallbackConcerts);

  useEffect(() => {
    sanityClient
      .fetch<Concert[]>(`*[_type == "concert"] | order(date asc) { _id, title, slug, date, venue, city, description, ticketUrl, status }`)
      .then((data) => {
        if (data && data.length > 0) setConcerts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      className="bg-white py-16 md:py-[100px] px-6 md:px-12 border-t border-b border-[#ddd]"
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
          {concerts.map((concert, i) => {
            const { day, month } = formatDate(concert.date);
            const slug = concert.slug?.current || concert.title.toLowerCase().replace(/\s+/g, "-");

            return (
              <Link
                key={concert._id || i}
                href={`/koncerty/${slug}`}
                className="grid grid-cols-[80px_1fr] md:grid-cols-[140px_1fr_auto] items-center gap-4 md:gap-10 py-8 border-b border-[#eee] first:border-t cursor-pointer transition-all duration-300 hover:pl-4 hover:border-b-gold group"
              >
                <div className="font-heading">
                  <div className="text-[2.8rem] font-black leading-none tracking-[-0.04em]">
                    {day}
                  </div>
                  <div className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-gray mt-1">
                    {month}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-[1.1rem] font-bold tracking-[-0.02em]">
                    {concert.venue}
                  </h3>
                  <p className="text-[0.85rem] text-gray mt-1">
                    {concert.city} · {concert.description}
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-4">
                  {concert.status === "soldout" ? (
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] px-3.5 py-1.5 bg-[#f5f5f0] text-gray border border-[#ddd] line-through">
                      Vyprodáno
                    </span>
                  ) : (
                    <>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.1em] px-3.5 py-1.5 bg-gold/[0.08] text-gold border border-gold/30">
                        Potvrzeno
                      </span>
                      <span className="font-heading text-[0.7rem] text-gold font-bold transition-[letter-spacing] duration-300 group-hover:tracking-[0.05em]">
                        LÍSTKY &rarr;
                      </span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
