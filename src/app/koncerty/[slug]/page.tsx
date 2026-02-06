"use client";

import Link from "next/link";

const demoConcert = {
  title: "Lucerna Music Bar",
  date: "15. března 2025",
  time: "20:00",
  city: "Praha",
  venue: "Lucerna Music Bar",
  address: "Vodičkova 36, Praha 1",
  description: "Křest nového alba – speciální live show s plnou kapelou.",
  lineup: ["Jaroslav Oláh", "DJ Special", "Live Band"],
  status: "confirmed",
  ticketUrl: "#",
};

export default function ConcertDetail() {
  const addToCalendar = () => {
    const start = "20250315T200000";
    const end = "20250315T230000";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      demoConcert.title
    )}&dates=${start}/${end}&location=${encodeURIComponent(
      demoConcert.address
    )}&details=${encodeURIComponent(demoConcert.description)}`;
    window.open(url, "_blank");
  };

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
              {demoConcert.date} · {demoConcert.time}
            </div>
            <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] mb-4">
              {demoConcert.title}
            </h1>
            <p className="text-gray text-lg mb-8">
              {demoConcert.city} · {demoConcert.description}
            </p>

            {/* Map placeholder */}
            <div className="bg-white border border-[#ddd] aspect-video flex items-center justify-center mb-8">
              <div className="text-center text-gray">
                <div className="text-3xl mb-2">📍</div>
                <p className="font-heading text-sm font-bold">
                  {demoConcert.venue}
                </p>
                <p className="text-[0.8rem]">{demoConcert.address}</p>
              </div>
            </div>

            {/* Lineup */}
            <h2 className="font-heading text-xl font-bold mb-4">Lineup</h2>
            <div className="space-y-2 mb-8">
              {demoConcert.lineup.map((artist, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#ddd] px-6 py-4 font-heading text-[0.9rem] font-medium"
                >
                  {artist}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-[#ddd] p-6">
              <div className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-4">
                Lístky
              </div>
              <a
                href={demoConcert.ticketUrl}
                className="block w-full bg-gold text-black py-4 font-heading text-[0.75rem] font-bold uppercase text-center hover:bg-gold-dark transition-colors mb-3"
              >
                KOUPIT LÍSTKY &rarr;
              </a>
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
                Potvrzeno
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
