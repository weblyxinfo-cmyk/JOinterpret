"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";

type EpkMaterial = {
  _id?: string;
  title: string;
  type?: string;
  description?: string;
  downloadUrl?: string;
};

type EpkBio = {
  _id?: string;
  shortBio?: string;
  longBio?: string;
};

type EpkStats = {
  _id?: string;
  spotifyListeners?: string;
  videoCount?: string;
  totalPlays?: string;
  igFollowers?: string;
};

const fallbackPhotos: (EpkMaterial & { image?: string })[] = [
  { title: "Press Photo 1", description: "Hlavní promo fotka", type: "photo", image: "/images/portrait.jpg" },
  { title: "Press Photo 2", description: "Studio session", type: "photo", image: "/images/editorial.jpg" },
  { title: "Press Photo 3", description: "Close-up portrait", type: "photo", image: "/images/closeup.jpg" },
];

const fallbackDocuments: EpkMaterial[] = [
  { title: "Bio (CZ)", description: "Oficiální bio v češtině", type: "document" },
  { title: "Bio (EN)", description: "Official bio in English", type: "document" },
  { title: "Tech Rider", description: "Technické požadavky", type: "document" },
  { title: "Stage Plot", description: "Rozložení pódia", type: "document" },
];

const fallbackShortBio =
  "Jaroslav Oláh je český R&B zpěvák a rapper romského původu. Proslavil se účastí v SuperStar a od té doby vydal album Lovestory a řadu hitů s milionovými přehráními.";

const fallbackLongBio =
  "Jaroslav Oláh je český R&B zpěvák a rapper. Na českou hudební scénu vstoupil přes soutěž SuperStar, kde zaujal svým hlasem a charismem. Pod hlavičkou Blakkwood Records vydal album Lovestory (2023) s hity jako Nemůžu zapomenout, Hlavolam ft. Refew či Šípková Růženka. Spolupracoval s umělci jako Majself, Jakub Děkan, Daniel Cina a Lola Oláh.";

const fallbackStats = [
  { value: "250K+", label: "Spotify Listeners" },
  { value: "17", label: "Videoklipů" },
  { value: "1M+", label: "Přehrání" },
  { value: "50K+", label: "IG Followers" },
];

const docIconMap: Record<string, string> = {
  document: "📄",
  rider: "🔧",
  stageplot: "📐",
};

export default function EpkPage() {
  const [photos, setPhotos] = useState<EpkMaterial[]>(fallbackPhotos);
  const [documents, setDocuments] = useState<EpkMaterial[]>(fallbackDocuments);
  const [shortBio, setShortBio] = useState(fallbackShortBio);
  const [longBio, setLongBio] = useState(fallbackLongBio);
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    // Fetch EPK materials from Sanity
    sanityClient
      .fetch<EpkMaterial[]>(
        `*[_type == "epkMaterial"] { _id, title, type, description, "downloadUrl": file.asset->url }`
      )
      .then((data) => {
        if (data && data.length > 0) {
          const photoItems = data.filter((d) => d.type === "photo");
          const docItems = data.filter((d) => d.type !== "photo" && d.type !== "logo");
          if (photoItems.length > 0) setPhotos(photoItems);
          if (docItems.length > 0) setDocuments(docItems);
        }
      })
      .catch(() => {});

    // Fetch bio from Sanity
    sanityClient
      .fetch<EpkBio>(`*[_type == "epkBio"][0] { shortBio, longBio }`)
      .then((data) => {
        if (data?.shortBio) setShortBio(data.shortBio);
        if (data?.longBio) setLongBio(data.longBio);
      })
      .catch(() => {});

    // Fetch stats from Sanity
    sanityClient
      .fetch<EpkStats>(`*[_type == "epkStats"][0]`)
      .then((data) => {
        if (data) {
          const s = [
            { value: data.spotifyListeners || "250K+", label: "Spotify Listeners" },
            { value: data.videoCount || "17", label: "Videoklipů" },
            { value: data.totalPlays || "1M+", label: "Přehrání" },
            { value: data.igFollowers || "50K+", label: "IG Followers" },
          ];
          setStats(s);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-5xl mx-auto">
        <Link
          href="/"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-8 inline-block"
        >
          &larr; Zpět
        </Link>

        <h1 className="font-heading text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] mb-2">
          Electronic <span className="text-gold">Press Kit</span>
        </h1>
        <p className="text-gray mb-12 max-w-xl">
          Všechny materiály pro promotéry, organizátory a média na jednom místě.
        </p>

        {/* Bio */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold mb-6">Bio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#ddd] p-8">
              <h3 className="font-heading text-sm font-bold mb-3 text-gold">
                Krátké bio
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-gray">
                {shortBio}
              </p>
            </div>
            <div className="bg-white border border-[#ddd] p-8">
              <h3 className="font-heading text-sm font-bold mb-3 text-gold">
                Dlouhé bio
              </h3>
              <p className="text-[0.9rem] leading-relaxed text-gray">
                {longBio}
              </p>
            </div>
          </div>
        </section>

        {/* Press Photos */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold mb-6">
            Press fotky (tiskové kvality)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => {
              const img = (photo as { image?: string }).image;
              return (
                <div
                  key={photo._id || i}
                  className="bg-white border border-[#ddd] aspect-[3/4] relative overflow-hidden cursor-pointer hover:border-gold transition-colors group"
                >
                  {img ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url('${img}')` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-30">📸</div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                    <p className="font-heading text-sm font-bold text-white">{photo.title}</p>
                    <p className="text-[0.75rem] text-white/70">{photo.description}</p>
                    <span className="font-mono text-[0.6rem] text-gold mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                      &#11015; Stáhnout
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Documents */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold mb-6">
            Dokumenty & Rider
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {documents.map((doc, i) => (
              <div
                key={doc._id || i}
                className="bg-white border border-[#ddd] p-6 cursor-pointer hover:border-gold hover:-translate-y-[2px] transition-all"
              >
                <div className="text-2xl mb-3">
                  {docIconMap[doc.type || ""] || "📄"}
                </div>
                <h4 className="font-heading text-[0.85rem] font-bold">
                  {doc.title}
                </h4>
                <p className="text-[0.75rem] text-gray mt-1">{doc.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Logo */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold mb-6">
            Logo & Branding
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["PNG (světlé pozadí)", "PNG (tmavé pozadí)", "SVG (vektor)"].map(
              (format, i) => (
                <div
                  key={i}
                  className={`border border-[#ddd] p-8 flex items-center justify-center cursor-pointer hover:border-gold transition-colors ${
                    i === 1 ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-heading text-2xl font-black mb-2">
                      J. OLÁH
                    </div>
                    <p className="text-[0.7rem] text-gray">{format}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold mb-6">Live Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-black text-white p-6">
                <div className="font-heading text-2xl font-black text-gold">
                  {stat.value}
                </div>
                <div className="font-mono text-[0.6rem] text-gray mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download all */}
        <div className="text-center">
          <button className="bg-gold text-black px-10 py-5 font-heading text-[0.8rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
            &#11015; STÁHNOUT KOMPLETNÍ EPK (ZIP)
          </button>
        </div>
      </div>
    </div>
  );
}
