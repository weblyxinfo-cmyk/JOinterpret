"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { sanityClient } from "@/lib/sanity";

type ConcertDetail = {
  title: string;
  date: string;
  venue: string;
  city: string;
  address?: string;
  description?: string;
  lineup?: string[];
  status: string;
  ticketUrl?: string;
};

const fallbackConcert: ConcertDetail = {
  title: "Lucerna Music Bar",
  date: "2025-03-15T20:00:00",
  venue: "Lucerna Music Bar",
  city: "Praha",
  address: "Vodičkova 36, Praha 1",
  description: "Křest nového alba – speciální live show s plnou kapelou.",
  lineup: ["Jaroslav Oláh", "DJ Special", "Live Band"],
  status: "confirmed",
  ticketUrl: "#",
};

export default function ConcertDetailPage() {
  const { slug } = useParams();
  const [concert, setConcert] = useState<ConcertDetail>(fallbackConcert);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch<ConcertDetail>(
        `*[_type == "concert" && slug.current == $slug][0] { title, date, venue, city, description, lineup, status, ticketUrl }`,
        { slug }
      )
      .then((data) => {
        if (data) setConcert(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const dateObj = new Date(concert.date);
  const formattedDate = dateObj.toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const addToCalendar = () => {
    const start = dateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000);
    const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      concert.title
    )}&dates=${start}/${end}&location=${encodeURIComponent(
      concert.address || concert.venue
    )}&details=${encodeURIComponent(concert.description || "")}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="font-mono text-sm text-gray">Načítám...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/#concerts"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-8 inline-block"
        >
          &larr; Zpět na koncerty
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <div>
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold mb-3">
              {formattedDate} · {formattedTime}
            </div>
            <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] mb-4">
              {concert.title}
            </h1>
            <p className="text-gray text-lg mb-8">
              {concert.city} · {concert.description}
            </p>

            {/* Map placeholder */}
            <div className="bg-white border border-[#ddd] aspect-video flex items-center justify-center mb-8">
              <div className="text-center text-gray">
                <div className="text-3xl mb-2">📍</div>
                <p className="font-heading text-sm font-bold">
                  {concert.venue}
                </p>
                <p className="text-[0.8rem]">{concert.address || concert.city}</p>
              </div>
            </div>

            {/* Lineup */}
            {concert.lineup && concert.lineup.length > 0 && (
              <>
                <h2 className="font-heading text-xl font-bold mb-4">Lineup</h2>
                <div className="space-y-2 mb-8">
                  {concert.lineup.map((artist, i) => (
                    <div
                      key={i}
                      className="bg-white border border-[#ddd] px-6 py-4 font-heading text-[0.9rem] font-medium"
                    >
                      {artist}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-[#ddd] p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-4">
                Lístky
              </div>
              {concert.ticketUrl && (
                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gold text-black py-4 font-heading text-[0.75rem] font-bold uppercase text-center hover:bg-gold-dark transition-colors mb-3"
                >
                  KOUPIT LÍSTKY &rarr;
                </a>
              )}
              <button
                onClick={addToCalendar}
                className="block w-full border border-[#ddd] py-4 font-heading text-[0.75rem] uppercase text-center hover:border-gold transition-colors"
              >
                + Přidat do kalendáře
              </button>
            </div>

            <div className="bg-white border border-[#ddd] p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-2">
                Status
              </div>
              <span className="font-mono text-[0.7rem] uppercase tracking-wider text-gold">
                {concert.status === "soldout" ? "Vyprodáno" : "Potvrzeno"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
