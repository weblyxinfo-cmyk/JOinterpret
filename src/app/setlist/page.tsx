"use client";

import { useState } from "react";
import Link from "next/link";

const allSongs = [
  "Nemůžu zapomenout",
  "Hlavolam ft. Refew",
  "Šípková Růženka",
  "Kriminál",
  "Zmatená ft. Daniel Cina",
  "Vlny ft. Jakub Děkan",
  "Táta ft. Lola Oláh",
  "Lovestory",
];

export default function SetlistPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleSong = (song: string) => {
    if (submitted) return;
    setSelected((prev) =>
      prev.includes(song)
        ? prev.filter((s) => s !== song)
        : prev.length < 5
        ? [...prev, song]
        : prev
    );
  };

  const handleSubmit = async () => {
    if (selected.length === 0) return;
    // TODO: POST to /api/setlist
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-2xl mx-auto">
        <Link
          href="/"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-8 inline-block"
        >
          &larr; Zpět
        </Link>

        <h1 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[-0.04em] mb-2">
          Build Your <span className="text-gold">Setlist</span>
        </h1>
        <p className="text-gray mb-2">
          Vyber až 5 písní, které chceš slyšet na dalším koncertě.
        </p>
        <p className="font-mono text-[0.7rem] text-gold mb-10">
          Vybráno: {selected.length}/5
        </p>

        {submitted ? (
          <div className="bg-white border border-[#ddd] p-12 text-center">
            <div className="text-4xl mb-4">&#10003;</div>
            <h2 className="font-heading text-2xl font-bold mb-2">
              Díky za hlasování!
            </h2>
            <p className="text-gray">
              Tvůj hlas byl zaznamenán. Výsledky uvidíš živě.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-8">
              {allSongs.map((song) => {
                const isSelected = selected.includes(song);
                return (
                  <button
                    key={song}
                    onClick={() => toggleSong(song)}
                    className={`w-full text-left flex justify-between items-center px-6 py-5 border transition-all ${
                      isSelected
                        ? "bg-gold/10 border-gold"
                        : "bg-white border-[#ddd] hover:border-gold hover:pl-8"
                    }`}
                  >
                    <span className="font-heading text-[0.9rem] font-bold">
                      {song}
                    </span>
                    {isSelected && (
                      <span className="text-gold font-heading text-[0.7rem] font-bold">
                        &#10003;
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selected.length === 0}
              className="w-full bg-gold text-black py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ODESLAT HLASOVÁNÍ ({selected.length}/5)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
