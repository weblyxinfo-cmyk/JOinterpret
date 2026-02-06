"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { sanityClient } from "@/lib/sanity";

type Reference = {
  _id?: string;
  title: string;
  date?: string;
  venue?: string;
  city?: string;
  description?: string;
  attendees?: number;
};

const fallbackTags = [
  "I AM FIGHTER",
  "GOOUT",
  "LUCERNA MUSIC BAR",
  "SUPERSTAR CZ/SK",
  "BLAKKWOOD RECORDS",
  "ČESKÉ BUDĚJOVICE",
  "REFEW TOUR",
];

const fallbackEvents: Reference[] = [
  { title: "Budějovický Budvar Event", date: "2024", city: "ČESKÉ BUDĚJOVICE", description: "Headliner · 500+ lidí" },
  { title: "Křest alba Lovestory", date: "2023", city: "PRAHA", description: "Sold out · Live band" },
  { title: "IAF 3 – MMA Debut", date: "2022", city: "PRAHA", description: "Kongresové centrum" },
];

export default function ReferencesSection() {
  const [events, setEvents] = useState<Reference[]>(fallbackEvents);
  const [tags, setTags] = useState<string[]>(fallbackTags);

  useEffect(() => {
    sanityClient
      .fetch<Reference[]>(`*[_type == "reference"] | order(date desc) { _id, title, date, venue, city, description, attendees }`)
      .then((data) => {
        if (data && data.length > 0) {
          setEvents(data);
          setTags(data.map((r) => r.title));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-cream py-16 md:py-[100px] px-6 md:px-12">
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
            {[...tags, ...tags].map((tag, i) => (
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
          {events.slice(0, 6).map((event, i) => (
            <div
              key={event._id || i}
              className="border border-[#ddd] bg-white p-7 transition-all duration-300 hover:border-gold"
            >
              <div className="font-mono text-[0.6rem] text-gray tracking-[0.1em] uppercase">
                {event.date} · {event.city}
              </div>
              <h4 className="font-heading text-[0.9rem] font-bold mt-2.5 tracking-[-0.02em]">
                {event.title}
              </h4>
              <p className="text-[0.8rem] text-gray mt-1.5">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
